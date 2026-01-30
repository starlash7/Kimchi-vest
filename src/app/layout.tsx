import './globals.css'
import type { Metadata } from 'next'
import Providers from '@/components/Providers'

export const metadata: Metadata = {
    title: 'Kimchi Vest | AI-Powered Pump.fun Prediction Oracle',
    description: 'Predict which Pump.fun tokens will graduate to Raydium. AI-powered analysis meets community wisdom on Solana.',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    )
}
