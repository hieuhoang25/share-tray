'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ScreenHeader,
  ChipGroup,
  Button,
  Card,
  DarkCard,
  NoteBox,
  InfoBox,
  NumberedStep,
  ScoreBar,
  DotRating,
  Stepper,
  Avatar,
  SeatDots,
  PhraseCard,
} from '@/components/ui';

export default function DevUIPage() {
  const [chipVal, setChipVal] = useState('curious');
  const [rating, setRating] = useState(4);
  const [stepperVal, setStepperVal] = useState(2);

  return (
    <div className="min-h-screen bg-gray-bg text-ink p-5 pb-28">
      <div className="max-w-[480px] mx-auto space-y-8">
        <div>
          <span className="text-xs font-semibold text-red uppercase tracking-wider">
            Share Tray Styleguide
          </span>
          <h1 className="font-anton text-3xl text-ink">Component Showcase (/dev/ui)</h1>
          <p className="text-sm text-muted">
            All design tokens, 44px touch targets, SVG icons, and shared UI components.
          </p>
        </div>

        {/* Headers */}
        <section className="space-y-3">
          <h2 className="font-anton text-xl border-b pb-1">ScreenHeader Variants</h2>
          <ScreenHeader
            title="HUNGRY? GO HERE."
            variant="dark"
            subtitle="Hanoi · 28°C · Rain"
            backHref="#"
            backLabel="Back"
          />
          <ScreenHeader
            title="PHỞ BÀ TÂM"
            variant="red"
            subtitle="Pho · Ba Dinh · 4 min walk"
            backHref="#"
            backLabel="Dishes"
          />
          <ScreenHeader
            title="EAT TOGETHER"
            variant="light"
            subtitle="8 tables open"
            backHref="#"
            backLabel="Home"
          />
        </section>

        {/* Buttons */}
        <section className="space-y-3">
          <h2 className="font-anton text-xl border-b pb-1">Buttons (44px/48px/52px/56px)</h2>
          <div className="flex flex-col gap-3">
            <Button variant="primary-yellow" size="lg" fullWidth>
              Show me this place (Yellow CTA)
            </Button>
            <Button variant="primary-red" size="lg" fullWidth>
              Walk me through it (Red CTA)
            </Button>
            <Button variant="primary-ink" size="md" fullWidth>
              Order Linh&apos;s usual in one tap
            </Button>
            <Button variant="outline" size="md" fullWidth>
              Open a seat and eat with others
            </Button>
            <Button variant="primary-red" size="call" fullWidth>
              Call Minh Anh · free (56px)
            </Button>
            <div className="text-center">
              <Button variant="text-link">Stuck? Call a local</Button>
            </div>
          </div>
        </section>

        {/* Chips */}
        <section className="space-y-3">
          <h2 className="font-anton text-xl border-b pb-1">Chips & Brave Level</h2>
          <p className="text-xs text-muted">Dark theme chips:</p>
          <div className="bg-ink p-4 rounded-xl">
            <ChipGroup
              theme="dark"
              options={[
                { value: 'gentle', label: 'Gentle' },
                { value: 'curious', label: 'Curious' },
                { value: 'fearless', label: 'Fearless' },
              ]}
              value={chipVal}
              onChange={setChipVal}
            />
          </div>
          <p className="text-xs text-muted">Light theme chips:</p>
          <div className="bg-white p-4 rounded-xl border border-border">
            <ChipGroup
              theme="light"
              options={[
                { value: 'gentle', label: 'All' },
                { value: 'curious', label: 'See' },
                { value: 'fearless', label: 'Useful' },
              ]}
              value={chipVal}
              onChange={setChipVal}
            />
          </div>
        </section>

        {/* Cards */}
        <section className="space-y-3">
          <h2 className="font-anton text-xl border-b pb-1">Cards & Callouts</h2>
          <Card featured>
            <h3 className="font-anton text-lg">Featured Card</h3>
            <p className="text-sm text-muted">
              Card with 16px radius, subtle border and authentic typography.
            </p>
          </Card>
          <DarkCard>
            <h3 className="font-anton text-lg text-yellow">ORDER &quot;THE USUAL&quot;</h3>
            <p className="text-sm text-on-dark-1">
              Cháu là bạn của Linh. Cho cháu như Linh hay ăn ạ.
            </p>
          </DarkCard>
          <NoteBox>
            <p className="font-semibold text-xs uppercase tracking-wider mb-1">
              Food Rule Warning
            </p>
            Your food rules: no peanuts · no pork. One dish hidden.
          </NoteBox>
          <InfoBox>
            The honest downside: The alley is tiny, motorbikes squeeze by, and you sit on plastic stools.
          </InfoBox>
        </section>

        {/* Steps and Ratings */}
        <section className="space-y-3">
          <h2 className="font-anton text-xl border-b pb-1">Feedback, Scores & Numbers</h2>
          <Card>
            <NumberedStep
              number="1"
              title="Broth simmered for 18 hours"
              description="Clear bone broth with no artificial sweetness. Fragrant with star anise."
              meta="19 of 23 locals mention it"
            />
            <NumberedStep
              number="2"
              title="Fresh hand-cut noodles"
              description="Made this morning, perfectly chewy, doesn't get mushy."
            />
          </Card>

          <Card>
            <ScoreBar label="Price" score={4.7} />
            <ScoreBar label="Service" score={4.2} />
            <ScoreBar label="Space" score={3.9} />
          </Card>

          <Card className="flex flex-col items-center gap-3">
            <span className="text-xs font-semibold uppercase text-muted">Dot Rating (44px Touch)</span>
            <DotRating value={rating} onChange={setRating} />
          </Card>

          <Card className="flex items-center justify-between">
            <span className="text-sm font-bold">Seats Stepper:</span>
            <Stepper value={stepperVal} onChange={setStepperVal} min={1} max={9} />
          </Card>
        </section>

        {/* Avatars & Seat Dots */}
        <section className="space-y-3">
          <h2 className="font-anton text-xl border-b pb-1">Avatars & Seat Distribution</h2>
          <Card className="flex items-center gap-4">
            <Avatar name="Linh" role="local" size="lg" />
            <Avatar name="Kenji" role="traveller" size="lg" />
            <Avatar name="Minh Anh" role="guide" size="md" />
            <Avatar name="Anna" role="traveller" size="sm" />
          </Card>

          <Card className="flex flex-col gap-2">
            <span className="text-xs font-semibold text-muted">Seat Dots (Locals / Travellers / Free)</span>
            <SeatDots locals={3} travellers={2} free={1} />
          </Card>
        </section>

        {/* Phrase Card */}
        <section className="space-y-3">
          <h2 className="font-anton text-xl border-b pb-1">Phrase Card (Show Vendor)</h2>
          <PhraseCard
            phraseVi="Quán phở Bà Tâm ở đâu ạ?"
            meaningEn="Where is Mrs. Tam's pho shop?"
            pronunciation="kwaan fuh bah tahm uh dow ah"
          />
        </section>

        <div className="pt-6 text-center">
          <Link href="/" className="text-red-text font-bold text-sm underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
