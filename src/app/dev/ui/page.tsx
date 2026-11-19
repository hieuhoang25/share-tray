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
  SeatLegend,
  TableRing,
  PhraseCard,
} from '@/components/ui';

export default function DevUIPage() {
  const [chipVal, setChipVal] = useState('curious');
  const [rating, setRating] = useState(4);
  const [stepperVal, setStepperVal] = useState(2);

  return (
    <div className="min-h-screen bg-surface text-ink p-5 pb-28">
      <div className="max-w-[480px] mx-auto space-y-8">
        <div>
          <span className="text-xs font-bold text-jade uppercase tracking-wider">
            mâm · Design Tokens &amp; Components
          </span>
          <h1 className="text-3xl font-extrabold text-ink mt-1">Component Showcase (/dev/ui)</h1>
          <p className="text-sm text-muted mt-1">
            Warm palette (#F3F5F2, #0B5D4B, #FF7A59), Be Vietnam Pro sentence case, ≥44px touch targets.
          </p>
        </div>

        {/* Headers */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold border-b border-border pb-1">ScreenHeader Variants</h2>
          <ScreenHeader
            title="Phở Bà Tâm"
            variant="jade"
            subtitle="Beef noodle soup · Đống Đa, Hà Nội · 4 min walk"
            backHref="#"
            backLabel="All phở places"
          />
          <ScreenHeader
            title="What are you craving?"
            variant="light"
            subtitle="Ranked only by Vietnamese people"
            backHref="#"
            backLabel="Home"
          />
        </section>

        {/* Buttons */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold border-b border-border pb-1">Buttons (44px / 48px / 52px / 56px)</h2>
          <div className="flex flex-col gap-3">
            <Button variant="primary-coral" size="lg" fullWidth>
              Show me this place (Coral CTA)
            </Button>
            <Button variant="primary-jade" size="lg" fullWidth>
              Gửi quán quen (Jade CTA)
            </Button>
            <Button variant="mint" size="md" fullWidth>
              See who is at the table (Mint secondary)
            </Button>
            <Button variant="outline" size="md" fullWidth>
              Open a seat and eat with others
            </Button>
            <Button variant="primary-coral" size="call" fullWidth>
              Call Minh Anh · free (56px)
            </Button>
            <div className="text-center">
              <Button variant="text-link">Stuck? Call a local</Button>
            </div>
          </div>
        </section>

        {/* Chips */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold border-b border-border pb-1">Chips &amp; Brave Levels</h2>
          <p className="text-xs text-muted font-medium">Standard light chips:</p>
          <div className="bg-white p-4 rounded-2xl border border-border">
            <ChipGroup
              options={[
                { value: 'gentle', label: 'Gentle' },
                { value: 'curious', label: 'Curious' },
                { value: 'fearless', label: 'Fearless' },
              ]}
              value={chipVal}
              onChange={setChipVal}
            />
          </div>
        </section>

        {/* Cards */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold border-b border-border pb-1">Cards &amp; Callouts</h2>
          <Card featured>
            <h3 className="text-lg font-bold">Standard Card (20px radius)</h3>
            <p className="text-sm text-muted mt-1">
              Soft shadow, 20px radius, clean and warm feel.
            </p>
          </Card>
          <DarkCard>
            <span className="text-xs font-bold text-mint-light uppercase tracking-wider">
              Order &ldquo;the usual&rdquo;
            </span>
            <p className="text-lg font-bold text-white mt-1">
              &ldquo;Cháu là bạn của Linh. Cho cháu như Linh hay ăn ạ.&rdquo;
            </p>
            <p className="text-sm text-mint-light mt-1">
              Linh has eaten here for 6 years.
            </p>
          </DarkCard>
          <NoteBox>
            <p className="font-bold text-xs uppercase tracking-wider mb-1">
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
          <h2 className="text-xl font-bold border-b border-border pb-1">Feedback, Scores &amp; Numbers</h2>
          <Card>
            <NumberedStep
              number="1"
              title="The broth"
              description="Beef bones simmered overnight. Clear, deep and never sweet. 19 of 23 locals mention it first."
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
            <span className="text-xs font-bold uppercase text-muted">Dot Rating (44px Touch)</span>
            <DotRating value={rating} onChange={setRating} />
          </Card>

          <Card className="flex items-center justify-between">
            <span className="text-sm font-bold">Seats Stepper:</span>
            <Stepper value={stepperVal} onChange={setStepperVal} min={1} max={9} />
          </Card>
        </section>

        {/* Avatars, Seat Dots & Table Ring */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold border-b border-border pb-1">Avatars, Seat Dots &amp; Table Ring</h2>
          <Card className="flex items-center gap-4">
            <Avatar name="Linh" role="local" size="lg" />
            <Avatar name="Kenji" role="traveller" size="lg" />
            <Avatar name="Minh Anh" role="guide" size="md" />
            <Avatar name="Anna" role="traveller" size="sm" />
          </Card>

          <Card className="flex flex-col gap-3">
            <span className="text-xs font-bold text-muted uppercase">Seat Legend</span>
            <SeatLegend />
            <span className="text-xs font-bold text-muted uppercase mt-2">Inline Seat Dots</span>
            <SeatDots locals={3} travellers={2} free={1} />
            <span className="text-xs font-bold text-muted uppercase mt-2">Circular Table Ring (Mockup Hero)</span>
            <div className="flex justify-center p-2">
              <TableRing locals={3} travellers={2} free={1} />
            </div>
          </Card>
        </section>

        {/* Phrase Card */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold border-b border-border pb-1">Phrase Card (Show Vendor)</h2>
          <PhraseCard
            phraseVi="Quán phở Bà Tâm ở đâu ạ?"
            meaningEn="Where is Mrs. Tam's pho shop?"
            pronunciation="kwaan fuh bah tahm uh dow ah"
          />
        </section>

        <div className="pt-6 text-center">
          <Link href="/" className="text-jade font-bold text-sm underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
