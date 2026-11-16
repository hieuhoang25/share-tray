import { ScreenHeader } from '@/components/ui';

export default async function PlacePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <div className="bg-white min-h-screen text-ink">
      <ScreenHeader title={slug.toUpperCase()} variant="red" backHref="/dishes" backLabel="All places" />
      <div className="p-5">
        <p className="text-sm text-muted">Place details placeholder for {slug}</p>
      </div>
    </div>
  );
}
