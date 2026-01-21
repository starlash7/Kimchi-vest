export default function Home() {
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
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--accent)' }}>Kimchi-Predict</h1>
                <p style={{ opacity: 0.8 }}>빌더의 성실함에 베팅하고, 펌프펀의 성공을 예측하세요. 🚀</p>
            </div>
        </main>
    )
}
