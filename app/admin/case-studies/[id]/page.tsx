'use client'

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

interface CaseStudy {
  id?: number;
  title: string;
  slug: string;
  clientName: string;
  clientIndustry: string;
  problem: string;
  solution: string;
  results: Record<string, string>;
  featuredImage: string;
  tags: string[];
  metaTitle: string;
  metaDescription: string;
  status: string;
  publishedAt: string | null;
}

const defaultStudy: CaseStudy = {
  title: '',
  slug: '',
  clientName: '',
  clientIndustry: 'ecommerce',
  problem: '',
  solution: '',
  results: {},
  featuredImage: '',
  tags: [],
  metaTitle: '',
  metaDescription: '',
  status: 'DRAFT',
  publishedAt: null,
};

export default function CaseStudyEditPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const isNew = id === 'new';

  const [study, setStudy] = useState<CaseStudy>(defaultStudy);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [resultKey, setResultKey] = useState('');
  const [resultValue, setResultValue] = useState('');

  useEffect(() => {
    if (!isNew) {
      fetchStudy();
    }
  }, [id, isNew]);

  const fetchStudy = async () => {
    try {
      const response = await fetch(`/api/admin/case-studies/${id}`);
      const data = await response.json();
      if (data.success) {
        setStudy(data.data);
      } else {
        setError('Nie udało się pobrać case study');
      }
    } catch (err) {
      setError('Błąd połączenia');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setStudy((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !study.tags.includes(tagInput.trim())) {
      setStudy((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setStudy((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  const handleAddResult = () => {
    if (resultKey.trim() && resultValue.trim()) {
      setStudy((prev) => ({
        ...prev,
        results: {
          ...prev.results,
          [resultKey.trim()]: resultValue.trim(),
        },
      }));
      setResultKey('');
      setResultValue('');
    }
  };

  const handleRemoveResult = (key: string) => {
    setStudy((prev) => {
      const newResults = { ...prev.results };
      delete newResults[key];
      return {
        ...prev,
        results: newResults,
      };
    });
  };

  const handleSave = async () => {
    if (!study.title || !study.slug || !study.problem || !study.solution) {
      setError('Uzupełnij wszystkie wymagane pola');
      return;
    }

    setSaving(true);
    setError('');

    try {
      const method = isNew ? 'POST' : 'PUT';
      const url = isNew ? '/api/admin/case-studies' : `/api/admin/case-studies/${id}`;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(study),
      });

      if (response.ok) {
        router.push('/admin/case-studies');
      } else {
        const data = await response.json();
        setError(data.error || 'Błąd zapisu');
      }
    } catch (err) {
      setError('Błąd połączenia');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8 text-[#d0dae8]">Ładowanie...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-[#ffc59c]">
          {isNew ? 'Nowe Case Study' : 'Edytuj Case Study'}
        </h2>
        <Link
          href="/admin/case-studies"
          className="px-4 py-2 text-[#d0dae8] hover:text-[#ffc59c] transition-colors"
        >
          ← Wróć
        </Link>
      </div>

      {error && (
        <div className="p-4 bg-red-900/20 border border-red-500/50 rounded text-red-400">
          {error}
        </div>
      )}

      <div className="bg-[#111111] border border-[#2a2a2a] rounded-lg p-6 space-y-6">
        {/* Tytuł */}
        <div>
          <label className="block text-[#ffc59c] font-semibold mb-2">Tytuł *</label>
          <input
            type="text"
            name="title"
            value={study.title}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-[#0d0d0d] border border-[#2a2a2a] rounded text-[#d0dae8] focus:outline-none focus:border-[#00bfff]"
            placeholder="Tytuł case study..."
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block text-[#ffc59c] font-semibold mb-2">Slug *</label>
          <input
            type="text"
            name="slug"
            value={study.slug}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-[#0d0d0d] border border-[#2a2a2a] rounded text-[#d0dae8] focus:outline-none focus:border-[#00bfff]"
            placeholder="case-study-slug"
          />
        </div>

        {/* Client Name */}
        <div>
          <label className="block text-[#ffc59c] font-semibold mb-2">Nazwa Klienta</label>
          <input
            type="text"
            name="clientName"
            value={study.clientName}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-[#0d0d0d] border border-[#2a2a2a] rounded text-[#d0dae8] focus:outline-none focus:border-[#00bfff]"
            placeholder="np. Klient z branży X"
          />
        </div>

        {/* Client Industry */}
        <div>
          <label className="block text-[#ffc59c] font-semibold mb-2">Branża Klienta</label>
          <select
            name="clientIndustry"
            value={study.clientIndustry}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-[#0d0d0d] border border-[#2a2a2a] rounded text-[#d0dae8] focus:outline-none focus:border-[#00bfff]"
          >
            <option value="ecommerce">E-commerce</option>
            <option value="saas">SaaS</option>
            <option value="med">Medycyna</option>
          </select>
        </div>

        {/* Problem */}
        <div>
          <label className="block text-[#ffc59c] font-semibold mb-2">Problem *</label>
          <textarea
            name="problem"
            value={study.problem}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-[#0d0d0d] border border-[#2a2a2a] rounded text-[#d0dae8] focus:outline-none focus:border-[#00bfff] h-24"
            placeholder="Opis problemu klienta..."
          />
        </div>

        {/* Solution */}
        <div>
          <label className="block text-[#ffc59c] font-semibold mb-2">Rozwiązanie *</label>
          <textarea
            name="solution"
            value={study.solution}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-[#0d0d0d] border border-[#2a2a2a] rounded text-[#d0dae8] focus:outline-none focus:border-[#00bfff] h-24"
            placeholder="Jak rozwiązaliśmy problem..."
          />
        </div>

        {/* Results */}
        <div>
          <label className="block text-[#ffc59c] font-semibold mb-2">Wyniki</label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={resultKey}
              onChange={(e) => setResultKey(e.target.value)}
              placeholder="np. Revenue"
              className="flex-1 px-4 py-2 bg-[#0d0d0d] border border-[#2a2a2a] rounded text-[#d0dae8] focus:outline-none focus:border-[#00bfff]"
            />
            <input
              type="text"
              value={resultValue}
              onChange={(e) => setResultValue(e.target.value)}
              placeholder="np. +250%"
              className="flex-1 px-4 py-2 bg-[#0d0d0d] border border-[#2a2a2a] rounded text-[#d0dae8] focus:outline-none focus:border-[#00bfff]"
            />
            <button
              onClick={handleAddResult}
              className="px-4 py-2 bg-[#1a1a1a] text-[#00bfff] border border-[#3a3a3a] rounded hover:border-[#00bfff] transition-colors"
            >
              Dodaj
            </button>
          </div>
          <div className="space-y-2">
            {Object.entries(study.results).map(([key, value]) => (
              <div
                key={key}
                className="flex justify-between items-center px-3 py-2 bg-[#0d0d0d] border border-[#2a2a2a] rounded"
              >
                <span className="text-[#d0dae8]">
                  <span className="font-semibold text-[#ffc59c]">{key}:</span> {value}
                </span>
                <button
                  onClick={() => handleRemoveResult(key)}
                  className="text-red-400 hover:text-red-300"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Image */}
        <div>
          <label className="block text-[#ffc59c] font-semibold mb-2">URL obrazu głównego</label>
          <input
            type="text"
            name="featuredImage"
            value={study.featuredImage}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-[#0d0d0d] border border-[#2a2a2a] rounded text-[#d0dae8] focus:outline-none focus:border-[#00bfff]"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block text-[#ffc59c] font-semibold mb-2">Tagi</label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
              className="flex-1 px-4 py-2 bg-[#0d0d0d] border border-[#2a2a2a] rounded text-[#d0dae8] focus:outline-none focus:border-[#00bfff]"
              placeholder="Dodaj tag..."
            />
            <button
              onClick={handleAddTag}
              className="px-4 py-2 bg-[#1a1a1a] text-[#00bfff] border border-[#3a3a3a] rounded hover:border-[#00bfff] transition-colors"
            >
              Dodaj
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {study.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-[#1a1a1a] text-[#d0dae8] border border-[#3a3a3a] rounded text-sm flex items-center gap-2"
              >
                {tag}
                <button
                  onClick={() => handleRemoveTag(tag)}
                  className="text-red-400 hover:text-red-300"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Meta Title */}
        <div>
          <label className="block text-[#ffc59c] font-semibold mb-2">Meta Title (SEO)</label>
          <input
            type="text"
            name="metaTitle"
            value={study.metaTitle}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-[#0d0d0d] border border-[#2a2a2a] rounded text-[#d0dae8] focus:outline-none focus:border-[#00bfff]"
            placeholder="Tytuł do wyszukiwarek..."
          />
        </div>

        {/* Meta Description */}
        <div>
          <label className="block text-[#ffc59c] font-semibold mb-2">
            Meta Description (SEO)
          </label>
          <textarea
            name="metaDescription"
            value={study.metaDescription}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-[#0d0d0d] border border-[#2a2a2a] rounded text-[#d0dae8] focus:outline-none focus:border-[#00bfff] h-16"
            placeholder="Opis do wyszukiwarek..."
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-[#ffc59c] font-semibold mb-2">Status</label>
          <select
            name="status"
            value={study.status}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-[#0d0d0d] border border-[#2a2a2a] rounded text-[#d0dae8] focus:outline-none focus:border-[#00bfff]"
          >
            <option value="DRAFT">Robocze</option>
            <option value="PUBLISHED">Opublikowane</option>
            <option value="ARCHIVED">Zarchiwizowane</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-6 border-t border-[#2a2a2a]">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 px-6 py-2 bg-[#f8b500] hover:bg-[#ffc800] disabled:bg-[#666666] text-[#0a0a0a] font-semibold rounded transition-colors"
          >
            {saving ? 'Zapisywanie...' : 'Zapisz'}
          </button>
          <Link
            href="/admin/case-studies"
            className="flex-1 px-6 py-2 bg-[#1a1a1a] text-[#d5d5d5] border border-[#3a3a3a] rounded text-center hover:bg-[#2a2a2a] transition-colors"
          >
            Anuluj
          </Link>
        </div>
      </div>
    </div>
  );
}
