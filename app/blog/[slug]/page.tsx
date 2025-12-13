'use client'
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Hero from '@/app/components/HeroSection';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  featuredImage?: string;
  category: string;
  tags: string[];
  metaTitle?: string;
  metaDescription?: string;
  publishedAt?: string;
  createdAt?: string;
  status: string;
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);

        // Fetch all published posts to find the one with matching slug
        const response = await fetch('/api/admin/blog-posts?status=PUBLISHED&limit=100');
        if (!response.ok) throw new Error('Failed to fetch post');

        const data = await response.json();
        if (data.success) {
          const foundPost = data.data.find(
            (p: BlogPost) => p.slug === slug && p.status === 'PUBLISHED'
          );

          if (!foundPost) {
            setError('Artykuł nie znaleziony');
            return;
          }

          setPost(foundPost);

          // Find related posts (same category or shared tags)
          const related = data.data
            .filter(
              (p: BlogPost) =>
                p.slug !== slug &&
                (p.category === foundPost.category ||
                  p.tags.some((tag) => foundPost.tags.includes(tag)))
            )
            .slice(0, 3);

          setRelatedPosts(related);
        }
      } catch (err) {
        setError('Nie udało się załadować artykułu');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0a0a0a]">
        <Hero 
          title="Blog"
          desc="Ładowanie artykułu..."
          ctaButtonContent="Wróć do bloga"
          ctaButtonLink="/blog"
        />
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-[#2a2a2a] border-t-[#f8b500] mx-auto"></div>
            <p className="text-[#b5b5b5]">Ładowanie artykułu...</p>
          </div>
        </div>
      </main>
    );
  }

  if (error || !post) {
    return (
      <main className="min-h-screen bg-[#0a0a0a]">
        <Hero 
          title="Artykuł nie znaleziony"
          desc="Przepraszamy, ale szukany artykuł nie istnieje lub został usunięty."
          ctaButtonContent="Wróć do bloga"
          ctaButtonLink="/blog"
        />
        <section className="w-full bg-[#0a0a0a] py-8 sm:py-12 lg:py-16">
          <div className="mx-auto w-full max-w-[95%] sm:max-w-[90%] lg:max-w-[85%]">
            <div className="text-center">
              <h1 className="text-2xl sm:text-3xl font-bold text-[#d0dae8] mb-4">
                {error || 'Artykuł nie znaleziony'}
              </h1>
              <p className="text-[#b5b5b5] mb-6">
                Przepraszamy, ale szukany artykuł nie istnieje lub został usunięty.
              </p>
              <Link
                href="/blog"
                className="inline-block px-6 py-3 rounded bg-[#f8b500] text-[#0a0a0a] font-bold hover:bg-[#ffc59c] transition-colors"
              >
                Wróć do bloga
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('pl-PL', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      {/* Hero Section */}
      <Hero 
        title={post.title}
        desc={post.excerpt || 'Przeczytaj pełny artykuł'}
        ctaButtonContent="Czytaj artykuł"
        ctaButtonLink="#article-content"
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap');
        
        .blog-post-content {
          font-family: 'JetBrains Mono', monospace;
        }
        
        .post-content {
          color: #d0dae8;
          line-height: 1.8;
        }
        
        .post-content h1, .post-content h2, .post-content h3 {
          color: #ffc59c;
          margin-top: 1.5em;
          margin-bottom: 0.75em;
          font-weight: 700;
        }
        
        .post-content h1 { font-size: 1.875em; }
        .post-content h2 { font-size: 1.5em; }
        .post-content h3 { font-size: 1.25em; }
        
        .post-content p {
          margin-bottom: 1em;
        }
        
        .post-content strong {
          color: #f8b500;
          font-weight: 700;
        }
        
        .post-content em {
          color: #00bfff;
        }
        
        .post-content a {
          color: #00bfff;
          text-decoration: underline;
          transition: color 0.3s ease;
        }
        
        .post-content a:hover {
          color: #f8b500;
        }
        
        .post-content ul, .post-content ol {
          margin-bottom: 1em;
          margin-left: 1.5em;
        }
        
        .post-content li {
          margin-bottom: 0.5em;
        }
        
        .post-content blockquote {
          border-left: 4px solid #f8b500;
          padding-left: 1.5em;
          margin: 1.5em 0;
          color: #b5b5b5;
          font-style: italic;
        }
        
        .post-content code {
          background: #111111;
          padding: 0.25em 0.5em;
          border-radius: 0.375em;
          color: #00bfff;
          font-size: 0.9em;
        }
        
        .post-content pre {
          background: #111111;
          border: 1px solid #2a2a2a;
          padding: 1em;
          border-radius: 0.5em;
          overflow-x: auto;
          margin-bottom: 1em;
        }
        
        .post-content pre code {
          background: none;
          padding: 0;
          color: #d0dae8;
        }
      `}</style>

      {/* Featured Image */}
      {post.featuredImage && (
        <section className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] bg-[#111111]">
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-b from-transparent to-[#0a0a0a] opacity-60" />
        </section>
      )}

      {/* Article Content */}
      <article id="article-content" className="w-[95%] mx-auto bg-[#0a0a0a] py-8 sm:py-12 lg:py-16">
        <div className="mx-auto w-full max-w-[95%] sm:max-w-[90%] lg:max-w-[80%]">
          <div className="blog-post-content">
            {/* Meta Information */}
            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-[#2a2a2a]">
              <div className="flex items-center gap-4">
                <span className="inline-block px-3 py-1 rounded bg-[#f8b500] text-[#0a0a0a] font-bold text-xs sm:text-sm">
                  {post.category}
                </span>
                {formattedDate && (
                  <span className="text-[#b5b5b5] text-sm">{formattedDate}</span>
                )}
              </div>
            </div>

            {/* Content */}
            <div
              className="post-content prose prose-invert max-w-none mb-8"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-8 pt-6 border-t border-[#2a2a2a]">
                <h4 className="text-sm font-bold text-[#ffc59c] mb-3">Tagi:</h4>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/blog?search=${encodeURIComponent(tag)}`}
                      className="px-3 py-1 rounded bg-[#111111] border border-[#2a2a2a] text-[#d0dae8] text-sm hover:border-[#f8b500] hover:text-[#f8b500] transition-colors"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Back to Blog Link */}
            <div className="mt-10 pt-6 border-t border-[#2a2a2a]">
              <Link
                href="/blog"
                className="inline-block px-4 py-2 rounded bg-[#111111] border border-[#2a2a2a] text-[#d0dae8] font-medium hover:border-[#f8b500] hover:text-[#f8b500] transition-colors text-sm sm:text-base"
              >
                ← Wróć do bloga
              </Link>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="w-full bg-[#0a0a0a] py-8 sm:py-12 lg:py-16 border-t border-[#2a2a2a]">
          <div className="mx-auto w-full max-w-[95%] sm:max-w-[90%] lg:max-w-[85%]">
            <style>{`
              @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap');
              .related-section { font-family: 'JetBrains Mono', monospace; }
            `}</style>
            <div className="related-section">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#ffc59c] mb-8">
                Powiązane artykuły
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    href={`/blog/${relatedPost.slug}`}
                    className="group block rounded-lg border border-[#2a2a2a] bg-[#111111] p-4 sm:p-5 transition-all duration-300 hover:border-[#f8b500] hover:-translate-y-2"
                  >
                    {relatedPost.featuredImage && (
                      <div className="relative mb-4 h-32 w-full overflow-hidden rounded">
                        <Image
                          src={relatedPost.featuredImage}
                          alt={relatedPost.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                    )}
                    <h3 className="font-bold text-[#d0dae8] group-hover:text-[#f8b500] transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    {relatedPost.excerpt && (
                      <p className="mt-2 text-xs sm:text-sm text-[#b5b5b5] line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
