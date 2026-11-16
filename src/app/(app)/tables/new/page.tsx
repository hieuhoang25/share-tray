import { ScreenHeader } from '@/components/ui';

export default function NewTablePage() {
  return (
    <div className="bg-white min-h-screen text-ink">
      <ScreenHeader title="HOST A TABLE" variant="dark" backHref="/together" backLabel="Together" />
      <div className="p-5">
        <p className="text-sm text-muted">New table form placeholder</p>
      </div>
    </div>
  );
}
