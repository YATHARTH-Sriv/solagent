import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowUp, Clock, Calendar } from "lucide-react"

interface ChatInputProps {
  onSubmit: (value: string) => void;
  connected: boolean;
  isLoading: boolean;
}

export function ChatInput({ onSubmit, connected, isLoading }: ChatInputProps) {
  const [inputValue, setInputValue] = useState("")
  const [currentTime, setCurrentTime] = useState("")
  const [currentDate, setCurrentDate] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  
  // Update time and date
  useState(() => {
    const updateDateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }))
      setCurrentDate(now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }))
    }
    
    updateDateTime()
    const interval = setInterval(updateDateTime, 60000)
    return () => clearInterval(interval)
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    
    if (!inputValue.trim() || !connected) return
    
    onSubmit(inputValue)
    setInputValue("")
  }

  return (
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
  );
}