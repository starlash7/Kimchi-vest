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

                {/* Section A: Header & Branding */}
                <div style={{ gridColumn: '1 / 3', gridRow: '1 / 2', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div className="status-tag" style={{ marginBottom: '1rem', width: 'fit-content' }}>AI ORACLE v0.1 - ACTIVE</div>
                    <h1 className="hero-title">KIMCHI<br />VEST</h1>
                    <p style={{ opacity: 0.5, fontSize: '1.1rem', marginTop: '0.8rem', maxWidth: '400px' }}>
                        The ultimate AI-powered prediction oracle for Solana.
                    </p>
                </div>

                {/* Section B: Hero CTA (Middle) */}
                <div className="bento-card card-hero">
                    <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.8rem)', fontWeight: 900, marginBottom: '1rem' }}>
                        {authenticated ? 'AGENT CONNECTED' : 'SECURE YOUR BETS'}
                    </h2>
                    <p style={{ opacity: 0.4, fontSize: '1rem', marginBottom: '2rem', maxWidth: '350px' }}>
                        Predict which Pump.fun tokens will hit the bonding curve graduation.
                    </p>

                    {authenticated ? (
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button className="tactile-btn btn-primary">ENTER BOARD</button>
                            <button onClick={logout} className="tactile-btn" style={{ background: 'rgba(255,255,255,0.05)', color: '#fff' }}>LOGOUT</button>
                        </div>
                    ) : (
                        <button onClick={login} className="tactile-btn btn-secondary">INITIATE CONNECTION</button>
                    )}
                </div>

                {/* Section C: Live Feed (Right) */}
                <div className="bento-card card-scanner">
                    <div style={{ marginBottom: '1.5rem' }}>
                        <h3 style={{ fontSize: '0.75rem', opacity: 0.4, letterSpacing: '2px' }}>LIVE_ORACLE_FEED</h3>
                        <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--accent)', marginTop: '0.5rem' }}>98.2%</div>
                        <p style={{ fontSize: '0.7rem', opacity: 0.3 }}>Global Accuracy</p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', flex: 1, overflow: 'hidden' }}>
                        {liveData.map(coin => (
                            <div key={coin.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.8rem', background: 'rgba(255,255,255,0.03)', borderRadius: '16px' }}>
                                <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{coin.name}</span>
                                <span className="status-tag" style={{ fontSize: '0.6rem', padding: '0.2rem 0.6rem' }}>{coin.status}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Section D: Terminal Logs (Bottom Full Width) */}
                <div className="bento-card card-terminal" style={{ padding: '1.2rem 2rem' }}>
                    <div style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <span style={{ color: 'var(--accent)' }}>[OK]</span>
                            <span>SCANNING PUMP.FUN NETWORK... FOUND 45 NEW CONTRACTS.</span>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem', color: 'white', marginTop: '0.3rem' }}>
                            <span>&gt;&gt;</span>
                            <span>AI_ANALYSIS: $KIMCHI SHOWS HIGH GRADUATION PROBABILITY (85.4%)</span>
                        </div>
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
