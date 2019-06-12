let express = require('express')
let router = express.Router()
let Goods = require('../models/goods')
// 查询商品数据
router.get('/list', (req, res, next) => {
  let page = parseInt(req.param('page'))
  let pageSize = parseInt(req.param('pageSize'))
  let sort = req.param('sort')
  // skip 和 limit 作分页使用 // limit 限制条数
  let skip = (page - 1) * pageSize // 跳过的条数
  // 筛选价格区间
  let priceLevel = req.param('priceLevel')
  let priceGt = ''
  let priceLte = ''
  let params = ''
  if (priceLevel !== 'all') {
    switch(priceLevel) {
      case '0':
        priceGt = 0;priceLte = 100;
        break;
      case '1':
        priceGt = 100; priceLte = 500;
        break;
      case '2':
        priceGt = 500; priceLte = 1000;
        break;
      case '3':
        priceGt = 1000; priceLte = 5000;
        break;
    }
    params = {
      salePrice: {
        $gt: priceGt,
        $lte: priceLte
      }
    }
    let goodsModal = Goods.find(params).skip(skip).limit(pageSize)
    goodsModal.sort({'salePrice': sort})
    googdModal.exec((err, doc) => {
      if (err) {
        res.json({
          status: '1',
          msg: err.message
        })
      } else {
        res.json({
          status: '0',
          msg: '',
          result: {
            count: doc.length,
            list: doc
          }
        })
      }
    })
  }
})

// 加入购物车
router.post('/addCart', (req, res, next) => {
  let userId = '100000077'
  let productId = req.body.productId
  let User = require('../models/user')
  // 从用户集合中找到这个用户
  User.findOne({
    userId
  }, (err, userDoc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else {
      // 如果购物车中有这个商品,那么添加数量
      let goodsItem = ''
      if (userDoc) {
        userDoc.cartList.forEach(item => {
          if (item.productId === productId) {
            item.productNum++
            goodsItem = item
          }
        })
        
        if (goodsItem) {
          userDoc.save((err3, doc3) => {
            if (err3) {
              res.json({
                status: '1',
                msg: err3.message
              })
            } else {
              res.json({
                status: '0',
                msg: '',
                result: 'success'
              })
            }
          })
        } else {
          // 再从商品集合中找出商品
          Goods.findOne({productId}, (err4, doc4) => {
            if (err4) {
              res.json({
                status: '1',
                msg: err4.message
              })
            } else {
              if (doc4) {
                doc4.productNum = 1
                doc4.checked = 1
                userDoc.cartList.push(doc4)
                userDoc.save((err, doc) => {
                  if (err) {
                    res.json({
                      status: '1',
                      msg: err.message
                    })
                  } else {
                    res.json({
                      status: '0',
                      msg: '',
                      result: 'success'
                    })
                  }
                })
              }
            }
          })
        }

        
      }
    }
  })
})

module.exports = router
