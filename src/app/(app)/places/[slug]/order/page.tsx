import { ScreenHeader } from '@/components/ui';

export default async function OrderPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <div className="bg-white min-h-screen text-ink">
      <ScreenHeader title="ORDER" variant="red" backHref={`/places/${slug}`} backLabel="Place" />
      <div className="p-5">
        <p className="text-sm text-muted">Order card placeholder for {slug}</p>
      </div>
    </div>
  );
}
