import * as React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {withRouter} from "react-router-dom";
import socketInstance from "../../util/Socket";

class JoinLobbyModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lobbyName: '',
            userName: '',
            rooms: []
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDropdownChange = this.handleDropdownChange.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.joinLobby = this.joinLobby.bind(this);
    }

    componentDidMount() {
        socketInstance.socket.emit('getAllRooms');
        socketInstance.socket.on('responseAllRooms', (rooms) => {
            this.setState({
                rooms: rooms
            });
        });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleDropdownChange(event) {
        this.setState({lobbyName: event.target.value});
    }

    handleReset(event) {
        this.setState({
            lobbyName: '',
            userName: ''
        });
        this.props.onHide();
    }

    joinLobby(event) {
        event.preventDefault();
        if (socketInstance.socket.emit('joinRoom', this.state.lobbyName, this.state.userName)) {
            this.handleReset();
            this.props.history.push('/lobby');
        } else {
            return false;
        }
    }

    render() {
        console.log(this.state.rooms);
        return (
            <Modal
                show={this.props.show}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Lobby joinen
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id="createLobby" onSubmit={this.joinLobby}>
                        <Form.Group as={Row} controlId="formHorizontalLobbyName" style={{paddingBottom: '0.5em'}}>
                            <Form.Label column sm={2}>
                                Lobby Name
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control as="select" value={this.state.lobbyName}
                                              onChange={this.handleDropdownChange}>
                                    <option>...</option>
                                    {this.state && this.state.rooms && this.state.rooms.map(room =>
                                        <option value={room} key={room}>{room}</option>
                                    )}
                                </Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formHorizontalUsername">
                            <Form.Label column sm={2}>
                                User Name
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control name="userName"
                                              value={this.state.userName}
                                              onChange={this.handleInputChange}
                                              type="text"
                                              placeholder="Username"/>
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.handleReset} variant="outline-dark">Abbrechen</Button>
                    <Button form="createLobby" type={onsubmit} variant="dark">Lobby joinen</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default withRouter(JoinLobbyModal);