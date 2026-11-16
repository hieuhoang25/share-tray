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
  const word = await repos.tableWords.addWord({
    table_id: id,
    user_id: user?.user_id || 'anonymous',
    word: body.word,
    meaning: body.meaning,
    language: body.language || 'vi',
  });

  return NextResponse.json(word);
}
