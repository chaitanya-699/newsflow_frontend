'use client';

import { useState, useEffect } from 'react';
import { NewsArticle } from '@/types';
import { dummyArticles, categories } from '@/data/dummy';
import HeroCarousel from '@/components/home/HeroCarousel';
import CategorySection from '@/components/home/CategorySection';
import PageTransition from '@/components/ui/PageTransition';
import { useNews } from '@/contexts/NewsContext';

export default function Home() {
  const { onArticleClick } = useNews();
  const [heroArticles, setHeroArticles] = useState<NewsArticle[]>([]);
  const [categoryArticles, setCategoryArticles] = useState<Record<string, NewsArticle[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const loadData = async () => {
      setLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Set hero articles (first 5 articles)
      setHeroArticles(dummyArticles.slice(0, 5));
      
      // Group articles by category and create more variations for infinite scroll
      const grouped = categories.reduce((acc, category) => {
        let categoryArticles: NewsArticle[] = [];
        
        if (category.id === 'top') {
          categoryArticles = dummyArticles.slice(0, 8);
        } else if (category.id === 'trending') {
          categoryArticles = dummyArticles.slice(1, 9);
        } else if (category.id === 'latest') {
          categoryArticles = dummyArticles.slice(2, 10);
        } else {
          // Get articles for this category and create variations
          const baseArticles = dummyArticles.filter(article => 
            article.category === category.id
          );
          
          // Create more articles by duplicating and modifying
          categoryArticles = baseArticles;
          if (baseArticles.length > 0) {
            // Add variations with modified titles and dates
            baseArticles.forEach((article, index) => {
              categoryArticles.push({
                ...article,
                id: `${article.id}-var1-${index}`,
                title: `${article.title} - Latest Update`,
                publishedAt: new Date(Date.now() - Math.random() * 86400000).toISOString()
              });
              categoryArticles.push({
                ...article,
                id: `${article.id}-var2-${index}`,
                title: `Breaking: ${article.title}`,
                publishedAt: new Date(Date.now() - Math.random() * 172800000).toISOString()
              });
            });
          }
        }
        
        acc[category.id] = categoryArticles;
        return acc;
      }, {} as Record<string, NewsArticle[]>);
      
      setCategoryArticles(grouped);
      setLoading(false);
    };

    loadData();
  }, []);

  return (
    <PageTransition>
      <div className="space-y-12">
        {/* Hero Section */}
        <section>
          <h1 className="text-3xl font-bold text-foreground mb-6 slide-up">Trending News</h1>
          <div className="scale-in">
            <HeroCarousel
              articles={heroArticles}
              loading={loading}
              onArticleClick={onArticleClick}
            />
          </div>
        </section>

        {/* Category Sections */}
        {categories.map((category, index) => {
          const articles = categoryArticles[category.id] || [];
          
          // Skip if no articles for this category
          if (!loading && articles.length === 0) return null;
          
          return (
            <div key={category.id} className="slide-up" style={{ animationDelay: `${(index + 1) * 0.2}s` }}>
              <CategorySection
                title={`${category.icon} ${category.name}`}
                articles={articles}
                loading={loading}
                onArticleClick={onArticleClick}
                categoryId={category.id}
              />
            </div>
          );
        })}
      </div>
    </PageTransition>
  );
}
