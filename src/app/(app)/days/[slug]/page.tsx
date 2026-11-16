import { ScreenHeader } from '@/components/ui';

export default async function DayPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <div className="bg-white min-h-screen text-ink">
      <ScreenHeader title="BORROW A LOCAL'S DAY" variant="light" backHref="/" backLabel="Home" />
      <div className="p-5">
        <p className="text-sm text-muted">Day itinerary placeholder for {slug}</p>
      </div>
    </div>
  );
}
