import { Button } from "@/components/ui/button";
import { ResponseData, TokenInvestment, Transaction } from "@/data/mockdata";
import { Plus, Search, Share, RefreshCw, ThumbsUp, ThumbsDown } from "lucide-react";
import { TransactionDisplay } from "./transactiondisplay";
import { TokenInvestmentCard, TokenTransactions } from "./pricechart";

interface ResponseDisplayProps {
  response: ResponseData;
  query: string;
}

export function ResponseDisplay({ response, query }: ResponseDisplayProps) {
  return (
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
        
        <h2 className="text-2xl font-medium text-white mb-4">{query}</h2>
        
        <div className="bg-zinc-800/30 rounded-xl p-4 border border-zinc-700/50 backdrop-blur-sm">
          {response.type === 'transactions' && (
            <TransactionDisplay transactions={response.data as Transaction[]} />
          )}
          
          {response.type === 'token-investment' && (
            <>
              <TokenInvestmentCard token={response.data as TokenInvestment} />
              <TokenTransactions token={response.data as TokenInvestment} />
            </>
          )}
          
          {response.type === 'text' && (
            <div className="prose prose-invert max-w-none">
              <p>{response.data as string}</p>
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
              <span>Show {(response.data as TokenInvestment).symbol} market cap</span>
            </Button>
            <Button variant="outline" className="justify-start gap-2 bg-zinc-800/70 hover:bg-zinc-700/70 border-zinc-700/50">
              <Plus className="w-4 h-4" />
              <span>Compare {(response.data as TokenInvestment).symbol} with BTC</span>
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
  );
}