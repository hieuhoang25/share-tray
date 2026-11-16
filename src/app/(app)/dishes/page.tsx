'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface PlaceCardData {
  id: string;
  name: string;
  score: string;
  area: string;
  known: string;
  scores: string;
  locals: string;
  level: string;
  href: string;
}

interface DishData {
  id: string;
  vi: string;
  gloss: string;
  places: PlaceCardData[];
}

const DISH_DATA: Record<string, DishData> = {
  pho: {
    id: 'pho',
    vi: 'Phở',
    gloss: 'Rice-noodle soup with beef or chicken. A breakfast dish in Hà Nội.',
    places: [
      {
        id: 'pho-ba-tam',
        name: 'Phở Bà Tâm',
        score: '4.5',
        area: 'Đống Đa · 650 m · 45,000₫ (about $1.70)',
        known: 'Clear broth simmered overnight, never sweet',
        scores: 'Price 4.7 · Service 4.2 · Space 3.9',
        locals: '23 locals eat here',
        level: 'Curious',
        href: '/places/pho-ba-tam',
      },
      {
        id: 'pho-chu-minh',
        name: 'Phở Chú Minh',
        score: '4.3',
        area: 'Hoàn Kiếm · 2.0 km · 55,000₫ (about $2.10)',
        known: 'Hand-cut noodles and a picture menu',
        scores: 'Price 4.1 · Service 4.5 · Space 4.2',
        locals: '31 locals eat here',
        level: 'Gentle',
        href: '/places/pho-ba-tam',
      },
      {
        id: 'pho-ga-ngo-12',
        name: 'Phở Gà Ngõ 12',
        score: '4.4',
        area: 'Ba Đình · 1.2 km · 40,000₫ (about $1.50)',
        known: 'Free-range chicken, lime-leaf scent',
        scores: 'Price 4.8 · Service 4.0 · Space 3.6',
        locals: '17 locals eat here',
        level: 'Fearless',
        href: '/places/pho-ba-tam',
      },
    ],
  },
  buncha: {
    id: 'buncha',
    vi: 'Bún chả',
    gloss: 'Charcoal-grilled pork in a warm dipping broth, with cold rice noodles. A lunch dish.',
    places: [
      {
        id: 'bun-cha-ngo-41',
        name: 'Bún chả Ngõ 41',
        score: '4.6',
        area: 'Đống Đa · 900 m · 50,000₫ (about $1.90)',
        known: 'Pork grilled over charcoal at the door, to order',
        scores: 'Price 4.5 · Service 4.3 · Space 3.7',
        locals: '28 locals eat here',
        level: 'Curious',
        href: '/places/pho-ba-tam',
      },
      {
        id: 'bun-cha-co-dung',
        name: 'Bún chả Cô Dung',
        score: '4.2',
        area: 'Hai Bà Trưng · 2.4 km · 45,000₫ (about $1.70)',
        known: 'Crab spring rolls on the side',
        scores: 'Price 4.6 · Service 3.9 · Space 4.0',
        locals: '12 locals eat here',
        level: 'Gentle',
        href: '/places/pho-ba-tam',
      },
    ],
  },
  oc: {
    id: 'oc',
    vi: 'Ốc',
    gloss: 'Snails and shellfish, boiled or stir-fried, eaten slowly with friends in the evening.',
    places: [
      {
        id: 'oc-co-hanh',
        name: 'Ốc Cô Hạnh',
        score: '4.3',
        area: 'Hai Bà Trưng · 1.8 km · 60,000₫ (about $2.30)',
        known: 'Ginger fish sauce made fresh every afternoon',
        scores: 'Price 4.4 · Service 4.1 · Space 3.5',
        locals: '19 locals eat here',
        level: 'Fearless',
        href: '/places/pho-ba-tam',
      },
      {
        id: 'oc-luoc-ba-sau',
        name: 'Ốc Luộc Bà Sáu',
        score: '4.1',
        area: 'Đống Đa · 1.1 km · 40,000₫ (about $1.50)',
        known: 'One thing only: boiled snails with lime leaf',
        scores: 'Price 4.8 · Service 3.8 · Space 3.3',
        locals: '8 locals eat here',
        level: 'Fearless',
        href: '/places/pho-ba-tam',
      },
    ],
  },
  caphe: {
    id: 'caphe',
    vi: 'Cà phê',
    gloss: 'Strong drip coffee with condensed milk, egg cream or coconut. Sit as long as you like.',
    places: [
      {
        id: 'ca-phe-ong-lam',
        name: 'Cà phê Ông Lâm',
        score: '4.5',
        area: 'Đống Đa · 400 m · 30,000₫ (about $1.20)',
        known: 'Egg coffee whisked by hand, quiet second floor',
        scores: 'Price 4.3 · Service 4.4 · Space 4.6',
        locals: '26 locals drink here',
        level: 'Gentle',
        href: '/places/pho-ba-tam',
      },
      {
        id: 'ca-phe-via-he-9',
        name: 'Cà phê Vỉa Hè 9',
        score: '4.0',
        area: 'Ba Đình · 1.5 km · 20,000₫ (about $0.80)',
        known: 'Pavement stools and the morning newspaper crowd',
        scores: 'Price 4.9 · Service 3.7 · Space 3.4',
        locals: '11 locals drink here',
        level: 'Curious',
        href: '/places/pho-ba-tam',
      },
    ],
  },
};

