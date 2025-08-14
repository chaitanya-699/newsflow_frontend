'use client';

import Image from 'next/image';
import { NewsArticle } from '@/types';

interface NewsCardProps {
  article: NewsArticle;
  onClick: (article: NewsArticle) => void;
  className?: string;
}

export default function NewsCard({ article, onClick, className = '' }: NewsCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString();
  };

  return (
    <article 
      className={`rounded-lg overflow-hidden card-hover cursor-pointer group with-surface-border ${className}`}
      style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border)' }}
      onClick={() => onClick(article)}
    >
      <div className="relative">
        <Image
          src={article.imageUrl}
          alt={article.title}
          width={400}
          height={200}
          className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-200"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-full">
            {article.category}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-accent transition-colors">
          {article.title}
        </h3>
        
        <p className="text-sm mb-3 line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
          {article.description}
        </p>
        
        <div className="flex items-center justify-between text-xs" style={{ color: 'var(--text-secondary)' }}>
          <div className="flex items-center space-x-2">
            <span>{article.sourceName}</span>
            <span>•</span>
            <span>{formatDate(article.publishedAt)}</span>
          </div>
          
          <button 
            className="p-1 hover:bg-muted rounded transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              window.open(article.sourceUrl, '_blank');
            }}
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}