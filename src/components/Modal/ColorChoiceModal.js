import Modal from "react-bootstrap/Modal";
import {withRouter} from "react-router-dom";
import * as React from "react";
import './color-choice.modal.css';
import {playCard} from "../../util/Socket";

class ColorChoiceModal extends React.Component {
    constructor(props) {
        super(props);

        this.onClickedHandler = this.onClickedHandler.bind(this);
    }

    onClickedHandler(color, card) {
        playCard(card, color);
        this.props.onHide();
    }

    render() {
        const card = this.props.card;
        return (
            <Modal show={this.props.show}>
                <Modal.Body>
                    <div className="container">
                        <div className="box yellow" onClick={() => this.onClickedHandler('yellow', card)}/>
                        <div className="box red" onClick={() => this.onClickedHandler('red', card)}/>
                        <div className="box blue" onClick={() => this.onClickedHandler('blue', card)}/>
                        <div className="box green" onClick={() => this.onClickedHandler('green', card)}/>
                    </div>
                </Modal.Body>
            </Modal>
        )
    }
}

export default withRouter(ColorChoiceModal);