var express = require('express');
var router = express.Router();
var fs=require("fs");
var uglify = require("uglify-js"),
    jsp=uglify.parser,
    par=uglify.uglify;

var nodeExcel=require("excel-export");

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get("/jsonp",function(req,res){
    res.jsonp({"succ":0});
});

router.get("/app",function(req,res){
   return res.send({"name":"google","age":24});
});

//测试压缩代码
router.get("/testjs",function(req,res){
    var code=fs.readFileSync("Temp/hostid.js","utf-8");
    var ast=jsp.parse(code);//解析代码
   // ast=par.ast_mangle(ast);//得到一个新名称
  //  ast=par.ast_squeeze(ast);//AST得到压缩优化
    var final_code=par.gen_code(ast);//得到最终代码
    console.log(code);
    console.log("__________");
    console.log(final_code);
    fs.writeFile("Temp/out.min.js",final_code,function(){});
    res.send(final_code);

});

//导出Excel
router.get("/testexcel",function(req,res){
   var conf={};//要显示的数据
    //conf.cols:表示要显示的列 caption:一列的标题，type:一列的类型，width:一列的宽度
    conf.cols=[
        {caption:"string",type:"string",captionStyleIndex:1,width:30},
        {caption:"date",type:"date",width:50},
        {caption:'bool', type:'bool'},
        {caption:'number', type:'number'}
    ];
    conf.rows=[
        ['pi', (new Date(2013, 4, 1)).getJulian(), true, 3.14],
        ["e", (new Date(2012, 4, 1)).getJulian(), false, 2.7182]
    ];
    var result=nodeExcel.execute(conf);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats');
    res.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");
    res.end(result, 'binary');
});

module.exports = router;
