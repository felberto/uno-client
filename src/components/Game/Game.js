import React, {Component} from "react";
import socketInstance from "../../util/Socket";
import {Button} from "react-bootstrap";
import {withRouter} from "react-router-dom";

class Game extends Component {

    constructor(props) {
        super(props);
        this.leaveLobby = this.leaveLobby.bind(this);
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
            </div>
        )
    }
}

export default withRouter(Game);