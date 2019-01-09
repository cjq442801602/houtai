const express = require('express');
const bodyParser = require('body-parser');
const objectId = require('mongodb').ObjectId;
const mongodb = require('mongodb');
const multer = require('multer');
const path = require('path');
//获取Mongo客户端
const MongoClient = mongodb.MongoClient;
//获取时间模块
const newTime = require('./modules/newTime');
//连接数据库操作模块
const db = require('./modules/db');

let Router = express.Router();

let urlencodedParser = bodyParser.urlencoded({extended:false});

//查询商品列表信息    ok
Router.route('/')
    .get(async (req,res)=>{
        let data;
        let gid = req.query._id ? {'_id':objectId(req.query._id)} : {};
        try{
            data = await db.find('goodslist',req.query,gid);
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
            data = await db.update('goodslist',gid,obj);
        }catch(err){
            data = err;
        }
        res.send(data);
    })

    //插入一条数据      ok
    .put(urlencodedParser,async (req,res)=>{
        let reqBody = req.body;
        let obj = {};
        for(let key in reqBody){
            obj[key] = isNaN(reqBody[key]) ? reqBody[key] : reqBody[key]*1;
        }
        let data;
        try{
            data = await db.insert('goodslist',{...obj,time:newTime()});
        }catch(err){
            data = err;
        }
        res.send(data);
    })

    //删除数据
    .delete(urlencodedParser,async (req,res)=>{
        let arr = JSON.parse(req.body._id);
        arr = arr.map(item => objectId(item));
        let data;
        try{
            data = await db.delete('goodslist',arr);
        }catch(err){
            data = err;
        }
        res.send(data);
    })

//图片上传
let storage = multer.diskStorage({
    destination: 'assets/img/',
    filename: function (req, file, cb) {
        console.log('file:',file)
        let ext = path.extname(file.originalname);//.jpg,.png,.xx
      cb(null, file.fieldname + '-' + Date.now()+ext);
    }
})
let upload = multer({storage});

//
Router.post('/upload',upload.array('file',3),(req,res)=>{
    console.log('files:',req.files);

    //写入数据库


    //相应给前端的信息
    res.send({
        code:0,
        msg:'文件上传成功',
        data:req.files
    })
})

//搜索功能及删除单条数据
Router.route('/:msg').get((req,res)=>{
    //商品列表搜索功能
    let {msg} = req.params;
    //创建模糊查询正则
    let reg = new RegExp(msg,'i');
    MongoClient.connect('mongodb://localhost:27017',{useNewUrlParser: true},(err, database)=>{
        if(err) throw err;
        let db = database.db('jiayouhui');
        let goodslist = db.collection('goodslist');
        goodslist.find({$or:[
            {name:{$regex:reg}},
            {description:{$regex:reg}},
            {category:{$regex:reg}}
        ]}).toArray((err,result)=>{
            if(err) throw err;
            let data;
            if(result){
                data = {
                    code:0,
                    count:result.length,
                    data:result,
                    msg:'ok'
                }
            }else{
                data = {
                    code:1,
                    count:0,
                    data:[],
                    msg:'fail'
                }
            }
            res.send(data);
        })
    })
})
    


     

module.exports = Router;