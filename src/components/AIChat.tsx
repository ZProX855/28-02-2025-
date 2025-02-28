
import React, { useState, useRef, useEffect } from 'react';
import { Send, Dumbbell, Coffee, Heart, Leaf, Apple } from 'lucide-react';
import { getChatResponse } from '../services/api';
import { toast } from 'sonner';

const AIChat: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: "👋 Hi there! I'm your friendly AI nutrition assistant powered by Gemini 2.0. Ask me anything about nutrition, diet, or wellness!", isUser: false }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestionTopics = [
    { text: "How much protein do I need daily?", icon: <Dumbbell className="h-4 w-4" /> },
    { text: "What foods help reduce inflammation?", icon: <Leaf className="h-4 w-4" /> },
    { text: "Healthiest breakfast options?", icon: <Apple className="h-4 w-4" /> },
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
      if (response.error) {
        // Handle API error but don't show the technical details to the user
        console.error("Chat API error:", response.error);
        setMessages(prev => [...prev, { 
          text: "I'm sorry, I couldn't process your request right now. Please try again later.", 
          isUser: false 
        }]);
        toast.error("Couldn't get a response. Please try again.");
      } else {
        setMessages(prev => [...prev, { text: response.text, isUser: false }]);
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { 
        text: "I'm sorry, I couldn't process your request right now. Please try again later.", 
        isUser: false 
      }]);
      toast.error("Couldn't get a response. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSend();
    }
  };

  // Enhanced function to format AI responses with better visual styling
  const formatAIResponse = (text: string) => {
    // Replace asterisks with more visually appealing bullet points
    const processedText = text.replace(/^\s*\*\s*/gm, '• ');
    
    // Split by lines
    const lines = processedText.split('\n');
    
    // Process each line
    return lines.map((line, index) => {
      // Check if line is a bullet point (handle various bullet styles but never use asterisks)
      if (line.match(/^(\s*[•\-]\s|\s*\d+\.\s)/)) {
        // Extract emoji if present
        const emojiMatch = line.match(/(\p{Emoji})/u);
        const emoji = emojiMatch ? emojiMatch[0] : '';
        
        // Clean the line from bullet point markers
        const cleanLine = line.replace(/^(\s*[•\-]\s|\s*\d+\.\s)/, '').trim();
        
        // If emoji is already in the cleanLine, don't add it again
        const finalLine = emoji && !cleanLine.includes(emoji) 
          ? `${emoji} ${cleanLine.replace(emoji, '').trim()}` 
          : cleanLine;
        
        return (
          <div key={index} className="flex items-start mb-3">
            {!finalLine.match(/^\p{Emoji}/u) && (
              <span className="text-wellness-mediumGreen mr-2 text-xl">•</span>
            )}
            <div className="bg-wellness-softGreen/30 px-3 py-2.5 rounded-lg text-wellness-darkGreen flex-1 font-medium">
              {finalLine}
            </div>
          </div>
        );
      } else if (line.toLowerCase().includes('recommendation:') || line.toLowerCase().includes('tip:') || line.toLowerCase().includes('summary:')) {
        // Style section headers with more emphasis
        return (
          <div key={index} className="font-semibold text-wellness-darkGreen mt-3 mb-2 border-b border-wellness-softGreen/70 pb-1 bg-wellness-softGreen/20 px-3 py-1.5 rounded-t-lg">
            {line}
          </div>
        );
      } else if (line.trim() === '') {
        // Add spacing for empty lines
        return <div key={index} className="h-2"></div>;
      } else {
        // Regular text with improved styling
        return (
          <p key={index} className="mb-2.5 px-1.5 text-wellness-charcoal leading-relaxed">
            {line}
          </p>
        );
      }
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white bg-opacity-80 backdrop-blur-sm shadow-sm rounded-2xl border border-wellness-softGreen/30 overflow-hidden flex flex-col h-[600px]">
      <div className="p-4 bg-wellness-softGreen border-b border-wellness-softGreen/30">
        <h2 className="text-xl font-medium text-wellness-darkGreen">AI Nutrition Assistant</h2>
        <p className="text-sm text-wellness-charcoal">Powered by Gemini 2.0 Flash</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div 
            key={index}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} animate-slide-up`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div 
              className={`max-w-[85%] p-3 rounded-2xl ${
                message.isUser 
                  ? 'bg-wellness-darkGreen text-white rounded-tr-none shadow-md' 
                  : 'bg-wellness-softGreen/40 text-wellness-charcoal rounded-tl-none shadow-sm'
              }`}
            >
              {message.isUser ? (
                <div className="whitespace-pre-line">{message.text}</div>
              ) : (
                <div className="ai-response prose prose-sm max-w-none prose-p:my-1 prose-headings:mb-2 prose-headings:mt-4">
                  {formatAIResponse(message.text)}
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start animate-slide-up">
            <div className="max-w-[85%] p-4 rounded-2xl bg-wellness-softGreen/40 text-wellness-charcoal rounded-tl-none">
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
            onKeyPress={handleKeyPress}
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
