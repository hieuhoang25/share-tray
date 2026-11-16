'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { ScreenHeader, NoteBox, Card, Avatar, Button } from '@/components/ui';
import { formatVND } from '@/lib/format';
import type { Table, Place, TableMember, Profile } from '@/types/domain';

interface TableDetailMember extends TableMember {
  profile?: Profile;
}

export default function TableDetailScreen({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [data, setData] = useState<{
    table: Table;
    place: Place | null;
    members: TableDetailMember[];
  } | null>(null);

  const [hasJoined, setHasJoined] = useState(false);
  const [joining, setJoining] = useState(false);

  useEffect(() => {
    async function loadTable() {
      try {
        const res = await fetch(`/api/tables/${id}`);
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (err) {
        console.error(err);
      }
    }
    loadTable();
  }, [id]);

  const handleToggleJoin = async () => {
    setJoining(true);
    try {
      const endpoint = hasJoined ? `/api/tables/${id}/leave` : `/api/tables/${id}/join`;
      const res = await fetch(endpoint, { method: 'POST' });
      if (res.ok) {
        setHasJoined(!hasJoined);
      } else {
        const err = await res.json();
        alert(err.error || 'Action failed');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setJoining(false);
    }
  };

  if (!data) {
    return (
      <div className="bg-white min-h-screen text-ink p-5">
        <p className="text-sm text-muted">Loading shared table details...</p>
      </div>
    );
  }

  const { table, place, members } = data;
  const freeSeats = Math.max(table.seats_total - members.length - (hasJoined ? 1 : 0), 0);

  return (
    <div className="bg-white min-h-screen text-ink pb-28">
      <ScreenHeader
        title={table.title}
        variant="red"
        subtitle={`${table.starts_at} · ${place?.name || 'Phở Bà Tâm'} · ${table.duration_min} min`}
        backHref="/together"
        backLabel="Tables"
      />

      <div className="p-5 space-y-6">
        {/* Why this table fits you */}
        <NoteBox>
          <span className="font-bold text-xs uppercase tracking-wider block mb-0.5">
            Why this table fits you
          </span>
          Matches your craving for authentic broth and travel stories. Half locals, half travellers with verified IDs.
        </NoteBox>

        {/* WHO IS AT THE TABLE */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-anton text-xl text-ink">WHO IS AT THE TABLE</h3>
            <span className="text-xs font-semibold text-muted">
              {members.length + (hasJoined ? 1 : 0)} of {table.seats_total} seats taken
            </span>
          </div>

          <div className="space-y-2.5">
            {members.map((m) => (
              <Card key={m.id} className="flex items-start gap-3.5 p-3.5">
                <Avatar
                  name={m.profile?.display_name || 'Member'}
                  role={m.profile?.role || 'traveller'}
                  size="md"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-ink">
                      {m.profile?.display_name || 'Member'}
                    </span>
                    {m.is_host && (
                      <span className="text-[10px] font-bold bg-yellow text-ink px-1.5 py-0.5 rounded">
                        HOST
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted mt-0.5">
                    {m.profile?.city || 'Hanoi'} · {m.profile?.work || 'Foodie'}
                  </p>
                  <p className="text-xs text-red-text italic mt-1">
                    Ask me about: {m.profile?.ask_me_about || 'Local hidden gems'}
                  </p>
                </div>
              </Card>
            ))}

            {/* Free seat indicator / You are in card */}
            {hasJoined ? (
              <div className="bg-green/10 border-2 border-green text-green p-4 rounded-[12px] text-center space-y-1">
                <span className="font-anton text-base block">YOU ARE IN!</span>
                <p className="text-xs">See you at {table.starts_at} at Phở Bà Tâm.</p>
              </div>
            ) : freeSeats > 0 ? (
              <div className="p-4 rounded-[12px] border-2 border-dashed border-border-2 text-center text-muted space-y-1">
                <span className="font-bold text-xs uppercase tracking-wider block text-ink">
                  {freeSeats} Seat{freeSeats > 1 ? 's are' : ' is'} free
                </span>
                <p className="text-xs">It could be yours. Tap button below to claim.</p>
              </div>
            ) : null}
          </div>
        </div>

        {/* HOW THE HOUR GOES */}
        <div className="space-y-3">
          <h3 className="font-anton text-xl text-ink">HOW THE HOUR GOES</h3>
          <Card className="space-y-2 text-xs text-muted leading-relaxed">
            <p><strong>00–15m:</strong> Meet at the shop, order Linh&apos;s usual with host, introduce your hometown.</p>
            <p><strong>15–45m:</strong> Slurp hot broth, draw bilingual conversation cards, exchange favorite words.</p>
            <p><strong>45–60m:</strong> Split bill evenly, snap group photo, choose who to keep in touch with.</p>
          </Card>
        </div>

        {/* What it costs & Rules */}
        <Card className="space-y-2 text-xs">
          <span className="font-bold uppercase tracking-wider text-muted block">What it costs</span>
          <p className="font-anton text-2xl text-ink">{formatVND(table.est_price)}</p>
          <p className="text-muted">
            Split evenly based on local price. No extra seating fees or mandatory tips.
          </p>
        </Card>

        {/* Action Button */}
        <div className="space-y-3">
          <Button
            variant={hasJoined ? 'outline' : 'primary-red'}
            size="lg"
            fullWidth
            disabled={joining}
            onClick={handleToggleJoin}
          >
            {hasJoined ? 'Give the seat back' : 'Take the seat'}
          </Button>

          <div className="flex items-center justify-between text-xs pt-1">
            <Link href={`/tables/${id}/live`} className="text-red-text font-bold hover:underline">
              Preview live table cards →
            </Link>
            <button
              type="button"
              onClick={() => alert('Report submitted to moderation queue.')}
              className="text-muted hover:underline"
            >
              Report this table
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
