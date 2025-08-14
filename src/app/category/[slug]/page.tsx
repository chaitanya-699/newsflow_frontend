'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { NewsArticle } from '@/types';
import { dummyArticles, categories } from '@/data/dummy';
import NewsCard from '@/components/news/NewsCard';
import SkeletonCard from '@/components/ui/SkeletonCard';
import { useNews } from '@/contexts/NewsContext';

export default function CategoryPage() {
  const { onArticleClick } = useNews();
  const params = useParams();
  const slug = params.slug as string;
  
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  
  const category = categories.find(cat => cat.id === slug);

  useEffect(() => {
    const loadCategoryArticles = async () => {
      setLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      let filteredArticles: NewsArticle[] = [];
      
      if (slug === 'top') {
        filteredArticles = dummyArticles.slice(0, 12);
      } else if (slug === 'trending') {
        filteredArticles = dummyArticles.slice(1, 13);
      } else if (slug === 'latest') {
        filteredArticles = dummyArticles.slice(2, 14);
      } else {
        // Filter by category and duplicate to have more articles
        const categoryArticles = dummyArticles.filter(article => article.category === slug);
        filteredArticles = [...categoryArticles, ...categoryArticles, ...categoryArticles].slice(0, 12);
      }
      
      setArticles(filteredArticles);
      setLoading(false);
    };

    loadCategoryArticles();
  }, [slug]);

  if (!category) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-bold text-foreground mb-4">Category Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400">
          The category you&apos;re looking for doesn&apos;t exist.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          {category.icon} {category.name}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Latest news in {category.name.toLowerCase()}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          // Show skeleton cards while loading
          Array.from({ length: 12 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))
        ) : (
          articles.map((article, index) => (
            <NewsCard
              key={`${article.id}-${index}`}
              article={article}
              onClick={onArticleClick}
            />
          ))
        )}
      </div>

      {!loading && articles.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">
            No articles found in this category.
          </p>
        </div>
      )}
    </div>
  );
}