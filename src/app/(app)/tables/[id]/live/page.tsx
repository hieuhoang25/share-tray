import { ScreenHeader } from '@/components/ui';

export default async function TableLivePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className="bg-ink min-h-screen text-white">
      <ScreenHeader title="NO AWKWARD SILENCE" variant="dark" backHref={`/tables/${id}`} backLabel="Table" />
      <div className="p-5">
        <p className="text-sm text-on-dark-2">Table #{id} live cards placeholder</p>
      </div>
    </div>
  );
}
