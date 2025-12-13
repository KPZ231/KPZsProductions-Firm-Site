'use client'
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Hero from '@/app/components/HeroSection';

interface CaseStudy {
  id: number;
  title: string;
  slug: string;
  clientName?: string;
  clientIndustry: string;
  problem: string;
  solution: string;
  results: any;
  featuredImage?: string;
  tags: string[];
  metaTitle?: string;
  metaDescription?: string;
  publishedAt?: string;
  createdAt?: string;
  status: string;
}

export default function CaseStudyPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [study, setStudy] = useState<CaseStudy | null>(null);
  const [relatedStudies, setRelatedStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudy = async () => {
      try {
        setLoading(true);

        // Fetch all published case studies to find the one with matching slug
        const response = await fetch('/api/admin/case-studies?status=PUBLISHED&limit=100');
        if (!response.ok) throw new Error('Failed to fetch case study');

        const data = await response.json();
        if (data.success) {
          const foundStudy = data.data.find(
            (s: CaseStudy) => s.slug === slug && s.status === 'PUBLISHED'
          );

          if (!foundStudy) {
            setError('Case study nie znaleziony');
            return;
          }

          setStudy(foundStudy);

          // Find related case studies (same industry or shared tags)
          const related = data.data
            .filter(
              (s: CaseStudy) =>
                s.slug !== slug &&
                (s.clientIndustry === foundStudy.clientIndustry ||
                  s.tags.some((tag) => foundStudy.tags.includes(tag)))
            )
            .slice(0, 3);

          setRelatedStudies(related);
        }
      } catch (err) {
        setError('Nie udało się załadować case study');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchStudy();
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0a0a0a]">
        <Hero 
          title="Case Studies"
          desc="Ładowanie projektu..."
          ctaButtonContent="Wróć do projektów"
          ctaButtonLink="/case-studies"
        />
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-[#2a2a2a] border-t-[#00bfff] mx-auto"></div>
            <p className="text-[#b5b5b5]">Ładowanie projektu...</p>
          </div>
        </div>
      </main>
    );
  }

  if (error || !study) {
    return (
      <main className="min-h-screen bg-[#0a0a0a]">
        <Hero 
          title="Projekt nie znaleziony"
          desc="Przepraszamy, ale szukany projekt nie istnieje lub został usunięty."
          ctaButtonContent="Wróć do projektów"
          ctaButtonLink="/case-studies"
        />
        <section className="w-full bg-[#0a0a0a] py-8 sm:py-12 lg:py-16">
          <div className="mx-auto w-full max-w-[95%] sm:max-w-[90%] lg:max-w-[85%]">
            <div className="text-center">
              <Link
                href="/case-studies"
                className="inline-block px-6 py-3 rounded bg-[#00bfff] text-[#0a0a0a] font-bold hover:bg-[#60a5fa] transition-colors"
              >
                Wróć do projektów
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  const formattedDate = study.publishedAt
    ? new Date(study.publishedAt).toLocaleDateString('pl-PL', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  // Parse results if it's a JSON string
  const parsedResults = typeof study.results === 'string' ? JSON.parse(study.results) : study.results;

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      {/* Hero Section */}
      <Hero 
        title={study.title}
        desc={study.clientName ? `Projekt dla: ${study.clientName}` : `Branża: ${study.clientIndustry}`}
        ctaButtonContent="Przeczytaj szczegóły"
        ctaButtonLink="#case-study-content"
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap');
        
        .case-study-content {
          font-family: 'JetBrains Mono', monospace;
        }
        
        .content-section {
          color: #d0dae8;
          line-height: 1.8;
        }
        
        .content-section h2 {
          color: #00bfff;
          margin-top: 1.5em;
          margin-bottom: 0.75em;
          font-weight: 700;
          font-size: 1.5em;
        }
        
        .content-section h3 {
          color: #ffc59c;
          margin-top: 1.25em;
          margin-bottom: 0.5em;
          font-weight: 700;
          font-size: 1.25em;
        }
        
        .content-section p {
          margin-bottom: 1em;
        }
        
        .content-section strong {
          color: #f8b500;
          font-weight: 700;
        }
        
        .content-section ul, .content-section ol {
          margin-bottom: 1em;
          margin-left: 1.5em;
        }
        
        .content-section li {
          margin-bottom: 0.5em;
        }
        
        .results-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5em;
          margin: 2em 0;
        }
        
        .result-card {
          background: #111111;
          border: 1px solid #2a2a2a;
          border-radius: 0.5em;
          padding: 1.5em;
          transition: all 0.3s ease;
        }
        
        .result-card:hover {
          border-color: #00bfff;
          box-shadow: 0 10px 30px rgba(0, 191, 255, 0.1);
        }
        
        .result-card h4 {
          color: #00bfff;
          font-size: 0.875em;
          font-weight: 600;
          text-transform: uppercase;
          margin-bottom: 0.5em;
        }
        
        .result-value {
          color: #f8b500;
          font-size: 1.875em;
          font-weight: 700;
          margin-bottom: 0.25em;
        }
        
        .result-label {
          color: #b5b5b5;
          font-size: 0.875em;
        }
      `}</style>

      {/* Featured Image */}
      {study.featuredImage && (
        <section className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] bg-[#111111]">
          <Image
            src={study.featuredImage}
            alt={study.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-b from-transparent to-[#0a0a0a] opacity-60" />
        </section>
      )}

      {/* Case Study Content */}
      <article id="case-study-content" className="w-[90%] mx-auto bg-[#0a0a0a] py-8 sm:py-12 lg:py-16">
        <div className="mx-auto w-full max-w-[95%] sm:max-w-[90%] lg:max-w-[80%]">
          <div className="case-study-content">
            {/* Meta Information */}
            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-[#2a2a2a]">
              <div className="flex items-center gap-4">
                <span className="inline-block px-3 py-1 rounded bg-[#00bfff] text-[#0a0a0a] font-bold text-xs sm:text-sm">
                  {study.clientIndustry}
                </span>
                {formattedDate && (
                  <span className="text-[#b5b5b5] text-sm">{formattedDate}</span>
                )}
              </div>
            </div>

            {/* Client Info */}
            {study.clientName && (
              <div className="mb-8 p-4 rounded-lg border border-[#2a2a2a] bg-[#111111]">
                <h3 className="text-sm font-bold text-[#00bfff] mb-2">Klient</h3>
                <p className="text-[#d0dae8] text-lg font-semibold">{study.clientName}</p>
              </div>
            )}

            {/* Problem Section */}
            <section className="mb-8">
              <h2>Problem</h2>
              <div className="content-section" dangerouslySetInnerHTML={{ __html: study.problem }} />
            </section>

            {/* Solution Section */}
            <section className="mb-8">
              <h2>Nasze Rozwiązanie</h2>
              <div className="content-section" dangerouslySetInnerHTML={{ __html: study.solution }} />
            </section>

            {/* Results Section */}
            {parsedResults && (
              <section className="mb-8">
                <h2>Rezultaty</h2>
                <div className="results-grid">
                  {Object.entries(parsedResults).map(([key, value]) => (
                    <div key={key} className="result-card">
                      <h4>{key}</h4>
                      <div className="result-value">{String(value)}</div>
                      <div className="result-label">Osiągnięty wynik</div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Tags */}
            {study.tags && study.tags.length > 0 && (
              <div className="mt-8 pt-6 border-t border-[#2a2a2a]">
                <h4 className="text-sm font-bold text-[#00bfff] mb-3">Technologie:</h4>
                <div className="flex flex-wrap gap-2">
                  {study.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/case-studies?search=${encodeURIComponent(tag)}`}
                      className="px-3 py-1 rounded bg-[#111111] border border-[#2a2a2a] text-[#d0dae8] text-sm hover:border-[#00bfff] hover:text-[#00bfff] transition-colors"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Back to Case Studies Link */}
            <div className="mt-10 pt-6 border-t border-[#2a2a2a]">
              <Link
                href="/case-studies"
                className="inline-block px-4 py-2 rounded bg-[#111111] border border-[#2a2a2a] text-[#d0dae8] font-medium hover:border-[#00bfff] hover:text-[#00bfff] transition-colors text-sm sm:text-base"
              >
                ← Wróć do projektów
              </Link>
            </div>
          </div>
        </div>
      </article>

      {/* Related Case Studies */}
      {relatedStudies.length > 0 && (
        <section className="w-full bg-[#0a0a0a] py-8 sm:py-12 lg:py-16 border-t border-[#2a2a2a]">
          <div className="mx-auto w-full max-w-[95%] sm:max-w-[90%] lg:max-w-[85%]">
            <style>{`
              @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap');
              .related-section { font-family: 'JetBrains Mono', monospace; }
            `}</style>
            <div className="related-section">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#00bfff] mb-8">
                Powiązane projekty
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {relatedStudies.map((relatedStudy) => (
                  <Link
                    key={relatedStudy.id}
                    href={`/case-studies/${relatedStudy.slug}`}
                    className="group block rounded-lg border border-[#2a2a2a] bg-[#111111] p-4 sm:p-5 transition-all duration-300 hover:border-[#00bfff] hover:-translate-y-2"
                  >
                    {relatedStudy.featuredImage && (
                      <div className="relative mb-4 h-32 w-full overflow-hidden rounded">
                        <Image
                          src={relatedStudy.featuredImage}
                          alt={relatedStudy.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                    )}
                    <h3 className="font-bold text-[#d0dae8] group-hover:text-[#00bfff] transition-colors line-clamp-2">
                      {relatedStudy.title}
                    </h3>
                    {relatedStudy.clientName && (
                      <p className="mt-2 text-xs sm:text-sm text-[#b5b5b5]">
                        Klient: <span className="text-[#ffc59c]">{relatedStudy.clientName}</span>
                      </p>
                    )}
                    <p className="mt-1 text-xs sm:text-sm text-[#b5b5b5]">
                      {relatedStudy.clientIndustry}
                    </p>
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
