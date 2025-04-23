import { Button } from "@/components/ui/button";
import { Transaction } from "@/data/mockdata";
import { Copy } from "lucide-react";
// import { Transaction } from "@/data/MockData";

interface TransactionDisplayProps {
  transactions: Transaction[];
}

export function TransactionDisplay({ transactions }: TransactionDisplayProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">USDC Transactions</h3>
        <div className="bg-zinc-800/80 rounded-full px-3 py-1 text-sm font-medium text-zinc-300">
          {transactions.length} transactions
        </div>
      </div>
      
      <div className="space-y-4">
        {transactions.map((tx) => (
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
  );
}