'use client';

import { PrivyProvider, usePrivy } from '@privy-io/react-auth';
import React, { createContext, useContext } from 'react';

// Create a bridge context to safely handle Mock vs Real Privy
const SafeAuthContext = createContext<any>(null);

export const useAuth = () => {
    const context = useContext(SafeAuthContext);
    // If we are in Mock mode, return the mock values
    if (context) return context;

    // Otherwise, try using real Privy (this only happens inside a real PrivyProvider)
    try {
        return usePrivy();
    } catch (e) {
        return {
            authenticated: false,
            login: () => alert('Privy App ID가 설정되지 않았습니다. 대시보드에서 발급받아 .env.local에 넣어주세요!'),
            logout: () => { },
            user: null,
        };
    }
};

export default function Providers({ children }: { children: React.ReactNode }) {
    const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID;

    // Privy App IDs MUST start with 'cl' or 'cm' and be reasonably long.
    const isRealPrivyId = appId && (appId.startsWith('cl') || appId.startsWith('cm')) && appId.length > 20;

    if (!isRealPrivyId) {
        console.log("KIMCHI-VEST: Operating in MOCK AUTH mode (Invalid/Missing App ID).");
        const mockValue = {
            authenticated: false,
            login: () => alert('Privy App ID를 설정해 주세요! (.env.local)'),
            logout: () => { },
            user: null,
            ready: true
        };
        return (
            <SafeAuthContext.Provider value={mockValue}>
                {children}
            </SafeAuthContext.Provider>
        );
    }

    console.log("KIMCHI-VEST: Operating in REAL PRIVY mode.");
    return (
        <PrivyProvider
            appId={appId}
            config={{
                appearance: {
                    theme: 'dark',
                    accentColor: '#00ff88',
                    logo: 'https://kr.object.ncloudstorage.com/kimchi-vest/logo.png',
                },
                embeddedWallets: {
                    solana: { createOnLogin: 'users-without-wallets' },
                    ethereum: { createOnLogin: 'users-without-wallets' },
                },
            }}
        >
            {children}
        </PrivyProvider>
    );
}
