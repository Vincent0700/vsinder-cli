import request from './request';
import { MatchItem, FeedItem, UserItem } from './entities';

export async function getMatches(): Promise<MatchItem[]> {
  const data = (await request.get('/matches/0')) as { matches: MatchItem[] };
  return data.matches;
}

export async function getMe(): Promise<UserItem> {
  const data = (await request.get(`/me`)) as { user: UserItem };
  return data.user;
}

export async function getFeed(): Promise<FeedItem[]> {
  const data = (await request.get(`/feed`)) as { profiles: FeedItem[] };
  return data.profiles;
}

export async function match(
  userId: string,
  liked: boolean
): Promise<{ ok: boolean; match: boolean }> {
  return await request.post(`/view`, { userId, liked });
}

export async function unmatch(userId: string): Promise<{ ok: boolean }> {
  return await request.post(`/unmatch`, { userId });
}
