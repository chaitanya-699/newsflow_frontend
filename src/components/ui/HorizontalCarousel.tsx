"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { NewsArticle } from "@/types";
import NewsCard from "../news/NewsCard";
import SkeletonCard from "./SkeletonCard";

interface HorizontalCarouselProps {
  articles: NewsArticle[];
  loading: boolean;
  onArticleClick: (article: NewsArticle) => void;
  className?: string;
}

export default function HorizontalCarousel({
  articles,
  loading,
  onArticleClick,
  className = "",
}: HorizontalCarouselProps) {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const autoScrollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Create infinite articles by repeating and generating variations
  const generateInfiniteArticles = () => {
    if (loading) {
      return Array.from({ length: 12 }, (_, i) => ({ id: `skeleton-${i}` }));
    }

    if (articles.length === 0) return [];

    const infiniteList: NewsArticle[] = [];
    const repetitions = 6; // More repetitions for truly infinite feel

    for (let rep = 0; rep < repetitions; rep++) {
      articles.forEach((article) => {
        // Create variations to make it feel like different content
        const variations = [
          { ...article, id: `${article.id}-rep${rep}-var0` },
          {
            ...article,
            id: `${article.id}-rep${rep}-var1`,
            title: `Breaking: ${article.title}`,
            publishedAt: new Date(
              Date.now() - Math.random() * 86400000 * 7
            ).toISOString(),
          },
          {
            ...article,
            id: `${article.id}-rep${rep}-var2`,
            title: `${article.title} - Latest Update`,
            publishedAt: new Date(
              Date.now() - Math.random() * 86400000 * 3
            ).toISOString(),
          },
        ];

        infiniteList.push(variations[rep % 3]);
      });
    }

    return infiniteList;
  };

  const infiniteArticles = generateInfiniteArticles();

  const updateScrollButtons = () => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const scrollLeft = container.scrollLeft;
    const maxScroll = container.scrollWidth - container.clientWidth;

    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < maxScroll - 10); // 10px tolerance
  };

  const getVisibleItemsCount = () => {
    if (!scrollContainerRef.current) return 3;
    const containerWidth = scrollContainerRef.current.clientWidth;
    const cardWidth = 320; // Card width + gap
    return Math.floor(containerWidth / cardWidth);
  };

  useEffect(() => {
    updateScrollButtons();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollButtons);
      return () => container.removeEventListener("scroll", updateScrollButtons);
    }
  }, [infiniteArticles]);


  const startAutoScroll = useCallback(() => {
    if (autoScrollIntervalRef.current || loading || articles.length === 0) return;
    
    setIsAutoScrolling(true);
    autoScrollIntervalRef.current = setInterval(() => {
      if (!scrollContainerRef.current) return;
      
      const container = scrollContainerRef.current;
      const cardWidth = 320;
      const maxScroll = container.scrollWidth - container.clientWidth;
      
      if (container.scrollLeft >= maxScroll - 10) {
        // Reset to beginning for infinite loop
        container.scrollLeft = 0;
      } else {
        container.scrollBy({
          left: cardWidth,
          behavior: "smooth",
        });
      }
    }, 3000); // Auto-scroll every 3 seconds
  }, [loading, articles.length]);

  // Auto-scroll functionality
  useEffect(() => {
    if (!loading && articles.length > 0) {
      startAutoScroll();
    }
    
    return () => stopAutoScroll();
  }, [loading, articles.length, startAutoScroll]);

  // Handle mouse enter/leave for auto-scroll
  const handleMouseEnter = () => {
    stopAutoScroll();
  };

  const handleMouseLeave = () => {
    if (!loading && articles.length > 0) {
      startAutoScroll();
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      scrollLeft();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      scrollRight();
    }
  };

  // Touch/swipe support
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && canScrollRight) {
      scrollRight();
    }
    if (isRightSwipe && canScrollLeft) {
      scrollLeft();
    }
  };

  const scrollToIndex = (index: number) => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const cardWidth = 320; // Approximate card width including gap
    const scrollPosition = index * cardWidth;

    container.scrollTo({
      left: scrollPosition,
      behavior: "smooth",
    });
  };

  const scrollLeft = () => {
    if (!scrollContainerRef.current || !canScrollLeft) return;

    const container = scrollContainerRef.current;
    const cardWidth = 320;
    const visibleItems = getVisibleItemsCount();
    const scrollAmount = cardWidth * Math.max(1, Math.floor(visibleItems / 2));

    container.scrollBy({
      left: -scrollAmount,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    if (!scrollContainerRef.current || !canScrollRight) return;

    const container = scrollContainerRef.current;
    const cardWidth = 320;
    const visibleItems = getVisibleItemsCount();
    const scrollAmount = cardWidth * Math.max(1, Math.floor(visibleItems / 2));

    container.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  

  const stopAutoScroll = () => {
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
      autoScrollIntervalRef.current = null;
    }
    setIsAutoScrolling(false);
  };

  // Auto-scroll to create infinite effect when reaching near the end
  useEffect(() => {
    if (!loading && articles.length > 0 && infiniteArticles.length > 0) {
      const container = scrollContainerRef.current;
      if (container) {
        const handleScroll = () => {
          const scrollLeft = container.scrollLeft;
          const maxScroll = container.scrollWidth - container.clientWidth;
          const cardWidth = 320;
          const originalSetLength = articles.length * cardWidth;

          // If we're near the end, jump back to middle section seamlessly
          if (scrollLeft >= maxScroll - cardWidth * 2) {
            setTimeout(() => {
              container.scrollLeft = originalSetLength * 2; // Jump to middle section
            }, 50);
          }

          // If we're at the very beginning, jump to middle section
          if (scrollLeft <= cardWidth) {
            setTimeout(() => {
              container.scrollLeft = originalSetLength * 2; // Jump to middle section
            }, 50);
          }
        };

        container.addEventListener("scroll", handleScroll);
        return () => container.removeEventListener("scroll", handleScroll);
      }
    }
  }, [loading, articles.length, infiniteArticles.length]);

  // Initialize scroll position to middle section for infinite effect
  useEffect(() => {
    if (!loading && articles.length > 0 && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = 320;
      const initialPosition = articles.length * cardWidth * 2; // Start in middle section

      setTimeout(() => {
        container.scrollLeft = initialPosition;
        updateScrollButtons();
      }, 100);
    }
  }, [loading, articles.length]);

  // Handle window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      updateScrollButtons();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (loading) {
    return (
      <div className={`relative ${className}`}>
        {/* Left Arrow */}
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 rounded-full p-2 shadow-lg opacity-50 cursor-not-allowed"
          style={{ backgroundColor: "var(--card-bg)" }}
          disabled
        >
          <svg
            className="h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Cards Container */}
        <div className="overflow-hidden">
          <div className="flex space-x-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="flex-shrink-0 w-80">
                <SkeletonCard />
              </div>
            ))}
          </div>
        </div>

        {/* Right Arrow */}
        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 rounded-full p-2 shadow-lg opacity-50 cursor-not-allowed"
          style={{ backgroundColor: "var(--card-bg)" }}
          disabled
        >
          <svg
            className="h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    );
  }

  if (infiniteArticles.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No articles available
      </div>
    );
  }

  return (
    <div 
      className={`relative group ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Left Arrow */}
      <button
        onClick={scrollLeft}
        disabled={!canScrollLeft}
        className={`absolute -left-4 top-1/2 -translate-y-1/2 z-10 rounded-full p-2 shadow-lg transition-all duration-200 btn-animate opacity-0 group-hover:opacity-100 ${
          !canScrollLeft ? 'cursor-not-allowed opacity-50' : 'hover:scale-110'
        }`}
        style={{ backgroundColor: "var(--card-bg)" }}
        onMouseEnter={(e) => {
          if (canScrollLeft) {
            e.currentTarget.style.backgroundColor = "var(--accent)";
            e.currentTarget.style.color = "white";
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "var(--card-bg)";
          e.currentTarget.style.color = "var(--foreground)";
        }}
      >
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* Cards Container */}
      <div className="overflow-hidden">
        <div
          ref={scrollContainerRef}
          className="flex space-x-6 overflow-x-auto scrollbar-hide scroll-smooth focus:outline-none"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          role="region"
          aria-label="News articles carousel"
        >
          {infiniteArticles.map((article) => (
            <div key={article.id} className="flex-shrink-0 w-80">
              <NewsCard
                article={article as NewsArticle}
                onClick={onArticleClick}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Right Arrow */}
      <button
        onClick={scrollRight}
        disabled={!canScrollRight}
        className={`absolute -right-4 top-1/2 -translate-y-1/2 z-10 rounded-full p-2 shadow-lg transition-all duration-200 btn-animate opacity-0 group-hover:opacity-100 ${
          !canScrollRight ? 'cursor-not-allowed opacity-50' : 'hover:scale-110'
        }`}
        style={{ backgroundColor: "var(--card-bg)" }}
        onMouseEnter={(e) => {
          if (canScrollRight) {
            e.currentTarget.style.backgroundColor = "var(--accent)";
            e.currentTarget.style.color = "white";
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "var(--card-bg)";
          e.currentTarget.style.color = "var(--foreground)";
        }}
      >
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Scroll Indicators */}
      {!loading && articles.length > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          {Array.from({ length: Math.min(articles.length, 8) }).map(
            (_, index) => (
              <button
                key={index}
                onClick={() => scrollToIndex(index)}
                className="w-2 h-2 rounded-full transition-all duration-200 bg-gray-300 dark:bg-gray-600 hover:bg-accent hover:scale-125"
                aria-label={`Go to slide ${index + 1}`}
              />
            )
          )}
        </div>
      )}

      {/* Auto-scroll indicator */}
      {isAutoScrolling && !loading && (
        <div className="absolute top-2 right-2 z-10">
          <div className="flex items-center space-x-1 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-full">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Auto</span>
          </div>
        </div>
      )}
    </div>
  );
}
