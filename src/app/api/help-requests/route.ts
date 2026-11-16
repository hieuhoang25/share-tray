import { NextResponse } from 'next/server';
import { helpService } from '@/server/services/help';
import { authService } from '@/server/auth';

export async function POST(request: Request) {
  try {
    const user = await authService.getCurrentUser();
    const body = await request.json();

    const help = await helpService.createRequest({
      travellerId: user?.user_id || 'user-kenji',
      reason: body.reason || 'I cannot order',
      placeId: body.place_id,
      lat: body.lat,
      lng: body.lng,
      orderSnapshot: body.order_snapshot,
    });

    return NextResponse.json(help);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Help request failed';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
