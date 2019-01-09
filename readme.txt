家有汇项目Nodejs版
============================================
技术栈：Nodejs+MongoDB+layui

\根目录
├── src				后台管理系统
│    ├── assets/				资源
│    │    └── img/				图片
│    │    └── layui/				layui
│    ├── css/				样式
│    │    └── *.css				样式文件
│    ├── html/				页面
│    │    ├── login.html			登录页
│    │    ├── center.html			首页
│    │    ├── goodslist.html			商品列表页
│    │    ├── goods_add.html			商品添加页
│    │    ├── goods_edit.html			商品编辑页
│    │    ├── category.html			商品分类页
│    │    ├── category_add.html		商品分类添加页
│    │    ├── category_edit.html		商品分类编辑页
│    │    ├── user.html			用户列表页
│    │    ├── user_add.html			用户添加页
│    │    ├── user_edit.html			用户编辑页
│    │    ├── orders.html			订单页
│    │    └── *.html				页面文件
│    ├── js/				行为
│    │    └── *.js				行为文件
│    ├── router/				路由
│    │    ├── modules/			路由相关模块文件
│    │    │    ├── db/			数据库操作模块
│    │    │    └── newTime.js			获取日期模块
│    │    └── *.js				路由js文件
│    ├── sass/				sass
│    ├── config.json				配置文件
│    └── server.js				服务器
├── doc				文档资料
│    └── database				数据库
│          ├── admin_inf.csv			管理员信息
│          ├── category.csv			商品分类
│          ├── goodslist.csv			商品列表
│          ├── orders.csv			订单表
│          └── user_inf.csv			用户信息
├── package-lock.json		模块版本锁定文件
└── package.json			Nodejs模块描述文件