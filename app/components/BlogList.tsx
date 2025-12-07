'use client'
import { useEffect, useRef } from 'react';
import BlogCard from './BlogCard';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  featuredImage?: string;
  category: string;
  tags: string[];
  publishedAt?: string;
}

interface BlogListProps {
  posts: BlogPost[];
}

export default function BlogList({ posts }: BlogListProps) {
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (listRef.current) {
      const cards = listRef.current.querySelectorAll('[data-blog-card]');
      cards.forEach((card, index) => {
        const htmlCard = card as HTMLElement;
        htmlCard.style.opacity = '0';
        htmlCard.style.transform = 'translateY(20px)';

        setTimeout(() => {
          htmlCard.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
          htmlCard.style.opacity = '1';
          htmlCard.style.transform = 'translateY(0)';
        }, 100 + index * 100);
      });
    }
  }, [posts]);

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap');
          .empty-state { font-family: 'JetBrains Mono', monospace; }
        `}</style>
        <div className="empty-state text-center">
          <h3 className="text-xl sm:text-2xl font-bold text-[#d0dae8] mb-3">
            Brak artykułów
          </h3>
          <p className="text-[#b5b5b5] text-sm sm:text-base">
            Na ten moment nie ma opublikowanych artykułów. Zapraszamy wkrótce!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={listRef}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full"
    >
      {posts.map((post) => (
        <div key={post.id} data-blog-card>
          <BlogCard
            title={post.title}
            slug={post.slug}
            excerpt={post.excerpt}
            featuredImage={post.featuredImage}
            category={post.category}
            tags={post.tags}
            publishedAt={post.publishedAt}
          />
        </div>
      ))}
    </div>
  );
}
