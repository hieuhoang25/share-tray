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
    title: 'HALF & HALF BÚN CHẢ',
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
    title: 'SIX STRANGERS, ONE SURPRISE',
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
    title: 'BIA HƠI THURSDAY',
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
    title: 'CHÈ & STREET SNACKS',
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
    title: 'ENGINEERS’ HOT POT',
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
    title: 'LUNCH WITH AN OFFICE TEAM',
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
    title: 'ENGLISH × VIETNAMESE LUNCH',
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
    title: 'HỘI AN NEXT WEEK?',
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

export default function TogetherScreen() {
  const [curPurpose, setCurPurpose] = useState('friends');

  const visibleTables = ALL_TABLES.filter((t) => t.for.includes(curPurpose));

  return (
    <div className="w-full max-w-[390px] mx-auto min-h-screen bg-white text-ink flex flex-col font-sans pb-28">
      {/* Dark Header */}
      <div className="flex flex-col gap-2 p-5 bg-[#15171A] text-white">
        <h1 className="m-0 font-anton text-[40px] leading-[46px] tracking-[0.01em]">
          EAT TOGETHER. LEAVE WITH FRIENDS.
        </h1>
        <span className="text-sm leading-5 text-[#D5D9DE]">
          Every table mixes Vietnamese locals and travellers. You come for the food and go home with people you know.
        </span>
      </div>

      <div className="flex flex-col gap-4 p-4 sm:p-5 flex-grow">
        {/* Happening now red card */}
        <div className="flex flex-col gap-2 p-[18px] rounded-[16px] bg-[#C8281E] text-white">
          <span className="text-[11px] font-semibold tracking-[0.06em] text-[#FFE3DF]">
            HAPPENING NOW · 350 M FROM YOU
          </span>
          <span className="font-anton text-[28px] leading-[34px] text-[#FFC72C]">
            A TABLE IN 25 MINUTES
          </span>
          <span className="text-sm leading-5">
            Three locals and two travellers are sitting down for bún chả at 12:15. One seat is still free.
          </span>
          <Link
            href="/tables/1"
            className="flex items-center justify-center h-12 mt-1 rounded-[12px] bg-[#FFC72C] text-[15px] font-bold text-[#15171A] no-underline hover:bg-[#ffd966] transition-colors"
          >
            See who is at the table
          </Link>
        </div>

        {/* Purpose Filter Chips */}
        <div className="flex flex-col gap-2">
          <span className="text-[13px] font-bold">What are you hoping for?</span>
          <div className="flex gap-2 flex-wrap">
            {PURPOSES.map((p) => {
              const active = p.id === curPurpose;
              return (
                <button
                  key={p.id}
                  onClick={() => setCurPurpose(p.id)}
                  aria-pressed={active}
                  className={`h-11 px-3.5 rounded-[22px] font-sans text-[13px] transition-colors ${
                    active
                      ? 'border-2 border-[#15171A] bg-[#15171A] font-bold text-white'
                      : 'border border-[#C5C9CE] bg-white font-medium text-[#15171A] hover:border-[#15171A]'
                  }`}
                >
                  {p.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tables list */}
        <div className="flex flex-col gap-3">
          {visibleTables.map((t) => (
            <Link
              key={t.id}
              href={`/tables/${t.id}`}
              className="flex flex-col gap-1.5 p-3.5 border border-[#E2E4E7] rounded-[12px] text-[#15171A] no-underline hover:border-[#15171A] transition-colors"
            >
              <span className="self-start py-0.5 px-2 rounded-[6px] bg-[#15171A] text-[11px] font-semibold text-white">
                {t.format}
              </span>
              <span className="font-anton text-[22px] leading-7">{t.title}</span>
              <span className="text-[13px] font-semibold">{t.when}</span>
              <span className="text-[13px] leading-[19px] text-[#4A5059]">{t.desc}</span>

              {/* Seat dots & counts */}
              <div className="flex items-center gap-2.5 mt-0.5">
                <div aria-hidden="true" className="flex gap-1 items-center">
                  {Array.from({ length: t.l }).map((_, i) => (
                    <span
                      key={`l-${i}`}
                      className="w-4 h-4 rounded-full bg-[#C8281E] inline-block shrink-0"
                    />
                  ))}
                  {Array.from({ length: t.t }).map((_, i) => (
                    <span
                      key={`t-${i}`}
                      className="w-4 h-4 box-border rounded-full bg-[#FFC72C] border-2 border-[#15171A] inline-block shrink-0"
                    />
                  ))}
                  {Array.from({ length: t.f }).map((_, i) => (
                    <span
                      key={`f-${i}`}
                      className="w-4 h-4 box-border rounded-full border-2 border-dashed border-[#8A9099] inline-block shrink-0"
                    />
                  ))}
                </div>
                <span className="text-xs font-semibold text-[#15171A]">
                  {t.l} locals · {t.t} travellers · {t.f} free
                </span>
              </div>

              <span className="text-xs text-[#4A5059]">{t.price}</span>
            </Link>
          ))}
        </div>

        {/* Action: Open a seat at your own table */}
        <Link
          href="/tables/new"
          className="flex items-center justify-center h-[52px] rounded-[12px] bg-[#15171A] text-base font-bold text-[#FFC72C] no-underline hover:bg-[#22262B] transition-colors"
        >
          Open a seat at your own table
        </Link>

        {/* Company Card */}
        <Link
          href="/company"
          className="flex flex-col gap-0.5 p-3.5 border border-[#E2E4E7] rounded-[12px] text-[#15171A] no-underline hover:border-[#15171A] transition-colors"
        >
          <span className="text-sm font-bold">Prefer one person to a full table?</span>
          <span className="text-[13px] text-[#4A5059]">Eat with one local, or hire a licensed guide.</span>
        </Link>
      </div>
    </div>
  );
}
