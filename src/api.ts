import request from './request';
import { MatchItem } from './entities';

export async function getMatchUsers(): Promise<{ matches: MatchItem[] }> {
  return await request.get('/matches/0');
}

export async function getMe(): Promise<{ matches: MatchItem[] }> {
  return await request.get(`/me`);
}

export async function unmatchUser(userId: string): Promise<{ matches: MatchItem[] }> {
  return await request.post(`/unmatch`, { userId });
}
