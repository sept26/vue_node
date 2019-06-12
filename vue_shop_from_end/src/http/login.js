import request from './request'

// 校验登录接口
export function checkLogin () {
  return request({
    url: '/users/checkLogin',
    method: 'get'
  })
}

// 登录接口
export function login (data) {
  return request({
    url: '/users/login',
    method: 'post',
    data: data
  })
}

// 退出接口
export function logout () {
  return request({
    url: '/users/logout',
    method: 'post'
  })
}

// 查看购物车数量
export function getCartCount () {
  return request({
    url: '/users/getCartCount',
    method: 'get'
  })
}
