import { ScreenHeader } from '@/components/ui';

export default function ContributePage() {
  return (
    <div className="bg-white min-h-screen text-ink">
      <ScreenHeader title="THÊM QUÁN QUEN" variant="dark" backHref="/" backLabel="Trang chủ" />
      <div className="p-5">
        <p className="text-sm text-muted">Màn hình đóng góp quán quen tiếng Việt cho người Việt (Placeholder)</p>
      </div>
    </div>
  );
}
