import './globals.css'
import type { Metadata } from 'next'
import Providers from '@/components/Providers'

export const metadata: Metadata = {
    title: 'Kimchi-vest | AI-Powered Pump.fun Prediction Market',
    description: 'AI가 분석한 실시간 배당률로 펌프펀 졸업을 예측하세요.',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="ko">
            <body>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    )
}
