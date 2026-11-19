'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';

const TABS = [
  { id: 'find', label: '1 Find it', title: 'The last 50 metres' },
  { id: 'eat', label: '2 Eat it', title: 'Eat it like a local' },
  { id: 'pay', label: '3 Pay', title: 'Pay the local price' },
] as const;

type TabKey = (typeof TABS)[number]['id'];

const FIND_STEPS = [
  {
    n: 1,
    photo: 'Photo by a local: the alley entrance',
    text: 'Turn into the alley beside the pharmacy with the green cross. There is no street sign.',
  },
  {
    n: 2,
    photo: 'Photo by a local: inside the alley',
    text: 'Walk past the motorbike repair shop. Keep left where the alley splits.',
  },
  {
    n: 3,
    photo: 'Photo by a local: the shop front',
    text: 'Look for the steaming pot and blue stools. Sit anywhere; nobody seats you.',
  },
];

const EAT_STEPS = [
  {
    n: 1,
    title: 'Taste the broth first',
    text: 'One spoon, before you add anything. The broth is what the shop is proud of.',
  },
  {
    n: 2,
    title: 'Season a little at a time',
    text: 'Start with a squeeze of lime. Add chili slowly.',
  },
  {
    n: 3,
    title: 'Chopsticks in one hand, spoon in the other',
    text: 'Lift the noodles with chopsticks, sip with the spoon. Slurping is normal.',
  },
  {
    n: 4,
    title: 'Wipe your chopsticks, nobody minds',
    text: 'Locals wipe them with a tissue from the box on the table before eating.',
  },
];

const TABLE_ITEMS = [
  { vi: 'Chanh', en: 'Lime wedges', note: 'Mild · start here' },
  { vi: 'Giấm tỏi', en: 'Garlic vinegar', note: 'Sour · one spoon' },
  { vi: 'Ớt tươi', en: 'Fresh chili', note: 'Very hot · one slice' },
  { vi: 'Tương ớt', en: 'Chili sauce', note: 'Hot · a small dab' },
];

