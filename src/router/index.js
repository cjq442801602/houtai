//把路由封装成模块
const express = require('express');

//引入单独路由模块
const loginRouter = require('./login');
const goodslistRouter = require('./goods_list');
const categoryRouter = require('./category');
const userRouter = require('./user');
const ordersRouter = require('./orders');

let Router = express.Router();

//登录相关路由
Router.use('/login',loginRouter);
//商品列表相关路由
Router.use('/goodslist',goodslistRouter);
//商品分类相关路由
Router.use('/category',categoryRouter);
//用户列表相关路由
Router.use('/user',userRouter);
//订单表相关路由
Router.use('/orders',ordersRouter);
//根目录登录页跳转设置
Router.get('/',(req,res)=>{
    res.redirect('/html/login.html');
})


//暴露路由接口
module.exports = Router;