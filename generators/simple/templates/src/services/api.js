import request from '@/utils/request';

export function query() {}

export async function queryNotices() {
  return request('/api/notices');
}
