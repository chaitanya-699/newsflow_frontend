"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import PageTransition from "@/components/ui/PageTransition";
import Button from "@/components/ui/Button";
import SkeletonCard from "@/components/ui/SkeletonCard";

// Extended dummy search data for channels
const dummyChannelsData = [
  {
    id: "1",
    name: "TechCrunch",
    type: "news" as const,
    category: "Technology",
    description: "Leading technology news and startup coverage",
    followers: "2.5M",
    isFollowing: false,
    url: "https://techcrunch.com",
  },
  {
    id: "2",
    name: "The Verge",
    type: "news" as const,
    category: "Technology",
    description: "Technology, science, art, and culture news",
    followers: "1.8M",
    isFollowing: false,
    url: "https://theverge.com",
  },
  {
    id: "3",
    name: "Wired Magazine",
    type: "blog" as const,
    category: "Technology",
    description: "Ideas, breakthroughs, and the future of technology",
    followers: "3.2M",
    isFollowing: true,
    url: "https://wired.com",
  },
  {
    id: "4",
    name: "PewDiePie",
    type: "youtube" as const,
    category: "Entertainment",
    description: "Gaming, memes, and entertainment content",
    followers: "111M",
    isFollowing: false,
    url: "https://youtube.com/@pewdiepie",
  },
  {
    id: "5",
    name: "MKBHD",
    type: "youtube" as const,
    category: "Technology",
    description: "Quality tech videos and reviews",
    followers: "17.8M",
    isFollowing: true,
    url: "https://youtube.com/@mkbhd",
  },
  {
    id: "6",
    name: "Morning Brew",
    type: "newsletter" as const,
    category: "Business",
    description: "Daily business news in a fun, witty tone",
    followers: "4.1M",
    isFollowing: false,
    url: "https://morningbrew.com",
  },
  {
    id: "7",
    name: "The Hustle",
    type: "newsletter" as const,
    category: "Business",
    description: "Business and tech news with personality",
    followers: "2.8M",
    isFollowing: false,
    url: "https://thehustle.co",
  },
  {
    id: "8",
    name: "ESPN",
    type: "website" as const,
    category: "Sports",
    description: "Sports news, scores, and analysis",
    followers: "45M",
    isFollowing: false,
    url: "https://espn.com",
  },
  {
    id: "9",
    name: "BBC News",
    type: "news" as const,
    category: "World",
    description: "Breaking news, analysis, and features",
    followers: "52M",
    isFollowing: true,
    url: "https://bbc.com/news",
  },
  {
    id: "10",
    name: "CNN",
    type: "news" as const,
    category: "Politics",
    description: "Breaking news and political coverage",
    followers: "38M",
    isFollowing: false,
    url: "https://cnn.com",
  },
  {
    id: "11",
    name: "Ars Technica",
    type: "blog" as const,
    category: "Technology",
    description: "In-depth technology analysis and reviews",
    followers: "1.2M",
    isFollowing: false,
    url: "https://arstechnica.com",
  },
  {
    id: "12",
    name: "Vox",
    type: "news" as const,
    category: "Politics",
    description: "Explanatory journalism and analysis",
    followers: "3.5M",
    isFollowing: false,
    url: "https://vox.com",
  },
  {
    id: "13",
    name: "Kurzgesagt",
    type: "youtube" as const,
    category: "Science",
    description: "Animated educational videos about science",
    followers: "20.1M",
    isFollowing: true,
    url: "https://youtube.com/@kurzgesagt",
  },
  {
    id: "14",
    name: "Wall Street Journal",
    type: "news" as const,
    category: "Business",
    description: "Business and financial news",
    followers: "4.8M",
    isFollowing: false,
    url: "https://wsj.com",
  },
  {
    id: "15",
    name: "The Athletic",
    type: "website" as const,
    category: "Sports",
    description: "In-depth sports journalism and analysis",
    followers: "1.5M",
    isFollowing: false,
    url: "https://theathletic.com",
  },
  {
    id: "16",
    name: "Coding with Mosh",
    type: "youtube" as const,
    category: "Technology",
    description: "Programming tutorials and courses",
    followers: "3.2M",
    isFollowing: false,
    url: "https://youtube.com/@programmingwithmosh",
  },
  {
    id: "17",
    name: "Fireship",
    type: "youtube" as const,
    category: "Technology",
    description: "Fast-paced programming tutorials",
    followers: "2.8M",
    isFollowing: false,
    url: "https://youtube.com/@fireship",
  },
  {
    id: "18",
    name: "The New York Times",
    type: "news" as const,
    category: "World",
    description: "Breaking news, investigations, and analysis",
    followers: "55M",
    isFollowing: false,
    url: "https://nytimes.com",
  },
  {
    id: "19",
    name: "Stratechery",
    type: "newsletter" as const,
    category: "Business",
    description: "Technology and media strategy analysis",
    followers: "150K",
    isFollowing: false,
    url: "https://stratechery.com",
  },
  {
    id: "20",
    name: "Hacker News",
    type: "website" as const,
    category: "Technology",
    description: "Social news website for programmers",
    followers: "5M",
    isFollowing: true,
    url: "https://news.ycombinator.com",
  },
];

