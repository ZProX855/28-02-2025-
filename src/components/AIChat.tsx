
import React, { useState, useRef, useEffect } from 'react';
import { Send, Dumbbell, Coffee, Heart } from 'lucide-react';
import { getChatResponse } from '../services/api';
import { toast } from 'sonner';

const AIChat: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: "👋 Hi there! I'm your friendly AI nutrition assistant. Ask me anything about nutrition, diet, or wellness!", isUser: false }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestionTopics = [
    { text: "How much protein do I need daily?", icon: <Dumbbell className="h-4 w-4" /> },
    { text: "What's better: coffee or tea?", icon: <Coffee className="h-4 w-4" /> },
    { text: "Tips for heart-healthy eating", icon: <Heart className="h-4 w-4" /> },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
    setIsLoading(true);
    
    try {
      const response = await getChatResponse(userMessage);
      setMessages(prev => [...prev, { text: response.text, isUser: false }]);
    } catch (error) {
      toast.error("Couldn't get a response. Please try again.");
      console.error("Chat error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white bg-opacity-80 backdrop-blur-sm shadow-sm rounded-2xl border border-wellness-softGreen/30 overflow-hidden flex flex-col h-[600px]">
      <div className="p-4 bg-wellness-softGreen border-b border-wellness-softGreen/30">
        <h2 className="text-xl font-medium text-wellness-darkGreen">AI Nutrition Assistant</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div 
            key={index}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} animate-slide-up`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div 
              className={`max-w-[80%] p-3 rounded-2xl ${
                message.isUser 
                  ? 'bg-wellness-darkGreen text-white rounded-tr-none' 
                  : 'bg-wellness-softGreen/50 text-wellness-charcoal rounded-tl-none'
              }`}
            >
              <div className="whitespace-pre-line">{message.text}</div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start animate-slide-up">
            <div className="max-w-[80%] p-3 rounded-2xl bg-wellness-softGreen/50 text-wellness-charcoal rounded-tl-none">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-wellness-darkGreen rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-wellness-darkGreen rounded-full animate-pulse" style={{ animationDelay: '300ms' }}></div>
                <div className="w-2 h-2 bg-wellness-darkGreen rounded-full animate-pulse" style={{ animationDelay: '600ms' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Suggestions */}
      <div className="px-4 py-2 bg-white border-t border-wellness-softGreen/30">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {suggestionTopics.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion.text)}
              className="flex items-center gap-1.5 whitespace-nowrap px-3 py-1.5 text-sm bg-wellness-softGreen/50 hover:bg-wellness-softGreen text-wellness-darkGreen rounded-full transition-colors duration-300"
            >
              {suggestion.icon}
              {suggestion.text}
            </button>
          ))}
        </div>
      </div>
      
      {/* Input area */}
      <div className="p-4 bg-white border-t border-wellness-softGreen/20">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about nutrition..."
            className="flex-1 input-field rounded-full text-wellness-charcoal"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className={`p-3 rounded-full ${
              isLoading || !input.trim() 
                ? 'bg-wellness-mediumGreen/50 cursor-not-allowed' 
                : 'bg-wellness-darkGreen hover:bg-wellness-darkGreen/90'
            } text-white transition-colors duration-300`}
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
