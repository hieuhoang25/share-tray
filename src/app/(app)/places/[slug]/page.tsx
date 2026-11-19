'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';

interface Praise {
  n: number;
  title: string;
  text: string;
}

interface NearbyPoint {
  kind: 'see' | 'eat' | 'useful';
  walk: string;
  name: string;
  note: string;
}

interface Review {
  id: string;
  initial: string;
  who: string;
  tie: string;
  textEn: string;
  textVi: string;
}

const DEFAULT_PRAISES: Praise[] = [
  {
    n: 1,
    title: 'The broth',
    text: 'Beef bones simmered overnight. Clear, deep and never sweet. 19 of 23 locals mention it first.',
  },
  {
    n: 2,
    title: 'One family, one pot',
    text: 'Bà Tâm still stands at the pot every morning and her daughter cuts the beef. The recipe has not changed.',
  },
  {
    n: 3,
    title: 'The price does not jump',
    text: '45,000₫ a bowl, written on the wall, the same for everyone. 15 locals mention it.',
  },
];

const NEARBY_POINTS: NearbyPoint[] = [
  {
    kind: 'see',
    walk: '6 MIN',
    name: 'Văn Miếu (Temple of Literature)',
    note: 'Go straight after breakfast, before the tour buses arrive.',
  },
  {
    kind: 'see',
    walk: '2 MIN',
    name: 'Morning market in the next alley',
    note: 'Over by 9:00. Ask before you photograph a seller.',
  },
  {
    kind: 'eat',
    walk: '3 MIN',
    name: 'Cà phê Ông Lâm',
    note: 'Egg coffee. Linh’s next stop after phở.',
  },
  {
    kind: 'eat',
    walk: '5 MIN',
    name: 'Chè Bà Thìn',
    note: 'Sweet soup for the afternoon, 15,000₫.',
  },
  {
    kind: 'useful',
    walk: '2 MIN',
    name: 'ATM that takes foreign cards',
    note: 'Phở Bà Tâm is cash only.',
  },
  {
    kind: 'useful',
    walk: '1 MIN',
    name: 'Pharmacy',
    note: 'Staff understand basic English, say locals.',
  },
  {
    kind: 'useful',
    walk: '4 MIN',
    name: 'Clean toilet',
    note: 'Inside the coffee shop. Buy a drink first.',
  },
];

const REVIEWS: Review[] = [
  {
    id: 'linh',
    initial: 'L',
    who: 'Linh, 29',
    tie: 'Lived 200 m away for 6 years',
    textEn:
      'I ate here before class almost every day. The broth is clear and not too sweet. The owner is brisk but she remembers your order.',
    textVi:
      'Mình dắt bạn ở xa đến đây đầu tiên. Muốn ăn phở chuẩn không đông khách du lịch thì cứ ra đây. Nhớ đến trước 8:30 kẻo hết quẩy.',
  },
  {
    id: 'hung',
    initial: 'H',
    who: 'Hùng, 41',
    tie: 'Works nearby',
    textEn:
      'An honest bowl at an honest price. You will share a table, so do not come for a quiet morning.',
    textVi:
      'Bà Tâm bán từ hồi tôi học cấp ba đến giờ. Nước dùng bao năm vẫn vậy. Đừng vắt chanh vội, nếm trước đã.',
  },
];

const NEARBY_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'see', label: 'See' },
  { id: 'eat', label: 'Eat next' },
  { id: 'useful', label: 'Useful' },
] as const;

type NearbyFilterKey = (typeof NEARBY_FILTERS)[number]['id'];

