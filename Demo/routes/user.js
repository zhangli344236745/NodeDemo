
/*
 * GET users listing.
 */
var mongoose = require('mongoose')

// load your models first
//...

// choose your fav library
mongoose.connect("mongodb://localhost/Demodb");
var models=require("../models/User");
var User=models.User;

var mod2=require("../models/Post");
var Post=mod2.Post;

var im=require("imagemagick");

require('mongoomise').promisifyAll(mongoose, require('bluebird'));

 /*
  *用户列表页面
  */
exports.index = function(req, res){
   var users=User.find(function(err,data){
       res.render("User/index",{title:"index",users:data})
   });
};

/*
* 修改用户页面
* */
exports.editUser=function(req,res){
   var id=req.params.id;
   var user=User.findById(id,function(err,data){
       if(!err){
           res.render("User/edit",{title:"edit",user:data});
       }
   });
};


 /*
 * 增加用户页面
 * */
exports.createUser=function(req,res){
  res.render("User/create");
};

/*
 *增加操作
 * */
exports.create=function(req,res){
    var user;
    user=new User({
        name:req.body.name,
        email:req.body.email
    });
    user.save(function(err){
        if(!err){
            return console.log("create");
        }else{
            return console.log(err);
        }
    });
    return res.send({status:1,user:user});
};

/*
 *删除操作
 * */
exports.delete=function(req,res){
       return User.findById(req.params.id,function(err,user){
           return user.remove(function(err){
               if(!err){
                   return res.send({status:1});
               }else{
                   return res.send({status:0});
               }
           });
       });
};

/*
 *修改操作
 * */
exports.update=function(req,res){
    return User.findById(req.params.id,function(err,user){
        user.name=req.body.name;
        user.email=req.body.email;
        return user.save(function(err){
            if(!err){
                return res.send({status:1});
            }else{
                return res.send({status:0});
            }
        });
    });
};

exports.testSync=function(req,res){
    var name="";
    User.findOneAsync().then(function(user){
       name=user.name;
       console.log(user.name);
       user.name="zhanglif";
       user.saveAsync();
       return User.countAsync();
    }).then(function(u){
        console.log(u);
        res.send(u);
    });
};


exports.findTest=function(req,res){
     var user=User.find({name:'zhanglif'}).limit(1);
     user.execAsync().then(function(re){
         console.log(re);
         res.send(re.name);
     });
};


exports.testPo=function(req,res){
    var post= Post({name:'zhgdfdsaff',email:"23sdfdsfs4@df",website:"2fff34234"});
    post.saveAsync().then(function(p){
        console.log(p.name);
        res.send(p);
    });
};

exports.updatePo=function(req,res){
   var post=Post.find({name:new RegExp('ZH','i')});
    post.execAsync().then(function(p){
       console.log(p[0].name.full);
       res.send(p);
   });
};

exports.testPo2=function(req,res){
    var post= Post({name:'zhgdfdsaff',email:"23sdfdsfs4@df",website:"2fff34234"});
    post.saveAsync().then(function(p){
        return Post.findById(p._id).execAsync();
    }).then(function(err,doc){
       res.send(doc);
    });
};

exports.testim=function(req,res){
    im.identify('./upload/23.jpg',function(err,features){
        if (err) throw err;
        console.log(features);
    });
    im.convert(['./upload/23.jpg', '-resize', '25x120', 'kittens-small.jpg'],
        function(err, stdout){
            if (err) throw err;
            console.log('stdout:', stdout);
        });
    im.readMetadata('./upload/23.jpg',function(err, metadata){
        if (err) throw err;
        console.log('Shot at '+metadata.exif.dateTimeOriginal);
        res.send("sdfsdf");
    })
};

