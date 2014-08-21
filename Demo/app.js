
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var image=require("./routes/image");
var pro=require("./routes/Promise");
var http = require('http');
var path = require('path');

var app = express();
var RedisStroe=require('connect-redis')(express.session);


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.bodyParser({ keepExtensions: true, uploadDir: __dirname + '/upload' } ));
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session({
    secret:'password',
    store:new RedisStroe({
        host:'127.0.0.1',
        port:'6379',
        db:'mydb'  //此属性可选。redis可以进行分库操作。若无此参数，则不进行分库
    })
}));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


app.get('/', routes.index);
app.get('/users', user.index);  //用户列表路由
app.get('/edit/:id',user.editUser); //修改用户路由
app.get("/user/create",user.createUser);  //增加用户路由
app.post('/user/create',user.create);  //增加操作路由
app.post("/user/delete/:id",user.delete); //删除操作路由
app.post("/user/update/:id",user.update);  //修改操作路由
app.get("/user/testSync",user.testSync);
app.get('/user/findTest',user.findTest);
app.get("/user/testPo",user.testPo);
app.get("/user/testPo2",user.testPo2);
app.get('/user/updatePo',user.updatePo);
app.post("/index/upload/",routes.upload);//上传图片路由
app.post("/index/upload2/",routes.upload2);//上传图片路由
app.get("/index/backbone1/",routes.backbone1);
app.get("/image/index/",image.index);
app.get("/image/testlib/",image.testlib);//测试远程图片信息
app.get("/image/testlocallib/",image.testlocallib);//测试本地图片信息
app.get("/syncTest",routes.syncTest);
app.get("/user/testim",user.testim);
app.get("/pro/test1",pro.test1);
app.get("/pro/test2",pro.test2);
app.get("/pro/test3",pro.test3);
app.get("/pro/test4",pro.test4);
app.get("/pro/test5",pro.test5);
app.get("/pro/test6",pro.test6);
app.get('/testredis',function(req,res){
    res.send(req.session.id);
});

app.get("/jsonp",function(req,res){
    res.jsonp({"succ":0});
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

