'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const MEAL_DATA = {
  intro:
    'A local joins you for one meal at a place they love. They order, explain the dish and tell you why it matters to them.',
  cards: [
    {
      initial: 'T',
      name: 'Thảo, 26',
      who: 'Office worker, grew up in Hai Bà Trưng · English',
      plan: 'Bún chả lunch at the shop her dad took her to on good-report days.',
      when: 'Today 12:00 · about 1 hour',
      price: 'You pay both meals (about 100,000₫) + [HOST FEE]',
      badge: 'ID verified · 14 meals hosted',
      cta: 'Ask to join',
    },
    {
      initial: 'H',
      name: 'Bác Hòa, 63',
      who: 'Retired teacher · English, French',
      plan: 'Morning phở and a pot of tea, then a slow walk round the lake.',
      when: 'Tomorrow 07:00 · about 2 hours',
      price: 'You pay both meals (about 120,000₫) + [HOST FEE]',
      badge: 'ID verified · 31 meals hosted',
      cta: 'Ask to join',
    },
  ],
};

const GUIDE_DATA = {
  intro:
    'A licensed guide stays with you for a few hours: food, streets, markets, at your pace. The guide card is shown in the app.',
  cards: [
    {
      initial: 'Q',
      name: 'Quang, 34',
      who: 'Licensed international guide · English, Japanese',
      plan: 'Three-hour food walk, five stops, with the stories behind each dish.',
      when: 'Free today from 15:00',
      price: '[GUIDE RATE] per hour + food at local prices',
      badge: 'Guide card checked · 87 walks',
      cta: 'Book Quang',
    },
    {
      initial: 'M',
      name: 'Mai, 29',
      who: 'Licensed international guide · English, Korean',
      plan: 'Half a day: morning market, then cooking one dish in her aunt’s kitchen.',
      when: 'Free tomorrow morning',
      price: '[GUIDE RATE] per hour + ingredients',
      badge: 'Guide card checked · 41 walks',
      cta: 'Book Mai',
    },
  ],
};

export default function CompanyScreen() {
  const [mode, setMode] = useState<'meal' | 'guide'>('meal');
  const [requested, setRequested] = useState<Record<string, boolean>>({});

  const activeData = mode === 'meal' ? MEAL_DATA : GUIDE_DATA;

  const handleAction = (name: string) => {
    setRequested((prev) => ({ ...prev, [name]: true }));
  };

  return (
    <div className="w-full max-w-[390px] mx-auto min-h-screen bg-white text-ink flex flex-col font-sans pb-28">
      {/* Dark Header */}
      <div className="flex flex-col gap-2.5 px-5 pt-3 pb-5 bg-[#15171A] text-white">
        <Link
          href="/together"
          className="flex items-center gap-1.5 h-11 text-sm font-medium text-[#FFC72C] no-underline"
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 5l-7 7 7 7" />
          </svg>
          All tables
        </Link>
        <h1 className="m-0 font-anton text-[44px] leading-[50px] tracking-[0.01em]">
          ONE LOCAL, JUST FOR YOU.
        </h1>
        <span className="text-sm leading-5 text-[#D5D9DE]">
          Not in the mood for a full table? Share one meal with one local, or book a licensed guide for a few hours.
        </span>

        {/* 2 Tabs */}
        <div className="grid grid-cols-2 gap-2 mt-1">
          <button
            onClick={() => setMode('meal')}
            aria-pressed={mode === 'meal'}
            className={`h-12 px-1 rounded-[10px] font-sans text-[13px] transition-colors cursor-pointer ${
              mode === 'meal'
                ? 'border-2 border-[#FFC72C] bg-[#FFC72C] font-bold text-[#15171A]'
                : 'border border-[#6A717B] bg-transparent font-medium text-white hover:border-white'
            }`}
          >
            Eat with one local
          </button>
          <button
            onClick={() => setMode('guide')}
            aria-pressed={mode === 'guide'}
            className={`h-12 px-1 rounded-[10px] font-sans text-[13px] transition-colors cursor-pointer ${
              mode === 'guide'
                ? 'border-2 border-[#FFC72C] bg-[#FFC72C] font-bold text-[#15171A]'
                : 'border border-[#6A717B] bg-transparent font-medium text-white hover:border-white'
            }`}
          >
            Hire a licensed guide
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3.5 p-4 sm:p-5 flex-grow">
        <p className="m-0 text-sm leading-[21px] text-[#15171A]">{activeData.intro}</p>

        {/* Cards */}
        {activeData.cards.map((c) => {
          const isSent = !!requested[c.name];
          return (
            <div
              key={c.name}
              className="flex flex-col gap-2.5 p-3.5 border border-[#E2E4E7] rounded-[12px]"
            >
              <div className="flex items-center gap-3">
                <div
                  aria-hidden="true"
                  className="w-12 h-12 shrink-0 rounded-full bg-[#C8281E] text-[#FFC72C] font-anton text-xl flex items-center justify-center"
                >
                  {c.initial}
                </div>
                <div className="flex flex-col gap-0.5 min-w-0">
                  <span className="text-base font-bold text-[#15171A]">{c.name}</span>
                  <span className="text-[13px] text-[#4A5059]">{c.who}</span>
                </div>
              </div>

              <span className="text-sm leading-5 text-[#15171A]">{c.plan}</span>
              <span className="text-[13px] font-semibold text-[#15171A]">{c.when}</span>
              <span className="text-[13px] leading-[19px] text-[#4A5059]">{c.price}</span>

              <div className="flex justify-between items-center gap-2.5 pt-1">
                <span className="text-xs font-semibold text-[#1F6B45]">{c.badge}</span>
                <button
                  onClick={() => handleAction(c.name)}
                  className={`h-11 px-4.5 shrink-0 rounded-[22px] font-sans text-sm font-bold transition-colors cursor-pointer ${
                    isSent
                      ? 'border border-[#C5C9CE] bg-[#F1F2F4] text-[#4A5059]'
                      : 'border-none bg-[#15171A] text-[#FFC72C] hover:bg-[#22262B]'
                  }`}
                >
                  {isSent ? 'Sent' : c.cta}
                </button>
              </div>
            </div>
          );
        })}

        {/* How we keep this safe */}
        <div className="flex flex-col gap-2 p-3.5 rounded-[12px] bg-[#F1F2F4]">
          <span className="text-sm font-bold text-[#15171A]">How we keep this safe</span>
          <ul className="m-0 pl-[18px] flex flex-col gap-1 text-[13px] leading-[19px] text-[#15171A]">
            <li>Every host and guide shows a verified ID and real past reviews.</li>
            <li>You meet only at public eating places listed in the app.</li>
            <li>Prices are fixed and shown before you confirm. No tips are expected.</li>
            <li>Share your live plan with a friend. Either side can leave and report.</li>
            <li>This is company for a meal. It is not a dating service.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
