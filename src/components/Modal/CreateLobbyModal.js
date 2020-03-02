import * as React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class CreateLobbyModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            lobbyName: '',
            userName: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.createLobby = this.createLobby.bind(this);
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
            lobbyName: '',
            userName: ''
        });
        this.props.onHide();
    }

    createLobby(event) {
        event.preventDefault();
        window.$socket.emit('createLobby', this.state.lobbyName, this.state.userName);
        this.handleReset();
    }

    render() {
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Lobby erstellen
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id="createLobby" onSubmit={this.createLobby}>
                        <Form.Group as={Row} controlId="formHorizontalLobbyName">
                            <Form.Label column sm={2}>
                                Lobby Name
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control name="lobbyName"
                                              value={this.state.lobbyName}
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
                    <Button onClick={this.handleReset}>Abbrechen</Button>
                    <Button form="createLobby" type={onsubmit}>Lobby erstellen</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default CreateLobbyModal;
