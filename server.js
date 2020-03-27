var express = require('express');
var app = express();
var http = require('http').createServer(app);
var path = require('path');
var io = require('socket.io')(http);
var url = require('url');
let next_room_id = 0;

app.use(express.static(path.join(__dirname, '/src')));

io.on('connection', function (socket) {
 
  
  socket.on('disconnect', function (room) {
    io.emit('disconnected',socket.id);
    console.log(socket.id + ' disconnected');
  });

  socket.on('new_game', function(room){
    socket.join(room);
    console.log('new game on: '+room);
  });

  socket.on('register', function(room){
      console.log(socket.id + ' registered');
      io.to(room).emit('register',socket.id);
  });

  socket.on('shoot', function (room) {
    io.volatile.to(room).emit('shoot', socket.id);
  });

  socket.on('reset', function (room) {
    io.to(room).emit('reset');
  });

  socket.on('pause', function (room) {
    io.to(room).emit('pause');
  });

  socket.on('move', function (room,controls) {
    let  ship_direction = {
      going_down : (controls.direction === 'down' && controls.state === 1),
      going_up : (controls.direction === 'up' && controls.state === 1),
      going_left : (controls.direction === 'left' && controls.state === 1),
      going_right : (controls.direction === 'right' && controls.state === 1)
    }; 
    io.to(room).emit('move',socket.id, ship_direction);
  });

});

app.get('/room', function (req, res) {
  next_room_id++;
  res.send(''+next_room_id);
})

http.listen(3000, function () {
  console.log('listening on *:3000');
});