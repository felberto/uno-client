import React, {Component} from "react";
import socketInstance from "../../util/Socket";
import {withRouter} from "react-router-dom";

class Game extends Component {

    constructor(props) {
        super(props);
        this.state = {
            roomData: {}
        };
    }

    componentDidMount() {
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
            </div>
        )
    }
}

export default withRouter(Game);