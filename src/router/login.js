const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
//获取Mongo客户端
const MongoClient = mongodb.MongoClient;

let Router = express.Router();

let urlencodedParser = bodyParser.urlencoded({extended:false});

Router.post('/',urlencodedParser,(req,res)=>{
    //获取前端数据
    let {username,password} = req.body; 
    MongoClient.connect('mongodb://localhost:27017',{useNewUrlParser: true},(err, database)=>{
        if(err) throw err;
        let db = database.db('jiayouhui');
        let admin_inf = db.collection('admin_inf');
        admin_inf.findOne({username,password},(err,result)=>{
            let data;
            if(result){
                data = {
                    code:0,
                    msg:'ok'
                }
            }else{
                data = {
                    code:1,
                    msg:'fail'
                }
            }
            res.send(data);
        });
    });
});

module.exports = Router;