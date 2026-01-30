'use client';

import { useAuth } from '@/components/Providers';
import { useState, useEffect, useRef, useCallback } from 'react';
import IntroSequence from '@/components/IntroSequence';

/* ── Inline SVG: Quilted Vest Icon ── */
function VestIcon() {
    return (
        <svg viewBox="0 0 200 260" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Left panel */}
            <path
                d="M35 65 L35 210 Q35 220 45 220 L88 220 L88 95 L78 82 L63 42 Q52 25 42 32 L35 65Z"
                fill="#E8424C" opacity="0.85"
            />
            {/* Right panel */}
            <path
                d="M165 65 L165 210 Q165 220 155 220 L112 220 L112 95 L122 82 L137 42 Q148 25 158 32 L165 65Z"
                fill="#E8424C" opacity="0.85"
            />
            {/* Neckline */}
            <path
                d="M63 42 L88 95 L100 78 L112 95 L137 42 Q120 12 100 18 Q80 12 63 42Z"
                fill="#E8424C" opacity="0.65"
            />
            {/* Quilted diamond lines — left */}
            <line x1="42" y1="90" x2="82" y2="130" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
            <line x1="42" y1="130" x2="82" y2="170" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
            <line x1="42" y1="170" x2="82" y2="210" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
            <line x1="82" y1="90" x2="42" y2="130" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
            <line x1="82" y1="130" x2="42" y2="170" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
            <line x1="82" y1="170" x2="42" y2="210" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
            {/* Quilted diamond lines — right */}
            <line x1="118" y1="90" x2="158" y2="130" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
            <line x1="118" y1="130" x2="158" y2="170" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
            <line x1="118" y1="170" x2="158" y2="210" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
            <line x1="158" y1="90" x2="118" y2="130" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
            <line x1="158" y1="130" x2="118" y2="170" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
            <line x1="158" y1="170" x2="118" y2="210" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
            {/* Pocket — left */}
            <rect x="48" y="155" width="28" height="32" rx="6" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            {/* Trim */}
            <path
                d="M88 95 L88 220" stroke="rgba(255,255,255,0.15)" strokeWidth="2"
            />
            <path
                d="M112 95 L112 220" stroke="rgba(255,255,255,0.15)" strokeWidth="2"
            />
        </svg>
    );
}

/* ── Scroll-reveal hook ── */
function useReveal() {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.classList.add('visible');
                }
            },
            { threshold: 0.15 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return ref;
}

/* ── Data ── */
const features = [
    {
        icon: '🔮',
        title: 'AI Oracle',
        desc: 'Advanced ML models analyze bonding curves and on-chain data to predict token graduations.',
    },
    {
        icon: '⚡',
        title: 'Real-time Feed',
        desc: 'Live monitoring of Pump.fun token launches with instant probability updates.',
    },
    {
        icon: '🎯',
        title: 'Smart Predictions',
        desc: 'Place predictions on token outcomes with dynamic odds calculated by our AI agent.',
    },
];

