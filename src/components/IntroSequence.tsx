'use client';

import { useEffect, useState } from 'react';

const logs = [
    '> INITIALIZING KIMCHI-VEST KERNEL...',
    '> LOADING SOLANA ORACLE MODULE...',
    '> ESTABLISHING CONNECTION TO PUMP.FUN...',
    '> BOOTING AI MARKET MAKER [KIMCHI-V0.1]...',
    '> SYNCING ON-CHAIN DATA...',
    '> AUTHENTICATION LAYER READY...',
    '> SYSTEM STATUS: OPTIMAL',
    '> WELCOME TO KIMCHI-VEST',
];

export default function IntroSequence({ onFinish }: { onFinish: () => void }) {
    const [currentLogs, setCurrentLogs] = useState<string[]>([]);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index < logs.length) {
            const timeout = setTimeout(() => {
                setCurrentLogs((prev) => [...prev, logs[index]]);
                setIndex((prev) => prev + 1);
            }, 200 + Math.random() * 300);
            return () => clearTimeout(timeout);
        } else {
            const timeout = setTimeout(onFinish, 1000);
            return () => clearTimeout(timeout);
        }
    }, [index, onFinish]);

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            background: '#050a30',
            color: '#00ff88',
            padding: '2rem',
            fontFamily: 'monospace',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            overflow: 'hidden',
        }}>
            {currentLogs.map((log, i) => (
                <div key={i} style={{ marginBottom: '0.5rem', fontSize: '1.2rem' }}>
                    {log}
                </div>
            ))}
            <div className="cursor" style={{
                width: '10px',
                height: '20px',
                background: '#00ff88',
                animation: 'blink 1s step-end infinite'
            }} />
            <style jsx>{`
        @keyframes blink {
          from, to { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
        </div>
    );
}
