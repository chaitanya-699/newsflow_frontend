import Head from 'next/head';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  author?: string;
}

export default function SEOHead({
  title = 'NewsFlow - Stay Informed',
  description = 'Your personalized news experience with AI-powered insights. Stay updated with the latest news from technology, business, sports, entertainment, and more.',
  keywords = 'news, technology, business, sports, entertainment, AI, personalized news, breaking news',
  image = '/og-image.jpg',
  url = 'https://newsflow.com',
  type = 'website',
  publishedTime,
  author
}: SEOHeadProps) {
  const fullTitle = title.includes('NewsFlow') ? title : `${title} | NewsFlow`;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author || 'NewsFlow'} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="canonical" href={url} />

      {/* Open Graph Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="NewsFlow" />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {author && <meta property="article:author" content={author} />}

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="1 days" />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": type === 'article' ? 'NewsArticle' : 'WebSite',
            "name": fullTitle,
            "description": description,
            "url": url,
            "image": image,
            ...(type === 'article' && publishedTime && {
              "datePublished": publishedTime,
              "author": {
                "@type": "Person",
                "name": author || 'NewsFlow'
              }
            }),
            ...(type === 'website' && {
              "potentialAction": {
                "@type": "SearchAction",
                "target": `${url}/search?q={search_term_string}`,
                "query-input": "required name=search_term_string"
              }
            })
          })
        }}
      />
    </Head>
  );
}