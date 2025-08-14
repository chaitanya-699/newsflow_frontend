"use client";

import { useEffect, useState } from "react";
import { NewsSource } from "@/types";

interface FollowedSourcesSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  followedSources: NewsSource[];
  onUnfollow: (sourceId: string) => void;
}

export default function FollowedSourcesSidebar({
  isOpen,
  onClose,
  followedSources,
  onUnfollow,
}: FollowedSourcesSidebarProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (isOpen) {
      setIsAnimating(true);
    } else {
      if (isAnimating) {
        const timer = setTimeout(() => setIsAnimating(false), 300);
        return () => clearTimeout(timer);
      }
    }
  }, [isOpen, isAnimating, mounted]);

  if (!mounted || (!isOpen && !isAnimating)) return null;

  const getTypeIcon = (type: NewsSource["type"]) => {
    switch (type) {
      case "news":
        return "📰";
      case "blog":
        return "📝";
      case "youtube":
        return "📺";
      case "newsletter":
        return "📧";
      case "website":
        return "🌐";
      default:
        return "📄";
    }
  };

  const getTypeLabel = (type: NewsSource["type"]) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[9998] transition-all duration-300 ${
          isOpen ? "backdrop-blur-sm bg-black/20" : ""
        }`}
        onClick={onClose}
      />

      {/* Top-Right Corner Dropdown */}
      <div
        className={`fixed right-2 top-2 md:-top-7 md:-right-7 w-[calc(100%-1rem)] md:w-96 max-h-[85vh] z-[9999] transform transition-all duration-300 ease-out rounded-xl shadow-2xl with-surface-border ${
          isOpen
            ? "translate-x-0 translate-y-0 opacity-100 scale-100"
            : "translate-x-4 -translate-y-4 opacity-0 scale-95"
        }`}
        style={{
          backgroundColor: "var(--card-bg)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.6)",
        }}
      >
        <div className="h-full flex flex-col max-h-[85vh]">
          {/* Header */}
          <div
            className="flex items-center justify-between p-5 border-b"
            style={{ borderColor: "var(--border)" }}
          >
            <div className="flex items-center space-x-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "var(--accent)" }}
              >
                <svg
                  className="h-5 w-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <div>
                <h2
                  className="text-lg font-semibold"
                  style={{ color: "var(--foreground)" }}
                >
                  Following
                </h2>
                <p
                  className="text-sm"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {followedSources.length} source
                  {followedSources.length !== 1 ? "s" : ""}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg transition-all duration-200 hover:scale-110"
              style={{
                color: "var(--text-secondary)",
                backgroundColor: "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--accent)";
                e.currentTarget.style.backgroundColor = "var(--muted)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--text-secondary)";
                e.currentTarget.style.backgroundColor = "transparent";
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Sources List */}
          <div className="flex-1 overflow-y-auto followed-sources-scroll min-h-0">
            {followedSources.length === 0 ? (
              <div className="p-6 text-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: "var(--muted)" }}
                >
                  <svg
                    className="h-8 w-8"
                    style={{ color: "var(--text-secondary)" }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>
                <h3
                  className="text-lg font-medium mb-2"
                  style={{ color: "var(--foreground)" }}
                >
                  No sources followed
                </h3>
                <p
                  className="text-sm"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Start following sources from the discover page to see them
                  here.
                </p>
              </div>
            ) : (
              <div className="p-4 space-y-2">
                {followedSources.map((source, index) => (
                  <div
                    key={source.id}
                    className="flex items-center justify-between p-3 rounded-lg transition-all duration-200 hover:scale-[1.02]"
                    style={{
                      backgroundColor: "var(--muted)",
                      animationDelay: `${index * 0.05}s`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "var(--border)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "var(--muted)";
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: "var(--background)" }}
                      >
                        <span className="text-lg">
                          {getTypeIcon(source.type)}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3
                          className="font-medium truncate text-sm"
                          style={{ color: "var(--foreground)" }}
                        >
                          {source.name}
                        </h3>
                        <p
                          className="text-xs"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          {getTypeLabel(source.type)}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => onUnfollow(source.id)}
                      className="px-3 py-1 text-xs rounded-md transition-all duration-200 hover:scale-105"
                      style={{
                        backgroundColor: "var(--border)",
                        color: "var(--text-secondary)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "var(--accent)";
                        e.currentTarget.style.color = "white";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "var(--border)";
                        e.currentTarget.style.color = "var(--text-secondary)";
                      }}
                    >
                      Unfollow
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
