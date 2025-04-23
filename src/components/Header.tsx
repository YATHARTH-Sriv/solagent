import { Button } from "@/components/ui/button"
import { Info, Star } from "lucide-react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import Link from "next/link"

export function Header() {
  return (
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
            href="https://github.com/YATHARTH-Sriv/solagent"
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
  );
}