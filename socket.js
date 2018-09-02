var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/socket.html');
});

io.on('connection', function(socket){
    console.log('a user connected');

    socket.on('chat message', function(msg){
        console.log('message: ' + msg.message + " username" + msg.name);
        io.emit('chat message', msg.message);
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});