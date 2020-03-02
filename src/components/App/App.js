import React, {Component} from 'react';
import socketIOClient from "socket.io-client";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Game from "../Game/Game";
import Home from "../Home/Home";

window.$socket = socketIOClient('http://localhost:8001/');

class App extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route path="/game">
                            <Game/>
                        </Route>
                        <Route path="/">
                            <Home/>
                        </Route>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;