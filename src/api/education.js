import { get, post, put, del } from '@/utils/request'

export const downloadSourceZip = data =>
  get('/api/score/download_source_zip', data, {
    responseType: 'blob',
  })

export const fetchScoreGenQa = data => post('/api/score/gen_qa', data)
export const fetchScoreDelete = data => del('/api/score/delete', data)

export const fetchScoreGenStudentQa = data => post('/api/score/gen_student_exam', data)
