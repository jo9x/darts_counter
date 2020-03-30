var express = require('express');
var app = express();
var http=require('http').Server(app);
var io=require('socket.io')(http);

http.listen(3000,function(){
  console.log('Started: listening');
});

app.use('/assets',express.static('assets'));

app.get('/',function(req,res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection',function(socket, name){
  console.log('Neuer Lörres am start');
  io.emit ('user join', {for:'everyone'});
});

io.emit('some event',{for: 'everyone'});

io.on('connection',function(socket){
  socket.on('score change',function(msg){
    console.log('Score changed');
    io.emit('score change',msg);
  });
});
