import { NextResponse } from 'next/server';
import { getRepos } from '@/server/repositories';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const repos = getRepos();
  const dish = await repos.dishes.getBySlug(slug);

  if (!dish) {
    return NextResponse.json({ error: 'Dish not found' }, { status: 404 });
  }

  const allPlaces = await repos.places.getAll();
  const places = allPlaces.filter((p) => p.dish_id === dish.id && p.status === 'published');

  return NextResponse.json({ dish, places });
}
