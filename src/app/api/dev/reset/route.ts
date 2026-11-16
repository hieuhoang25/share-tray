import { NextResponse } from 'next/server';
import { store } from '@/server/repositories/mock/store';

export async function POST() {
  if (process.env.NODE_ENV === 'production' && process.env.DEMO_MODE !== 'true') {
    return NextResponse.json({ error: 'Reset disabled in production' }, { status: 403 });
  }

  store.reset();
  return NextResponse.json({ success: true, message: 'Mock store reset to seed data' });
}
