'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface MockTable {
  id: string;
  for: string[];
  format: string;
  title: string;
  when: string;
  desc: string;
  l: number;
  t: number;
  f: number;
  price: string;
}

const ALL_TABLES: MockTable[] = [
  {
    id: '1',
    for: ['friends', 'language'],
    format: 'Half locals, half travellers',
    title: 'Half & half bún chả',
    when: 'Today 12:15 · Bún chả Ngõ 41 · 350 m',
    desc: 'Three Hanoians, three visitors. Everyone teaches the table one word.',
    l: 3,
    t: 2,
    f: 1,
    price: 'About 50,000₫ each + [SEAT FEE]',
  },
  {
    id: '2',
    for: ['friends'],
    format: 'Mystery table',
    title: 'Six strangers, one surprise',
    when: 'Thursday 19:30 · somewhere in Hoàn Kiếm',
    desc: 'The dish and your tablemates are revealed only when you sit down.',
    l: 3,
    t: 1,
    f: 2,
    price: 'About 120,000₫ each + [SEAT FEE]',
  },
  {
    id: '3',
    for: ['friends', 'work'],
    format: 'Weekly club',
    title: 'Bia hơi Thursday',
    when: 'Every Thursday 18:00 · a corner beer place',
    desc: 'Fresh draught beer, peanuts and the same faces every week. Come twice and you are a regular.',
    l: 4,
    t: 3,
    f: 3,
    price: 'About 60,000₫ each + [SEAT FEE]',
  },
  {
    id: '4',
    for: ['friends', 'buddies'],
    format: 'Women only',
    title: 'Chè & street snacks',
    when: 'Saturday 15:30 · Chè Bà Thìn',
    desc: 'A relaxed afternoon table for women travelling alone, hosted by two Hanoian women.',
    l: 2,
    t: 2,
    f: 2,
    price: 'About 40,000₫ each + [SEAT FEE]',
  },
  {
    id: '5',
    for: ['work'],
    format: 'By trade',
    title: 'Engineers’ hot pot',
    when: 'Tonight 19:00 · a hot pot place in Cầu Giấy',
    desc: 'Software and hardware people from Hà Nội meet visiting engineers. Bring a problem you are stuck on.',
    l: 3,
    t: 1,
    f: 2,
    price: 'About 150,000₫ each + [SEAT FEE]',
  },
  {
    id: '6',
    for: ['work'],
    format: 'Work lunch',
    title: 'Lunch with an office team',
    when: 'Weekdays 12:00 · cơm bình dân near their office',
    desc: 'A Hanoi design studio keeps one chair free at its daily rice lunch for a visitor in the same field.',
    l: 4,
    t: 0,
    f: 1,
    price: 'About 45,000₫ + [SEAT FEE]',
  },
  {
    id: '7',
    for: ['language'],
    format: 'Language swap',
    title: 'English × Vietnamese lunch',
    when: 'Tomorrow 12:00 · Bún chả Cô Dung',
    desc: 'First half in English, second half in Vietnamese. Cards on the table help when words run out.',
    l: 3,
    t: 2,
    f: 1,
    price: 'About 45,000₫ each + [SEAT FEE]',
  },
  {
    id: '8',
    for: ['buddies'],
    format: 'Same route',
    title: 'Hội An next week?',
    when: 'Tomorrow 08:00 · Phở Bà Tâm',
    desc: 'Everyone at this breakfast is heading to Hội An within seven days. Find someone to share the road.',
    l: 1,
    t: 3,
    f: 2,
    price: 'About 45,000₫ each + [SEAT FEE]',
  },
];

const PURPOSES = [
  { id: 'friends', label: 'New friends' },
  { id: 'work', label: 'Work contacts' },
  { id: 'language', label: 'Language practice' },
  { id: 'buddies', label: 'Travel buddies' },
];

function renderRingDots(l: number, t: number, f: number, center = 44, radius = 32, dotSize = 18) {
  const n = l + t + f;
  const dots = [];
  for (let i = 0; i < n; i++) {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / n;
    dots.push({
      left: Math.round(center + radius * Math.cos(a) - dotSize / 2),
      top: Math.round(center + radius * Math.sin(a) - dotSize / 2),
      isLocal: i < l,
      isTrav: i >= l && i < l + t,
      isFree: i >= l + t,
    });
  }
  return dots;
}

