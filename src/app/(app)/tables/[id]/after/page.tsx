'use client';

import React, { useState, useEffect, use } from 'react';
import { ScreenHeader, Card, DarkCard, Avatar, Button } from '@/components/ui';

const PEOPLE = [
  { id: 'user-thao', name: 'Thảo', role: 'local' as const, meal: 'Bún chả · 16 Nov' },
  { id: 'user-kenji', name: 'Kenji', role: 'traveller' as const, meal: 'Bún chả · 16 Nov' },
  { id: 'user-linh', name: 'Linh', role: 'local' as const, meal: 'Phở · 12 Nov' },
];

export default function TableAfterScreen({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [keptStatus, setKeptStatus] = useState<Record<string, boolean>>({});
  const [kudosGiven, setKudosGiven] = useState<string | null>(null);

  useEffect(() => {
    async function loadConnections() {
      try {
        const res = await fetch(`/api/tables/${id}/connections`);
        if (res.ok) {
          const data = await res.json();
          const initial: Record<string, boolean> = {};
          (data.mutuals || []).forEach((userId: string) => {
            initial[userId] = true;
          });
          setKeptStatus(initial);
        }
      } catch (err) {
        console.error(err);
      }
    }
    loadConnections();
  }, [id]);

  const handleToggleKeep = async (userId: string) => {
    const next = !keptStatus[userId];
    setKeptStatus((prev) => ({ ...prev, [userId]: next }));

    if (next) {
      try {
        await fetch(`/api/tables/${id}/connections`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ to_user: userId }),
        });
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleGiveKudo = async (kind: string) => {
    setKudosGiven(kind);
    try {
      await fetch(`/api/tables/${id}/kudos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ host_id: 'user-thao', kind }),
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white min-h-screen text-ink pb-28">
      <ScreenHeader
        title="YOU ATE WITH FIVE PEOPLE."
        variant="red"
        subtitle="Nobody sees your choice unless they chose you too."
        backHref="/together"
        backLabel="Together"
      />

      <div className="p-5 space-y-6">
        {/* PRIVACY PROMISE */}
        <div className="p-3 bg-gray-bg rounded-[10px] text-xs text-muted leading-relaxed">
          Contacts are only revealed if both people choose each other. No awkward rejections, ever.
        </div>

        {/* DINING COMPANIONS LIST */}
        <div className="space-y-3">
          <h3 className="font-anton text-xl text-ink">KEEP IN TOUCH</h3>
          {PEOPLE.map((p) => {
            const isKept = keptStatus[p.id];
            return (
              <Card key={p.id} className="flex items-center justify-between p-3.5">
                <div className="flex items-center gap-3">
                  <Avatar name={p.name} role={p.role} size="md" />
                  <div>
                    <span className="font-bold text-sm text-ink">{p.name}</span>
                    <span className="text-xs text-muted block">{p.meal}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleToggleKeep(p.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    isKept
                      ? 'bg-green text-white shadow-xs'
                      : 'bg-ink text-white hover:bg-ink-2'
                  }`}
                >
                  {isKept ? '✓ Kept' : 'Keep in touch'}
                </button>
              </Card>
            );
          })}
        </div>

        {/* HOST KUDOS */}
        <div className="space-y-3">
          <h3 className="font-anton text-xl text-ink">COMPLIMENT YOUR HOST</h3>
          <p className="text-xs text-muted">Leave quick anonymous gratitude for Thảo:</p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {[
              'Great storyteller',
              'Good listener',
              'Knows the food',
              'Made me laugh',
            ].map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => handleGiveKudo(k)}
                className={`p-2.5 rounded-[10px] border font-semibold text-left transition-all ${
                  kudosGiven === k
                    ? 'bg-yellow text-ink border-yellow font-bold shadow-xs'
                    : 'bg-white text-muted border-border hover:border-ink'
                }`}
              >
                {kudosGiven === k ? `★ ${k}` : k}
              </button>
            ))}
          </div>
        </div>

        {/* YOUR TABLE NETWORK */}
        <DarkCard className="space-y-2">
          <span className="font-anton text-sm text-yellow block">YOUR TABLE NETWORK</span>
          <div className="grid grid-cols-3 gap-2 text-center pt-2 border-t border-line-dark">
            <div>
              <span className="font-anton text-2xl text-white block">4</span>
              <span className="text-[10px] text-on-dark-2 uppercase font-semibold">Connections</span>
            </div>
            <div>
              <span className="font-anton text-2xl text-white block">3</span>
              <span className="text-[10px] text-on-dark-2 uppercase font-semibold">Countries</span>
            </div>
            <div>
              <span className="font-anton text-2xl text-white block">2</span>
              <span className="text-[10px] text-on-dark-2 uppercase font-semibold">Tables</span>
            </div>
          </div>
        </DarkCard>

        {/* CTA */}
        <Button variant="primary-red" size="lg" fullWidth href="/together">
          Find my next table →
        </Button>
      </div>
    </div>
  );
}
