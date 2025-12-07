'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface CaseStudy {
  id: number;
  title: string;
  slug: string;
  clientIndustry: string;
  status: string;
  publishedAt: string | null;
  createdAt: string;
}

export default function CaseStudiesPage() {
  const [studies, setStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    fetchStudies();
  }, [search, statusFilter]);

  const fetchStudies = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (statusFilter) params.append('status', statusFilter);

      const response = await fetch(`/api/admin/case-studies?${params}`);
      const data = await response.json();

      if (data.success) {
        setStudies(data.data);
      } else {
        setError('Nie udało się pobrać case studies');
      }
    } catch (err) {
      setError('Błąd połączenia');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Czy na pewno chcesz usunąć to case study?')) return;

    try {
      const response = await fetch(`/api/admin/case-studies/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setStudies(studies.filter((s) => s.id !== id));
      } else {
        setError('Nie udało się usunąć case study');
      }
    } catch (err) {
      setError('Błąd połączenia');
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-3xl font-bold text-[#ffc59c]">Zarządzanie Case Studies</h2>
        <Link
          href="/admin/case-studies/new"
          className="px-6 py-2 bg-[#f8b500] hover:bg-[#ffc800] text-[#0a0a0a] font-semibold rounded transition-colors"
        >
          + Nowe Case Study
        </Link>
      </div>

      {error && (
        <div className="p-4 bg-red-900/20 border border-red-500/50 rounded text-red-400">
          {error}
        </div>
      )}

      {/* Filters */}
      <div className="bg-[#111111] border border-[#2a2a2a] rounded-lg p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Szukaj po tytule lub branży..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 bg-[#0d0d0d] border border-[#2a2a2a] rounded text-[#d0dae8] placeholder-[#666666] focus:outline-none focus:border-[#00bfff]"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-[#0d0d0d] border border-[#2a2a2a] rounded text-[#d0dae8] focus:outline-none focus:border-[#00bfff]"
          >
            <option value="">Wszystkie statusy</option>
            <option value="DRAFT">Robocze</option>
            <option value="PUBLISHED">Opublikowane</option>
            <option value="ARCHIVED">Zarchiwizowane</option>
          </select>
        </div>
      </div>

      {/* Studies Table */}
      {loading ? (
        <div className="text-center py-8 text-[#d0dae8]">Ładowanie...</div>
      ) : studies.length === 0 ? (
        <div className="text-center py-8 text-[#d0dae8]">Brak case studies do wyświetlenia</div>
      ) : (
        <div className="bg-[#111111] border border-[#2a2a2a] rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#0d0d0d] border-b border-[#2a2a2a]">
              <tr>
                <th className="px-6 py-3 text-left text-[#ffc59c] font-semibold">Tytuł</th>
                <th className="px-6 py-3 text-left text-[#ffc59c] font-semibold">Branża</th>
                <th className="px-6 py-3 text-left text-[#ffc59c] font-semibold">Status</th>
                <th className="px-6 py-3 text-left text-[#ffc59c] font-semibold">Data</th>
                <th className="px-6 py-3 text-left text-[#ffc59c] font-semibold">Akcje</th>
              </tr>
            </thead>
            <tbody>
              {studies.map((study) => (
                <tr
                  key={study.id}
                  className="border-b border-[#2a2a2a] hover:bg-[#0d0d0d] transition-colors"
                >
                  <td className="px-6 py-4 text-[#d0dae8]">{study.title}</td>
                  <td className="px-6 py-4 text-[#d0dae8]">{study.clientIndustry}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded text-sm font-semibold ${
                        study.status === 'PUBLISHED'
                          ? 'bg-green-900/30 text-green-400'
                          : study.status === 'DRAFT'
                          ? 'bg-yellow-900/30 text-yellow-400'
                          : 'bg-gray-900/30 text-gray-400'
                      }`}
                    >
                      {study.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[#d0dae8] text-sm">
                    {new Date(study.createdAt).toLocaleDateString('pl-PL')}
                  </td>
                  <td className="px-6 py-4 space-x-2">
                    <Link
                      href={`/admin/case-studies/${study.id}`}
                      className="px-3 py-1 text-sm bg-[#1a1a1a] text-[#00bfff] border border-[#3a3a3a] rounded hover:border-[#00bfff] transition-colors"
                    >
                      Edytuj
                    </Link>
                    <button
                      onClick={() => handleDelete(study.id)}
                      className="px-3 py-1 text-sm bg-red-900/20 text-red-400 border border-red-500/50 rounded hover:bg-red-900/40 transition-colors"
                    >
                      Usuń
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
