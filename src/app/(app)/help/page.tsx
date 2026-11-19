'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const REASONS = [
  { id: 'order', label: 'I cannot order' },
  { id: 'price', label: 'The price seems wrong' },
  { id: 'lost', label: 'I am lost' },
  { id: 'sick', label: 'Allergy or feeling unwell' },
];

export default function HelpScreen() {
  const [reason, setReason] = useState('order');
  const [inCall, setInCall] = useState(true);

  return (
    <div className="w-full max-w-[390px] mx-auto min-h-screen bg-[#F3F5F2] text-[#12211D] flex flex-col font-sans pb-28">
      {/* Header section */}
      <div className="flex flex-col gap-2 px-5 pt-3">
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
        <h1 className="m-0 text-[30px] leading-[36px] font-extrabold tracking-[-0.02em]">
          Stuck? A local picks up.
        </h1>
        <p className="m-0 text-[15px] leading-[22px] text-[#4A5852]">
          Vietnamese volunteers who want to practise your language. Put the phone on speaker and they sort it out with the vendor for you.
        </p>
      </div>

      <div className="flex flex-col gap-4 px-5 pt-4 flex-grow">
        {/* What is going on? */}
        <div className="flex flex-col gap-2">
          <span className="text-[14px] leading-5 font-bold">What is going on?</span>
          <div className="flex gap-2 flex-wrap">
            {REASONS.map((r) => {
              const active = r.id === reason;
              return (
                <button
                  key={r.id}
                  onClick={() => setReason(r.id)}
                  aria-pressed={active}
                  className={`h-11 px-4 rounded-[22px] font-sans text-[14px] transition-colors cursor-pointer ${
                    active
                      ? 'border-[1.5px] border-[#0B5D4B] bg-[#0B5D4B] font-semibold text-white'
                      : 'border-[1.5px] border-[#DCE2DE] bg-white font-medium text-[#12211D] hover:border-[#0B5D4B]'
                  }`}
                >
                  {r.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Volunteer card */}
        <div className="flex flex-col gap-3 p-4 rounded-[20px] bg-white shadow-[0_1px_2px_rgba(18,33,29,0.06),0_8px_24px_rgba(18,33,29,0.04)]">
          <div className="flex items-center gap-3">
            <div
              aria-hidden="true"
              className="w-14 h-14 shrink-0 rounded-full bg-[#0B5D4B] text-white font-bold text-[18px] flex items-center justify-center"
            >
              MA
            </div>
            <div className="flex flex-col gap-0.5 min-w-0">
              <span className="text-base font-bold text-[#12211D]">Minh Anh, 21</span>
              <span className="text-[13px] leading-[19px] text-[#4A5852]">
                University student in Hà Nội · speaks English
              </span>
              <span className="flex items-center gap-1.5 text-[13px] leading-[18px] font-semibold text-[#0B5D4B]">
                <span aria-hidden="true" className="w-2 h-2 rounded-full bg-[#0B5D4B]" />
                Free right now
              </span>
            </div>
          </div>
          <span className="text-[14px] leading-5 text-[#12211D]">
            She already sees where you are, which shop it is and what is on your order card. You do not have to explain.
          </span>
        </div>

        {/* Call button */}
        <button
          onClick={() => setInCall(!inCall)}
          className="flex items-center justify-center h-14 border-none rounded-[16px] bg-[#0B5D4B] font-sans text-base font-bold text-white cursor-pointer hover:bg-[#083F34] transition-colors"
        >
          {inCall ? 'End call and say thanks' : 'Call Minh Anh · free'}
        </button>

        {/* Live captions */}
        {inCall && (
          <div className="flex flex-col gap-2.5 p-5 rounded-[24px] bg-[#12211D] text-white">
            <span className="text-[12px] leading-4 font-bold tracking-wider uppercase text-[#C9D3CF]">
              On speaker · live captions
            </span>
            <div className="flex flex-col gap-0.5 p-3 sm:p-3.5 rounded-[14px] bg-white/10">
              <span className="text-xs font-bold text-[#FF9F86]">Minh Anh to the vendor</span>
              <span className="text-base font-semibold leading-snug">
                “Cô ơi, bạn này muốn một bát phở tái, không hành ạ.”
              </span>
              <span className="text-[13px] leading-[18px] text-[#C9D3CF]">
                One rare-beef phở for my friend, no spring onion please.
              </span>
            </div>
            <div className="flex flex-col gap-0.5 p-3 sm:p-3.5 rounded-[14px] bg-white/10">
              <span className="text-xs font-bold text-[#FF9F86]">Vendor</span>
              <span className="text-base font-semibold leading-snug">
                “Bốn lăm nghìn nhé. Ngồi đi cháu.”
              </span>
              <span className="text-[13px] leading-[18px] text-[#C9D3CF]">
                That is 45,000. Sit down, dear.
              </span>
            </div>
            <div className="flex flex-col gap-0.5 p-3 sm:p-3.5 rounded-[14px] bg-white/10">
              <span className="text-xs font-bold text-[#FF9F86]">Minh Anh to you</span>
              <span className="text-base font-semibold leading-snug">
                “All sorted. It is 45,000₫ and you pay after you eat. Enjoy!”
              </span>
            </div>
          </div>
        )}

        <p className="m-0 text-[13px] leading-[19px] text-[#4A5852]">
          Nobody free? An AI interpreter answers at once, and a volunteer joins when one is available.
        </p>

        {/* Why would a stranger help you? */}
        <div className="flex flex-col gap-0.5 p-3.5 rounded-[14px] bg-[#E2F0EA] text-[#083F34]">
          <span className="text-[14px] leading-5 font-bold">
            Why would a stranger help you?
          </span>
          <span className="text-[13px] leading-[19px] text-[#083F34]">
            Students in Việt Nam look for chances to speak with foreigners. A two-minute call is practice for them and a rescue for you.
          </span>
        </div>
      </div>
    </div>
  );
}
