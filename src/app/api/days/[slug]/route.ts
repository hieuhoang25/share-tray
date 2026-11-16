import { NextResponse } from 'next/server';
import { getRepos } from '@/server/repositories';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const repos = getRepos();
  const day = await repos.days.getBySlug(slug);

  if (!day) {
    return NextResponse.json({ error: 'Day not found' }, { status: 404 });
  }

  const [stops, allDays, author] = await Promise.all([
    repos.days.getStops(day.id),
    repos.days.getAll(),
    repos.profiles.getByUserId(day.local_id),
  ]);

  return NextResponse.json({
    day,
    stops,
    otherDays: allDays.filter((d) => d.id !== day.id),
    author,
  });
}
