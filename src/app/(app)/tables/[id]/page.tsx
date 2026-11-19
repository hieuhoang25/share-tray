'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';

interface Person {
  initial: string;
  name: string;
  who: string;
  ask: string;
  local: boolean;
}

const PEOPLE: Person[] = [
  {
    initial: 'T',
    name: 'Thảo · host',
    who: 'Hà Nội · marketing · Vietnamese, English',
    ask: 'where Hanoians really go at weekends',
    local: true,
  },
  {
    initial: 'M',
    name: 'Minh Anh',
    who: 'Hà Nội · university student · Vietnamese, English',
    ask: 'student life and eating well on very little',
    local: true,
  },
  {
    initial: 'H',
    name: 'Bác Hòa',
    who: 'Hà Nội · retired teacher · Vietnamese, French, English',
    ask: 'what this street looked like in the 1980s',
    local: true,
  },
  {
    initial: 'K',
    name: 'Kenji',
    who: 'Japan · hardware engineer · Japanese, English',
    ask: 'ramen against phở, and sensors',
    local: false,
  },
  {
    initial: 'A',
    name: 'Anna',
    who: 'Germany · photographer, three weeks in Việt Nam · German, English',
    ask: 'the northern loop by motorbike',
    local: false,
  },
];

export default function TableDetailScreen({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [taken, setTaken] = useState(false);

  // 6 seats in circle (c = 130, R = 96, d = 52)
  const traySeats = [
    { initial: 'T', local: true, trav: false, left: '104px', top: '8px' },
    { initial: 'M', local: true, trav: false, left: '187px', top: '56px' },
    { initial: 'H', local: true, trav: false, left: '187px', top: '152px' },
    { initial: 'K', local: false, trav: true, left: '104px', top: '200px' },
    { initial: 'A', local: false, trav: true, left: '21px', top: '152px' },
    {
      initial: 'YOU',
      local: false,
      trav: false,
      free: !taken,
      you: taken,
      left: '21px',
      top: '56px',
    },
  ];

  return (
    <div className="w-full max-w-[390px] mx-auto min-h-screen bg-[#F3F5F2] text-[#12211D] flex flex-col font-sans pb-28">
      {/* Header section */}
      <div className="flex flex-col gap-1.5 px-5 pt-3">
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
        <span className="self-start py-1 px-2.5 rounded-full bg-[#E2F0EA] text-[12px] leading-4 font-bold text-[#0B5D4B]">
          Half locals, half travellers
        </span>
        <h1 className="m-0 text-[30px] leading-[36px] font-extrabold tracking-[-0.02em] mt-1">
          Half &amp; half bún chả
        </h1>
        <span className="text-[15px] leading-[22px] text-[#4A5852]">
          Today 12:15 · Bún chả Ngõ 41 · 350 m from you · about one hour
        </span>
      </div>

      <div className="flex flex-col gap-5 px-5 pt-4 flex-grow">
        {/* Table Tray Graphic Card */}
        <div className="flex flex-col items-center gap-3.5 p-4 rounded-[20px] bg-white shadow-[0_1px_2px_rgba(18,33,29,0.06),0_8px_24px_rgba(18,33,29,0.04)]">
          <div aria-hidden="true" className="relative w-[260px] h-[260px]">
            {/* Center Tray */}
            <div className="absolute left-[66px] top-[66px] w-[128px] h-[128px] rounded-full bg-[#E2F0EA] text-[#083F34] flex flex-col items-center justify-center gap-0.5">
              <span className="text-[18px] leading-6 font-extrabold">Bún chả</span>
              <span className="text-[13px] leading-[18px] font-semibold">12:15 · 6 seats</span>
            </div>

            {/* 6 Seats around the tray */}
            {traySeats.map((s, idx) => {
              if (s.local) {
                return (
                  <div
                    key={idx}
                    style={{ left: s.left, top: s.top }}
                    className="absolute w-[52px] h-[52px] rounded-full bg-[#0B5D4B] text-white font-bold text-[18px] flex items-center justify-center shrink-0"
                  >
                    {s.initial}
                  </div>
                );
              }
              if (s.trav) {
                return (
                  <div
                    key={idx}
                    style={{ left: s.left, top: s.top }}
                    className="absolute w-[52px] h-[52px] rounded-full bg-[#FF7A59] text-[#12211D] font-bold text-[18px] flex items-center justify-center shrink-0"
                  >
                    {s.initial}
                  </div>
                );
              }
              if (s.you) {
                return (
                  <div
                    key={idx}
                    style={{ left: s.left, top: s.top }}
                    className="absolute w-[52px] h-[52px] rounded-full bg-[#FF7A59] text-[#12211D] font-bold text-[13px] border-3 border-[#12211D] flex items-center justify-center shrink-0"
                  >
                    YOU
                  </div>
                );
              }
              return (
                <div
                  key={idx}
                  style={{ left: s.left, top: s.top }}
                  className="absolute w-[52px] h-[52px] rounded-[26px] border-2 border-dashed border-[#7B8A84] bg-white box-border"
                />
              );
            })}
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
        </div>

        {/* Why this table fits you */}
        <div className="flex flex-col gap-0.5 p-3.5 rounded-[14px] bg-[#FFE9E1]">
          <span className="text-[14px] leading-5 font-bold text-[#8A2A12]">
            Why this table fits you
          </span>
          <span className="text-[14px] leading-5 text-[#12211D]">
            You asked for new friends. Two people here are travelling alone like you, and Kenji works in your field.
          </span>
        </div>

        {/* Who is at the table */}
        <div className="flex flex-col gap-3">
          <h2 className="m-0 text-[20px] leading-[26px] font-bold tracking-[-0.01em]">
            Who is at the table
          </h2>

          <div className="flex flex-col gap-3.5 p-4 rounded-[20px] bg-white shadow-[0_1px_2px_rgba(18,33,29,0.06),0_8px_24px_rgba(18,33,29,0.04)]">
            {PEOPLE.map((p) => (
              <div key={p.name} className="flex gap-3 items-start">
                <div
                  aria-hidden="true"
                  className={`w-11 h-11 shrink-0 rounded-full font-bold text-[16px] flex items-center justify-center ${
                    p.local ? 'bg-[#0B5D4B] text-white' : 'bg-[#FF7A59] text-[#12211D]'
                  }`}
                >
                  {p.initial}
                </div>
                <div className="flex flex-col gap-0.5 min-w-0">
                  <span className="text-[15px] leading-5 font-bold">{p.name}</span>
                  <span className="text-[12px] leading-[17px] text-[#4A5852]">{p.who}</span>
                  <span className="text-[13px] leading-[19px]">Ask me about: {p.ask}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Seat status box */}
          {!taken ? (
            <div className="flex items-center gap-3 p-3.5 border-2 border-dashed border-[#7B8A84] rounded-[20px]">
              <div
                aria-hidden="true"
                className="w-11 h-11 shrink-0 box-border rounded-full border-2 border-dashed border-[#7B8A84]"
              />
              <span className="text-[14px] leading-5 font-bold">
                One seat is free. It could be yours.
              </span>
            </div>
          ) : (
            <div
              role="status"
              className="flex items-center gap-3 p-3.5 rounded-[20px] bg-[#FF7A59] text-[#12211D]"
            >
              <div
                aria-hidden="true"
                className="w-11 h-11 shrink-0 rounded-full bg-[#FF7A59] text-[#12211D] font-bold text-[12px] border-3 border-[#12211D] flex items-center justify-center box-border"
              >
                YOU
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[15px] leading-5 font-bold">
                  You are in. See you at 12:15.
                </span>
                <span className="text-[13px] leading-[18px]">
                  The others can now see your table card. Thảo will wave when you arrive.
                </span>
              </div>
            </div>
          )}
        </div>

        {/* How the hour goes */}
        <div className="flex flex-col gap-3">
          <h2 className="m-0 text-[20px] leading-[26px] font-bold tracking-[-0.01em]">
            How the hour goes
          </h2>
          <div className="flex flex-col gap-3.5 p-4 rounded-[20px] bg-white shadow-[0_1px_2px_rgba(18,33,29,0.06),0_8px_24px_rgba(18,33,29,0.04)]">
            <div className="flex gap-3 items-start">
              <span
                aria-hidden="true"
                className="w-8 h-8 shrink-0 rounded-full bg-[#E2F0EA] text-[#0B5D4B] font-bold text-[14px] flex items-center justify-center"
              >
                1
              </span>
              <span className="text-[14px] leading-5">
                Thảo orders for everyone and shows how to eat it. Nobody has to read a menu.
              </span>
            </div>
            <div className="flex gap-3 items-start">
              <span
                aria-hidden="true"
                className="w-8 h-8 shrink-0 rounded-full bg-[#E2F0EA] text-[#0B5D4B] font-bold text-[14px] flex items-center justify-center"
              >
                2
              </span>
              <span className="text-[14px] leading-5">
                Question cards on your phone get the table talking. Everyone teaches one word.
              </span>
            </div>
            <div className="flex gap-3 items-start">
              <span
                aria-hidden="true"
                className="w-8 h-8 shrink-0 rounded-full bg-[#E2F0EA] text-[#0B5D4B] font-bold text-[14px] flex items-center justify-center"
              >
                3
              </span>
              <span className="text-[14px] leading-5">
                Afterwards you choose who to keep in touch with. Contacts are shared only when both say yes.
              </span>
            </div>
          </div>
        </div>

        {/* Costs & Table rules card */}
        <div className="flex flex-col gap-3 p-4 rounded-[20px] bg-white shadow-[0_1px_2px_rgba(18,33,29,0.06),0_8px_24px_rgba(18,33,29,0.04)]">
          <div className="flex flex-col gap-0.5">
            <span className="text-[14px] leading-5 font-bold">What it costs</span>
            <span className="text-[13px] leading-[19px] text-[#4A5852]">
              The bill is split evenly at the local price: about 50,000₫ each, plus [SEAT FEE]. A deposit of [DEPOSIT] comes back when you show up.
            </span>
          </div>
          <div className="h-[1px] bg-[#E6EBE8]" />
          <div className="flex flex-col gap-0.5">
            <span className="text-[14px] leading-5 font-bold">Table rules</span>
            <span className="text-[13px] leading-[19px] text-[#4A5852]">
              Everyone here has a verified ID. Public eating places only. It is a table for friendship and contacts, not dating. One tap reports anyone who breaks that.
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-1 pt-1">
          <button
            onClick={() => setTaken(!taken)}
            className="flex items-center justify-center h-14 border-none rounded-[16px] bg-[#0B5D4B] text-[16px] font-bold text-white cursor-pointer hover:bg-[#083F34] transition-colors"
          >
            {taken ? 'Give the seat back' : 'Take the seat'}
          </button>
          <Link
            href={`/tables/${id}/live`}
            className="flex items-center justify-center h-11 text-[14px] font-semibold text-[#0B5D4B] hover:text-[#083F34] transition-colors"
          >
            Preview what happens at the table
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto px-5 pt-6 pb-5 text-[12px] leading-4 text-[#4A5852] text-center">
        mâm · eat together in Việt Nam
      </div>
    </div>
  );
}
