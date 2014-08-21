/**
 * Created by df on 2014/7/4.
 */
var fs= require('fs'),
    imageinfo=require('imageinfo'),
    readOF=require("readof");

//获取图片的尺寸，占存储空间大小
function imageHandler(url,callback){
    var tmpDir="./upload/";
    var date=new Date();
    var dateStr=dateFormat(date);
    var paramurls=url;
    var arr=paramurls.split("/"),lastarr=arr[arr.length-1];
    var absulteDir=tmpDir+dateStr+lastarr;
    //下载远程图片到本地
    readOF.read(paramurls,absulteDir,function(err,para){
        if(err){
            console.log(err);
            return {};
        }
        var obj={};
        //读取图片信息
        fs.readFile(absulteDir,function(err,data){
            var info=imageinfo(data);
            obj={height:info.height,width:info.height,size:data.length/1024};
            fs.unlink(absulteDir);//删除临时文件
            callback(obj);
        });
    });
}

//获取本地图片的尺寸，占存储空间大小
function imageLocalHandler(url,callback){
    //读取本地文件
    fs.readFile(url,function(err,data){
        var info=imageinfo(data);//获取图片信息
        obj={height:info.height,width:info.height,size:data.length/1024};
        callback(obj);
    });

}

//时间格式化处理
function dateFormat(date){
    var rdm=Math.random()*10000;
    return date.getFullYear() + '' + date.getMonth() + '' + date.getDate() + '' + date.getHours() + '' + date.getMinutes() +Math.floor(rdm);
}

exports.imageHandler=imageHandler; //导出远程获取图片信息模板
exports.imageLocalHandler=imageLocalHandler; //导出本地获取图片信息模板
