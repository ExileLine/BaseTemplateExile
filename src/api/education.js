import { get, post, put, del } from '@/utils/request'

export const downloadSourceZip = data =>
  get('/api/score/download_source_zip', data, {
    responseType: 'blob',
  })
