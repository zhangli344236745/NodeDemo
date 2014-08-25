var dgram=require("dgram");

var server=dgram.createSocket("udp4");

server.on("message",function(msg,info){
	console.log("server recive" +msg +"from "+info.address);
});

server.on("listening",function(){
	var address=server.address();
	console.log('服务端正在监听：'+address.address+':'+address.port);
});

server.bind(41234);