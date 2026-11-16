import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import type { Profile } from '@/types/domain';
import { getRepos } from '@/server/repositories';

const SECRET_KEY = new TextEncoder().encode(
  process.env.AUTH_SECRET || 'share-tray-dev-secret-key-at-least-32-chars-long'
);

const AUTH_COOKIE = 'auth_token';

export interface AuthProvider {
  getCurrentUser(): Promise<Profile | null>;
  signIn(userId: string): Promise<Profile>;
  signOut(): Promise<void>;
}

export class MockAuthService implements AuthProvider {
  async getCurrentUser(): Promise<Profile | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get(AUTH_COOKIE)?.value;
    if (!token) return null;

    try {
      const { payload } = await jwtVerify(token, SECRET_KEY);
      const userId = payload.sub as string;
      if (!userId) return null;

      const repos = getRepos();
      return await repos.profiles.getByUserId(userId);
    } catch {
      return null;
    }
  }

  async signIn(userId: string): Promise<Profile> {
    const repos = getRepos();
    const profile = await repos.profiles.getByUserId(userId);
    if (!profile) {
      throw new Error(`User ${userId} not found`);
    }

    const token = await new SignJWT({
      sub: profile.user_id,
      role: profile.role,
      name: profile.display_name,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('7d')
      .sign(SECRET_KEY);

    const cookieStore = await cookies();
    cookieStore.set(AUTH_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60,
    });

    return profile;
  }

  async signOut(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.delete(AUTH_COOKIE);
  }
}

export const authService = new MockAuthService();