type ChannelType = "news" | "blog" | "youtube" | "newsletter" | "website";

interface Channel {
  id: string;
  name: string;
  type: ChannelType;
  category: string;
  description: string;
  followers: string;
  isFollowing: boolean;
  url: string;
}

export default function SearchChannelsContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const [results, setResults] = useState<Channel[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<"relevance" | "followers" | "name">(
    "relevance"
  );
  const [filterType, setFilterType] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [followingStates, setFollowingStates] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    // Initialize following states
    const initialStates = dummyChannelsData.reduce((acc, channel) => {
      acc[channel.id] = channel.isFollowing;
      return acc;
    }, {} as Record<string, boolean>);
    setFollowingStates(initialStates);
  }, []);

  useEffect(() => {
    const searchChannels = async () => {
      setLoading(true);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      if (!query.trim()) {
        setResults([]);
        setLoading(false);
        return;
      }

      // Search implementation
      let searchResults = dummyChannelsData.filter(
        (channel) =>
          channel.name.toLowerCase().includes(query.toLowerCase()) ||
          channel.description.toLowerCase().includes(query.toLowerCase()) ||
          channel.category.toLowerCase().includes(query.toLowerCase()) ||
          channel.type.toLowerCase().includes(query.toLowerCase())
      );

      // Apply type filter
      if (filterType !== "all") {
        searchResults = searchResults.filter(
          (channel) => channel.type === filterType
        );
      }

      // Apply category filter
      if (filterCategory !== "all") {
        searchResults = searchResults.filter(
          (channel) =>
            channel.category.toLowerCase() === filterCategory.toLowerCase()
        );
      }

      // Apply sorting
      const sortedResults = [...searchResults].sort((a, b) => {
        if (sortBy === "name") {
          return a.name.localeCompare(b.name);
        }
        if (sortBy === "followers") {
          const aFollowers = parseFollowers(a.followers);
          const bFollowers = parseFollowers(b.followers);
          return bFollowers - aFollowers;
        }
        // For relevance, use simple scoring
        const scoreA = getRelevanceScore(a, query);
        const scoreB = getRelevanceScore(b, query);
        return scoreB - scoreA;
      });

      setResults(sortedResults);
      setLoading(false);
    };

    searchChannels();
  }, [query, sortBy, filterType, filterCategory]);

  const parseFollowers = (followers: string): number => {
    const num = parseFloat(followers);
    if (followers.includes("M")) return num * 1000000;
    if (followers.includes("K")) return num * 1000;
    return num;
  };

  const getRelevanceScore = (channel: Channel, searchQuery: string): number => {
    const lowerQuery = searchQuery.toLowerCase();
    let score = 0;

    if (channel.name.toLowerCase().includes(lowerQuery)) score += 10;
    if (channel.description.toLowerCase().includes(lowerQuery)) score += 5;
    if (channel.category.toLowerCase().includes(lowerQuery)) score += 3;
    if (channel.type.toLowerCase().includes(lowerQuery)) score += 3;

    return score;
  };

  const getTypeIcon = (type: ChannelType) => {
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

  const handleFollow = async (channelId: string) => {
    setFollowingStates((prev) => ({
      ...prev,
      [channelId]: true,
    }));
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
  };

  const handleUnfollow = async (channelId: string) => {
    setFollowingStates((prev) => ({
      ...prev,
      [channelId]: false,
    }));
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
  };

  const types = [
    { value: "all", label: "All Types" },
    { value: "news", label: "News" },
    { value: "blog", label: "Blogs" },
    { value: "youtube", label: "YouTube" },
    { value: "newsletter", label: "Newsletters" },
    { value: "website", label: "Websites" },
  ];

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "technology", label: "Technology" },
    { value: "business", label: "Business" },
    { value: "sports", label: "Sports" },
    { value: "entertainment", label: "Entertainment" },
    { value: "politics", label: "Politics" },
    { value: "world", label: "World" },
    { value: "science", label: "Science" },
  ];

  return (
    <PageTransition>
      <div className="space-y-6">
        {/* Search Header */}
        <div className="slide-up">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Search Channels
          </h1>
          {query && (
            <p style={{ color: "var(--text-secondary)" }}>
              {loading
                ? "Searching..."
                : `${results.length} channels found for "${query}"`}
            </p>
          )}
        </div>

        {/* Filters and Sorting */}
        {query && (
          <div className="scale-in">
            <div
              className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between rounded-lg p-4 border"
              style={{
                backgroundColor: "var(--card-bg)",
                borderColor: "var(--border)",
              }}
            >
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Type Filter */}
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-foreground">
                    Type:
                  </label>
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="px-3 py-1 text-sm rounded focus:outline-none focus:ring-2 focus:ring-accent"
                    style={{
                      backgroundColor: "var(--muted)",
                      borderColor: "var(--border)",
                      color: "var(--foreground)",
                    }}
                  >
                    {types.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Category Filter */}
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-foreground">
                    Category:
                  </label>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="px-3 py-1 text-sm rounded focus:outline-none focus:ring-2 focus:ring-accent"
                    style={{
                      backgroundColor: "var(--muted)",
                      borderColor: "var(--border)",
                      color: "var(--foreground)",
                    }}
                  >
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sort By */}
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-foreground">
                    Sort by:
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) =>
                      setSortBy(
                        e.target.value as "relevance" | "followers" | "name"
                      )
                    }
                    className="px-3 py-1 text-sm rounded focus:outline-none focus:ring-2 focus:ring-accent"
                    style={{
                      backgroundColor: "var(--muted)",
                      borderColor: "var(--border)",
                      color: "var(--foreground)",
                    }}
                  >
                    <option value="relevance">Relevance</option>
                    <option value="followers">Followers</option>
                    <option value="name">Name</option>
                  </select>
                </div>
              </div>

              {!loading && results.length > 0 && (
                <div
                  className="text-sm"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {results.length} channel{results.length !== 1 ? "s" : ""}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Search Results */}
        {!query ? (
          <div className="text-center py-16 scale-in">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="h-12 w-12"
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
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Search Channels
            </h2>
            <p style={{ color: "var(--text-secondary)" }}>
              Enter a search term to find channels, sources, and creators
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="stagger-item">
                  <SkeletonCard />
                </div>
              ))
            ) : results.length > 0 ? (
              results.map((channel, index) => (
                <div
                  key={channel.id}
                  className="rounded-lg p-6 card-hover stagger-item discover-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                        <span className="text-xl">
                          {getTypeIcon(channel.type)}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {channel.name}
                        </h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <span
                            className="text-xs px-2 py-1 rounded-full"
                            style={{
                              color: "var(--text-secondary)",
                              backgroundColor: "var(--muted)",
                            }}
                          >
                            {channel.type.charAt(0).toUpperCase() +
                              channel.type.slice(1)}
                          </span>
                          <span
                            className="text-xs"
                            style={{ color: "var(--text-secondary)" }}
                          >
                            {channel.followers} followers
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Visit Link Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(
                          channel.url,
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
                      title={`Visit ${channel.name}`}
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
                    {channel.description}
                  </p>

                  <div className="flex items-center space-x-2">
                    {followingStates[channel.id] ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleUnfollow(channel.id)}
                        className="flex-1"
                      >
                        Following
                      </Button>
                    ) : (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleFollow(channel.id)}
                        className="flex-1"
                      >
                        Follow
                      </Button>
                    )}

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(
                          channel.url,
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
                      title={`Visit ${channel.name}`}
                    >
                      Visit
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12 scale-in">
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="h-12 w-12"
                    style={{ color: "var(--text-secondary)" }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.562M15 6.306a7.962 7.962 0 00-6 0m6 0V3a1 1 0 00-1-1H8a1 1 0 00-1 1v3.306"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  No channels found
                </h3>
                <p style={{ color: "var(--text-secondary)" }}>
                  Try adjusting your search terms or filters
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </PageTransition>
    
  );
}
