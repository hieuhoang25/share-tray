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
    <div className="w-full min-h-screen bg-white text-ink flex flex-col pb-24 font-sans">
      {/* Red Header */}
      <div className="flex flex-col gap-1.5 px-5 pt-3 pb-5 bg-red text-white">
        <Link
          href="/dishes"
          className="flex items-center gap-1.5 h-11 text-sm font-medium text-white hover:text-white/80 transition-colors"
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

        <h1 className="m-0 font-anton font-normal text-[42px] leading-[48px] text-yellow">
          PHỞ BÀ TÂM
        </h1>

        <span className="text-sm text-white">
          Beef noodle soup · Đống Đa, Hà Nội · 4 min walk
        </span>

        {/* 3 Badges */}
        <div className="flex gap-1.5 flex-wrap mt-1.5">
          <span className="px-2.5 py-1 rounded-[6px] bg-yellow text-[13px] font-bold text-ink">
            4.5 from 23 locals
          </span>
          <span className="px-2.5 py-1 rounded-[6px] bg-ink text-[13px] font-semibold text-white">
            Curious level
          </span>
          <span className="px-2.5 py-1 rounded-[6px] bg-white text-[13px] font-semibold text-ink">
            Open until 10:30
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col gap-[22px] p-5 flex-grow">
        {/* WHY LOCALS PRAISE IT */}
        <div className="flex flex-col gap-3">
          <h2 className="m-0 font-anton font-normal text-[22px] tracking-[0.02em] text-ink">
            WHY LOCALS PRAISE IT
          </h2>

          <div className="flex flex-col gap-3">
            {DEFAULT_PRAISES.map((p) => (
              <div key={p.n} className="flex gap-3">
                <span className="font-anton font-normal text-[30px] leading-8 text-red w-[22px] shrink-0">
                  {p.n}
                </span>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[15px] font-bold text-ink">{p.title}</span>
                  <span className="text-[13px] leading-[19px] text-ink">{p.text}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Honest Downside Box */}
          <div className="flex flex-col gap-0.5 p-[10px_12px] rounded-[10px] bg-gray-bg">
            <span className="text-[13px] font-bold text-ink">The honest downside</span>
            <span className="text-[13px] leading-[19px] text-ink">
              Shared tables, low stools and a crowd from 7:00 to 8:00. Mornings only.
            </span>
          </div>
        </div>

        {/* Score Bars */}
        <div className="flex flex-col gap-3 p-4 border border-border rounded-xl">
          <div className="flex items-center gap-2.5">
            <span className="w-16 text-[13px] text-ink">Price</span>
            <div className="flex-grow h-2 rounded-full bg-track">
              <div className="w-[94%] h-2 rounded-full bg-ink" />
            </div>
            <span className="w-7 text-[13px] font-bold text-right text-ink">4.7</span>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="w-16 text-[13px] text-ink">Service</span>
            <div className="flex-grow h-2 rounded-full bg-track">
              <div className="w-[84%] h-2 rounded-full bg-ink" />
            </div>
            <span className="w-7 text-[13px] font-bold text-right text-ink">4.2</span>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="w-16 text-[13px] text-ink">Space</span>
            <div className="flex-grow h-2 rounded-full bg-track">
              <div className="w-[78%] h-2 rounded-full bg-ink" />
            </div>
            <span className="w-7 text-[13px] font-bold text-right text-ink">3.9</span>
          </div>
        </div>

        {/* ORDER “THE USUAL” · WALK IN AS A FRIEND */}
        <div className="flex flex-col gap-2.5 p-[18px] rounded-2xl bg-ink text-white">
          <span className="text-[11px] font-semibold tracking-[0.06em] text-on-dark-2 uppercase">
            ORDER “THE USUAL” · WALK IN AS A FRIEND
          </span>

          <span className="text-[22px] leading-[30px] font-bold text-yellow">
            “Cháu là bạn của Linh. Cho cháu như Linh hay ăn ạ.”
          </span>

          <span className="text-[13px] leading-[19px] text-on-dark-1">
            I am Linh’s friend. The same as she always has, please.
          </span>

          <div className="h-px bg-muted" />

          <span className="text-sm leading-5 text-white">
            Linh’s usual: phở tái nạm, extra spring onion, one quẩy. She pays 55,000₫, so you do too.
          </span>

          <span className="text-[13px] leading-[19px] text-on-dark-2">
            Linh has eaten here for 6 years. She hears that you came, and can write back.
          </span>

          <Link
            href={`/places/${slug}/order`}
            className="flex items-center justify-center h-12 rounded-xl bg-yellow text-[15px] font-bold text-ink hover:bg-[#FFD966] transition-colors cursor-pointer"
          >
            Show this card at the shop
          </Link>
        </div>

        {/* AROUND HERE */}
        <div className="flex flex-col gap-2.5">
          <h2 className="m-0 font-anton font-normal text-[22px] tracking-[0.02em] text-ink">
            AROUND HERE
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
                  className={`h-11 px-3.5 rounded-[22px] text-[13px] transition-colors cursor-pointer ${
                    active
                      ? 'border-2 border-ink bg-ink text-white font-bold'
                      : 'border border-border-2 bg-white text-ink font-medium hover:border-ink'
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>

          <div className="flex flex-col gap-2">
            {filteredNearby.map((item, idx) => (
              <div
                key={idx}
                className="flex gap-3 p-[10px_12px] border border-border rounded-xl"
              >
                <span className="w-[52px] shrink-0 font-anton font-normal text-[18px] leading-[22px] text-ink">
                  {item.walk}
                </span>
                <div className="flex flex-col gap-0.5 min-w-0">
                  <span className="text-sm font-bold text-ink">{item.name}</span>
                  <span className="text-[13px] leading-[18px] text-muted">{item.note}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* WHAT LOCALS SAY */}
        <div className="flex flex-col gap-3">
          <h2 className="m-0 font-anton font-normal text-[22px] tracking-[0.02em] text-ink">
            WHAT LOCALS SAY
          </h2>

          <div className="flex flex-col gap-3">
            {REVIEWS.map((r) => {
              const isOriginal = showOriginals[r.id] || false;
              return (
                <div
                  key={r.id}
                  className="flex flex-col gap-2 p-3.5 border border-border rounded-xl"
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      aria-hidden="true"
                      className="w-9 h-9 rounded-full bg-red text-white flex items-center justify-center text-sm font-bold shrink-0"
                    >
                      {r.initial}
                    </div>
                    <div className="flex flex-col gap-px">
                      <span className="text-sm font-bold text-ink">{r.who}</span>
                      <span className="text-xs font-semibold text-red-text">{r.tie}</span>
                    </div>
                  </div>

                  <p className="m-0 text-[13px] leading-5 text-ink">
                    {isOriginal ? r.textVi : r.textEn}
                  </p>

                  <button
                    type="button"
                    onClick={() => toggleOriginal(r.id)}
                    className="self-start text-xs text-muted hover:text-ink cursor-pointer pt-0.5"
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
          className="flex flex-col gap-1 p-3.5 border-2 border-ink rounded-xl text-ink hover:bg-gray-bg/50 transition-colors"
        >
          <span className="text-[11px] font-bold tracking-[0.06em] text-red-text uppercase">
            OPEN SEATS AT THIS SHOP
          </span>
          <span className="text-[15px] font-bold text-ink">
            Tomorrow 08:00 · two seats free
          </span>
          <span className="text-[13px] leading-[19px] text-muted">
            One local and three travellers heading to Hội An are sharing breakfast here. Sit with them.
          </span>
        </Link>

        {/* 3 Bottom CTAs */}
        <div className="mt-auto flex flex-col gap-2 pt-2">
          <Link
            href={`/places/${slug}/guide`}
            className="flex items-center justify-center h-[52px] rounded-xl bg-red text-base font-bold text-white hover:bg-[#A31F17] transition-colors cursor-pointer"
          >
            Walk me through it, step by step
          </Link>
          <Link
            href="/tables/new"
            className="flex items-center justify-center h-12 border border-ink rounded-xl text-[15px] font-semibold text-ink hover:bg-ink hover:text-white transition-colors cursor-pointer"
          >
            Open a seat and eat here with others
          </Link>
          <Link
            href="/help"
            className="flex items-center justify-center h-11 text-sm font-semibold text-red-text hover:underline"
          >
            Stuck? Call a local
          </Link>
        </div>
      </div>
    </div>
  );
}
