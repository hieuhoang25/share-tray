import { NextResponse } from 'next/server';
import { getRepos } from '@/server/repositories';
import { authService } from '@/server/auth';

export async function GET() {
  const user = await authService.getCurrentUser();
  if (user?.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const repos = getRepos();
  const reviews = await repos.reviews.getAll();
  return NextResponse.json(reviews);
}

export async function PATCH(request: Request) {
  const user = await authService.getCurrentUser();
  if (user?.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { id, status, text_en } = await request.json();
  const repos = getRepos();
  const updated = await repos.reviews.update(id, {
    ...(status && { status }),
    ...(text_en && { text_en }),
  });
  return NextResponse.json(updated);
}
