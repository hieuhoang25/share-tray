'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ScreenHeader, Avatar, Button } from '@/components/ui';

const DEMO_USERS = [
  {
    id: 'user-linh',
    name: 'Linh',
    role: 'local' as const,
    desc: 'Local architect in Hanoi Old Quarter, loves 18-hour broth',
  },
  {
    id: 'user-kenji',
    name: 'Kenji',
    role: 'traveller' as const,
    desc: 'Solo traveller from Tokyo with food rules: no pork, no peanut',
  },
  {
    id: 'user-thao',
    name: 'Thảo',
    role: 'local' as const,
    desc: 'Coffee roaster & verified table host (Women only tables)',
  },
  {
    id: 'user-minhanh',
    name: 'Minh Anh',
    role: 'guide' as const,
    desc: 'Licensed guide & emergency call volunteer',
  },
  {
    id: 'user-admin',
    name: 'Admin',
    role: 'admin' as const,
    desc: 'Platform moderator with access to /admin dashboard',
  },
];

export default function LoginScreen() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string>('user-linh');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: selectedId }),
      });

      if (res.ok) {
        if (selectedId === 'user-admin') {
          router.push('/admin');
        } else {
          router.push('/profile');
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-ink min-h-screen text-white pb-24">
      <ScreenHeader
        title="SIGN IN"
        variant="dark"
        subtitle="Select a demo profile"
        backHref="/"
        backLabel="Home"
      />

      <div className="p-5 space-y-6">
        <p className="text-xs text-on-dark-2 leading-relaxed">
          MVP uses mock authentication with signed httpOnly cookies. Choose one of our verified seed community members to test their role.
        </p>

        <div className="space-y-3">
          {DEMO_USERS.map((u) => {
            const active = selectedId === u.id;
            return (
              <div
                key={u.id}
                onClick={() => setSelectedId(u.id)}
                className={`p-4 rounded-[14px] border cursor-pointer transition-all flex items-center gap-3.5 ${
                  active
                    ? 'bg-ink-2 border-yellow shadow-md ring-1 ring-yellow'
                    : 'bg-ink-2/60 border-line-dark hover:border-muted-2'
                }`}
              >
                <Avatar name={u.name} role={u.role} size="md" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-base text-white">{u.name}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-black/40 text-yellow border border-yellow/30">
                      {u.role}
                    </span>
                  </div>
                  <p className="text-xs text-on-dark-2 mt-0.5 leading-normal">{u.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        <Button
          variant="primary-yellow"
          size="lg"
          fullWidth
          disabled={loading}
          onClick={handleSignIn}
        >
          {loading ? 'Signing in...' : 'Sign in with selected profile'}
        </Button>
      </div>
    </div>
  );
}
