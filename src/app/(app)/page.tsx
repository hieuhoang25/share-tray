'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DarkCard } from '@/components/ui';

type BraveLevel = 'gentle' | 'curious' | 'fearless';

interface Recommendation {
  meta: string;
  dish: string;
  gloss: string;
  place: string;
  slug: string;
  price: string;
  why: string[];
}

const PICKS: Record<BraveLevel, Recommendation> = {
  gentle: {
    meta: '3 MIN WALK · NO NEED TO SIT DOWN',
    dish: 'BÁNH MÌ',
    gloss: 'Crusty baguette sandwich',
    place: 'Bánh mì Cô Nga',
    slug: 'pho-ba-tam',
    price: '25,000₫ · about $1',
    why: [
      'The easiest first meal: point at the fillings, pay, walk away.',
      'The price is painted on the cart, so there is nothing to negotiate.',
      'Hùng has bought breakfast here on his way to work for 9 years.',
    ],
  },
  curious: {
    meta: '4 MIN WALK · OPEN UNTIL 10:30',
    dish: 'PHỞ BÒ',
    gloss: 'Beef noodle soup',
    place: 'Phở Bà Tâm',
    slug: 'pho-ba-tam',
    price: '45,000₫ · about $1.70',
    why: [
      'Phở is a breakfast dish here. This pot usually sells out before 10:30.',
      'Walk in as Linh’s friend and order her usual. No menu needed.',
      'Covered seating, so the rain does not matter.',
    ],
  },
  fearless: {
    meta: '6 MIN WALK · PLASTIC STOOLS IN AN ALLEY',
    dish: 'BÚN ỐC',
    gloss: 'Snail noodle soup, sour and hot',
    place: 'Bún ốc Bà Lượng',
    slug: 'pho-ba-tam',
    price: '35,000₫ · about $1.30',
    why: [
      'Almost no visitors find it. There is no sign and no menu.',
      'Thảo grew up two doors away and still comes every Saturday.',
      'We give you a card to show the owner, so you never have to speak.',
    ],
  },
};

const LEVELS: Array<{ id: BraveLevel; label: string }> = [
  { id: 'gentle', label: 'Gentle' },
  { id: 'curious', label: 'Curious' },
  { id: 'fearless', label: 'Fearless' },
];

const PASSPORT_DISHES = [
  { name: 'PHỞ', earned: true },
  { name: 'BÚN CHẢ', earned: true },
  { name: 'ỐC', earned: true },
  { name: 'BÁNH MÌ', earned: false },
  { name: 'CHÈ', earned: false },
  { name: 'CÀ PHÊ', earned: false },
  { name: 'XÔI', earned: false },
  { name: 'BÚN ỐC', earned: false },
  { name: 'NEM', earned: false },
  { name: 'LẨU', earned: false },
  { name: 'CHÁO', earned: false },
  { name: 'BIA HƠI', earned: false },
];

