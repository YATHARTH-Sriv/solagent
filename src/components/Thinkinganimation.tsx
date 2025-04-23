export function ThinkingAnimation() {
    return (
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
    );
  }