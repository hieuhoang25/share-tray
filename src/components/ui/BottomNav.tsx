'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export interface TabItem {
  id: string;
  label: string;
  href: string;
  icon: (props: { className?: string }) => React.ReactNode;
}

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M4 11l8-7 8 7v8a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1z" />
    </svg>
  );
}

function TablesIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M16 14.2c2.9.3 5 2.7 5 5.8" />
    </svg>
  );
}

function DishesIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M3 12h18a9 9 0 0 1-18 0z" />
      <path d="M8 4c0 1.5 1 1.5 1 3M12 4c0 1.5 1 1.5 1 3M16 4c0 1.5 1 1.5 1 3" />
    </svg>
  );
}

function DaysIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

function HelpIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
    </svg>
  );
}

export const TABS: TabItem[] = [
  { id: 'home', label: 'Home', href: '/', icon: HomeIcon },
  { id: 'tables', label: 'Tables', href: '/together', icon: TablesIcon },
  { id: 'dishes', label: 'Dishes', href: '/dishes', icon: DishesIcon },
  { id: 'days', label: 'Days', href: '/days/linh-saturday', icon: DaysIcon },
  { id: 'help', label: 'Help', href: '/help', icon: HelpIcon },
];

interface BottomNavProps {
  theme?: 'dark' | 'light';
}

export function BottomNav({ theme = 'light' }: BottomNavProps) {
  const pathname = usePathname();
  const isDark = theme === 'dark';

  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 z-40 mx-auto max-w-[480px] w-full border-t transition-colors ${
        isDark ? 'bg-jade-dark border-line-dark' : 'bg-white border-border'
      }`}
      aria-label="Main Navigation"
    >
      <div className="grid grid-cols-5 px-2 py-1">
        {TABS.map((tab) => {
          const isActive =
            tab.href === '/'
              ? pathname === '/'
              : pathname.startsWith(tab.href.split('/')[1] ? `/${tab.href.split('/')[1]}` : tab.href);
          const Icon = tab.icon;

          return (
            <Link
              key={tab.id}
              href={tab.href}
              aria-current={isActive ? 'page' : undefined}
              className={`flex flex-col items-center justify-center gap-1 h-14 min-h-[44px] min-w-[44px] text-[11px] select-none transition-colors ${
                isActive
                  ? isDark
                    ? 'text-coral font-bold'
                    : 'text-jade font-bold'
                  : isDark
                    ? 'text-mint-light hover:text-white font-medium'
                    : 'text-muted hover:text-ink font-medium'
              }`}
            >
              <Icon className="w-[22px] h-[22px]" />
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
