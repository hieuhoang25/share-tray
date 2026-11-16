import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface ScreenHeaderProps {
  title: string;
  variant?: 'red' | 'dark' | 'light';
  backHref?: string;
  backLabel?: string;
  subtitle?: string;
  rightAction?: React.ReactNode;
}

export function ScreenHeader({
  title,
  variant = 'light',
  backHref,
  backLabel = 'Back',
  subtitle,
  rightAction,
}: ScreenHeaderProps) {
  const bgStyles = {
    red: 'bg-red text-white border-b border-divider-red',
    dark: 'bg-ink text-white border-b border-line-dark',
    light: 'bg-white text-ink border-b border-border',
  }[variant];

  const titleStyles = {
    red: 'text-yellow',
    dark: 'text-white',
    light: 'text-ink',
  }[variant];

  const backLinkStyles = {
    red: 'text-pink-soft hover:text-white',
    dark: 'text-on-dark-1 hover:text-white',
    light: 'text-muted hover:text-ink',
  }[variant];

  return (
    <header className={`px-5 py-4 ${bgStyles}`}>
      <div className="flex items-center justify-between gap-3 min-h-[44px]">
        {backHref ? (
          <Link
            href={backHref}
            className={`flex items-center gap-2 min-h-[44px] min-w-[44px] font-medium text-sm transition-colors ${backLinkStyles}`}
            aria-label={backLabel}
          >
            <ArrowLeft className="w-5 h-5 stroke-[2px]" />
            <span>{backLabel}</span>
          </Link>
        ) : (
          <div />
        )}
        {rightAction && <div className="flex items-center">{rightAction}</div>}
      </div>

      <div className="mt-2">
        {subtitle && (
          <p
            className={`text-xs font-semibold uppercase tracking-wider mb-1 ${
              variant === 'red' ? 'text-pink-soft' : variant === 'dark' ? 'text-on-dark-2' : 'text-muted'
            }`}
          >
            {subtitle}
          </p>
        )}
        <h1 className={`font-anton text-2xl md:text-3xl leading-tight ${titleStyles}`}>
          {title}
        </h1>
      </div>
    </header>
  );
}
