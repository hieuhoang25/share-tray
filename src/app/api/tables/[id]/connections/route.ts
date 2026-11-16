import { NextResponse } from 'next/server';
import { getRepos } from '@/server/repositories';
import { authService } from '@/server/auth';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const user = await authService.getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const repos = getRepos();
  const mutuals = await repos.connections.getMutualConnections(id, user.user_id);
  const network = await repos.connections.getUserNetwork(user.user_id);

  return NextResponse.json({ mutuals, network });
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const user = await authService.getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const repos = getRepos();

  const conn = await repos.connections.addConnection(id, user.user_id, body.to_user);
  return NextResponse.json(conn);
}