export default function GuideScreen({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [tab, setTab] = useState<TabKey>('find');
  const [paidVal, setPaidVal] = useState('');
  const [sharedPaid, setSharedPaid] = useState(false);

  const currentTabDef = TABS.find((t) => t.id === tab) || TABS[0];

  const handleSharePaid = () => {
    if (paidVal.trim()) {
      setSharedPaid(true);
    }
  };

  return (
    <div className="w-full flex flex-col text-ink font-sans pb-10">
      {/* Top Header */}
      <div className="flex flex-col gap-2.5 px-5 pt-3">
        <Link
          href={`/places/${slug}`}
          className="flex items-center gap-1.5 h-11 self-start text-sm font-semibold text-[#0B5D4B] hover:text-[#083F34] transition-colors"
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
          Phở Bà Tâm
        </Link>

        <h1 className="m-0 text-[30px] leading-9 font-extrabold tracking-[-0.02em] text-ink">
          {currentTabDef.title}
        </h1>

        {/* 3 Tabs Grid */}
        <div className="grid grid-cols-3 gap-1 p-1 rounded-[16px] bg-white">
          {TABS.map((t) => {
            const active = t.id === tab;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                aria-pressed={active}
                className={`h-11 rounded-[12px] text-sm transition-colors cursor-pointer ${
                  active
                    ? 'border-none bg-[#0B5D4B] font-bold text-white'
                    : 'border-none bg-transparent font-medium text-ink hover:text-[#0B5D4B]'
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: FIND IT */}
      {tab === 'find' && (
        <div className="flex flex-col gap-3.5 px-5 pt-4 flex-grow">
          {/* Status banner */}
          <div className="flex items-center gap-2.5 p-[12px_14px] rounded-[14px] bg-[#E2F0EA]">
            <span
              aria-hidden="true"
              className="w-2.5 h-2.5 shrink-0 rounded-full bg-[#0B5D4B]"
            />
            <span className="text-[13px] leading-[18px] font-semibold text-[#083F34]">
              Open and still serving · confirmed by a local 20 min ago
            </span>
          </div>

          <p className="m-0 text-[15px] leading-[22px] text-[#4A5852]">
            The map gets you to the street. A neighbour gets you to the door.
          </p>

          {/* Steps */}
          {FIND_STEPS.map((step) => (
            <div
              key={step.n}
              className="flex flex-col gap-3 p-4 rounded-[20px] bg-white shadow-[0_1px_2px_rgba(18,33,29,0.06),0_8px_24px_rgba(18,33,29,0.04)]"
            >
              <div className="h-[110px] rounded-[16px] border-[1.5px] border-dashed border-[#9DBFB3] bg-[#E2F0EA] text-[13px] leading-[18px] font-medium text-[#083F34] flex items-center justify-center text-center p-3">
                {step.photo}
              </div>
              <div className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="w-8 h-8 shrink-0 rounded-full bg-[#0B5D4B] text-white font-bold text-[14px] flex items-center justify-center"
                >
                  {step.n}
                </span>
                <span className="text-[14px] leading-5 text-ink">{step.text}</span>
              </div>
            </div>
          ))}

          {/* PhraseCard Lost Box */}
          <div className="flex flex-col gap-1.5 p-5 rounded-[24px] bg-[#083F34] text-white">
            <span className="text-[12px] leading-4 font-bold tracking-[0.08em] uppercase text-[#BFD8CF]">
              Lost? Show this to anyone nearby
            </span>
            <span className="text-[22px] leading-[30px] font-bold text-white">
              Quán phở Bà Tâm ở đâu ạ?
            </span>
            <span className="text-[14px] leading-5 text-[#BFD8CF]">
              Where is Bà Tâm’s phở shop, please?
            </span>
          </div>

          <Link
            href={`/places/${slug}/order`}
            className="mt-1 flex items-center justify-center h-[56px] rounded-[16px] bg-[#0B5D4B] text-[16px] font-bold text-white hover:bg-[#083F34] transition-colors cursor-pointer"
          >
            I’m here. Help me order
          </Link>
        </div>
      )}

      {/* TAB 2: EAT IT */}
      {tab === 'eat' && (
        <div className="flex flex-col gap-3.5 px-5 pt-4 flex-grow">
          <p className="m-0 text-[15px] leading-[22px] text-[#4A5852]">
            Phở, the Hà Nội way. Written by people who eat here.
          </p>

          {/* Eat steps */}
          <div className="flex flex-col gap-3.5 p-4 rounded-[20px] bg-white shadow-[0_1px_2px_rgba(18,33,29,0.06),0_8px_24px_rgba(18,33,29,0.04)]">
            {EAT_STEPS.map((step) => (
              <div key={step.n} className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="w-8 h-8 shrink-0 rounded-full bg-[#0B5D4B] text-white font-bold text-[14px] flex items-center justify-center"
                >
                  {step.n}
                </span>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[14px] leading-5 font-bold text-ink">
                    {step.title}
                  </span>
                  <span className="text-[14px] leading-5 text-[#4A5852]">
                    {step.text}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <h2 className="m-0 text-[20px] leading-[26px] font-bold tracking-[-0.01em] text-ink pt-1">
            What is on the table (all free)
          </h2>

          <div className="grid grid-cols-2 gap-2.5">
            {TABLE_ITEMS.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col gap-0.5 p-[12px_14px] rounded-[16px] bg-white shadow-[0_1px_2px_rgba(18,33,29,0.06),0_8px_24px_rgba(18,33,29,0.04)]"
              >
                <span className="text-[16px] leading-[22px] font-bold text-ink">
                  {item.vi}
                </span>
                <span className="text-[13px] leading-[19px] text-[#4A5852]">
                  {item.en}
                </span>
                <span className="text-[12px] leading-4 font-semibold text-[#0B5D4B]">
                  {item.note}
                </span>
              </div>
            ))}
          </div>

          {/* Stomach box */}
          <div className="flex flex-col gap-0.5 p-[12px_14px] rounded-[14px] bg-[#E2F0EA]">
            <span className="text-[14px] leading-5 font-bold text-[#083F34]">
              Worried about your stomach?
            </span>
            <span className="text-[13px] leading-[19px] text-[#083F34]">
              Locals note: cooked to order and served boiling hot. Busy all morning, so nothing sits out.
            </span>
          </div>
        </div>
      )}

      {/* TAB 3: PAY */}
      {tab === 'pay' && (
        <div className="flex flex-col gap-3.5 px-5 pt-4 flex-grow">
          <p className="m-0 text-[15px] leading-[22px] text-[#4A5852]">
            No bill comes to the table. Catch the owner’s eye and say “Tính tiền” (tin tee-en).
          </p>

          {/* Benchmark card */}
          <div className="flex flex-col gap-1 p-5 rounded-[24px] bg-[#083F34] text-white">
            <span className="text-[12px] leading-4 font-bold tracking-[0.08em] uppercase text-[#BFD8CF]">
              What locals paid here this month
            </span>
            <span className="text-[28px] leading-9 font-extrabold tracking-[-0.02em] text-white">
              40,000–55,000₫ <span className="text-[14px] font-medium tracking-normal text-[#BFD8CF]">a bowl</span>
            </span>
            <span className="text-[14px] leading-5 text-[#BFD8CF]">
              Asked for more than 60,000₫? Smile and ask again: “Bao nhiêu tiền?” (bow nyew tee-en).
            </span>
          </div>

          {/* Cash note illustration */}
          <h2 className="m-0 text-[20px] leading-[26px] font-bold tracking-[-0.01em] text-ink pt-1">
            For 55,000₫, hand over this
          </h2>

          <div className="flex items-center gap-2.5">
            <div className="flex flex-col items-center justify-center gap-0.5 w-[92px] h-16 rounded-[12px] bg-[#F3C9D3] text-[#5A1730]">
              <span className="text-[18px] font-extrabold">50,000</span>
              <span className="text-[11px] font-semibold">pink note</span>
            </div>

            <span aria-hidden="true" className="text-[20px] font-bold text-ink">
              +
            </span>

            <div className="flex flex-col items-center justify-center gap-0.5 w-[92px] h-16 rounded-[12px] bg-[#E6D2A8] text-[#4A3608]">
              <span className="text-[18px] font-extrabold">10,000</span>
              <span className="text-[11px] font-semibold">yellow-brown</span>
            </div>

            <span className="text-[13px] leading-[18px] font-semibold text-[#0B5D4B]">
              5,000 back
            </span>
          </div>

          {/* Two blue notes warning */}
          <div className="flex flex-col gap-2.5 p-3.5 rounded-[16px] bg-[#FFE9E1]">
            <span className="text-[14px] leading-5 font-bold text-[#8A2A12]">
              Careful: two blue notes, 25 times apart
            </span>
            <div className="flex gap-2.5">
              <div className="flex flex-col items-center justify-center gap-0.5 flex-1 h-16 rounded-[12px] bg-[#BFD6F2] text-[#12325C]">
                <span className="text-[18px] font-extrabold">20,000</span>
                <span className="text-[11px] font-semibold">about $0.80</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-0.5 flex-1 h-16 rounded-[12px] bg-[#9CC3D9] text-[#0C3148]">
                <span className="text-[18px] font-extrabold">500,000</span>
                <span className="text-[11px] font-semibold">about $19</span>
              </div>
            </div>
            <span className="text-[13px] leading-[19px] text-[#12211D]">
              Count the zeros before you hand a blue note over.
            </span>
          </div>

          {/* What did you pay input */}
          <div className="flex flex-col gap-2 p-4 rounded-[20px] bg-white shadow-[0_1px_2px_rgba(18,33,29,0.06),0_8px_24px_rgba(18,33,29,0.04)]">
            <label htmlFor="paid" className="text-[14px] leading-5 font-bold text-ink">
              What did you pay?
            </label>
            <div className="flex gap-2">
              <input
                id="paid"
                type="text"
                inputMode="numeric"
                placeholder="55,000"
                value={paidVal}
                onChange={(e) => setPaidVal(e.target.value)}
                className="flex-1 min-w-0 h-[52px] px-3.5 border-[1.5px] border-[#DCE2DE] rounded-[14px] text-[15px] text-ink bg-white focus:outline-none focus:border-jade"
              />
              <button
                type="button"
                onClick={handleSharePaid}
                className="flex items-center justify-center h-[52px] px-5 rounded-[16px] bg-[#0B5D4B] text-[15px] font-bold text-white hover:bg-[#083F34] transition-colors cursor-pointer shrink-0"
              >
                {sharedPaid ? 'Shared ✓' : 'Share'}
              </button>
            </div>
            <span className="text-[13px] leading-[19px] text-[#4A5852]">
              One tap keeps the price honest for the next traveller.
            </span>
          </div>

          {/* Stamp Card */}
          <div className="flex items-center gap-3">
            <div
              aria-hidden="true"
              className="w-14 h-14 shrink-0 rounded-[16px] bg-[#0B5D4B] text-white font-bold text-[14px] flex items-center justify-center"
            >
              Phở
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[14px] leading-5 font-bold text-ink">
                Stamp earned, signed by Linh
              </span>
              <span className="text-[13px] leading-[19px] text-[#4A5852]">
                Send her a photo and a thank-you. 4 of 12 dishes done.
              </span>
            </div>
          </div>

          <Link
            href="/dishes"
            className="mt-1 flex items-center justify-center h-[56px] rounded-[16px] bg-[#0B5D4B] text-[16px] font-bold text-white hover:bg-[#083F34] transition-colors cursor-pointer"
          >
            Find my next dish
          </Link>
        </div>
      )}

      {/* Footer text */}
      <div className="mt-auto px-5 pt-6 pb-5 text-[12px] leading-4 text-[#4A5852] text-center">
        mâm · eat together in Việt Nam
      </div>
    </div>
  );
}
