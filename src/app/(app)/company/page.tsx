'use client';

import React, { useState, useEffect } from 'react';
import { ScreenHeader, Card, Avatar, Button, InfoBox } from '@/components/ui';
import type { CompanyOffer, Profile } from '@/types/domain';

interface CompanyOfferDetail extends CompanyOffer {
  profile?: Profile;
}

export default function CompanyScreen() {
  const [mode, setMode] = useState<'meal' | 'guide'>('meal');
  const [offers, setOffers] = useState<CompanyOfferDetail[]>([]);
  const [requestedId, setRequestedId] = useState<string | null>(null);

  useEffect(() => {
    async function loadOffers() {
      try {
        const res = await fetch(`/api/company?mode=${mode}`);
        if (res.ok) {
          setOffers(await res.json());
        }
      } catch (err) {
        console.error(err);
      }
    }
    loadOffers();
  }, [mode]);

  const handleRequest = (offerId: string) => {
    setRequestedId(offerId);
    alert('Request sent! The host will review and contact you.');
  };

  return (
    <div className="bg-white min-h-screen text-ink pb-28">
      <ScreenHeader
        title="FIND COMPANY"
        variant="dark"
        subtitle="Eat with one local or hire a guide"
        backHref="/together"
        backLabel="Together"
      />

      <div className="p-5 space-y-6">
        {/* Mode Toggle */}
        <div className="grid grid-cols-2 gap-2 p-1.5 bg-gray-bg rounded-[14px]">
          <button
            type="button"
            onClick={() => setMode('meal')}
            className={`py-3 rounded-[10px] text-xs font-bold transition-all ${
              mode === 'meal'
                ? 'bg-ink text-white shadow-xs'
                : 'text-muted hover:text-ink'
            }`}
          >
            Eat with one local
          </button>
          <button
            type="button"
            onClick={() => setMode('guide')}
            className={`py-3 rounded-[10px] text-xs font-bold transition-all ${
              mode === 'guide'
                ? 'bg-ink text-white shadow-xs'
                : 'text-muted hover:text-ink'
            }`}
          >
            Hire a licensed guide
          </button>
        </div>

        {/* Offers list */}
        <div className="space-y-4">
          {offers.map((off) => {
            const isSent = requestedId === off.id;
            return (
              <Card key={off.id} featured className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar
                      name={off.profile?.display_name || 'Host'}
                      role={off.mode === 'guide' ? 'guide' : 'local'}
                      size="md"
                    />
                    <div>
                      <h4 className="font-bold text-base text-ink">
                        {off.profile?.display_name || 'Local Host'}
                      </h4>
                      <p className="text-xs text-muted">
                        {off.profile?.work || 'Hanoi resident'}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-green/10 text-green font-bold px-2 py-0.5 rounded border border-green/30">
                    {off.mode === 'guide' ? 'Guide card verified' : 'ID verified'}
                  </span>
                </div>

                <p className="text-xs text-ink leading-relaxed">{off.plan_en}</p>

                <div className="flex items-center justify-between text-xs text-muted pt-2 border-t border-border">
                  <span>Available: {off.available_from}</span>
                  <span className="font-bold text-red-text">{off.price_note}</span>
                </div>

                <Button
                  variant={isSent ? 'outline' : 'primary-red'}
                  size="md"
                  fullWidth
                  disabled={isSent}
                  onClick={() => handleRequest(off.id)}
                >
                  {isSent ? '✓ Request Pending' : off.mode === 'guide' ? 'Book Guide Walk' : 'Ask to Join'}
                </Button>
              </Card>
            );
          })}
        </div>

        {/* HOW WE KEEP THIS SAFE */}
        <InfoBox className="space-y-2 text-xs">
          <span className="font-bold uppercase tracking-wider text-ink block">
            How we keep this safe
          </span>
          <ul className="space-y-1.5 list-disc list-inside text-muted">
            <li>Government ID and guide licenses verified by admin</li>
            <li>Meet only at public, verified restaurants</li>
            <li>Fixed pricing agreed beforehand — zero hidden fees</li>
            <li>Share meal schedule and contact with your friends</li>
            <li>Strict community policy: this is for food & culture, not dating</li>
          </ul>
        </InfoBox>
      </div>
    </div>
  );
}
