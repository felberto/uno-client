import React, {Component} from "react";
import {Button} from "react-bootstrap";
import {withRouter} from "react-router-dom";

class CardDeck extends Component {
    constructor(props) {
        super(props);
        this.state = {
            justClicked: null,
        };
        this.cardClickedHandler = this.cardClickedHandler.bind(this);
    }

    cardClickedHandler(card) {
        console.log(`card clicked: ${card.number} ${card.color}`);
        this.setState({justClicked: card});
    }

    render() {
        const deck = this.props.deck;
        return (
            <div className="cardDeck">
                {deck.map((card, index) => {
                        if (index === deck.length - 1) {
                            return <button className="gameCardFrontFirst"
                                           onClick={() => this.cardClickedHandler(card)}
                                           style={{backgroundColor: card.color}}
                                           key={index}>
                                <div className="card-top">{card.number}</div>
                                <div className="card-middle">{card.number}</div>
                                <div className="card-bottom">{card.number}</div>
                            </button>
                        } else {
                            return <button className="gameCardFront"
                                           onClick={() => this.cardClickedHandler(card)}
                                           style={{backgroundColor: card.color}}
                                           key={index}>
                                <div className="card-top">{card.number}</div>
                                <div className="card-middle" style={{color: card.color}}>{card.number}</div>
                                <div className="card-bottom" style={{color: card.color}}>{card.number}</div>
                            </button>
                        }
                    }
                )}
            </div>
        )
    }
}

export default withRouter(CardDeck);