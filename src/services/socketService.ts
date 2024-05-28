import { io, Socket } from 'socket.io-client';

const socket: Socket = io('http://localhost:3000', {
  transports: ['websocket'],
});

// const socket: Socket = io('https://lippu-back-production.up.railway.app/', {
//   transports: ['websocket'],
// });

interface RoomCreatedCallback {
  (roomCode: string): void;
}

interface UserJoinedCallback {
  (userId: string): void;
}

interface UsersUpdatedCallback {
    (users: string[]): void;
  }

interface MessageReceivedCallback {
  (data: { userId: string, message: string }): void;
}

interface ErrorCallback {
  (errorMessage: string): void;
}

export const createRoom = (data: {userId: string, difficulty: 'easy'|'medium'|'hard', length: number}, callback: RoomCreatedCallback): void => {
  socket.emit('createRoom', data);
  socket.on('roomCreated', (roomCode: string) => {
    callback(roomCode);
  });
};

export const joinRoom = (roomCode: string, userId: string, onUserJoined: UserJoinedCallback): void => {
  socket.emit('joinRoom', { roomCode, userId });
  socket.on('userJoined', (userId: string) => {
    onUserJoined(userId);
  });
};

export const leaveRoom = (roomCode: string, userId: string): void => {
  socket.emit('leaveRoom', { roomCode, userId });
};

export const sendMessage = (roomCode: string, message: string, userId: string): void => {
  socket.emit('sendMessage', { roomCode, message, userId });
};

export const onMessageReceived = (callback: MessageReceivedCallback): void => {
  socket.on('message', (data: { userId: string, message: string }) => {
    callback(data);
  });
};

export const onError = (callback: ErrorCallback): void => {
  socket.on('error', (errorMessage: string) => {
    callback(errorMessage);
  });
};

export const onUsersUpdated = (callback: UsersUpdatedCallback): void => {
    socket.on('updateUsers', (users: string[]) => {
      callback(users);
    });
}

// export const requestCountryCode = (data: {difficulty: 'easy' | 'medium' | 'hard', roomCode: string, userId: string}) => {
//     socket.emit('requestFlags', data)
// }

// export const onCountryCodeReceived = (callback: (data: {countryCode: string, wrongAnswers: string[], userId: string}) => void) => {
//     socket.on('flags', (data: {countryCode: string, wrongAnswers: string[], userId: string}) => {
//         callback(data)
//     })
// }


export { socket }