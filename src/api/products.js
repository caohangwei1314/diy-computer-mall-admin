import request from '@/utils/request'

export function query(listQuery) {
  return request({
    url: '/products',
    method: 'post',
    data: {
      classId: listQuery.classId,
      name: listQuery.name,
      limit: listQuery.limit,
      page: listQuery.page,
      orderBy: listQuery.orderBy,
      desc: listQuery.desc
    }
  })
}
