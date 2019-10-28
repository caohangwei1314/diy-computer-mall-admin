import request from '@/utils/request'

export function login() {
  return request({
    url: '/admin/login',
    method: 'post',
    data: {
      username: 'admin',
      password: 'admin'
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
