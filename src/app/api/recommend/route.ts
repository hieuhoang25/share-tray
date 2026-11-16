import { NextResponse } from 'next/server';
import { recommendNow } from '@/server/services/food';
import type { BraveLevel } from '@/types/domain';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const level = (searchParams.get('level') as BraveLevel) || 'curious';
  const lat = searchParams.get('lat') ? parseFloat(searchParams.get('lat')!) : undefined;
  const lng = searchParams.get('lng') ? parseFloat(searchParams.get('lng')!) : undefined;
  const foodRules = searchParams.get('rules')?.split(',').filter(Boolean);

  const recommendation = await recommendNow({
    level,
    lat,
    lng,
    foodRules,
  });

  if (!recommendation) {
    return NextResponse.json({ error: 'No suitable recommendation found' }, { status: 404 });
  }

  return NextResponse.json(recommendation);
}
