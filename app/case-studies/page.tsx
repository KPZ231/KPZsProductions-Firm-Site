'use client'
import { useEffect, useState } from 'react';
import Hero from '@/app/components/HeroSection';
import CaseStudyList from '@/app/components/CaseStudyList';
import Link from 'next/link';

interface CaseStudy {
  id: number;
  title: string;
  slug: string;
  clientName?: string;
  clientIndustry: string;
  problem?: string;
  featuredImage?: string;
  tags: string[];
  publishedAt?: string;
  status: string;
}

export default function CaseStudiesPage() {
  const [studies, setStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const STUDIES_PER_PAGE = 9;

  // Fetch case studies from API
  useEffect(() => {
    const fetchStudies = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        params.append('status', 'PUBLISHED');
        params.append('limit', '100');

        const response = await fetch(`/api/admin/case-studies?${params}`);
        if (!response.ok) throw new Error('Failed to fetch case studies');

        const data = await response.json();
        if (data.success) {
          // Filtrujemy tylko opublikowane case studies
          const publishedStudies = data.data.filter(
            (study: CaseStudy) => study.status === 'PUBLISHED'
          );
          setStudies(publishedStudies);
        }
      } catch (err) {
        setError('Nie udało się załadować case studies');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudies();
  }, []);

  // Filter studies
  const filteredStudies = studies.filter((study) => {
    const matchesIndustry = !selectedIndustry || study.clientIndustry === selectedIndustry;
    const matchesSearch =
      !searchTerm ||
      study.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      study.problem?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      study.clientName?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesIndustry && matchesSearch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredStudies.length / STUDIES_PER_PAGE);
  const startIndex = (currentPage - 1) * STUDIES_PER_PAGE;
  const paginatedStudies = filteredStudies.slice(startIndex, startIndex + STUDIES_PER_PAGE);

  // Get unique industries
  const industries = Array.from(new Set(studies.map((study) => study.clientIndustry))).sort();

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedIndustry, searchTerm]);

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      {/* Hero Section */}
      <Hero 
        title="Case Studies"
        desc="Poznaj nasze najlepsze projekty i osiągnięte rezultaty dla naszych klientów."
        ctaButtonContent="Przeglądaj projekty"
        ctaButtonLink="#case-studies-content"
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap');
        
        .case-studies-page {
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
          border-color: #00bfff;
          box-shadow: 0 0 20px rgba(0, 191, 255, 0.2);
        }
        
        .search-input::placeholder {
          color: #b5b5b5;
        }
        
        .industry-btn {
          transition: all 0.3s ease;
          border: 1px solid #2a2a2a;
          background: #111111;
          color: #d0dae8;
        }
        
        .industry-btn:hover,
        .industry-btn.active {
          background: #00bfff;
          color: #0a0a0a;
          border-color: #00bfff;
        }
        
        .pagination-btn {
          transition: all 0.3s ease;
          border: 1px solid #2a2a2a;
          background: #111111;
          color: #d0dae8;
        }
        
        .pagination-btn:hover:not(:disabled),
        .pagination-btn.active {
          background: #00bfff;
          color: #0a0a0a;
          border-color: #00bfff;
        }
        
        .pagination-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>

      {/* Main Content */}
      <section id="case-studies-content" className="w-full bg-[#0a0a0a] py-8 sm:py-12 lg:py-16">
        <div className="mx-auto w-full max-w-[95%] sm:max-w-[90%] lg:max-w-[85%]">
          <div className="case-studies-page">
            {/* Search and Filters */}
            <div className="mb-8 sm:mb-10 lg:mb-12 space-y-6">
              {/* Search */}
              <div>
                <label className="block text-sm font-medium text-[#00bfff] mb-3">
                  Szukaj projektów
                </label>
                <input
                  type="text"
                  placeholder="Wpisz nazwę projektu, klienta lub słowo kluczowe..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input w-full px-4 py-3 rounded-lg text-sm sm:text-base"
                />
              </div>

              {/* Industries */}
              {industries.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-[#00bfff] mb-3">
                    Branże
                  </label>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    <button
                      onClick={() => setSelectedIndustry(null)}
                      className={`industry-btn px-4 py-2 rounded text-sm sm:text-base font-medium ${
                        selectedIndustry === null ? 'active' : ''
                      }`}
                    >
                      Wszystkie
                    </button>
                    {industries.map((industry) => (
                      <button
                        key={industry}
                        onClick={() => setSelectedIndustry(industry)}
                        className={`industry-btn px-4 py-2 rounded text-sm sm:text-base font-medium ${
                          selectedIndustry === industry ? 'active' : ''
                        }`}
                      >
                        {industry}
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
                  <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-[#2a2a2a] border-t-[#00bfff] mx-auto"></div>
                  <p className="text-[#b5b5b5]">Ładowanie projektów...</p>
                </div>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-red-400">
                {error}
              </div>
            )}

            {/* Case Studies Grid */}
            {!loading && !error && (
              <>
                {filteredStudies.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-[#b5b5b5] mb-4">
                      Nie znaleziono projektów spełniających kryteria.
                    </p>
                    {(selectedIndustry || searchTerm) && (
                      <button
                        onClick={() => {
                          setSelectedIndustry(null);
                          setSearchTerm('');
                        }}
                        className="px-4 py-2 rounded bg-[#00bfff] text-[#0a0a0a] font-bold hover:bg-[#60a5fa] transition-colors text-sm sm:text-base"
                      >
                        Wyczyść filtry
                      </button>
                    )}
                  </div>
                ) : (
                  <>
                    <CaseStudyList studies={paginatedStudies} />

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
                Wyświetlanie {startIndex + 1}–{Math.min(startIndex + STUDIES_PER_PAGE, filteredStudies.length)} z {filteredStudies.length} projektów
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
