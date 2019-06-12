var express = require('express')
var router = express.Router()
let User = require('../models/user')
var mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/vueshop')
mongoose.connection.on('connected', () => {
  console.log('MongoDB connected success')
})

mongoose.connection.on('error', () => {
  console.log('MongoDB connected fail')
})

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB connected disconnected')
})

router.get('/', (req, res, next) => {
  res.send('response with a resource')
})

// 登录接口
router.post('/login', (req, res, next) => {
  let param = {
    userName: req.body.userName,
    userPwd: req.body.userPwd
  }
  User.findOne(param, (err, doc) => {
    if (err) {
      res.json({
        status: '1', 
        msg: err.message
      })
    } else {
      if (doc) {
        res.cookie('userId',doc.userId, {
          path: '/',
          maxAge: 1000*60*60
        })
        res.cookie('userName', doc.userName, {
          path: '/',
          maxAge: 1000*60*60
        })

        res.json({
          status: '0',
          msg: '',
          result: {
            userName: doc.userName
          }
        })
      } else {
        res.json({
          status: '2'
        })
      }
    }
  })
})

// 校验登录
router.get('/checkLogin', (req, res, next) => {
  console.log('校验接口')
  if (req.cookies.userId) {
    res.json({
      status: '0',
      msg: '',
      result: req.cookies.userName || ''
    })
  } else {
    res.json({
      status: '1',
      msg: '未登录',
      result: ''
    })
  }
})

// 退出接口
router.post('/logout',(req, res, next) => {
  res.cookie('userId', '', {
    path: '/',
    maxAge: -1
  })
  res.json({
    status: '0',
    msg: '',
    result: ''
  })
})

// 查询购物车数量
router.get('/getCartCount', (req, res, next) => {
  if (req.cookies && req.cookies.userId) {
    let userId = req.cookies.userId
    User.findOne({
      userId: userId
    }, (err, doc) => {
      if (err) {
        res.json({
          status: '1',
          msg: err.message,
          result: ''
        })
      } else {
        let cartList = doc.cartList
        let cartCount = 0
        cartList.map(item => {
          cartCount += parseInt(item.productNum)
        })
        res.json({
          status: '0',
          msg: '',
          result: cartCount
        })
      }
    })
  }
})

module.exports = router
