import React, {Component} from "react";
import socketInstance from "../../util/Socket";
import {Button} from "react-bootstrap";
import {withRouter} from "react-router-dom";

class Lobby extends Component {

    constructor(props) {
        super(props);
        this.state = {
            roomData: {}
        };
        this.startGame = this.startGame.bind(this);
        this.leaveLobby = this.leaveLobby.bind(this);
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
        this.props.history.push('/game');
    }

    leaveLobby() {
        if (socketInstance.socket.emit('leaveRoom')) {
            console.log('client: left game');
            this.props.history.push('/');
        } else {
            console.log('could not leave room');
            return false;
        }
    }

    render() {
        return (
            <div>
                <Button onClick={this.leaveLobby}>Lobby verlassen</Button>
                <Button onClick={this.startGame}>Start</Button>
            </div>
        )
    }
}

export default withRouter(Game);