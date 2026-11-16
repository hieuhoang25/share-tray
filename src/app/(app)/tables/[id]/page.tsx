import { ScreenHeader } from '@/components/ui';

export default async function TablePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className="bg-white min-h-screen text-ink">
      <ScreenHeader title="TABLE DETAILS" variant="red" backHref="/together" backLabel="Tables" />
      <div className="p-5">
        <p className="text-sm text-muted">Table #{id} placeholder</p>
      </div>
    </div>
  );
}
