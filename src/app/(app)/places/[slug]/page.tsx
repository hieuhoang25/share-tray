'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import {
  ScreenHeader,
  NumberedStep,
  ScoreBar,
  DarkCard,
  Card,
  InfoBox,
  Button,
  ChipGroup,
  Avatar,
} from '@/components/ui';
import { formatVND } from '@/lib/format';
import type { Place, PlacePraise, Usual, NearbyPoint, Review, Table } from '@/types/domain';

export default function PlaceScreen({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [data, setData] = useState<{
    place: Place;
    praises: PlacePraise[];
    usual: Usual | null;
    nearby: NearbyPoint[];
    reviews: Review[];
    openSeats: Table[];
  } | null>(null);

  const [nearbyFilter, setNearbyFilter] = useState<'all' | 'see' | 'eat' | 'useful'>('all');
  const [showOriginalReview, setShowOriginalReview] = useState(false);

  useEffect(() => {
    async function loadPlace() {
      try {
        const res = await fetch(`/api/places/${slug}`);
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (err) {
        console.error(err);
      }
    }
    loadPlace();
  }, [slug]);

  if (!data) {
    return (
      <div className="bg-white min-h-screen text-ink p-5">
        <p className="text-sm text-muted">Loading local place profile...</p>
      </div>
    );
  }

  const { place, praises, usual, nearby, reviews, openSeats } = data;

  const filteredNearby = nearby.filter((pt) => {
    if (nearbyFilter === 'all') return true;
    return pt.kind === nearbyFilter;
  });

  return (
    <div className="bg-white min-h-screen text-ink pb-28">
      <ScreenHeader
        title={place.name}
        variant="red"
        subtitle={`${place.district} · 4 min walk · Open until ${place.open_hours.close}`}
        backHref="/dishes"
        backLabel="All places"
      />

      <div className="p-5 space-y-6">
        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider bg-yellow text-ink px-2.5 py-1 rounded-md">
            ★ 4.5 from 23 locals
          </span>
          <span className="text-xs font-bold uppercase tracking-wider bg-ink text-white px-2.5 py-1 rounded-md">
            {place.level} level
          </span>
          <span className="text-xs font-bold uppercase tracking-wider bg-gray-bg text-muted px-2.5 py-1 rounded-md">
            Open until {place.open_hours.close}
          </span>
        </div>

        {/* WHY LOCALS PRAISE IT */}
        <section className="space-y-3">
          <h2 className="font-anton text-2xl text-ink">WHY LOCALS PRAISE IT</h2>
          <Card>
            {praises.map((praise, idx) => (
              <NumberedStep
                key={praise.id || idx}
                number={idx + 1}
                title={praise.title_en}
                description={praise.text_en}
                meta={`${praise.mention_count} of 23 locals mention it`}
              />
            ))}
          </Card>
          <InfoBox>
            <span className="font-bold text-xs uppercase tracking-wider block mb-1 text-ink">
              The honest downside
            </span>
            {place.downside_en}
          </InfoBox>
        </section>

        {/* Score Bars */}
        <Card>
          <ScoreBar label="Price" score={4.7} />
          <ScoreBar label="Service" score={4.2} />
          <ScoreBar label="Space" score={3.9} />
        </Card>

        {/* ORDER THE USUAL */}
        {usual && (
          <DarkCard featured className="space-y-3">
            <span className="text-xs font-bold text-yellow uppercase tracking-widest block">
              ORDER &quot;THE USUAL&quot; · WALK IN AS A FRIEND
            </span>
            <p className="font-anton text-2xl text-yellow leading-tight">
              &ldquo;{usual.order_text_vi}&rdquo;
            </p>
            <p className="text-xs text-on-dark-1 italic">
              &ldquo;{usual.order_text_en}&rdquo;
            </p>
            <div className="flex items-center justify-between text-xs text-on-dark-2 pt-2 border-t border-line-dark">
              <span>Paid: {formatVND(usual.price_paid)}</span>
              <span>Linh has eaten here for {usual.years_eating} years</span>
            </div>
            <Button
              variant="primary-yellow"
              size="lg"
              fullWidth
              href={`/places/${slug}/order`}
            >
              Show this card at the shop
            </Button>
          </DarkCard>
        )}

        {/* AROUND HERE */}
        <section className="space-y-3">
          <h2 className="font-anton text-2xl text-ink">AROUND HERE</h2>
          <ChipGroup
            theme="light"
            options={[
              { value: 'all', label: 'All' },
              { value: 'see', label: 'See' },
              { value: 'eat', label: 'Eat next' },
              { value: 'useful', label: 'Useful' },
            ]}
            value={nearbyFilter}
            onChange={(val) => setNearbyFilter(val as 'all' | 'see' | 'eat' | 'useful')}
          />

          <div className="space-y-2">
            {filteredNearby.map((pt) => (
              <Card key={pt.id} className="flex items-start gap-3 py-3">
                <span className="font-anton text-lg text-red w-14 shrink-0">
                  {pt.walk_min} MIN
                </span>
                <div>
                  <h4 className="font-bold text-sm text-ink">{pt.name}</h4>
                  <p className="text-xs text-muted mt-0.5">{pt.note_en}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* WHAT LOCALS SAY */}
        <section className="space-y-3">
          <h2 className="font-anton text-2xl text-ink">WHAT LOCALS SAY</h2>
          {reviews.map((rev) => (
            <Card key={rev.id} className="space-y-2">
              <div className="flex items-center gap-3">
                <Avatar name="Linh" role="local" size="md" />
                <div>
                  <p className="font-bold text-sm text-ink">Linh · 28</p>
                  <p className="text-xs text-muted">{rev.how_known}</p>
                </div>
              </div>
              <p className="text-sm text-ink leading-relaxed">
                {showOriginalReview ? rev.praise_vi : rev.text_en}
              </p>
              <button
                type="button"
                onClick={() => setShowOriginalReview(!showOriginalReview)}
                className="text-xs font-bold text-red-text hover:underline block pt-1"
              >
                {showOriginalReview ? 'Show English translation' : 'Translated from Vietnamese · tap to see original'}
              </button>
            </Card>
          ))}
        </section>

        {/* OPEN SEATS AT THIS SHOP */}
        <Card className="border-2 border-ink space-y-2 bg-[#FAFBFB]">
          <span className="text-xs font-bold uppercase tracking-wider text-muted">
            Shared Tables
          </span>
          <h3 className="font-anton text-xl text-ink">OPEN SEATS AT THIS SHOP</h3>
          <p className="text-xs text-muted">
            {openSeats.length > 0
              ? 'Local hosts have open tables happening here today.'
              : 'Be the first to host a shared meal at this shop.'}
          </p>
          <Button variant="outline" size="md" fullWidth href="/tables/new">
            Open a seat and eat here with others
          </Button>
        </Card>

        {/* 3 Main CTAs */}
        <div className="space-y-3 pt-2">
          <Button
            variant="primary-red"
            size="lg"
            fullWidth
            href={`/places/${slug}/guide`}
          >
            Walk me through it, step by step
          </Button>
          <div className="text-center pt-2">
            <Link href="/help" className="text-xs text-red-text font-bold hover:underline">
              Stuck? Call a local →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
