import { NextResponse } from 'next/server';
import { getRepos } from '@/server/repositories';
import { authService } from '@/server/auth';

export async function POST(request: Request) {
  try {
    const user = await authService.getCurrentUser();
    const body = await request.json();
    const repos = getRepos();

    const report = await repos.reports.create({
      reporter_id: user?.user_id || 'anonymous',
      target_type: body.target_type || 'user',
      target_id: body.target_id || 'target',
      reason: body.reason || 'Inappropriate behavior',
      status: 'pending',
    });

    return NextResponse.json(report);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Report failed';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
