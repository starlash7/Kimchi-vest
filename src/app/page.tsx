'use client';

import { usePrivy } from '@privy-io/react-auth';
import { useState } from 'react';
import Background from '@/components/Background';
import IntroSequence from '@/components/IntroSequence';

export default function Home() {
    const { login, logout, authenticated, user } = usePrivy();
    const [showIntro, setShowIntro] = useState(true);

    return (
        <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
            {showIntro && <IntroSequence onFinish={() => setShowIntro(false)} />}

            <Background />

            <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem',
                zIndex: 10
            }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h1 className="logo-text" style={{ marginBottom: '0.5rem' }}>KIMCHI<br />-VEST</h1>
                    <p style={{
                        opacity: 0.8,
                        fontSize: '1.4rem',
                        color: 'var(--accent)',
                        fontWeight: 'bold',
                        letterSpacing: '2px'
                    }}>
                        FUEL YOUR FUTURE WITH FLAVOR
                    </p>
                </div>

                <div className="clay-card" style={{ padding: '3rem', width: '100%', maxWidth: '600px', textAlign: 'center' }}>
                    {authenticated ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <p style={{ fontSize: '1.2rem', color: 'white' }}>
                                Welcome back, <span style={{ color: 'var(--accent)' }}>{user?.email?.address || 'Explorer'}</span>
                            </p>
                            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                                <button className="btn-primary" style={{
                                    padding: '1rem 2.5rem',
                                    borderRadius: '16px',
                                    background: 'var(--accent)',
                                    color: 'black',
                                    fontWeight: '900',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontSize: '1.1rem',
                                    boxShadow: '0 4px 0px #00cc6a'
                                }}>
                                    ENTER DASHBOARD
                                </button>
                                <button onClick={logout} style={{
                                    padding: '1rem 2.5rem',
                                    borderRadius: '16px',
                                    border: '2px solid rgba(255,255,255,0.2)',
                                    background: 'transparent',
                                    color: 'white',
                                    cursor: 'pointer',
                                    fontWeight: 'bold'
                                }}>
                                    LOGOUT
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <p style={{ opacity: 0.7, fontSize: '1.1rem' }}>
                                Predict Pump.fun graduations with AI-powered live odds.
                            </p>
                            <button onClick={login} style={{
                                padding: '1.2rem 3rem',
                                borderRadius: '20px',
                                background: '#ff4d4d',
                                color: 'white',
                                fontWeight: '900',
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: '1.3rem',
                                boxShadow: '0 6px 0px #cc3d3d',
                                transition: 'all 0.1s'
                            }}
                                onMouseDown={(e) => {
                                    e.currentTarget.style.transform = 'translateY(4px)';
                                    e.currentTarget.style.boxShadow = '0 2px 0px #cc3d3d';
                                }}
                                onMouseUp={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 6px 0px #cc3d3d';
                                }}
                            >
                                START BETTING
                            </button>
                        </div>
                    )}
                </div>

                <div style={{ marginTop: '4rem', display: 'flex', gap: '2rem', opacity: 0.5 }}>
                    <span style={{ fontSize: '0.9rem' }}>SOLANA MAINNET</span>
                    <span style={{ fontSize: '0.9rem' }}>AI ORACLE V0.1</span>
                    <span style={{ fontSize: '0.9rem' }}>© 2026 KIMCHI-VEST</span>
                </div>
            </div>
        </div>
    )
}
