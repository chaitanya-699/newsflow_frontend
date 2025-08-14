"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { dummyArticles } from "@/data/dummy";

interface NavbarProps {
  onProfileClick: () => void;
}

export default function Navbar({ onProfileClick }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [desktopSearchQuery, setDesktopSearchQuery] = useState("");
  const [mobileSearchQuery, setMobileSearchQuery] = useState("");
  const [isDesktopFocused, setIsDesktopFocused] = useState(false);
  const [isMobileFocused, setIsMobileFocused] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/following", label: "Following" },
    { href: "/discover", label: "Discover" },
  ];

  const isActive = (href: string) => pathname === href;

  const handleDesktopSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = desktopSearchQuery.trim();
    if (q) {
      router.push(`/search?q=${encodeURIComponent(q)}`);
    }
  };

  const handleMobileSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = mobileSearchQuery.trim();
    if (q) {
      router.push(`/search?q=${encodeURIComponent(q)}`);
      setIsMenuOpen(false);
      setTimeout(() => setMobileSearchQuery(""), 100);
    }
  };

  const getSuggestions = (query: string) => {
    const q = query.trim().toLowerCase();
    if (!q) return [] as { id: string; title: string }[];
    return dummyArticles
      .filter((a) =>
        a.title.toLowerCase().includes(q) || a.description.toLowerCase().includes(q)
      )
      .slice(0, 5)
      .map((a) => ({ id: a.id, title: a.title }));
  };

  const desktopSuggestions = getSuggestions(desktopSearchQuery);
  const mobileSuggestions = getSuggestions(mobileSearchQuery);

  const handleSelectSuggestion = (title: string, isMobile: boolean) => {
    if (isMobile) {
      setMobileSearchQuery(title);
      router.push(`/search?q=${encodeURIComponent(title)}`);
      setIsMenuOpen(false);
      setTimeout(() => setMobileSearchQuery(""), 100);
    } else {
      setDesktopSearchQuery(title);
      router.push(`/search?q=${encodeURIComponent(title)}`);
    }
  };

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
  };

  // Initialize theme on mount from localStorage or system preference
  // and keep html[data-theme] + localStorage in sync
  if (typeof window !== 'undefined') {
    // noop to satisfy type narrowing in effects below
  }

  // Mount effect
  // eslint-disable-next-line react-hooks/rules-of-hooks
  React.useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem('theme');
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initial: 'dark' | 'light' = stored === 'light' || stored === 'dark' ? (stored as 'dark' | 'light') : (prefersDark ? 'dark' : 'light');
      setTheme(initial);
      document.documentElement.setAttribute('data-theme', initial);
    } catch {}
  }, []);

  // Sync effect
  // eslint-disable-next-line react-hooks/rules-of-hooks
  React.useEffect(() => {
    try {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    } catch {}
  }, [theme]);

  return (
    <nav className="border-b sticky top-0 z-50 bg-[var(--card-bg)] border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[var(--accent)]">
              <span className="text-white font-bold text-lg">N</span>
            </div>
            <span className="text-xl font-bold text-[var(--foreground)]">
              NewsFlow
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "text-[var(--accent)] bg-[var(--muted)]"
                    : "text-[var(--foreground)] hover:text-[var(--accent)] hover:bg-[var(--muted)]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <form onSubmit={handleDesktopSearch} className="relative w-full">
              <input
                type="search"
                placeholder="Search news..."
                value={desktopSearchQuery}
                onChange={(e) => setDesktopSearchQuery(e.target.value)}
                onFocus={() => setIsDesktopFocused(true)}
                onBlur={() => setTimeout(() => setIsDesktopFocused(false), 100)}
                autoComplete="off"
                className="w-full px-4 py-2 text-sm rounded-lg border focus:outline-none focus:ring-2 bg-[var(--muted)] border-[var(--border)] text-[var(--foreground)] focus:border-[var(--accent)] focus:ring-[rgba(255,107,53,0.2)] pl-10"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[var(--text-secondary)]">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              {isDesktopFocused && desktopSuggestions.length > 0 && (
                <ul className="absolute z-50 mt-2 left-0 right-0 max-h-80 overflow-auto rounded-lg border border-[var(--border)] bg-[var(--card-bg)] shadow-lg">
                  {desktopSuggestions.map((s) => (
                    <li key={s.id} className="border-b last:border-b-0 border-[var(--border)]">
                      <button
                        type="button"
                        onMouseDown={() => handleSelectSuggestion(s.title, false)}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-[var(--muted)] text-[var(--foreground)]"
                      >
                        {s.title}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </form>
          </div>

          {/* Profile */}
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--accent)] hover:bg-[var(--muted)]"
            >
              {theme === 'dark' ? (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364 6.364l-1.414-1.414M7.05 7.05L5.636 5.636m12.728 0l-1.414 1.414M7.05 16.95l-1.414 1.414" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                </svg>
              )}
            </button>
            <button
              onClick={onProfileClick}
              className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--accent)] hover:bg-[var(--muted)]"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--accent)] hover:bg-[var(--muted)]"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-[var(--border)]">
            <div className="space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? "text-[var(--accent)] bg-[var(--muted)]"
                      : "text-[var(--foreground)] hover:text-[var(--accent)] hover:bg-[var(--muted)]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile search */}
            <div className="mt-4 space-y-3">
              <form onSubmit={handleMobileSearch} className="flex flex-col space-y-2">
                <div className="relative">
                  <input
                    type="search"
                    placeholder="Search news..."
                    value={mobileSearchQuery}
                    onChange={(e) => setMobileSearchQuery(e.target.value)}
                    onFocus={() => setIsMobileFocused(true)}
                    onBlur={() => setTimeout(() => setIsMobileFocused(false), 100)}
                    autoComplete="off"
                    className="w-full px-4 py-2 text-sm rounded-lg border focus:outline-none focus:ring-2 bg-[var(--muted)] border-[var(--border)] text-[var(--foreground)] focus:border-[var(--accent)] focus:ring-[rgba(255,107,53,0.2)]"
                  />
                  {isMobileFocused && mobileSuggestions.length > 0 && (
                    <ul className="absolute z-50 mt-2 left-0 right-0 max-h-80 overflow-auto rounded-lg border border-[var(--border)] bg-[var(--card-bg)] shadow-lg">
                      {mobileSuggestions.map((s) => (
                        <li key={s.id} className="border-b last:border-b-0 border-[var(--border)]">
                          <button
                            type="button"
                            onMouseDown={() => handleSelectSuggestion(s.title, true)}
                            className="w-full text-left px-4 py-2 text-sm hover:bg-[var(--muted)] text-[var(--foreground)]"
                          >
                            {s.title}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full px-3 py-2 rounded-lg bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)]"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