const DISH_ORDER = ['pho', 'buncha', 'oc', 'caphe'] as const;

export default function DishesScreen() {
  const [selectedDish, setSelectedDish] = useState<string>('pho');
  const current = DISH_DATA[selectedDish] || DISH_DATA.pho;

  return (
    <div className="w-full min-h-screen bg-white text-ink flex flex-col pb-24 font-sans">
      {/* Dark Header */}
      <div className="flex flex-col gap-3 p-5 bg-ink text-white">
        <h1 className="m-0 font-anton font-normal text-[36px] leading-[42px] tracking-[0.01em] text-white">
          WHAT ARE YOU CRAVING?
        </h1>

        {/* Dish Chips */}
        <div className="flex gap-2 flex-wrap">
          {DISH_ORDER.map((id) => {
            const dish = DISH_DATA[id];
            const isActive = id === selectedDish;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setSelectedDish(id)}
                aria-pressed={isActive}
                className={`h-11 px-3.5 rounded-[22px] text-sm transition-colors cursor-pointer flex items-center justify-center ${
                  isActive
                    ? 'border-2 border-yellow bg-yellow text-ink font-bold'
                    : 'border border-muted-2 bg-transparent text-white font-medium hover:border-white'
                }`}
              >
                {dish.vi}
              </button>
            );
          })}
        </div>

        {/* Gloss text */}
        <span className="text-[13px] leading-[19px] text-on-dark-1">
          {current.gloss}
        </span>
      </div>

      {/* Main Content */}
      <div className="flex flex-col gap-3 px-5 pt-4 flex-grow">
        <p className="m-0 text-xs leading-[18px] text-muted">
          Ranked only by Vietnamese people who eat there. Level shows how easy a place is on a first visit.
        </p>

        {/* Places List */}
        <div className="flex flex-col gap-3">
          {current.places.map((place) => (
            <Link
              key={place.id}
              href={place.href}
              className="flex flex-col gap-2 p-3.5 border border-border rounded-xl text-ink bg-white hover:border-ink transition-colors"
            >
              <div className="flex justify-between items-center gap-2">
                <span className="text-[17px] font-bold text-ink">{place.name}</span>
                <span className="px-2 py-0.5 rounded-[6px] bg-yellow text-sm font-bold text-ink shrink-0">
                  {place.score}
                </span>
              </div>

              <span className="text-[13px] text-muted">{place.area}</span>

              {/* Known For Box */}
              <div className="flex gap-2 p-[8px_10px] rounded-lg bg-cream">
                <span className="text-xs font-bold text-cream-text shrink-0">Known for</span>
                <span className="text-[13px] leading-[18px] text-ink">{place.known}</span>
              </div>

              <span className="text-[13px] text-ink">{place.scores}</span>

              <div className="flex justify-between items-center gap-2">
                <span className="text-xs font-semibold text-red-text">
                  {place.locals}
                </span>
                <span className="px-2 py-[3px] rounded-[6px] bg-ink text-[11px] font-semibold text-white">
                  {place.level}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
