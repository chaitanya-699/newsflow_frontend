"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { NewsSource } from "@/types";
import { dummySources } from "@/data/dummy";
import Button from "@/components/ui/Button";
import SkeletonCard from "@/components/ui/SkeletonCard";
import PageTransition from "@/components/ui/PageTransition";
import FollowedSourcesSidebar from "@/components/layout/FollowedSourcesSidebar";

// Dummy search data
const dummySearchOptions = [
  {
    id: "1",
    name: "TechCrunch",
    type: "news" as const,
    category: "Technology",
  },
  { id: "2", name: "The Verge", type: "news" as const, category: "Technology" },
  {
    id: "3",
    name: "Wired Magazine",
    type: "blog" as const,
    category: "Technology",
  },
  {
    id: "4",
    name: "PewDiePie",
    type: "youtube" as const,
    category: "Entertainment",
  },
  { id: "5", name: "MKBHD", type: "youtube" as const, category: "Technology" },
  {
    id: "6",
    name: "Morning Brew",
    type: "newsletter" as const,
    category: "Business",
  },
  {
    id: "7",
    name: "The Hustle",
    type: "newsletter" as const,
    category: "Business",
  },
  { id: "8", name: "ESPN", type: "website" as const, category: "Sports" },
  { id: "9", name: "BBC News", type: "news" as const, category: "World" },
  { id: "10", name: "CNN", type: "news" as const, category: "Politics" },
  {
    id: "11",
    name: "Ars Technica",
    type: "blog" as const,
    category: "Technology",
  },
  { id: "12", name: "Vox", type: "news" as const, category: "Politics" },
  {
    id: "13",
    name: "Kurzgesagt",
    type: "youtube" as const,
    category: "Science",
  },
  {
    id: "14",
    name: "Wall Street Journal",
    type: "news" as const,
    category: "Business",
  },
  {
    id: "15",
    name: "The Athletic",
    type: "website" as const,
    category: "Sports",
  },
];

