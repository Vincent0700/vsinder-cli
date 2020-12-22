import request from './request';
import { MatchItem } from './entities';

export async function getMatchUsers(): Promise<{ matches: MatchItem[] }> {
  return await request.get('/matches/0');
}
