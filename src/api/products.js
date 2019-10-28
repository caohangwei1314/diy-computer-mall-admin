import request from '@/utils/request'

export function query(listQuery) {
  return request({
    url: '/goods/admin/list',
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

export function deleteByPkId(productId) {
  return request({
    url: '/products/remove',
    method: 'delete',
    params: {
      id: productId
    }
  })
}

export function queryDetail(productId) {
  return request({
    url: '/goods/detail/' + productId,
    method: 'get'
  })
}

export function upload(className, data) {
  return request({
    url: '/products/' + className,
    method: 'post',
    data
  })
}

export function update(className, data) {
  return request({
    url: '/products/' + className,
    method: 'put',
    data
  })
}
