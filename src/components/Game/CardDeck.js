import React, {Component} from "react";
import {withRouter} from "react-router-dom";

class CardDeck extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const deck = this.props.deck;
        console.log(deck);
        return (
            <div className="cardDeck">
                {deck.map(card=>
                    <GameCardFront
                        number={card.number}
                        color={card.color}
                    />
                )}
            </div>
        )
    }
}


const GameCardFront = ({number, color}) =>
    <div className="gameCard" style={{ backgroundColor: color }}>
        <div>{number}</div>
        <div className="card-middle">{number}</div>
        <div className="card-bottom">{number}</div>
    </div>
;

export default withRouter(CardDeck);