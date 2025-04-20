'use client'

import { ConnectionProvider } from '@solana/wallet-adapter-react';
import React from 'react';

const endpoint = process.env.NEXT_PUBLIC_DEVENT_ENDPOINT as string;

export function SolanaProvider({ children }: { children: React.ReactNode }) {
  return <ConnectionProvider endpoint={endpoint}>{children}</ConnectionProvider>;
}