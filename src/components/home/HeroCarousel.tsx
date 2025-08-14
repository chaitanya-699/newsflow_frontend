'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { NewsArticle } from '@/types';


interface HeroCarouselProps {
  articles: NewsArticle[];
  loading: boolean;
  onArticleClick: (article: NewsArticle) => void;
}

export default function HeroCarousel({ articles, loading, onArticleClick }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (articles.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % articles.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [articles.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + articles.length) % articles.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % articles.length);
  };

  if (loading) {
    return (
      <div className="relative h-96 bg-muted rounded-lg overflow-hidden">
        <div className="w-full h-full shimmer" />
        <div className="absolute bottom-4 left-4 right-4">
          <div className="h-6 bg-gray-300 dark:bg-gray-600 shimmer rounded mb-2" />
          <div className="h-4 bg-gray-300 dark:bg-gray-600 shimmer rounded w-3/4" />
        </div>
      </div>
    );
  }

  if (articles.length === 0) return null;

  const currentArticle = articles[currentIndex];

  return (
    <div className="relative h-96 rounded-lg overflow-hidden group">
      {/* Background Image */}
      <Image
        src={currentArticle.imageUrl}
        alt={currentArticle.title}
        fill
        className="object-cover"
        priority
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <div className="mb-2">
          <span className="bg-accent px-3 py-1 rounded-full text-sm font-medium">
            {currentArticle.category}
          </span>
        </div>
        
        <h2 
          className="text-2xl md:text-3xl font-bold mb-3 cursor-pointer hover:text-blue-300 transition-colors"
          onClick={() => onArticleClick(currentArticle)}
        >
          {currentArticle.title}
        </h2>
        
        <p className="text-gray-200 mb-4 line-clamp-2">
          {currentArticle.description}
        </p>
        
        <div className="flex items-center space-x-4 text-sm text-gray-300">
          <span>{currentArticle.sourceName}</span>
          <span>•</span>
          <span>{new Date(currentArticle.publishedAt).toLocaleDateString()}</span>
        </div>
      </div>
      
      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      
      {/* Dots Indicator */}
      <div className="absolute bottom-4 right-4 flex space-x-2">
        {articles.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}