import type { Repositories } from './types';
import { createMockRepositories } from './mock/store';

let mockRepos: Repositories | null = null;

export function getRepos(): Repositories {
  const dataSource = process.env.DATA_SOURCE || 'mock';

  if (dataSource === 'supabase') {
    // TODO (Phase 9): Return Supabase implementation
    throw new Error('Supabase repositories will be connected in Phase 9');
  }

  if (!mockRepos) {
    mockRepos = createMockRepositories();
  }
  return mockRepos;
}
