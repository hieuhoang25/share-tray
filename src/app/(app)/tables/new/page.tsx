'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ScreenHeader, Stepper, Button, DarkCard } from '@/components/ui';

export default function HostTableScreen() {
  const router = useRouter();
  const [shopName, setShopName] = useState('Phở Bà Tâm, Ba Đình');
  const [timing, setTiming] = useState('Today 12:00');
  const [seats, setSeats] = useState(6);
  const [format, setFormat] = useState('Half locals half travellers');
  const [purpose, setPurpose] = useState('New friends');
  const [askMeAbout, setAskMeAbout] = useState('Alley hidden gems & slow-cooked broth');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/tables', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: `Lunch at ${shopName.split(',')[0]}`,
          description: `Gathering for ${purpose.toLowerCase()} over authentic Vietnamese dishes.`,
          starts_at: timing,
          seats_total: seats,
          who_welcome: format,
          purpose,
          est_price: 60000,
        }),
      });

      if (res.ok) {
        const created = await res.json();
        router.push(`/tables/${created.id}`);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white min-h-screen text-ink pb-28">
      <ScreenHeader
        title="HOST A TABLE"
        variant="dark"
        subtitle="Open a seat at your table"
        backHref="/together"
        backLabel="Together"
      />

      <form onSubmit={handleSubmit} className="p-5 space-y-6">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
            Where to eat *
          </label>
          <input
            type="text"
            required
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
            className="w-full px-3.5 py-3 border border-border-2 rounded-[12px] text-sm focus:border-red focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
            When
          </label>
          <div className="grid grid-cols-2 gap-2 text-xs font-bold">
            {['In 30 minutes', 'Today 12:00', 'Tonight 19:00', 'Tomorrow 12:00'].map((time) => (
              <button
                key={time}
                type="button"
                onClick={() => setTiming(time)}
                className={`p-3 rounded-[12px] border text-left transition-all ${
                  timing === time
                    ? 'bg-ink text-white border-ink'
                    : 'bg-white text-muted border-border hover:border-ink'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between p-3.5 bg-gray-bg border border-border rounded-[12px]">
          <div>
            <span className="font-bold text-sm text-ink block">Total seats:</span>
            <span className="text-xs text-muted">Including yourself</span>
          </div>
          <Stepper value={seats} min={2} max={9} onChange={setSeats} />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
            Who is welcome
          </label>
          <div className="grid grid-cols-2 gap-2 text-xs font-bold">
            {[
              'Anyone',
              'Half locals half travellers',
              'Women only',
              'People in my field',
            ].map((fmt) => (
              <button
                key={fmt}
                type="button"
                onClick={() => setFormat(fmt)}
                className={`p-3 rounded-[12px] border text-left transition-all ${
                  format === fmt
                    ? 'bg-ink text-white border-ink'
                    : 'bg-white text-muted border-border hover:border-ink'
                }`}
              >
                {fmt}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
            Primary purpose
          </label>
          <div className="grid grid-cols-2 gap-2 text-xs font-bold">
            {[
              'New friends',
              'Work contacts',
              'Language practice',
              'Travel buddies',
            ].map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPurpose(p)}
                className={`p-3 rounded-[12px] border text-left transition-all ${
                  purpose === p
                    ? 'bg-ink text-white border-ink'
                    : 'bg-white text-muted border-border hover:border-ink'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
            What can people ask you about?
          </label>
          <input
            type="text"
            value={askMeAbout}
            onChange={(e) => setAskMeAbout(e.target.value)}
            className="w-full px-3.5 py-2.5 border border-border-2 rounded-[12px] text-sm focus:border-red focus:outline-none"
          />
        </div>

        {/* TABLE CARD PREVIEW */}
        <div className="space-y-2">
          <span className="text-xs font-anton text-muted tracking-wider block">
            TABLE CARD PREVIEW
          </span>
          <DarkCard className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-yellow text-ink">
              {format}
            </span>
            <h4 className="font-anton text-lg text-white">
              Lunch at {shopName.split(',')[0]}
            </h4>
            <p className="text-xs text-on-dark-2">
              {timing} · {seats} seats · Purpose: {purpose}
            </p>
            <p className="text-xs text-yellow italic pt-1 border-t border-line-dark">
              Host: &ldquo;Ask me about {askMeAbout}&rdquo;
            </p>
          </DarkCard>
        </div>

        <Button
          type="submit"
          variant="primary-red"
          size="lg"
          fullWidth
          disabled={submitting}
        >
          {submitting ? 'Opening table...' : 'Open the table'}
        </Button>
      </form>
    </div>
  );
}
