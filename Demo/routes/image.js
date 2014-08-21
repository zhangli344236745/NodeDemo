/**
 * Created by df on 2014/7/4.
 */

var fs= require('fs'),
    imageinfo=require('imageinfo'),
    readOF=require("readof");

var images=require("../lib/imagelib.js");//引入图片处理模板

exports.index=function(req,res){
    var tmpDir="./upload/";
    var date=new Date();
    var dateStr=dateFormat(date);
    var paramurls="http://my.wt.com/images/activity/20140618/logo/fang/06.png";
    var arr=paramurls.split("/"),lastarr=arr[arr.length-1];
    var absulteDir=tmpDir+dateStr+lastarr;
    var width=0;
    readOF.read("http://my.wt.com/images/activity/20140618/logo/fang/06.png",absulteDir,function(err,para){
        if(err){
            console.log(err);
        }
        fs.readFile(absulteDir,function(err,data){
            var info=imageinfo(data);
            console.log(info.format);
            console.log(data.length/1024);
            console.log(info.width + " "+info.height);
            fs.unlink(absulteDir);
            width=info.width;
        });
    });
    res.send("hello,world"+width);
}

function dateFormat(date){
    var rdm=Math.random()*10000;
    return date.getFullYear() + '' + date.getMonth() + '' + date.getDate() + '' + date.getHours() + '' + date.getMinutes() +Math.floor(rdm);
}
//测试远程图片信息
exports.testlib=function(req,res){
    var dat;
    images.imageHandler("http://my.wt.com/images/activity/20140618/logo/fang/06.png",function(data){
        console.log(data);
        dat=data;
        res.send("testlib" +dat);
    });
}

//测试本地图片信息
exports.testlocallib=function(req,res){
    var dat;
    images.imageLocalHandler("./upload/23.jpg",function(data){
        console.log(data);
        dat=data;
        res.send("testlib2" +dat);
    });
}