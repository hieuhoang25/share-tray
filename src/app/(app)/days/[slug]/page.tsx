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
    dish: 'PHỞ BÒ',
    place: 'Phở Bà Tâm',
    memory: '“My breakfast through four years of university. Bà Tâm still asks about my exams.”',
    meta: '45,000₫ · Curious',
  },
  {
    time: '09:30',
    dish: 'CÀ PHÊ TRỨNG',
    place: 'Cà phê Ông Lâm',
    memory: '“Egg coffee on the second floor. I revised here for hours and nobody rushed me.”',
    meta: '30,000₫ · Gentle',
  },
  {
    time: '12:00',
    dish: 'BÚN CHẢ',
    place: 'Bún chả Ngõ 41',
    memory: '“Dad brought me here whenever my school report was good.”',
    meta: '50,000₫ · Curious',
  },
  {
    time: '15:30',
    dish: 'CHÈ',
    place: 'Chè Bà Thìn',
    memory: '“The after-school treat. Order the mixed one and stir it all together.”',
    meta: '15,000₫ · Gentle',
  },
  {
    time: '18:30',
    dish: 'ỐC LUỘC',
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
    <div className="w-full max-w-[390px] mx-auto min-h-screen bg-white text-ink flex flex-col font-sans pb-28">
      {/* Top Header container */}
      <div className="flex flex-col gap-4 px-5 pt-3">
        <Link
          href="/"
          className="flex items-center gap-1.5 h-11 text-sm font-medium text-[#A31F17] no-underline hover:text-[#7C1711]"
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

        <div className="flex flex-col gap-1.5">
          <span className="text-[11px] font-semibold tracking-[0.06em] text-[#4A5059]">
            BORROW A LOCAL’S DAY
          </span>
          <h1 className="m-0 font-anton text-[46px] leading-[52px] tracking-[0.01em] text-[#15171A]">
            LINH’S SATURDAY
          </h1>
          <p className="m-0 text-sm leading-[21px] text-[#4A5059]">
            Linh, 29, grew up in Đống Đa. These are the five places she really eats at on a day off. None of them is famous.
          </p>
        </div>

        {/* 3-stat dark card */}
        <div className="grid grid-cols-3 gap-2 p-3.5 rounded-[12px] bg-[#15171A] text-white">
          <div className="flex flex-col gap-0.5">
            <span className="font-anton text-2xl text-[#FFC72C]">5</span>
            <span className="text-xs text-[#D5D9DE]">stops</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="font-anton text-2xl text-[#FFC72C]">2.1 KM</span>
            <span className="text-xs text-[#D5D9DE]">on foot</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="font-anton text-2xl text-[#FFC72C]">200,000₫</span>
            <span className="text-xs text-[#D5D9DE]">all day, about $7.70</span>
          </div>
        </div>

        {/* Stops timeline */}
        <div className="flex flex-col gap-3.5 pt-1">
          {STOPS.map((s) => (
            <div key={s.time} className="flex gap-3">
              <span className="w-[52px] shrink-0 font-anton text-xl leading-[30px] text-[#15171A]">
                {s.time}
              </span>
              <div className="flex flex-col gap-1 flex-grow min-w-0 pl-3 border-l-2 border-[#15171A]">
                <span className="self-start py-0.5 px-2.5 bg-[#C8281E] font-anton text-lg leading-[26px] text-[#FFC72C]">
                  {s.dish}
                </span>
                <span className="text-sm font-semibold text-[#15171A]">{s.place}</span>
                <span className="text-sm leading-[21px] text-[#15171A]">{s.memory}</span>
                <span className="text-xs text-[#4A5059]">{s.meta}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Big CTA */}
        <Link
          href="/places/pho-ba-tam"
          className="flex items-center justify-center h-[52px] rounded-[12px] bg-[#15171A] text-base font-bold text-[#FFC72C] no-underline hover:bg-[#22262B] transition-colors"
        >
          Start Linh’s day
        </Link>

        {/* Other days you can borrow */}
        <div className="flex flex-col gap-2 pt-2">
          <h2 className="m-0 text-base font-semibold text-[#15171A]">
            Other days you can borrow
          </h2>
          {OTHER_DAYS.map((o) => (
            <Link
              key={o.slug}
              href={`/days/${o.slug}`}
              className="flex flex-col justify-center gap-0.5 min-h-[52px] py-2 px-3.5 border border-[#E2E4E7] rounded-[12px] text-[#15171A] no-underline hover:border-[#15171A] transition-colors"
            >
              <span className="text-sm font-semibold">{o.title}</span>
              <span className="text-xs text-[#4A5059]">{o.meta}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer bar */}
      <div className="mt-auto flex justify-between items-center gap-3 py-3 px-5 border-t border-[#E2E4E7] mt-6">
        <span className="text-[13px] text-[#4A5059]">Stuck at any stop?</span>
        <Link
          href="/help"
          className="flex items-center justify-center h-11 px-4 border border-[#A31F17] rounded-[22px] text-sm font-semibold text-[#A31F17] no-underline hover:bg-[#A31F17]/10 transition-colors"
        >
          Call a local
        </Link>
      </div>
    </div>
  );
}
