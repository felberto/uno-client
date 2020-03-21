import React, {Component} from "react";
import socketInstance from "../../util/Socket";
import {Button} from "react-bootstrap";
import {withRouter} from "react-router-dom";

class Lobby extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: {},
            playing: {},
            users: [],
            deck: []
        };
        this.startGame = this.startGame.bind(this);
        this.leaveLobby = this.leaveLobby.bind(this);
        this.clickStart = this.clickStart.bind(this);
    }

    componentDidMount() {
        socketInstance.socket.emit('getRoomData');
        socketInstance.socket.on('roomData', (data) => {
            this.setState({
                name: data.name,
                playing: data.playing,
                users: data.users,
                deck: data.deck
            });
            console.log(data);
        });
    }

    clickStart() {
        console.log(this.state.name);
        socketInstance.socket.emit('clickStart', this.state.name);
        this.props.history.push('/game');
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
        socketInstance.socket.on('redirectStart', () => {
            console.log('redirect');
            this.startGame();
        });

        socketInstance.socket.on('roomData', (data) => {
            this.setState({
                name: data.name,
                playing: data.playing,
                users: data.users,
                deck: data.deck
            });
            console.log(data);
        });

        return (
            <div>
                <Button onClick={this.leaveLobby}>Lobby verlassen</Button>
                <Button onClick={this.clickStart}>Start</Button>

                <ul>{
                    this.state.users.map((user) => {
                        return (
                            <li key={user.user}>
                                {user.username}
                            </li>
                        );
                    })
                }</ul>
            </div>
        )
    }
}

export default withRouter(Lobby);