export default function Discover() {
  const [sources, setSources] = useState<NewsSource[]>([]);
  const [filteredSources, setFilteredSources] = useState<NewsSource[]>([]);
  const [loading, setLoading] = useState(true);
  const [followingStates, setFollowingStates] = useState<
    Record<string, boolean>
  >({});
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [isFollowedSidebarOpen, setIsFollowedSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState(dummySearchOptions);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const router = useRouter();

  useEffect(() => {
    // Simulate loading sources
    const loadSources = async () => {
      setLoading(true);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSources(dummySources);
      setFilteredSources(dummySources);

      // Initialize following states
      const initialStates = dummySources.reduce((acc, source) => {
        acc[source.id] = source.isFollowing;
        return acc;
      }, {} as Record<string, boolean>);
      setFollowingStates(initialStates);

      setLoading(false);
    };

    loadSources();
  }, []);

  const handleFollow = async (sourceId: string) => {
    // Simulate API call
    setFollowingStates((prev) => ({
      ...prev,
      [sourceId]: true,
    }));

    // Simulate loading state
    await new Promise((resolve) => setTimeout(resolve, 500));
  };

  const handleUnfollow = async (sourceId: string) => {
    // Simulate API call
    setFollowingStates((prev) => ({
      ...prev,
      [sourceId]: false,
    }));

    // Simulate loading state
    await new Promise((resolve) => setTimeout(resolve, 500));
  };

  const getSourceTypeIcon = (type: NewsSource["type"]) => {
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

  const handleFilterChange = useCallback((filter: string) => {
    setActiveFilter(filter);
    const unfollowedSources = sources.filter(
      (source) => !followingStates[source.id]
    );

    if (filter === "All") {
      setFilteredSources(unfollowedSources);
    } else {
      const filterType = filter.toLowerCase() as NewsSource["type"];
      setFilteredSources(
        unfollowedSources.filter((source) => source.type === filterType)
      );
    }
  }, [sources, followingStates]);

  const getFollowedSources = () => {
    return sources.filter((source) => followingStates[source.id]);
  };

  const handleUnfollowFromSidebar = async (sourceId: string) => {
    await handleUnfollow(sourceId);
    // Refresh the filtered sources to include the newly unfollowed source
    handleFilterChange(activeFilter);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSelectedIndex(-1); // Reset selection when search changes
    if (query.trim() === "") {
      setSearchResults(dummySearchOptions);
    } else {
      const filtered = dummySearchOptions.filter(
        (option) =>
          option.name.toLowerCase().includes(query.toLowerCase()) ||
          option.category.toLowerCase().includes(query.toLowerCase()) ||
          option.type.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
    }
  };

  const handleSearchSubmit = (
    selectedItem?: (typeof dummySearchOptions)[0]
  ) => {
    const queryToUse = selectedItem ? selectedItem.name : searchQuery;
    if (queryToUse.trim()) {
      router.push(`/search/channels?q=${encodeURIComponent(queryToUse)}`);
      setIsSearchOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isSearchOpen || searchResults.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < searchResults.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSearchSubmit(searchResults[selectedIndex]);
        } else {
          handleSearchSubmit();
        }
        break;
      case "Escape":
        setIsSearchOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };



  // Update filtered sources when following states change
  useEffect(() => {
    if (sources.length > 0) {
      handleFilterChange(activeFilter);
    }
  }, [followingStates, sources, activeFilter, handleFilterChange]);

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest(".search-container")) {
        setIsSearchOpen(false);
      }
    };

    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen]);

  return (
    <PageTransition>
      <div className="space-y-8">
        <div className="slide-up">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-bold text-foreground">Discover</h1>
            <Button
              variant="outline"
              onClick={() => setIsFollowedSidebarOpen(true)}
              className="flex items-center space-x-2"
            >
              <svg
                className="h-4 w-4"
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
              <span>Following ({getFollowedSources().length})</span>
            </Button>
          </div>
          <p style={{ color: "var(--text-secondary)" }}>
            Find new sources, blogs, channels, and websites to follow
          </p>
        </div>

        {/* Search Section */}
        <div className="scale-in">
          <div className="relative max-w-lg search-container">
            <div className="relative flex">
              <input
                type="search"
                placeholder="Search channels, sources, or categories..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => setIsSearchOpen(true)}
                onKeyDown={handleKeyDown}
                className="flex-1 px-4 py-3 pl-10 pr-4 rounded-l-lg border border-r-0 transition-all duration-200 focus:outline-none focus:ring-0 "
                style={{
                  backgroundColor: "var(--card-bg)",
                  borderColor: "var(--border)",
                  color: "var(--foreground)",
                }}
              />
              <Button
                variant="primary"
                onClick={() => handleSearchSubmit()}
                className="px-4 py-3 rounded-r-lg rounded-l-none border-l-0 border-[var(--border)] 
             focus:outline-none focus:ring-0 focus:border-[var(--border)]"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </Button>
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 pointer-events-none"
                style={{ color: "var(--text-secondary)" }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            {/* Search Dropdown */}
            {isSearchOpen && (
              <div
                className="absolute top-full left-0 right-0 mt-2 rounded-lg border shadow-lg z-50 max-h-80 overflow-y-auto backdrop-blur-sm"
                style={{
                  backgroundColor: "var(--card-bg)",
                  borderColor: "var(--border)",
                  boxShadow:
                    "0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)",
                }}
              >
                {searchResults.length > 0 ? (
                  <div className="py-2">
                    {searchResults.map((option, index) => (
                      <button
                        key={option.id}
                        onClick={() => handleSearchSubmit(option)}
                        className={`w-full px-4 py-3 text-left transition-colors duration-200 ${
                          index === selectedIndex
                            ? "bg-accent text-white"
                            : "hover:bg-muted"
                        }`}
                        onMouseEnter={() => setSelectedIndex(index)}
                        onMouseLeave={() => setSelectedIndex(-1)}
                      >
                        <div className="flex-1">
                          <div
                            className={`font-medium ${
                              index === selectedIndex
                                ? "text-white"
                                : "text-foreground"
                            }`}
                          >
                            {option.name}
                          </div>
                          <div className="text-sm flex items-center space-x-2 mt-1">
                            <span
                              className="px-2 py-1 rounded-full text-xs"
                              style={{
                                backgroundColor:
                                  index === selectedIndex
                                    ? "rgba(255,255,255,0.2)"
                                    : "var(--muted)",
                                color:
                                  index === selectedIndex
                                    ? "rgba(255,255,255,0.8)"
                                    : "var(--text-secondary)",
                              }}
                            >
                              {option.type.charAt(0).toUpperCase() +
                                option.type.slice(1)}
                            </span>
                            <span
                              style={{
                                color:
                                  index === selectedIndex
                                    ? "rgba(255,255,255,0.8)"
                                    : "var(--text-secondary)",
                              }}
                            >
                              {option.category}
                            </span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="px-4 py-6 text-center">
                    <p style={{ color: "var(--text-secondary)" }}>
                      No results found for &quot;{searchQuery}&quot;
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit scale-in">
          {["All", "News", "Blogs", "YouTube", "Newsletters", "Websites"].map(
            (filter) => (
              <button
                key={filter}
                onClick={() => handleFilterChange(filter)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 btn-animate ${
                  filter === activeFilter
                    ? "bg-card text-foreground shadow-sm"
                    : "hover:text-foreground"
                }`}
                style={{
                  color:
                    filter === activeFilter
                      ? "var(--foreground)"
                      : "var(--text-secondary)",
                }}
              >
                {filter}
              </button>
            )
          )}
        </div>

        {/* Sources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? // Show skeleton cards while loading
              Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="stagger-item">
                  <SkeletonCard />
                </div>
              ))
            : filteredSources.map((source, index) => (
                <div
                  key={source.id}
                  className="rounded-lg p-6 card-hover stagger-item discover-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                        <span className="text-xl">
                          {getSourceTypeIcon(source.type)}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {source.name}
                        </h3>
                        <span
                          className="text-xs px-2 py-1 rounded-full"
                          style={{
                            color: "var(--text-secondary)",
                            backgroundColor: "var(--muted)",
                          }}
                        >
                          {getTypeLabel(source.type)}
                        </span>
                      </div>
                    </div>

                    {/* Visit Link Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(
                          source.url,
                          "_blank",
                          "noopener,noreferrer"
                        );
                      }}
                      className="p-2 rounded-lg transition-all duration-200 btn-animate"
                      style={{ color: "var(--text-secondary)" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "var(--accent)";
                        e.currentTarget.style.backgroundColor = "var(--muted)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "var(--text-secondary)";
                        e.currentTarget.style.backgroundColor = "transparent";
                      }}
                      title={`Visit ${source.name}`}
                    >
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </button>
                  </div>

                  <p
                    className="text-sm mb-4 line-clamp-2"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {source.description}
                  </p>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleFollow(source.id)}
                      className="flex-1"
                    >
                      Follow
                    </Button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(
                          source.url,
                          "_blank",
                          "noopener,noreferrer"
                        );
                      }}
                      className="px-3 py-2 text-sm rounded-lg transition-all duration-200 btn-animate"
                      style={{ color: "var(--text-secondary)" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "var(--accent)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "var(--text-secondary)";
                      }}
                      title={`Visit ${source.name}`}
                    >
                      Visit
                    </button>
                  </div>
                </div>
              ))}
        </div>

        {!loading && filteredSources.length === 0 && (
          <div className="text-center py-12 scale-in">
            <p style={{ color: "var(--text-secondary)" }}>
              {getFollowedSources().length > 0
                ? "No more sources to discover. You've followed everything in this category!"
                : "No sources found. Try adjusting your filters."}
            </p>
          </div>
        )}
      </div>

      <FollowedSourcesSidebar
        isOpen={isFollowedSidebarOpen}
        onClose={() => setIsFollowedSidebarOpen(false)}
        followedSources={getFollowedSources()}
        onUnfollow={handleUnfollowFromSidebar}
      />
    </PageTransition>
  );
}
