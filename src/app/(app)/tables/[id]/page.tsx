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

  return (
    <div className="w-full max-w-[390px] mx-auto min-h-screen bg-white text-ink flex flex-col font-sans pb-28">
      {/* Red Header */}
      <div className="flex flex-col gap-1.5 px-5 pt-3 pb-5 bg-[#C8281E] text-white">
        <Link
          href="/together"
          className="flex items-center gap-1.5 h-11 text-sm font-medium text-white no-underline"
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
        <span className="self-start py-0.5 px-2 rounded-[6px] bg-[#15171A] text-[11px] font-semibold text-white">
          Half locals, half travellers
        </span>
        <h1 className="m-0 font-anton text-4xl leading-[42px] text-[#FFC72C]">
          HALF &amp; HALF BÚN CHẢ
        </h1>
        <span className="text-sm leading-5 text-white">
          Today 12:15 · Bún chả Ngõ 41 · 350 m from you · about one hour
        </span>
      </div>

      <div className="flex flex-col gap-4 p-4 sm:p-5 flex-grow">
        {/* Why this table fits you */}
        <div className="flex flex-col gap-0.5 p-3.5 rounded-[12px] bg-[#FFF3D1]">
          <span className="text-[13px] font-bold text-[#5C4200]">Why this table fits you</span>
          <span className="text-[13px] leading-[19px] text-[#15171A]">
            You asked for new friends. Two people here are travelling alone like you, and Kenji works in your field.
          </span>
        </div>

        {/* WHO IS AT THE TABLE */}
        <div className="flex flex-col gap-2.5">
          <h2 className="m-0 font-anton text-[22px] tracking-[0.02em] text-[#15171A]">
            WHO IS AT THE TABLE
          </h2>

          {PEOPLE.map((p) => (
            <div
              key={p.name}
              className="flex gap-3 p-3 border border-[#E2E4E7] rounded-[12px] items-center"
            >
              {p.local ? (
                <div
                  aria-hidden="true"
                  className="w-11 h-11 shrink-0 rounded-full bg-[#C8281E] text-[#FFC72C] font-anton text-lg flex items-center justify-center"
                >
                  {p.initial}
                </div>
              ) : (
                <div
                  aria-hidden="true"
                  className="w-11 h-11 shrink-0 box-border rounded-full bg-[#FFC72C] border-2 border-[#15171A] text-[#15171A] font-anton text-lg flex items-center justify-center"
                >
                  {p.initial}
                </div>
              )}
              <div className="flex flex-col gap-0.5 min-w-0">
                <span className="text-[15px] font-bold text-[#15171A]">{p.name}</span>
                <span className="text-xs text-[#4A5059]">{p.who}</span>
                <span className="text-[13px] leading-[18px] text-[#15171A]">
                  Ask me about: {p.ask}
                </span>
              </div>
            </div>
          ))}

          {/* Seat status: free vs taken */}
          {!taken ? (
            <div className="flex items-center gap-3 p-3 border-2 border-dashed border-[#8A9099] rounded-[12px]">
              <div
                aria-hidden="true"
                className="w-11 h-11 shrink-0 box-border rounded-full border-2 border-dashed border-[#8A9099]"
              />
              <span className="text-sm font-semibold text-[#15171A]">
                One seat is free. It could be yours.
              </span>
            </div>
          ) : (
            <div
              role="status"
              className="flex items-center gap-3 p-3 border-2 border-[#15171A] rounded-[12px] bg-[#FFF3D1]"
            >
              <div
                aria-hidden="true"
                className="w-11 h-11 shrink-0 box-border rounded-full bg-[#FFC72C] border-2 border-[#15171A] text-[#15171A] font-anton text-sm flex items-center justify-center"
              >
                YOU
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[15px] font-bold text-[#15171A]">
                  You are in. See you at 12:15.
                </span>
                <span className="text-[13px] leading-[18px] text-[#15171A]">
                  The others can now see your table card. Thảo will wave when you arrive.
                </span>
              </div>
            </div>
          )}
        </div>

        {/* HOW THE HOUR GOES */}
        <div className="flex flex-col gap-2.5">
          <h2 className="m-0 font-anton text-[22px] tracking-[0.02em] text-[#15171A]">
            HOW THE HOUR GOES
          </h2>
          <div className="flex gap-3">
            <span className="font-anton text-[26px] leading-7 text-[#C8281E] w-5 shrink-0">1</span>
            <span className="text-sm leading-5 text-[#15171A]">
              Thảo orders for everyone and shows how to eat it. Nobody has to read a menu.
            </span>
          </div>
          <div className="flex gap-3">
            <span className="font-anton text-[26px] leading-7 text-[#C8281E] w-5 shrink-0">2</span>
            <span className="text-sm leading-5 text-[#15171A]">
              Question cards on your phone get the table talking. Everyone teaches one word.
            </span>
          </div>
          <div className="flex gap-3">
            <span className="font-anton text-[26px] leading-7 text-[#C8281E] w-5 shrink-0">3</span>
            <span className="text-sm leading-5 text-[#15171A]">
              Afterwards you choose who to keep in touch with. Contacts are shared only when both say yes.
            </span>
          </div>
        </div>

        {/* What it costs */}
        <div className="flex flex-col gap-1 p-3.5 rounded-[12px] bg-[#F1F2F4]">
          <span className="text-sm font-bold text-[#15171A]">What it costs</span>
          <span className="text-[13px] leading-[19px] text-[#15171A]">
            The bill is split evenly at the local price: about 50,000₫ each, plus [SEAT FEE]. A deposit of [DEPOSIT] comes back when you show up.
          </span>
        </div>

        {/* Table rules */}
        <div className="flex flex-col gap-1 p-3.5 border border-[#E2E4E7] rounded-[12px]">
          <span className="text-sm font-bold text-[#15171A]">Table rules</span>
          <span className="text-[13px] leading-[19px] text-[#15171A]">
            Everyone here has a verified ID. Public eating places only. It is a table for friendship and contacts, not dating. One tap reports anyone who breaks that.
          </span>
        </div>

        {/* Actions */}
        <div className="mt-auto flex flex-col gap-2 pt-2">
          <button
            onClick={() => setTaken(!taken)}
            className="h-[52px] border-none rounded-[12px] bg-[#15171A] font-sans text-base font-bold text-[#FFC72C] cursor-pointer hover:bg-[#22262B] transition-colors"
          >
            {taken ? 'Give the seat back' : 'Take the seat'}
          </button>
          <Link
            href={`/tables/${id}/live`}
            className="flex items-center justify-center h-11 text-sm font-semibold text-[#A31F17] hover:underline"
          >
            Preview what happens at the table
          </Link>
        </div>
      </div>
    </div>
  );
}
