import request from '@/utils/request';
import { getQueryPath } from '@/utils/utils';
import { parseSearchResult } from '@/utils/search';

export async function searchSample(params = {}) {
  return request(getQueryPath('/api/sample', params)).then(res => parseSearchResult(res));
}

export async function getSample(id) {
  return request(`/api/sample/${id}`);
}

export async function saveSample(sample) {
  if (sample.id) {
    return request(`/api/sample/${sample.id}`, {
      method: 'PUT',
      body: sample,
    });
  }
  return request(`/api/sample`, {
    method: 'POST',
    body: sample,
  });
}
