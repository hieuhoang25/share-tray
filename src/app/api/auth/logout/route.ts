import { NextResponse } from 'next/server';
import { authService } from '@/server/auth';

export async function POST() {
  await authService.signOut();
  return NextResponse.json({ success: true });
}
