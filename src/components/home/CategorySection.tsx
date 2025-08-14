'use client';

import Link from 'next/link';
import { NewsArticle } from '@/types';
import HorizontalCarousel from '../ui/HorizontalCarousel';
import Button from '../ui/Button';

interface CategorySectionProps {
  title: string;
  articles: NewsArticle[];
  loading: boolean;
  onArticleClick: (article: NewsArticle) => void;
  categoryId?: string;
}

export default function CategorySection({ 
  title, 
  articles, 
  loading, 
  onArticleClick,
  categoryId 
}: CategorySectionProps) {
  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
        {categoryId && (
          <Link href={`/category/${categoryId}`}>
            <Button variant="ghost" size="sm">
              View All
              <svg className="h-4 w-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          </Link>
        )}
      </div>
      
      <HorizontalCarousel
        articles={articles}
        loading={loading}
        onArticleClick={onArticleClick}
      />
    </section>
  );
}