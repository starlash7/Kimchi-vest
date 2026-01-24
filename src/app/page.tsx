'use client';

import { useAuth } from '@/components/Providers';
import { useState, useEffect } from 'react';
import Background from '@/components/Background';
import IntroSequence from '@/components/IntroSequence';

export default function Home() {
    const { login, logout, authenticated, user } = useAuth();
    const [showIntro, setShowIntro] = useState(true);
    const [liveData, setLiveData] = useState<{ id: string; name: string; status: string }[]>([]);

    useEffect(() => {
        const mockCoins = [
            { id: '1', name: '$KIMCHI', status: '85% Bonded' },
            { id: '2', name: '$PUMP', status: 'Searching...' },
            { id: '3', name: '$SOL', status: 'Stable' },
        ];
        setLiveData(mockCoins);
    }, []);

    return (
        <div className="main-viewport">
            {showIntro && <IntroSequence onFinish={() => setShowIntro(false)} />}

            <Background />

            {/* Elite Overlay Layer */}
            <div style={{
                position: 'absolute',
                inset: 0,
                display: 'grid',
                gridTemplateColumns: 'repeat(12, 1fr)',
                gridTemplateRows: 'repeat(12, 1fr)',
                gap: '1.5rem',
                padding: '4rem',
                zIndex: 10
            }}>
                {/* Header Section */}
                <div style={{ gridColumn: '1 / 6', gridRow: '1 / 4' }}>
                    <p className="neon-subtitle" style={{ marginBottom: '1rem' }}>SYSTEM V0.1</p>
                    <h1 className="hero-title">KIMCHI<br />VEST</h1>
                </div>

                {/* Main Action Card (Bento Large) */}
                <div className="bento-card" style={{ gridColumn: '1 / 7', gridRow: '4 / 10', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ textAlign: 'left' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1rem' }}>
                            {authenticated ? 'AGENT ACTIVE' : 'PREDICT THE GRADUATION'}
                        </h2>
                        <p style={{ opacity: 0.6, fontSize: '1.2rem', marginBottom: '2.5rem', maxWidth: '400px' }}>
                            AI-driven prediction markets for the next big Solana meme-coins. No trading, just pure winning.
                        </p>

                        {authenticated ? (
                            <div style={{ display: 'flex', gap: '1.5rem' }}>
                                <button className="tactile-button btn-neon">DASHBOARD</button>
                                <button onClick={logout} className="tactile-button" style={{ background: 'rgba(255,255,255,0.1)', color: 'white' }}>LOGOUT</button>
                            </div>
                        ) : (
                            <button onClick={login} className="tactile-button btn-kimchi">START BETTING NOW</button>
                        )}
                    </div>
                </div>

                {/* Live Stats Card (Bento Small) */}
                <div className="bento-card" style={{ gridColumn: '7 / 10', gridRow: '1 / 5' }}>
                    <h3 style={{ fontSize: '0.9rem', opacity: 0.5, marginBottom: '1.5rem', letterSpacing: '2px' }}>LIVE SCANNER</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {liveData.map(coin => (
                            <div key={coin.id} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                <span style={{ fontWeight: 700 }}>{coin.name}</span>
                                <span style={{ color: 'var(--accent)', fontSize: '0.9rem' }}>{coin.status}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* AI Sentiment Card (Bento Small) */}
                <div className="bento-card" style={{ gridColumn: '10 / 13', gridRow: '1 / 7' }}>
                    <h3 style={{ fontSize: '0.9rem', opacity: 0.5, marginBottom: '2rem', letterSpacing: '2px' }}>AI ORACLE</h3>
                    <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--accent)' }}>98.2%</div>
                    <p style={{ opacity: 0.4, fontSize: '0.8rem', marginTop: '0.5rem' }}>Global Prediction Accuracy</p>
                    <div style={{ marginTop: '2rem', width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}>
                        <div style={{ width: '98%', height: '100%', background: 'var(--accent)', borderRadius: '2px' }} />
                    </div>
                </div>

                {/* Data Feed Card (Bento Long) */}
                <div className="bento-card" style={{ gridColumn: '7 / 13', gridRow: '7 / 12' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h3 style={{ fontSize: '0.9rem', opacity: 0.5, letterSpacing: '2px' }}>TERMINAL_LOGS</h3>
                        <div style={{ width: '8px', height: '8px', background: 'var(--accent)', borderRadius: '50%', boxShadow: '0 0 10px var(--accent)' }} />
                    </div>
                    <div style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>
                        <div>[15:12:01] SCANNING NEW POOL: $CHILI</div>
                        <div>[15:12:05] ANALYZING BONDING CURVE...</div>
                        <div style={{ color: 'var(--accent)' }}>[15:12:10] PREDICTION: 85% PROBABILITY</div>
                        <div>[15:12:15] UPDATING ODDS TO 1.45x...</div>
                    </div>
                </div>

                {/* Footer Badges */}
                <div style={{ gridColumn: '1 / 7', gridRow: '10 / 13', display: 'flex', alignItems: 'flex-end', gap: '3rem', opacity: 0.3 }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '0.7rem', fontWeight: 900 }}>NETWORK</span>
                        <span style={{ fontSize: '1.1rem', fontWeight: 700 }}>SOLANA</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '0.7rem', fontWeight: 900 }}>SECURED BY</span>
                        <span style={{ fontSize: '1.1rem', fontWeight: 700 }}>PRIVY</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '0.7rem', fontWeight: 900 }}>ORACLE v0.1</span>
                        <span style={{ fontSize: '1.1rem', fontWeight: 700 }}>K-RETRO-FUTURE</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
