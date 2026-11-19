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
    <div className="w-full max-w-[390px] mx-auto min-h-screen bg-[#F3F5F2] text-[#12211D] flex flex-col font-sans pb-28">
      {/* Header section */}
      <div className="flex flex-col gap-2 px-5 pt-3">
        <Link
          href={`/tables/${id}/live`}
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
        <h1 className="m-0 text-[30px] leading-[36px] font-extrabold tracking-[-0.02em]">
          You ate with five people.
        </h1>
        <span className="text-[15px] leading-[22px] text-[#4A5852]">
          Keep the ones you liked. Nobody sees your choice unless they chose you too.
        </span>
      </div>

      <div className="flex flex-col gap-5 px-5 pt-4 flex-grow">
        {/* Table photo banner */}
        <div className="h-[132px] box-border p-3 border-[1.5px] border-dashed border-[#9DBFB3] rounded-[16px] bg-[#E2F0EA] flex items-center justify-center text-[13px] leading-[18px] font-medium text-[#083F34] text-center">
          Table photo · Bún chả Ngõ 41 · 16 Nov
        </div>

        {/* Mutual matching list card */}
        <div className="flex flex-col px-4 py-1 rounded-[20px] bg-white shadow-[0_1px_2px_rgba(18,33,29,0.06),0_8px_24px_rgba(18,33,29,0.04)]">
          {PEOPLE.map((p, idx) => {
            const isKept = !!kept[p.id];
            const status = isKept
              ? p.yes
                ? 'Both said yes · contacts shared'
                : 'Waiting for their answer'
              : '';

            return (
              <div
                key={p.id}
                className={`flex items-center gap-3 py-3 ${
                  idx < PEOPLE.length - 1 ? 'border-b border-[#E6EBE8]' : ''
                }`}
              >
                <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                  <span className="text-[15px] leading-5 font-bold">{p.name}</span>
                  <span className="text-[13px] leading-[19px] text-[#4A5852]">{p.note}</span>
                  {status && (
                    <span role="status" className="text-[12px] leading-4 font-semibold text-[#0B5D4B]">
                      {status}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => toggleKept(p.id)}
                  aria-pressed={isKept}
                  className={`h-11 px-4 shrink-0 rounded-[22px] font-sans text-[14px] transition-colors cursor-pointer ${
                    isKept
                      ? 'border-[1.5px] border-[#0B5D4B] bg-[#0B5D4B] font-semibold text-white'
                      : 'border-[1.5px] border-[#12211D] bg-white font-semibold text-[#12211D] hover:bg-neutral-50'
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
          <span className="text-[14px] leading-5 font-bold">
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
                  className={`h-11 px-4 rounded-[22px] font-sans text-[14px] transition-colors cursor-pointer ${
                    active
                      ? 'border-[1.5px] border-[#0B5D4B] bg-[#0B5D4B] font-semibold text-white'
                      : 'border-[1.5px] border-[#DCE2DE] bg-white font-medium text-[#12211D] hover:border-[#0B5D4B]'
                  }`}
                >
                  {kudo}
                </button>
              );
            })}
          </div>
        </div>

        {/* Your table network card */}
        <div className="flex flex-col gap-3 p-5 rounded-[24px] bg-[#083F34] text-white">
          <span className="text-[12px] leading-4 font-bold tracking-wider uppercase text-[#BFD8CF]">
            Your table network
          </span>
          <div className="flex gap-3">
            <div className="flex flex-col gap-0.5 flex-1">
              <span className="text-[28px] leading-[34px] font-extrabold tracking-[-0.02em]">
                14
              </span>
              <span className="text-[13px] leading-[18px] text-[#BFD8CF]">people kept</span>
            </div>
            <div className="flex flex-col gap-0.5 flex-1">
              <span className="text-[28px] leading-[34px] font-extrabold tracking-[-0.02em]">
                6
              </span>
              <span className="text-[13px] leading-[18px] text-[#BFD8CF]">countries</span>
            </div>
            <div className="flex flex-col gap-0.5 flex-1">
              <span className="text-[28px] leading-[34px] font-extrabold tracking-[-0.02em]">
                9
              </span>
              <span className="text-[13px] leading-[18px] text-[#BFD8CF]">tables shared</span>
            </div>
          </div>
          <span className="text-[14px] leading-5 text-[#BFD8CF]">
            Every contact is saved with the meal you shared, so you never wonder where you met: “Kenji · bún chả · 16 Nov”.
          </span>
        </div>

        {/* Do not let it end here */}
        <div className="flex flex-col gap-2.5">
          <span className="text-[14px] leading-5 font-bold">Do not let it end here</span>
          <Link
            href="/tables/1"
            className="flex items-center justify-between gap-3 p-4 rounded-[20px] bg-white shadow-[0_1px_2px_rgba(18,33,29,0.06),0_8px_24px_rgba(18,33,29,0.04)] text-[#12211D] no-underline hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col gap-0.5">
              <span className="text-[15px] leading-5 font-bold">
                Thảo hosts a snail night on Friday
              </span>
              <span className="text-[13px] leading-[19px] text-[#4A5852]">
                People from today’s table get the first seats.
              </span>
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
          <Link
            href="/tables/new"
            className="flex items-center justify-between gap-3 p-4 rounded-[20px] bg-white shadow-[0_1px_2px_rgba(18,33,29,0.06),0_8px_24px_rgba(18,33,29,0.04)] text-[#12211D] no-underline hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col gap-0.5">
              <span className="text-[15px] leading-5 font-bold">
                Kenji and Anna will be in Hội An next week
              </span>
              <span className="text-[13px] leading-[19px] text-[#4A5852]">
                So will you. Open a table there for the three of you.
              </span>
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
        </div>

        {/* CTA */}
        <Link
          href="/together"
          className="flex items-center justify-center h-14 rounded-[16px] bg-[#0B5D4B] text-[16px] font-bold text-white no-underline hover:bg-[#083F34] transition-colors"
        >
          Find my next table
        </Link>
      </div>

      {/* Footer */}
      <div className="mt-auto px-5 pt-6 pb-5 text-[12px] leading-4 text-[#4A5852] text-center">
        mâm · eat together in Việt Nam
      </div>
    </div>
  );
}
