import React, {Component} from "react";
import socketInstance from "../../util/Socket";
import Button from "react-bootstrap/Button";

class Game extends Component {

    constructor(props) {
        super(props);
        this.state = {
            roomData: {}
        };
        this.startGame = this.startGame.bind(this);
    }

    componentDidMount() {
        socketInstance.socket.emit('getRoomData');
        socketInstance.socket.on('roomData', (data) => {
            this.setState({
                roomData: data
            });
            console.log(data);
        });
    }

    startGame() {
        socketInstance.socket.emit('startGame', this.state.roomData.name);
        socketInstance.socket.on('roomData', (data) => {
            this.setState({
                roomData: data
            });
        });
    }

    render() {
        return (
            <div>
                <Button onClick={this.startGame}>Start</Button>
            </div>
        )
    }
}

export default Game;