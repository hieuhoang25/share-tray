export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-anton text-3xl text-ink">ADMIN DASHBOARD</h1>
        <p className="text-sm text-muted">Manage places, pending reviews, reports and app config.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-[12px] border border-border shadow-xs">
          <p className="text-xs font-semibold text-muted uppercase">Quán chờ duyệt</p>
          <p className="font-anton text-3xl text-red mt-1">3</p>
        </div>
        <div className="bg-white p-5 rounded-[12px] border border-border shadow-xs">
          <p className="text-xs font-semibold text-muted uppercase">Review chờ duyệt</p>
          <p className="font-anton text-3xl text-ink mt-1">7</p>
        </div>
        <div className="bg-white p-5 rounded-[12px] border border-border shadow-xs">
          <p className="text-xs font-semibold text-muted uppercase">Báo cáo mới</p>
          <p className="font-anton text-3xl text-red-text mt-1">1</p>
        </div>
        <div className="bg-white p-5 rounded-[12px] border border-border shadow-xs">
          <p className="text-xs font-semibold text-muted uppercase">Bàn ăn hôm nay</p>
          <p className="font-anton text-3xl text-green mt-1">8</p>
        </div>
      </div>
    </div>
  );
}
