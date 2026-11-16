import React from 'react';
import { BottomNav } from '@/components/ui';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 flex flex-col pb-20 w-full">
      <main className="flex-1 w-full">{children}</main>
      <BottomNav theme="dark" />
    </div>
  );
}
