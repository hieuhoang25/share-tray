import { NextResponse } from 'next/server';
import { buildVendorCard } from '@/server/services/food';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, foodRules, totalVnd } = body;

    const vendorCard = buildVendorCard({
      items: items || [],
      foodRules: foodRules || [],
      totalVnd: totalVnd || 0,
    });

    return NextResponse.json(vendorCard);
  } catch {
    return NextResponse.json({ error: 'Invalid vendor card request' }, { status: 400 });
  }
}
