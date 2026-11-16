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
      className={`bg-white border border-border p-5 text-ink transition-shadow ${
        featured ? 'rounded-[16px] shadow-sm' : 'rounded-[12px]'
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
}: {
  children: React.ReactNode;
  className?: string;
  featured?: boolean;
}) {
  return (
    <div
      className={`bg-ink-2 border border-line-dark p-5 text-white ${
        featured ? 'rounded-[16px] shadow-md' : 'rounded-[12px]'
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function NoteBox({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-cream border border-cream-border rounded-[10px] p-4 text-cream-text text-sm ${className}`}
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
      className={`bg-gray-bg border border-border rounded-[10px] p-4 text-muted text-sm ${className}`}
    >
      {children}
    </div>
  );
}
