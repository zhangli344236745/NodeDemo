var net =require("net");
var server=net.createServer(function(socket){
	socket.on("data",function(data){
		console.log('服务端接收到客户端的消息：' + data.toString());
        socket.write('服务端回应：你好');
	});
	socket.on("end",function(){
		 console.log('服务端断开连接');
	});
});

server.listen(8124,function(){
	 console.log('TCP服务创建');
});