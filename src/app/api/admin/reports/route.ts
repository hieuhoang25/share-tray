import { NextResponse } from 'next/server';
import { getRepos } from '@/server/repositories';
import { authService } from '@/server/auth';

export async function GET() {
  const user = await authService.getCurrentUser();
  if (user?.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const repos = getRepos();
  const reports = await repos.reports.getAll();
  return NextResponse.json(reports);
}

export async function PATCH(request: Request) {
  const user = await authService.getCurrentUser();
  if (user?.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { id, status } = await request.json();
  const repos = getRepos();
  const updated = await repos.reports.update(id, { status });
  return NextResponse.json(updated);
}
