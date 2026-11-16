import { NextResponse } from 'next/server';
import { getRepos } from '@/server/repositories';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const repos = getRepos();

  const [cards, table, words] = await Promise.all([
    repos.conversationCards.getAll(),
    repos.tables.getById(id),
    repos.tableWords.getByTableId(id),
  ]);

  const rituals = table ? await repos.tableRituals.getByDishId('dish-pho') : [];

  return NextResponse.json({
    cards,
    rituals,
    words,
    table,
  });
}
