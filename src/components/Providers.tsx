'use client';

import { PrivyProvider } from '@privy-io/react-auth';

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <PrivyProvider
            appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ''}
            config={{
                // Customize Privy's appearance in your app
                appearance: {
                    theme: 'dark',
                    accentColor: '#00ff88',
                    logo: 'https://kr.object.ncloudstorage.com/kimchi-vest/logo.png', // Placeholder
                },
                // Create embedded wallets for users who don't have a wallet
                embeddedWallets: {
                    solana: {
                        createOnLogin: 'users-without-wallets',
                    },
                    ethereum: {
                        createOnLogin: 'users-without-wallets',
                    },
                },
            }}
        >
            {children}
        </PrivyProvider>
    );
}
