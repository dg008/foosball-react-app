import React, { Component } from 'react';
import { Button, Grid, Row, Col, FormControl, ControlLabel } from 'react-bootstrap';
import Form from 'react-validation/build/form';
import { PropTypes } from 'prop-types';
import { WinRatesResult } from '../WinRatesResult';
import { required } from '../../validators';
import { ValidatedButton, ValidatedInput } from '../Validation';

/**
 * This component is responsible for allowing a user to input
 * a participant and optional opponent as a step before calculating win rates
 **/
class WinRates extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstParticipant: '',
            secondParticipant: null,
            showWinRatesResult: false,
        }
    }
    updateFirstParticipant = (e) => {
        const participant = e.target.value;
        this.setState({ firstParticipant: participant});
    }
    updateSecondParticipant = (e) => {
        const participant = e.target.value;
        this.setState({ secondParticipant: participant});
    }
    showWinRatesResult = () => {
        this.setState({ showWinRatesResult: true});
    }
    render() {
        const { firstParticipant, secondParticipant } = this.state;
        return (
            <Grid>
                <Form>
                    <Row>
                        <Col xs={6}>
                            <ControlLabel>Participant 1:</ControlLabel>
                        </Col>
                        <Col xs={4}>
                            <ValidatedInput
                                name="firstParticipant"
                                value={this.state.firstParticipant}
                                onChange={this.updateFirstParticipant}
                                validations={[required]}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={6}>
                            <ControlLabel>Participant 2 (Optional):</ControlLabel>
                        </Col>
                        <Col xs={4}>
                            <ValidatedInput
                                value={this.state.secondParticipant}
                                onChange={this.updateSecondParticipant}/>
                        </Col>
                    </Row>
                    <Row>
                        <ValidatedButton bsStyle="success" onClick={this.showWinRatesResult}>Show Win Rate!</ValidatedButton>
                    </Row>
                    { this.state.showWinRatesResult
                        ? <WinRatesResult
                            firstParticipant={firstParticipant}
                            secondParticipant={secondParticipant}
                            onClose={this.props.onClose} />
                        : null
                    }
                </Form>
            </Grid>
        );
    }
}

export default WinRates;