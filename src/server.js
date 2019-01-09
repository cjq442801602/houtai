const express = require('express');
const Router = require('./router');
//引入配置文件
const {port,host,rootDir} = require('./config');

let app = express();

//开启静态资源服务器
app.use(express.static(rootDir));

//连接路由
app.use(Router);

//监听接口
app.listen(port,()=>{
    console.log(`The server is swimming on http://${host}:${port}`);
});