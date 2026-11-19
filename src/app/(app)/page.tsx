'use client';

import React, { useState } from 'react';
import Link from 'next/link';

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
    dish: 'Bánh mì',
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
    dish: 'Phở bò',
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
    dish: 'Bún ốc',
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
  'Phở',
  'Bánh mì',
  'Chè',
  'Bún chả',
  'Ốc',
  'Cà phê',
  'Xôi',
  'Bún ốc',
  'Nem',
  'Lẩu',
  'Cháo',
  'Bia hơi',
];

// Helper for circular table seat positioning
const TABLE_SEATS = [
  { left: '35px', top: '2px', type: 'local' },
  { left: '64px', top: '18px', type: 'local' },
  { left: '64px', top: '51px', type: 'local' },
  { left: '35px', top: '68px', type: 'trav' },
  { left: '6px', top: '51px', type: 'trav' },
  { left: '6px', top: '18px', type: 'free' },
];

export default function HomePage() {
  const [level, setLevel] = useState<BraveLevel>('curious');
  const pick = PICKS[level];

  return (
    <div className="flex flex-col gap-5 px-5 pt-4 pb-10 text-ink">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between">
        <span className="text-[26px] leading-8 font-extrabold tracking-[-0.03em] text-jade">
          mâm
        </span>
        <div className="flex items-center gap-2">
          <Link
            href="/dev/ui"
            className="text-xs px-2.5 py-1 border border-border rounded-full text-muted hover:text-ink transition-colors"
          >
            UI Kit
          </Link>
          <button
            type="button"
            aria-label="Change language, currently English"
            className="w-11 h-11 border-[1.5px] border-[#DCE2DE] rounded-[22px] bg-white text-[13px] font-bold text-ink flex items-center justify-center hover:border-jade transition-colors cursor-pointer"
          >
            EN
          </button>
        </div>
      </div>

      {/* Context line & Headline */}
      <div className="flex flex-col gap-1">
        <span className="text-[13px] leading-[19px] text-[#4A5852]">
          Saturday 07:10 · light rain · Đống Đa, Hà Nội
        </span>
        <h1 className="m-0 text-[30px] leading-9 font-extrabold tracking-[-0.02em] text-ink">
          Hungry? Go here.
        </h1>
      </div>

      {/* Hero Recommendation Card (Jade Dark #083F34) */}
      <div className="flex flex-col gap-4 p-5 rounded-[24px] bg-[#083F34] text-white shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="text-[11px] font-bold tracking-[0.08em] uppercase text-[#BFD8CF]">
              {pick.meta}
            </span>
            <span className="text-[30px] leading-9 font-extrabold tracking-[-0.02em] text-white">
              {pick.dish}
            </span>
            <span className="text-[14px] leading-5 text-[#BFD8CF]">
              {pick.gloss}
            </span>
            <span className="mt-2 text-[15px] leading-[22px] font-semibold text-white">
              {pick.place}
            </span>
            <span className="text-[14px] leading-5 text-[#BFD8CF]">
              {pick.price}
            </span>
          </div>

          {/* Phở Bowl Illustration (92x92) */}
          <svg
            aria-hidden="true"
            width="92"
            height="92"
            viewBox="0 0 96 96"
            className="shrink-0"
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
            <circle cx="66" cy="50" r="3" fill="#FF7A59" />
          </svg>
        </div>

        {/* Why this one, why now */}
        <div className="flex flex-col gap-2.5 pt-4 border-t border-white/18">
          <span className="text-[12px] leading-4 font-bold tracking-[0.08em] uppercase text-[#BFD8CF]">
            Why this one, why now
          </span>
          <div className="flex flex-col gap-2.5">
            {pick.why.map((reason, idx) => (
              <div key={idx} className="flex items-start gap-2.5">
                <span
                  aria-hidden="true"
                  className="w-2 h-2 mt-1.5 shrink-0 rounded-[4px] bg-[#FF7A59]"
                />
                <span className="text-[14px] leading-5 text-white">
                  {reason}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button (Coral #FF7A59) */}
        <Link
          href={`/places/${pick.slug}`}
          className="flex items-center justify-center h-[52px] rounded-[16px] bg-[#FF7A59] text-[#12211D] text-[16px] font-bold hover:bg-[#ff8e72] transition-colors"
        >
          Show me this place
        </Link>
      </div>

      {/* 'How brave are you feeling?' Interactive chip group */}
      <div className="flex flex-col gap-2">
        <span className="text-[14px] leading-5 font-bold text-ink">
          How brave are you feeling?
        </span>
        <div className="flex gap-2 flex-wrap">
          {LEVELS.map((l) => {
            const active = level === l.id;
            return (
              <button
                key={l.id}
                type="button"
                onClick={() => setLevel(l.id)}
                aria-pressed={active}
                className={`h-11 px-4 rounded-[22px] text-[14px] transition-colors cursor-pointer ${
                  active
                    ? 'border-[1.5px] border-jade bg-jade font-semibold text-white'
                    : 'border-[1.5px] border-[#DCE2DE] bg-white font-medium text-ink hover:border-jade'
                }`}
              >
                {l.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Happening now Card */}
      <Link
        href="/tables/1"
        className="flex flex-col gap-3 p-4 rounded-[20px] bg-white text-ink shadow-[0_1px_2px_rgba(18,33,29,0.06),0_8px_24px_rgba(18,33,29,0.04)] hover:shadow-md transition-shadow"
      >
        <span className="self-start px-2.5 py-1 rounded-full bg-[#FFE9E1] text-[12px] leading-4 font-bold text-[#8A2A12]">
          Happening now · 350 m from you
        </span>

        <div className="flex items-center gap-3.5">
          {/* Table Ring Illustration (88x88) */}
          <div aria-hidden="true" className="relative w-[88px] h-[88px] shrink-0">
            <div className="absolute left-6 top-6 w-10 h-10 rounded-full bg-[#E2F0EA]" />
            {TABLE_SEATS.map((seat, i) => {
              if (seat.type === 'local') {
                return (
                  <span
                    key={i}
                    style={{ left: seat.left, top: seat.top }}
                    className="absolute w-[18px] h-[18px] rounded-[9px] bg-[#0B5D4B]"
                  />
                );
              }
              if (seat.type === 'trav') {
                return (
                  <span
                    key={i}
                    style={{ left: seat.left, top: seat.top }}
                    className="absolute w-[18px] h-[18px] rounded-[9px] bg-[#FF7A59]"
                  />
                );
              }
              return (
                <span
                  key={i}
                  style={{ left: seat.left, top: seat.top }}
                  className="absolute w-[18px] h-[18px] rounded-[9px] border-2 border-dashed border-[#7B8A84] bg-white"
                />
              );
            })}
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[18px] leading-6 font-bold text-ink">
              A table sits down in 25 minutes
            </span>
            <span className="text-[13px] leading-[19px] text-[#4A5852]">
              Bún chả at 12:15. Three locals, two travellers, one seat free.
            </span>
          </div>
        </div>

        <span className="flex items-center justify-center h-12 rounded-[14px] bg-[#E2F0EA] text-[15px] font-bold text-[#0B5D4B]">
          See who is at the table
        </span>
      </Link>

      {/* YOUR FOOD PASSPORT Section */}
      <div className="flex flex-col gap-3 p-4 rounded-[20px] bg-white text-ink shadow-[0_1px_2px_rgba(18,33,29,0.06),0_8px_24px_rgba(18,33,29,0.04)]">
        <div className="flex items-baseline justify-between gap-3">
          <span className="text-[12px] leading-4 font-bold tracking-[0.08em] uppercase text-[#4A5852]">
            Your food passport
          </span>
          <span className="text-[13px] font-semibold text-[#0B5D4B]">
            3 of 12 dishes
          </span>
        </div>

        {/* 4 columns grid for 12 items */}
        <div className="grid grid-cols-4 gap-2">
          {PASSPORT_DISHES.map((dishName, idx) => {
            const earned = idx < 3;
            return earned ? (
              <div
                key={idx}
                className="flex items-center justify-center h-9 rounded-[10px] bg-[#0B5D4B] text-[12px] font-bold text-white"
              >
                {dishName}
              </div>
            ) : (
              <div
                key={idx}
                className="flex items-center justify-center h-9 box-border border-[1.5px] border-dashed border-[#B9C4BE] rounded-[10px] text-[12px] font-medium text-[#4A5852]"
              >
                {dishName}
              </div>
            );
          })}
        </div>

        <span className="text-[13px] leading-[19px] text-[#4A5852]">
          Each stamp is signed by the local whose favourite you ate. Linh and Hùng wrote back to you.
        </span>
      </div>

      {/* Borrow a local's day Card */}
      <Link
        href="/days/linh-saturday"
        className="flex items-center justify-between gap-3 p-4 rounded-[20px] bg-white text-ink shadow-[0_1px_2px_rgba(18,33,29,0.06),0_8px_24px_rgba(18,33,29,0.04)] hover:shadow-md transition-shadow"
      >
        <div className="flex flex-col gap-0.5">
          <span className="text-[16px] leading-[22px] font-bold text-ink">
            Borrow a local’s day
          </span>
          <span className="text-[13px] leading-[19px] text-[#4A5852]">
            Five places a real person eats at, in order.
          </span>
        </div>
        <svg
          aria-hidden="true"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#4A5852"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="shrink-0"
        >
          <path d="M9 5l7 7-7 7" />
        </svg>
      </Link>

      {/* Vietnamese Link to Contribute */}
      <Link
        href="/contribute"
        className="flex items-center justify-center h-11 text-[14px] font-semibold text-[#0B5D4B] hover:text-[#083F34] transition-colors"
      >
        Bạn là người Việt? Thêm quán quen của bạn
      </Link>
    </div>
  );
}
