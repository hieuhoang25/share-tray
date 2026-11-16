import { ScreenHeader } from '@/components/ui';

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <div className="bg-white min-h-screen text-ink">
      <ScreenHeader title="HOW TO EAT" variant="dark" backHref={`/places/${slug}`} backLabel="Place" />
      <div className="p-5">
        <p className="text-sm text-muted">Step by step guide placeholder for {slug}</p>
      </div>
    </div>
  );
}
