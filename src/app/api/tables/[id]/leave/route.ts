import { NextResponse } from 'next/server';
import { getRepos } from '@/server/repositories';
import { authService } from '@/server/auth';

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const user = await authService.getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const repos = getRepos();
  await repos.tables.removeMember(id, user.user_id);
  return NextResponse.json({ success: true });
}
