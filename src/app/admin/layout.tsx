import React from 'react';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-bg text-ink flex flex-col md:flex-row w-full max-w-full">
      <aside className="w-full md:w-64 bg-white border-r border-border p-5 space-y-4 shrink-0">
        <div className="flex items-center gap-2 border-b border-border pb-3">
          <span className="font-anton text-red text-2xl">SHARE TRAY</span>
          <span className="text-xs bg-red text-white px-2 py-0.5 rounded font-bold">ADMIN</span>
        </div>
        <nav className="space-y-1 text-sm font-medium">
          <Link href="/admin" className="block px-3 py-2 rounded-lg bg-gray-bg font-bold text-ink">
            Dashboard
          </Link>
          <Link href="/admin/places" className="block px-3 py-2 rounded-lg hover:bg-gray-bg text-muted">
            Quán ăn (Places)
          </Link>
          <Link href="/admin/reviews" className="block px-3 py-2 rounded-lg hover:bg-gray-bg text-muted">
            Reviews & Usuals
          </Link>
          <Link href="/admin/tables" className="block px-3 py-2 rounded-lg hover:bg-gray-bg text-muted">
            Bàn ăn (Tables)
          </Link>
          <Link href="/admin/users" className="block px-3 py-2 rounded-lg hover:bg-gray-bg text-muted">
            Người dùng (Users)
          </Link>
          <Link href="/admin/reports" className="block px-3 py-2 rounded-lg hover:bg-gray-bg text-muted">
            Báo cáo (Reports)
          </Link>
        </nav>
        <div className="pt-4 border-t border-border">
          <Link href="/" className="text-xs text-red-text font-bold">
            ← Back to User App
          </Link>
        </div>
      </aside>
      <main className="flex-1 p-6 overflow-auto">{children}</main>
    </div>
  );
}
