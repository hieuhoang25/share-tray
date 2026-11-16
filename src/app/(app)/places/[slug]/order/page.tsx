'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { ScreenHeader, NoteBox, DarkCard, Button, Stepper } from '@/components/ui';
import { formatVND, formatUSD } from '@/lib/format';
import type { MenuItem } from '@/types/domain';

export default function OrderScreen({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [items, setItems] = useState<MenuItem[]>([]);
  const [orderCounts, setOrderCounts] = useState<Record<string, number>>({});
  const [hiddenCount, setHiddenCount] = useState(0);
  const [showVendorCard, setShowVendorCard] = useState(false);
  const [vendorResponse, setVendorResponse] = useState<string | null>(null);

  useEffect(() => {
    async function loadMenu() {
      try {
        const res = await fetch(`/api/places/${slug}/menu?rules=no_pork,no_peanut`);
        const data = await res.json();
        setItems(data.items || []);
        setHiddenCount(data.hiddenCount || 0);

        // Preselect 1 bowl of pho tai
        const first = data.items?.[0];
        if (first) {
          setOrderCounts({ [first.id]: 1 });
        }
      } catch (err) {
        console.error(err);
      }
    }
    loadMenu();
  }, [slug]);

  const handleStepperChange = (id: string, count: number) => {
    setOrderCounts((prev) => ({
      ...prev,
      [id]: Math.max(count, 0),
    }));
  };

  const handleOrderLinhsUsual = () => {
    const counts: Record<string, number> = {};
    items.forEach((it) => {
      if (it.name_vi.includes('tái') || it.name_vi.includes('Quẩy')) {
        counts[it.id] = 1;
      }
    });
    setOrderCounts(counts);
  };

  const totalVnd = items.reduce((acc, it) => {
    const qty = orderCounts[it.id] || 0;
    return acc + qty * it.price;
  }, 0);

  const selectedItems = items
    .filter((it) => (orderCounts[it.id] || 0) > 0)
    .map((it) => ({
      name_vi: it.name_vi,
      count: orderCounts[it.id] || 0,
      price: it.price,
    }));

  return (
    <div className="bg-white min-h-screen text-ink pb-28">
      <ScreenHeader
        title="ORDER"
        variant="red"
        subtitle="You are standing at Phở Bà Tâm"
        backHref={`/places/${slug}`}
        backLabel="Place"
      />

      <div className="p-5 space-y-5">
        {/* Food rules box */}
        <NoteBox>
          <span className="font-bold text-xs uppercase tracking-wider block mb-0.5">
            Your food rules: no peanuts · no pork
          </span>
          {hiddenCount > 0
            ? `${hiddenCount} dish containing pork is hidden from this menu.`
            : 'All items on this menu match your dietary requirements.'}
        </NoteBox>

        {/* Quick usual button */}
        <Button variant="primary-ink" size="md" fullWidth onClick={handleOrderLinhsUsual}>
          Order Linh&apos;s usual in one tap
        </Button>

        {/* Menu list */}
        <div className="space-y-3">
          <p className="text-xs font-semibold text-muted uppercase tracking-wider">
            Shop Menu
          </p>
          {items.map((it) => (
            <div
              key={it.id}
              className="flex items-center justify-between p-3.5 border border-border rounded-[12px] bg-white hover:border-border-2"
            >
              <div>
                <h4 className="font-bold text-base text-ink">{it.name_vi}</h4>
                <p className="text-xs text-muted mt-0.5">{it.gloss_en}</p>
                <p className="text-xs font-bold text-red-text mt-1">
                  {formatVND(it.price)} · {formatUSD(it.price)}
                </p>
              </div>
              <Stepper
                value={orderCounts[it.id] || 0}
                min={0}
                max={10}
                onChange={(val) => handleStepperChange(it.id, val)}
              />
            </div>
          ))}
        </div>

        {/* YOUR ORDER summary card */}
        <DarkCard featured className="space-y-4">
          <div className="flex items-center justify-between border-b border-line-dark pb-3">
            <span className="font-anton text-lg text-yellow">YOUR ORDER</span>
            <span className="text-xs text-on-dark-2 uppercase font-semibold">
              {selectedItems.length} items selected
            </span>
          </div>

          <div className="space-y-1 text-sm text-white">
            {selectedItems.length === 0 ? (
              <p className="text-xs text-on-dark-2">Select at least one dish above</p>
            ) : (
              selectedItems.map((it, idx) => (
                <div key={idx} className="flex justify-between">
                  <span>
                    {it.count} × {it.name_vi}
                  </span>
                  <span>{formatVND(it.count * it.price)}</span>
                </div>
              ))
            )}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-line-dark">
            <span className="font-bold text-white">Total:</span>
            <div className="text-right">
              <span className="font-anton text-xl text-yellow block">
                {formatVND(totalVnd)}
              </span>
              <span className="text-xs text-on-dark-2">{formatUSD(totalVnd)}</span>
            </div>
          </div>

          {selectedItems.length > 0 && (
            <Button
              variant="primary-yellow"
              size="lg"
              fullWidth
              onClick={() => setShowVendorCard(!showVendorCard)}
            >
              {showVendorCard ? 'Hide the vendor card' : 'Show this to the vendor'}
            </Button>
          )}
        </DarkCard>

        {/* THẺ ĐƯA NGƯỜI BÁN (TURN YOUR PHONE TO THE VENDOR) */}
        {showVendorCard && selectedItems.length > 0 && (
          <div className="bg-red text-white p-5 rounded-[16px] border-2 border-yellow space-y-4 shadow-xl">
            <span className="text-xs font-anton text-yellow tracking-widest block text-center">
              TURN YOUR PHONE TO THE VENDOR
            </span>

            <div className="bg-[#A31F17] p-4 rounded-[12px] space-y-3">
              <p className="text-sm font-bold text-white">Cho cháu:</p>
              {selectedItems.map((it, idx) => (
                <p key={idx} className="font-anton text-2xl text-yellow">
                  {it.count} × {it.name_vi}
                </p>
              ))}
              <p className="text-xs font-semibold text-pink-soft italic pt-1">
                Cháu không ăn được lạc và thịt lợn ạ.
              </p>
              <p className="text-sm font-bold text-white pt-2 border-t border-white/20">
                Tổng {formatVND(totalVnd, 'vi')}, đúng không ạ?
              </p>
            </div>

            {/* Vendor response buttons */}
            <div className="space-y-2">
              <p className="text-[11px] text-pink-soft text-center uppercase tracking-wider">
                Nhờ cô/chú bấm nút trả lời:
              </p>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setVendorResponse('Yes, that is correct!')}
                  className="bg-yellow text-ink font-bold text-xs py-3 rounded-lg hover:bg-[#FFD966] transition-colors"
                >
                  Đúng rồi
                </button>
                <button
                  type="button"
                  onClick={() => setVendorResponse('Sorry, sold out!')}
                  className="bg-white text-ink font-bold text-xs py-3 rounded-lg hover:bg-gray-bg transition-colors"
                >
                  Hết món
                </button>
                <button
                  type="button"
                  onClick={() => setVendorResponse('Please wait a moment!')}
                  className="bg-ink text-white font-bold text-xs py-3 rounded-lg hover:bg-ink-2 transition-colors"
                >
                  Đợi chút
                </button>
              </div>
            </div>

            {vendorResponse && (
              <div className="bg-ink text-white p-3 rounded-[10px] text-center text-xs">
                <span className="text-yellow font-bold uppercase tracking-wider block mb-0.5">
                  Vendor answered:
                </span>
                {vendorResponse}
              </div>
            )}
          </div>
        )}

        {/* Footer links */}
        <div className="space-y-3 pt-3 text-center">
          <Link
            href={`/places/${slug}/guide`}
            className="text-xs text-red-text font-bold block hover:underline"
          >
            Food is here. How do I eat it? →
          </Link>
          <Link href="/help" className="text-xs text-muted block hover:underline">
            Stuck? Call a local
          </Link>
        </div>
      </div>
    </div>
  );
}
