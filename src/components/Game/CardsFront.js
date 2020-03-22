import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {ReactComponent as ArrowIcon} from "../../arrowIcon.svg";
import {ReactComponent as Draw2Icon} from "../../draw2Icon.svg";
import {ReactComponent as SuspendIcon} from "../../suspendIcon.svg";
import {ReactComponent as Draw4Icon} from "../../draw4Icon.svg";
import {ReactComponent as ColorIcon} from "../../colorIcon.svg";

class CardsFront extends Component {
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
        if(card.number !== null){
            return <CardColorNumber card={card} key={index} isFirst={first}/>;
        } else {
            return <CardSpecial card={card} key={index} isFirst={first}/>;
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

function CardSpecial (props) {
    if (props.isFirst === true) {
        return <button className="gameCardFrontFirst"
                onClick={() => this.cardClickedHandler(props.card)}
                style={{backgroundColor: props.card.color}}>
                <div className="card-top-first">
                    {props.card.action === "draw2" && '+2'}
                    {props.card.action === "draw4" && '+4'}
                    {props.card.action === "return" && <ArrowIcon style={{width: '1.3em', height: '1.3em'}}/>}
                    {props.card.action === "suspend" && <SuspendIcon style={{width: '1.3em', height: '1.3em'}}/>}
                    {props.card.action === "changeColor" && <ColorIcon style={{width: '1.3em', height: '1.3em'}}/>}
                </div>
                <div className="card-middle-img">
                    {props.card.action === "draw2" && <Draw2Icon/>}
                    {props.card.action === "draw4" && <Draw4Icon/>}
                    {props.card.action === "return" && <ArrowIcon/>}
                    {props.card.action === "suspend" && <SuspendIcon/>}
                    {props.card.action === "changeColor" && <ColorIcon/>}
                </div>
                <div className="card-bottom">
                    {props.card.action === "draw2" && '+2'}
                    {props.card.action === "draw4" && '+4'}
                    {props.card.action === "return" && <ArrowIcon style={{width: '1.3em', height: '1.3em'}}/>}
                    {props.card.action === "suspend" && <SuspendIcon style={{width: '1.3em', height: '1.3em'}}/>}
                    {props.card.action === "changeColor" && <ColorIcon style={{width: '1.3em', height: '1.3em'}}/>}
                </div>
        </button>;
    }
    else {
        return <button className="gameCardFront"
                       onClick={() => this.cardClickedHandler(props.card)}
                       style={{backgroundColor: props.card.color}}>
            <div className="card-top">
                {props.card.action === "draw2" && '+2'}
                {props.card.action === "draw4" && '+4'}
                {props.card.action === "return" && <ArrowIcon style={{width: '1.3em', height: '1.3em'}}/>}
                {props.card.action === "suspend" && <SuspendIcon style={{width: '1.3em', height: '1.3em'}}/>}
                {props.card.action === "changeColor" && <ColorIcon style={{width: '1.3em', height: '1.3em'}}/>}
            </div>
        </button>;
    }
}

export default withRouter(CardsFront);