export default function PlaceScreen({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [nearbyFilter, setNearbyFilter] = useState<NearbyFilterKey>('all');
  const [showOriginals, setShowOriginals] = useState<Record<string, boolean>>({});

  const filteredNearby = NEARBY_POINTS.filter((item) => {
    if (nearbyFilter === 'all') return true;
    return item.kind === nearbyFilter;
  });

  const toggleOriginal = (id: string) => {
    setShowOriginals((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="w-full flex flex-col text-ink font-sans pb-10">
      {/* Jade Dark Header (#083F34) */}
      <div className="flex flex-col gap-1.5 px-5 pt-3 pb-6 rounded-b-[28px] bg-[#083F34] text-white">
        <Link
          href="/dishes"
          className="flex items-center gap-1.5 h-11 self-start text-sm font-semibold text-white hover:text-[#BFD8CF] transition-colors"
        >
          <svg
            aria-hidden="true"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 5l-7 7 7 7" />
          </svg>
          All phở places
        </Link>

        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-col gap-1.5">
            <h1 className="m-0 text-[30px] leading-9 font-extrabold tracking-[-0.02em] text-white">
              Phở Bà Tâm
            </h1>
            <span className="text-[14px] leading-5 text-[#BFD8CF]">
              Beef noodle soup · Đống Đa, Hà Nội · 4 min walk
            </span>
          </div>

          {/* SVG Illustration (76x76) */}
          <svg
            aria-hidden="true"
            width="76"
            height="76"
            viewBox="0 0 96 96"
            className="shrink-0"
          >
            <circle cx="48" cy="48" r="46" fill="#FFFFFF" />
            <circle cx="48" cy="48" r="38" fill="#E9B872" />
            <path
              d="M22 44c8-6 14 6 22 0s14 6 22 0"
              fill="none"
              stroke="#FFF6E0"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M24 56c8-6 14 6 22 0s14 6 22 0"
              fill="none"
              stroke="#FFF6E0"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <ellipse cx="38" cy="34" rx="10" ry="5" fill="#9C4A3A" />
            <ellipse cx="58" cy="38" rx="9" ry="4" fill="#9C4A3A" />
            <circle cx="60" cy="62" r="4" fill="#2E8B57" />
            <circle cx="52" cy="68" r="3" fill="#2E8B57" />
            <circle cx="34" cy="66" r="3" fill="#2E8B57" />
            <circle cx="66" cy="50" r="3" fill="#FF7A59" />
          </svg>
        </div>

        {/* 3 Badges */}
        <div className="flex gap-2 flex-wrap mt-2">
          <span className="px-2.5 py-1.5 rounded-full bg-white/14 text-[12px] leading-4 font-semibold text-white">
            4.5 from 23 locals
          </span>
          <span className="px-2.5 py-1.5 rounded-full bg-white/14 text-[12px] leading-4 font-semibold text-white">
            Curious level
          </span>
          <span className="px-2.5 py-1.5 rounded-full bg-white/14 text-[12px] leading-4 font-semibold text-white">
            Open until 10:30
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col gap-6 p-5 flex-grow">
        {/* WHY LOCALS PRAISE IT */}
        <div className="flex flex-col gap-3">
          <h2 className="m-0 text-[20px] leading-[26px] font-bold tracking-[-0.01em] text-ink">
            Why locals praise it
          </h2>

          <div className="flex flex-col gap-3.5 p-4 rounded-[20px] bg-white shadow-[0_1px_2px_rgba(18,33,29,0.06),0_8px_24px_rgba(18,33,29,0.04)]">
            {DEFAULT_PRAISES.map((p) => (
              <div key={p.n} className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="w-8 h-8 shrink-0 rounded-full bg-[#E2F0EA] text-[#0B5D4B] font-bold text-[14px] flex items-center justify-center"
                >
                  {p.n}
                </span>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[14px] leading-5 font-bold text-ink">
                    {p.title}
                  </span>
                  <span className="text-[14px] leading-5 text-[#4A5852]">
                    {p.text}
                  </span>
                </div>
              </div>
            ))}

            {/* The honest downside box */}
            <div className="flex flex-col gap-0.5 p-[12px_14px] rounded-[14px] bg-[#FFE9E1]">
              <span className="text-[13px] leading-[18px] font-bold text-[#8A2A12]">
                The honest downside
              </span>
              <span className="text-[14px] leading-5 text-ink">
                Shared tables, low stools and a crowd from 7:00 to 8:00. Mornings only.
              </span>
            </div>
          </div>

          {/* Score Bars */}
          <div className="flex flex-col gap-2.5 p-4 rounded-[20px] bg-white shadow-[0_1px_2px_rgba(18,33,29,0.06),0_8px_24px_rgba(18,33,29,0.04)]">
            <div className="flex items-center gap-3">
              <span className="w-[60px] text-[13px] font-semibold text-ink">Price</span>
              <div className="flex-1 h-2 rounded-[4px] bg-[#DCE2DE]">
                <div className="w-[94%] h-2 rounded-[4px] bg-[#0B5D4B]" />
              </div>
              <span className="w-7 text-[14px] font-bold text-right text-ink">4.7</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-[60px] text-[13px] font-semibold text-ink">Service</span>
              <div className="flex-1 h-2 rounded-[4px] bg-[#DCE2DE]">
                <div className="w-[84%] h-2 rounded-[4px] bg-[#0B5D4B]" />
              </div>
              <span className="w-7 text-[14px] font-bold text-right text-ink">4.2</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-[60px] text-[13px] font-semibold text-ink">Space</span>
              <div className="flex-1 h-2 rounded-[4px] bg-[#DCE2DE]">
                <div className="w-[78%] h-2 rounded-[4px] bg-[#0B5D4B]" />
              </div>
              <span className="w-7 text-[14px] font-bold text-right text-ink">3.9</span>
            </div>
          </div>
        </div>

        {/* ORDER “THE USUAL” · WALK IN AS A FRIEND (#0B5D4B) */}
        <div className="flex flex-col gap-2.5 p-5 rounded-[24px] bg-[#0B5D4B] text-white">
          <span className="text-[12px] leading-4 font-bold tracking-[0.08em] uppercase text-[#CDE5DC]">
            Order “the usual” · walk in as a friend
          </span>

          <span className="text-[20px] leading-7 font-bold text-white">
            “Cháu là bạn của Linh. Cho cháu như Linh hay ăn ạ.”
          </span>

          <span className="text-[14px] leading-5 text-[#CDE5DC]">
            I am Linh’s friend. The same as she always has, please.
          </span>

          <div className="h-px my-1 bg-white/22" />

          <span className="text-[14px] leading-5 text-white">
            Linh’s usual: phở tái nạm, extra spring onion, one quẩy. She pays 55,000₫, so you do too.
          </span>

          <span className="text-[14px] leading-5 text-[#CDE5DC]">
            Linh has eaten here for 6 years. She hears that you came, and can write back.
          </span>

          <Link
            href={`/places/${slug}/order`}
            className="flex items-center justify-center h-[52px] mt-1.5 rounded-[16px] bg-white text-[#0B5D4B] text-[16px] font-bold hover:bg-[#E2F0EA] transition-colors cursor-pointer"
          >
            Show this card at the shop
          </Link>
        </div>

        {/* AROUND HERE */}
        <div className="flex flex-col gap-3">
          <h2 className="m-0 text-[20px] leading-[26px] font-bold tracking-[-0.01em] text-ink">
            Around here
          </h2>

          <div className="flex gap-2 flex-wrap">
            {NEARBY_FILTERS.map((f) => {
              const active = nearbyFilter === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setNearbyFilter(f.id)}
                  aria-pressed={active}
                  className={`h-11 px-4 rounded-[22px] text-[14px] transition-colors cursor-pointer ${
                    active
                      ? 'border-[1.5px] border-[#0B5D4B] bg-[#0B5D4B] text-white font-semibold'
                      : 'border-[1.5px] border-[#DCE2DE] bg-white text-ink font-medium hover:border-[#0B5D4B]'
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>

          <div className="flex flex-col gap-3.5 p-4 rounded-[20px] bg-white shadow-[0_1px_2px_rgba(18,33,29,0.06),0_8px_24px_rgba(18,33,29,0.04)]">
            {filteredNearby.map((item, idx) => (
              <div key={idx} className="flex gap-3">
                <span className="w-[46px] shrink-0 p-[4px_6px] rounded-full bg-[#E2F0EA] text-[#0B5D4B] text-[11px] leading-4 font-bold text-center self-start">
                  {item.walk}
                </span>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[14px] leading-5 font-bold text-ink">
                    {item.name}
                  </span>
                  <span className="text-[13px] leading-[19px] text-[#4A5852]">
                    {item.note}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* WHAT LOCALS SAY */}
        <div className="flex flex-col gap-3">
          <h2 className="m-0 text-[20px] leading-[26px] font-bold tracking-[-0.01em] text-ink">
            What locals say
          </h2>

          <div className="flex flex-col gap-3">
            {REVIEWS.map((r) => {
              const isOriginal = showOriginals[r.id] || false;
              return (
                <div
                  key={r.id}
                  className="flex flex-col gap-2.5 p-4 rounded-[20px] bg-white shadow-[0_1px_2px_rgba(18,33,29,0.06),0_8px_24px_rgba(18,33,29,0.04)]"
                >
                  <div className="flex items-center gap-3">
                    <div
                      aria-hidden="true"
                      className="w-11 h-11 shrink-0 rounded-full bg-[#0B5D4B] text-white font-bold text-[16px] flex items-center justify-center"
                    >
                      {r.initial}
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[14px] leading-5 font-bold text-ink">
                        {r.who}
                      </span>
                      <span className="text-[13px] leading-[19px] text-[#4A5852]">
                        {r.tie}
                      </span>
                    </div>
                  </div>

                  <p className="m-0 text-[15px] leading-[22px] text-ink">
                    {isOriginal ? r.textVi : r.textEn}
                  </p>

                  <button
                    type="button"
                    onClick={() => toggleOriginal(r.id)}
                    className="self-start text-[12px] leading-4 text-[#4A5852] hover:text-ink cursor-pointer pt-0.5"
                  >
                    {isOriginal
                      ? 'Show English translation · tap to see'
                      : 'Translated from Vietnamese · tap to see the original'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* OPEN SEATS AT THIS SHOP */}
        <Link
          href="/tables/1"
          className="flex flex-col gap-1.5 p-4 rounded-[20px] bg-[#FFE9E1] text-ink shadow-none hover:bg-[#fedbd0] transition-colors"
        >
          <span className="text-[12px] leading-4 font-bold tracking-[0.08em] uppercase text-[#8A2A12]">
            Open seats at this shop
          </span>
          <span className="text-[18px] leading-6 font-bold text-ink">
            Tomorrow 08:00 · two seats free
          </span>
          <span className="text-[14px] leading-5 text-ink">
            One local and three travellers heading to Hội An are sharing breakfast here. Sit with them.
          </span>
          <span className="mt-1 text-[14px] font-bold text-[#8A2A12]">
            See the table
          </span>
        </Link>

        {/* 3 Bottom CTAs */}
        <div className="flex flex-col gap-2.5 pt-2">
          <Link
            href={`/places/${slug}/guide`}
            className="flex items-center justify-center h-[56px] rounded-[16px] bg-[#0B5D4B] text-[16px] font-bold text-white hover:bg-[#083F34] transition-colors cursor-pointer"
          >
            Walk me through it, step by step
          </Link>
          <Link
            href="/tables/new"
            className="flex items-center justify-center h-[52px] border-[1.5px] border-[#12211D] rounded-[16px] bg-white text-[15px] font-bold text-[#12211D] hover:bg-[#F1F2F4] transition-colors cursor-pointer"
          >
            Open a seat and eat here with others
          </Link>
          <Link
            href="/help"
            className="flex items-center justify-center h-11 text-[14px] font-semibold text-[#0B5D4B] hover:text-[#083F34]"
          >
            Stuck? Call a local
          </Link>
        </div>
      </div>

      {/* Footer text */}
      <div className="mt-auto px-5 pt-6 pb-5 text-[12px] leading-4 text-[#4A5852] text-center">
        mâm · eat together in Việt Nam
      </div>
    </div>
  );
}
