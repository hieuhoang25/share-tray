'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ScreenHeader, ChipGroup, Card, NoteBox } from '@/components/ui';
import { formatVND, formatUSD } from '@/lib/format';
import type { Dish, Place } from '@/types/domain';

export default function DishesScreen() {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [selectedDishSlug, setSelectedDishSlug] = useState<string>('pho');
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDishes() {
      try {
        const res = await fetch('/api/dishes');
        const data = await res.json();
        setDishes(data);
      } catch (err) {
        console.error(err);
      }
    }
    loadDishes();
  }, []);

  useEffect(() => {
    async function loadPlaces() {
      setLoading(true);
      try {
        const res = await fetch(`/api/dishes/${selectedDishSlug}/places`);
        const data = await res.json();
        setPlaces(data.places || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    if (selectedDishSlug) {
      loadPlaces();
    }
  }, [selectedDishSlug]);

  const currentDish = dishes.find((d) => d.slug === selectedDishSlug) || dishes[0];

  return (
    <div className="bg-white min-h-screen text-ink pb-24">
      <ScreenHeader
        title="WHAT ARE YOU CRAVING?"
        variant="dark"
        subtitle="Hanoi Food Explorer"
        backHref="/"
        backLabel="Home"
      />

      <div className="p-5 space-y-5">
        {/* Dish filter chips */}
        {dishes.length > 0 && (
          <div className="bg-ink p-4 rounded-[16px]">
            <ChipGroup
              theme="dark"
              options={dishes.map((d) => ({
                value: d.slug,
                label: d.name_vi,
              }))}
              value={selectedDishSlug}
              onChange={setSelectedDishSlug}
            />
          </div>
        )}

        {/* Current dish explanation */}
        {currentDish && (
          <div className="border-b border-border pb-4">
            <h2 className="font-anton text-2xl text-red">{currentDish.name_vi}</h2>
            <p className="text-sm font-semibold text-muted uppercase tracking-wider mt-0.5">
              {currentDish.gloss_en}
            </p>
            <p className="text-xs text-muted leading-relaxed mt-1">
              {currentDish.description_en}
            </p>
          </div>
        )}

        {/* Note box */}
        <NoteBox>
          <span className="font-bold text-xs uppercase tracking-wider block mb-0.5">
            Local Authenticity Guarantee
          </span>
          Ranked only by Vietnamese people who eat there. Level shows how easy a place is on a first visit.
        </NoteBox>

        {/* Places List */}
        <div className="space-y-4">
          <p className="text-xs font-semibold text-muted uppercase tracking-wider">
            {places.length} Places Found
          </p>

          {loading ? (
            <p className="text-sm text-muted">Finding local spots...</p>
          ) : places.length === 0 ? (
            <p className="text-sm text-muted">No places listed for this dish yet.</p>
          ) : (
            places.map((place) => (
              <Link key={place.id} href={`/places/${place.slug}`} className="block">
                <Card featured className="space-y-3 hover:border-red transition-all cursor-pointer">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-anton text-2xl text-ink leading-tight">{place.name}</h3>
                      <p className="text-xs text-muted mt-0.5">
                        {place.district} · 4 min walk · {formatVND(place.price_min)} ({formatUSD(place.price_min)})
                      </p>
                    </div>
                    <span className="bg-yellow text-ink font-anton text-base px-2.5 py-1 rounded-md shrink-0 shadow-xs">
                      4.7 ★
                    </span>
                  </div>

                  <div className="bg-cream border border-cream-border rounded-[8px] p-2.5 text-xs text-cream-text">
                    <span className="font-bold uppercase tracking-wider block mb-0.5">Known for:</span>
                    {place.known_for_en}
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1 border-t border-border">
                    <span className="text-muted font-medium">Price 4.7 · Service 4.2 · Space 3.9</span>
                    <span className="font-bold text-red-text">23 locals eat here</span>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-ink text-white">
                      {place.level} level
                    </span>
                    <span className="text-xs font-bold text-red-text underline">
                      View details →
                    </span>
                  </div>
                </Card>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
