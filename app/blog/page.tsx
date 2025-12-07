'use client'
import { useEffect, useState } from 'react';
import Hero from '@/app/components/HeroSection';
import BlogList from '@/app/components/BlogList';
import Link from 'next/link';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  featuredImage?: string;
  category: string;
  tags: string[];
  publishedAt?: string;
  status: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const POSTS_PER_PAGE = 9;

  // Fetch posts from API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        params.append('status', 'PUBLISHED');
        params.append('limit', '100');

        const response = await fetch(`/api/admin/blog-posts?${params}`);
        if (!response.ok) throw new Error('Failed to fetch posts');

        const data = await response.json();
        if (data.success) {
          // Filtrujemy tylko opublikowane posty
          const publishedPosts = data.data.filter(
            (post: BlogPost) => post.status === 'PUBLISHED'
          );
          setPosts(publishedPosts);
        }
      } catch (err) {
        setError('Nie udało się załadować artykułów');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Filter posts
  const filteredPosts = posts.filter((post) => {
    const matchesCategory = !selectedCategory || post.category === selectedCategory;
    const matchesSearch =
      !searchTerm ||
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  // Get unique categories
  const categories = Array.from(new Set(posts.map((post) => post.category))).sort();

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchTerm]);

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      {/* Hero Section */}
      <Hero 
        title="Blog"
        desc="Odkryj najnowsze artykuły o tworzeniu stron, web designie i nowoczesnych technologiach."
        ctaButtonContent="Przeglądaj artykuły"
        ctaButtonLink="#blog-content"
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap');
        
        .blog-page {
          font-family: 'JetBrains Mono', monospace;
        }
        
        .search-input {
          background: #111111;
          border: 1px solid #2a2a2a;
          color: #d0dae8;
          transition: all 0.3s ease;
        }
        
        .search-input:focus {
          outline: none;
          border-color: #f8b500;
          box-shadow: 0 0 20px rgba(248, 181, 0, 0.2);
        }
        
        .search-input::placeholder {
          color: #b5b5b5;
        }
        
        .category-btn {
          transition: all 0.3s ease;
          border: 1px solid #2a2a2a;
          background: #111111;
          color: #d0dae8;
        }
        
        .category-btn:hover,
        .category-btn.active {
          background: #f8b500;
          color: #0a0a0a;
          border-color: #f8b500;
        }
        
        .pagination-btn {
          transition: all 0.3s ease;
          border: 1px solid #2a2a2a;
          background: #111111;
          color: #d0dae8;
        }
        
        .pagination-btn:hover:not(:disabled),
        .pagination-btn.active {
          background: #f8b500;
          color: #0a0a0a;
          border-color: #f8b500;
        }
        
        .pagination-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>

      {/* Main Content */}
      <section id="blog-content" className="w-full bg-[#0a0a0a] py-8 sm:py-12 lg:py-16">
        <div className="mx-auto w-full max-w-[95%] sm:max-w-[90%] lg:max-w-[85%]">
          <div className="blog-page">
            {/* Search and Filters */}
            <div className="mb-8 sm:mb-10 lg:mb-12 space-y-6">
              {/* Search */}
              <div>
                <label className="block text-sm font-medium text-[#ffc59c] mb-3">
                  Szukaj artykułów
                </label>
                <input
                  type="text"
                  placeholder="Wpisz tytuł lub słowo kluczowe..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input w-full px-4 py-3 rounded-lg text-sm sm:text-base"
                />
              </div>

              {/* Categories */}
              {categories.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-[#ffc59c] mb-3">
                    Kategorie
                  </label>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className={`category-btn px-4 py-2 rounded text-sm sm:text-base font-medium ${
                        selectedCategory === null ? 'active' : ''
                      }`}
                    >
                      Wszystkie
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`category-btn px-4 py-2 rounded text-sm sm:text-base font-medium ${
                          selectedCategory === category ? 'active' : ''
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex items-center justify-center py-16">
                <div className="text-center">
                  <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-[#2a2a2a] border-t-[#f8b500] mx-auto"></div>
                  <p className="text-[#b5b5b5]">Ładowanie artykułów...</p>
                </div>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-red-400">
                {error}
              </div>
            )}

            {/* Blog Posts Grid */}
            {!loading && !error && (
              <>
                {filteredPosts.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-[#b5b5b5] mb-4">
                      Nie znaleziono artykułów spełniających kryteria.
                    </p>
                    {(selectedCategory || searchTerm) && (
                      <button
                        onClick={() => {
                          setSelectedCategory(null);
                          setSearchTerm('');
                        }}
                        className="px-4 py-2 rounded bg-[#f8b500] text-[#0a0a0a] font-bold hover:bg-[#ffc59c] transition-colors text-sm sm:text-base"
                      >
                        Wyczyść filtry
                      </button>
                    )}
                  </div>
                ) : (
                  <>
                    <BlogList posts={paginatedPosts} />

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="mt-10 sm:mt-12 lg:mt-16 flex items-center justify-center gap-2">
                        <button
                          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                          disabled={currentPage === 1}
                          className="pagination-btn px-3 py-2 rounded text-sm font-medium"
                        >
                          ← Poprzednia
                        </button>

                        <div className="flex gap-1">
                          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                              key={page}
                              onClick={() => setCurrentPage(page)}
                              className={`pagination-btn w-10 h-10 rounded text-sm font-medium ${
                                currentPage === page ? 'active' : ''
                              }`}
                            >
                              {page}
                            </button>
                          ))}
                        </div>

                        <button
                          onClick={() =>
                            setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                          }
                          disabled={currentPage === totalPages}
                          className="pagination-btn px-3 py-2 rounded text-sm font-medium"
                        >
                          Następna →
                        </button>
                      </div>
                    )}
                  </>
                )}
              </>
            )}

            {/* Results Count */}
            {!loading && !error && (
              <div className="mt-8 text-center text-[#b5b5b5] text-sm">
                Wyświetlanie {startIndex + 1}–{Math.min(startIndex + POSTS_PER_PAGE, filteredPosts.length)} z {filteredPosts.length} artykułów
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
