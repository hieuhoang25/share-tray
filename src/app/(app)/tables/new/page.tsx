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
  } at ${placeName} ${currentWhenText}, for ${currentWhoText} looking for ${currentHopeText}. Everyone pays for their own bowl.`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/together');
  };

  return (
    <div className="w-full max-w-[390px] mx-auto min-h-screen bg-white text-ink flex flex-col font-sans pb-28">
      {/* Dark Header */}
      <div className="flex flex-col gap-1.5 px-5 pt-3 pb-5 bg-[#15171A] text-white">
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
        <h1 className="m-0 font-anton text-4xl leading-[46px] tracking-[0.01em]">
          OPEN A SEAT.
        </h1>
        <span className="text-sm leading-5 text-[#D5D9DE]">
          You are going to eat anyway. Leave a chair open and see who sits down. Travellers and locals can both do this.
        </span>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-[18px] p-5 flex-grow">
        {/* Where are you eating? */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="where" className="text-[13px] font-bold text-[#15171A]">
            Where are you eating?
          </label>
          <input
            id="where"
            type="text"
            placeholder="Phở Bà Tâm"
            value={where}
            onChange={(e) => setWhere(e.target.value)}
            className="h-12 px-3.5 border border-[#C5C9CE] rounded-[12px] font-sans text-[15px] text-[#15171A] bg-white focus:outline-none focus:border-[#15171A]"
          />
        </div>

        {/* When? */}
        <div className="flex flex-col gap-2">
          <span className="text-[13px] font-bold text-[#15171A]">When?</span>
          <div className="flex gap-2 flex-wrap">
            {WHEN_DEFS.map((w) => {
              const active = w.id === when;
              return (
                <button
                  key={w.id}
                  type="button"
                  onClick={() => setWhen(w.id)}
                  aria-pressed={active}
                  className={`h-11 px-3.5 rounded-[22px] font-sans text-[13px] transition-colors cursor-pointer ${
                    active
                      ? 'border-2 border-[#15171A] bg-[#15171A] font-bold text-white'
                      : 'border border-[#C5C9CE] bg-white font-normal text-[#15171A] hover:border-[#15171A]'
                  }`}
                >
                  {w.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* How many open seats? */}
        <div className="flex justify-between items-center">
          <span className="text-[13px] font-bold text-[#15171A]">How many open seats?</span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setSeats((s) => Math.max(1, s - 1))}
              aria-label="One seat fewer"
              className="w-11 h-11 border border-[#C5C9CE] rounded-[22px] bg-white font-sans text-xl text-[#15171A] flex items-center justify-center cursor-pointer hover:border-[#15171A]"
            >
              −
            </button>
            <span className="w-7 text-center text-lg font-bold text-[#15171A]">{seats}</span>
            <button
              type="button"
              onClick={() => setSeats((s) => Math.min(9, s + 1))}
              aria-label="One seat more"
              className="w-11 h-11 border border-[#C5C9CE] rounded-[22px] bg-white font-sans text-xl text-[#15171A] flex items-center justify-center cursor-pointer hover:border-[#15171A]"
            >
              +
            </button>
          </div>
        </div>

        {/* Who is welcome? */}
        <div className="flex flex-col gap-2">
          <span className="text-[13px] font-bold text-[#15171A]">Who is welcome?</span>
          <div className="flex gap-2 flex-wrap">
            {WHO_DEFS.map((wh) => {
              const active = wh.id === who;
              return (
                <button
                  key={wh.id}
                  type="button"
                  onClick={() => setWho(wh.id)}
                  aria-pressed={active}
                  className={`h-11 px-3.5 rounded-[22px] font-sans text-[13px] transition-colors cursor-pointer ${
                    active
                      ? 'border-2 border-[#15171A] bg-[#15171A] font-bold text-white'
                      : 'border border-[#C5C9CE] bg-white font-normal text-[#15171A] hover:border-[#15171A]'
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
          <span className="text-[13px] font-bold text-[#15171A]">What are you hoping for?</span>
          <div className="flex gap-2 flex-wrap">
            {HOPE_DEFS.map((hp) => {
              const active = hp.id === hope;
              return (
                <button
                  key={hp.id}
                  type="button"
                  onClick={() => setHope(hp.id)}
                  aria-pressed={active}
                  className={`h-11 px-3.5 rounded-[22px] font-sans text-[13px] transition-colors cursor-pointer ${
                    active
                      ? 'border-2 border-[#15171A] bg-[#15171A] font-bold text-white'
                      : 'border border-[#C5C9CE] bg-white font-normal text-[#15171A] hover:border-[#15171A]'
                  }`}
                >
                  {hp.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* YOUR TABLE CARD · WHAT OTHERS SEE */}
        <div className="flex flex-col gap-2 p-3.5 rounded-[12px] bg-[#FFF3D1]">
          <span className="text-xs font-bold tracking-[0.06em] text-[#5C4200]">
            YOUR TABLE CARD · WHAT OTHERS SEE
          </span>
          <span className="text-base font-bold text-[#15171A]">[YOUR FIRST NAME] · [COUNTRY]</span>
          <span className="text-[13px] leading-[19px] text-[#15171A]">
            [YOUR WORK] · speaks [LANGUAGES]
          </span>
          <div className="flex flex-col gap-1.5 mt-1">
            <label htmlFor="ask" className="text-[13px] font-semibold text-[#15171A]">
              Ask me about…
            </label>
            <input
              id="ask"
              type="text"
              placeholder="the best ramen in my home town"
              value={askMeAbout}
              onChange={(e) => setAskMeAbout(e.target.value)}
              className="h-12 px-3.5 border border-[#C9A94A] rounded-[12px] font-sans text-[15px] text-[#15171A] bg-white focus:outline-none"
            />
          </div>
        </div>

        {/* Summary box */}
        <div className="flex flex-col gap-1 p-3.5 rounded-[12px] bg-[#F1F2F4]">
          <span className="text-sm font-bold text-[#15171A]">
            Your table, as others will see it
          </span>
          <span className="text-[13px] leading-[19px] text-[#15171A]">{summaryText}</span>
        </div>

        <p className="m-0 text-xs leading-[18px] text-[#4A5059]">
          Người Việt mở bàn: hãy chọn quán quen của bạn. Khách tự trả phần ăn của họ, bạn có thêm bạn bè quốc tế.
        </p>

        {/* Open table button */}
        <button
          type="submit"
          className="mt-auto h-[52px] border-none rounded-[12px] bg-[#C8281E] font-sans text-base font-bold text-white cursor-pointer hover:bg-[#A31F17] transition-colors"
        >
          Open the table
        </button>
      </form>
    </div>
  );
}
