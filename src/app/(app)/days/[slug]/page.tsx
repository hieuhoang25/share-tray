'use client';

import React from 'react';
import Link from 'next/link';

interface Stop {
  time: string;
  dish: string;
  place: string;
  memory: string;
  meta: string;
}

const STOPS: Stop[] = [
  {
    time: '07:00',
    dish: 'Phở bò',
    place: 'Phở Bà Tâm',
    memory: '“My breakfast through four years of university. Bà Tâm still asks about my exams.”',
    meta: '45,000₫ · Curious',
  },
  {
    time: '09:30',
    dish: 'Cà phê trứng',
    place: 'Cà phê Ông Lâm',
    memory: '“Egg coffee on the second floor. I revised here for hours and nobody rushed me.”',
    meta: '30,000₫ · Gentle',
  },
  {
    time: '12:00',
    dish: 'Bún chả',
    place: 'Bún chả Ngõ 41',
    memory: '“Dad brought me here whenever my school report was good.”',
    meta: '50,000₫ · Curious',
  },
  {
    time: '15:30',
    dish: 'Chè',
    place: 'Chè Bà Thìn',
    memory: '“The after-school treat. Order the mixed one and stir it all together.”',
    meta: '15,000₫ · Gentle',
  },
  {
    time: '18:30',
    dish: 'Ốc luộc',
    place: 'Ốc Cô Hạnh',
    memory: '“Boiled snails, ginger fish sauce and gossip. This is how a Saturday ends.”',
    meta: '60,000₫ · Fearless',
  },
];

const OTHER_DAYS = [
  {
    slug: 'grandfather-morning',
    title: 'A grandfather’s morning',
    meta: 'Hoàn Kiếm · 3 stops · tea, xôi, chess by the lake',
  },
  {
    slug: 'night-shift-dinner',
    title: 'A night-shift driver’s dinner',
    meta: 'Ba Đình · 2 stops · open after midnight',
  },
  {
    slug: 'student-day',
    title: 'A student day on 100,000₫',
    meta: 'Cầu Giấy · 4 stops · everything under 30,000₫',
  },
];

export default function DayScreen() {
  return (
    <div className="w-full max-w-[390px] mx-auto min-h-screen bg-[#F3F5F2] text-[#12211D] flex flex-col font-sans pb-28">
      {/* Top Header container */}
      <div className="flex flex-col gap-4 p-5 sm:p-6">
        <div className="flex flex-col gap-1.5">
          <Link
            href="/"
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
            Back
          </Link>
          <span className="text-[12px] leading-4 font-bold tracking-wider uppercase text-[#0B5D4B]">
            Borrow a local’s day
          </span>
          <h1 className="m-0 text-[30px] leading-[36px] font-extrabold tracking-[-0.02em]">
            Linh’s Saturday
          </h1>
          <p className="m-0 text-[15px] leading-[22px] text-[#4A5852]">
            Linh, 29, grew up in Đống Đa. These are the five places she really eats at on a day off. None of them is famous.
          </p>
        </div>

        {/* 3-stat white card */}
        <div className="flex gap-3 p-4 rounded-[20px] bg-white shadow-[0_1px_2px_rgba(18,33,29,0.06),0_8px_24px_rgba(18,33,29,0.04)]">
          <div className="flex flex-col gap-0.5 flex-1">
            <span className="text-[18px] leading-6 font-extrabold">5</span>
            <span className="text-[12px] leading-4 text-[#4A5852]">stops</span>
          </div>
          <div className="flex flex-col gap-0.5 flex-1">
            <span className="text-[18px] leading-6 font-extrabold">2.1 km</span>
            <span className="text-[12px] leading-4 text-[#4A5852]">on foot</span>
          </div>
          <div className="flex flex-col gap-0.5 flex-1">
            <span className="text-[18px] leading-6 font-extrabold">200,000₫</span>
            <span className="text-[12px] leading-4 text-[#4A5852]">all day, about $7.70</span>
          </div>
        </div>

        {/* Stops timeline */}
        <div className="flex flex-col gap-2.5">
          {STOPS.map((s) => (
            <div key={s.time} className="flex gap-3">
              <span className="w-11 shrink-0 pt-4 text-[13px] leading-[18px] font-bold text-[#0B5D4B]">
                {s.time}
              </span>
              <div className="flex flex-col gap-1 flex-1 min-w-0 p-4 rounded-[20px] bg-white shadow-[0_1px_2px_rgba(18,33,29,0.06),0_8px_24px_rgba(18,33,29,0.04)]">
                <span className="text-[17px] leading-6 font-bold">{s.dish}</span>
                <span className="text-[14px] leading-5 font-semibold text-[#0B5D4B]">{s.place}</span>
                <span className="text-[14px] leading-5 text-[#4A5852]">{s.memory}</span>
                <span className="text-[12px] leading-4 font-semibold mt-0.5">{s.meta}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Big CTA */}
        <Link
          href="/places/pho-ba-tam"
          className="flex items-center justify-center h-14 rounded-[16px] bg-[#0B5D4B] text-[16px] font-bold text-white no-underline hover:bg-[#083F34] transition-colors"
        >
          Start Linh’s day
        </Link>

        {/* Other days you can borrow */}
        <div className="flex flex-col gap-2.5 mt-1">
          <h2 className="m-0 text-[20px] leading-[26px] font-bold tracking-[-0.01em]">
            Other days you can borrow
          </h2>
          {OTHER_DAYS.map((o) => (
            <Link
              key={o.slug}
              href={`/days/${o.slug}`}
              className="flex items-center justify-between gap-3 p-4 rounded-[20px] bg-white shadow-[0_1px_2px_rgba(18,33,29,0.06),0_8px_24px_rgba(18,33,29,0.04)] text-[#12211D] no-underline hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col gap-0.5">
                <span className="text-[15px] leading-5 font-bold">{o.title}</span>
                <span className="text-[13px] leading-[19px] text-[#4A5852]">{o.meta}</span>
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
          ))}
        </div>
      </div>
    </div>
  );
}
