import { NextResponse } from 'next/server';
import { getRepos } from '@/server/repositories';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const { searchParams } = new URL(request.url);
  const rules = searchParams.get('rules')?.split(',').filter(Boolean) || [];

  const repos = getRepos();
  const place = await repos.places.getBySlug(slug);

  if (!place) {
    return NextResponse.json({ error: 'Place not found' }, { status: 404 });
  }

  const items = await repos.menuItems.getByPlaceId(place.id);

  // Filter items that conflict with rules
  const filtered = items.map((item) => {
    let violates = false;
    if (rules.includes('no_pork') && item.contains.includes('pork')) violates = true;
    if (rules.includes('no_peanut') && item.contains.includes('peanut')) violates = true;
    if (rules.includes('no_beef') && item.contains.includes('beef')) violates = true;
    if (rules.includes('vegetarian') && (item.contains.includes('beef') || item.contains.includes('pork') || item.contains.includes('shellfish'))) {
      violates = true;
    }
    return {
      ...item,
      hidden: violates,
    };
  });

  return NextResponse.json({
    items: filtered.filter((i) => !i.hidden),
    hiddenCount: filtered.filter((i) => i.hidden).length,
  });
}
