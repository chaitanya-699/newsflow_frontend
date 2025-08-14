'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Button from '../ui/Button';

interface ProfileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfileSidebar({ isOpen, onClose }: ProfileSidebarProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsAnimating(true);
    } else {
      document.body.style.overflow = 'unset';
      if (isAnimating) {
        // Delay hiding to allow exit animation
        const timer = setTimeout(() => setIsAnimating(false), 300);
        return () => clearTimeout(timer);
      }
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, isAnimating, mounted]);

  if (!mounted || (!isOpen && !isAnimating)) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 z-[60] transition-all duration-400 ${
          isOpen ? 'backdrop-blur-sm profile-sidebar-backdrop' : ''
        }`}
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div 
        className={`fixed right-0 top-0 h-full w-80 border-l z-[70] transform transition-all duration-400 ease-out profile-sidebar with-surface-border ${
          isOpen ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-full opacity-0 scale-95'
        }`}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6" style={{ borderBottom: '1px solid var(--border)' }}>
            <h2 className="text-lg font-semibold profile-sidebar-text">Profile</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg profile-sidebar-button"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Profile Section */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center profile-avatar">
                <span className="text-white font-semibold text-lg">U</span>
              </div>
              <div>
                <p className="text-sm profile-sidebar-text-secondary">Welcome back!</p>
                <p className="font-medium profile-sidebar-text">Sign in to continue</p>
              </div>
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="mb-8" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <Link href="/auth/signin" onClick={onClose}>
              <Button variant="primary" className="w-full">
                Sign In
              </Button>
            </Link>
            <Link href="/auth/signup" onClick={onClose}>
              <Button variant="outline" className="w-full">
                Sign Up
              </Button>
            </Link>
          </div>

          {/* Menu Items */}
          <div className="space-y-2">
            {['Settings', 'Preferences', 'Help & Support', 'About'].map((item) => (
              <button 
                key={item}
                className="w-full text-left px-3 py-2 rounded-lg profile-sidebar-menu-button with-surface-border"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}