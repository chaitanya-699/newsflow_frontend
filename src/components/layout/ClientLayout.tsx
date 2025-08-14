'use client';

import { useState } from "react";
import Navbar from "./Navbar";
import ProfileSidebar from "./ProfileSidebar";
import NewsOverlay from "../news/NewsOverlay";
import { NewsArticle } from "@/types";
import { NewsProvider } from "@/contexts/NewsContext";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const handleArticleClick = (article: NewsArticle) => {
    setSelectedArticle(article);
    setIsOverlayOpen(true);
  };

  const handleCloseOverlay = () => {
    setIsOverlayOpen(false);
    setSelectedArticle(null);
  };

  return (
    <NewsProvider onArticleClick={handleArticleClick}>
      <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
          <Navbar onProfileClick={() => setIsProfileOpen(true)} />
          
          <main id="main-content" className="max-w-7xl mx-auto px-2 sm:px-3 lg:px-4 py-8">
            {children}
          </main>
          
          <footer className="bg-card border-t border-border mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="flex items-center space-x-2 mb-4 md:mb-0">
                  <div className="w-6 h-6 bg-accent rounded flex items-center justify-center">
                    <span className="text-white font-bold text-sm">N</span>
                  </div>
                  <span className="text-foreground font-semibold">NewsFlow</span>
                </div>
                
                <div className="flex space-x-6 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <a href="#" className="hover:text-accent transition-colors">About</a>
                  <a href="#" className="hover:text-accent transition-colors">Privacy</a>
                  <a href="#" className="hover:text-accent transition-colors">Terms</a>
                  <a href="#" className="hover:text-accent transition-colors">Contact</a>
                </div>
                
                <p className="text-sm mt-4 md:mt-0" style={{ color: 'var(--text-secondary)' }}>
                  © 2024 NewsFlow. All rights reserved.
                </p>
              </div>
            </div>
          </footer>

          <ProfileSidebar 
            isOpen={isProfileOpen} 
            onClose={() => setIsProfileOpen(false)} 
          />
          
          <NewsOverlay
            article={selectedArticle}
            isOpen={isOverlayOpen}
            onClose={handleCloseOverlay}
          />
      </div>
    </NewsProvider>
  );
}