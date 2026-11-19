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
    <div className="w-full flex flex-col text-ink font-sans pb-10">
      {/* Jade Dark Header (#083F34) */}
      <div className="flex flex-col gap-1 px-5 pt-3 pb-5 rounded-b-[28px] bg-[#083F34] text-white">
        <Link
          href={`/places/${slug}`}
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
          Back
        </Link>

        <span className="text-[12px] leading-4 font-bold tracking-[0.08em] uppercase text-[#BFD8CF]">
          You are standing at
        </span>

        <h1 className="m-0 text-[30px] leading-9 font-extrabold tracking-[-0.02em] text-white">
          Phở Bà Tâm
        </h1>

        <span className="mt-1 text-[14px] leading-5 text-[#BFD8CF]">
          Recognised from your location. Nothing readable on the wall? This is everything they sell, translated by people who eat here.
        </span>
      </div>

      {/* Main Content */}
      <div className="flex flex-col gap-3 px-5 pt-4 flex-grow">
        {/* Food rules box */}
        <div className="flex flex-col gap-0.5 p-[12px_14px] rounded-[14px] bg-[#E2F0EA]">
          <span className="text-[14px] leading-5 font-bold text-[#083F34]">
            Your food rules: no peanuts · no pork
          </span>
          <span className="text-[13px] leading-[19px] text-[#083F34]">
            Everything below is safe for you. One dish with pork is hidden.
          </span>
        </div>

        {/* Order Linh's usual button (#FF7A59) */}
        <button
          type="button"
          onClick={handleUsual}
          className="flex flex-col items-start gap-0.5 p-[14px_16px] border-none rounded-[16px] bg-[#FF7A59] text-left text-[#12211D] hover:bg-[#ff8e72] transition-colors cursor-pointer"
        >
          <span className="text-[16px] leading-[22px] font-bold">
            Order Linh’s usual in one tap
          </span>
          <span className="text-[13px] leading-[18px]">
            Phở tái nạm and one quẩy · 55,000₫ · the vendor card says you are her friend
          </span>
        </button>

        {/* Menu Items List */}
        <div className="flex flex-col px-4 py-1 rounded-[20px] bg-white shadow-[0_1px_2px_rgba(18,33,29,0.06),0_8px_24px_rgba(18,33,29,0.04)]">
          {MENU_ITEMS.map((item) => {
            const count = qty[item.id] || 0;
            return (
              <div
                key={item.id}
                className="flex items-center gap-2 py-3 border-b border-[#E6EBE8] last:border-b-0"
              >
                <div className="flex flex-col gap-px flex-1 min-w-0">
                  <span className="text-[16px] leading-[22px] font-bold text-ink">
                    {item.vi}
                  </span>
                  <span className="text-[13px] leading-[19px] text-[#4A5852]">
                    {item.en}
                  </span>
                  <span className="text-[13px] leading-[18px] font-semibold text-[#0B5D4B]">
                    {fmt(item.price)}
                  </span>
                </div>

                {count > 0 && (
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => setItemQty(item.id, count - 1)}
                      aria-label={`Remove one ${item.vi}`}
                      className="w-11 h-11 shrink-0 rounded-full border-[1.5px] border-[#DCE2DE] bg-white text-[20px] font-semibold text-ink flex items-center justify-center hover:border-ink transition-colors cursor-pointer"
                    >
                      −
                    </button>
                    <span className="min-w-[16px] text-center text-base font-bold text-ink">
                      {count}
                    </span>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => setItemQty(item.id, count + 1)}
                  aria-label={`Add one ${item.vi}`}
                  className="w-11 h-11 shrink-0 border-none rounded-full bg-[#0B5D4B] text-[20px] font-semibold text-white flex items-center justify-center hover:bg-[#083F34] transition-colors cursor-pointer"
                >
                  +
                </button>
              </div>
            );
          })}
        </div>

        {/* YOUR ORDER summary card */}
        <div className="flex flex-col gap-2.5 p-4 rounded-[20px] bg-white shadow-[0_1px_2px_rgba(18,33,29,0.06),0_8px_24px_rgba(18,33,29,0.04)]">
          <span className="text-[12px] leading-4 font-bold tracking-[0.08em] uppercase text-[#4A5852]">
            Your order
          </span>
          <span className="text-[15px] leading-[22px] text-ink">{summary}</span>

          <div className="flex items-baseline justify-between gap-3 pt-0.5">
            <span className="text-[13px] leading-[19px] text-[#4A5852]">
              Local price, total
            </span>
            <span className="text-[16px] font-bold text-ink">{totalText}</span>
          </div>

          <button
            type="button"
            onClick={() => setShowCard(!showCard)}
            className="flex items-center justify-center h-12 border-[1.5px] border-[#12211D] rounded-[16px] bg-white text-[15px] font-bold text-[#12211D] hover:bg-gray-bg transition-colors cursor-pointer mt-1"
          >
            {showCard ? 'Hide the vendor card' : 'Show this to the vendor'}
          </button>
        </div>

        {/* TURN YOUR PHONE TO THE VENDOR (#12211D) */}
        {showCard && (
          <div className="flex flex-col gap-3 p-5 rounded-[24px] bg-[#12211D] text-white">
            <span className="text-[12px] leading-4 font-bold tracking-[0.08em] uppercase text-[#C9D3CF]">
              Turn your phone to the vendor
            </span>

            <div className="flex flex-col gap-1.5 p-4 rounded-[16px] bg-white text-[#12211D]">
              <span className="text-[22px] leading-[30px] font-bold text-ink">
                {isUsual
                  ? 'Cháu là bạn của Linh. Cho cháu như Linh hay ăn:'
                  : 'Cho cháu:'}
              </span>

              {chosen.map((c) => (
                <span
                  key={c.id}
                  className="text-[22px] leading-[30px] font-bold text-[#0B5D4B]"
                >
                  {qty[c.id]} {c.vi.toLowerCase()}
                </span>
              ))}

              <span className="text-[18px] leading-[26px] font-semibold text-ink mt-0.5">
                Cháu không ăn được lạc và thịt lợn.
              </span>
              <span className="text-[18px] leading-[26px] font-semibold text-ink">
                Tổng {fmtVi(total)}, đúng không ạ?
              </span>
            </div>

            <span className="text-[14px] leading-5 text-[#C9D3CF]">
              Cô/chú bấm để trả lời giúp khách:
            </span>

            <div className="flex gap-2">
              {REPLIES.map((r, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setVendorReply(r.en)}
                  className="flex-1 h-12 border-[1.5px] border-white rounded-[14px] bg-transparent text-[14px] font-bold text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  {r.vi}
                </button>
              ))}
            </div>

            {vendorReply && (
              <div
                role="status"
                className="flex flex-col gap-0.5 p-[12px_14px] rounded-[14px] bg-[#FF7A59] text-[#12211D]"
              >
                <span className="text-[12px] leading-4 font-bold">
                  The vendor answered
                </span>
                <span className="text-[16px] leading-[22px] font-bold">
                  {vendorReply}
                </span>
              </div>
            )}
          </div>
        )}

        {/* CTAs */}
        <div className="flex flex-col gap-1 mt-1">
          <Link
            href={`/places/${slug}/guide`}
            className="flex items-center justify-center h-[56px] rounded-[16px] bg-[#0B5D4B] text-[16px] font-bold text-white hover:bg-[#083F34] transition-colors cursor-pointer"
          >
            Food is here. How do I eat it?
          </Link>
          <Link
            href="/help"
            className="flex items-center justify-center h-11 text-[14px] font-semibold text-[#0B5D4B] hover:text-[#083F34]"
          >
            Call a local
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
