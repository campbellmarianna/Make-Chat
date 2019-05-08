// chat.js
module.exports = (io, socket, onlineUsers) => {

    // Listen for "new user" socket emits
    socket.on('new user', (username) => {
        // Save the username as key to access the user's socket id
        onlineUsers[username] = socket.id;
        // Save the username to socket as well. This is important for later.
        socket.username = username;
        console.log(`✋ ${username} has joined the chat! ✋`);
        // Send the username to all clients currently connected
        io.emit("new user", username);
    })

    // Listen for new messages
    socket.on('new message', (data) => {
        // Send that data back to ALL clients
        console.log(`🎤  ${data.sender}: ${data.message} 🎤 `)
        io.emit('new message', data);
    })

    socket.on('get online users', () => {
        // Send over the onlineUsers
        socket.emit('get online users', onlineUsers);
    })

    // This fires when a user closes out of the application
    socket.on('disconnect', () => {
        // This deletes the user by using the username we saved to the socket
        console.log("OnlineUser:", onlineUsers)
        console.log("Socket.username:", socket.username)
        console.log("Socket:", socket)
        delete onlineUsers[socket.username];
        console.log("OnlineUser:", onlineUsers)
        console.log('User out of here');
        io.emit('user has left', onlineUsers);
    });
}
