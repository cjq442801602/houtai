const express = require('express');
const bodyParser = require('body-parser');
const objectId = require('mongodb').ObjectId;
//获取时间模块
const newTime = require('./modules/newTime');
//连接数据库操作模块
const db = require('./modules/db');


let Router = express.Router();

let urlencodedParser = bodyParser.urlencoded({extended:false});

//查询用户列表信息    ok
Router.route('/')
    .get(async (req,res)=>{
        let data;
        let gid = req.query._id ? {'_id':objectId(req.query._id)} : {};
        try{
            data = await db.find('user_inf',req.query,gid);
        }catch(err){
            data = err;
        }
        res.send(data);
    })


    //修改一条数据      ok 
    .post(urlencodedParser,async (req,res)=>{
        let reqBody = req.body;
        let obj = {};
        //把数字类型数据转成Number
        for(let key in reqBody){
            obj[key] = isNaN(reqBody[key]) ? reqBody[key] : reqBody[key]*1;
        }
        let gid = {_id:objectId(obj._id)};
        let data;
        try{
            data = await db.update('user_inf',gid,obj);
        }catch(err){
            data = err;
        }
        res.send(data);
    })

    //插入一条数据          ok
    .put(urlencodedParser,async (req,res)=>{
        let reqBody = req.body;
        let obj = {};
        for(let key in reqBody){
            obj[key] = isNaN(reqBody[key]) ? reqBody[key] : reqBody[key]*1;
        }
        let data;
        try{
            data = await db.insert('user_inf',{...obj,time:newTime()});
        }catch(err){
            data = err;
        }
        res.send(data);
    })

    //删除数据               ok  
    .delete(urlencodedParser,async (req,res)=>{
        let arr = JSON.parse(req.body._id);
        arr = arr.map(item => objectId(item));
        console.log(arr);
        let data;
        try{
            data = await db.delete('user_inf',arr);
        }catch(err){
            data = err;
        }
        res.send(data);
    })


     

module.exports = Router;