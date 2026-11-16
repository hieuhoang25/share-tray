import { NextResponse } from 'next/server';
import { getRepos } from '@/server/repositories';
import { authService } from '@/server/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const user = await authService.getCurrentUser();
    const repos = getRepos();

    // Create new pending place submission
    const place = await repos.places.create({
      slug: (body.name || 'quan-quen').toLowerCase().replace(/\s+/g, '-'),
      name: body.name,
      dish_id: 'dish-pho',
      district: 'Ba Đình',
      city: 'Hà Nội',
      lat: 21.0362,
      lng: 105.8344,
      price_min: Number(body.price_paid) || 45000,
      price_max: Number(body.price_paid) * 1.3 || 65000,
      level: 'curious',
      open_hours: { open: '06:30', close: '21:00' },
      covered_seating: true,
      cash_only: true,
      known_for_en: body.why_delicious || 'Beloved local staple',
      downside_en: 'Street parking can be crowded',
      status: 'pending',
      submitted_by: user?.user_id || 'anonymous-local',
    });

    // Create initial review
    await repos.reviews.create({
      place_id: place.id,
      author_id: user?.user_id || 'user-linh',
      how_known: body.how_known,
      score_price: Number(body.score_price) || 5,
      score_service: Number(body.score_service) || 4,
      score_space: Number(body.score_space) || 4,
      praise_vi: body.why_delicious,
      memory_vi: body.memory || '',
      text_en: body.why_delicious,
      status: 'pending',
    });

    return NextResponse.json({ success: true, place });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to submit contribution';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
