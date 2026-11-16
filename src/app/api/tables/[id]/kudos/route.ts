import { NextResponse } from 'next/server';
import { getRepos } from '@/server/repositories';
import { authService } from '@/server/auth';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const user = await authService.getCurrentUser();
  const body = await request.json();

  const repos = getRepos();
  const kudo = await repos.kudos.addKudo(
    id,
    user?.user_id || 'anonymous',
    body.host_id,
    body.kind || 'Great storyteller'
  );

  return NextResponse.json(kudo);
}
