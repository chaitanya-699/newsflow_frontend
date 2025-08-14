## NewsFlow

A modern, responsive news reader built with Next.js 15, TypeScript, and Tailwind CSS. Browse categories, discover sources, and open articles in a rich overlay with an AI chat assistant.

### Vision & Purpose
- Know news from all over the world fast, with a quick AI assistant to answer doubts and summarize articles.
- Validate a clean, accessible, mobile-first reading experience that scales from prototype to production.

### Features
- Responsive UI with Tailwind CSS v4
- Home, Discover, Following, Category, and Search pages
- Article overlay with AI chat assistant (simulated)
- Horizontal carousel for highlights
- Accessible components (skip link, keyboard-friendly)
- App Router, SEO metadata (Open Graph + Twitter), PWA manifest

### Product Walkthrough
- Home: curated sections and carousels of articles by category.
- Discover: find and filter channels/sources by type and category.
- Following: view sources you follow (news, blogs, YouTube, newsletters, websites).
- Category pages: route per category, server-rendered when applicable.
- Search: filter and sort articles and channels; wrapped in Suspense for `useSearchParams`.
- Article Overlay: two-pane reading layout (article + AI). On mobile, AI is opened via a small header icon and appears as a full-screen drawer with a back button.

### Tech Stack
- Next.js 15 (App Router)
- React 19, TypeScript
- Tailwind CSS v4
- ESLint (Next config)

## Getting Started

### Prerequisites
- Node.js 18.18+ (recommended 20+)
- npm 9+ (or pnpm/yarn/bun if you prefer)

### Install
```bash
npm install
```

### Environment Variables
Create a `.env.local` at the project root:
```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```
This value is used for absolute social image URLs in metadata.

### Development
```bash
npm run dev
# open http://localhost:3000
```

### Production Build
```bash
npm run build
npm run start
```

### Lint
```bash
npm run lint
```

## Architecture
- App Router with server and client components where appropriate.
- Global layout: `app/layout.tsx` provides fonts, metadata, error boundary, client layout, and skip link.
- State: lightweight React Context (`src/contexts/NewsContext.tsx`) for cross-component actions (e.g., opening articles).
- Data: `src/data/dummy.ts` provides mock content for UI development.
- Styling: Tailwind v4 with CSS variables for theme tokens; small component-level inline styles where needed.
- Images: uses Next Image where possible; remote image domains should be whitelisted in `next.config.ts` when integrating real data.

## Data Model (dev)
Types in `src/types/index.ts`:
- `NewsArticle`: id, title, description, content, imageUrl, sourceUrl, sourceName, category, publishedAt, author
- `NewsSource`: id, name, description, imageUrl, type, isFollowing, url
- `User`: id, name, email, avatar?, followedTopics, followedSources

## AI Assistant UX
- Desktop: article left, AI chat right. Predefined quick prompts + free-text input.
- Mobile: AI panel is hidden; tap the 🤖 icon in the article header to open a full-screen drawer. Use the back button to return to the article.
- Current implementation is simulated; swap with your LLM API (OpenAI/Claude/Gemini) when backend is ready.

## Accessibility & UX
- Skip-to-content link, ARIA labels, keyboard navigation where relevant.
- Buttons and focus states for key controls (carousel, AI icon, back button).
- High-contrast theming and reduced motion-friendly transitions.

## Performance Notes
- Static routes for many pages; dynamic ones kept minimal.
- Suspense wrapping for pages using `useSearchParams` to avoid CSR bailout errors.
- Replace demo image URLs and configure `next.config.ts` images/domains for production.

## Project Structure
```
src/
  app/
    page.tsx                # Home
    discover/page.tsx       # Discover sources
    following/page.tsx      # Following hub
    following/[type]/page.tsx
    category/[slug]/page.tsx
    search/page.tsx         # Search articles
    search/channels/page.tsx# Search channels
    auth/signin/page.tsx
    auth/signup/page.tsx
  components/
    layout/                 # Navbar, sidebars, layout
    news/                   # NewsCard, NewsOverlay (AI chat)
    ui/                     # Buttons, Skeletons, Carousel
  contexts/                 # React Context (NewsContext)
  data/                     # Dummy data for development
```

## Key Components
- `components/news/NewsOverlay.tsx`: Full-screen article reader. On mobile, AI chat opens as a full-screen drawer via an icon in the article header.
- `components/ui/HorizontalCarousel.tsx`: Simple horizontal scroller with prev/next controls.
- `components/layout/ClientLayout.tsx`: App frame (navigation, sidebars, toasts, etc.).

## Configuration Notes
- Metadata base: set `NEXT_PUBLIC_SITE_URL` (see `.env.local`) to generate absolute URLs for Open Graph/Twitter images.
- Icons/manifest: update files under `public/` if you want PWA icons (e.g., `apple-touch-icon.png`, `favicon-16x16.png`).
- Remote images: if you fetch external images, consider adding allowed domains in `next.config.ts` using the `images.domains` setting.

## Common Issues
- Multiple lockfiles detected during build: ensure only one `package-lock.json` exists (prefer the one in this project root).
- Upstream image 404s from demo URLs: replace sample Unsplash links with valid image URLs.
- Next.js warning about viewport in metadata: this project exports `viewport` from `app/layout.tsx` as recommended.
- useSearchParams error: pages that use `useSearchParams` are wrapped in `Suspense` already.

## Scripts
- `dev`: start dev server with Turbopack
- `build`: production build
- `start`: run the built app
- `lint`: run ESLint

## Roadmap
See `PRODUCTION_CHECKLIST.md` for a full list of remaining production tasks (backend integration, security, testing, monitoring, and DevOps).

## Deployment
### Vercel (recommended)
1. Push the repo to GitHub.
2. Import the repo in Vercel.
3. Add `NEXT_PUBLIC_SITE_URL` to Project Settings → Environment Variables.
4. Deploy. Configure image domains and custom domains as needed.

### Self-hosting
- Build with `npm run build`, start with `npm run start`. Behind a reverse proxy (Nginx/Caddy) with HTTPS.

## FAQ
- Why dummy data? To iterate on UX quickly without blocking on backend.
- How to integrate a real news API? Replace uses of `dummy.ts` with fetch calls (server actions/route handlers) and add caching.
- How to plug in AI? Replace the simulated responses in `NewsOverlay.tsx` with calls to your LLM provider and add streaming UI if desired.

## Contributing
1. Fork and clone
2. Create a branch
3. Commit with clear messages
4. Open a PR

## License
No license specified yet.
