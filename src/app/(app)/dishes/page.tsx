import { ScreenHeader } from '@/components/ui';

export default function DishesPage() {
  return (
    <div className="bg-white min-h-screen text-ink">
      <ScreenHeader title="WHAT ARE YOU CRAVING?" variant="dark" backHref="/" backLabel="Home" />
      <div className="p-5">
        <p className="text-sm text-muted">
          Ranked only by Vietnamese people who eat there. Level shows how easy a place is on a first visit.
        </p>
      </div>
    </div>
  );
}
