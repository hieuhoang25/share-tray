import { ScreenHeader } from '@/components/ui';

export default function ProfilePage() {
  return (
    <div className="bg-white min-h-screen text-ink">
      <ScreenHeader title="YOUR PROFILE" variant="dark" backHref="/" backLabel="Home" />
      <div className="p-5">
        <p className="text-sm text-muted">User profile and food rules placeholder</p>
      </div>
    </div>
  );
}
