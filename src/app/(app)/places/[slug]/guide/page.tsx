'use client';

import React, { useState, useEffect, use } from 'react';
import {
  ScreenHeader,
  Card,
  PhraseCard,
  Button,
  NumberedStep,
  InfoBox,
} from '@/components/ui';
import type { FindStep, EatGuide } from '@/types/domain';

export default function GuideScreen({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [activeTab, setActiveTab] = useState<'find' | 'eat' | 'pay'>('find');
  const [guideData, setGuideData] = useState<{
    findSteps: FindStep[];
    eatGuide: EatGuide | null;
  } | null>(null);

  const [paidInput, setPaidInput] = useState('');
  const [stampClaimed, setStampClaimed] = useState(false);

  useEffect(() => {
    async function loadGuide() {
      try {
        const res = await fetch(`/api/places/${slug}/guide`);
        if (res.ok) {
          const data = await res.json();
          setGuideData(data);
        }
      } catch (err) {
        console.error(err);
      }
    }
    loadGuide();
  }, [slug]);

  const titles = {
    find: 'FIND THE DOOR',
    eat: 'EAT LIKE A LOCAL',
    pay: 'PAY WITHOUT CONFUSION',
  };

  return (
    <div className="bg-white min-h-screen text-ink pb-28">
      <ScreenHeader
        title={titles[activeTab]}
        variant="dark"
        subtitle={`Guide for ${slug.replace(/-/g, ' ')}`}
        backHref={`/places/${slug}`}
        backLabel="Place"
      />

      {/* Tabs */}
      <div className="flex border-b border-border bg-gray-bg px-5 pt-2">
        {(['find', 'eat', 'pay'] as const).map((tab, idx) => {
          const labels = ['1 Find it', '2 Eat it', '3 Pay'];
          const active = activeTab === tab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider text-center transition-all border-b-2 ${
                active
                  ? 'border-red text-red-text bg-white rounded-t-lg'
                  : 'border-transparent text-muted hover:text-ink'
              }`}
            >
              {labels[idx]}
            </button>
          );
        })}
      </div>

      <div className="p-5 space-y-6">
        {/* TAB 1: FIND IT */}
        {activeTab === 'find' && (
          <div className="space-y-5">
            <div className="flex items-center gap-2 text-xs font-semibold text-green bg-green/10 border border-green/30 p-3 rounded-[10px]">
              <span className="w-2.5 h-2.5 rounded-full bg-green animate-pulse" />
              Open and still serving · confirmed by a local 20 min ago
            </div>

            <p className="text-xs text-muted font-medium italic">
              &ldquo;The map gets you to the street. A neighbour gets you to the door.&rdquo;
            </p>

            <Card className="space-y-3">
              {guideData?.findSteps?.map((step, idx) => (
                <NumberedStep
                  key={step.id || idx}
                  number={step.order || idx + 1}
                  title={`Step ${step.order}`}
                  description={step.text_en}
                />
              ))}
            </Card>

            <PhraseCard
              phraseVi="Quán phở Bà Tâm ở đâu ạ?"
              meaningEn="Where is Mrs. Tam's pho shop?"
              pronunciation="kwaan fuh bah tahm uh dow ah"
            />

            <Button
              variant="primary-red"
              size="lg"
              fullWidth
              href={`/places/${slug}/order`}
            >
              I&apos;m here. Help me order
            </Button>
          </div>
        )}

        {/* TAB 2: EAT IT */}
        {activeTab === 'eat' && (
          <div className="space-y-5">
            <h3 className="font-anton text-xl text-ink">4 STEPS TO EAT IT RIGHT</h3>
            <Card className="space-y-3">
              <NumberedStep
                number="1"
                title="Sip broth first"
                description="Before touching any seasoning, sip two spoonfuls of the hot pure broth to taste the beef essence."
              />
              <NumberedStep
                number="2"
                title="Add garlic vinegar, not lime"
                description="Old Hanoi tradition pairs beef pho with garlic pickled vinegar. Lime is for chicken pho."
              />
              <NumberedStep
                number="3"
                title="Dunk the quẩy cruller"
                description="Let it soak in the broth for 3 seconds so the core stays crunchy while the skin takes in soup."
              />
              <NumberedStep
                number="4"
                title="Slurp with both hands"
                description="Chopsticks in right hand, soup spoon in left hand. Eat while steaming hot."
              />
            </Card>

            <div className="space-y-2">
              <h4 className="font-anton text-lg text-ink">WHAT IS ON THE TABLE (ALL FREE)</h4>
              <div className="grid grid-cols-2 gap-2.5">
                <div className="p-3 bg-gray-bg rounded-[10px] border border-border text-xs">
                  <span className="font-bold text-ink block">Giấm tỏi</span>
                  <span className="text-muted block mt-0.5">Garlic vinegar</span>
                  <span className="text-red-text font-semibold block mt-1">Intensity: Tangy</span>
                </div>
                <div className="p-3 bg-gray-bg rounded-[10px] border border-border text-xs">
                  <span className="font-bold text-ink block">Ớt tươi</span>
                  <span className="text-muted block mt-0.5">Fresh bird&apos;s eye chili</span>
                  <span className="text-red-text font-semibold block mt-1">Intensity: Very hot</span>
                </div>
                <div className="p-3 bg-gray-bg rounded-[10px] border border-border text-xs">
                  <span className="font-bold text-ink block">Tương ớt phố cổ</span>
                  <span className="text-muted block mt-0.5">Hanoi chili sauce</span>
                  <span className="text-red-text font-semibold block mt-1">Intensity: Medium</span>
                </div>
                <div className="p-3 bg-gray-bg rounded-[10px] border border-border text-xs">
                  <span className="font-bold text-ink block">Chanh tươi</span>
                  <span className="text-muted block mt-0.5">Fresh lime wedges</span>
                  <span className="text-red-text font-semibold block mt-1">Intensity: Mild sour</span>
                </div>
              </div>
            </div>

            <InfoBox>
              <span className="font-bold text-xs uppercase tracking-wider block mb-0.5 text-ink">
                Worried about your stomach?
              </span>
              Take it easy on fresh raw chili slices. Drink hot tea rather than iced water if feeling sensitive.
            </InfoBox>
          </div>
        )}

        {/* TAB 3: PAY */}
        {activeTab === 'pay' && (
          <div className="space-y-5">
            <PhraseCard
              phraseVi="Tính tiền ạ!"
              meaningEn="Check, please!"
              pronunciation="ting tee-en ah"
            />

            <Card className="space-y-2">
              <span className="text-xs font-bold text-muted uppercase tracking-wider">
                Price Benchmark
              </span>
              <p className="font-anton text-2xl text-ink">45,000₫ – 60,000₫</p>
              <p className="text-xs text-muted">
                What 19 verified locals paid here this month for a hearty bowl.
              </p>
            </Card>

            {/* CURRENCY WARNING: 20k vs 500k */}
            <div className="bg-[#FFF0EF] border-2 border-red text-red-text p-4 rounded-[12px] space-y-2">
              <span className="font-bold text-xs uppercase tracking-widest block">
                ⚠️ Banknote Confusion Alert
              </span>
              <p className="text-xs leading-relaxed font-medium">
                The <strong>20,000₫</strong> polymer note and the <strong>500,000₫</strong> polymer note share almost the exact same turquoise cyan color! Look carefully at the zeros before handing cash to the vendor.
              </p>
            </div>

            {/* REPORT PRICE */}
            <Card className="space-y-3">
              <span className="text-xs font-bold text-ink uppercase tracking-wider block">
                What did you pay?
              </span>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. 50,000"
                  value={paidInput}
                  onChange={(e) => setPaidInput(e.target.value)}
                  className="flex-1 px-3 py-2 border border-border-2 rounded-lg text-sm"
                />
                <button
                  type="button"
                  onClick={() => alert('Thank you! Price report logged to community database.')}
                  className="bg-ink text-white font-bold text-xs px-4 py-2 rounded-lg hover:bg-ink-2"
                >
                  Share
                </button>
              </div>
            </Card>

            {/* PASSPORT STAMP */}
            <div className="bg-yellow text-ink p-5 rounded-[16px] border border-yellow shadow-sm space-y-3">
              <span className="text-xs font-anton tracking-wider block">
                FOOD PASSPORT STAMP
              </span>
              <h4 className="font-anton text-2xl">PHỞ BÒ HÀ NỘI</h4>
              <p className="text-xs text-ink/80">
                {stampClaimed
                  ? 'Stamp earned! Signed by local Linh.'
                  : 'Enjoyed your meal? Tap below to record this authentic dish in your passport.'}
              </p>
              {!stampClaimed ? (
                <button
                  type="button"
                  onClick={() => setStampClaimed(true)}
                  className="bg-ink text-white font-bold text-xs px-4 py-2.5 rounded-lg w-full"
                >
                  Claim Stamp
                </button>
              ) : (
                <span className="inline-block bg-green text-white font-bold text-xs px-3 py-1.5 rounded-md">
                  ✓ STAMPED & SIGNED
                </span>
              )}
            </div>

            <Button variant="primary-red" size="lg" fullWidth href="/">
              Find my next dish →
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
