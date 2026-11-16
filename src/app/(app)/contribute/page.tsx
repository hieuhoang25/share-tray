'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const HOW_KNOWN_OPTIONS = [
  'Sống gần đây',
  'Thời sinh viên',
  'Làm việc gần đây',
  'Người quen dẫn đi',
];

const AMENITIES_OPTIONS = [
  'Cây ATM',
  'Nhà thuốc',
  'Nhà vệ sinh sạch',
  'Điểm tham quan',
  'Quán ăn tiếp theo',
];

interface Criterion {
  id: 'gia' | 'pv' | 'kg';
  label: string;
  init: number;
}

const CRITERIA: Criterion[] = [
  { id: 'gia', label: 'Giá cả', init: 5 },
  { id: 'pv', label: 'Thái độ phục vụ', init: 4 },
  { id: 'kg', label: 'Không gian quán', init: 3 },
];

export default function ContributeScreen() {
  const router = useRouter();
  const [shopName, setShopName] = useState('');
  const [howKnown, setHowKnown] = useState('Thời sinh viên');
  const [dish, setDish] = useState('');
  const [price, setPrice] = useState('');
  const [special, setSpecial] = useState('');
  const [scores, setScores] = useState<Record<string, number>>({
    gia: 5,
    pv: 4,
    kg: 3,
  });
  const [amenities, setAmenities] = useState<Record<string, boolean>>({
    'Cây ATM': true,
    'Nhà thuốc': true,
  });
  const [memory, setMemory] = useState('');

  const toggleAmenity = (name: string) => {
    setAmenities((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const handleScore = (id: string, val: number) => {
    setScores((prev) => ({
      ...prev,
      [id]: val,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Cảm ơn bạn! Quán quen của bạn đã được gửi thành công.');
    router.push('/');
  };

  return (
    <div className="w-full max-w-[390px] mx-auto min-h-screen bg-white text-ink flex flex-col font-sans pb-28">
      {/* Dark Header */}
      <div className="flex flex-col gap-1.5 px-5 pt-3 pb-5 bg-[#15171A] text-white">
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
          Quay lại
        </Link>
        <h1 className="m-0 font-anton text-4xl leading-[44px] tracking-[0.01em]">
          THÊM QUÁN QUEN CỦA BẠN
        </h1>
        <span className="text-sm leading-5 text-[#D5D9DE]">
          Quán không cần nổi tiếng. Chỉ cần bạn ăn ở đó nhiều lần và muốn một người bạn nước ngoài được ăn như bạn.
        </span>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-[18px] p-5 flex-grow">
        {/* Tên quán */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="ten" className="text-[13px] font-bold text-[#15171A]">
            Tên quán
          </label>
          <input
            id="ten"
            type="text"
            placeholder="Ví dụ: Phở Bà Tâm"
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
            className="h-12 px-3.5 border border-[#C5C9CE] rounded-[12px] font-sans text-[15px] text-[#15171A] bg-white focus:outline-none focus:border-[#15171A]"
          />
        </div>

        {/* Bạn biết quán này từ đâu? */}
        <div className="flex flex-col gap-2">
          <span className="text-[13px] font-bold text-[#15171A]">Bạn biết quán này từ đâu?</span>
          <div className="flex gap-2 flex-wrap">
            {HOW_KNOWN_OPTIONS.map((opt) => {
              const active = howKnown === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setHowKnown(opt)}
                  aria-pressed={active}
                  className={`h-11 px-3.5 rounded-[22px] font-sans text-[13px] transition-colors cursor-pointer ${
                    active
                      ? 'border-2 border-[#15171A] bg-[#15171A] font-bold text-white'
                      : 'border border-[#C5C9CE] bg-white font-normal text-[#15171A] hover:border-[#15171A]'
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>

        {/* Món quen của bạn (Cream box) */}
        <div className="flex flex-col gap-2.5 p-3.5 rounded-[12px] bg-[#FFF3D1]">
          <span className="text-sm font-bold text-[#15171A]">Món quen của bạn</span>
          <span className="text-[13px] leading-[19px] text-[#15171A]">
            Khách sẽ vào quán và nói “Cho cháu như [tên bạn] hay ăn”. Hãy ghi đúng món bạn vẫn gọi và giá bạn vẫn trả.
          </span>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="mon" className="text-[13px] font-semibold text-[#15171A]">
              Bạn hay gọi gì?
            </label>
            <input
              id="mon"
              type="text"
              placeholder="Phở tái nạm, nhiều hành, một quẩy"
              value={dish}
              onChange={(e) => setDish(e.target.value)}
              className="h-12 px-3.5 border border-[#C9A94A] rounded-[12px] font-sans text-[15px] text-[#15171A] bg-white focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="gia" className="text-[13px] font-semibold text-[#15171A]">
              Bạn trả bao nhiêu? (₫)
            </label>
            <input
              id="gia"
              type="text"
              inputMode="numeric"
              placeholder="55.000"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="h-12 px-3.5 border border-[#C9A94A] rounded-[12px] font-sans text-[15px] text-[#15171A] bg-white focus:outline-none"
            />
          </div>
        </div>

        {/* Vì sao quán này ngon? */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="vs" className="text-[13px] font-bold text-[#15171A]">
            Vì sao quán này ngon? (điểm đặc biệt)
          </label>
          <textarea
            id="vs"
            placeholder="Nước dùng ninh xương qua đêm, trong mà không ngọt…"
            value={special}
            onChange={(e) => setSpecial(e.target.value)}
            className="h-20 p-3 sm:px-3.5 border border-[#C5C9CE] rounded-[12px] font-sans text-sm leading-5 text-[#15171A] bg-white resize-none focus:outline-none focus:border-[#15171A]"
          />
        </div>

        {/* Chấm điểm */}
        <div className="flex flex-col gap-1">
          <span className="text-[13px] font-bold text-[#15171A]">Chấm điểm (chạm để chọn)</span>
          {CRITERIA.map((c) => {
            const currentScore = scores[c.id] ?? c.init;
            return (
              <div key={c.id} className="flex items-center justify-between py-0.5">
                <span className="text-sm text-[#15171A]">{c.label}</span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const isOn = star <= currentScore;
                    return (
                      <button
                        key={star}
                        type="button"
                        aria-label={`${c.label}: ${star} trên 5`}
                        onClick={() => handleScore(c.id, star)}
                        className="w-11 h-11 p-0 border-none bg-transparent flex items-center justify-center cursor-pointer"
                      >
                        {isOn ? (
                          <span className="w-6 h-6 rounded-full bg-[#FFC72C] border-2 border-[#15171A] box-border inline-block" />
                        ) : (
                          <span className="w-6 h-6 rounded-full bg-white border-2 border-[#8A9099] box-border inline-block" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Quanh quán có gì tiện cho khách? */}
        <div className="flex flex-col gap-2">
          <span className="text-[13px] font-bold text-[#15171A]">
            Quanh quán có gì tiện cho khách?
          </span>
          <div className="flex gap-2 flex-wrap">
            {AMENITIES_OPTIONS.map((am) => {
              const active = !!amenities[am];
              return (
                <button
                  key={am}
                  type="button"
                  onClick={() => toggleAmenity(am)}
                  aria-pressed={active}
                  className={`h-11 px-3.5 rounded-[22px] font-sans text-[13px] transition-colors cursor-pointer ${
                    active
                      ? 'border-2 border-[#15171A] bg-[#15171A] font-bold text-white'
                      : 'border border-[#C5C9CE] bg-white font-normal text-[#15171A] hover:border-[#15171A]'
                  }`}
                >
                  {am}
                </button>
              );
            })}
          </div>
        </div>

        {/* Kỷ niệm của bạn với quán */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="bl" className="text-[13px] font-bold text-[#15171A]">
            Kỷ niệm của bạn với quán
          </label>
          <textarea
            id="bl"
            placeholder="Bốn năm đại học sáng nào mình cũng ăn ở đây…"
            value={memory}
            onChange={(e) => setMemory(e.target.value)}
            className="h-20 p-3 sm:px-3.5 border border-[#C5C9CE] rounded-[12px] font-sans text-sm leading-5 text-[#15171A] bg-white resize-none focus:outline-none focus:border-[#15171A]"
          />
        </div>

        <p className="m-0 text-xs leading-[18px] text-[#4A5059]">
          Bạn cứ viết tiếng Việt, ứng dụng tự dịch và giữ bản gốc. Mỗi lần có khách ăn món quen của bạn, bạn sẽ nhận được lời cảm ơn.
        </p>

        {/* Submit */}
        <button
          type="submit"
          className="mt-auto h-[52px] border-none rounded-[12px] bg-[#C8281E] font-sans text-base font-bold text-white cursor-pointer hover:bg-[#A31F17] transition-colors"
        >
          Gửi quán quen
        </button>
      </form>
    </div>
  );
}
