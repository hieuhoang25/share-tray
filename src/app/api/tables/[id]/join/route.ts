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
  const table = await repos.tables.getById(id);
  if (!table) {
    return NextResponse.json({ error: 'Table not found' }, { status: 404 });
  }

  const currentMembers = await repos.tables.getMembers(id);
  if (currentMembers.length >= table.seats_total) {
    return NextResponse.json({ error: 'Table is full' }, { status: 400 });
  }

  // Women only check
  if (table.format.toLowerCase().includes('women only') && user.gender !== 'female') {
    return NextResponse.json({ error: 'This table is designated for women only' }, { status: 403 });
  }

  const member = await repos.tables.addMember(id, user.user_id, false);
  return NextResponse.json({ success: true, member });
}
