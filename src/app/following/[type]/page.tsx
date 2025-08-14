'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { NewsArticle, NewsSource } from '@/types';
import { dummyArticles, dummySources } from '@/data/dummy';
import NewsCard from '@/components/news/NewsCard';
import SkeletonCard from '@/components/ui/SkeletonCard';
import { useNews } from '@/contexts/NewsContext';

export default function FollowingTypePage() {
  const { onArticleClick } = useNews();
  const params = useParams();
  const type = params.type as string;
  
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [followedSources, setFollowedSources] = useState<NewsSource[]>([]);

  useEffect(() => {
    const loadTypeArticles = async () => {
      setLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Get followed sources of this type
      const sourceTypeRaw = type.replace('following-', '');
      const sourceType = sourceTypeRaw === 'all' ? null : sourceTypeRaw as NewsSource['type'];
      const followed = dummySources.filter(source => 
        source.isFollowing && (sourceType === null || source.type === sourceType)
      );
      setFollowedSources(followed);
      
      // Generate articles for this source type
      let typeArticles: NewsArticle[] = [];
      
      if (sourceType === null) {
        // Show all articles from followed sources
        typeArticles = dummyArticles.slice(0, 15);
      } else {
        // Filter articles based on source type
        typeArticles = dummyArticles
          .filter(article => {
            if (sourceType === 'news') return ['technology', 'business', 'world', 'politics'].includes(article.category);
            if (sourceType === 'blog') return ['technology', 'business', 'entertainment'].includes(article.category);
            if (sourceType === 'youtube') return ['technology', 'entertainment', 'sports'].includes(article.category);
            if (sourceType === 'newsletter') return ['business', 'technology', 'world'].includes(article.category);
            if (sourceType === 'website') return ['technology', 'politics', 'world'].includes(article.category);
            return false;
          })
          .slice(0, 12)
          .map(article => ({
            ...article,
            sourceName: followed.length > 0 
              ? followed[Math.floor(Math.random() * followed.length)].name 
              : article.sourceName
          }));
      }
      
      setArticles(typeArticles);
      setLoading(false);
    };

    loadTypeArticles();
  }, [type]);

  const getTypeInfo = (sourceType: string) => {
    const typeMap = {
      'following-all': { title: 'All Sources', icon: '📱', description: 'All content from your followed sources' },
      'following-news': { title: 'News Sites', icon: '📰', description: 'Latest news from your followed news sources' },
      'following-blog': { title: 'Blogs', icon: '📝', description: 'In-depth articles from your followed blogs' },
      'following-youtube': { title: 'YouTube Channels', icon: '📺', description: 'Video content from your followed YouTube channels' },
      'following-newsletter': { title: 'Newsletters', icon: '📧', description: 'Curated content from your followed newsletters' },
      'following-website': { title: 'Websites', icon: '🌐', description: 'Content from your followed websites' }
    };
    return typeMap[sourceType as keyof typeof typeMap] || { 
      title: 'Following', 
      icon: '📄', 
      description: 'Content from your followed sources' 
    };
  };

  const typeInfo = getTypeInfo(type);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
          <Link href="/" className="hover:text-accent transition-colors">Home</Link>
          <span>/</span>
          <Link href="/following" className="hover:text-accent transition-colors">Following</Link>
          <span>/</span>
          <span className="text-foreground">{typeInfo.title}</span>
        </nav>
        
        <h1 className="text-3xl font-bold text-foreground mb-2">
          {typeInfo.icon} {typeInfo.title}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {typeInfo.description}
        </p>
      </div>

      {/* Followed Sources Info */}
      {!loading && followedSources.length > 0 && (
        <div className="rounded-lg p-6" style={{ backgroundColor: 'var(--card-bg)' }}>
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Sources ({followedSources.length})
          </h3>
          <div className="flex flex-wrap gap-2">
            {followedSources.map(source => (
              <span
                key={source.id}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-accent/10 text-accent border border-accent/20"
              >
                {source.type === 'news' && '📰'}
                {source.type === 'blog' && '📝'}
                {source.type === 'youtube' && '📺'}
                {source.type === 'newsletter' && '📧'}
                {source.type === 'website' && '🌐'}
                <span className="ml-1">{source.name}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array.from({ length: 12 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))
        ) : articles.length > 0 ? (
          articles.map((article, index) => (
            <NewsCard
              key={`${article.id}-${index}`}
              article={article}
              onClick={onArticleClick}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No content available</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              No articles found from your followed {typeInfo.title.toLowerCase()}. 
              Try following more sources or check back later.
            </p>
            <Link 
              href="/discover"
              className="inline-flex items-center px-6 py-3 bg-accent text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Discover New Sources
            </Link>
          </div>
        )}
      </div>

      {/* Load More Button */}
      {!loading && articles.length > 0 && (
        <div className="text-center">
          <button 
            className="px-6 py-3 rounded-lg transition-colors"
            style={{ color: 'var(--foreground)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--muted)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            Load More Articles
          </button>
        </div>
      )}
    </div>
  );
}