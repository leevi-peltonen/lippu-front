import { io, Socket } from 'socket.io-client';
const socket_url: string = import.meta.env.VITE_WS_URL

const socket: Socket = io(socket_url, { 
  transports: ['websocket'],
});

export interface Room {
    code: string
    users: string[]
    difficulty: 'easy' | 'medium' | 'hard'
    length: number
    gamemode: 'Klassikko' | 'Aikapommi'
}

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

interface RoomsReceivedCallback {
    (rooms: Room[]): void;
}

interface ErrorCallback {
  (errorMessage: string): void;
}

export const createRoom = (data: {userId: string, difficulty: 'easy'|'medium'|'hard', length: number, gamemode: 'Klassikko' | 'Aikapommi'}, callback: RoomCreatedCallback): void => {
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

export const onRoomsReceived = (callback: RoomsReceivedCallback): void => {
    socket.on('rooms', (rooms: Room[]) => {
        callback(rooms)
    })
}

export const getAllRooms = (): void => {
    socket.emit('requestRooms')
}

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