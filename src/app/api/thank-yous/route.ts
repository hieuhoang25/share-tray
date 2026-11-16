import { NextResponse } from 'next/server';
import { getRepos } from '@/server/repositories';
import { authService } from '@/server/auth';

export async function POST(request: Request) {
  const body = await request.json();
  const user = await authService.getCurrentUser();
  const repos = getRepos();

  const thankYou = await repos.thankYous.create({
    from_user: user?.user_id || 'anonymous',
    to_local: body.to_local || 'user-linh',
    usual_id: body.usual_id,
    message: body.message || 'Cảm ơn bạn đã chia sẻ quán ăn tuyệt vời này!',
  });

  return NextResponse.json(thankYou);
}
