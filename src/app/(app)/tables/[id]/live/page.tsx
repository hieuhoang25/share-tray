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
    <div className="w-full max-w-[390px] mx-auto min-h-screen bg-[#F3F5F2] text-[#12211D] flex flex-col font-sans pb-28">
      {/* Header section */}
      <div className="flex flex-col gap-2 px-5 pt-3">
        <Link
          href={`/tables/${id}`}
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
          The table
        </Link>
        <h1 className="m-0 text-[30px] leading-[36px] font-extrabold tracking-[-0.02em]">
          No awkward silence.
        </h1>
        <span className="text-[15px] leading-[22px] text-[#4A5852]">
          Put one phone in the middle of the table. Whoever draws the card answers first.
        </span>
      </div>

      <div className="flex flex-col gap-5 px-5 pt-4 flex-grow">
        {/* Conversation Card */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-3 p-[28px_24px] rounded-[28px] bg-[#083F34] text-white min-h-[180px]">
            <span className="text-[12px] leading-4 font-bold uppercase tracking-wider text-[#BFD8CF]">
              Card {cardIndex + 1} of {totalCards}
            </span>
            <span className="text-[24px] leading-8 font-bold tracking-[-0.01em]">
              {card.en}
            </span>
            <span className="text-[16px] leading-6 text-[#BFD8CF]">
              {card.vi}
            </span>
          </div>

          {/* Prev / Next Buttons */}
          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={handlePrev}
              className="flex items-center justify-center h-[52px] border-[1.5px] border-[#12211D] rounded-[16px] bg-white text-[15px] font-bold text-[#12211D] cursor-pointer hover:bg-neutral-50 transition-colors"
            >
              Previous card
            </button>
            <button
              onClick={handleNext}
              className="flex items-center justify-center h-[52px] border-[1.5px] border-[#12211D] rounded-[16px] bg-white text-[15px] font-bold text-[#12211D] cursor-pointer hover:bg-neutral-50 transition-colors"
            >
              Next card
            </button>
          </div>
        </div>

        {/* Table Rituals for Bún Chả */}
        <div className="flex flex-col gap-3 p-4 rounded-[20px] bg-white shadow-[0_1px_2px_rgba(18,33,29,0.06),0_8px_24px_rgba(18,33,29,0.04)]">
          <span className="text-[12px] leading-4 font-bold tracking-wider uppercase text-[#4A5852]">
            Table rituals for bún chả
          </span>
          <div className="flex gap-2.5 items-start">
            <span
              aria-hidden="true"
              className="w-2 h-2 mt-1.5 shrink-0 rounded-full bg-[#FF7A59]"
            />
            <span className="text-[14px] leading-5 text-[#12211D]">
              The youngest pours tea for the oldest first. Today that means Minh Anh serves Bác Hòa.
            </span>
          </div>
          <div className="flex gap-2.5 items-start">
            <span
              aria-hidden="true"
              className="w-2 h-2 mt-1.5 shrink-0 rounded-full bg-[#FF7A59]"
            />
            <span className="text-[14px] leading-5 text-[#12211D]">
              Dip, do not pour: a few noodles go into the warm broth bowl at a time.
            </span>
          </div>
          <div className="flex gap-2.5 items-start">
            <span
              aria-hidden="true"
              className="w-2 h-2 mt-1.5 shrink-0 rounded-full bg-[#FF7A59]"
            />
            <span className="text-[14px] leading-5 text-[#12211D]">
              The toast, all together: “Một, hai, ba, dô!” (moht, hi, bah, zo). One, two, three, cheers.
            </span>
          </div>
        </div>

        {/* Word Trade */}
        <div className="flex flex-col gap-2.5">
          <span className="text-[14px] leading-5 font-bold">
            Word trade: everyone teaches one word
          </span>
          <div className="grid grid-cols-2 gap-2.5">
            {WORDS.map((w) => (
              <div
                key={w.word}
                className="flex flex-col gap-0.5 p-[12px_14px] rounded-[16px] bg-white shadow-[0_1px_2px_rgba(18,33,29,0.06),0_8px_24px_rgba(18,33,29,0.04)]"
              >
                <span className="text-[17px] leading-6 font-bold text-[#0B5D4B]">{w.word}</span>
                <span className="text-[14px] leading-5">{w.meaning}</span>
                <span className="text-[12px] leading-4 text-[#4A5852]">{w.from}</span>
              </div>
            ))}
          </div>
        </div>

        {/* The Bill */}
        <div className="flex flex-col gap-1.5 p-4 rounded-[20px] bg-white shadow-[0_1px_2px_rgba(18,33,29,0.06),0_8px_24px_rgba(18,33,29,0.04)]">
          <span className="text-[12px] leading-4 font-bold tracking-wider uppercase text-[#4A5852]">
            The bill, without the awkward part
          </span>
          <span className="text-[13px] leading-[19px] text-[#4A5852]">
            Table total 300,000₫ · 6 people
          </span>
          <span className="text-[28px] leading-[34px] font-extrabold tracking-[-0.02em]">
            50,000₫ each
          </span>
          <span className="text-[13px] leading-[19px] text-[#4A5852]">
            Everyone hands their share to Thảo in cash. She pays the shop.
          </span>
        </div>

        {/* Bottom CTA */}
        <Link
          href={`/tables/${id}/after`}
          className="flex items-center justify-center h-14 rounded-[16px] bg-[#0B5D4B] text-[16px] font-bold text-white no-underline hover:bg-[#083F34] transition-colors"
        >
          We are done eating
        </Link>
      </div>

      {/* Footer */}
      <div className="mt-auto px-5 pt-6 pb-5 text-[12px] leading-4 text-[#4A5852] text-center">
        mâm · eat together in Việt Nam
      </div>
    </div>
  );
}
