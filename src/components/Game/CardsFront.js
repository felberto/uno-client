import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {playCard} from "../../util/Socket";
import {ReactComponent as ArrowIcon} from "../../resources/svg/arrowIcon.svg";
import {ReactComponent as Draw2Icon} from "../../resources/svg/draw2Icon.svg";
import {ReactComponent as SuspendIcon} from "../../resources/svg/suspendIcon.svg";
import {ReactComponent as Draw4Icon} from "../../resources/svg/draw4Icon.svg";
import {ReactComponent as Draw4IconYellow} from "../../resources/svg/draw4IconYellow.svg";
import {ReactComponent as Draw4IconRed} from "../../resources/svg/draw4IconRed.svg";
import {ReactComponent as Draw4IconBlue} from "../../resources/svg/draw4IconBlue.svg";
import {ReactComponent as Draw4IconGreen} from "../../resources/svg/draw4IconGreen.svg";
import {ReactComponent as ColorIconYellow} from "../../resources/svg/colorIconYellow.svg";
import {ReactComponent as ColorIconRed} from "../../resources/svg/colorIconRed.svg";
import {ReactComponent as ColorIconBlue} from "../../resources/svg/colorIconBlue.svg";
import {ReactComponent as ColorIconGreen} from "../../resources/svg/colorIconGreen.svg";
import {ReactComponent as ColorIcon} from "../../resources/svg/colorIcon.svg";
import ColorChoiceModal from "../Modal/ColorChoiceModal";

class CardsFront extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        };
        window.modal = this;
    }

    getCard(card, index, isDisabled, position, cssClass, uno) {
        const p = 'translate(' + position + 'em,0)';
        if (card.number !== null) {
            return <CardColorNumber
                card={card}
                key={index}
                isDisabled={isDisabled}
                position={p}
                cssClass={cssClass}/>;
        } else {
            return <CardSpecial
                card={card}
                key={index}
                isDisabled={isDisabled}
                position={p}
                cssClass={cssClass}/>;
        }
    }

    open(card) {
        this.setState({colorChoiceModalShow: true, modalCard: card});
    }

    render() {
        let colorChoiceModalClose = () => this.setState({colorChoiceModalShow: false});
        const deck = this.props.deck;
        const halfLength = deck.length / 2 + 2;

        return (
            <div className={this.props.cssClass}>
                {deck.map((card, index) => {
                    return this.getCard(card, index, this.props.isDisabled, (index - halfLength) * 2.5, this.props.cssClass);
                    }
                )}
                <ColorChoiceModal
                    show={this.state.colorChoiceModalShow}
                    card={this.state.modalCard}
                    onHide={colorChoiceModalClose}
                />
            </div>
        )
    }
}

function cardClickedHandler(card) {
    console.log(`card clicked: ${card.number} ${card.color}`);
    if ((card.color === 'black' && card.action === 'draw4') || (card.color === 'black' && card.action === 'changeColor')) {
        window.modal.open(card);
    } else {
        playCard(card, null);
    }
}

function CardColorNumber(props) {
    let cssClassHover = (props.card.valid === false || props.isDisabled) ? '' : 'hoverCard';
    cssClassHover = cssClassHover + " gameCardFrontFirst";
    return <button className={cssClassHover}
                   onClick={() => cardClickedHandler(props.card)}
                   style={{
                       backgroundColor: props.card.color,
                       transform: props.cssClass === "storagePile" ? 'none' : props.position,
                   }}
                   disabled={props.isDisabled}>
        <div className="card-top-first">{props.card.number}</div>
        <div className="card-middle-first">{props.card.number}</div>
        <div className="card-bottom">{props.card.number}</div>
    </button>;
}

function CardSpecial(props) {
    let cssClassHover = (props.card.valid === false || props.isDisabled) ? '' : 'hoverCard';
    cssClassHover = cssClassHover + " gameCardFrontFirst";
    return <button className={cssClassHover}
                   onClick={() => cardClickedHandler(props.card)}
                   style={{
                       backgroundColor: props.card.color,
                       transform: props.cssClass === "storagePile" ? 'none' : props.position,
                   }}
                   disabled={props.isDisabled}>
        <div className="card-top-first">
            {props.card.action === "draw2" && '+2'}
            {props.card.action === "draw4" && '+4'}
            {props.card.action === "return" && <ArrowIcon className="iconStyle"/>}
            {props.card.action === "suspend" && <SuspendIcon className="iconStyle"/>}
            {props.card.action === "changeColor" && <ColorIcon className="iconStyle"/>}
        </div>
        <div className="card-middle-img">
            {props.card.action === "draw2" && <Draw2Icon/>}
            {props.card.action === "draw4" && props.card.colorChoice === 'yellow' && <Draw4IconYellow/>}
            {props.card.action === "draw4" && props.card.colorChoice === 'red' && <Draw4IconRed/>}
            {props.card.action === "draw4" && props.card.colorChoice === 'blue' && <Draw4IconBlue/>}
            {props.card.action === "draw4" && props.card.colorChoice === 'green' && <Draw4IconGreen/>}
            {props.card.action === "draw4" && props.card.colorChoice === undefined && <Draw4Icon/>}
            {props.card.action === "return" && <ArrowIcon/>}
            {props.card.action === "suspend" && <SuspendIcon/>}
            {props.card.action === "changeColor" && props.card.colorChoice === 'yellow' && <ColorIconYellow/>}
            {props.card.action === "changeColor" && props.card.colorChoice === 'red' && <ColorIconRed/>}
            {props.card.action === "changeColor" && props.card.colorChoice === 'blue' && <ColorIconBlue/>}
            {props.card.action === "changeColor" && props.card.colorChoice === 'green' && <ColorIconGreen/>}
            {props.card.action === "changeColor" && props.card.colorChoice === undefined && <ColorIcon/>}
        </div>
        <div className="card-bottom">
            {props.card.action === "draw2" && '+2'}
            {props.card.action === "draw4" && '+4'}
            {props.card.action === "return" && <ArrowIcon className="iconStyle"/>}
            {props.card.action === "suspend" && <SuspendIcon className="iconStyle"/>}
            {props.card.action === "changeColor" && <ColorIcon className="iconStyle"/>}
        </div>
    </button>;
}

export default withRouter(CardsFront);