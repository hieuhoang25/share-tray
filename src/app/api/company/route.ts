import { NextResponse } from 'next/server';
import { getRepos } from '@/server/repositories';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get('mode') as 'meal' | 'guide' | undefined;

  const repos = getRepos();
  const [offers, allProfiles] = await Promise.all([
    repos.company.getOffers(mode),
    repos.profiles.getAll(),
  ]);

  const detailedOffers = offers.map((off) => {
    const profile = allProfiles.find((p) => p.user_id === off.local_id);
    return {
      ...off,
      profile,
    };
  });

  return NextResponse.json(detailedOffers);
}