interface TokenData {
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

function getStatusClass(status: string) {
    if (status === 'graduated') return 'status-bonded';
    if (status === 'koth') return 'status-graduating';
    return 'status-live';
}

const steps = [
    { num: '01', title: 'Connect', desc: 'Link your wallet with one click via Privy.' },
    { num: '02', title: 'Discover', desc: 'Browse live token launches on Pump.fun.' },
    { num: '03', title: 'Predict', desc: 'Place your prediction on token graduation.' },
    { num: '04', title: 'Collect', desc: 'Win rewards when your predictions hit.' },
];

/* ══════════════════════════════════════════════════
   Main Page
   ══════════════════════════════════════════════════ */
export default function Home() {
    const { login, logout, authenticated } = useAuth();
    const [showIntro, setShowIntro] = useState(true);
    const [scrolled, setScrolled] = useState(false);
    const [barsAnimated, setBarsAnimated] = useState(false);
    const [tokens, setTokens] = useState<TokenData[]>([]);
    const [solPrice, setSolPrice] = useState(0);
    const [loading, setLoading] = useState(true);

    const featuresRef = useReveal();
    const predictionsRef = useReveal();
    const stepsRef = useReveal();

    /* Prediction bars ref for animating on scroll */
    const predSectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    /* Fetch live token data */
    useEffect(() => {
        async function fetchTokens() {
            try {
                const res = await fetch('/api/tokens?type=bonding&limit=10');
                const data = await res.json();
                if (data.tokens?.length) {
                    setTokens(data.tokens);
                    setSolPrice(data.solPrice || 0);
                }
            } catch (e) {
                console.error('Failed to fetch tokens:', e);
            } finally {
                setLoading(false);
            }
        }
        fetchTokens();
        const interval = setInterval(fetchTokens, 30000); // Refresh every 30s
        return () => clearInterval(interval);
    }, []);

    /* Animate prediction bars when section visible */
    useEffect(() => {
        const el = predSectionRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setBarsAnimated(true); },
            { threshold: 0.2 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const handleConnect = useCallback(() => {
        if (authenticated) logout();
        else login();
    }, [authenticated, login, logout]);

    return (
        <>
            {showIntro && <IntroSequence onFinish={() => setShowIntro(false)} />}

            {/* ── Navigation ── */}
            <nav className={`nav ${scrolled ? 'nav-scrolled' : ''}`}>
                <div className="nav-logo">KIMCHI VEST</div>
                <div className="nav-links">
                    <a href="#features">Features</a>
                    <a href="#predictions">Predictions</a>
                    <a href="#how-it-works">How It Works</a>
                </div>
                <button className="nav-btn" onClick={handleConnect}>
                    {authenticated ? 'Disconnect' : 'Connect Wallet'}
                </button>
            </nav>

            {/* ── Hero ── */}
            <section className="hero quilted-bg">
                <div className="hero-inner">
                    <div className="hero-content">
                        <div className="hero-badge">AI-Powered Prediction Oracle</div>
                        <h1 className="hero-title">KIMCHI<br />VEST</h1>
                        <p className="hero-desc">
                            Predict which Pump.fun tokens will graduate to Raydium.
                            AI-powered analysis meets community wisdom on Solana.
                        </p>
                        <div className="hero-buttons">
                            <button className="btn btn-primary" onClick={handleConnect}>
                                {authenticated ? 'Enter Dashboard' : 'Connect Wallet'}
                            </button>
                            <a href="#features" className="btn btn-ghost">Learn More</a>
                        </div>
                    </div>
                    <div className="hero-visual">
                        <div className="vest-icon-wrapper">
                            <VestIcon />
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Features ── */}
            <div id="features" className="section-alt quilted-bg">
                <div className="section reveal reveal-children" ref={featuresRef}>
                    <div className="section-label">Why Kimchi Vest?</div>
                    <h2 className="section-title">Built for Degens,<br />Powered by AI</h2>
                    <p className="section-subtitle">
                        Our AI oracle monitors every Pump.fun token launch in real time and predicts graduation probability.
                    </p>
                    <div className="features-grid">
                        {features.map((f) => (
                            <div key={f.title} className="feature-card">
                                <div className="feature-icon">{f.icon}</div>
                                <h3>{f.title}</h3>
                                <p>{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Live Predictions ── */}
            <div id="predictions" className="predictions-section" ref={predSectionRef}>
                <div className="section reveal" ref={predictionsRef}>
                    <div className="predictions-header">
                        <div>
                            <div className="section-label">Live Feed</div>
                            <h2 className="section-title">Token Predictions</h2>
                            <p className="section-subtitle" style={{ marginBottom: 0 }}>
                                Real-time graduation probability for Pump.fun tokens.
                            </p>
                        </div>
                        {solPrice > 0 && (
                            <div className="predictions-accuracy">
                                <div className="value">${solPrice.toFixed(0)}</div>
                                <div className="label">SOL Price</div>
                            </div>
                        )}
                    </div>
                    <div className="predictions-list">
                        {loading ? (
                            <div className="prediction-row" style={{ justifyContent: 'center', opacity: 0.5 }}>
                                Loading live data...
                            </div>
                        ) : tokens.length === 0 ? (
                            <div className="prediction-row" style={{ justifyContent: 'center', opacity: 0.5 }}>
                                No tokens found
                            </div>
                        ) : (
                            tokens.map((t) => (
                                <div key={t.mint} className="prediction-row">
                                    <span className="prediction-name">${t.symbol}</span>
                                    <div className="prediction-bar-track">
                                        <div
                                            className="prediction-bar-fill"
                                            style={{ width: barsAnimated ? `${t.graduationScore}%` : '0%' }}
                                        />
                                    </div>
                                    <span className="prediction-percent">{t.graduationScore}%</span>
                                    <span className={`prediction-status ${getStatusClass(t.status)}`}>
                                        {t.status}
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* ── How It Works ── */}
            <div id="how-it-works">
                <div className="section reveal reveal-children" ref={stepsRef}>
                    <div className="section-label">Get Started</div>
                    <h2 className="section-title">How It Works</h2>
                    <p className="section-subtitle">Four steps to start predicting.</p>
                    <div className="steps-grid">
                        {steps.map((s) => (
                            <div key={s.num} className="step-card">
                                <div className="step-number">{s.num}</div>
                                <h3>{s.title}</h3>
                                <p>{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Footer ── */}
            <footer className="footer">
                <div className="footer-inner">
                    <div className="footer-logo">KIMCHI VEST</div>
                    <div className="footer-text">&copy; 2026 Kimchi Vest. All rights reserved.</div>
                    <div className="footer-links">
                        <a href="#">Twitter</a>
                        <a href="#">Discord</a>
                        <a href="#">Docs</a>
                    </div>
                </div>
            </footer>
        </>
    );
}
