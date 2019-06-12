import * as types from './../types'
export default {
  state: {
    nickName: '',
    cartCount: 0
  },
  mutations: {
    [types.UPDATE_USER_INFO] (state, nickName) {
      state.nickName = nickName
    },
    [types.UPDATE_CART_COUNT] (state, cartCount) {
      state.cartCount += cartCount
    },
    [types.INIT_CART_COUNT] (state, cartCount) {
      state.cartCount = cartCount
    }
  }
}
