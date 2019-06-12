import request from './request'

// 查询购物车数据
export function getGoodsList (params) {
  return request({
    url: '/goods/list',
    method: 'get',
    params: params
  })
}

// 加入购物车
export function addCart (data) {
  return request({
    url: '/goods/addCart',
    method: 'post',
    data: data
  })
}
