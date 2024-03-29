import { io } from "..";

let numUsers = 0;

io.on('connection', (socket: any) => {
  let addedUser = false;
  socket.on('new message', (data: any) => {
    socket.broadcast.emit('new message', {
      username: socket.username,
      message: data,
    });
  });

  socket.on('adder username', (username: any) => {
    if (addedUser) return;
    socket.username = username;
    ++numUsers
    addedUser = true;
    socket.emit('login', {
      numUsers: numUsers
    });
    socket.broadcast.emit('user joined', {
      username: socket.username,
      numUsers: numUsers
    });
  });

  socket.on('typing', () => {
    socket.on('typing', () => {
      socket.broadcast.emit('typing', {
        username: socket.username
      });
    });

    socket.on('stop typing', () => {
      socket.broadcast.emit('stop typing', {
        username: socket.username,
      });
    });

    socket.on('disconnect', () => {
      if (addedUser) {
        --numUsers;
        socket.broadcast.emit('user left', {
          username: socket.username,
          numUsers: numUsers,
        });
      }
    });
  });
})
