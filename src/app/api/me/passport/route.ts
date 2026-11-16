import { NextResponse } from 'next/server';
import { authService } from '@/server/auth';
import { getRepos } from '@/server/repositories';

export async function GET() {
  const user = await authService.getCurrentUser();
  const userId = user ? user.user_id : 'user-kenji'; // demo fallback
  const repos = getRepos();
  const [stamps, dishes] = await Promise.all([
    repos.passportStamps.getByUserId(userId),
    repos.dishes.getAll(),
  ]);

  const passportDishes = dishes.filter((d) => d.passport);

  return NextResponse.json({
    stamps,
    passportDishes,
    total: passportDishes.length,
    earned: stamps.length,
  });
}
