import { NextResponse } from 'next/server';
import { getRepos } from '@/server/repositories';
import { authService } from '@/server/auth';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const purpose = searchParams.get('purpose');

  const repos = getRepos();
  const tables = await repos.tables.getAll();
  const filtered = purpose ? tables.filter((t) => t.purpose === purpose) : tables;

  return NextResponse.json(filtered);
}

export async function POST(request: Request) {
  const user = await authService.getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const repos = getRepos();

  const table = await repos.tables.create({
    host_id: user.user_id,
    place_id: body.place_id || 'place-pho-ba-tam',
    starts_at: body.starts_at || '12:00 Today',
    duration_min: Number(body.duration_min) || 60,
    format: body.who_welcome || 'Half locals half travellers',
    who_welcome: body.who_welcome || 'Anyone',
    purpose: body.purpose || 'New friends',
    title: body.title,
    description: body.description,
    seats_total: Number(body.seats_total) || 6,
    est_price: Number(body.est_price) || 60000,
    status: 'open',
  });

  // Host automatically joins
  await repos.tables.addMember(table.id, user.user_id, true);

  return NextResponse.json(table);
}
