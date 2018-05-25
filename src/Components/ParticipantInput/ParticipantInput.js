import React, { Component } from 'react';
import { Grid, Row, Col, FormControl, ControlLabel } from 'react-bootstrap';
import { PropTypes } from 'prop-types';

/**
 * Provides ability to add a pariticipant to the list of participants
 * for a particular Foosball Match result
 */
class ParticipantInput extends Component {
    constructor() {
        super();
        this.keyUpHandler = this.keyUpHandler.bind(this);
    }
    keyUpHandler(e) {
        const participant = e.target.value;
        if (e.key === 'Enter' && participant.trim().length > 0) {
            e.target.value = '';
            this.props.onParticipantAdded(participant)
        }
    }
    render() {
        return (
            <div>
                <Col xs={6}>
                    <ControlLabel>{ 'Enter Participant(s): ' }</ControlLabel>
                </Col>
                <Col xs={4}>
                    <FormControl onKeyUp={this.keyUpHandler} text="text"/>
                        (Press Enter to add)
                </Col>
            </div>
        )
    }
}

ParticipantInput.propTypes = {
    onParticipantAdded: PropTypes.func
}

export default ParticipantInput;