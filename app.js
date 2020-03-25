var express = require('express');
var app = express();

const io = require('socket.io')();


const port = process.env.PORT || 3030;

const user = {}

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

const server = app.listen(port, () => {
    console.log(`app is running on port ${port}`);
});

io.attach(server);

io.on('connection', function(socket) {
    console.log('user conencted');
    socket.emit('connected', { sID: `${socket.id}`, message: 'new connection'});

    socket.on('new-user', name => {
        user[socket.id] = name
        socket.emit('user connected', name)
    })

    socket.on('chat_message', function(msg) {
        console.log(msg);

        io.emit('new_message', { id: socket.id, name: user[socket.id], message: msg })
    }) 

    
    socket.on('disconnect', function() {
        console.log('a user disconnected');

        message = `${socket.id} has left the chat!`;
        io.emit('user_disconeect', message);
    })
})

