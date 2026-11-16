'use client';

import React, { useState, useEffect } from 'react';
import type { Place, Review, Profile, Report } from '@/types/domain';

export default function AdminDashboardPage() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [users, setUsers] = useState<Profile[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'places' | 'reviews' | 'users' | 'reports'>('overview');

  useEffect(() => {
    async function loadAdminData() {
      try {
        const [placesRes, reviewsRes, usersRes, reportsRes] = await Promise.all([
          fetch('/api/admin/places'),
          fetch('/api/admin/reviews'),
          fetch('/api/admin/users'),
          fetch('/api/admin/reports'),
        ]);

        if (placesRes.ok) setPlaces(await placesRes.json());
        if (reviewsRes.ok) setReviews(await reviewsRes.json());
        if (usersRes.ok) setUsers(await usersRes.json());
        if (reportsRes.ok) setReports(await reportsRes.json());
      } catch (err) {
        console.error(err);
      }
    }
    loadAdminData();
  }, []);

  const handleApprovePlace = async (id: string) => {
    try {
      const res = await fetch('/api/admin/places', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: 'published' }),
      });
      if (res.ok) {
        setPlaces(places.map((p) => (p.id === id ? { ...p, status: 'published' } : p)));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleVerifyUser = async (userId: string, current: boolean) => {
    try {
      const res = await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, is_verified: !current }),
      });
      if (res.ok) {
        setUsers(users.map((u) => (u.user_id === userId ? { ...u, is_verified: !current } : u)));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const pendingPlaces = places.filter((p) => p.status === 'pending');
  const pendingReviews = reviews.filter((r) => r.status === 'pending');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-anton text-3xl text-ink">ADMIN CONSOLE</h1>
          <p className="text-sm text-muted">
            Moderation, verification, review translations, and data reset.
          </p>
        </div>
        <button
          type="button"
          onClick={async () => {
            await fetch('/api/dev/reset', { method: 'POST' });
            alert('Store reset successfully!');
            window.location.reload();
          }}
          className="bg-red text-white font-bold text-xs px-4 py-2 rounded-lg hover:bg-[#A31F17]"
        >
          Reset Demo Data
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border space-x-4 text-sm font-bold">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'places', label: `Quán chờ duyệt (${pendingPlaces.length})` },
          { id: 'reviews', label: `Reviews (${reviews.length})` },
          { id: 'users', label: `Người dùng (${users.length})` },
          { id: 'reports', label: `Báo cáo (${reports.length})` },
        ].map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setActiveTab(t.id as 'overview' | 'places' | 'reviews' | 'users' | 'reports')}
            className={`pb-2.5 transition-colors ${
              activeTab === t.id
                ? 'border-b-2 border-red text-red-text font-bold'
                : 'text-muted hover:text-ink'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* OVERVIEW STATS */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-[12px] border border-border shadow-xs">
            <p className="text-xs font-semibold text-muted uppercase">Quán chờ duyệt</p>
            <p className="font-anton text-3xl text-red mt-1">{pendingPlaces.length}</p>
          </div>
          <div className="bg-white p-5 rounded-[12px] border border-border shadow-xs">
            <p className="text-xs font-semibold text-muted uppercase">Review chờ duyệt</p>
            <p className="font-anton text-3xl text-ink mt-1">{pendingReviews.length}</p>
          </div>
          <div className="bg-white p-5 rounded-[12px] border border-border shadow-xs">
            <p className="text-xs font-semibold text-muted uppercase">Người dùng đã xác minh</p>
            <p className="font-anton text-3xl text-green mt-1">
              {users.filter((u) => u.is_verified).length}
            </p>
          </div>
          <div className="bg-white p-5 rounded-[12px] border border-border shadow-xs">
            <p className="text-xs font-semibold text-muted uppercase">Báo cáo mở</p>
            <p className="font-anton text-3xl text-red-text mt-1">{reports.length}</p>
          </div>
        </div>
      )}

      {/* PLACES APPROVAL TAB */}
      {activeTab === 'places' && (
        <div className="bg-white rounded-[12px] border border-border overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-bg border-b border-border text-xs uppercase font-bold text-muted">
              <tr>
                <th className="p-4">Tên quán</th>
                <th className="p-4">Quận</th>
                <th className="p-4">Trạng thái</th>
                <th className="p-4">Mô tả</th>
                <th className="p-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {places.map((place) => (
                <tr key={place.id} className="hover:bg-gray-bg/40">
                  <td className="p-4 font-bold text-ink">{place.name}</td>
                  <td className="p-4 text-muted">{place.district}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-bold uppercase ${
                        place.status === 'published'
                          ? 'bg-green/10 text-green'
                          : 'bg-yellow/20 text-yellow-800'
                      }`}
                    >
                      {place.status}
                    </span>
                  </td>
                  <td className="p-4 text-xs text-muted max-w-xs truncate">{place.known_for_en}</td>
                  <td className="p-4 text-right">
                    {place.status === 'pending' && (
                      <button
                        type="button"
                        onClick={() => handleApprovePlace(place.id)}
                        className="bg-green text-white font-bold text-xs px-3 py-1.5 rounded hover:bg-green-700"
                      >
                        Phê duyệt
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* USERS VERIFICATION TAB */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-[12px] border border-border overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-bg border-b border-border text-xs uppercase font-bold text-muted">
              <tr>
                <th className="p-4">Tên</th>
                <th className="p-4">Vai trò</th>
                <th className="p-4">Nghề nghiệp</th>
                <th className="p-4">Xác minh ID</th>
                <th className="p-4 text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-gray-bg/40">
                  <td className="p-4 font-bold text-ink">{u.display_name}</td>
                  <td className="p-4 text-xs uppercase font-semibold text-muted">{u.role}</td>
                  <td className="p-4 text-xs text-muted">{u.work}</td>
                  <td className="p-4">
                    {u.is_verified ? (
                      <span className="text-xs text-green font-bold">✓ Đã xác minh</span>
                    ) : (
                      <span className="text-xs text-muted">Chưa xác minh</span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <button
                      type="button"
                      onClick={() => handleToggleVerifyUser(u.user_id, u.is_verified)}
                      className={`text-xs font-bold px-3 py-1.5 rounded transition-colors ${
                        u.is_verified
                          ? 'border border-border text-muted hover:border-red hover:text-red'
                          : 'bg-ink text-white hover:bg-ink-2'
                      }`}
                    >
                      {u.is_verified ? 'Huỷ xác minh' : 'Bật xác minh'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
