'use client';

import { useState, useEffect } from 'react';
import { NewsArticle, NewsSource } from '@/types';
import { dummyArticles, dummySources } from '@/data/dummy';
import CategorySection from '@/components/home/CategorySection';
import PageTransition from '@/components/ui/PageTransition';
import { useNews } from '@/contexts/NewsContext';

export default function Following() {
  const { onArticleClick } = useNews();
  const [followedSources, setFollowedSources] = useState<NewsSource[]>([]);
  const [categorizedArticles, setCategorizedArticles] = useState<Record<string, NewsArticle[]>>({});
  const [loading, setLoading] = useState(true);
  const [isPersonalized, setIsPersonalized] = useState(false);

  useEffect(() => {
    // Simulate loading personalized content
    const loadFollowedContent = async () => {
      setLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user has completed personalization (simulate)
      const hasPersonalization = Math.random() > 0.3; // 70% chance for demo
      setIsPersonalized(hasPersonalization);
      
      if (hasPersonalization) {
        // Get followed sources
        const followed = dummySources.filter(source => source.isFollowing);
        setFollowedSources(followed);
        
        // Create articles for each source type based on followed sources
        const sourceTypes = ['news', 'blog', 'youtube', 'newsletter', 'website'] as const;
        const categorized: Record<string, NewsArticle[]> = {};
        
        sourceTypes.forEach(type => {
          const sourcesOfType = followed.filter(source => source.type === type);
          if (sourcesOfType.length > 0) {
            // Simulate articles from these sources
            const baseArticles = dummyArticles
              .filter(article => {
                // Simulate articles coming from followed sources of this type
                if (type === 'news') return ['technology', 'business', 'world'].includes(article.category);
                if (type === 'blog') return ['technology', 'business'].includes(article.category);
                if (type === 'youtube') return ['technology', 'entertainment'].includes(article.category);
                if (type === 'newsletter') return ['business', 'technology'].includes(article.category);
                if (type === 'website') return ['technology', 'politics'].includes(article.category);
                return false;
              })
              .map(article => ({
                ...article,
                sourceName: sourcesOfType[Math.floor(Math.random() * sourcesOfType.length)].name
              }));

            // Create more variations for infinite scroll
            const extendedArticles = [...baseArticles];
            baseArticles.forEach((article, index) => {
              extendedArticles.push({
                ...article,
                id: `${article.id}-${type}-var1-${index}`,
                title: `${article.title} - Exclusive Coverage`,
                publishedAt: new Date(Date.now() - Math.random() * 86400000).toISOString()
              });
              extendedArticles.push({
                ...article,
                id: `${article.id}-${type}-var2-${index}`,
                title: `Updated: ${article.title}`,
                publishedAt: new Date(Date.now() - Math.random() * 172800000).toISOString()
              });
            });

            categorized[type] = extendedArticles;
          }
        });
        
        // Add "All" category with mixed content
        const allArticles = Object.values(categorized).flat().slice(0, 8);
        if (allArticles.length > 0) {
          categorized['all'] = allArticles;
        }
        
        setCategorizedArticles(categorized);
      }
      
      setLoading(false);
    };

    loadFollowedContent();
  }, []);

  if (!loading && !isPersonalized) {
    return (
      <div className="text-center py-16">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Personalize Your Feed
          </h2>
          
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Follow topics and sources you care about to see personalized news here.
          </p>
          
          <div className="space-y-3">
            <button className="w-full bg-accent text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">
              Choose Your Interests
            </button>
            <button 
              className="w-full py-3 px-6 rounded-lg transition-colors"
              style={{ color: 'var(--foreground)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--muted)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              Browse All News
            </button>
          </div>
        </div>
      </div>
    );
  }

  const getSourceTypeInfo = (type: string) => {
    const typeMap = {
      all: { title: 'All Sources', icon: '📱', description: 'Latest from all your followed sources' },
      news: { title: 'News Sites', icon: '📰', description: 'Breaking news and updates' },
      blog: { title: 'Blogs', icon: '📝', description: 'In-depth articles and analysis' },
      youtube: { title: 'YouTube Channels', icon: '📺', description: 'Video content and tutorials' },
      newsletter: { title: 'Newsletters', icon: '📧', description: 'Curated content delivered to your inbox' },
      website: { title: 'Websites', icon: '🌐', description: 'Various web publications' }
    };
    return typeMap[type as keyof typeof typeMap] || { title: type, icon: '📄', description: '' };
  };

  const sourceTypeOrder = ['all', 'news', 'blog', 'youtube', 'newsletter', 'website'];

  return (
    <PageTransition>
      <div className="space-y-12">
        <div className="slide-up">
          <h1 className="text-3xl font-bold text-foreground mb-2">Following</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Latest content from your {followedSources.length} followed sources
          </p>
        </div>

        {/* Followed Sources Summary */}
        {!loading && followedSources.length > 0 && (
          <div className="rounded-lg p-6 card-hover" style={{ backgroundColor: 'var(--card-bg)' }}>
            <h3 className="text-lg font-semibold text-foreground mb-4">Your Followed Sources</h3>
            <div className="flex flex-wrap gap-2">
              {followedSources.map((source, index) => (
                <span
                  key={source.id}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-accent/10 text-accent border border-accent/20 stagger-item"
                  style={{ animationDelay: `${index * 0.1}s` }}
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

        {/* Content by Source Type */}
        {sourceTypeOrder.map((sourceType, index) => {
          const articles = categorizedArticles[sourceType];
          if (!articles || articles.length === 0) return null;
          
          const typeInfo = getSourceTypeInfo(sourceType);
          
          return (
            <div key={sourceType} className="slide-up" style={{ animationDelay: `${(index + 1) * 0.2}s` }}>
              <CategorySection
                title={`${typeInfo.icon} ${typeInfo.title}`}
                articles={articles}
                loading={loading}
                onArticleClick={onArticleClick}
                categoryId={`following-${sourceType}`}
              />
            </div>
          );
        })}
        
        {!loading && Object.keys(categorizedArticles).length === 0 && isPersonalized && (
          <div className="text-center py-12 scale-in">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">No new content</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            No new articles from your followed sources. Check back later or discover new sources to follow!
          </p>
          <button 
            onClick={() => window.location.href = '/discover'}
            className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-blue-700 transition-colors btn-animate"
          >
            Discover New Sources
          </button>
        </div>
      )}
      </div>
    </PageTransition>
  );
}