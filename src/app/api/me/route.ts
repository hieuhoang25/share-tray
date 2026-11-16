import { NextResponse } from 'next/server';
import { authService } from '@/server/auth';
import { getRepos } from '@/server/repositories';

export async function GET() {
  const user = await authService.getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return NextResponse.json(user);
}

export async function PATCH(request: Request) {
  const user = await authService.getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const repos = getRepos();
  const updated = await repos.profiles.update(user.user_id, body);
  return NextResponse.json(updated);
}
