'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';

interface Person {
  id: string;
  name: string;
  note: string;
  yes: boolean;
}

const PEOPLE: Person[] = [
  { id: 'thao', name: 'Thảo', note: 'Host · taught you “Ngon quá!”', yes: true },
  { id: 'minhanh', name: 'Minh Anh', note: 'Student · wants to practise English', yes: false },
  { id: 'hoa', name: 'Bác Hòa', note: 'Retired teacher · the 1980s stories', yes: true },
  { id: 'kenji', name: 'Kenji', note: 'Hardware engineer from Japan', yes: true },
  { id: 'anna', name: 'Anna', note: 'Photographer from Germany', yes: false },
];

const KUDOS_OPTIONS = [
  'Great storyteller',
  'Good listener',
  'Knows the food',
  'Made me laugh',
];

export default function TableAfterScreen({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [kept, setKept] = useState<Record<string, boolean>>({
    thao: true,
    kenji: true,
  });
  const [selectedKudo, setSelectedKudo] = useState<string>('Great storyteller');

  const toggleKept = (personId: string) => {
    setKept((prev) => ({
      ...prev,
      [personId]: !prev[personId],
    }));
  };

  return (
    <div className="w-full max-w-[390px] mx-auto min-h-screen bg-white text-ink flex flex-col font-sans pb-28">
      {/* Red Header */}
      <div className="flex flex-col gap-1.5 px-5 pt-3 pb-5 bg-[#C8281E] text-white">
        <Link
          href={`/tables/${id}/live`}
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
          Back
        </Link>
        <h1 className="m-0 font-anton text-4xl leading-[46px] text-[#FFC72C]">
          YOU ATE WITH FIVE PEOPLE.
        </h1>
        <span className="text-sm leading-5 text-white">
          Keep the ones you liked. Nobody sees your choice unless they chose you too.
        </span>
      </div>

      <div className="flex flex-col gap-4 p-4 sm:p-5 flex-grow">
        {/* Table photo banner */}
        <div className="h-[104px] rounded-[12px] bg-[#E2E4E7] flex items-center justify-center text-xs text-[#4A5059]">
          Table photo · Bún chả Ngõ 41 · 16 Nov
        </div>

        {/* People kept / mutual matching list */}
        <div className="flex flex-col gap-2">
          {PEOPLE.map((p) => {
            const isKept = !!kept[p.id];
            const status = isKept
              ? p.yes
                ? 'Both said yes · contacts shared'
                : 'Waiting for their answer'
              : '';

            return (
              <div
                key={p.id}
                className="flex items-center gap-3 p-3 border border-[#E2E4E7] rounded-[12px]"
              >
                <div className="flex flex-col gap-0.5 flex-grow min-w-0">
                  <span className="text-[15px] font-bold text-[#15171A]">{p.name}</span>
                  <span className="text-xs text-[#4A5059]">{p.note}</span>
                  {status && (
                    <span role="status" className="text-xs font-semibold text-[#1F6B45]">
                      {status}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => toggleKept(p.id)}
                  aria-pressed={isKept}
                  className={`h-11 px-3.5 shrink-0 rounded-[22px] font-sans text-[13px] transition-colors cursor-pointer ${
                    isKept
                      ? 'border-2 border-[#15171A] bg-[#15171A] font-bold text-[#FFC72C]'
                      : 'border border-[#C5C9CE] bg-white font-semibold text-[#15171A] hover:border-[#15171A]'
                  }`}
                >
                  {isKept ? 'Kept' : 'Keep in touch'}
                </button>
              </div>
            );
          })}
        </div>

        {/* Kudos to host */}
        <div className="flex flex-col gap-2">
          <span className="text-[13px] font-bold text-[#15171A]">
            Leave Thảo, your host, one kind word
          </span>
          <div className="flex gap-2 flex-wrap">
            {KUDOS_OPTIONS.map((kudo) => {
              const active = selectedKudo === kudo;
              return (
                <button
                  key={kudo}
                  onClick={() => setSelectedKudo(kudo)}
                  aria-pressed={active}
                  className={`h-11 px-3.5 rounded-[22px] font-sans text-[13px] transition-colors cursor-pointer ${
                    active
                      ? 'border-2 border-[#15171A] bg-[#15171A] font-bold text-white'
                      : 'border border-[#C5C9CE] bg-white font-normal text-[#15171A] hover:border-[#15171A]'
                  }`}
                >
                  {kudo}
                </button>
              );
            })}
          </div>
        </div>

        {/* Your table network */}
        <div className="flex flex-col gap-2.5 p-4 rounded-[12px] bg-[#15171A] text-white">
          <span className="text-[11px] font-semibold tracking-[0.06em] text-[#B8BDC4]">
            YOUR TABLE NETWORK
          </span>
          <div className="grid grid-cols-3 gap-2">
            <div className="flex flex-col gap-0.5">
              <span className="font-anton text-[28px] text-[#FFC72C]">14</span>
              <span className="text-xs text-[#D5D9DE]">people kept</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="font-anton text-[28px] text-[#FFC72C]">6</span>
              <span className="text-xs text-[#D5D9DE]">countries</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="font-anton text-[28px] text-[#FFC72C]">9</span>
              <span className="text-xs text-[#D5D9DE]">tables shared</span>
            </div>
          </div>
          <span className="text-[13px] leading-[19px] text-[#D5D9DE]">
            Every contact is saved with the meal you shared, so you never wonder where you met: “Kenji · bún chả · 16 Nov”.
          </span>
        </div>

        {/* Do not let it end here */}
        <div className="flex flex-col gap-2">
          <span className="text-[13px] font-bold text-[#15171A]">Do not let it end here</span>
          <Link
            href={`/tables/${id}`}
            className="flex flex-col gap-0.5 p-3 sm:p-3.5 border border-[#E2E4E7] rounded-[12px] text-[#15171A] no-underline hover:border-[#15171A] transition-colors"
          >
            <span className="text-sm font-bold">Thảo hosts a snail night on Friday</span>
            <span className="text-[13px] text-[#4A5059]">
              People from today’s table get the first seats.
            </span>
          </Link>
          <Link
            href="/tables/new"
            className="flex flex-col gap-0.5 p-3 sm:p-3.5 border border-[#E2E4E7] rounded-[12px] text-[#15171A] no-underline hover:border-[#15171A] transition-colors"
          >
            <span className="text-sm font-bold">Kenji and Anna will be in Hội An next week</span>
            <span className="text-[13px] text-[#4A5059]">
              So will you. Open a table there for the three of you.
            </span>
          </Link>
        </div>

        {/* CTA */}
        <Link
          href="/together"
          className="mt-auto flex items-center justify-center h-[52px] rounded-[12px] bg-[#15171A] text-base font-bold text-[#FFC72C] no-underline hover:bg-[#22262B] transition-colors"
        >
          Find my next table
        </Link>
      </div>
    </div>
  );
}
