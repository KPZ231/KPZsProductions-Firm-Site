'use client'
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface BlogCardProps {
  title: string;
  slug: string;
  excerpt?: string;
  featuredImage?: string;
  category: string;
  tags: string[];
  publishedAt?: string;
}

export default function BlogCard({
  title,
  slug,
  excerpt,
  featuredImage,
  category,
  tags,
  publishedAt,
}: BlogCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (card) {
      const handleMouseEnter = () => {
        card.style.transform = 'translateY(-8px)';
        card.style.boxShadow = '0 20px 40px rgba(248, 181, 0, 0.15)';
      };
      const handleMouseLeave = () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 10px 30px rgba(100, 100, 100, 0.08)';
      };
      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);
      return () => {
        card.removeEventListener('mouseenter', handleMouseEnter);
        card.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, []);

  const formattedDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString('pl-PL', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  return (
    <div
      ref={cardRef}
      className="group overflow-hidden rounded-lg border border-[#2a2a2a] bg-[#111111] transition-all duration-300 hover:border-[#f8b500] flex flex-col h-full"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap');
        
        .blog-card {
          font-family: 'JetBrains Mono', monospace;
        }
        
        .category-badge {
          transition: all 0.3s ease;
          background: linear-gradient(135deg, rgba(248, 181, 0, 0.1), rgba(0, 191, 255, 0.1));
          border: 1px solid rgba(248, 181, 0, 0.3);
        }
        
        .blog-card:hover .category-badge {
          background: linear-gradient(135deg, rgba(248, 181, 0, 0.2), rgba(0, 191, 255, 0.2));
          border-color: #f8b500;
        }
        
        .tag-item {
          transition: all 0.25s ease;
          background: rgba(76, 76, 76, 0.4);
          border: 1px solid #3a3a3a;
        }
        
        .tag-item:hover {
          background: rgba(248, 181, 0, 0.1);
          border-color: #f8b500;
          color: #f8b500;
        }
      `}</style>

      {/* Featured Image */}
      {featuredImage && (
        <div className="relative h-48 w-full overflow-hidden bg-[#0a0a0a]">
          <Image
            src={featuredImage}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#111111] opacity-40" />
        </div>
      )}

      {/* Content */}
      <div className="blog-card flex flex-col gap-3 p-4 sm:p-5 flex-grow">
        {/* Category & Date */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <span className="category-badge inline-block w-fit px-3 py-1 rounded text-xs sm:text-sm font-medium text-[#ffc59c]">
            {category}
          </span>
          {publishedAt && (
            <span className="text-xs sm:text-sm text-[#b5b5b5]">
              {formattedDate}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold text-[#d0dae8] line-clamp-2 group-hover:text-[#f8b500] transition-colors">
          {title}
        </h3>

        {/* Excerpt */}
        {excerpt && (
          <p className="text-xs sm:text-sm text-[#b5b5b5] line-clamp-3 flex-grow">
            {excerpt}
          </p>
        )}

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="tag-item px-2 py-1 rounded text-xs text-[#d0dae8]"
              >
                #{tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="text-xs text-[#b5b5b5] self-center">
                +{tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Read More Link */}
      <Link
        href={`/blog/${slug}`}
        className="mx-4 mb-4 px-4 py-2 rounded bg-[#f8b500] text-[#0a0a0a] font-bold transition-all duration-300 text-center hover:bg-[#ffc59c] hover:shadow-lg hover:shadow-[#f8b500]/30 text-sm sm:text-base"
      >
        Czytaj artykuł
      </Link>
    </div>
  );
}
