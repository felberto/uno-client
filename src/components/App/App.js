import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Game from "../Game/Game";
import Home from "../Home/Home";
import Lobby from "../Lobby/Lobby";

class App extends Component {

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route path="/game">
                            <Game/>
                        </Route>
                        <Route path="/lobby">
                            <Lobby/>
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