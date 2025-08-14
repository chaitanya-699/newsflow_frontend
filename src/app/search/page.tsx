'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { NewsArticle } from '@/types';
import { dummyArticles } from '@/data/dummy';
import NewsCard from '@/components/news/NewsCard';
import SkeletonCard from '@/components/ui/SkeletonCard';
import { useNews } from '@/contexts/NewsContext';

export default function SearchPage() {
  const { onArticleClick } = useNews();
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [results, setResults] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'relevance' | 'date'>('relevance');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  useEffect(() => {
    const searchArticles = async () => {
      setLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (!query.trim()) {
        setResults([]);
        setLoading(false);
        return;
      }

      // Simple search implementation
      const searchResults = dummyArticles.filter(article => 
        article.title.toLowerCase().includes(query.toLowerCase()) ||
        article.description.toLowerCase().includes(query.toLowerCase()) ||
        article.content.toLowerCase().includes(query.toLowerCase()) ||
        article.author.toLowerCase().includes(query.toLowerCase()) ||
        article.sourceName.toLowerCase().includes(query.toLowerCase())
      );

      // Apply category filter
      const filteredResults = filterCategory === 'all' 
        ? searchResults 
        : searchResults.filter(article => article.category === filterCategory);

      // Apply sorting
      const sortedResults = [...filteredResults].sort((a, b) => {
        if (sortBy === 'date') {
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
        }
        // For relevance, we'll use a simple scoring based on query matches
        const scoreA = getRelevanceScore(a, query);
        const scoreB = getRelevanceScore(b, query);
        return scoreB - scoreA;
      });

      setResults(sortedResults);
      setLoading(false);
    };

    searchArticles();
  }, [query, sortBy, filterCategory]);

  const getRelevanceScore = (article: NewsArticle, searchQuery: string): number => {
    const lowerQuery = searchQuery.toLowerCase();
    let score = 0;
    
    // Title matches are worth more
    if (article.title.toLowerCase().includes(lowerQuery)) score += 10;
    if (article.description.toLowerCase().includes(lowerQuery)) score += 5;
    if (article.content.toLowerCase().includes(lowerQuery)) score += 2;
    if (article.author.toLowerCase().includes(lowerQuery)) score += 3;
    if (article.sourceName.toLowerCase().includes(lowerQuery)) score += 3;
    
    return score;
  };

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'technology', label: 'Technology' },
    { value: 'business', label: 'Business' },
    { value: 'sports', label: 'Sports' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'politics', label: 'Politics' },
    { value: 'world', label: 'World' }
  ];

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Search Results
        </h1>
        {query && (
          <p className="text-gray-600 dark:text-gray-400">
            {loading ? 'Searching...' : `${results.length} results found for "${query}"`}
          </p>
        )}
      </div>

      {/* Filters and Sorting */}
      {query && (
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between rounded-lg p-4" style={{ backgroundColor: 'var(--card-bg)' }}>
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-foreground">Category:</label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-1 text-sm bg-muted border border-border rounded focus:outline-none focus:ring-2 focus:ring-accent"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-foreground">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'relevance' | 'date')}
                className="px-3 py-1 text-sm bg-muted border border-border rounded focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="relevance">Relevance</option>
                <option value="date">Date</option>
              </select>
            </div>
          </div>

          {!loading && results.length > 0 && (
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {results.length} article{results.length !== 1 ? 's' : ''}
            </div>
          )}
        </div>
      )}

      {/* Search Results */}
      {!query ? (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-4">Search News</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Enter a search term to find relevant news articles
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          ) : results.length > 0 ? (
            results.map((article) => (
              <NewsCard
                key={article.id}
                article={article}
                onClick={onArticleClick}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.562M15 6.306a7.962 7.962 0 00-6 0m6 0V3a1 1 0 00-1-1H8a1 1 0 00-1 1v3.306" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No results found</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your search terms or filters
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}