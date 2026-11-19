import React from 'react';

// ==================== NUMBERED STEP ====================
interface NumberedStepProps {
  number: number | string;
  title: string;
  description: string;
  meta?: string;
}

export function NumberedStep({ number, title, description, meta }: NumberedStepProps) {
  return (
    <div className="flex items-start gap-3 py-2">
      <div className="w-8 h-8 rounded-full bg-mint text-jade font-bold text-sm flex items-center justify-center shrink-0">
        {number}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-ink text-sm leading-5">{title}</h3>
        <p className="text-muted text-sm leading-5 mt-0.5">{description}</p>
        {meta && (
          <span className="inline-block text-xs font-semibold text-jade mt-1">
            {meta}
          </span>
        )}
      </div>
    </div>
  );
}

// ==================== SCORE BAR ====================
interface ScoreBarProps {
  label: string;
  score: number;
  maxScore?: number;
}

export function ScoreBar({ label, score, maxScore = 5 }: ScoreBarProps) {
  const percentage = Math.min(Math.max((score / maxScore) * 100, 0), 100);

  return (
    <div className="flex items-center gap-3 py-1.5 w-full text-sm">
      <span className="w-16 font-semibold text-ink text-[13px] shrink-0">{label}</span>
      <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
        <div
          className="h-full bg-jade rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="w-8 text-right font-bold text-ink text-sm shrink-0">
        {score.toFixed(1)}
      </span>
    </div>
  );
}

// ==================== DOT RATING ====================
interface DotRatingProps {
  value: number;
  onChange?: (val: number) => void;
  max?: number;
  readOnly?: boolean;
}

