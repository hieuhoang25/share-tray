import { NextResponse } from 'next/server';
import { getRepos } from '@/server/repositories';
import { authService } from '@/server/auth';

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const user = await authService.getCurrentUser();
  const repos = getRepos();

  const place = await repos.places.getBySlug(slug);
  if (!place) {
    return NextResponse.json({ error: 'Place not found' }, { status: 404 });
  }

  const conf = await repos.openConfirmations.create({
    place_id: place.id,
    local_id: user?.user_id || 'user-linh',
  });

  return NextResponse.json(conf);
}
