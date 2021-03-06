// app.js
const express = require('express');
const app = express();
// Socket.io has to use the http server
const server = require('http').Server(app);

// Socket.io
const io = require('socket.io')(server);

// We'll store our online users here
let onlineUsers = {};

// Save the channels in this object.
let channels = {"General" : []}

io.on("connection", (socket) => {
    // Make sure to send the users to our chat file
    require('./sockets/chat.js')(io, socket, onlineUsers, channels);
})

// Express View Engine for Handlebars
const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
//Establish your public folder
app.use('/public', express.static('public'))

app.get('/', (req, res) => {
    res.render('index.handlebars');
})
const port = process.env.PORT || 3000;

app.listen(port);
