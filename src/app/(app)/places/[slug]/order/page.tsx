'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';

interface MenuItemDef {
  id: string;
  vi: string;
  en: string;
  price: number;
}

const MENU_ITEMS: MenuItemDef[] = [
  { id: 'tai', vi: 'Phở tái', en: 'Rare beef, cooked by the hot broth', price: 45000 },
  { id: 'chin', vi: 'Phở chín', en: 'Well-done beef brisket', price: 45000 },
  { id: 'tainam', vi: 'Phở tái nạm', en: 'Rare beef and flank, the regulars’ order', price: 50000 },
  { id: 'quay', vi: 'Quẩy', en: 'Fried dough sticks to dip in the broth', price: 5000 },
  { id: 'tra', vi: 'Trà đá', en: 'Iced green tea', price: 3000 },
];

const REPLIES = [
  { vi: 'Đúng rồi', en: 'Yes, that is right. Take a seat.' },
  { vi: 'Hết món', en: 'Sorry, one of those is sold out.' },
  { vi: 'Đợi chút', en: 'Please wait a few minutes.' },
];

export default function OrderScreen({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [qty, setQty] = useState<Record<string, number>>({ tai: 1, quay: 1 });
  const [showCard, setShowCard] = useState(true);
  const [isUsual, setIsUsual] = useState(false);
  const [vendorReply, setVendorReply] = useState<string | null>(null);

  const fmt = (n: number) => n.toLocaleString('en-US') + '₫';
  const fmtVi = (n: number) => n.toLocaleString('en-US').replace(/,/g, '.') + '₫';

  const setItemQty = (id: string, n: number) => {
    setQty((prev) => ({
      ...prev,
      [id]: Math.max(0, Math.min(9, n)),
    }));
    setVendorReply(null);
    setIsUsual(false);
  };

  const handleUsual = () => {
    setQty({ tainam: 1, quay: 1, tai: 0, chin: 0, tra: 0 });
    setIsUsual(true);
    setShowCard(true);
    setVendorReply(null);
  };

  const chosen = MENU_ITEMS.filter((d) => (qty[d.id] || 0) > 0);
  const total = chosen.reduce((acc, d) => acc + d.price * (qty[d.id] || 0), 0);

  const summary = chosen.length
    ? chosen.map((d) => `${qty[d.id]} × ${d.vi}`).join(' · ')
    : 'Nothing yet. Tap + on a dish.';

  const totalText = `${fmt(total)} · about $${(total / 26000).toFixed(2)}`;

  return (
    <div className="w-full min-h-screen bg-white text-ink flex flex-col font-sans">
      {/* Red Header */}
      <div className="flex flex-col gap-1.5 px-5 pt-3 pb-5 bg-red text-white">
        <Link
          href={`/places/${slug}`}
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
          Back
        </Link>

        <span className="text-[11px] font-semibold tracking-[0.06em] text-pink-soft uppercase">
          YOU ARE STANDING AT
        </span>

        <h1 className="m-0 font-anton font-normal text-[42px] leading-[48px] text-yellow">
          PHỞ BÀ TÂM
        </h1>

        <span className="text-[13px] leading-[19px] text-white">
          Recognised from your location. Nothing readable on the wall? This is everything they sell, translated by people who eat here.
        </span>
      </div>

      {/* Main Content */}
      <div className="flex flex-col gap-4 px-5 pt-4 pb-6 flex-grow">
        {/* Food rules box */}
        <div className="flex flex-col gap-0.5 p-[12px_14px] rounded-xl bg-cream">
          <span className="text-[13px] font-semibold text-cream-text">
            Your food rules: no peanuts · no pork
          </span>
          <span className="text-[13px] leading-[19px] text-ink">
            Everything below is safe for you. One dish with pork is hidden.
          </span>
        </div>

        {/* Order Linh's usual button */}
        <button
          type="button"
          onClick={handleUsual}
          className="flex flex-col items-start gap-0.5 p-[12px_14px] border-none rounded-xl bg-ink text-left text-white hover:bg-ink-2 transition-colors cursor-pointer"
        >
          <span className="text-[15px] font-bold text-yellow">
            Order Linh’s usual in one tap
          </span>
          <span className="text-[13px] leading-[18px] text-on-dark-1">
            Phở tái nạm and one quẩy · 55,000₫ · the vendor card says you are her friend
          </span>
        </button>

        {/* Menu Items List */}
        <div className="flex flex-col gap-2.5">
          {MENU_ITEMS.map((item) => {
            const count = qty[item.id] || 0;
            return (
              <div
                key={item.id}
                className="flex items-center gap-3 p-[10px_12px] border border-border rounded-xl bg-white"
              >
                <div className="flex flex-col gap-px flex-grow min-w-0">
                  <span className="text-base font-bold text-ink">{item.vi}</span>
                  <span className="text-[13px] text-muted">{item.en}</span>
                  <span className="text-[13px] font-semibold text-ink">{fmt(item.price)}</span>
                </div>

                {count > 0 && (
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => setItemQty(item.id, count - 1)}
                      aria-label={`Remove one ${item.vi}`}
                      className="w-11 h-11 shrink-0 border border-border-2 rounded-full bg-white text-xl font-normal text-ink flex items-center justify-center hover:bg-gray-bg transition-colors cursor-pointer"
                    >
                      −
                    </button>
                    <span className="w-5 text-center text-base font-bold text-ink">
                      {count}
                    </span>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => setItemQty(item.id, count + 1)}
                  aria-label={`Add one ${item.vi}`}
                  className="w-11 h-11 shrink-0 border-none rounded-full bg-ink text-xl font-normal text-white flex items-center justify-center hover:bg-ink-2 transition-colors cursor-pointer"
                >
                  +
                </button>
              </div>
            );
          })}
        </div>

        {/* YOUR ORDER summary card */}
        <div className="flex flex-col gap-2.5 p-4 rounded-2xl bg-ink text-white">
          <span className="text-[11px] font-semibold tracking-[0.06em] text-on-dark-2 uppercase">
            YOUR ORDER
          </span>
          <span className="text-[15px] leading-[22px] text-white">{summary}</span>

          <div className="flex justify-between items-baseline pt-1">
            <span className="text-[13px] text-on-dark-2">Local price, total</span>
            <span className="text-xl font-bold text-yellow">{totalText}</span>
          </div>

          <button
            type="button"
            onClick={() => setShowCard(!showCard)}
            className="h-12 border-none rounded-xl bg-yellow text-[15px] font-bold text-ink hover:bg-[#FFD966] transition-colors cursor-pointer mt-1"
          >
            {showCard ? 'Hide the vendor card' : 'Show this to the vendor'}
          </button>
        </div>

        {/* TURN YOUR PHONE TO THE VENDOR */}
        {showCard && (
          <div className="flex flex-col gap-3 p-[18px] rounded-2xl bg-red text-white">
            <span className="text-[11px] font-semibold tracking-[0.06em] text-pink-soft uppercase">
              TURN YOUR PHONE TO THE VENDOR
            </span>

            <div className="flex flex-col gap-0.5">
              <span className="text-2xl leading-[34px] font-bold text-white">
                {isUsual
                  ? 'Cháu là bạn của Linh. Cho cháu như Linh hay ăn:'
                  : 'Cho cháu:'}
              </span>

              {chosen.map((c) => (
                <span
                  key={c.id}
                  className="text-2xl leading-[34px] font-bold text-yellow"
                >
                  {qty[c.id]} {c.vi.toLowerCase()}
                </span>
              ))}

              <span className="text-lg leading-[26px] font-semibold mt-1.5 text-white">
                Cháu không ăn được lạc và thịt lợn.
              </span>
              <span className="text-lg leading-[26px] font-semibold text-white">
                Tổng {fmtVi(total)}, đúng không ạ?
              </span>
            </div>

            <div className="h-px bg-divider-red" />

            <span className="text-[13px] text-pink-soft">
              Cô/chú bấm để trả lời giúp khách:
            </span>

            <div className="grid grid-cols-3 gap-2">
              {REPLIES.map((r, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setVendorReply(r.en)}
                  className="h-12 border-none rounded-[10px] bg-white text-sm font-semibold text-ink hover:bg-gray-bg transition-colors cursor-pointer"
                >
                  {r.vi}
                </button>
              ))}
            </div>

            {vendorReply && (
              <div
                role="status"
                className="flex flex-col gap-0.5 p-[10px_12px] rounded-[10px] bg-white text-ink"
              >
                <span className="text-xs font-semibold text-muted">The vendor answered</span>
                <span className="text-base font-semibold text-ink">{vendorReply}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer bar */}
      <div className="mt-auto flex justify-between items-center gap-3 px-5 py-3.5 border-t border-border bg-white">
        <Link
          href={`/places/${slug}/guide`}
          className="flex items-center h-11 text-[13px] font-semibold text-red-text hover:underline"
        >
          Food is here. How do I eat it?
        </Link>
        <Link
          href="/help"
          className="flex items-center justify-center h-11 px-4 border border-red-text rounded-[22px] text-sm font-semibold text-red-text hover:bg-red hover:text-white transition-colors cursor-pointer"
        >
          Call a local
        </Link>
      </div>
    </div>
  );
}
