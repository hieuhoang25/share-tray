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

  const [dish, praises, usual, nearby, reviews, allTables] = await Promise.all([
    repos.dishes.getById(place.dish_id),
    repos.praises.getByPlaceId(place.id),
    repos.usuals.getByPlaceId(place.id),
    repos.nearbyPoints.getByPlaceId(place.id),
    repos.reviews.getByPlaceId(place.id),
    repos.tables.getAll(),
  ]);

  const openSeats = allTables.filter((t) => t.place_id === place.id && t.status === 'open');

  return NextResponse.json({
    place,
    dish,
    praises,
    usual,
    nearby,
    reviews,
    openSeats,
  });
}
