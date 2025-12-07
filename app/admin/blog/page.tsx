'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  status: string;
  category: string;
  publishedAt: string | null;
  createdAt: string;
}

export default function BlogManagementPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchPosts();
  }, [search, statusFilter]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (statusFilter) params.append('status', statusFilter);

      const response = await fetch(`/api/admin/blog-posts?${params}`);
      const data = await response.json();

      if (data.success) {
        setPosts(data.data);
      } else {
        setError('Nie udało się pobrać postów');
      }
    } catch (err) {
      setError('Błąd połączenia');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Czy na pewno chcesz usunąć ten post?')) return;

    try {
      const response = await fetch(`/api/admin/blog-posts/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setPosts(posts.filter((p) => p.id !== id));
      } else {
        setError('Nie udało się usunąć posta');
      }
    } catch (err) {
      setError('Błąd połączenia');
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-3xl font-bold text-[#ffc59c]">Zarządzanie Postami Blog</h2>
        <Link
          href="/admin/blog/new"
          className="px-6 py-2 bg-[#f8b500] hover:bg-[#ffc800] text-[#0a0a0a] font-semibold rounded transition-colors"
        >
          + Nowy Post
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
            placeholder="Szukaj po tytule..."
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

      {/* Posts Table */}
      {loading ? (
        <div className="text-center py-8 text-[#d0dae8]">Ładowanie...</div>
      ) : posts.length === 0 ? (
        <div className="text-center py-8 text-[#d0dae8]">Brak postów do wyświetlenia</div>
      ) : (
        <div className="bg-[#111111] border border-[#2a2a2a] rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#0d0d0d] border-b border-[#2a2a2a]">
              <tr>
                <th className="px-6 py-3 text-left text-[#ffc59c] font-semibold">Tytuł</th>
                <th className="px-6 py-3 text-left text-[#ffc59c] font-semibold">Kategoria</th>
                <th className="px-6 py-3 text-left text-[#ffc59c] font-semibold">Status</th>
                <th className="px-6 py-3 text-left text-[#ffc59c] font-semibold">Data</th>
                <th className="px-6 py-3 text-left text-[#ffc59c] font-semibold">Akcje</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr
                  key={post.id}
                  className="border-b border-[#2a2a2a] hover:bg-[#0d0d0d] transition-colors"
                >
                  <td className="px-6 py-4 text-[#d0dae8]">{post.title}</td>
                  <td className="px-6 py-4 text-[#d0dae8]">{post.category}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded text-sm font-semibold ${
                        post.status === 'PUBLISHED'
                          ? 'bg-green-900/30 text-green-400'
                          : post.status === 'DRAFT'
                          ? 'bg-yellow-900/30 text-yellow-400'
                          : 'bg-gray-900/30 text-gray-400'
                      }`}
                    >
                      {post.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[#d0dae8] text-sm">
                    {new Date(post.createdAt).toLocaleDateString('pl-PL')}
                  </td>
                  <td className="px-6 py-4 space-x-2">
                    <Link
                      href={`/admin/blog/${post.id}`}
                      className="px-3 py-1 text-sm bg-[#1a1a1a] text-[#00bfff] border border-[#3a3a3a] rounded hover:border-[#00bfff] transition-colors"
                    >
                      Edytuj
                    </Link>
                    <button
                      onClick={() => handleDelete(post.id)}
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
