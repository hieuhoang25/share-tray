import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export type ScreenHeaderVariant = 'jade' | 'light' | 'coral' | 'red' | 'dark';

interface ScreenHeaderProps {
  title: string;
  variant?: ScreenHeaderVariant;
  backHref?: string;
  backLabel?: string;
  subtitle?: string;
  rightAction?: React.ReactNode;
  children?: React.ReactNode;
}

export function ScreenHeader({
  title,
  variant = 'light',
  backHref,
  backLabel = 'Back',
  subtitle,
  rightAction,
  children,
}: ScreenHeaderProps) {
  const isJade = variant === 'jade' || variant === 'dark' || variant === 'red';
  const isCoral = variant === 'coral';

  const containerStyles = isJade
    ? 'bg-jade-dark text-white rounded-b-[28px] border-b-0'
    : isCoral
      ? 'bg-coral text-ink rounded-b-[28px] border-b-0'
      : 'bg-surface text-ink border-b border-border/70';

  const titleStyles = isJade
    ? 'text-white'
    : isCoral
      ? 'text-ink'
      : 'text-ink';

  const backLinkStyles = isJade
    ? 'text-white hover:text-mint-light'
    : isCoral
      ? 'text-ink hover:text-black'
      : 'text-muted hover:text-ink';

  const subtitleStyles = isJade
    ? 'text-mint-light'
    : isCoral
      ? 'text-coral-text'
      : 'text-muted';

  return (
    <header className={`px-5 py-4 pb-5 ${containerStyles}`}>
      <div className="flex items-center justify-between gap-3 min-h-[44px]">
        {backHref ? (
          <Link
            href={backHref}
            className={`flex items-center gap-1.5 min-h-[44px] min-w-[44px] font-semibold text-sm transition-colors ${backLinkStyles}`}
            aria-label={backLabel}
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.2px]" />
            <span>{backLabel}</span>
          </Link>
        ) : (
          <div />
        )}
        {rightAction && <div className="flex items-center">{rightAction}</div>}
      </div>

      <div className="mt-1">
        {subtitle && (
          <p className={`text-xs md:text-sm font-medium mb-1 ${subtitleStyles}`}>
            {subtitle}
          </p>
        )}
        <h1 className={`text-2xl md:text-3xl font-extrabold tracking-tight ${titleStyles}`}>
          {title}
        </h1>
        {children}
      </div>
    </header>
  );
}
