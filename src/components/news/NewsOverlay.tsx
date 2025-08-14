"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { NewsArticle } from "@/types";
import Button from "../ui/Button";

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
}

interface NewsOverlayProps {
  article: NewsArticle | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function NewsOverlay({
  article,
  isOpen,
  onClose,
}: NewsOverlayProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [leftWidth, setLeftWidth] = useState(65); // % of screen width
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);
  const isResizing = useRef(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setIsAnimating(true);
      setMessages([
        {
          id: "1",
          type: "ai",
          content: `Hi! I'm here to help you understand this article better. You can ask me questions about the content, request a summary, or discuss the implications. What would you like to know?`,
          timestamp: new Date(),
        },
      ]);
    } else {
      document.body.style.overflow = "unset";
      if (isAnimating) {
        const timer = setTimeout(() => {
          setIsAnimating(false);
          setMessages([]);
          setInputValue("");
        }, 300);
        return () => clearTimeout(timer);
      }
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, isAnimating]);

  useEffect(() => {
    const updateIsMobile = () => setIsMobile(window.innerWidth < 768);
    updateIsMobile();
    window.addEventListener("resize", updateIsMobile);
    return () => window.removeEventListener("resize", updateIsMobile);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleMouseDown = () => {
    isResizing.current = true;
    document.body.style.cursor = "col-resize";
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing.current) return;
    const newLeftWidth = (e.clientX / window.innerWidth) * 100;
    if (newLeftWidth > 30 && newLeftWidth < 80) {
      // min/max bounds
      setLeftWidth(newLeftWidth);
    }
  };

  const handleMouseUp = () => {
    isResizing.current = false;
    document.body.style.cursor = "default";
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const handleSendMessage = (message?: string) => {
    const messageText = message || inputValue.trim();
    if (!messageText || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: `Simulated answer for: "${messageText}"`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const predefinedQuestions = [
    "Summarize this article",
    "What are the key implications?",
    "What's the broader context?",
    "Who wrote this article?",
  ];

  if (!isOpen && !isAnimating) return null;
  if (!article) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex transition-all duration-400 ${
        isOpen ? "backdrop-blur-sm" : ""
      }`}
      style={{ backgroundColor: isOpen ? "rgba(0,0,0,0.5)" : "transparent" }}
    >
      <div className="flex h-full w-full" style={{ transition: "none" }}>
        {/* Left Pane */}
        <div
          className="overflow-y-auto"
          style={{ backgroundColor: 'var(--card-bg)', width: isMobile ? "100%" : `${leftWidth}%` }}
        >
          <div
            className="sticky top-0 p-4 flex items-center justify-between backdrop-blur-md"
            style={{ backgroundColor: 'var(--card-bg)', borderBottom: '1px solid var(--border)' }}
          >
            <div className="flex items-center gap-2">
              <button
                className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full bg-transparent transition-colors duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[rgba(255,107,53,0.4)] shadow-sm"
                style={{ color: 'var(--foreground)', border: '1px solid var(--border)' }}
                aria-label="Open AI Assistant"
                title="Open AI Assistant"
                onClick={() => setIsMobileChatOpen(true)}
              >
                <span className="text-lg">🤖</span>
              </button>
              <h1 className="text-lg font-semibold" style={{ color: 'var(--foreground)' }}>Article</h1>
            </div>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-[var(--muted)]" style={{ color: 'var(--foreground)' }}>
              ✕
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
            <span className="bg-accent text-white text-sm px-3 py-1 rounded-full">
              {article.category}
            </span>
            <h1 className="text-3xl font-bold mt-4">{article.title}</h1>
            <div className="text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>
              By {article.author} • {article.sourceName} •{" "}
              {new Date(article.publishedAt).toLocaleDateString()}
            </div>
            <div className="mt-4">
              {article.content.split("\n\n").map((p, i) => (
                <p key={i} className="mb-4">
                  {p}
                </p>
              ))}
            </div>
            <div className="mt-8 pt-6" style={{ borderTop: '1px solid var(--border)' }}>
              {" "}
              <Button
                variant="outline"
                onClick={() => window.open(article.sourceUrl, "_blank")}
                className="inline-flex items-center"
              >
                {" "}
                <svg
                  className="h-4 w-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />{" "}
                </svg>{" "}
                Read Original Article{" "}
              </Button>{" "}
            </div>
          </div>
        </div>

        {/* Resizer */}
        <div
          onMouseDown={handleMouseDown}
          className="hidden md:block w-1 cursor-col-resize with-surface-border"
          style={{ backgroundColor: 'var(--border)', opacity: 0.6 }}
        />

        {/* Right Pane */}
        <div
          className="hidden md:flex flex-col with-surface-border"
          style={{ width: `${100 - leftWidth}%`, backgroundColor: 'var(--card-bg)', borderLeft: '1px solid var(--border)' }}
        >
          <div className="p-4" style={{ borderBottom: '1px solid var(--border)' }}>
            <h2 className="text-lg font-semibold" style={{ color: 'var(--foreground)' }}>AI Assistant</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((m) => (
              <div key={m.id} className={m.type === "user" ? "text-right" : ""}>
                <div
                  className={`inline-block p-3 rounded-lg ${
                    m.type === "user" ? "bg-accent text-white" : "bg-muted"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>AI is typing...</div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4" style={{ borderTop: '1px solid var(--border)' }}>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {predefinedQuestions.map((q, i) => (
                <Button
                  key={i}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSendMessage(q)}
                  disabled={isTyping}
                >
                  {q}
                </Button>
              ))}
            </div>
            <div className="flex space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgba(255,107,53,0.2)]"
                style={{
                  backgroundColor: 'var(--muted)',
                  color: 'var(--foreground)',
                  border: '1px solid var(--border)'
                }}
                placeholder="Ask something..."
              />
              <Button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim() || isTyping}
              >
                Send
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile AI Chat Drawer */}
      <div
        className={`md:hidden fixed inset-0 z-50 transform transition-transform duration-300 ${
          isMobileChatOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ backgroundColor: "var(--card-bg)" }}
        aria-hidden={!isMobileChatOpen}
      >
        <div className="flex h-full w-full flex-col">
          <div className="p-4 flex items-center justify-between" style={{ borderBottom: '1px solid var(--border)' }}>
            <div className="flex items-center gap-2">
              <button
                className="p-2 rounded-lg hover:bg-[var(--muted)]"
                aria-label="Back to article"
                onClick={() => setIsMobileChatOpen(false)}
              >
                ←
              </button>
              <h2 className="text-lg font-semibold" style={{ color: 'var(--foreground)' }}>AI Assistant</h2>
            </div>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-[var(--muted)]" style={{ color: 'var(--foreground)' }}>✕</button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((m) => (
              <div key={m.id} className={m.type === "user" ? "text-right" : ""}>
                <div
                  className={`inline-block p-3 rounded-lg ${
                    m.type === "user" ? "bg-accent text-white" : "bg-muted"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>AI is typing...</div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4" style={{ borderTop: '1px solid var(--border)' }}>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {predefinedQuestions.map((q, i) => (
                <Button
                  key={i}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSendMessage(q)}
                  disabled={isTyping}
                >
                  {q}
                </Button>
              ))}
            </div>
            <div className="flex space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgba(255,107,53,0.2)]"
                style={{
                  backgroundColor: 'var(--muted)',
                  color: 'var(--foreground)',
                  border: '1px solid var(--border)'
                }}
                placeholder="Ask something..."
              />
              <Button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim() || isTyping}
              >
                Send
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
