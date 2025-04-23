export const mockUsdcTransactions = [
    {
      id: "tx1",
      type: "Send",
      amount: "25.5 USDC",
      recipient: "8xDR...9j2K",
      date: "Apr 18, 2025",
      time: "14:32",
      status: "Confirmed",
      fee: "0.000005 SOL"
    },
    {
      id: "tx2",
      type: "Receive",
      amount: "120.0 USDC",
      sender: "3qLD...v5mP",
      date: "Apr 16, 2025",
      time: "09:15",
      status: "Confirmed",
      fee: "0.000005 SOL"
    },
    {
      id: "tx3",
      type: "Swap",
      amount: "50.75 USDC",
      swappedFor: "0.25 SOL",
      date: "Apr 14, 2025",
      time: "18:47",
      status: "Confirmed",
      fee: "0.000008 SOL"
    }
  ];
  
  export const mockTokenInvestments = {
    SOL: {
      name: "Solana",
      symbol: "SOL",
      currentPrice: 177.82,
      priceChange24h: 5.3,
      holdings: 12.5,
      valueUSD: 2222.75,
      costBasis: 1875.00,
      profitLoss: 347.75,
      profitLossPercentage: 18.5,
      transactions: [
        { 
          id: "sol-tx1", 
          type: "Buy", 
          amount: "3.2 SOL", 
          price: "$142.20", 
          total: "$455.04",
          date: "Jan 15, 2025",
          time: "10:22"
        },
        { 
          id: "sol-tx2", 
          type: "Buy", 
          amount: "2.0 SOL", 
          price: "$145.50", 
          total: "$291.00",
          date: "Feb 12, 2025",
          time: "13:45"
        },
        { 
          id: "sol-tx3", 
          type: "Sell", 
          amount: "1.0 SOL", 
          price: "$160.75", 
          total: "$160.75",
          date: "Mar 01, 2025",
          time: "11:18"
        },
        { 
          id: "sol-tx4", 
          type: "Buy", 
          amount: "5.5 SOL", 
          price: "$153.00", 
          total: "$841.50",
          date: "Mar 18, 2025",
          time: "09:22"
        },
        { 
          id: "sol-tx5", 
          type: "Buy", 
          amount: "2.8 SOL", 
          price: "$162.25", 
          total: "$454.30",
          date: "Apr 05, 2025",
          time: "16:40"
        }
      ],
      priceHistory: [
        { date: "Apr 20, 2025", price: 177.82 },
        { date: "Apr 19, 2025", price: 169.34 },
        { date: "Apr 18, 2025", price: 165.21 },
        { date: "Apr 17, 2025", price: 159.73 },
        { date: "Apr 16, 2025", price: 152.45 },
        { date: "Apr 15, 2025", price: 158.93 },
        { date: "Apr 14, 2025", price: 162.14 },
        { date: "Apr 13, 2025", price: 156.27 },
        { date: "Apr 12, 2025", price: 155.12 },
        { date: "Apr 11, 2025", price: 151.89 },
        { date: "Apr 10, 2025", price: 150.37 },
        { date: "Apr 9, 2025", price: 148.65 },
        { date: "Apr 8, 2025", price: 152.18 },
        { date: "Apr 7, 2025", price: 150.22 }
      ]
    },
    BONK: {
      name: "Bonk",
      symbol: "BONK",
      currentPrice: 0.00000245,
      priceChange24h: -2.7,
      holdings: 15000000,
      valueUSD: 367.50,
      costBasis: 300.00,
      profitLoss: 67.50,
      profitLossPercentage: 22.5,
      transactions: [
        { 
          id: "bonk-tx1", 
          type: "Buy", 
          amount: "10,000,000 BONK", 
          price: "$0.00000180", 
          total: "$180.00",
          date: "Jan 22, 2025",
          time: "15:30"
        },
        { 
          id: "bonk-tx2", 
          type: "Buy", 
          amount: "5,000,000 BONK", 
          price: "$0.00000240", 
          total: "$120.00",
          date: "Mar 17, 2025",
          time: "11:14"
        }
      ],
      priceHistory: [
        { date: "Apr 20, 2025", price: 0.00000245 },
        { date: "Apr 19, 2025", price: 0.00000252 },
        { date: "Apr 18, 2025", price: 0.00000248 },
        { date: "Apr 17, 2025", price: 0.00000260 },
        { date: "Apr 16, 2025", price: 0.00000255 },
        { date: "Apr 15, 2025", price: 0.00000235 },
        { date: "Apr 14, 2025", price: 0.00000230 },
        { date: "Apr 13, 2025", price: 0.00000240 },
        { date: "Apr 12, 2025", price: 0.00000233 },
        { date: "Apr 11, 2025", price: 0.00000228 },
        { date: "Apr 10, 2025", price: 0.00000215 },
        { date: "Apr 9, 2025", price: 0.00000210 },
        { date: "Apr 8, 2025", price: 0.00000205 },
        { date: "Apr 7, 2025", price: 0.00000200 }
      ]
    },
    JUP: {
      name: "Jupiter",
      symbol: "JUP",
      currentPrice: 4.53,
      priceChange24h: 12.8,
      holdings: 440,
      valueUSD: 1993.20,
      costBasis: 1540.00,
      profitLoss: 453.20,
      profitLossPercentage: 29.4,
      transactions: [
        { 
          id: "jup-tx1", 
          type: "Buy", 
          amount: "300 JUP", 
          price: "$3.20", 
          total: "$960.00",
          date: "Feb 05, 2025",
          time: "10:15"
        },
        { 
          id: "jup-tx2", 
          type: "Buy", 
          amount: "140 JUP", 
          price: "$4.15", 
          total: "$580.00",
          date: "Mar 28, 2025",
          time: "17:32"
        }
      ],
      priceHistory: [
        { date: "Apr 20, 2025", price: 4.53 },
        { date: "Apr 19, 2025", price: 4.02 },
        { date: "Apr 18, 2025", price: 3.95 },
        { date: "Apr 17, 2025", price: 3.88 },
        { date: "Apr 16, 2025", price: 3.76 },
        { date: "Apr 15, 2025", price: 3.82 },
        { date: "Apr 14, 2025", price: 3.67 },
        { date: "Apr 13, 2025", price: 3.55 },
        { date: "Apr 12, 2025", price: 3.48 },
        { date: "Apr 11, 2025", price: 3.52 },
        { date: "Apr 10, 2025", price: 3.45 },
        { date: "Apr 9, 2025", price: 3.38 },
        { date: "Apr 8, 2025", price: 3.25 },
        { date: "Apr 7, 2025", price: 3.20 }
      ]
    }
  };
  
  export type Transaction = {
    id: string;
    type: string;
    amount: string;
    recipient?: string;
    sender?: string;
    date: string;
    time: string;
    status: string;
    fee: string;
    swappedFor?: string;
  };
  
  export type TokenTransaction = {
    id: string;
    type: string;
    amount: string;
    price: string;
    total: string;
    date: string;
    time: string;
  };
  
  export type PricePoint = {
    date: string;
    price: number;
  };
  
  export type TokenInvestment = {
    name: string;
    symbol: string;
    currentPrice: number;
    priceChange24h: number;
    holdings: number;
    valueUSD: number;
    costBasis: number;
    profitLoss: number;
    profitLossPercentage: number;
    transactions: TokenTransaction[];
    priceHistory: PricePoint[];
  };
  
  export type ResponseData = {
    type: 'transactions' | 'token-investment' | 'text';
    data: Transaction[] | TokenInvestment | string;
  };