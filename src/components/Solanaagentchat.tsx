"use client"

import { useState, useEffect, useCallback } from "react"
import { useWallet } from '@solana/wallet-adapter-react'
import { Toaster } from "sonner"
import { mockTokenInvestments, mockUsdcTransactions, ResponseData } from "@/data/mockdata"
import { Header } from "./Header"
import { ThinkingAnimation } from "./Thinkinganimation"
import { ResponseDisplay } from "./Responsedisplay"
import { ChatInput } from "./Chatinput"

export default function SolanaAgentChat() {
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState<ResponseData | null>(null)
  const [showThinking, setShowThinking] = useState(false)
  const [chatHistory, setChatHistory] = useState<{query: string, response: ResponseData}[]>([])
  const { connected } = useWallet()

  const handleSubmit = useCallback((query: string) => {
    if (!query.trim() || !connected) return
    
    setIsLoading(true)
    setShowThinking(true)
    
    // Simulate API call
    setTimeout(() => {
      setShowThinking(false)
      
      let responseData: ResponseData;
      
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
  }, [connected]);

  // Interactive keyboard shortcut handling
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter' && event.ctrlKey) {
        event.preventDefault()
        handleSubmit('Sample query') // Replace with actual input value
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleSubmit]);
  
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-black to-zinc-900 text-white">
      {/* Toaster for notifications */}
      <Toaster position="top-center" richColors />
      
      {/* Header with wallet connection */}
      <Header />

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
        {showThinking && <ThinkingAnimation />}
        
        {/* Response Display */}
        {response && chatHistory.length > 0 && 
          <ResponseDisplay
            response={response} 
            query={chatHistory[chatHistory.length - 1].query} 
          />
        }

        {/* Chat Input */}
        <ChatInput
          onSubmit={handleSubmit}
          connected={connected}
          isLoading={isLoading}
        />
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