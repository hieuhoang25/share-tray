'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';

const CARDS = [
  { en: 'What did you eat for breakfast as a child?', vi: 'Hồi nhỏ bạn hay ăn sáng món gì?' },
  { en: 'Which dish from home do you miss most right now?', vi: 'Lúc này bạn nhớ món quê nhà nào nhất?' },
  { en: 'What do visitors always get wrong about your country?', vi: 'Khách hay hiểu sai điều gì về đất nước bạn?' },
  { en: 'What work do you do, and which part of it do you love?', vi: 'Bạn làm nghề gì, và thích nhất điều gì ở công việc?' },
  { en: 'Teach the table one word that nobody here knows.', vi: 'Dạy cả bàn một từ mà chưa ai biết.' },
  { en: 'Where should the person on your left go next?', vi: 'Người ngồi bên trái bạn nên đi đâu tiếp theo?' },
];

const WORDS = [
  { word: 'Ngon quá!', meaning: 'So delicious!', from: 'Thảo · Vietnamese' },
  { word: 'Oishii', meaning: 'Delicious', from: 'Kenji · Japanese' },
  { word: 'Lecker', meaning: 'Tasty', from: 'Anna · German' },
  { word: 'Your word', meaning: 'Tap to add yours', from: 'You' },
];

export default function TableLiveScreen({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [cardIndex, setCardIndex] = useState(0);

  const card = CARDS[cardIndex];
  const totalCards = CARDS.length;

  const handlePrev = () => {
    setCardIndex((prev) => (prev + totalCards - 1) % totalCards);
  };

  const handleNext = () => {
    setCardIndex((prev) => (prev + 1) % totalCards);
  };

  return (
    <div className="w-full max-w-[390px] mx-auto min-h-screen bg-[#15171A] text-white flex flex-col font-sans p-5 gap-4 pb-28">
      {/* Back link */}
      <Link
        href={`/tables/${id}`}
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
        The table
      </Link>

      {/* Header title */}
      <div className="flex flex-col gap-1.5">
        <h1 className="m-0 font-anton text-[40px] leading-[46px] tracking-[0.01em]">
          NO AWKWARD SILENCE.
        </h1>
        <span className="text-sm leading-5 text-[#D5D9DE]">
          Put one phone in the middle of the table. Whoever draws the card answers first.
        </span>
      </div>

      {/* Conversation Card */}
      <div className="flex flex-col gap-2.5 p-[18px] rounded-[16px] bg-[#FFC72C] text-[#15171A]">
        <span className="text-[11px] font-bold tracking-[0.06em]">
          CARD {cardIndex + 1} OF {totalCards}
        </span>
        <span className="text-[22px] leading-[30px] font-bold">{card.en}</span>
        <span className="text-[15px] leading-[22px]">{card.vi}</span>
      </div>

      {/* Prev / Next Buttons */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={handlePrev}
          className="h-12 border border-[#6A717B] rounded-[12px] bg-transparent text-sm font-semibold text-white cursor-pointer hover:border-white transition-colors"
        >
          Previous card
        </button>
        <button
          onClick={handleNext}
          className="h-12 border-none rounded-[12px] bg-white text-sm font-bold text-[#15171A] cursor-pointer hover:bg-[#F1F2F4] transition-colors"
        >
          Next card
        </button>
      </div>

      {/* Table Rituals for Bún Chả */}
      <div className="flex flex-col gap-2.5 p-3.5 rounded-[12px] bg-[#22262B]">
        <span className="text-xs font-semibold tracking-[0.06em] text-[#B8BDC4]">
          TABLE RITUALS FOR BÚN CHẢ
        </span>
        <div className="flex gap-2.5 items-start">
          <span
            aria-hidden="true"
            className="w-2 h-2 mt-[7px] shrink-0 bg-[#FFC72C] inline-block"
          />
          <span className="text-sm leading-[21px] text-white">
            The youngest pours tea for the oldest first. Today that means Minh Anh serves Bác Hòa.
          </span>
        </div>
        <div className="flex gap-2.5 items-start">
          <span
            aria-hidden="true"
            className="w-2 h-2 mt-[7px] shrink-0 bg-[#FFC72C] inline-block"
          />
          <span className="text-sm leading-[21px] text-white">
            Dip, do not pour: a few noodles go into the warm broth bowl at a time.
          </span>
        </div>
        <div className="flex gap-2.5 items-start">
          <span
            aria-hidden="true"
            className="w-2 h-2 mt-[7px] shrink-0 bg-[#FFC72C] inline-block"
          />
          <span className="text-sm leading-[21px] text-white">
            The toast, all together: “Một, hai, ba, dô!” (moht, hi, bah, zo). One, two, three, cheers.
          </span>
        </div>
      </div>

      {/* Word Trade */}
      <div className="flex flex-col gap-2.5">
        <span className="text-[13px] font-semibold text-white">
          Word trade: everyone teaches one word
        </span>
        <div className="grid grid-cols-2 gap-2">
          {WORDS.map((w) => (
            <div
              key={w.word}
              className="flex flex-col gap-0.5 p-2.5 sm:p-3 border border-[#4A5059] rounded-[12px]"
            >
              <span className="text-base font-bold text-[#FFC72C]">{w.word}</span>
              <span className="text-xs text-[#D5D9DE]">{w.meaning}</span>
              <span className="text-xs text-[#B8BDC4]">{w.from}</span>
            </div>
          ))}
        </div>
      </div>

      {/* The Bill */}
      <div className="flex flex-col gap-1.5 p-3.5 rounded-[12px] bg-[#22262B]">
        <span className="text-xs font-semibold tracking-[0.06em] text-[#B8BDC4]">
          THE BILL, WITHOUT THE AWKWARD PART
        </span>
        <div className="flex justify-between items-baseline">
          <span className="text-sm text-white">Table total 300,000₫ · 6 people</span>
          <span className="text-xl font-bold text-[#FFC72C]">50,000₫ each</span>
        </div>
        <span className="text-[13px] leading-[19px] text-[#D5D9DE]">
          Pay your share in the app with your own card. Thảo pays the shop in cash.
        </span>
      </div>

      {/* Bottom CTA */}
      <Link
        href={`/tables/${id}/after`}
        className="mt-auto flex items-center justify-center h-[52px] rounded-[12px] bg-[#C8281E] text-base font-bold text-white no-underline hover:bg-[#A31F17] transition-colors"
      >
        We are done eating
      </Link>
    </div>
  );
}
