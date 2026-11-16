'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ScreenHeader, ChipGroup, Card, SeatDots, Button } from '@/components/ui';
import { formatVND } from '@/lib/format';
import type { Table } from '@/types/domain';

export default function TogetherScreen() {
  const [tables, setTables] = useState<Table[]>([]);
  const [purpose, setPurpose] = useState<string>('all');

  useEffect(() => {
    async function loadTables() {
      try {
        const url = purpose === 'all' ? '/api/tables' : `/api/tables?purpose=${encodeURIComponent(purpose)}`;
        const res = await fetch(url);
        if (res.ok) {
          setTables(await res.json());
        }
      } catch (err) {
        console.error(err);
      }
    }
    loadTables();
  }, [purpose]);

  return (
    <div className="bg-white min-h-screen text-ink pb-28">
      <ScreenHeader
        title="EAT TOGETHER. LEAVE WITH FRIENDS."
        variant="dark"
        subtitle="Hanoi Shared Tables"
        backHref="/"
        backLabel="Home"
      />

      <div className="p-5 space-y-6">
        {/* Happening now red card */}
        {tables.length > 0 && (
          <div className="bg-red text-white p-5 rounded-[16px] border border-divider-red shadow-lg space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold text-pink-soft uppercase tracking-wider">
              <span>HAPPENING NOW</span>
              <span>350 M FROM YOU</span>
            </div>
            <h3 className="font-anton text-2xl text-yellow">{tables[0].title}</h3>
            <p className="text-xs text-white/90 leading-relaxed">{tables[0].description}</p>
            <div className="flex items-center justify-between pt-2 border-t border-divider-red/50">
              <span className="text-xs text-pink-soft">{tables[0].starts_at} · Phở Bà Tâm</span>
              <Button
                variant="primary-yellow"
                size="md"
                href={`/tables/${tables[0].id}`}
              >
                Join this table
              </Button>
            </div>
          </div>
        )}

        {/* Purpose filter chips */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted uppercase tracking-wider">
            Filter by purpose
          </p>
          <ChipGroup
            theme="light"
            options={[
              { value: 'all', label: 'All' },
              { value: 'New friends', label: 'New friends' },
              { value: 'Work contacts', label: 'Work contacts' },
              { value: 'Language practice', label: 'Language practice' },
              { value: 'Travel buddies', label: 'Travel buddies' },
            ]}
            value={purpose}
            onChange={setPurpose}
          />
        </div>

        {/* Tables list */}
        <div className="space-y-4">
          <p className="text-xs font-semibold text-muted uppercase tracking-wider">
            {tables.length} Shared Tables Available
          </p>

          {tables.map((t) => (
            <Link key={t.id} href={`/tables/${t.id}`} className="block">
              <Card featured className="space-y-3 hover:border-red transition-all cursor-pointer">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-ink text-white">
                    {t.format}
                  </span>
                  <span className="text-xs font-bold text-red-text">
                    {formatVND(t.est_price)} / person
                  </span>
                </div>

                <div>
                  <h3 className="font-anton text-xl text-ink leading-tight">{t.title}</h3>
                  <p className="text-xs text-muted mt-0.5">{t.starts_at} · Phở Bà Tâm · 350m</p>
                </div>

                <p className="text-xs text-muted leading-relaxed line-clamp-2">
                  {t.description}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <SeatDots locals={2} travellers={2} free={2} />
                  <span className="text-xs font-bold text-ink">2 seats free</span>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* Bottom Actions */}
        <div className="space-y-3 pt-2">
          <Button variant="primary-red" size="lg" fullWidth href="/tables/new">
            Open a seat at your own table
          </Button>

          <Card className="flex items-center justify-between border-dashed p-4">
            <div>
              <p className="font-bold text-sm text-ink">Prefer one person to a full table?</p>
              <p className="text-xs text-muted mt-0.5">Eat with one local or hire a guide</p>
            </div>
            <Link href="/company" className="text-xs font-bold text-red-text hover:underline shrink-0">
              View offers →
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}
