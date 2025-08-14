'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { NewsArticle } from '@/types';
import Button from '../ui/Button';


interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface NewsOverlayProps {
  article: NewsArticle | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function NewsOverlay({ article, isOpen, onClose }: NewsOverlayProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsAnimating(true);
      // Initialize with welcome message
      setMessages([{
        id: '1',
        type: 'ai',
        content: `Hi! I'm here to help you understand this article better. You can ask me questions about the content, request a summary, or discuss the implications. What would you like to know?`,
        timestamp: new Date()
      }]);
    } else {
      document.body.style.overflow = 'unset';
      if (isAnimating) {
        const timer = setTimeout(() => {
          setIsAnimating(false);
          setMessages([]);
          setInputValue('');
        }, 300);
        return () => clearTimeout(timer);
      }
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, isAnimating]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (message?: string) => {
    const messageText = message || inputValue.trim();
    if (!messageText || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: messageText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(messageText, article);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000); // Random delay between 1.5-2.5s
  };

  const generateAIResponse = (question: string, article: NewsArticle | null): string => {
    if (!article) return "I'm sorry, I don't have access to the article content right now.";

    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('summary') || lowerQuestion.includes('summarize')) {
      return `Here's a summary of the article: ${article.title} discusses ${article.description} The key points include the main developments mentioned in the article, their implications for the ${article.category} sector, and potential future impacts. This is particularly relevant given the current context in ${article.category}.`;
    }
    
    if (lowerQuestion.includes('implication') || lowerQuestion.includes('impact')) {
      return `The implications of this news are significant for several reasons: 1) It could influence future developments in ${article.category}, 2) Stakeholders should consider how this affects their strategies, and 3) The broader market may see changes as a result. The timing is particularly important given current trends.`;
    }
    
    if (lowerQuestion.includes('context') || lowerQuestion.includes('background')) {
      return `To understand the broader context: This development fits into ongoing trends in ${article.category}. Similar events have occurred recently, and this continues a pattern we've been observing. The source, ${article.sourceName}, has been covering this topic extensively, indicating its importance in the current landscape.`;
    }
    
    if (lowerQuestion.includes('author') || lowerQuestion.includes('source')) {
      return `This article was written by ${article.author} and published by ${article.sourceName}. ${article.sourceName} is known for their coverage of ${article.category} topics. The article was published on ${new Date(article.publishedAt).toLocaleDateString()}.`;
    }
    
    // Default response
    return `That's an interesting question about "${question}". Based on the article content, I can tell you that this relates to ${article.category} and involves ${article.description} The article provides detailed insights that suggest this development could have lasting effects. Would you like me to elaborate on any specific aspect?`;
  };

  const predefinedQuestions = [
    "Summarize this article",
    "What are the key implications?",
    "What's the broader context?",
    "Who wrote this article?"
  ];

  if (!isOpen && !isAnimating) return null;
  if (!article) return null;

  return (
    <div className={`fixed inset-0 bg-black z-50 flex transition-all duration-400 ${
      isOpen ? 'bg-opacity-50 backdrop-blur-sm' : 'bg-opacity-0'
    }`}>
      {/* Article Content - Left Side */}
      <div className={`flex-1 bg-card overflow-y-auto transform transition-all duration-400 ease-out ${
        isOpen ? 'translate-x-0 opacity-100 scale-100' : '-translate-x-full opacity-0 scale-95'
      }`}>
        <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between backdrop-blur-md bg-card/90">
          <h1 className="text-lg font-semibold text-foreground">Article</h1>
          <button
            onClick={onClose}
            className="p-2 text-foreground hover:text-accent hover:bg-muted rounded-lg transition-all duration-200 btn-animate"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6">
          <Image
            src={article.imageUrl}
            alt={article.title}
            width={800}
            height={400}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
          
          <div className="mb-4">
            <span className="bg-accent text-white text-sm px-3 py-1 rounded-full">
              {article.category}
            </span>
          </div>
          
          <h1 className="text-3xl font-bold text-foreground mb-4">
            {article.title}
          </h1>
          
          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
            <span>By {article.author}</span>
            <span>•</span>
            <span>{article.sourceName}</span>
            <span>•</span>
            <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
          </div>
          
          <div className="prose prose-gray dark:prose-invert max-w-none">
            {article.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-4 text-foreground leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
          
          <div className="mt-8 pt-6 border-t border-border">
            <Button
              variant="outline"
              onClick={() => window.open(article.sourceUrl, '_blank')}
              className="inline-flex items-center"
            >
              <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Read Original Article
            </Button>
          </div>
        </div>
      </div>

      {/* AI Chat - Right Side */}
      <div className={`w-96 bg-card border-l border-border flex flex-col transform transition-all duration-400 ease-out ${
        isOpen ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-full opacity-0 scale-95'
      }`}>
        {/* Chat Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
              <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">AI Assistant</h2>
              <p className="text-xs text-gray-600 dark:text-gray-400">Ask me anything about this article</p>
            </div>
          </div>
        </div>
        
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-lg p-3 ${
                message.type === 'user' 
                  ? 'bg-accent text-white' 
                  : 'bg-muted text-foreground'
              }`}>
                <p className="text-sm leading-relaxed">{message.content}</p>
                <p className={`text-xs mt-1 ${
                  message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          
          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-muted text-foreground rounded-lg p-3 max-w-[80%]">
                <div className="flex items-center space-x-1">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-xs text-gray-500 ml-2">AI is typing...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Quick Questions */}
        <div className="p-4 border-t border-border">
          <div className="grid grid-cols-2 gap-2 mb-4">
            {predefinedQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleSendMessage(question)}
                disabled={isTyping}
                className="text-xs p-2 h-auto"
              >
                {question}
              </Button>
            ))}
          </div>
          
          {/* Message Input */}
          <div className="flex space-x-2">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask about this article..."
              disabled={isTyping}
              className="flex-1 px-3 py-2 text-sm bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            />
            <Button
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim() || isTyping}
              size="sm"
              className="px-3"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}