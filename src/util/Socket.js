import socketIOClient from "socket.io-client";
//ToDo: change variable for different environment
const socket = socketIOClient('http://localhost:8001/');

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

function playCard(card) {
    socket.emit('playCard', card);
}

function getId() {
    return socket.id;
}

export {getData, getRooms, createRoom, joinRoom, clickStart, leaveLobby, redirectStart, playCard, getId};