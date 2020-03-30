import * as React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {withRouter} from "react-router-dom";
import socketInstance from "../../util/Socket";

class CreateLobbyModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            roomName: '',
            userName: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.createRoom = this.createRoom.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleReset(event) {
        this.setState({
            roomName: '',
            userName: ''
        });
        this.props.onHide();
    }

    createRoom(event) {
        event.preventDefault();
        if (socketInstance.socket.emit('createRoom', this.state.roomName, this.state.userName)) {
            this.handleReset();
            this.props.history.push('/lobby');
        } else {
            return false;
        }
    }

    render() {
        return (
            <Modal
                show={this.props.show}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Lobby erstellen
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id="createRoom" onSubmit={this.createRoom}>
                        <Form.Group as={Row} controlId="formHorizontalRoomName">
                            <Form.Label column sm={2}>
                                Lobby Name
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control name="roomName"
                                              value={this.state.roomName}
                                              onChange={this.handleInputChange}
                                              type="text"
                                              placeholder="Lobby Name"/>
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
                    <Button form="createRoom" type={onsubmit} variant="dark">Lobby erstellen</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default withRouter(CreateLobbyModal);
