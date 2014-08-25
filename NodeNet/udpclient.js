var dgram = require('dgram');
  
var client = dgram.createSocket('udp4');
  
var message = new Buffer('我是客户端的消息');
client.send(message, 0, message.length, 41234, '0.0.0.0', function(err, bytes) {
    console.log('客户端发送完成，关闭客户端');
    client.close();
});