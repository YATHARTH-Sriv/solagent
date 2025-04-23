import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { TokenInvestment } from "@/data/mockdata";
// import { TokenInvestment, TokenTransaction } from "@/data/MockData";

interface PriceChartProps {
  token: TokenInvestment;
}

export function PriceChart({ token }: PriceChartProps) {
  const chartRef = useRef<SVGSVGElement>(null);
  const priceHistory = token.priceHistory;
  const prices = priceHistory.map(p => p.price);
  const maxPrice = Math.max(...prices) * 1.05;
  const minPrice = Math.min(...prices) * 0.95;
  const range = maxPrice - minPrice;
  
  // Create path for line
  const createPathD = () => {
    return priceHistory.map((point, i) => {
      const x = (i / (priceHistory.length - 1)) * 100;
      const y = 100 - ((point.price - minPrice) / range) * 100;
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
  };
  
  // Create fill gradient path
  const createFillPathD = () => {
    const points = priceHistory.map((point, i) => {
      const x = (i / (priceHistory.length - 1)) * 100;
      const y = 100 - ((point.price - minPrice) / range) * 100;
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
    return `${points} L 100 100 L 0 100 Z`;
  };
  
  // Format price based on token
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
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-[10px] text-zinc-500 z-10">
          <span>${formatTokenPrice(maxPrice)}</span>
          <span>${formatTokenPrice((maxPrice + minPrice) / 2)}</span>
          <span>${formatTokenPrice(minPrice)}</span>
        </div>
        
        {/* Chart container */}
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
      
      {/* X-axis dates */}
      <div className="pl-[45px] flex justify-between mt-2">
        {[0, 4, 9, 13].map((idx) => (
          <div key={idx} className="text-xs text-zinc-500">
            {new Date(priceHistory[idx].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </div>
        ))}
      </div>
    </div>
  );
}

interface TokenTransactionsProps {
  token: TokenInvestment;
}

export function TokenTransactions({ token }: TokenTransactionsProps) {
  const [currentPage, setCurrentPage] = useState(1);
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
        {currentTransactions.map((tx) => (
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
      
      <div className="mt-3 text-right text-sm text-zinc-400">
        Showing {Math.min(token.transactions.length, currentPage * transactionsPerPage) - 
        ((currentPage - 1) * transactionsPerPage)} of {token.transactions.length} transactions
      </div>
    </div>
  );
}

interface TokenSummaryProps {
  token: TokenInvestment;
}

export function TokenSummary({ token }: TokenSummaryProps) {
  return (
    <div className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700/50">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-lg font-bold">
          {token.symbol === 'SOL' ? 'S' :
            token.symbol === 'BONK' ? 'B' : 'J'}
        </div>
        <div>
          <h3 className="text-xl font-semibold">{token.name}</h3>
          <p className="text-sm text-zinc-400">{token.symbol}</p>
        </div>
        <div className={`ml-auto ${token.priceChange24h >= 0 ? 'text-green-400' : 'text-red-400'} text-right`}>
          <p className="font-medium">
            ${token.currentPrice.toLocaleString('en-US', { 
              minimumFractionDigits: token.symbol === 'BONK' ? 8 : 2, 
              maximumFractionDigits: token.symbol === 'BONK' ? 8 : 2 
            })}
          </p>
          <p className="text-xs">
            {token.priceChange24h >= 0 ? '+' : ''}{token.priceChange24h}% (24h)
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-x-4 gap-y-3 mt-5">
        <div>
          <p className="text-xs text-zinc-400">Holdings</p>
          <p className="font-medium">{token.holdings.toLocaleString()} {token.symbol}</p>
        </div>
        <div>
          <p className="text-xs text-zinc-400">Value</p>
          <p className="font-medium">${token.valueUSD.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs text-zinc-400">Cost Basis</p>
          <p className="font-medium">${token.costBasis.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs text-zinc-400">Profit/Loss</p>
          <p className={`font-medium ${token.profitLoss >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {token.profitLoss >= 0 ? '+' : ''}{token.profitLossPercentage}% (${token.profitLoss.toLocaleString()})
          </p>
        </div>
      </div>
    </div>
  );
}

export function TokenInvestmentCard({ token }: TokenSummaryProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-6 md:items-start">
      <div className="md:w-1/2">
        <TokenSummary token={token} />
      </div>
      <div className="md:w-1/2 bg-zinc-800/50 rounded-lg p-4 border border-zinc-700/50">
        <PriceChart token={token} />
      </div>
    </div>
  );
}