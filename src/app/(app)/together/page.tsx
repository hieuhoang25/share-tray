import { ScreenHeader } from '@/components/ui';

export default function TogetherPage() {
  return (
    <div className="bg-white min-h-screen text-ink">
      <ScreenHeader title="EAT TOGETHER" variant="dark" backHref="/" backLabel="Home" />
      <div className="p-5">
        <p className="text-sm text-muted">Eat together tables placeholder</p>
      </div>
    </div>
  );
}
