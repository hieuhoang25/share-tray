'use client';

import React, { useState } from 'react';
import { ScreenHeader, Button, Avatar } from '@/components/ui';
import { Phone, PhoneOff, Mic } from 'lucide-react';

const REASONS = [
  { id: 'order', label: 'I cannot order' },
  { id: 'price', label: 'The price seems wrong' },
  { id: 'lost', label: 'I am lost' },
  { id: 'allergy', label: 'Allergy or feeling unwell' },
];

export default function HelpScreen() {
  const [selectedReason, setSelectedReason] = useState('order');
  const [isCalling, setIsCalling] = useState(false);

  return (
    <div className="min-h-screen bg-ink text-white pb-24">
      <ScreenHeader
        title="STUCK? A LOCAL PICKS UP."
        variant="dark"
        subtitle="Live Community Help · Free"
        backHref="/"
        backLabel="Home"
      />

      <div className="p-5 space-y-6">
        {/* Reasons */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-on-dark-2 uppercase tracking-wider">
            What is happening right now?
          </p>
          <div className="grid grid-cols-2 gap-2.5">
            {REASONS.map((r) => {
              const active = selectedReason === r.id;
              return (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setSelectedReason(r.id)}
                  className={`min-h-[44px] px-3 py-2.5 rounded-[12px] text-xs font-bold text-left transition-all border ${
                    active
                      ? 'bg-yellow text-ink border-yellow shadow-md'
                      : 'bg-ink-2 text-on-dark-1 border-muted-2 hover:border-white'
                  }`}
                >
                  {r.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Volunteer Card */}
        <div className="bg-ink-2 border border-line-dark rounded-[16px] p-5 space-y-4">
          <div className="flex items-center gap-3">
            <Avatar name="Minh Anh" role="guide" size="lg" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-base">Minh Anh</span>
                <span className="text-[11px] bg-green/20 text-green-dark border border-green px-2 py-0.5 rounded-full font-semibold">
                  Free right now
                </span>
              </div>
              <p className="text-xs text-on-dark-2 mt-0.5">
                English teacher & volunteer in Ba Dinh
              </p>
            </div>
          </div>
          <p className="text-xs text-on-dark-1 leading-relaxed border-t border-line-dark pt-3">
            She already sees where you are, which shop it is, and what is on your order card.
          </p>

          <Button
            variant={isCalling ? 'outline' : 'primary-red'}
            size="call"
            fullWidth
            onClick={() => setIsCalling(!isCalling)}
            className={isCalling ? 'text-white border-red hover:bg-red/20' : ''}
          >
            {isCalling ? (
              <span className="flex items-center gap-2 text-red-text">
                <PhoneOff className="w-5 h-5 stroke-[2px]" />
                End call and say thanks
              </span>
            ) : (
              <span className="flex items-center gap-2 text-white">
                <Phone className="w-5 h-5 stroke-[2px]" />
                Call Minh Anh · free
              </span>
            )}
          </Button>
        </div>

        {/* Live Captions */}
        {isCalling && (
          <div className="bg-ink-2 border border-yellow/40 rounded-[16px] p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-yellow uppercase tracking-wider flex items-center gap-2">
                <Mic className="w-4 h-4 animate-pulse text-yellow" />
                ON SPEAKER · LIVE CAPTIONS
              </span>
              <span className="text-[10px] text-on-dark-2">Powered by local audio stream</span>
            </div>
            <div className="bg-ink p-3.5 rounded-[10px] space-y-2 text-xs">
              <p className="text-yellow font-medium">
                Minh Anh: &ldquo;Chào bạn! Mình nghe rồi, quán này không tính thêm tiền quẩy đâu nhé.&rdquo;
              </p>
              <p className="text-on-dark-1 italic">
                Translation: &ldquo;Hello! I can hear you. This shop does not charge extra for crullers.&rdquo;
              </p>
            </div>
          </div>
        )}

        <div className="p-4 bg-ink-2 rounded-[12px] border border-line-dark text-xs text-on-dark-2 space-y-1">
          <p className="font-semibold text-white">Why would a stranger help you?</p>
          <p>
            Hanoians love sharing their food culture. Minh Anh is practicing her English and earning community karma.
          </p>
        </div>
      </div>
    </div>
  );
}
