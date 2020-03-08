import socketIOClient from "socket.io-client";

/**
 * Singleton class for socket io client.
 *
 * @author felberto
 */
class Socket {

    //ToDo: change variable for different environment
    socket = socketIOClient('http://localhost:8001/');
}

const socketInstance = new Socket();
Object.freeze(socketInstance);

export default socketInstance;