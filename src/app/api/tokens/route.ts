import { NextResponse } from 'next/server';

const PUMP_API = 'https://frontend-api-v3.pump.fun';
const HEADERS = {
    'Accept': 'application/json',
    'Origin': 'https://pump.fun',
};

// Graduation requires ~85 SOL in the bonding curve (initial virtual = 30 SOL, graduation at ~115 SOL total)
const GRADUATION_SOL_THRESHOLD = 85_000_000_000; // 85 SOL in lamports
const INITIAL_VIRTUAL_SOL = 30_000_000_000; // 30 SOL initial virtual reserves

interface PumpToken {
    mint: string;
    name: string;
    symbol: string;
    description: string;
    image_uri: string;
    market_cap: number;
    usd_market_cap: number;
    virtual_sol_reserves: number;
    virtual_token_reserves: number;
    real_sol_reserves: number;
    real_token_reserves: number;
    total_supply: number;
    complete: boolean;
    pump_swap_pool: string | null;
    created_timestamp: number;
    last_trade_timestamp: number;
    reply_count: number;
    king_of_the_hill_timestamp: number | null;
    ath_market_cap: number;
    twitter: string | null;
    website: string | null;
}

interface EnrichedToken {
    mint: string;
    name: string;
    symbol: string;
    image: string;
    marketCapSol: number;
    marketCapUsd: number;
    graduationScore: number;
    bondingProgress: number;
    status: 'bonding' | 'koth' | 'graduated';
    createdAt: number;
    lastTradeAt: number;
    replyCount: number;
    twitter: string | null;
    website: string | null;
}

function calculateGraduationScore(token: PumpToken): { score: number; progress: number; status: 'bonding' | 'koth' | 'graduated' } {
    // Already graduated
    if (token.complete && token.pump_swap_pool) {
        return { score: 100, progress: 100, status: 'graduated' };
    }

    // Bonding curve progress (0-100%)
    // virtual_sol_reserves starts at ~30 SOL, graduation at ~115 SOL
    // Progress = (current - initial) / (graduation - initial)
    const virtualSol = token.virtual_sol_reserves || INITIAL_VIRTUAL_SOL;
    const solAdded = Math.max(0, virtualSol - INITIAL_VIRTUAL_SOL);
    const progress = Math.min(100, (solAdded / GRADUATION_SOL_THRESHOLD) * 100);

    // King of the hill = high momentum
    if (token.king_of_the_hill_timestamp) {
        return { score: Math.min(95, progress + 10), progress, status: 'koth' };
    }

    // Base score from bonding progress (0-70 points)
    let score = progress * 0.7;

    // Recency bonus (0-15 points): more recent trades = higher score
    const now = Date.now();
    const lastTrade = token.last_trade_timestamp || 0;
    const minutesSinceLastTrade = (now - lastTrade) / (1000 * 60);
    if (minutesSinceLastTrade < 1) score += 15;
    else if (minutesSinceLastTrade < 5) score += 12;
    else if (minutesSinceLastTrade < 30) score += 8;
    else if (minutesSinceLastTrade < 60) score += 4;

    // Social engagement bonus (0-15 points)
    if (token.reply_count > 500) score += 15;
    else if (token.reply_count > 100) score += 10;
    else if (token.reply_count > 20) score += 5;
    else if (token.reply_count > 5) score += 2;

    return {
        score: Math.min(99, Math.round(score)),
        progress: Math.round(progress * 10) / 10,
        status: 'bonding',
    };
}

function enrichToken(token: PumpToken): EnrichedToken {
    const { score, progress, status } = calculateGraduationScore(token);

    return {
        mint: token.mint,
        name: token.name,
        symbol: token.symbol,
        image: token.image_uri,
        marketCapSol: Math.round(token.market_cap * 10) / 10,
        marketCapUsd: Math.round(token.usd_market_cap),
        graduationScore: score,
        bondingProgress: progress,
        status,
        createdAt: token.created_timestamp,
        lastTradeAt: token.last_trade_timestamp,
        replyCount: token.reply_count,
        twitter: token.twitter,
        website: token.website,
    };
}

async function fetchPump(path: string): Promise<any> {
    const res = await fetch(`${PUMP_API}${path}`, {
        headers: HEADERS,
        next: { revalidate: 15 }, // Cache for 15 seconds
    });
    if (!res.ok) return [];
    return res.json();
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'bonding'; // bonding | trending | graduated
    const limit = Math.min(Number(searchParams.get('limit') || 20), 50);

    try {
        let tokens: PumpToken[] = [];

        if (type === 'bonding') {
            // Tokens still in bonding phase, sorted by recent activity
            tokens = await fetchPump(`/coins?limit=${limit}&offset=0&sort=last_trade_timestamp&order=DESC&complete=false&includeNsfw=false`);
        } else if (type === 'trending') {
            // Top performing tokens
            const data = await fetchPump(`/coins/top-runners?limit=${limit}`);
            tokens = data.map((d: any) => d.coin || d);
        } else if (type === 'graduated') {
            // Tokens that already graduated
            tokens = await fetchPump(`/coins/currently-live?limit=${limit}`);
        }

        const enriched = tokens.map(enrichToken);

        // Sort by graduation score (highest first)
        enriched.sort((a, b) => b.graduationScore - a.graduationScore);

        // Also fetch SOL price
        const solPriceData = await fetchPump('/sol-price');

        return NextResponse.json({
            tokens: enriched,
            solPrice: solPriceData?.solPrice || 0,
            updatedAt: Date.now(),
        });
    } catch (error) {
        console.error('Pump.fun API error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch token data', tokens: [], solPrice: 0 },
            { status: 500 }
        );
    }
}
