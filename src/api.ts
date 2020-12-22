import request from './request';

export async function getMatchUsers(): Promise<[]> {
  return await request.get('/matches/0');
}
