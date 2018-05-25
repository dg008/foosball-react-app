import React, { Component } from 'react';
import { Grid, Row, Col, FormControl, ControlLabel } from 'react-bootstrap';
import { PropTypes } from 'prop-types';

/**
 * Provides ability to add a winner to the list of winners
 * for a particular Foosball Match result
 */
class WinnerInput extends Component {
    constructor() {
        super();
        this.keyUpHandler = this.keyUpHandler.bind(this);
    }
    keyUpHandler(e) {
        const winner = e.target.value;
        if (e.key === 'Enter' && winner.trim().length > 0) {
            e.target.value = '';
            this.props.onWinnerAdded(winner)
        }
    }
    render() {
        return (
            <div>
                <Col xs={6}>
                    <ControlLabel>{ 'Enter Winner(s): ' }</ControlLabel>
                </Col>
                <Col xs={4}>
                    <FormControl onKeyUp={this.keyUpHandler} text="text"/>
                        (Press Enter to add)
                </Col>
            </div>
        )
    }
}

WinnerInput.propTypes = {
    onWinnerAdded: PropTypes.func
}

export default WinnerInput;