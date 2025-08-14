export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  content: string;
  imageUrl: string;
  sourceUrl: string;
  sourceName: string;
  category: string;
  publishedAt: string;
  author: string;
}

export interface NewsSource {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  type: "news" | "blog" | "youtube" | "newsletter" | "website";
  isFollowing: boolean;
  url: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  followedTopics: string[];
  followedSources: string[];
}

export type Category =
  | "top"
  | "trending"
  | "latest"
  | "politics"
  | "technology"
  | "sports"
  | "entertainment"
  | "business"
  | "world";
