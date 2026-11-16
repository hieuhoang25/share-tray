import { NextResponse } from 'next/server';
import { getRepos } from '@/server/repositories';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const repos = getRepos();
  const table = await repos.tables.getById(id);

  if (!table) {
    return NextResponse.json({ error: 'Table not found' }, { status: 404 });
  }

  const [place, members, allProfiles] = await Promise.all([
    repos.places.getById(table.place_id),
    repos.tables.getMembers(table.id),
    repos.profiles.getAll(),
  ]);

  const memberProfiles = members.map((m) => {
    const profile = allProfiles.find((p) => p.user_id === m.user_id);
    return {
      ...m,
      profile,
    };
  });

  return NextResponse.json({
    table,
    place,
    members: memberProfiles,
  });
}
