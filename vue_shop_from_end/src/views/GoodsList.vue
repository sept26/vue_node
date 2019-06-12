<template>
  <main class="good-list-container">
    <nav-header></nav-header>
    <nav-bread class="goods-list">
      <span>商品列表</span>
    </nav-bread>
    <div class="container">
      <div class="filter-nav">
        <span class="sortby">排序:</span>
        <span class="price" @click="sortGoods">价格</span>
      </div>

      <div class="container-main">
        <div class="container-main-left">
          <dl class="filter-price">
            <dt>Price:</dt>
            <dd><span :class="{'cur': priceChecked === 'all'}" @click="selectAll">All</span></dd>
            <dd v-for="(item, index) in priceFilter" :key="index">
              <span @click="setPriceFilter(index)" :class="{'cur':priceChecked === index }">{{item.startPrice}} - {{item.endPrice}}</span>
            </dd>
          </dl>
        </div>
        <div class="container-main-right">
          <div class="container-good-list">
            <ul v-if="goodsList.length === 0? false: true">
              <li v-for="(item, index) in goodsList" :key="index">
                <div class="pic">
                  <a href="#"><img v-lazy="'/static/'+item.productImage" alt=""></a>
                </div>
                <div class="good-detail">
                  <div class="name">{{item.productName}}</div>
                  <div class="price">{{item.salePrice}}</div>
                  <div class="btn-area">
                    <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
                  </div>
                </div>
              </li>
            </ul>
            <div v-show="loading" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10" class="pagination-loading">
              <img src="../../static/loading-svg/loading-spinning-bubbles.svg" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="mdShow">可以显示的</div>
    <popBox v-if="mdShow"  :popVisible="mdShow" :unnoramOperate="true" :width="450" :height="250">
      <div class="login-remind">
        <p>请先登录,否则无法加入到购物车中</p>
        <span  @click="mdShow=false">关闭</span>
      </div>
    </popBox>
    <pop-box v-if="mdShowCart" :popVisible="mdShowCart" :unnoramOperate="true" :width="450" :height="250">
      <div class="add-success-remind">
        <p>加入购物车成功</p>
        <div>
          <span href="javascript:;" class="btn btn-m" @click="mdShowCart=false">继续购物</span>
          <router-link class="btn btn-m" @click="mdShowCart=false" to="/cart">查看购物车</router-link>
        </div>
      </div>
    </pop-box>
  </main>
</template>
<script>
import navHeader from '@/components/navHeader'
import navBread from '@/components/navBread'
import {getGoodsList, addCart} from '@/http/goods'
import popBox from '@/components/popBox'
export default {
  data () {
    return {
      priceFilter: [
        {
          startPrice: '0.00',
          endPrice: '100.00'
        },
        {
          startPrice: '100.00',
          endPrice: '500.00'
        },
        {
          startPrice: '500.00',
          endPrice: '1000.00'
        },
        {
          startPrice: '1000.00',
          endPrice: '5000.00'
        }
      ],
      priceChecked: 'all',
      page: 1,
      pageSize: 8,
      sortFlag: true,
      busy: true,
      goodsList: [],
      mdShowCart: false,
      mdShow: false,
      loading: false
    }
  },
  components: {
    navHeader,
    navBread,
    popBox
  },
  created () {
    this.getGoodsList()
  },
  methods: {
    getGoodsList (flag) {
      let param = {
        page: this.page,
        pageSize: this.pageSize,
        sort: this.sortFlag ? 1 : -1,
        priceLevel: this.priceChecked
      }
      this.loading = true
      getGoodsList(Object.assign({}, param)).then(res => {
        this.loading = false
        if (res.status === '0') {
          if (flag) {
            this.goodsList = this.goodsList.concat(res.result.list)
            if (res.result.count === 0) {
              this.busy = true
            } else {
              this.busy = false
            }
          } else {
            this.goodsList = res.result.list
            if (res.result.count < this.pageSize) {
              this.busy = true
            } else {
              this.busy = false
            }
          }
        } else {
          this.goodsList = []
        }
      })
    },
    selectAll () {
      this.priceChecked = 'all'
      this.page = 1
      this.getGoodsList()
    },
    setPriceFilter (idx) {
      this.priceChecked = idx
      this.page = 1
      this.getGoodsList()
    },
    sortGoods () {
      this.sortFlag = !this.sortFlag
      this.page = 1
      this.getGoodsList()
    },
    addCart (productId) {
      addCart(Object.assign({}, {productId: productId})).then(res => {
        if (res.status === '0') {
          this.mdShowCart = true
          this.$store.commit('UPDATE_CART_COUNT', 1)
        } else {
          this.mdShow = true
        }
      })
    },
    // 滚动加载
    loadMore () {
      this.busy = false
      setTimeout(() => {
        this.page++
        this.getGoodsList(true)
        this.busy = false
      }, 500)
    }
  }
}
</script>
<style lang="less" scoped>
.good-list-container {
  .goods-list {
    padding: 10px 20px;
    background-color: #F0F0F0;
    color: #d1434a;
  }
  .container {
    padding: 20px;
    box-sizing: border-box;
    margin-top: 40px;
    .filter-nav {
      padding: 20px 40px;
      background-color: #fff;
      display: flex;
      justify-content: flex-end;
      .sortby {
        margin-right: 10px;
      }
      .price:hover {
        cursor: pointer;
        color: #ee7a23;
      }
      margin-bottom: 10px;
    }
    .container-main {
      display: flex;
      .container-main-left {
        flex: 1;
        .filter-price {
          cursor: pointer;
          .cur {
            border-left: 2px solid #ee7a23;
            color: #ee7a23;
            padding-left: 15px;
            transition: padding-left .3s
          }
          dd {
            margin: 20px 0;
          }
        }
      }
      .container-main-right {
        flex: 4;
        .container-good-list {
          ul {
            display: flex;
            flex-wrap: wrap;
            li {
              width: 25%;
              padding-right: 10px;
              padding-bottom: 10px;
              box-sizing: border-box;
              background-color: #fff;
              background-clip: content-box;
              &:nth-child(4n) {
                padding-right: 0;
              }
              .pic {
                img {
                  width: 100%;
                  width: 100%;
                }
              }
              .good-detail {
                display: flex;
                flex-direction: column;
                align-items: center;
                div {
                  margin-bottom: 5px;
                  &.price {
                    color:#d1434a;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  .login-remind {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    p {
      margin-bottom: 50px;
    }
    span {
      display: inline-block;
      width: 197px;
      height: 55px;
      border: 1px solid #d1434a;
      color: #d1434a;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      border-radius: 2px;
    }
  }
  .add-success-remind {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    p {
      margin-bottom: 50px;
    }
    div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        margin-right: 10px;
        cursor: pointer;
        border-radius: 2px;
      }
      a {
        cursor: pointer;
        margin-left: 10px;
        border-radius: 2px;
      }
    }
  }
}
</style>
