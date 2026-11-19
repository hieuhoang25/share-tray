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
          Quay lại
        </Link>
        <h1 className="m-0 text-[30px] leading-[36px] font-extrabold tracking-[-0.02em]">
          Thêm quán quen của bạn
        </h1>
        <span className="text-[15px] leading-[22px] text-[#4A5852]">
          Quán không cần nổi tiếng. Chỉ cần bạn ăn ở đó nhiều lần và muốn một người bạn nước ngoài được ăn như bạn.
        </span>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-5 flex-grow">
        {/* Tên quán */}
        <div className="flex flex-col gap-2">
          <label htmlFor="ten" className="text-[14px] leading-5 font-bold">
            Tên quán
          </label>
          <input
            id="ten"
            type="text"
            placeholder="Ví dụ: Phở Bà Tâm"
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
            className="h-[52px] px-3.5 border-[1.5px] border-[#DCE2DE] rounded-[14px] bg-white font-sans text-[15px] text-[#12211D] focus:outline-none focus:border-[#0B5D4B]"
          />
        </div>

        {/* Bạn biết quán này từ đâu? */}
        <div className="flex flex-col gap-2">
          <span className="text-[14px] leading-5 font-bold">Bạn biết quán này từ đâu?</span>
          <div className="flex gap-2 flex-wrap">
            {HOW_KNOWN_OPTIONS.map((opt) => {
              const active = howKnown === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setHowKnown(opt)}
                  aria-pressed={active}
                  className={`h-11 px-4 rounded-[22px] font-sans text-[14px] transition-colors cursor-pointer ${
                    active
                      ? 'border-[1.5px] border-[#0B5D4B] bg-[#0B5D4B] font-semibold text-white'
                      : 'border-[1.5px] border-[#DCE2DE] bg-white font-medium text-[#12211D] hover:border-[#0B5D4B]'
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>

        {/* Món quen của bạn */}
        <div className="flex flex-col gap-3 p-4 rounded-[20px] bg-white shadow-[0_1px_2px_rgba(18,33,29,0.06),0_8px_24px_rgba(18,33,29,0.04)]">
          <div className="flex flex-col gap-1">
            <span className="text-[16px] leading-[22px] font-bold">Món quen của bạn</span>
            <span className="text-[13px] leading-[19px] text-[#4A5852]">
              Khách sẽ vào quán và nói “Cho cháu như [tên bạn] hay ăn”. Hãy ghi đúng món bạn vẫn gọi và giá bạn vẫn trả.
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="mon" className="text-[14px] leading-5 font-bold">
              Bạn hay gọi gì?
            </label>
            <input
              id="mon"
              type="text"
              placeholder="Phở tái nạm, nhiều hành, một quẩy"
              value={dish}
              onChange={(e) => setDish(e.target.value)}
              className="h-[52px] px-3.5 border-[1.5px] border-[#DCE2DE] rounded-[14px] bg-white font-sans text-[15px] text-[#12211D] focus:outline-none focus:border-[#0B5D4B]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="gia" className="text-[14px] leading-5 font-bold">
              Bạn trả bao nhiêu? (₫)
            </label>
            <input
              id="gia"
              type="text"
              inputMode="numeric"
              placeholder="55.000"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="h-[52px] px-3.5 border-[1.5px] border-[#DCE2DE] rounded-[14px] bg-white font-sans text-[15px] text-[#12211D] focus:outline-none focus:border-[#0B5D4B]"
            />
          </div>
        </div>

        {/* Vì sao quán này ngon? */}
        <div className="flex flex-col gap-2">
          <label htmlFor="vs" className="text-[14px] leading-5 font-bold">
            Vì sao quán này ngon? (điểm đặc biệt)
          </label>
          <textarea
            id="vs"
            placeholder="Nước dùng ninh xương qua đêm, trong mà không ngọt…"
            value={special}
            onChange={(e) => setSpecial(e.target.value)}
            className="h-24 p-[12px_14px] border-[1.5px] border-[#DCE2DE] rounded-[14px] bg-white font-sans text-[15px] leading-[22px] text-[#12211D] resize-none focus:outline-none focus:border-[#0B5D4B]"
          />
        </div>

        {/* Chấm điểm */}
        <div className="flex flex-col gap-1 p-4 rounded-[20px] bg-white shadow-[0_1px_2px_rgba(18,33,29,0.06),0_8px_24px_rgba(18,33,29,0.04)]">
          <span className="text-[14px] leading-5 font-bold mb-1">
            Chấm điểm (chạm để chọn)
          </span>
          {CRITERIA.map((c) => {
            const currentScore = scores[c.id] ?? c.init;
            return (
              <div key={c.id} className="flex items-center justify-between gap-2 py-0.5">
                <span className="text-[14px] leading-5">{c.label}</span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const isOn = star <= currentScore;
                    return (
                      <button
                        key={star}
                        type="button"
                        aria-label={`${c.label}: ${star} trên 5`}
                        onClick={() => handleScore(c.id, star)}
                        className="flex items-center justify-center w-10 h-11 border-none bg-transparent p-0 cursor-pointer"
                      >
                        {isOn ? (
                          <span className="w-[22px] h-[22px] rounded-full bg-[#0B5D4B]" />
                        ) : (
                          <span className="w-[22px] h-[22px] box-border rounded-full border-2 border-[#9DAAA4] bg-white" />
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
          <span className="text-[14px] leading-5 font-bold">
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
                  className={`h-11 px-4 rounded-[22px] font-sans text-[14px] transition-colors cursor-pointer ${
                    active
                      ? 'border-[1.5px] border-[#0B5D4B] bg-[#0B5D4B] font-semibold text-white'
                      : 'border-[1.5px] border-[#DCE2DE] bg-white font-medium text-[#12211D] hover:border-[#0B5D4B]'
                  }`}
                >
                  {am}
                </button>
              );
            })}
          </div>
        </div>

        {/* Kỷ niệm của bạn với quán */}
        <div className="flex flex-col gap-2">
          <label htmlFor="bl" className="text-[14px] leading-5 font-bold">
            Kỷ niệm của bạn với quán
          </label>
          <textarea
            id="bl"
            placeholder="Bốn năm đại học sáng nào mình cũng ăn ở đây…"
            value={memory}
            onChange={(e) => setMemory(e.target.value)}
            className="h-24 p-[12px_14px] border-[1.5px] border-[#DCE2DE] rounded-[14px] bg-white font-sans text-[15px] leading-[22px] text-[#12211D] resize-none focus:outline-none focus:border-[#0B5D4B]"
          />
        </div>

        <p className="m-0 text-[13px] leading-[19px] text-[#4A5852]">
          Bạn cứ viết tiếng Việt, ứng dụng tự dịch và giữ bản gốc. Mỗi lần có khách ăn món quen của bạn, bạn sẽ nhận được lời cảm ơn.
        </p>

        {/* Submit */}
        <button
          type="submit"
          className="flex items-center justify-center h-14 border-none rounded-[16px] bg-[#0B5D4B] font-sans text-[16px] font-bold text-white cursor-pointer hover:bg-[#083F34] transition-colors"
        >
          Gửi quán quen
        </button>
      </form>

      {/* Footer */}
      <div className="mt-auto px-5 pt-6 pb-5 text-[12px] leading-4 text-[#4A5852] text-center">
        mâm · ăn cùng nhau ở Việt Nam
      </div>
    </div>
  );
}
