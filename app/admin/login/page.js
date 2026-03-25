'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/lib/auth';

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get('email');
    const password = form.get('password');
    const result = authService.login(email, password);

    if (!result.ok) {
      setError(result.message);
      return;
    }

    router.push('/admin/dashboard');
  };

  return (
    <section className="section-shell flex min-h-[70vh] items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6">
        <h1 className="text-3xl font-semibold">Login Admin</h1>
        <p className="text-sm text-white/60">Demo: admin@norvingarcia.com / Admin123*</p>
        <input name="email" type="email" placeholder="Email" required className="w-full rounded-lg bg-black/30 p-3" />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          className="w-full rounded-lg bg-black/30 p-3"
        />
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button className="w-full rounded-full bg-luxury-gold px-6 py-3 font-semibold text-black">Entrar</button>
      </form>
    </section>
  );
}
