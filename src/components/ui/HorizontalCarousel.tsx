"use client";

import { useEffect, useRef, useState } from "react";
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateButtons = () => {
    const el = containerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < max - 1);
  };

  const scrollByAmount = (amount: number) => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  const scrollLeft = () => scrollByAmount(-(containerRef.current?.clientWidth || 320) * 0.9);
  const scrollRight = () => scrollByAmount((containerRef.current?.clientWidth || 320) * 0.9);

  useEffect(() => {
    updateButtons();
    const el = containerRef.current;
    if (!el) return;
    const onScroll = () => updateButtons();
    el.addEventListener("scroll", onScroll);
    window.addEventListener("resize", updateButtons);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateButtons);
    };
  }, [articles, loading]);

  if (loading) {
    return (
      <div className={`relative ${className}`}>
        <div className="overflow-hidden">
          <div className="flex space-x-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex-shrink-0 w-80">
                <SkeletonCard />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!articles || articles.length === 0) {
    return <div className="text-center py-8 text-gray-500">No articles available</div>;
  }

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={scrollLeft}
        disabled={!canScrollLeft}
        className={`absolute -left-4 top-1/2 -translate-y-1/2 z-10 rounded-full p-2 shadow-lg transition-colors ${
          canScrollLeft ? "hover:bg-accent hover:text-white" : "opacity-50 cursor-not-allowed"
        }`}
        style={{ backgroundColor: "var(--card-bg)" }}
        aria-label="Scroll left"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <div className="overflow-hidden">
        <div
          ref={containerRef}
          className="flex space-x-5 overflow-x-auto scroll-smooth scrollbar-hide pl-5"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          role="region"
          aria-label="News articles carousel"
        >
          {articles.map((article) => (
            <div key={article.id} className="flex-shrink-0 w-80">
              <NewsCard article={article} onClick={onArticleClick} />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={scrollRight}
        disabled={!canScrollRight}
        className={`absolute -right-4 top-1/2 -translate-y-1/2 z-10 rounded-full p-2 shadow-lg transition-colors ${
          canScrollRight ? "hover:bg-accent hover:text-white" : "opacity-50 cursor-not-allowed"
        }`}
        style={{ backgroundColor: "var(--card-bg)" }}
        aria-label="Scroll right"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
