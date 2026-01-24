'use client';

import { usePrivy } from '@privy-io/react-auth';

export default function Home() {
    const { login, logout, authenticated, user } = usePrivy();

    return (
        <main style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            padding: '2rem'
        }}>
            <div className="glass" style={{ padding: '3rem', textAlign: 'center' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--accent)' }}>Kimchi-vest</h1>
                <p style={{ opacity: 0.8, fontSize: '1.2rem' }}>AI가 분석한 실시간 배당률로 펌프펀 졸업을 예측하세요. 🚀</p>

                <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                    {authenticated ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <p style={{ color: 'var(--accent)' }}>환영합니다, {user?.email?.address || 'User'}님!</p>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button className="btn-primary" style={{ padding: '0.8rem 2rem', borderRadius: '12px', background: 'var(--accent)', color: 'black', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>라이브 배팅 보드 입장</button>
                                <button onClick={logout} style={{ padding: '0.8rem 2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: 'white', cursor: 'pointer' }}>로그아웃</button>
                            </div>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button onClick={login} className="btn-primary" style={{ padding: '0.8rem 2rem', borderRadius: '12px', background: 'var(--accent)', color: 'black', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>지갑 연결 및 시작하기</button>
                            <button style={{ padding: '0.8rem 2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: 'white', cursor: 'pointer' }}>AI 리포트 보기</button>
                        </div>
                    )}
                </div>
            </div>
        </main>
    )
}