export function DotRating({
  value,
  onChange,
  max = 5,
  readOnly = false,
}: DotRatingProps) {
  return (
    <div className="flex items-center gap-1.5" role="radiogroup" aria-label="Rating">
      {Array.from({ length: max }).map((_, idx) => {
        const ratingVal = idx + 1;
        const active = ratingVal <= value;
        return (
          <button
            key={idx}
            type="button"
            disabled={readOnly}
            onClick={() => onChange?.(ratingVal)}
            aria-label={`${ratingVal} of ${max}`}
            className={`w-[44px] h-[44px] rounded-full flex items-center justify-center transition-all ${
              readOnly ? 'cursor-default' : 'cursor-pointer hover:scale-105'
            }`}
          >
            <span
              className={`w-6 h-6 rounded-full border-2 transition-all ${
                active
                  ? 'bg-jade border-jade'
                  : 'bg-white border-border hover:border-jade'
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}

// ==================== STEPPER ====================
interface StepperProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (val: number) => void;
}

export function Stepper({ value, min = 0, max = 99, onChange }: StepperProps) {
  return (
    <div className="inline-flex items-center border border-border rounded-[12px] p-0.5 bg-white shadow-xs">
      <button
        type="button"
        disabled={value <= min}
        onClick={() => onChange(value - 1)}
        className="w-[44px] h-[44px] flex items-center justify-center font-bold text-xl text-ink disabled:opacity-30 disabled:cursor-not-allowed hover:bg-surface rounded-[8px] transition-colors"
        aria-label="Decrease"
      >
        −
      </button>
      <span className="font-bold text-base w-10 text-center text-ink select-none">
        {value}
      </span>
      <button
        type="button"
        disabled={value >= max}
        onClick={() => onChange(value + 1)}
        className="w-[44px] h-[44px] flex items-center justify-center font-bold text-xl text-ink disabled:opacity-30 disabled:cursor-not-allowed hover:bg-surface rounded-[8px] transition-colors"
        aria-label="Increase"
      >
        +
      </button>
    </div>
  );
}

// ==================== AVATAR ====================
interface AvatarProps {
  name: string;
  role?: 'local' | 'traveller' | 'guide' | 'admin';
  size?: 'sm' | 'md' | 'lg';
}

export function Avatar({ name, role = 'local', size = 'md' }: AvatarProps) {
  const initial = (name.trim()[0] || 'U').toUpperCase();

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
  }[size];

  const roleClasses =
    role === 'local' || role === 'guide'
      ? 'bg-jade text-white font-bold'
      : 'bg-coral text-ink font-bold';

  return (
    <div
      className={`rounded-full flex items-center justify-center shrink-0 ${sizeClasses} ${roleClasses}`}
      aria-label={`${name} (${role})`}
    >
      {initial}
    </div>
  );
}

// ==================== SEAT DOTS & TABLE RING ====================
interface SeatDotsProps {
  locals: number;
  travellers: number;
  free: number;
  size?: 'sm' | 'md';
}

export function SeatDots({ locals, travellers, free, size = 'md' }: SeatDotsProps) {
  const dotSize = size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5';

  return (
    <div className="flex items-center gap-1.5" aria-label="Seat distribution">
      {Array.from({ length: locals }).map((_, i) => (
        <span
          key={`loc-${i}`}
          className={`${dotSize} rounded-full bg-jade`}
          title="Local seat"
        />
      ))}
      {Array.from({ length: travellers }).map((_, i) => (
        <span
          key={`trv-${i}`}
          className={`${dotSize} rounded-full bg-coral`}
          title="Traveller seat"
        />
      ))}
      {Array.from({ length: free }).map((_, i) => (
        <span
          key={`fr-${i}`}
          className={`${dotSize} rounded-full border-2 border-dashed border-[#7B8A84] bg-white`}
          title="Empty seat"
        />
      ))}
    </div>
  );
}

export function SeatLegend({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3.5 flex-wrap text-xs text-muted ${className}`}>
      <span className="flex items-center gap-1.5">
        <span aria-hidden="true" className="w-3 h-3 rounded-full bg-jade" />
        Local
      </span>
      <span className="flex items-center gap-1.5">
        <span aria-hidden="true" className="w-3 h-3 rounded-full bg-coral" />
        Traveller
      </span>
      <span className="flex items-center gap-1.5">
        <span aria-hidden="true" className="w-3 h-3 box-border rounded-full border-2 border-dashed border-[#7B8A84] bg-white" />
        Free seat
      </span>
    </div>
  );
}

export interface TableRingProps {
  locals: number;
  travellers: number;
  free: number;
  containerSize?: number;
  centerSize?: number;
  dotSize?: number;
}

export function TableRing({
  locals,
  travellers,
  free,
  containerSize = 88,
  centerSize = 40,
  dotSize = 18,
}: TableRingProps) {
  const total = locals + travellers + free;
  const center = containerSize / 2;
  const radius = 33;

  const seats = [];
  for (let i = 0; i < total; i++) {
    const angle = -Math.PI / 2 + (i * 2 * Math.PI) / total;
    const left = Math.round(center + radius * Math.cos(angle) - dotSize / 2);
    const top = Math.round(center + radius * Math.sin(angle) - dotSize / 2);
    const isLocal = i < locals;
    const isTraveller = i >= locals && i < locals + travellers;

    seats.push({
      left: `${left}px`,
      top: `${top}px`,
      isLocal,
      isTraveller,
      isFree: !isLocal && !isTraveller,
    });
  }

  return (
    <div
      aria-hidden="true"
      style={{ width: `${containerSize}px`, height: `${containerSize}px` }}
      className="relative shrink-0"
    >
      {/* Table center */}
      <div
        style={{
          width: `${centerSize}px`,
          height: `${centerSize}px`,
          left: `${(containerSize - centerSize) / 2}px`,
          top: `${(containerSize - centerSize) / 2}px`,
        }}
        className="absolute rounded-full bg-mint"
      />

      {/* Seats */}
      {seats.map((s, idx) => (
        <span
          key={idx}
          style={{
            left: s.left,
            top: s.top,
            width: `${dotSize}px`,
            height: `${dotSize}px`,
          }}
          className={`absolute rounded-full box-border ${
            s.isLocal
              ? 'bg-jade'
              : s.isTraveller
                ? 'bg-coral'
                : 'border-2 border-dashed border-[#7B8A84] bg-white'
          }`}
        />
      ))}
    </div>
  );
}

// ==================== PHRASE CARD ====================
interface PhraseCardProps {
  phraseVi: string;
  meaningEn: string;
  pronunciation?: string;
  note?: string;
}

export function PhraseCard({ phraseVi, meaningEn, pronunciation, note }: PhraseCardProps) {
  return (
    <div className="bg-jade text-white p-5 rounded-[20px] shadow-sm my-3">
      <p className="text-xs font-bold text-mint-light uppercase tracking-wider mb-2">
        {note || 'Show this card at the shop'}
      </p>
      <p className="text-xl md:text-2xl font-bold text-white leading-tight mb-2">
        &ldquo;{phraseVi}&rdquo;
      </p>
      {pronunciation && (
        <p className="text-xs text-mint-light italic mb-1.5">/{pronunciation}/</p>
      )}
      <p className="text-sm text-white/90 font-medium">&ldquo;{meaningEn}&rdquo;</p>
    </div>
  );
}
