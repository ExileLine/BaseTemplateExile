import { get, post, put, del } from '@/utils/request'

export const downloadSourceZip = data =>
  get('http://0.0.0.0:7766/api/score/download_source_zip', data, {
    responseType: 'blob',
  })
