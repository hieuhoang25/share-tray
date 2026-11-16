'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, UtensilsCrossed, Calendar, Users, HelpCircle } from 'lucide-react';

interface TabItem {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const TABS: TabItem[] = [
  { id: 'now', label: 'Now', href: '/', icon: Compass },
  { id: 'dishes', label: 'Dishes', href: '/dishes', icon: UtensilsCrossed },
  { id: 'days', label: 'Days', href: '/days/linh-saturday', icon: Calendar },
  { id: 'together', label: 'Together', href: '/together', icon: Users },
  { id: 'help', label: 'Help', href: '/help', icon: HelpCircle },
];

interface BottomNavProps {
  theme?: 'dark' | 'light';
}

export function BottomNav({ theme = 'dark' }: BottomNavProps) {
  const pathname = usePathname();
  const isDark = theme === 'dark';

  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 z-40 mx-auto max-w-[480px] w-full border-t transition-colors ${
        isDark ? 'bg-ink border-line-dark' : 'bg-white border-border'
      }`}
      aria-label="Main Navigation"
    >
      <div className="flex items-center justify-around h-16 px-1">
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
              className={`relative flex flex-col items-center justify-center flex-1 h-full min-h-[44px] min-w-[44px] transition-colors ${
                isActive
                  ? isDark
                    ? 'text-yellow font-bold'
                    : 'text-red font-bold'
                  : isDark
                    ? 'text-on-dark-2 hover:text-white'
                    : 'text-muted hover:text-ink'
              }`}
            >
              {/* Active top border 3px */}
              {isActive && (
                <span
                  className={`absolute top-0 left-2 right-2 h-[3px] rounded-b-sm ${
                    isDark ? 'bg-yellow' : 'bg-red'
                  }`}
                />
              )}
              <Icon className="w-5 h-5 stroke-[2px] mb-1" />
              <span className="text-[11px] font-semibold uppercase tracking-wider">
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
