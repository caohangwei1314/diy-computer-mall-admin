import request from '@/utils/request'

export function login() {
  return request({
    url: '/users/login',
    method: 'post',
    data: {
      email: '104079381@qq.com',
      password: 'asd123456'
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
