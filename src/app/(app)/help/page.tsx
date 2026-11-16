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
    <div className="w-full max-w-[390px] mx-auto min-h-screen bg-[#15171A] text-white flex flex-col font-sans p-5 gap-4 pb-28">
      {/* Back link */}
      <Link
        href="/"
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
        Back
      </Link>

      {/* Header title */}
      <div className="flex flex-col gap-2">
        <h1 className="m-0 font-anton text-[44px] leading-[50px] tracking-[0.01em]">
          STUCK? A LOCAL PICKS UP.
        </h1>
        <p className="m-0 text-sm leading-[21px] text-[#D5D9DE]">
          Vietnamese volunteers who want to practise your language. Put the phone on speaker and they sort it out with the vendor for you.
        </p>
      </div>

      {/* What is going on? */}
      <div className="flex flex-col gap-2">
        <span className="text-[13px] font-semibold text-white">What is going on?</span>
        <div className="grid grid-cols-2 gap-2">
          {REASONS.map((r) => {
            const active = r.id === reason;
            return (
              <button
                key={r.id}
                onClick={() => setReason(r.id)}
                aria-pressed={active}
                className={`h-[52px] px-2.5 rounded-[12px] font-sans text-[13px] transition-colors cursor-pointer ${
                  active
                    ? 'border-2 border-[#FFC72C] bg-[#FFC72C] font-bold text-[#15171A]'
                    : 'border border-[#4A5059] bg-transparent font-medium text-white hover:border-white'
                }`}
              >
                {r.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Volunteer card */}
      <div className="flex flex-col gap-3 p-3.5 rounded-[12px] bg-[#22262B]">
        <div className="flex items-center gap-3">
          <div
            aria-hidden="true"
            className="w-12 h-12 shrink-0 rounded-full bg-[#FFC72C] text-[#15171A] font-anton text-[22px] flex items-center justify-center"
          >
            MA
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-base font-semibold text-white">Minh Anh, 21</span>
            <span className="text-[13px] text-[#D5D9DE]">
              University student in Hà Nội · speaks English
            </span>
            <span className="text-xs font-semibold text-[#7FD6A4]">Free right now</span>
          </div>
        </div>
        <span className="text-[13px] leading-[19px] text-[#B8BDC4]">
          She already sees where you are, which shop it is and what is on your order card. You do not have to explain.
        </span>
      </div>

      {/* Call button */}
      <button
        onClick={() => setInCall(!inCall)}
        className="h-14 border-none rounded-[14px] bg-[#C8281E] font-sans text-base font-bold text-white cursor-pointer hover:bg-[#A31F17] transition-colors"
      >
        {inCall ? 'End call and say thanks' : 'Call Minh Anh · free'}
      </button>

      {/* Live captions */}
      {inCall && (
        <div className="flex flex-col gap-3 p-3.5 border border-[#4A5059] rounded-[12px]">
          <span className="text-[11px] font-semibold tracking-[0.06em] text-[#7FD6A4]">
            ON SPEAKER · LIVE CAPTIONS
          </span>
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-semibold text-[#FFC72C]">Minh Anh to the vendor</span>
            <span className="text-[15px] leading-[22px] text-white">
              “Cô ơi, bạn này muốn một bát phở tái, không hành ạ.”
            </span>
            <span className="text-[13px] text-[#B8BDC4]">
              One rare-beef phở for my friend, no spring onion please.
            </span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-semibold text-[#FFC72C]">Vendor</span>
            <span className="text-[15px] leading-[22px] text-white">
              “Bốn lăm nghìn nhé. Ngồi đi cháu.”
            </span>
            <span className="text-[13px] text-[#B8BDC4]">That is 45,000. Sit down, dear.</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-semibold text-[#FFC72C]">Minh Anh to you</span>
            <span className="text-[15px] leading-[22px] text-white">
              “All sorted. It is 45,000₫ and you pay after you eat. Enjoy!”
            </span>
          </div>
        </div>
      )}

      <p className="m-0 text-[13px] leading-[19px] text-[#B8BDC4]">
        Nobody free? An AI interpreter answers at once, and a volunteer joins when one is available.
      </p>

      {/* Why would a stranger help you? */}
      <div className="mt-auto flex flex-col gap-1 p-3.5 rounded-[12px] bg-[#22262B]">
        <span className="text-[13px] font-semibold text-white">
          Why would a stranger help you?
        </span>
        <span className="text-[13px] leading-[19px] text-[#D5D9DE]">
          Students in Việt Nam look for chances to speak with foreigners. A two-minute call is practice for them and a rescue for you.
        </span>
      </div>
    </div>
  );
}
