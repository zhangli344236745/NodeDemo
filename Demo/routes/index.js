
/*
 * GET home page.
 */

var fs=require("fs");
var Promise=require('bluebird');

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};


exports.backbone1=function(req,res){
    res.render("backbone1",{});
};

exports.upload=function(req,res){
  /*  fs.readFile(req.files.test.path,function(err,data){
        if(err){
            return res.send({"success":"false"});
        }
        fs.writeFile("./upload/"+req.files.test.name,data,function(err){
             if(err){
                 return res.send({"success":"false"});
             }
            return res.send({"success":"true"});
        })
    });*/
    var target_path="./upload/"+req.files.test.name;
    var tmp_path=req.files.test.path;
    fs.rename(tmp_path,target_path,function(err){
        if(err){
            return res.send({"success":"false"});
        }
        fs.unlink(tmp_path, function(err) {
            if (err){
                return res.send({"success":"false"});
            }
            return res.send({"success":"true","url":target_path});
        });
    })
    return res.send({"success":"true","url":target_path});
};

exports.upload2=function(req,res){
    var target_path="./upload/"+req.files.codecsv.name;
    var tmp_path=req.files.codecsv.path;
    fs.rename(tmp_path,target_path,function(err){
        if(err){
            return res.send({"success":"false"});
        }
        fs.unlink(tmp_path, function(err) {
            if (err){
                return res.send({"success":"false"});
            }
            return res.send({"success":"true","url":target_path});
        });
    })
    return res.send({"success":"true","url":target_path});
};

exports.syncTest=function(req,res){
    var readFileAsync=function(path){
        return new Promise(function(fulfill,reject){
            fs.readFile(path,'utf-8',function(err,content){
                 if(err) reject(err);
                 return new fulfill(content);
            });
        });
    }
    readFileAsync('./upload/tes.txt').then(function(content){
        console.log(content);
    });
    res.send("fsdf");
};