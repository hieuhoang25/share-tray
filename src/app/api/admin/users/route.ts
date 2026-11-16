import { NextResponse } from 'next/server';
import { getRepos } from '@/server/repositories';
import { authService } from '@/server/auth';

export async function GET() {
  const user = await authService.getCurrentUser();
  if (user?.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const repos = getRepos();
  const profiles = await repos.profiles.getAll();
  return NextResponse.json(profiles);
}

export async function PATCH(request: Request) {
  const user = await authService.getCurrentUser();
  if (user?.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { userId, role, is_verified } = await request.json();
  const repos = getRepos();
  const updated = await repos.profiles.update(userId, {
    ...(role && { role }),
    ...(typeof is_verified === 'boolean' && {
      is_verified,
      verified_at: is_verified ? new Date().toISOString() : undefined,
    }),
  });
  return NextResponse.json(updated);
}
