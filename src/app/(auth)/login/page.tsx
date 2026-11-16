import { ScreenHeader } from '@/components/ui';

export default function LoginPage() {
  return (
    <div className="bg-ink min-h-screen text-white p-5">
      <ScreenHeader title="MOCK LOGIN" variant="dark" backHref="/" backLabel="Home" />
      <div className="mt-4">
        <p className="text-sm text-on-dark-2">Select a seed profile to sign in (Placeholder)</p>
      </div>
    </div>
  );
}
