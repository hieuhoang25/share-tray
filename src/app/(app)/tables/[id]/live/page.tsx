'use client';

import React, { useState, useEffect, use } from 'react';
import { ScreenHeader, DarkCard, Button } from '@/components/ui';
import type { ConversationCard, TableRitual, TableWord, Table } from '@/types/domain';

export default function TableLiveScreen({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [data, setData] = useState<{
    cards: ConversationCard[];
    rituals: TableRitual[];
    words: TableWord[];
    table: Table | null;
  } | null>(null);

  const [cardIndex, setCardIndex] = useState(0);
  const [newWord, setNewWord] = useState('');
  const [newMeaning, setNewMeaning] = useState('');

  useEffect(() => {
    async function loadLiveData() {
      try {
        const res = await fetch(`/api/tables/${id}/live`);
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (err) {
        console.error(err);
      }
    }
    loadLiveData();
  }, [id]);

  const handleAddWord = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWord || !newMeaning) return;
    try {
      const res = await fetch(`/api/tables/${id}/words`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ word: newWord, meaning: newMeaning }),
      });
      if (res.ok) {
        const created = await res.json();
        setData((prev) => (prev ? { ...prev, words: [...prev.words, created] } : null));
        setNewWord('');
        setNewMeaning('');
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!data) {
    return (
      <div className="bg-ink min-h-screen text-white p-5">
        <p className="text-sm text-on-dark-2">Connecting to live table...</p>
      </div>
    );
  }

  const { cards, rituals, words } = data;
  const currentCard = cards[cardIndex] || cards[0];

  return (
    <div className="bg-ink min-h-screen text-white pb-28">
      <ScreenHeader
        title="NO AWKWARD SILENCE."
        variant="dark"
        subtitle="Live Dining Room Companion"
        backHref={`/tables/${id}`}
        backLabel="Table"
      />

      <div className="p-5 space-y-6">
        {/* CONVERSATION CARDS */}
        {cards.length > 0 && (
          <div className="bg-yellow text-ink p-5 rounded-[16px] shadow-lg space-y-4">
            <div className="flex items-center justify-between text-xs font-anton tracking-wider">
              <span>CARD {cardIndex + 1} OF {cards.length}</span>
              <span className="text-[10px] uppercase font-bold">Bilingual Prompt</span>
            </div>

            <p className="font-anton text-2xl leading-tight">
              &ldquo;{currentCard.text_en}&rdquo;
            </p>
            <p className="text-xs text-ink/80 italic font-medium">
              &ldquo;{currentCard.text_vi}&rdquo;
            </p>

            <div className="flex gap-2 pt-2 border-t border-ink/20">
              <button
                type="button"
                disabled={cardIndex === 0}
                onClick={() => setCardIndex(cardIndex - 1)}
                className="flex-1 py-2 bg-ink text-white font-bold text-xs rounded-lg disabled:opacity-40"
              >
                ← Previous
              </button>
              <button
                type="button"
                disabled={cardIndex === cards.length - 1}
                onClick={() => setCardIndex(cardIndex + 1)}
                className="flex-1 py-2 bg-ink text-white font-bold text-xs rounded-lg disabled:opacity-40"
              >
                Next Prompt →
              </button>
            </div>
          </div>
        )}

        {/* TABLE RITUALS */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-yellow uppercase tracking-wider block">
            TABLE RITUALS FOR PHỞ
          </span>
          <DarkCard className="space-y-2.5 text-xs text-on-dark-1">
            {rituals.map((r, idx) => (
              <div key={r.id || idx} className="flex items-start gap-2.5">
                <span className="font-anton text-yellow text-sm w-4 shrink-0">{idx + 1}.</span>
                <p>{r.text_en}</p>
              </div>
            ))}
          </DarkCard>
        </div>

        {/* WORD TRADE */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-yellow uppercase tracking-wider">
              WORD TRADE
            </span>
            <span className="text-[10px] text-on-dark-2">Realtime shared vocabulary</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-3 bg-ink-2 border border-line-dark rounded-[10px]">
              <span className="font-bold text-yellow block">Ngon quá!</span>
              <span className="text-on-dark-2 block mt-0.5">Delicious! · by Thảo</span>
            </div>
            <div className="p-3 bg-ink-2 border border-line-dark rounded-[10px]">
              <span className="font-bold text-yellow block">Oishii</span>
              <span className="text-on-dark-2 block mt-0.5">Tasty · by Kenji</span>
            </div>
            {words.map((w) => (
              <div key={w.id} className="p-3 bg-ink-2 border border-line-dark rounded-[10px]">
                <span className="font-bold text-yellow block">{w.word}</span>
                <span className="text-on-dark-2 block mt-0.5">{w.meaning}</span>
              </div>
            ))}
          </div>

          <form onSubmit={handleAddWord} className="flex gap-2">
            <input
              type="text"
              placeholder="Your word"
              value={newWord}
              onChange={(e) => setNewWord(e.target.value)}
              className="flex-1 bg-ink-2 border border-line-dark px-3 py-2 rounded-lg text-xs text-white focus:outline-none"
            />
            <input
              type="text"
              placeholder="Meaning"
              value={newMeaning}
              onChange={(e) => setNewMeaning(e.target.value)}
              className="flex-1 bg-ink-2 border border-line-dark px-3 py-2 rounded-lg text-xs text-white focus:outline-none"
            />
            <button
              type="submit"
              className="bg-yellow text-ink font-bold text-xs px-3 py-2 rounded-lg shrink-0"
            >
              Add
            </button>
          </form>
        </div>

        {/* THE BILL WITHOUT AWKWARD PART */}
        <DarkCard className="space-y-2 text-xs text-center border-yellow/30">
          <span className="font-anton text-sm text-yellow block">
            THE BILL, WITHOUT THE AWKWARD PART
          </span>
          <p className="text-on-dark-1">
            Total 240,000₫ / 4 people = <strong>60,000₫</strong> ($2.30) each
          </p>
          <p className="text-[10px] text-on-dark-2 italic">
            Hand cash directly to the vendor or transfer via QR
          </p>
        </DarkCard>

        {/* Finish CTA */}
        <Button variant="primary-red" size="lg" fullWidth href={`/tables/${id}/after`}>
          We are done eating →
        </Button>
      </div>
    </div>
  );
}
