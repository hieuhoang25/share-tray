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
    <div className="w-full max-w-[390px] mx-auto min-h-screen bg-[#F3F5F2] text-[#12211D] flex flex-col font-sans pb-28">
      {/* Header section */}
      <div className="flex flex-col gap-2 px-5 pt-3">
        <Link
          href="/together"
          className="flex items-center gap-1.5 h-11 self-start text-[14px] font-semibold text-[#0B5D4B] no-underline hover:text-[#083F34] transition-colors"
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
        <h1 className="m-0 text-[30px] leading-[36px] font-extrabold tracking-[-0.02em]">
          One local, just for you.
        </h1>
        <span className="text-[15px] leading-[22px] text-[#4A5852]">
          Not in the mood for a full table? Share one meal with one local, or book a licensed guide for a few hours.
        </span>

        {/* 2 Tabs */}
        <div className="grid grid-cols-2 gap-1 mt-2 p-1 rounded-[16px] bg-white">
          <button
            onClick={() => setMode('meal')}
            aria-pressed={mode === 'meal'}
            className={`h-12 border-none rounded-[12px] font-sans text-[13px] transition-colors cursor-pointer ${
              mode === 'meal'
                ? 'bg-[#0B5D4B] font-bold text-white'
                : 'bg-transparent font-medium text-[#12211D]'
            }`}
          >
            Eat with one local
          </button>
          <button
            onClick={() => setMode('guide')}
            aria-pressed={mode === 'guide'}
            className={`h-12 border-none rounded-[12px] font-sans text-[13px] transition-colors cursor-pointer ${
              mode === 'guide'
                ? 'bg-[#0B5D4B] font-bold text-white'
                : 'bg-transparent font-medium text-[#12211D]'
            }`}
          >
            Hire a licensed guide
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3.5 p-5 flex-grow">
        <p className="m-0 text-[14px] leading-5 text-[#4A5852]">{activeData.intro}</p>

        {/* Cards */}
        {activeData.cards.map((c) => {
          const isSent = !!requested[c.name];
          return (
            <div
              key={c.name}
              className="flex flex-col gap-2 p-4 rounded-[20px] bg-white shadow-[0_1px_2px_rgba(18,33,29,0.06),0_8px_24px_rgba(18,33,29,0.04)]"
            >
              <div className="flex items-center gap-3">
                <div
                  aria-hidden="true"
                  className="w-12 h-12 shrink-0 rounded-full bg-[#0B5D4B] text-white font-bold text-[18px] flex items-center justify-center"
                >
                  {c.initial}
                </div>
                <div className="flex flex-col gap-0.5 min-w-0">
                  <span className="text-[16px] leading-[22px] font-bold">{c.name}</span>
                  <span className="text-[12px] leading-[17px] text-[#4A5852]">{c.who}</span>
                </div>
              </div>

              <span className="text-[15px] leading-[22px]">{c.plan}</span>
              <span className="text-[13px] leading-[18px] font-semibold text-[#0B5D4B]">
                {c.when}
              </span>
              <span className="text-[13px] leading-[19px] text-[#4A5852]">{c.price}</span>

              <div className="flex justify-between items-center gap-2.5 mt-1">
                <span className="self-center py-1 px-2.5 rounded-full bg-[#E2F0EA] text-[12px] leading-4 font-bold text-[#0B5D4B]">
                  {c.badge}
                </span>
                <button
                  onClick={() => handleAction(c.name)}
                  className={`h-11 px-4 shrink-0 rounded-[14px] font-sans text-[14px] font-bold transition-colors cursor-pointer ${
                    isSent
                      ? 'border border-[#C5C9CE] bg-[#F1F2F4] text-[#4A5852]'
                      : 'border-none bg-[#0B5D4B] text-white hover:bg-[#083F34]'
                  }`}
                >
                  {isSent ? 'Sent' : c.cta}
                </button>
              </div>
            </div>
          );
        })}

        {/* How we keep this safe */}
        <div className="flex flex-col gap-2 p-4 rounded-[20px] bg-white shadow-[0_1px_2px_rgba(18,33,29,0.06),0_8px_24px_rgba(18,33,29,0.04)]">
          <span className="text-[14px] leading-5 font-bold">How we keep this safe</span>
          <ul className="m-0 pl-[18px] flex flex-col gap-1.5 text-[13px] leading-[19px] text-[#4A5852]">
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
