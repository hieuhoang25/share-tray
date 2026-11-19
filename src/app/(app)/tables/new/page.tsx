'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const WHEN_DEFS = [
  { id: 'soon', label: 'In 30 minutes', text: 'in 30 minutes' },
  { id: 'noon', label: 'Today 12:00', text: 'today at 12:00' },
  { id: 'tonight', label: 'Tonight 19:00', text: 'tonight at 19:00' },
  { id: 'pick', label: 'Pick a time', text: 'at a time you pick' },
];

const WHO_DEFS = [
  { id: 'any', label: 'Anyone', text: 'anyone' },
  { id: 'mix', label: 'Half locals, half travellers', text: 'a mix of locals and travellers' },
  { id: 'women', label: 'Women only', text: 'women only' },
  { id: 'trade', label: 'People in my field', text: 'people in your field' },
];

const HOPE_DEFS = [
  { id: 'friends', label: 'New friends', text: 'new friends' },
  { id: 'work', label: 'Work contacts', text: 'work contacts' },
  { id: 'language', label: 'Language practice', text: 'language practice' },
  { id: 'buddies', label: 'Travel buddies', text: 'travel buddies' },
];

export default function NewTableScreen() {
  const router = useRouter();
  const [where, setWhere] = useState('Phở Bà Tâm');
  const [when, setWhen] = useState('soon');
  const [seats, setSeats] = useState(2);
  const [who, setWho] = useState('mix');
  const [hope, setHope] = useState('friends');
  const [askMeAbout, setAskMeAbout] = useState('');

  const currentWhenText = WHEN_DEFS.find((d) => d.id === when)?.text || 'in 30 minutes';
  const currentWhoText = WHO_DEFS.find((d) => d.id === who)?.text || 'a mix of locals and travellers';
  const currentHopeText = HOPE_DEFS.find((d) => d.id === hope)?.text || 'new friends';

  const placeName = where.trim() || 'Phở Bà Tâm';
  const summaryText = `${seats} ${
    seats === 1 ? 'open seat' : 'open seats'
  } at ${placeName}, ${currentWhenText}, for ${currentWhoText} looking for ${currentHopeText}.`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/together');
  };

  return (
    <div className="w-full max-w-[390px] mx-auto min-h-screen bg-[#F3F5F2] text-[#12211D] flex flex-col font-sans pb-28">
      {/* Header */}
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
          Open a seat.
        </h1>
        <span className="text-[15px] leading-[22px] text-[#4A5852]">
          You are going to eat anyway. Leave a chair open and see who sits down. Travellers and locals can both do this.
        </span>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-5 flex-grow">
        {/* Where are you eating? */}
        <div className="flex flex-col gap-2">
          <label htmlFor="where" className="text-[14px] leading-5 font-bold">
            Where are you eating?
          </label>
          <input
            id="where"
            type="text"
            placeholder="Phở Bà Tâm"
            value={where}
            onChange={(e) => setWhere(e.target.value)}
            className="h-[52px] px-3.5 border-[1.5px] border-[#DCE2DE] rounded-[14px] bg-white font-sans text-[15px] text-[#12211D] focus:outline-none focus:border-[#0B5D4B]"
          />
        </div>

        {/* When? */}
        <div className="flex flex-col gap-2">
          <span className="text-[14px] leading-5 font-bold">When?</span>
          <div className="flex gap-2 flex-wrap">
            {WHEN_DEFS.map((w) => {
              const active = w.id === when;
              return (
                <button
                  key={w.id}
                  type="button"
                  onClick={() => setWhen(w.id)}
                  aria-pressed={active}
                  className={`h-11 px-4 rounded-[22px] font-sans text-[14px] transition-colors cursor-pointer ${
                    active
                      ? 'border-[1.5px] border-[#0B5D4B] bg-[#0B5D4B] font-semibold text-white'
                      : 'border-[1.5px] border-[#DCE2DE] bg-white font-medium text-[#12211D] hover:border-[#0B5D4B]'
                  }`}
                >
                  {w.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* How many open seats? */}
        <div className="flex justify-between items-center gap-3">
          <span className="text-[14px] leading-5 font-bold">How many open seats?</span>
          <div className="flex items-center gap-3.5">
            <button
              type="button"
              onClick={() => setSeats((s) => Math.max(1, s - 1))}
              aria-label="One seat fewer"
              className="w-12 h-12 rounded-full border-[1.5px] border-[#DCE2DE] bg-white font-sans text-[22px] font-semibold text-[#12211D] flex items-center justify-center cursor-pointer hover:border-[#0B5D4B]"
            >
              −
            </button>
            <span className="min-w-[20px] text-center text-[24px] font-extrabold text-[#12211D]">
              {seats}
            </span>
            <button
              type="button"
              onClick={() => setSeats((s) => Math.min(9, s + 1))}
              aria-label="One seat more"
              className="w-12 h-12 rounded-full border-none bg-[#0B5D4B] font-sans text-[22px] font-semibold text-white flex items-center justify-center cursor-pointer hover:bg-[#083F34]"
            >
              +
            </button>
          </div>
        </div>

        {/* Who is welcome? */}
        <div className="flex flex-col gap-2">
          <span className="text-[14px] leading-5 font-bold">Who is welcome?</span>
          <div className="flex gap-2 flex-wrap">
            {WHO_DEFS.map((wh) => {
              const active = wh.id === who;
              return (
                <button
                  key={wh.id}
                  type="button"
                  onClick={() => setWho(wh.id)}
                  aria-pressed={active}
                  className={`h-11 px-4 rounded-[22px] font-sans text-[14px] transition-colors cursor-pointer ${
                    active
                      ? 'border-[1.5px] border-[#0B5D4B] bg-[#0B5D4B] font-semibold text-white'
                      : 'border-[1.5px] border-[#DCE2DE] bg-white font-medium text-[#12211D] hover:border-[#0B5D4B]'
                  }`}
                >
                  {wh.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* What are you hoping for? */}
        <div className="flex flex-col gap-2">
          <span className="text-[14px] leading-5 font-bold">What are you hoping for?</span>
          <div className="flex gap-2 flex-wrap">
            {HOPE_DEFS.map((hp) => {
              const active = hp.id === hope;
              return (
                <button
                  key={hp.id}
                  type="button"
                  onClick={() => setHope(hp.id)}
                  aria-pressed={active}
                  className={`h-11 px-4 rounded-[22px] font-sans text-[14px] transition-colors cursor-pointer ${
                    active
                      ? 'border-[1.5px] border-[#0B5D4B] bg-[#0B5D4B] font-semibold text-white'
                      : 'border-[1.5px] border-[#DCE2DE] bg-white font-medium text-[#12211D] hover:border-[#0B5D4B]'
                  }`}
                >
                  {hp.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* YOUR TABLE CARD · WHAT OTHERS SEE */}
        <div className="flex flex-col gap-1.5 p-4 rounded-[20px] bg-white shadow-[0_1px_2px_rgba(18,33,29,0.06),0_8px_24px_rgba(18,33,29,0.04)]">
          <span className="text-[12px] leading-4 font-bold tracking-wider uppercase text-[#4A5852]">
            Your table card · what others see
          </span>
          <span className="text-[17px] leading-6 font-bold">[YOUR FIRST NAME] · [COUNTRY]</span>
          <span className="text-[13px] leading-[19px] text-[#4A5852]">
            [YOUR WORK] · speaks [LANGUAGES]
          </span>
          <div className="flex flex-col gap-2 mt-2">
            <label htmlFor="ask" className="text-[14px] leading-5 font-bold">
              Ask me about…
            </label>
            <input
              id="ask"
              type="text"
              placeholder="the best ramen in my home town"
              value={askMeAbout}
              onChange={(e) => setAskMeAbout(e.target.value)}
              className="h-[52px] px-3.5 border-[1.5px] border-[#DCE2DE] rounded-[14px] bg-white font-sans text-[15px] text-[#12211D] focus:outline-none focus:border-[#0B5D4B]"
            />
          </div>
        </div>

        {/* Dynamic summary box */}
        <div className="flex flex-col gap-0.5 p-3.5 rounded-[14px] bg-[#E2F0EA] text-[#083F34]">
          <span className="text-[14px] leading-5 font-bold">
            Your table, as others will see it
          </span>
          <span className="text-[14px] leading-5">{summaryText}</span>
        </div>

        <p className="m-0 text-[13px] leading-[19px] text-[#4A5852]">
          Người Việt mở bàn: hãy chọn quán quen của bạn. Khách tự trả phần ăn của họ, bạn có thêm bạn bè quốc tế.
        </p>

        {/* Open table button */}
        <button
          type="submit"
          className="flex items-center justify-center h-14 border-none rounded-[16px] bg-[#0B5D4B] font-sans text-[16px] font-bold text-white cursor-pointer hover:bg-[#083F34] transition-colors"
        >
          Open the table
        </button>
      </form>

      {/* Footer */}
      <div className="mt-auto px-5 pt-6 pb-5 text-[12px] leading-4 text-[#4A5852] text-center">
        mâm · eat together in Việt Nam
      </div>
    </div>
  );
}
