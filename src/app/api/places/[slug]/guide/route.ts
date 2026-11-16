import { NextResponse } from 'next/server';
import { getRepos } from '@/server/repositories';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const repos = getRepos();
  const place = await repos.places.getBySlug(slug);

  if (!place) {
    return NextResponse.json({ error: 'Place not found' }, { status: 404 });
  }

  const [findSteps, eatGuide, openConfirmation, usual] = await Promise.all([
    repos.findSteps.getByPlaceId(place.id),
    repos.eatGuides.getByDishId(place.dish_id),
    repos.openConfirmations.getLatestByPlaceId(place.id),
    repos.usuals.getByPlaceId(place.id),
  ]);

  return NextResponse.json({
    place,
    findSteps,
    eatGuide,
    openConfirmation,
    usual,
  });
}
