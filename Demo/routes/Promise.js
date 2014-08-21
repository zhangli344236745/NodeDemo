/**
 * Created by df on 2014/8/11.
 */
var Promise=require("bluebird");
var fs=Promise.promisifyAll(require("fs"));
var mongoose=require('mongoose');

var Comment=require('../models/Comment').Comment;
require('mongoomise').promisifyAll(mongoose, require('bluebird'));
exports.test1=function(req,res){
    Promise.delay(5000).then(function(){
        console.log("first");
        return "first";
    }).then(function(result){
        res.send(result);
    })
}

exports.test2=function(req,res){
    fs.readFileAsync("./upload/tes.txt").then(function(result){
        console.log(result);
        res.send("ok");
    }).catch(function(e){
        console.log(e.message);
        res.send(e.message);
    }).error(function(){
        res.send("error");
    });
}

exports.test3=function(req,res){
    function at(){
        return 1;
    }
    function bt(){
        return 2;
    }
    function ct(){
        return 3;
    }

    Promise.join(at,bt,ct,function(a,b,c){
        return a+b+c;
    }).then(function(r){
        res.send(r);
    }).finally(function(){
        console.log("finally");
    });
}

exports.test4=function(req,res){
    Promise.delay(50).then(function(){
        return [fs.readFileAsync("./upload/tes.txt"),fs.readFileAsync("./upload/t2.txt")];
    }).spread(function(a,b){
        console.log(a);
        console.log(b);
        res.send("ok");
    });
}

exports.test5=function(req,res){
    var files=[];
    for(var i=0;i<10;i++){
        files.push(fs.writeFileAsync("./upload/file-" + i + ".txt", "f", "utf-8"));
    }
    Promise.all(files).then(function(){
        res.send("create over");
    });
}


exports.test6=function(req,res){
    Comment.createAsync({comment:"dffsfd",len:"324"}).then(function(cm){
       return Comment.countAsync({len:"324"});
    }).then(function(c){
        res.send(c);
    });
}