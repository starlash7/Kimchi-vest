'use client';

import { useEffect, useState } from 'react';

const logs = [
    '> INITIALIZING KIMCHI-VEST KERNEL...',
    '> LOADING SOLANA ORACLE MODULE...',
    '> CONNECTING TO PUMP.FUN NETWORK...',
    '> AI PREDICTION ENGINE [v0.1] ONLINE...',
    '> SYNCING ON-CHAIN DATA...',
    '> AUTHENTICATION LAYER READY...',
    '> SYSTEM STATUS: OPTIMAL',
    '> WELCOME TO KIMCHI VEST',
];

export default function IntroSequence({ onFinish }: { onFinish: () => void }) {
    const [currentLogs, setCurrentLogs] = useState<string[]>([]);
    const [index, setIndex] = useState(0);
    const [fading, setFading] = useState(false);

    useEffect(() => {
        if (index < logs.length) {
            const timeout = setTimeout(() => {
                setCurrentLogs((prev) => [...prev, logs[index]]);
                setIndex((prev) => prev + 1);
            }, 150 + Math.random() * 250);
            return () => clearTimeout(timeout);
        } else {
            // Start fade-out, then call onFinish
            const fadeTimeout = setTimeout(() => setFading(true), 500);
            return () => clearTimeout(fadeTimeout);
        }
    }, [index, onFinish]);

    useEffect(() => {
        if (fading) {
            const timeout = setTimeout(onFinish, 600);
            return () => clearTimeout(timeout);
        }
    }, [fading, onFinish]);

    return (
        <div
            className="intro-overlay"
            style={{
                opacity: fading ? 0 : 1,
                transition: 'opacity 0.6s ease',
            }}
        >
            <div className="intro-terminal">
                {currentLogs.map((log, i) => (
                    <div key={i} className="intro-line" style={{ animationDelay: `${i * 0.05}s` }}>
                        {log}
                    </div>
                ))}
                <span className="intro-cursor" />
            </div>
        </div>
    );
}
