'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { ScreenHeader, Card, DarkCard, Button } from '@/components/ui';
import { formatUSD } from '@/lib/format';
import type { Day, DayStop, Profile } from '@/types/domain';

export default function DayScreen({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [data, setData] = useState<{
    day: Day;
    stops: DayStop[];
    otherDays: Day[];
    author: Profile | null;
  } | null>(null);

  useEffect(() => {
    async function loadDay() {
      try {
        const res = await fetch(`/api/days/${slug}`);
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (err) {
        console.error(err);
      }
    }
    loadDay();
  }, [slug]);

  if (!data) {
    return (
      <div className="bg-white min-h-screen text-ink p-5">
        <p className="text-sm text-muted">Loading itinerary...</p>
      </div>
    );
  }

  const { day, stops, otherDays, author } = data;

  return (
    <div className="bg-white min-h-screen text-ink pb-28">
      <ScreenHeader
        title={day.title}
        variant="light"
        subtitle="BORROW A LOCAL'S DAY"
        backHref="/"
        backLabel="Home"
      />

      <div className="p-5 space-y-6">
        {/* Author intro */}
        <div className="space-y-1">
          <p className="text-sm text-muted leading-relaxed">{day.intro_en}</p>
          <p className="text-xs font-bold text-red-text">
            Curated by {author?.display_name || 'Linh'} · Resident in {day.area}
          </p>
        </div>

        {/* 3-stat dark bar */}
        <DarkCard className="grid grid-cols-3 gap-2 text-center py-4">
          <div>
            <span className="font-anton text-2xl text-yellow block">{stops.length || 3}</span>
            <span className="text-[11px] text-on-dark-2 uppercase font-semibold">Stops</span>
          </div>
          <div className="border-x border-line-dark">
            <span className="font-anton text-2xl text-yellow block">{day.walk_km}</span>
            <span className="text-[11px] text-on-dark-2 uppercase font-semibold">Km walk</span>
          </div>
          <div>
            <span className="font-anton text-2xl text-yellow block">140k₫</span>
            <span className="text-[11px] text-on-dark-2 uppercase font-semibold">
              {formatUSD(140000)}
            </span>
          </div>
        </DarkCard>

        {/* Timeline stops */}
        <div className="space-y-4">
          <h2 className="font-anton text-xl text-ink">TIMELINE OF STOPS</h2>
          <div className="space-y-4 relative before:absolute before:inset-0 before:left-3 before:w-0.5 before:bg-border">
            {stops.map((stop, idx) => (
              <div key={stop.id || idx} className="flex items-start gap-4 relative">
                <span className="w-6 h-6 rounded-full bg-red text-white font-anton text-xs flex items-center justify-center shrink-0 z-10">
                  {idx + 1}
                </span>
                <Card className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-anton text-lg text-ink">{stop.time}</span>
                    <span className="bg-red text-yellow text-xs font-bold px-2 py-0.5 rounded">
                      {stop.dish_label}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-ink">Phở Bà Tâm</h4>
                  <p className="text-xs text-muted italic">&ldquo;{stop.memory_en}&rdquo;</p>
                  <div className="flex items-center justify-between text-xs pt-1 border-t border-border">
                    <span className="font-bold text-ink">45,000₫</span>
                    <span className="text-muted font-semibold uppercase">Curious level</span>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>

        <Button variant="primary-red" size="lg" fullWidth href="/places/pho-ba-tam">
          Start Linh&apos;s day
        </Button>

        {/* Other days you can borrow */}
        {otherDays.length > 0 && (
          <div className="space-y-3 pt-4 border-t border-border">
            <h3 className="font-anton text-lg text-ink">OTHER DAYS YOU CAN BORROW</h3>
            {otherDays.map((od) => (
              <Link
                key={od.id}
                href={`/days/${od.slug}`}
                className="block p-3.5 border border-border rounded-[12px] bg-white hover:border-ink transition-colors"
              >
                <h4 className="font-anton text-base text-ink">{od.title}</h4>
                <p className="text-xs text-muted mt-0.5">{od.area} · {od.walk_km} km walk</p>
              </Link>
            ))}
          </div>
        )}

        <div className="pt-2 text-center">
          <Link href="/help" className="text-xs text-red-text font-bold hover:underline">
            Stuck at any stop? Call a local →
          </Link>
        </div>
      </div>
    </div>
  );
}
