'use client';

import { createContext, useContext, ReactNode } from 'react';
import { NewsArticle } from '@/types';

interface NewsContextType {
  onArticleClick: (article: NewsArticle) => void;
}

const NewsContext = createContext<NewsContextType | undefined>(undefined);

interface NewsProviderProps {
  children: ReactNode;
  onArticleClick: (article: NewsArticle) => void;
}

export function NewsProvider({ children, onArticleClick }: NewsProviderProps) {
  return (
    <NewsContext.Provider value={{ onArticleClick }}>
      {children}
    </NewsContext.Provider>
  );
}

export function useNews() {
  const context = useContext(NewsContext);
  if (context === undefined) {
    throw new Error('useNews must be used within a NewsProvider');
  }
  return context;
}