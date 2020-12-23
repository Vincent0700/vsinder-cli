import request from './request';
import { MatchItem, User } from './entities';

export async function getMatches(): Promise<MatchItem[]> {
  const data = (await request.get('/matches/0')) as { matches: MatchItem[] };
  return data.matches;
}

export async function getMe(): Promise<User> {
  const data = (await request.get(`/me`)) as { user: User };
  return data.user;
}

export async function getFeed(): Promise<{ matches: MatchItem[] }> {
  return await request.get(`/feed`);
}

export async function unmatchUser(userId: string): Promise<{ ok: boolean }> {
  return await request.post(`/unmatch`, { userId });
}
