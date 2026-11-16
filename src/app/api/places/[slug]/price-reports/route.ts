import { NextResponse } from 'next/server';
import { getRepos } from '@/server/repositories';
import { authService } from '@/server/auth';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const body = await request.json();
  const user = await authService.getCurrentUser();
  const repos = getRepos();

  const place = await repos.places.getBySlug(slug);
  if (!place) {
    return NextResponse.json({ error: 'Place not found' }, { status: 404 });
  }

  const report = await repos.priceReports.create({
    place_id: place.id,
    user_id: user?.user_id || 'anonymous',
    amount: Number(body.amount) || 50000,
  });

  return NextResponse.json(report);
}
