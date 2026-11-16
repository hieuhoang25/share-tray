import { ScreenHeader } from '@/components/ui';

export default async function TableAfterPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className="bg-white min-h-screen text-ink">
      <ScreenHeader title="YOU ATE WITH FIVE PEOPLE" variant="red" backHref={`/tables/${id}`} backLabel="Table" />
      <div className="p-5">
        <p className="text-sm text-muted">Table #{id} after meal contacts placeholder</p>
      </div>
    </div>
  );
}
