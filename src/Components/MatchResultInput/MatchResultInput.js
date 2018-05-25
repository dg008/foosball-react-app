import React, { Component } from 'react';
import { Button, Grid, Row, Col, FormControl, ControlLabel } from 'react-bootstrap';
import Form from 'react-validation/build/form';
import { PropTypes } from 'prop-types';
import { ParticipantInput } from '../ParticipantInput';
import { ParticipantList } from '../ParticipantList';
import { WinnerInput } from '../WinnerInput';
import { WinnerList } from '../WinnerList';
import { ValidatedButton, ValidatedInput } from '../Validation';
import { required } from '../../validators';

/**
 * Provides ability to input a Foosball Match Result including battle configuration,
 * participants and winners which can then be saved to browser Local Storage.
 */
class MatchResultInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstTeamSize: 1,
            secondTeamSize: 1,
            participants: [],
            winners: [],
            matchDateTime: new Date().getTime(),
            formValid: false,
        }
    }
    saveMatchResult = () => {
        const { matchDateTime } = this.state;
        const matchResult = JSON.stringify(this.state);
        localStorage.setItem(`matchResult${matchDateTime}`, matchResult);
        this.props.onSave();
    }
    updateFirstTeamSize = (e) => {
        const size = e.target.value;
        this.setState({ firstTeamSize: size});
    }
    updateSecondTeamSize = (e) => {
        const size = e.target.value;
        this.setState({ secondTeamSize: size});
    }
    addParticipant = (participant) => {
        const participants = this.state.participants.concat([
            participant
        ]);
        const formValid = this.state.winners.length > 0;
        this.setState({ participants, formValid })
    }
    addWinner = (winner) => {
        const winners = this.state.winners.concat([
            winner
        ]);
        const formValid = this.state.participants.length > 0;
        this.setState({ winners, formValid })
    }
    render() {
        const { formValid } = this.state;
        return (
            <Grid>
                <Form>
                    <Row>
                        <Col xs={6}>
                            <ControlLabel>Battle Configuration:</ControlLabel>
                        </Col>
                        <Col xs={2}>
                            <ValidatedInput
                                type="number"
                                name="firstTeamSize"
                                value={this.state.firstTeamSize}
                                onChange={this.updateFirstTeamSize}
                                validations={[required]}/>
                            { ' vs ' }
                            <ValidatedInput
                                type="number"
                                name="secondTeamSize"
                                value={this.state.secondTeamSize}
                                onChange={this.updateSecondTeamSize}
                                validations={[required]}/>
                        </Col>
                    </Row>
                    <Row>
                        <ParticipantInput onParticipantAdded={this.addParticipant} />
                        <ParticipantList
                            participants={this.state.participants}                
                        />
                    </Row>
                    <Row>
                        <WinnerInput onWinnerAdded={this.addWinner} />
                        <WinnerList
                            winners={this.state.winners}
                        />
                    </Row>
                    <ValidatedButton formValid={formValid} bsStyle="success" onClick={this.saveMatchResult}>Save</ValidatedButton>
                </Form>
            </Grid>
        );
    }
}

export default MatchResultInput;