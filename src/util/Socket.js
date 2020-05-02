import socketIOClient from "socket.io-client";
//ToDo: change variable for different environment
const socket = socketIOClient(process.env.REACT_APP_SOCKET_IO_URL);

function getData(data) {
    socket.emit('getRoomData');
    socket.on('roomData', roomData => data(null, roomData));
}

function getRooms(data) {
    socket.emit('getAllRooms');
    socket.on('responseAllRooms', rooms => data(null, rooms));
}

function createRoom(roomName, userName) {
    socket.emit('createRoom', roomName, userName);
}

function joinRoom(roomName, userName) {
    console.log('join');
    socket.emit('joinRoom', roomName, userName);
}

function leaveLobby() {
    socket.emit('leaveRoom');
}

function clickStart(name) {
    socket.emit('clickStart', name);
}

function redirectStart(data) {
    socket.on('redirectStart', redirect => data(null, redirect));
}

function playCard(card, color) {
    socket.emit('playCard', card, color);
}

function getCard() {
    socket.emit('getCard');
}

function getId() {
    return socket.id;
}

function clickUno(){
    socket.emit('clickUno');
}

function finishGame(data) {
    socket.on('finishGame', ranking => data(null, ranking));
}

function cancelGame(data){
    socket.on('cancelGame', cancel => data(null, cancel));
}

export {getData, getRooms, createRoom, joinRoom, clickStart, leaveLobby, redirectStart, playCard, getCard, getId, clickUno, finishGame, cancelGame};