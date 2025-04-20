"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Clock, Calendar, ArrowUp, Info, Star, Search, Plus, Copy, ThumbsUp, ThumbsDown, Share, RefreshCw } from "lucide-react"
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import Link from "next/link"
import { Toaster, toast } from "sonner"

const mockUsdcTransactions = [
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
]

const mockTokenInvestments = {
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
}

export default function SolanaAgentChat() {
  const [inputValue, setInputValue] = useState("")
  const [currentTime, setCurrentTime] = useState("")
  const [currentDate, setCurrentDate] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState<any>(null)
  const [showThinking, setShowThinking] = useState(false)
  const [chatHistory, setChatHistory] = useState<{query: string, response: any}[]>([])
  const [showGithubToast, setShowGithubToast] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const inputRef = useRef<HTMLInputElement>(null)
  const chartRef = useRef<SVGSVGElement>(null)
  const { connected } = useWallet()
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    
    if (!inputValue.trim() || !connected) return
    
    setIsLoading(true)
    setShowThinking(true)
    
    // Store the query
    const query = inputValue
    setInputValue("")
    
    // Simulate API call
    setTimeout(() => {
      setShowThinking(false)
      
      let responseData = null;
      
      if (query.toLowerCase().includes('usdc') && query.toLowerCase().includes('transaction')) {
        responseData = {
          type: 'transactions',
          data: mockUsdcTransactions
        };
      } else if (query.toLowerCase().includes('sol') && 
               (query.toLowerCase().includes('investment') || 
                query.toLowerCase().includes('token') || 
                query.toLowerCase().includes('holdings'))) {
        responseData = {
          type: 'token-investment',
          data: mockTokenInvestments.SOL
        };
      } else if (query.toLowerCase().includes('bonk') && 
               (query.toLowerCase().includes('investment') || 
                query.toLowerCase().includes('token') || 
                query.toLowerCase().includes('holdings'))) {
        responseData = {
          type: 'token-investment',
          data: mockTokenInvestments.BONK
        };
      } else if (query.toLowerCase().includes('jup') || 
               (query.toLowerCase().includes('jupiter') && 
               (query.toLowerCase().includes('investment') || 
                query.toLowerCase().includes('token') || 
                query.toLowerCase().includes('holdings')))) {
        responseData = {
          type: 'token-investment',
          data: mockTokenInvestments.JUP
        };
      } else {
        // Generic response
        responseData = {
          type: 'text',
          data: `Here's information about your request: "${query}". This is a mock response for demonstration purposes.`
        };
      }
      
      setResponse(responseData);
      
      // Add to chat history
      setChatHistory(prev => [...prev, {
        query,
        response: responseData
      }]);
      
      setIsLoading(false)
    }, 2000)
  }

  // Update time and date
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }))
      setCurrentDate(now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }))
    }
    
    updateDateTime()
    const interval = setInterval(updateDateTime, 60000)
    return () => clearInterval(interval)
  }, [])

  // Handle Enter key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && document.activeElement === inputRef.current) {
        handleSubmit();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [inputValue, connected]);
  
  // Function to render price chart for token investments - IMPROVED VERSION
  const renderPriceChart = (token: typeof mockTokenInvestments.SOL) => {
    const priceHistory = token.priceHistory;
    const prices = priceHistory.map(p => p.price);
    const maxPrice = Math.max(...prices) * 1.05;
    const minPrice = Math.min(...prices) * 0.95;
    const range = maxPrice - minPrice;
    
    // Fix for the graph rendering - use the actual data points with proper scaling
    const createPathD = () => {
      return priceHistory.map((point, i) => {
        const x = (i / (priceHistory.length - 1)) * 100;
        const y = 100 - ((point.price - minPrice) / range) * 100;
        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
      }).join(' ');
    };
    
    // Generate fill gradient path with proper scaling
    const createFillPathD = () => {
      const points = priceHistory.map((point, i) => {
        const x = (i / (priceHistory.length - 1)) * 100;
        const y = 100 - ((point.price - minPrice) / range) * 100;
        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
      }).join(' ');
      return `${points} L 100 100 L 0 100 Z`;
    };
    
    // Format price based on token (for tokens with very small values like BONK)
    const formatTokenPrice = (price: number) => {
      if (token.symbol === 'BONK' || price < 0.01) {
        return price.toFixed(8);
      }
      return price.toFixed(2);
    };

    return (
      <div className="mt-3 pb-1">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-base font-medium text-zinc-300">Price history (14 days)</h4>
          <div className={`py-1 px-2 rounded-md text-xs font-medium ${token.priceChange24h >= 0 ? 'bg-green-900/20 text-green-400' : 'bg-red-900/20 text-red-400'}`}>
            {token.priceChange24h >= 0 ? '↑' : '↓'} {Math.abs(token.priceChange24h)}% (24h)
          </div>
        </div>
        
        <div className="relative h-[140px] mt-2">
          {/* Y-axis labels - Better positioned */}
          <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-[10px] text-zinc-500 z-10">
            <span>${formatTokenPrice(maxPrice)}</span>
            <span>${formatTokenPrice((maxPrice + minPrice) / 2)}</span>
            <span>${formatTokenPrice(minPrice)}</span>
          </div>
          
          {/* Chart container with better alignment */}
          <div className="absolute left-[45px] right-0 top-0 bottom-0 bg-zinc-800/20 rounded border border-zinc-700/30">
            {/* Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
              <div className="border-t border-zinc-700/30 h-0"></div>
              <div className="border-t border-zinc-700/30 h-0"></div>
              <div className="border-t border-zinc-700/30 h-0"></div>
            </div>
            
            {/* Interactive chart area */}
            <div className="absolute inset-0">
              {/* Line chart */}
              <svg 
                className="w-full h-full" 
                viewBox="0 0 100 100" 
                preserveAspectRatio="none"
                ref={chartRef}
              >
                {/* Fill gradient */}
                <defs>
                  <linearGradient id={`gradient-${token.symbol}`} x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor={token.priceChange24h >= 0 ? 'rgb(74, 222, 128, 0.3)' : 'rgb(248, 113, 113, 0.3)'} />
                    <stop offset="100%" stopColor={token.priceChange24h >= 0 ? 'rgb(74, 222, 128, 0.05)' : 'rgb(248, 113, 113, 0.05)'} />
                  </linearGradient>
                </defs>
                
                {/* Gradient fill beneath line */}
                <path
                  d={createFillPathD()}
                  fill={`url(#gradient-${token.symbol})`}
                  stroke="none"
                />
                
                {/* Line path */}
                <path
                  d={createPathD()}
                  fill="none"
                  stroke={token.priceChange24h >= 0 ? '#4ade80' : '#f87171'}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                
                {/* Data points */}
                {priceHistory.map((point, i) => {
                  const x = (i / (priceHistory.length - 1)) * 100;
                  const y = 100 - ((point.price - minPrice) / range) * 100;
                  return (
                    <circle
                      key={i}
                      cx={x}
                      cy={y}
                      r="0.8"
                      fill={token.priceChange24h >= 0 ? '#4ade80' : '#f87171'}
                      className="opacity-70 hover:opacity-100 hover:r-1.5"
                    />
                  );
                })}
              </svg>
            </div>
            
            {/* Hover interaction layer */}
            <div className="absolute inset-0 flex">
              {priceHistory.map((point, i) => (
                <div
                  key={i}
                  className="h-full flex-1 group cursor-pointer"
                >
                  <div className="opacity-0 group-hover:opacity-100 absolute bottom-full mb-2 -ml-16 bg-zinc-800 text-white text-xs py-1 px-2 rounded pointer-events-none transition-opacity z-10 whitespace-nowrap">
                    <div className="font-medium">{point.date}</div>
                    <div className="text-[10px] flex justify-between gap-3">
                      <span>Price:</span> 
                      <span className="font-medium">${formatTokenPrice(point.price)}</span>
                    </div>
                  </div>
                  <div className="h-full w-full group-hover:bg-white/5 transition-colors duration-150"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* X-axis dates - Better positioned */}
        <div className="pl-[45px] flex justify-between mt-2">
          {[0, 4, 9, 13].map((idx) => (
            <div key={idx} className="text-xs text-zinc-500">
              {new Date(priceHistory[idx].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Render transactions with better pagination for multiple items
  const renderTransactions = (token: typeof mockTokenInvestments.SOL) => {
    const transactionsPerPage = 3;
    const totalPages = Math.ceil(token.transactions.length / transactionsPerPage);
    
    // Get current transactions
    const indexOfLastTransaction = currentPage * transactionsPerPage;
    const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
    const currentTransactions = token.transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);
    
    return (
      <div className="mt-6">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-medium text-lg">Transaction History</h4>
          
          {token.transactions.length > transactionsPerPage && (
            <div className="flex items-center space-x-2 bg-zinc-800/70 rounded-lg px-2">
              <Button 
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0 text-zinc-400 hover:text-white disabled:opacity-50"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                &lt;
              </Button>
              <span className="text-sm text-zinc-300">
                {currentPage} / {totalPages}
              </span>
              <Button 
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0 text-zinc-400 hover:text-white disabled:opacity-50"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                &gt;
              </Button>
            </div>
          )}
        </div>
        
        <div className="space-y-3">
          {currentTransactions.map((tx: any) => (
            <div key={tx.id} className="bg-zinc-800/50 rounded-lg p-3 border border-zinc-700/50 flex flex-wrap md:flex-nowrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  tx.type === 'Buy' ? 'bg-green-600/20 text-green-400' : 'bg-red-600/20 text-red-400'
                }`}>
                  {tx.type === 'Buy' ? '↓' : '↑'}
                </div>
                <div>
                  <p className="font-medium">{tx.type} {token.symbol}</p>
                  <p className="text-xs text-zinc-400">{tx.date} at {tx.time}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 ml-auto text-right">
                <div>
                  <p className="text-xs text-zinc-400">Amount</p>
                  <p className="font-medium">{tx.amount}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-400">Price</p>
                  <p className="font-medium">{tx.price}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-400">Total</p>
                  <p className="font-medium">{tx.total}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Show transactions count */}
        <div className="mt-3 text-right text-sm text-zinc-400">
          Showing {Math.min(token.transactions.length, currentPage * transactionsPerPage) - 
          ((currentPage - 1) * transactionsPerPage)} of {token.transactions.length} transactions
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-black to-zinc-900 text-white">
      {/* Toaster for notifications */}
      <Toaster position="top-center" richColors />
      
      {/* Header with glass effect */}
      <header className="flex justify-between items-center p-4 backdrop-blur-sm bg-black/30 sticky top-0 z-10 border-b border-zinc-800/50">
        <WalletMultiButton className="bg-yellow-400 hover:!bg-yellow-500 !text-black !font-semibold !text-lg !py-3 !px-10 !rounded-lg !transition-all !duration-300 shadow-lg" />
        
        <div className="flex items-center gap-3">
          <Button
            id="github-star-button"
            variant="outline"
            className="bg-zinc-800/80 hover:bg-zinc-700/90 border-none text-white gap-2 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <Link
              className="flex items-center gap-2"
              target="_blank"
              href={"https://github.com/YATHARTH-Sriv/solagent"}
            >
              <Star className="h-5 w-5 text-yellow-300" />
              <span className="text-white font-medium">Github</span>
            </Link>
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-zinc-400 hover:text-white hover:bg-zinc-800/80 transition-colors duration-300"
          >
            <Info className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-zinc-400 hover:text-white hover:bg-zinc-800/80 transition-colors duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2" />
              <path d="M12 20v2" />
              <path d="M4.93 4.93l1.41 1.41" />
              <path d="M17.66 17.66l1.41 1.41" />
              <path d="M2 12h2" />
              <path d="M20 12h2" />
              <path d="M6.34 17.66l-1.41 1.41" />
              <path d="M19.07 4.93l-1.41 1.41" />
            </svg>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center px-4 py-8">
        {!response && !showThinking && (
          <div className="flex flex-col items-center justify-center flex-1 w-full max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-10 text-center bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent tracking-tight">
              What would you like to know about your Solana wallet?
            </h1>
          </div>
        )}
        
        {/* AI Thinking Animation */}
        {showThinking && (
          <div className="w-full max-w-3xl mx-auto mt-8 mb-12 animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-purple-600 p-2 rounded-full">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 4V2M12 20v2M6.31412 6.31412L4.8999 4.8999M17.6999 17.6999l1.4142 1.4142M4 12H2M20 12h2M6.31412 17.6999l-1.41422 1.4142M17.6999 6.31412l1.4142-1.41422" 
                    stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    className="animate-spin" style={{animationDuration: '2s'}} />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-lg">Thinking...</p>
                <p className="text-zinc-400 text-sm">Processing your request</p>
              </div>
            </div>
            
            <div className="flex gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div 
                  key={i} 
                  className="h-1 bg-purple-600/60 rounded-full animate-pulse" 
                  style={{
                    width: `${Math.random() * 10 + 5}%`,
                    animationDelay: `${i * 0.1}s`
                  }}
                />
              ))}
            </div>
          </div>
        )}
        
        {/* Response Display - Similar to Perplexity.ai */}
        {response && (
          <div className="w-full max-w-3xl mx-auto mt-8 mb-12 animate-fade-in">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-1">
                <Search className="w-4 h-4 text-zinc-400" />
                <p className="text-zinc-400 text-sm">Search</p>
                <div className="ml-auto flex items-center gap-2">
                  <span className="text-zinc-400 text-sm">1 task</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" 
                    className="text-zinc-400" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </div>
              </div>
              
              <h2 className="text-2xl font-medium text-white mb-4">{chatHistory.length > 0 ? chatHistory[chatHistory.length - 1].query : ""}</h2>
              
              <div className="bg-zinc-800/30 rounded-xl p-4 border border-zinc-700/50 backdrop-blur-sm">
                {response.type === 'transactions' && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-semibold">USDC Transactions</h3>
                      <div className="bg-zinc-800/80 rounded-full px-3 py-1 text-sm font-medium text-zinc-300">
                        {response.data.length} transactions
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      {response.data.map((tx: any) => (
                        <div key={tx.id} className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700/50">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                tx.type === 'Receive' ? 'bg-green-600/20 text-green-400' : 
                                tx.type === 'Send' ? 'bg-red-600/20 text-red-400' : 'bg-blue-600/20 text-blue-400'
                              }`}>
                                {tx.type === 'Receive' ? '↓' : tx.type === 'Send' ? '↑' : '⇄'}
                              </div>
                              <div>
                                <p className="font-medium">{tx.type}</p>
                                <p className="text-sm text-zinc-400">
                                  {tx.date} at {tx.time}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className={`font-medium ${
                                tx.type === 'Receive' ? 'text-green-400' : 
                                tx.type === 'Send' ? 'text-red-400' : 'text-blue-400'
                              }`}>{tx.amount}</p>
                              <p className="text-sm text-zinc-400">Fee: {tx.fee}</p>
                            </div>
                          </div>
                          
                          <div className="mt-3 pt-3 border-t border-zinc-700/50 flex items-center justify-between">
                            <div className="text-sm text-zinc-400">
                              {tx.type === 'Receive' ? `From: ${tx.sender}` : 
                               tx.type === 'Send' ? `To: ${tx.recipient}` : 
                               `Swapped for: ${tx.swappedFor}`}
                            </div>
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="ghost" className="h-8 px-2 text-zinc-400 hover:text-white">
                                <Copy className="w-3.5 h-3.5" />
                              </Button>
                              <Button size="sm" variant="ghost" className="h-8 px-2 text-zinc-400 hover:text-white">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                  <polyline points="15 3 21 3 21 9"></polyline>
                                  <line x1="10" y1="14" x2="21" y2="3"></line>
                                </svg>
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {response.type === 'token-investment' && (
                  <div>
                    <div className="flex flex-col md:flex-row gap-4 md:gap-6 md:items-start">
                      {/* Left Column - Token Summary */}
                      <div className="md:w-1/2 bg-zinc-800/50 rounded-lg p-4 border border-zinc-700/50">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-lg font-bold">
                            {response.data.symbol === 'SOL' ? 'S' :
                             response.data.symbol === 'BONK' ? 'B' : 'J'}
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold">{response.data.name}</h3>
                            <p className="text-sm text-zinc-400">{response.data.symbol}</p>
                          </div>
                          <div className={`ml-auto ${response.data.priceChange24h >= 0 ? 'text-green-400' : 'text-red-400'} text-right`}>
                            <p className="font-medium">
                              ${response.data.currentPrice.toLocaleString('en-US', { 
                                minimumFractionDigits: response.data.symbol === 'BONK' ? 8 : 2, 
                                maximumFractionDigits: response.data.symbol === 'BONK' ? 8 : 2 
                              })}
                            </p>
                            <p className="text-xs">
                              {response.data.priceChange24h >= 0 ? '+' : ''}{response.data.priceChange24h}% (24h)
                            </p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-x-4 gap-y-3 mt-5">
                          <div>
                            <p className="text-xs text-zinc-400">Holdings</p>
                            <p className="font-medium">{response.data.holdings.toLocaleString()} {response.data.symbol}</p>
                          </div>
                          <div>
                            <p className="text-xs text-zinc-400">Value</p>
                            <p className="font-medium">${response.data.valueUSD.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-zinc-400">Cost Basis</p>
                            <p className="font-medium">${response.data.costBasis.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-zinc-400">Profit/Loss</p>
                            <p className={`font-medium ${response.data.profitLoss >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                              {response.data.profitLoss >= 0 ? '+' : ''}{response.data.profitLossPercentage}% (${response.data.profitLoss.toLocaleString()})
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Right Column - Price Chart */}
                      <div className="md:w-1/2 bg-zinc-800/50 rounded-lg p-4 border border-zinc-700/50">
                        {renderPriceChart(response.data)}
                      </div>
                    </div>
                    
                    {/* Transaction History - Now with pagination for SOL */}
                    {renderTransactions(response.data)}
                  </div>
                )}
                
                {response.type === 'text' && (
                  <div className="prose prose-invert max-w-none">
                    <p>{response.data}</p>
                  </div>
                )}
              </div>
              
              {/* Response actions */}
              <div className="flex items-center justify-end mt-4 gap-2">
                <Button size="sm" variant="ghost" className="h-8 px-2 text-zinc-400 hover:text-white">
                  <Share className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost" className="h-8 px-2 text-zinc-400 hover:text-white">
                  <RefreshCw className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost" className="h-8 px-2 text-zinc-400 hover:text-white">
                  <ThumbsUp className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost" className="h-8 px-2 text-zinc-400 hover:text-white">
                  <ThumbsDown className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex items-center gap-2 mt-8 mb-2 text-sm">
              <div className="flex-1 h-px bg-zinc-800"></div>
              <span className="text-zinc-400">Related searches</span>
              <div className="flex-1 h-px bg-zinc-800"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
              {response.type === 'token-investment' && (
                <>
                  <Button variant="outline" className="justify-start gap-2 bg-zinc-800/70 hover:bg-zinc-700/70 border-zinc-700/50">
                    <Plus className="w-4 h-4" />
                    <span>Show {response.data.symbol} market cap</span>
                  </Button>
                  <Button variant="outline" className="justify-start gap-2 bg-zinc-800/70 hover:bg-zinc-700/70 border-zinc-700/50">
                    <Plus className="w-4 h-4" />
                    <span>Compare {response.data.symbol} with BTC</span>
                  </Button>
                </>
              )}
              <Button variant="outline" className="justify-start gap-2 bg-zinc-800/70 hover:bg-zinc-700/70 border-zinc-700/50">
                <Plus className="w-4 h-4" />
                <span>Show my total portfolio</span>
              </Button>
              <Button variant="outline" className="justify-start gap-2 bg-zinc-800/70 hover:bg-zinc-700/70 border-zinc-700/50">
                <Plus className="w-4 h-4" />
                <span>Show my NFT collection</span>
              </Button>
            </div>
          </div>
        )}

        {/* Chat Input with enhanced styling */}
        <div className="w-full max-w-2xl sticky mt-auto bottom-4">
          <form onSubmit={handleSubmit} className="relative">
            <div className="relative rounded-xl border border-zinc-700/80 bg-zinc-900/90 shadow-lg shadow-purple-900/10 backdrop-blur-sm transition-all duration-300 hover:border-zinc-600/80 group">
              <Input
                ref={inputRef}
                placeholder={connected ? "Ask about your balance, transactions, NFTs..." : "Connect wallet to start asking questions..."}
                className="bg-transparent border-none text-white py-8 pl-4 pr-12 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-zinc-500 transition-all duration-300"
                value={inputValue}
                onChange={handleInputChange}
                disabled={!connected || isLoading}
              />

              {/* Submit Button with enhanced styling and animation */}
              <Button
                type="submit"
                size="icon"
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 rounded-full 
                  ${(!inputValue || !connected || isLoading) 
                    ? "bg-purple-800/50 text-zinc-400 cursor-not-allowed" 
                    : "bg-gradient-to-r from-purple-800 to-purple-700 hover:from-purple-700 hover:to-purple-600 text-white shadow-md hover:shadow-lg shadow-purple-900/20"
                  } transition-all duration-300`}
                disabled={!inputValue || !connected || isLoading}
              >
                {isLoading ? (
                  <div className="animate-spin h-5 w-5 border-2 border-white/30 border-t-white rounded-full" />
                ) : (
                  <ArrowUp className={`h-5 w-5 ${inputValue && connected ? "group-hover:animate-bounce" : ""}`} />
                )}
              </Button>
            </div>
          </form>

          {/* Time and Date with enhanced styling */}
          <div className="flex flex-wrap gap-3 mt-4 justify-center">
            <div className="flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-zinc-700/30 shadow-md">
              <Clock className="h-4 w-4 text-purple-400" />
              <span className="text-sm font-medium">{currentTime}</span>
            </div>
            <div className="flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-zinc-700/30 shadow-md">
              <Calendar className="h-4 w-4 text-purple-400" />
              <span className="text-sm font-medium">{currentDate}</span>
            </div>
          </div>
        </div>
      </main>
      
      {/* Add global styles for animations */}
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  )
}