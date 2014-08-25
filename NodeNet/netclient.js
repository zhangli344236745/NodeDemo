var net =require("net");

var client=net.connect({port:8124},function(){
	console.log('客户端连接成功');
    client.write('客户端发起问候：你好');
});

client.on('data', function(data) {
    console.log('客户端接收服务端消息：' + data.toString());
    client.end();
});
  
client.on('end', function() {
    console.log('客户端断开连接');
});