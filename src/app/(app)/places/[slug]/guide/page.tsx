'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';

const TABS = [
  { id: 'find', label: '1 Find it', title: 'THE LAST 50 METRES' },
  { id: 'eat', label: '2 Eat it', title: 'EAT IT LIKE A LOCAL' },
  { id: 'pay', label: '3 Pay', title: 'PAY THE LOCAL PRICE' },
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
    <div className="w-full min-h-screen bg-white text-ink flex flex-col font-sans pb-10">
      {/* Dark Header */}
      <div className="flex flex-col gap-2.5 px-5 pt-3 pb-4 bg-ink text-white">
        <Link
          href={`/places/${slug}`}
          className="flex items-center gap-1.5 h-11 text-sm font-medium text-yellow hover:underline"
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

        <h1 className="m-0 font-anton font-normal text-[34px] leading-10 text-white tracking-[0.01em]">
          {currentTabDef.title}
        </h1>

        {/* 3 Tabs Grid */}
        <div className="grid grid-cols-3 gap-2">
          {TABS.map((t) => {
            const active = t.id === tab;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                aria-pressed={active}
                className={`h-11 rounded-[10px] text-sm transition-colors cursor-pointer ${
                  active
                    ? 'border-2 border-yellow bg-yellow font-bold text-ink'
                    : 'border border-muted-2 bg-transparent font-medium text-white hover:border-white'
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
        <div className="flex flex-col gap-3.5 p-5 flex-grow">
          {/* Status banner */}
          <div className="flex items-center gap-2 p-[10px_12px] rounded-[10px] bg-cream">
            <span
              aria-hidden="true"
              className="w-2.5 h-2.5 shrink-0 rounded-full bg-green"
            />
            <span className="text-[13px] font-semibold text-ink">
              Open and still serving · confirmed by a local 20 min ago
            </span>
          </div>

          <p className="m-0 text-sm leading-5 text-muted">
            The map gets you to the street. A neighbour gets you to the door.
          </p>

          {/* Steps */}
          {FIND_STEPS.map((step) => (
            <div key={step.n} className="flex flex-col gap-2">
              <div className="h-[104px] rounded-xl bg-border flex items-center justify-center text-xs text-muted">
                {step.photo}
              </div>
              <div className="flex gap-2.5">
                <span className="font-anton font-normal text-2xl leading-[26px] text-red w-[18px] shrink-0">
                  {step.n}
                </span>
                <span className="text-sm leading-5 text-ink">{step.text}</span>
              </div>
            </div>
          ))}

          {/* Lost Box (PhraseCard) */}
          <div className="flex flex-col gap-1 p-3.5 rounded-xl bg-red text-white">
            <span className="text-[11px] font-semibold tracking-[0.06em] text-pink-soft uppercase">
              LOST? SHOW THIS TO ANYONE NEARBY
            </span>
            <span className="text-xl leading-7 font-bold text-yellow">
              Quán phở Bà Tâm ở đâu ạ?
            </span>
            <span className="text-xs text-pink-soft">
              Where is Bà Tâm’s phở shop, please?
            </span>
          </div>

          <Link
            href={`/places/${slug}/order`}
            className="mt-auto flex items-center justify-center h-[52px] rounded-xl bg-ink text-base font-bold text-yellow hover:bg-ink-2 transition-colors cursor-pointer"
          >
            I’m here. Help me order
          </Link>
        </div>
      )}

      {/* TAB 2: EAT IT */}
      {tab === 'eat' && (
        <div className="flex flex-col gap-3.5 p-5 flex-grow">
          <p className="m-0 text-sm leading-5 text-muted">
            Phở, the Hà Nội way. Written by people who eat here.
          </p>

          {/* Eat steps */}
          {EAT_STEPS.map((step) => (
            <div key={step.n} className="flex gap-3">
              <span className="font-anton font-normal text-[30px] leading-8 text-red w-[22px] shrink-0">
                {step.n}
              </span>
              <div className="flex flex-col gap-0.5">
                <span className="text-[15px] font-bold text-ink">{step.title}</span>
                <span className="text-[13px] leading-[19px] text-ink">{step.text}</span>
              </div>
            </div>
          ))}

          <h2 className="m-0 text-base font-bold text-ink pt-1">
            What is on the table (all free)
          </h2>

          <div className="grid grid-cols-2 gap-2.5">
            {TABLE_ITEMS.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col gap-0.5 p-[10px_12px] border border-border rounded-xl bg-white"
              >
                <span className="text-[15px] font-bold text-red-text">{item.vi}</span>
                <span className="text-xs text-ink">{item.en}</span>
                <span className="text-xs text-muted">{item.note}</span>
              </div>
            ))}
          </div>

          {/* Stomach box */}
          <div className="flex flex-col gap-1 p-3.5 rounded-xl bg-gray-bg">
            <span className="text-sm font-bold text-ink">
              Worried about your stomach?
            </span>
            <span className="text-[13px] leading-[19px] text-ink">
              Locals note: cooked to order and served boiling hot. Busy all morning, so nothing sits out.
            </span>
          </div>
        </div>
      )}

      {/* TAB 3: PAY */}
      {tab === 'pay' && (
        <div className="flex flex-col gap-3.5 p-5 flex-grow">
          <p className="m-0 text-sm leading-5 text-muted">
            No bill comes to the table. Catch the owner’s eye and say “Tính tiền” (tin tee-en).
          </p>

          {/* Benchmark card */}
          <div className="flex flex-col gap-2 p-4 rounded-xl bg-gray-bg">
            <span className="text-xs font-semibold text-muted">
              What locals paid here this month
            </span>
            <span className="text-[22px] font-bold text-ink">
              40,000–55,000₫ <span className="text-[13px] font-medium text-muted">a bowl</span>
            </span>
            <span className="text-[13px] leading-[19px] text-ink">
              Asked for more than 60,000₫? Smile and ask again: “Bao nhiêu tiền?” (bow nyew tee-en).
            </span>
          </div>

          {/* Cash note illustration */}
          <h2 className="m-0 text-base font-bold text-ink pt-1">
            For 55,000₫, hand over this
          </h2>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="w-[104px] h-[52px] rounded-md bg-[#F0B8CC] border border-[#B8708C] box-border flex flex-col justify-center px-2.5">
              <span className="text-[15px] font-bold text-ink">50,000</span>
              <span className="text-[11px] text-ink">pink note</span>
            </div>

            <span className="text-base font-bold text-ink">+</span>

            <div className="w-[104px] h-[52px] rounded-md bg-[#E6D3A8] border border-[#A68A4A] box-border flex flex-col justify-center px-2.5">
              <span className="text-[15px] font-bold text-ink">10,000</span>
              <span className="text-[11px] text-ink">yellow-brown</span>
            </div>

            <span className="text-[13px] text-muted">5,000 back</span>
          </div>

          {/* Two blue notes warning */}
          <div className="flex flex-col gap-2.5 p-3.5 border-2 border-ink rounded-xl bg-white">
            <span className="text-sm font-bold text-ink">
              Careful: two blue notes, 25 times apart
            </span>
            <div className="flex gap-2.5">
              <div className="flex-1 h-[52px] rounded-md bg-[#A9C0EC] border border-[#5B78B8] box-border flex flex-col justify-center px-2.5">
                <span className="text-[15px] font-bold text-ink">20,000</span>
                <span className="text-[11px] text-ink">about $0.80</span>
              </div>
              <div className="flex-1 h-[52px] rounded-md bg-[#8FD3DA] border border-[#3F8F98] box-border flex flex-col justify-center px-2.5">
                <span className="text-[15px] font-bold text-ink">500,000</span>
                <span className="text-[11px] text-ink">about $19</span>
              </div>
            </div>
            <span className="text-[13px] leading-[19px] text-ink">
              Count the zeros before you hand a blue note over.
            </span>
          </div>

          {/* What did you pay input */}
          <div className="flex flex-col gap-2">
            <label htmlFor="paid" className="text-sm font-bold text-ink">
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
                className="flex-1 min-w-0 h-12 px-3.5 border border-border-2 rounded-xl text-[15px] text-ink bg-white focus:outline-none focus:border-ink"
              />
              <button
                type="button"
                onClick={handleSharePaid}
                className="h-12 px-[18px] border border-ink rounded-xl bg-white text-sm font-bold text-ink hover:bg-gray-bg transition-colors cursor-pointer shrink-0"
              >
                {sharedPaid ? 'Shared ✓' : 'Share'}
              </button>
            </div>
            <span className="text-xs leading-[18px] text-muted">
              One tap keeps the price honest for the next traveller.
            </span>
          </div>

          {/* Stamp Card */}
          <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-ink text-white">
            <div className="w-16 h-16 shrink-0 rounded-lg bg-yellow text-ink font-anton text-xl flex items-center justify-center -rotate-6">
              PHỞ
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[15px] font-bold text-white">
                Stamp earned, signed by Linh
              </span>
              <span className="text-[13px] leading-[19px] text-on-dark-1">
                Send her a photo and a thank-you. 4 of 12 dishes done.
              </span>
            </div>
          </div>

          <Link
            href="/dishes"
            className="mt-auto flex items-center justify-center h-[52px] rounded-xl bg-red text-base font-bold text-white hover:bg-[#A31F17] transition-colors cursor-pointer"
          >
            Find my next dish
          </Link>
        </div>
      )}
    </div>
  );
}
