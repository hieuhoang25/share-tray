import { describe, it, expect, beforeEach } from 'vitest';
import { createMockRepositories, store } from '@/server/repositories/mock/store';

describe('Mock Repositories', () => {
  const repos = createMockRepositories();

  beforeEach(() => {
    store.reset();
  });

  it('retrieves seed profiles and updates user profile', async () => {
    const profile = await repos.profiles.getByUserId('user-linh');
    expect(profile).not.toBeNull();
    expect(profile?.display_name).toBe('Linh');
    expect(profile?.role).toBe('local');

    const updated = await repos.profiles.update('user-linh', { brave_level: 'fearless' });
    expect(updated.brave_level).toBe('fearless');
  });

  it('fetches published places and menus', async () => {
    const places = await repos.places.getAll();
    expect(places.length).toBeGreaterThan(0);
    expect(places[0].slug).toBe('pho-ba-tam');

    const menu = await repos.menuItems.getByPlaceId(places[0].id);
    expect(menu.length).toBeGreaterThan(0);
    expect(menu[0].name_vi).toBe('Phở tái');
  });

  it('strictly handles mutual connections without exposing one-way picks', async () => {
    const tableId = 'table-test';
    // User A picks User B
    await repos.connections.addConnection(tableId, 'user-a', 'user-b');

    // User A checks mutual connections -> should be empty
    const mutualsForA = await repos.connections.getMutualConnections(tableId, 'user-a');
    expect(mutualsForA).toEqual([]);

    // User B checks mutual connections -> should be empty (B does not see A chose B)
    const mutualsForB = await repos.connections.getMutualConnections(tableId, 'user-b');
    expect(mutualsForB).toEqual([]);

    // Now User B also picks User A
    await repos.connections.addConnection(tableId, 'user-b', 'user-a');

    // Both now see each other
    expect(await repos.connections.getMutualConnections(tableId, 'user-a')).toEqual(['user-b']);
    expect(await repos.connections.getMutualConnections(tableId, 'user-b')).toEqual(['user-a']);
  });

  it('manages table members join and leave', async () => {
    const table = await repos.tables.getById('table-1');
    expect(table).not.toBeNull();

    const membersBefore = await repos.tables.getMembers('table-1');
    expect(membersBefore.length).toBe(2);

    await repos.tables.addMember('table-1', 'user-minhanh');
    const membersAfter = await repos.tables.getMembers('table-1');
    expect(membersAfter.length).toBe(3);

    await repos.tables.removeMember('table-1', 'user-minhanh');
    const membersRemoved = await repos.tables.getMembers('table-1');
    expect(membersRemoved.length).toBe(2);
  });
});
