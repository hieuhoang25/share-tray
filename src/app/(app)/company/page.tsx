import { ScreenHeader } from '@/components/ui';

export default function CompanyPage() {
  return (
    <div className="bg-white min-h-screen text-ink">
      <ScreenHeader title="FIND COMPANY" variant="dark" backHref="/" backLabel="Home" />
      <div className="p-5">
        <p className="text-sm text-muted">Eat with local or hire guide placeholder</p>
      </div>
    </div>
  );
}
