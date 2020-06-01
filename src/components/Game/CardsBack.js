import React, {Component} from "react";
import {withRouter} from "react-router-dom";

class CardsBack extends Component {
    render() {
        const loopArray = Array.from(Array(this.props.count), (_, x) => x);
        return (
            <div className="cardDeckBack">
                {loopArray.map((_, i) => {
                    if (i === this.props.count - 1) {
                        return <div className="gameCardBackFirst" key={i}>
                            <p>UNO</p>
                        </div>
                    } else {
                        return <div className="gameCardBack" key={i}>
                            <p>U</p>
                        </div>
                    }
                })}
            </div>
        );
    }
}

export default withRouter(CardsBack);