export default function TogetherScreen() {
  const [curPurpose, setCurPurpose] = useState('friends');

  const visibleTables = ALL_TABLES.filter((t) => t.for.includes(curPurpose));

  // Hero table ring: 3 locals, 2 travellers, 1 free
  const heroDots = renderRingDots(3, 2, 1);

  return (
    <div className="w-full max-w-[390px] mx-auto min-h-screen bg-[#F3F5F2] text-[#12211D] flex flex-col font-sans pb-28">
      <div className="flex flex-col gap-4 p-5 sm:p-6">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="m-0 text-[30px] leading-[36px] font-extrabold tracking-[-0.02em]">
            Eat together. Leave with friends.
          </h1>
          <span className="text-[15px] leading-[22px] text-[#4A5852]">
            Every table mixes Vietnamese locals and travellers. You come for the food and go home with people you know.
          </span>
        </div>

        {/* Happening now green/teal card */}
        <div className="flex flex-col gap-3 p-5 rounded-[24px] bg-[#083F34] text-white">
          <span className="self-start py-1 px-2.5 rounded-full bg-[#FF7A59] text-[12px] leading-4 font-bold text-[#12211D]">
            Happening now · 350 m from you
          </span>
          <div className="flex items-center gap-3.5">
            <div aria-hidden="true" className="relative w-[88px] h-[88px] shrink-0">
              <div className="absolute left-6 top-6 w-10 h-10 rounded-full bg-[#E2F0EA]" />
              {heroDots.map((d, idx) => (
                <span
                  key={idx}
                  style={{ left: `${d.left}px`, top: `${d.top}px` }}
                  className={`absolute w-[18px] h-[18px] rounded-full box-border ${
                    d.isLocal
                      ? 'bg-[#0B5D4B]'
                      : d.isTrav
                        ? 'bg-[#FF7A59]'
                        : 'border-2 border-dashed border-[#7B8A84] bg-white'
                  }`}
                />
              ))}
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[24px] leading-[30px] font-extrabold tracking-[-0.02em]">
                A table in 25 minutes
              </span>
              <span className="text-[14px] leading-5 text-[#BFD8CF]">
                Bún chả at 12:15. One seat is still free.
              </span>
            </div>
          </div>
          <Link
            href="/tables/1"
            className="flex items-center justify-center h-[52px] rounded-[16px] bg-[#FF7A59] text-[16px] font-bold text-[#12211D] no-underline hover:opacity-90 transition-opacity"
          >
            See who is at the table
          </Link>
        </div>

        {/* Purpose Filter Chips */}
        <div className="flex flex-col gap-2">
          <span className="text-[14px] leading-5 font-bold">What are you hoping for?</span>
          <div className="flex gap-2 flex-wrap">
            {PURPOSES.map((p) => {
              const active = p.id === curPurpose;
              return (
                <button
                  key={p.id}
                  onClick={() => setCurPurpose(p.id)}
                  aria-pressed={active}
                  className={`h-11 px-4 rounded-[22px] font-sans text-[14px] transition-colors cursor-pointer ${
                    active
                      ? 'border-[1.5px] border-[#0B5D4B] bg-[#0B5D4B] font-semibold text-white'
                      : 'border-[1.5px] border-[#DCE2DE] bg-white font-medium text-[#12211D] hover:border-[#0B5D4B]'
                  }`}
                >
                  {p.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3.5 flex-wrap text-[12px] leading-4 text-[#4A5852]">
          <span className="flex items-center gap-1.5">
            <span aria-hidden="true" className="w-3 h-3 rounded-full bg-[#0B5D4B]" />
            Local
          </span>
          <span className="flex items-center gap-1.5">
            <span aria-hidden="true" className="w-3 h-3 rounded-full bg-[#FF7A59]" />
            Traveller
          </span>
          <span className="flex items-center gap-1.5">
            <span
              aria-hidden="true"
              className="w-3 h-3 rounded-full box-border border-2 border-dashed border-[#7B8A84]"
            />
            Free seat
          </span>
        </div>

        {/* Tables list */}
        <div className="flex flex-col gap-3">
          {visibleTables.map((t) => {
            const dots = renderRingDots(t.l, t.t, t.f);
            return (
              <Link
                key={t.id}
                href={`/tables/${t.id}`}
                className="flex items-start justify-between gap-3 p-4 rounded-[20px] bg-white shadow-[0_1px_2px_rgba(18,33,29,0.06),0_8px_24px_rgba(18,33,29,0.04)] text-[#12211D] no-underline hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col gap-1 flex-1 min-w-0">
                  <span className="self-start py-1 px-2.5 rounded-full bg-[#E2F0EA] text-[12px] leading-4 font-bold text-[#0B5D4B] mb-1">
                    {t.format}
                  </span>
                  <span className="text-[18px] leading-6 font-bold">{t.title}</span>
                  <span className="text-[13px] leading-[18px] font-semibold text-[#0B5D4B]">
                    {t.when}
                  </span>
                  <span className="text-[13px] leading-[19px] text-[#4A5852]">{t.desc}</span>
                  <span className="text-[12px] leading-4 text-[#4A5852] mt-0.5">{t.price}</span>
                </div>

                <div className="flex flex-col items-center gap-1 shrink-0">
                  <div aria-hidden="true" className="relative w-[88px] h-[88px]">
                    <div className="absolute left-6 top-6 w-10 h-10 rounded-full bg-[#E2F0EA]" />
                    {dots.map((d, idx) => (
                      <span
                        key={idx}
                        style={{ left: `${d.left}px`, top: `${d.top}px` }}
                        className={`absolute w-[18px] h-[18px] rounded-full box-border ${
                          d.isLocal
                            ? 'bg-[#0B5D4B]'
                            : d.isTrav
                              ? 'bg-[#FF7A59]'
                              : 'border-2 border-dashed border-[#7B8A84] bg-white'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] leading-[14px] font-semibold text-[#4A5852]">
                    {t.f} {t.f === 1 ? 'seat free' : 'seats free'}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Action: Open a seat at your own table */}
        <Link
          href="/tables/new"
          className="flex items-center justify-center h-14 rounded-[16px] bg-[#0B5D4B] text-[16px] font-bold text-white no-underline hover:bg-[#083F34] transition-colors"
        >
          Open a seat at your own table
        </Link>

        {/* Company Card Teaser */}
        <Link
          href="/company"
          className="flex items-center justify-between gap-3 p-4 rounded-[20px] bg-white shadow-[0_1px_2px_rgba(18,33,29,0.06),0_8px_24px_rgba(18,33,29,0.04)] text-[#12211D] no-underline hover:shadow-md transition-shadow"
        >
          <div className="flex flex-col gap-0.5">
            <span className="text-[16px] leading-[22px] font-bold">
              Prefer one person to a full table?
            </span>
            <span className="text-[13px] leading-[19px] text-[#4A5852]">
              Eat with one local, or hire a licensed guide.
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
      </div>
    </div>
  );
}
