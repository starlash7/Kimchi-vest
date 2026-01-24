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
            { id: '2', name: '$PUMP', status: 'Live' },
            { id: '3', name: '$SOL', status: 'Graduating' },
        ];
        setLiveData(mockCoins);
    }, []);

    return (
        <div className="main-viewport">
            {showIntro && <IntroSequence onFinish={() => setShowIntro(false)} />}

            <Background />

            {/* Main Content Layout */}
            <div className="dashboard-layout">

                {/* 1. Brand Side - Row 1 to 3 */}
                <div style={{ gridColumn: '1 / 6', gridRow: '1 / 4', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div className="status-tag" style={{ marginBottom: '1rem', width: 'fit-content' }}>INTERNAL SYSTEM V0.1</div>
                    <h1 className="hero-title">KIMCHI<br />VEST</h1>
                    <p style={{ opacity: 0.5, fontSize: '1.1rem', marginTop: '0.5rem', maxWidth: '400px' }}>
                        The ultimate AI-powered prediction oracle for Solana.
                    </p>
                </div>

                {/* 2. Top Stats - Row 1 to 3 */}
                <div className="bento-card" style={{ gridColumn: '7 / 10', gridRow: '1 / 4', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <h3 style={{ fontSize: '0.7rem', opacity: 0.4, marginBottom: '1rem', letterSpacing: '2px' }}>AI ACCURACY</h3>
                    <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--accent)' }}>98.2%</div>
                    <div style={{ marginTop: '0.5rem', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px' }}>
                        <div style={{ width: '98%', height: '100%', background: 'var(--accent)' }} />
                    </div>
                </div>

                <div className="bento-card" style={{ gridColumn: '10 / 13', gridRow: '1 / 4', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <h3 style={{ fontSize: '0.7rem', opacity: 0.4, marginBottom: '1rem', letterSpacing: '2px' }}>NETWORK</h3>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>SOLANA</div>
                    <p style={{ opacity: 0.3, fontSize: '0.8rem' }}>Mainnet-Beta</p>
                </div>

                {/* 3. Hero CTA Card - Row 4 to 9 */}
                <div className="bento-card" style={{ gridColumn: '1 / 8', gridRow: '4 / 10', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1.5rem' }}>
                        {authenticated ? 'CONNECTION ACTIVE' : 'SECURE YOUR PREDICTIONS'}
                    </h2>

                    {authenticated ? (
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button className="tactile-btn btn-primary">GO TO BOARD</button>
                            <button onClick={logout} className="tactile-btn" style={{ background: 'rgba(255,255,255,0.05)', color: '#fff' }}>DISCONNECT</button>
                        </div>
                    ) : (
                        <button onClick={login} className="tactile-btn btn-secondary">INITIATE CONNECTION</button>
                    )}
                </div>

                {/* 4. Live Scanner Feed - Row 4 to 9 */}
                <div className="bento-card" style={{ gridColumn: '8 / 13', gridRow: '4 / 10', display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ fontSize: '0.7rem', opacity: 0.4, marginBottom: '1.5rem', letterSpacing: '2px' }}>LIVE_ORACLE_FEED</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', overflow: 'hidden' }}>
                        {liveData.map(coin => (
                            <div key={coin.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontWeight: 700 }}>{coin.name}</span>
                                <span className="status-tag" style={{ fontSize: '0.6rem' }}>{coin.status}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 5. Terminal Logs - Row 10 to 12 */}
                <div className="bento-card" style={{ gridColumn: '1 / 13', gridRow: '10 / 13', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '1.5rem 2.5rem' }}>
                    <div style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.8 }}>
                        <div><span style={{ color: 'var(--accent)' }}>[OK]</span> BOOTING ENGINE... DONE.</div>
                        <div style={{ color: 'white' }}>&gt; AI ANALYSIS: $KIMCHI SHOWS HIGH GRADUATION PROBABILITY (85%)</div>
                        <div>[WAIT] UPDATING LIQUIDITY ORACLE... SYNCING...</div>
                    </div>
                </div>

            </div>

            {/* Static Footer (Floating) */}
            <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', opacity: 0.2, fontSize: '0.8rem', zIndex: 100 }}>
                © 2026 KIMCHI-VEST. ALL RIGHTS RESERVED.
            </div>
        </div>
    )
}
