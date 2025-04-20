"use client";

import Landingpage from '@/components/Landingpage';
import { WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';

import '@solana/wallet-adapter-react-ui/styles.css';

function Page() {
  return (
    <WalletProvider wallets={[]} autoConnect>
      <WalletModalProvider>
        <Landingpage />
      </WalletModalProvider>
    </WalletProvider>
  );
}

export default Page;