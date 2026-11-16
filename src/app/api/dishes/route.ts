import { NextResponse } from 'next/server';
import { getRepos } from '@/server/repositories';

export async function GET() {
  const repos = getRepos();
  const dishes = await repos.dishes.getAll();
  return NextResponse.json(dishes);
}
