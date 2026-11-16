'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ScreenHeader, Card, Button } from '@/components/ui';
import type { Profile, PassportStamp, Dish } from '@/types/domain';

const FOOD_RULE_OPTIONS = [
  { id: 'no_pork', label: 'No pork' },
  { id: 'no_peanut', label: 'No peanuts' },
  { id: 'vegetarian', label: 'Vegetarian' },
  { id: 'no_shellfish', label: 'No shellfish' },
];

export default function ProfileScreen() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [passport, setPassport] = useState<{
    stamps: PassportStamp[];
    passportDishes: Dish[];
  } | null>(null);

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const [meRes, passRes] = await Promise.all([
          fetch('/api/me'),
          fetch('/api/me/passport'),
        ]);
        if (meRes.ok) setProfile(await meRes.json());
        if (passRes.ok) setPassport(await passRes.json());
      } catch (err) {
        console.error(err);
      }
    }
    loadData();
  }, []);

  const handleToggleRule = async (ruleId: string) => {
    if (!profile) return;
    const current = profile.food_rules || [];
    const next = current.includes(ruleId)
      ? current.filter((r) => r !== ruleId)
      : [...current, ruleId];

    setProfile({ ...profile, food_rules: next });
    setSaving(true);
    try {
      await fetch('/api/me', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ food_rules: next }),
      });
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleBraveChange = async (level: 'gentle' | 'curious' | 'fearless') => {
    if (!profile) return;
    setProfile({ ...profile, brave_level: level });
    try {
      await fetch('/api/me', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ brave_level: level }),
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (!profile) {
    return (
      <div className="bg-white min-h-screen text-ink p-5">
        <p className="text-sm text-muted">Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen text-ink pb-28">
      <ScreenHeader
        title="YOUR PROFILE"
        variant="dark"
        subtitle={`${profile.role.toUpperCase()} · ${profile.city}, ${profile.country}`}
        backHref="/"
        backLabel="Home"
      />

      <div className="p-5 space-y-6">
        {/* User Card */}
        <Card className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-yellow text-ink border-2 border-ink flex items-center justify-center font-anton text-2xl">
            {profile.display_name[0]}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-anton text-xl text-ink">{profile.display_name}</h3>
              {profile.is_verified && (
                <span className="text-[10px] bg-green/20 text-green px-2 py-0.5 rounded font-bold">
                  ✓ Verified
                </span>
              )}
            </div>
            <p className="text-xs text-muted mt-0.5">{profile.work}</p>
            <p className="text-xs text-red-text font-medium mt-1">
              Ask me about: {profile.ask_me_about}
            </p>
          </div>
        </Card>

        {/* FOOD RULES SECTION */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-anton text-lg text-ink">YOUR FOOD RULES</h3>
            {saving && <span className="text-xs text-muted">Saving...</span>}
          </div>
          <p className="text-xs text-muted">
            The menu and vendor cards will automatically hide ingredients and generate allergy phrases.
          </p>
          <div className="grid grid-cols-2 gap-2">
            {FOOD_RULE_OPTIONS.map((rule) => {
              const active = profile.food_rules.includes(rule.id);
              return (
                <button
                  key={rule.id}
                  type="button"
                  onClick={() => handleToggleRule(rule.id)}
                  className={`p-3 rounded-[12px] border text-xs font-bold transition-all text-left ${
                    active
                      ? 'bg-red text-white border-red shadow-xs'
                      : 'bg-white text-ink border-border-2 hover:border-ink'
                  }`}
                >
                  {active ? `✓ ${rule.label}` : rule.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* BRAVE LEVEL */}
        <div className="space-y-2">
          <h3 className="font-anton text-lg text-ink">DEFAULT BRAVE LEVEL</h3>
          <div className="grid grid-cols-3 gap-2">
            {(['gentle', 'curious', 'fearless'] as const).map((lvl) => (
              <button
                key={lvl}
                type="button"
                onClick={() => handleBraveChange(lvl)}
                className={`py-2.5 rounded-[12px] text-xs font-bold uppercase tracking-wider border text-center transition-all ${
                  profile.brave_level === lvl
                    ? 'bg-ink text-white border-ink'
                    : 'bg-white text-muted border-border hover:border-ink'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* FOOD PASSPORT (6x2 Grid) */}
        <div className="space-y-3 pt-2 border-t border-border">
          <div className="flex items-center justify-between">
            <h3 className="font-anton text-lg text-ink">YOUR FOOD PASSPORT</h3>
            <span className="text-xs font-bold text-red-text">
              {passport?.stamps.length || 0} of {passport?.passportDishes.length || 12} dishes
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {passport?.passportDishes?.map((d) => {
              const earned = passport.stamps.some((s) => s.dish_id === d.id);
              return (
                <div
                  key={d.id}
                  className={`p-3 rounded-[12px] text-center border transition-all ${
                    earned
                      ? 'bg-yellow text-ink border-yellow font-bold shadow-xs'
                      : 'bg-gray-bg/60 border-dashed border-border-2 text-muted-3'
                  }`}
                >
                  <span className="font-anton text-sm block truncate">{d.name_vi}</span>
                  <span className="text-[10px] block mt-0.5">
                    {earned ? '✓ Stamped' : 'Unexplored'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <Button
          variant="outline"
          size="md"
          fullWidth
          onClick={async () => {
            await fetch('/api/auth/logout', { method: 'POST' });
            router.push('/login');
          }}
        >
          Sign out
        </Button>
      </div>
    </div>
  );
}
