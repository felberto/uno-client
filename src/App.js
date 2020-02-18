import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import socketIOClient from "socket.io-client";

class App extends Component {

    constructor() {
        super();
        this.state = {
            endpoint: 'http://localhost:8001/'
        };
        let socket = socketIOClient(this.state.endpoint);
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <p>
                        Hello world!
                    </p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                </header>
            </div>
        );
    }
}

export default App;