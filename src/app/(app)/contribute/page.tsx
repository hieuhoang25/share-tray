'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ScreenHeader, DotRating, Button } from '@/components/ui';

export default function ContributeScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [howKnown, setHowKnown] = useState('Sống gần đây');
  const [usualOrder, setUsualOrder] = useState('');
  const [pricePaid, setPricePaid] = useState('50000');
  const [whyDelicious, setWhyDelicious] = useState('');
  const [scorePrice, setScorePrice] = useState(5);
  const [scoreService, setScoreService] = useState(4);
  const [scoreSpace, setScoreSpace] = useState(4);
  const [memory, setMemory] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/contributions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          how_known: howKnown,
          usual_order: usualOrder,
          price_paid: Number(pricePaid),
          why_delicious: whyDelicious,
          score_price: scorePrice,
          score_service: scoreService,
          score_space: scoreSpace,
          memory,
        }),
      });

      if (res.ok) {
        alert('Cảm ơn bạn! Quán quen của bạn đã được gửi và đang chờ Admin duyệt.');
        router.push('/');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white min-h-screen text-ink pb-28">
      <ScreenHeader
        title="THÊM QUÁN QUEN"
        variant="dark"
        subtitle="Dành cho người Việt chia sẻ quán ruột"
        backHref="/"
        backLabel="Trang chủ"
      />

      <form onSubmit={handleSubmit} className="p-5 space-y-6">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
            Tên quán ăn *
          </label>
          <input
            type="text"
            required
            placeholder="VD: Phở Bà Tâm, Bún chả Hàng Quạt"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3.5 py-3 border border-border-2 rounded-[12px] text-sm focus:border-red focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
            Bạn biết quán này từ đâu?
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[
              'Sống gần đây',
              'Thời sinh viên',
              'Làm việc gần đây',
              'Người quen dẫn đi',
            ].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setHowKnown(option)}
                className={`p-3 rounded-[12px] border text-xs font-semibold text-left transition-all ${
                  howKnown === option
                    ? 'bg-ink text-white border-ink'
                    : 'bg-white text-muted border-border hover:border-ink'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Hộp cream Món quen */}
        <div className="bg-cream border border-cream-border rounded-[14px] p-4 space-y-3">
          <span className="text-xs font-anton text-cream-text tracking-wider block">
            MÓN QUEN BẠN HAY GỌI
          </span>
          <div>
            <label className="block text-xs text-cream-text font-bold mb-1">
              Bạn hay gọi gì khi đến quán?
            </label>
            <input
              type="text"
              required
              placeholder="VD: Phở tái nạm gầu, 2 quẩy giòn và 1 trứng trần"
              value={usualOrder}
              onChange={(e) => setUsualOrder(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-cream-border rounded-lg text-sm text-ink focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs text-cream-text font-bold mb-1">
              Bạn thường trả bao nhiêu tiền (VNĐ)?
            </label>
            <input
              type="number"
              required
              value={pricePaid}
              onChange={(e) => setPricePaid(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-cream-border rounded-lg text-sm text-ink focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
            Vì sao quán này ngon? *
          </label>
          <textarea
            required
            rows={3}
            placeholder="Nước dùng ngọt thanh xương hầm 18 tiếng, bánh phở mềm dẻo..."
            value={whyDelicious}
            onChange={(e) => setWhyDelicious(e.target.value)}
            className="w-full px-3.5 py-2.5 border border-border-2 rounded-[12px] text-sm focus:border-red focus:outline-none"
          />
        </div>

        {/* Chấm điểm DotRating 1-5 */}
        <div className="space-y-3 p-4 bg-gray-bg rounded-[14px] border border-border">
          <span className="text-xs font-anton text-ink tracking-wider block">
            ĐÁNH GIÁ THỰC TẾ CỦA BẠN (1–5)
          </span>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-muted">Giá cả hợp lý:</span>
            <DotRating value={scorePrice} onChange={setScorePrice} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-muted">Thái độ phục vụ:</span>
            <DotRating value={scoreService} onChange={setScoreService} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-muted">Không gian quán:</span>
            <DotRating value={scoreSpace} onChange={setScoreSpace} />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
            Kỷ niệm của bạn với quán (tuỳ chọn)
          </label>
          <textarea
            rows={2}
            placeholder="Những ngày mưa thời sinh viên ngồi ăn phở ngắm ngõ nhỏ..."
            value={memory}
            onChange={(e) => setMemory(e.target.value)}
            className="w-full px-3.5 py-2.5 border border-border-2 rounded-[12px] text-sm focus:border-red focus:outline-none"
          />
        </div>

        <p className="text-[11px] text-muted italic">
          * Đóng góp của bạn sẽ được tự động dịch sang tiếng Anh cho du khách quốc tế và gửi đến Admin phê duyệt trước khi xuất hiện trên bản đồ ẩm thực.
        </p>

        <Button
          type="submit"
          variant="primary-red"
          size="lg"
          fullWidth
          disabled={submitting}
        >
          {submitting ? 'Đang gửi...' : 'Gửi quán quen'}
        </Button>
      </form>
    </div>
  );
}
