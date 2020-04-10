import React, {Component} from "react";
import {Button} from "react-bootstrap";
import {withRouter} from "react-router-dom";
import {clickStart, getData, leaveLobby, redirectStart} from "../../util/Socket";

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

        getData((err, data) => this.setState({
            name: data.name,
            playing: data.playing,
            users: data.users,
            deck: data.deck
        }));

        redirectStart((err, data) => this.startGame());
    }

    clickStart() {
        clickStart(this.state.name);
        this.props.history.push('/game');
    }

    startGame() {
        this.props.history.push('/game');
    }

    leaveLobby() {
        leaveLobby();
        console.log('client: left game');
        this.props.history.push('/');
    }

    render() {
        let startGameButton;
        if (this.state.users.length >= 2 && this.state.users.length <= 4) {
            startGameButton = <Button onClick={this.clickStart}>Start</Button>
        } else {
            startGameButton = <Button disabled={true} onClick={this.clickStart}>Start</Button>
        }

        return (
            <div>
                <div style={{width: '100vh', height: '80vh', margin: '0 auto', padding: '10%'}}>
                    <p>{this.state.users.length}/4 Players in Lobby</p>
                    <ul>{
                        this.state.users.map((user) => {
                            return (
                                <ol key={user.user}>
                                    {user.username}
                                </ol>
                            );
                        })
                    }</ul>

                    <br/>
                    <Button onClick={this.leaveLobby}>Lobby verlassen</Button>
                    {startGameButton}

                </div>
            </div>
        )
    }
}

export default withRouter(Lobby);