export default function HomePage() {
  const [level, setLevel] = useState<BraveLevel>('curious');
  const pick = PICKS[level];

  return (
    <div className="px-5 pt-4 pb-28 flex flex-col gap-4 text-white">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between">
        <span className="font-anton text-yellow text-[22px] tracking-[0.02em]">
          SHARE TRAY
        </span>
        <div className="flex items-center gap-2">
          <Link
            href="/dev/ui"
            className="text-xs px-2.5 py-1 border border-muted-2 rounded-full text-on-dark-1 hover:text-white"
          >
            UI Kit
          </Link>
          <button
            type="button"
            aria-label="Change language, currently English"
            className="h-[44px] w-[52px] border border-muted rounded-[22px] bg-transparent text-[14px] font-semibold text-white flex items-center justify-center hover:border-yellow transition-colors cursor-pointer"
          >
            EN
          </button>
        </div>
      </div>

      {/* Context line & Headline */}
      <div className="flex flex-col gap-1.5">
        <span className="text-[13px] text-on-dark-2">
          Saturday 07:10 · light rain · Đống Đa, Hà Nội
        </span>
        <h1 className="m-0 font-anton font-normal text-[46px] leading-[50px] tracking-[0.01em] text-white">
          HUNGRY? GO HERE.
        </h1>
      </div>

      {/* Hero Recommendation Card (Red Background #C8281E) */}
      <div className="flex gap-3 p-[18px] rounded-[16px] bg-red text-white shadow-lg">
        <div className="flex flex-col gap-1.5 flex-1 min-w-0">
          <span className="text-[11px] font-semibold tracking-[0.06em] text-pink-soft uppercase">
            {pick.meta}
          </span>
          <span className="font-anton text-[44px] leading-[50px] text-yellow truncate">
            {pick.dish}
          </span>
          <span className="text-[13px] text-pink-soft leading-snug">
            {pick.gloss}
          </span>
          <span className="text-[17px] font-semibold text-white">
            {pick.place}
          </span>
          <span className="text-[14px] text-white">
            {pick.price}
          </span>
        </div>

        {/* Vector SVG phở bowl illustration (96x96) */}
        <svg
          aria-hidden="true"
          width="96"
          height="96"
          viewBox="0 0 96 96"
          className="shrink-0 self-center"
        >
          <circle cx="48" cy="48" r="46" fill="#FFFFFF" />
          <circle cx="48" cy="48" r="38" fill="#E9B872" />
          <path
            d="M22 44c8-6 14 6 22 0s14 6 22 0"
            fill="none"
            stroke="#FFF6E0"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M24 56c8-6 14 6 22 0s14 6 22 0"
            fill="none"
            stroke="#FFF6E0"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <ellipse cx="38" cy="34" rx="10" ry="5" fill="#9C4A3A" />
          <ellipse cx="58" cy="38" rx="9" ry="4" fill="#9C4A3A" />
          <circle cx="60" cy="62" r="4" fill="#2E8B57" />
          <circle cx="52" cy="68" r="3" fill="#2E8B57" />
          <circle cx="34" cy="66" r="3" fill="#2E8B57" />
          <circle cx="66" cy="50" r="3" fill="#C8281E" />
        </svg>
      </div>

      {/* DarkCard 'WHY THIS ONE, WHY NOW' (#22262B) with yellow square bullets */}
      <DarkCard className="!p-[14px] flex flex-col gap-[10px] border border-line-dark">
        <span className="text-[12px] font-semibold tracking-[0.06em] text-on-dark-2 uppercase">
          WHY THIS ONE, WHY NOW
        </span>
        <div className="flex flex-col gap-[10px]">
          {pick.why.map((reason, idx) => (
            <div key={idx} className="flex items-start gap-[10px]">
              <span
                aria-hidden="true"
                className="w-[8px] h-[8px] mt-[7px] shrink-0 bg-yellow"
              />
              <span className="text-[14px] leading-[21px] text-white">
                {reason}
              </span>
            </div>
          ))}
        </div>
      </DarkCard>

      {/* 'How brave are you feeling?' Interactive chip group */}
      <div className="flex flex-col gap-2">
        <span className="text-[13px] font-semibold text-white">
          How brave are you feeling?
        </span>
        <div className="grid grid-cols-3 gap-2">
          {LEVELS.map((l) => {
            const active = level === l.id;
            return (
              <button
                key={l.id}
                type="button"
                onClick={() => setLevel(l.id)}
                aria-pressed={active}
                className={`h-[48px] rounded-[12px] text-[14px] transition-colors cursor-pointer ${
                  active
                    ? 'border-2 border-yellow bg-yellow font-bold text-ink'
                    : 'border border-muted bg-transparent font-medium text-white hover:border-yellow'
                }`}
              >
                {l.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Yellow CTA Button (52px) */}
      <Link
        href={`/places/${pick.slug}`}
        className="flex items-center justify-center h-[52px] rounded-[12px] bg-yellow text-ink text-[16px] font-bold hover:bg-[#FFD966] transition-colors shadow-md"
      >
        Show me this place
      </Link>

      {/* YOUR FOOD PASSPORT Section */}
      <DarkCard className="!p-[14px] flex flex-col gap-[10px] border border-line-dark">
        <div className="flex items-baseline justify-between">
          <span className="text-[12px] font-semibold tracking-[0.06em] text-on-dark-2 uppercase">
            YOUR FOOD PASSPORT
          </span>
          <span className="text-[13px] font-semibold text-yellow">
            3 of 12 dishes
          </span>
        </div>

        {/* 6 columns x 2 rows grid (height 48px per cell) */}
        <div className="grid grid-cols-6 gap-[6px]">
          {PASSPORT_DISHES.map((item, idx) => (
            <div
              key={idx}
              className={`h-[48px] rounded-[6px] flex items-center justify-center text-center px-0.5 select-none ${
                item.earned
                  ? 'bg-yellow text-ink font-anton text-[11px] leading-tight'
                  : 'border border-dashed border-[#6A717B] text-[#B8BDC4] font-anton text-[11px] leading-tight'
              }`}
            >
              <span className="truncate">{item.name}</span>
            </div>
          ))}
        </div>

        <span className="text-[13px] leading-[19px] text-on-dark-1">
          Each stamp is signed by the local whose favourite you ate. Linh and Hùng wrote back to you.
        </span>
      </DarkCard>

      {/* 2 Quick Navigation Cards */}
      <div className="grid grid-cols-2 gap-[10px]">
        <Link
          href="/days/linh-saturday"
          className="flex flex-col gap-1 p-[14px] min-h-[96px] border border-muted rounded-[12px] text-white hover:border-yellow transition-colors"
        >
          <span className="font-anton text-[18px] leading-[24px] text-yellow">
            BORROW A LOCAL’S DAY
          </span>
          <span className="text-[12px] leading-[17px] text-on-dark-1">
            Five places a real person eats at, in order.
          </span>
        </Link>
        <Link
          href="/together"
          className="flex flex-col gap-1 p-[14px] min-h-[96px] border border-muted rounded-[12px] text-white hover:border-yellow transition-colors"
        >
          <span className="font-anton text-[18px] leading-[24px] text-yellow">
            DON’T EAT ALONE
          </span>
          <span className="text-[12px] leading-[17px] text-on-dark-1">
            Join a table of locals and travellers.
          </span>
        </Link>
      </div>

      {/* Vietnamese Footer Link */}
      <div className="flex justify-center">
        <Link
          href="/contribute"
          className="flex items-center justify-center min-h-[44px] text-[13px] font-semibold text-yellow hover:text-[#FFD966] transition-colors"
        >
          Bạn là người Việt? Thêm quán quen của bạn →
        </Link>
      </div>
    </div>
  );
}