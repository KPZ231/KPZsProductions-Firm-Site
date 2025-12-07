'use client'

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

interface BlogPost {
  id?: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  category: string;
  tags: string[];
  metaTitle: string;
  metaDescription: string;
  status: string;
  publishedAt: string | null;
}

const defaultPost: BlogPost = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  featuredImage: '',
  category: 'tech',
  tags: [],
  metaTitle: '',
  metaDescription: '',
  status: 'DRAFT',
  publishedAt: null,
};

export default function BlogEditPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const isNew = id === 'new';

  const [post, setPost] = useState<BlogPost>(defaultPost);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    if (!isNew) {
      fetchPost();
    }
  }, [id, isNew]);

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/admin/blog-posts/${id}`);
      const data = await response.json();
      if (data.success) {
        setPost(data.data);
      } else {
        setError('Nie udało się pobrać posta');
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
    setPost((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !post.tags.includes(tagInput.trim())) {
      setPost((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setPost((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  const handleSave = async () => {
    if (!post.title || !post.slug || !post.content) {
      setError('Uzupełnij wszystkie wymagane pola');
      return;
    }

    setSaving(true);
    setError('');

    try {
      const method = isNew ? 'POST' : 'PUT';
      const url = isNew ? '/api/admin/blog-posts' : `/api/admin/blog-posts/${id}`;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post),
      });

      if (response.ok) {
        router.push('/admin/blog');
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
          {isNew ? 'Nowy Post Blog' : 'Edytuj Post'}
        </h2>
        <Link
          href="/admin/blog"
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
            value={post.title}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-[#0d0d0d] border border-[#2a2a2a] rounded text-[#d0dae8] focus:outline-none focus:border-[#00bfff]"
            placeholder="Tytuł posta..."
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block text-[#ffc59c] font-semibold mb-2">Slug *</label>
          <input
            type="text"
            name="slug"
            value={post.slug}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-[#0d0d0d] border border-[#2a2a2a] rounded text-[#d0dae8] focus:outline-none focus:border-[#00bfff]"
            placeholder="post-slug"
          />
        </div>

        {/* Excerpt */}
        <div>
          <label className="block text-[#ffc59c] font-semibold mb-2">Streszczenie</label>
          <textarea
            name="excerpt"
            value={post.excerpt}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-[#0d0d0d] border border-[#2a2a2a] rounded text-[#d0dae8] focus:outline-none focus:border-[#00bfff] h-20"
            placeholder="Krótkie streszczenie posta..."
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-[#ffc59c] font-semibold mb-2">Treść *</label>
          <textarea
            name="content"
            value={post.content}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-[#0d0d0d] border border-[#2a2a2a] rounded text-[#d0dae8] focus:outline-none focus:border-[#00bfff] h-48 font-mono text-sm"
            placeholder="Treść posta (Markdown)..."
          />
        </div>

        {/* Featured Image */}
        <div>
          <label className="block text-[#ffc59c] font-semibold mb-2">URL obrazu głównego</label>
          <input
            type="text"
            name="featuredImage"
            value={post.featuredImage}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-[#0d0d0d] border border-[#2a2a2a] rounded text-[#d0dae8] focus:outline-none focus:border-[#00bfff]"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-[#ffc59c] font-semibold mb-2">Kategoria</label>
          <select
            name="category"
            value={post.category}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-[#0d0d0d] border border-[#2a2a2a] rounded text-[#d0dae8] focus:outline-none focus:border-[#00bfff]"
          >
            <option value="tech">Tech</option>
            <option value="business">Business</option>
            <option value="design">Design</option>
          </select>
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
            {post.tags.map((tag) => (
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
            value={post.metaTitle}
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
            value={post.metaDescription}
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
            value={post.status}
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
            href="/admin/blog"
            className="flex-1 px-6 py-2 bg-[#1a1a1a] text-[#d5d5d5] border border-[#3a3a3a] rounded text-center hover:bg-[#2a2a2a] transition-colors"
          >
            Anuluj
          </Link>
        </div>
      </div>
    </div>
  );
}
