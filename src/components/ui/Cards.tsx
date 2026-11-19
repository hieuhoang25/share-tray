import React from 'react';

export function Card({
  children,
  className = '',
  featured = false,
}: {
  children: React.ReactNode;
  className?: string;
  featured?: boolean;
}) {
  return (
    <div
      className={`bg-white border border-border/60 p-4 text-ink shadow-[0_1px_2px_rgba(18,33,29,0.06),0_8px_24px_rgba(18,33,29,0.04)] transition-shadow ${
        featured ? 'rounded-[24px]' : 'rounded-[20px]'
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function DarkCard({
  children,
  className = '',
  featured = false,
  variant = 'dark',
}: {
  children: React.ReactNode;
  className?: string;
  featured?: boolean;
  variant?: 'dark' | 'jade';
}) {
  const bgClass = variant === 'jade' ? 'bg-jade' : 'bg-jade-dark';
  return (
    <div
      className={`${bgClass} p-5 text-white shadow-sm ${
        featured ? 'rounded-[28px]' : 'rounded-[24px]'
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function NoteBox({
  children,
  className = '',
  variant = 'mint',
}: {
  children: React.ReactNode;
  className?: string;
  variant?: 'mint' | 'coral';
}) {
  const variantStyles =
    variant === 'coral'
      ? 'bg-coral-soft border border-coral/30 text-coral-text'
      : 'bg-mint border border-mint-border text-jade';

  return (
    <div
      className={`rounded-[14px] p-4 text-sm font-medium ${variantStyles} ${className}`}
    >
      {children}
    </div>
  );
}

export function InfoBox({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-white border border-border rounded-[14px] p-4 text-muted text-sm ${className}`}
    >
      {children}
    </div>
  );
}
