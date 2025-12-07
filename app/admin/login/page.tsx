'use client'

import { signIn } from 'next-auth/react';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError('Nieprawidłowy email lub hasło');
      setIsLoading(false);
      return;
    }

    if (result?.ok) {
      router.push('/admin');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="bg-[#111111] border border-[#2a2a2a] rounded-lg shadow-2xl p-8">
          <h1 className="text-3xl font-bold text-[#ffc59c] mb-2 text-center">
            Panel Admina
          </h1>
          <p className="text-[#d0dae8] text-center text-sm mb-8">
            Zaloguj się, aby zarządzać zawartością
          </p>

          {error && (
            <div className="mb-6 p-4 bg-red-900/20 border border-red-500/50 rounded text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-[#d0dae8] text-sm font-medium mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 bg-[#0d0d0d] border border-[#2a2a2a] rounded text-[#d0dae8] placeholder-[#666666] focus:outline-none focus:border-[#00bfff] transition-colors"
                placeholder="admin@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-[#d0dae8] text-sm font-medium mb-2">
                Hasło
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 bg-[#0d0d0d] border border-[#2a2a2a] rounded text-[#d0dae8] placeholder-[#666666] focus:outline-none focus:border-[#00bfff] transition-colors"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-6 bg-[#f8b500] hover:bg-[#ffc800] disabled:bg-[#666666] text-[#0a0a0a] font-semibold py-2 px-4 rounded transition-colors duration-200"
            >
              {isLoading ? 'Logowanie...' : 'Zaloguj się'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
