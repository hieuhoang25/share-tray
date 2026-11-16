'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { RefreshCw } from 'lucide-react';

const SEED_USERS = [
  { id: 'user-linh', label: 'Linh (Local)', role: 'local' },
  { id: 'user-kenji', label: 'Kenji (Traveller)', role: 'traveller' },
  { id: 'user-thao', label: 'Thảo (Host)', role: 'local' },
  { id: 'user-minhanh', label: 'Minh Anh (Volunteer)', role: 'guide' },
  { id: 'user-admin', label: 'Admin (Moderator)', role: 'admin' },
];

export function DevBar() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<string>('user-linh');
  const [isResetting, setIsResetting] = useState(false);

  const handleSwitchUser = async (userId: string) => {
    setCurrentUser(userId);
    try {
      await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });
      router.refresh();
    } catch (err) {
      console.error(err);
    }
  };

  const handleResetDemo = async () => {
    setIsResetting(true);
    try {
      await fetch('/api/dev/reset', { method: 'POST' });
      alert('Mock data has been successfully reset to initial seed!');
      router.refresh();
    } catch (err) {
      console.error(err);
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <aside
      aria-label="Developer Bar"
      className="bg-black/95 text-white border-b border-yellow/30 px-3 py-1.5 text-xs flex flex-wrap items-center justify-between gap-2 z-50 w-full"
    >
      <div className="flex items-center gap-1.5 overflow-x-auto">
        <span className="font-anton text-yellow tracking-wider shrink-0">DEV BAR:</span>
        {SEED_USERS.map((u) => (
          <button
            key={u.id}
            type="button"
            onClick={() => handleSwitchUser(u.id)}
            className={`px-2 py-0.5 rounded text-[10px] font-bold shrink-0 transition-colors ${
              currentUser === u.id
                ? 'bg-yellow text-ink'
                : 'bg-ink-2 text-on-dark-2 hover:text-white'
            }`}
          >
            {u.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={handleResetDemo}
          disabled={isResetting}
          className="flex items-center gap-1 bg-red text-white font-bold text-[10px] px-2 py-0.5 rounded hover:bg-[#A31F17] disabled:opacity-50"
        >
          <RefreshCw className={`w-3 h-3 ${isResetting ? 'animate-spin' : ''}`} />
          Reset Demo
        </button>
      </div>
    </aside>
  );
}
