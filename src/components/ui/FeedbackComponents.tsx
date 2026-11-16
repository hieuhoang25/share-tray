import React from 'react';

interface NumberedStepProps {
  number: number | string;
  title: string;
  description: string;
  meta?: string;
}

export function NumberedStep({ number, title, description, meta }: NumberedStepProps) {
  return (
    <div className="flex items-start gap-4 py-3">
      <div className="font-anton text-red text-3xl md:text-4xl leading-none shrink-0 w-8 text-center pt-0.5">
        {number}
      </div>
      <div className="flex-1">
        <h3 className="font-bold text-ink text-base mb-1">{title}</h3>
        <p className="text-muted text-sm leading-relaxed mb-1">{description}</p>
        {meta && (
          <span className="text-xs font-semibold text-red-text uppercase tracking-wide">
            {meta}
          </span>
        )}
      </div>
    </div>
  );
}

interface ScoreBarProps {
  label: string;
  score: number;
  maxScore?: number;
}

export function ScoreBar({ label, score, maxScore = 5 }: ScoreBarProps) {
  const percentage = Math.min(Math.max((score / maxScore) * 100, 0), 100);

  return (
    <div className="flex items-center gap-3 py-1.5 w-full text-sm">
      <span className="w-20 font-medium text-muted shrink-0">{label}</span>
      <div className="flex-1 h-2.5 bg-track rounded-full overflow-hidden">
        <div
          className="h-full bg-red rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="w-8 text-right font-bold text-ink shrink-0">
        {score.toFixed(1)}
      </span>
    </div>
  );
}

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
    <div className="flex items-center gap-2" role="radiogroup" aria-label="Rating">
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
                  ? 'bg-red border-red'
                  : 'bg-transparent border-border-2 hover:border-red'
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}

interface StepperProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (val: number) => void;
}

export function Stepper({ value, min = 0, max = 99, onChange }: StepperProps) {
  return (
    <div className="inline-flex items-center border border-border-2 rounded-[12px] p-1 bg-white">
      <button
        type="button"
        disabled={value <= min}
        onClick={() => onChange(value - 1)}
        className="w-[44px] h-[44px] flex items-center justify-center font-bold text-xl text-ink disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-bg rounded-[8px] transition-colors"
        aria-label="Decrease"
      >
        −
      </button>
      <span className="font-anton text-lg w-10 text-center text-ink select-none">
        {value}
      </span>
      <button
        type="button"
        disabled={value >= max}
        onClick={() => onChange(value + 1)}
        className="w-[44px] h-[44px] flex items-center justify-center font-bold text-xl text-ink disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-bg rounded-[8px] transition-colors"
        aria-label="Increase"
      >
        +
      </button>
    </div>
  );
}

interface AvatarProps {
  name: string;
  role?: 'local' | 'traveller' | 'guide' | 'admin';
  size?: 'sm' | 'md' | 'lg';
}

export function Avatar({ name, role = 'local', size = 'md' }: AvatarProps) {
  const initial = (name.trim()[0] || 'U').toUpperCase();

  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
  }[size];

  // Local = nền đỏ chữ vàng; Traveller = nền vàng viền ink
  const roleClasses =
    role === 'local' || role === 'guide'
      ? 'bg-red text-yellow font-anton'
      : 'bg-yellow text-ink border-2 border-ink font-anton';

  return (
    <div
      className={`rounded-full flex items-center justify-center font-bold shrink-0 ${sizeClasses} ${roleClasses}`}
      aria-label={`${name} (${role})`}
    >
      {initial}
    </div>
  );
}

interface SeatDotsProps {
  locals: number;
  travellers: number;
  free: number;
}

export function SeatDots({ locals, travellers, free }: SeatDotsProps) {
  return (
    <div className="flex items-center gap-1.5" aria-label="Seat distribution">
      {Array.from({ length: locals }).map((_, i) => (
        <span
          key={`loc-${i}`}
          className="w-3.5 h-3.5 rounded-full bg-red"
          title="Local seat"
        />
      ))}
      {Array.from({ length: travellers }).map((_, i) => (
        <span
          key={`trv-${i}`}
          className="w-3.5 h-3.5 rounded-full bg-yellow border-2 border-ink"
          title="Traveller seat"
        />
      ))}
      {Array.from({ length: free }).map((_, i) => (
        <span
          key={`fr-${i}`}
          className="w-3.5 h-3.5 rounded-full border-2 border-dashed border-muted-3 bg-transparent"
          title="Empty seat"
        />
      ))}
    </div>
  );
}

interface PhraseCardProps {
  phraseVi: string;
  meaningEn: string;
  pronunciation?: string;
}

export function PhraseCard({ phraseVi, meaningEn, pronunciation }: PhraseCardProps) {
  return (
    <div className="bg-red text-white p-5 rounded-[16px] border border-divider-red shadow-sm my-4">
      <p className="text-xs font-semibold text-pink-soft uppercase tracking-widest mb-1.5">
        Show this to the local
      </p>
      <p className="font-anton text-2xl md:text-3xl text-yellow leading-tight mb-2">
        &ldquo;{phraseVi}&rdquo;
      </p>
      {pronunciation && (
        <p className="text-xs text-pink-soft italic mb-1">/{pronunciation}/</p>
      )}
      <p className="text-sm text-white/90 font-medium">&ldquo;{meaningEn}&rdquo;</p>
    </div>
  );
}
