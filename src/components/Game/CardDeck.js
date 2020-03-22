import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {ReactComponent as ArrowIcon} from "../../arrowIcon.svg";
import {ReactComponent as CardsIcon} from "../../cardsIcon.svg";

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

    getCard(card, index, first) {
        if(card.color !== "black"){
            console.log(`${card.color} ${card.number} ${card.action}`);
            if(card.number !== null){
                return <CardColorNumber card={card} key={index} isFirst={first}/>;
            } else {
                return <CardColorSpecial card={card} key={index} isFirst={first}/>;
            }
        } else {
            console.log(`${card.color} ${card.number}  ${card.action}`);
            // todo: black cards
        }
    }

    render() {
        const deck = this.props.deck;
        return (
            <div className="cardDeck">
                {deck.map((card, index) => {
                        if (index === deck.length - 1) {
                            return this.getCard(card, index, true);
                        } else {
                            return this.getCard(card, index, false);
                        }
                    }
                )}
            </div>
        )
    }
}

function CardColorNumber(props) {
    if(props.isFirst === true) {
        return <button className="gameCardFrontFirst"
                       onClick={() => this.cardClickedHandler(props.card)}
                       style={{backgroundColor: props.card.color}}>
                <div className="card-top-first">{props.card.number}</div>
                <div className="card-middle-first">{props.card.number}</div>
                <div className="card-bottom">{props.card.number}</div>
        </button>;
    } else {
        return <button className="gameCardFront"
                       onClick={() => this.cardClickedHandler(props.card)}
                       style={{backgroundColor: props.card.color}}>
                <div className="card-top">{props.card.number}</div>
        </button>;
    }
}

function CardColorSpecial (props) {
    if (props.isFirst === true) {
        return <button className="gameCardFrontFirst"
                onClick={() => this.cardClickedHandler(props.card)}
                style={{backgroundColor: props.card.color}}>
                <div className="card-top-first">
                    {props.card.action === "draw2" && '+2'}
                    {props.card.action === "return" && <ArrowIcon style={{width: '1.3em', height: '1.3em'}}/>}
                </div>
                <div className="card-middle-img">
                    {props.card.action === "draw2" && <CardsIcon/>}
                    {props.card.action === "return" && <ArrowIcon/>}
                </div>
                <div className="card-bottom">
                    {props.card.action === "draw2" && '+2'}
                    {props.card.action === "return" && <ArrowIcon style={{width: '1.3em', height: '1.3em'}}/>}
                </div>
        </button>;
    }
    // todo: if not first card
}

export default withRouter(CardDeck);