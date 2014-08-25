/**
 * Created by df on 2014/7/18.
 */
var express=require('express');
var ROOT_DIR=__dirname+"/..";

module.exports=function(app){
    app.configure=function(){
        app.set('version',require(ROOT_DIR+"/package.json").version);
        app.set()
    }
};
