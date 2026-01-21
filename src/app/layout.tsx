import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Kimchi-Predict | Pump.fun Oracle',
    description: 'Bet on the success of Pump.fun projects.',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="ko">
            <body>{children}</body>
        </html>
    )
}
