import React, { Component } from 'react';
import { Button, Grid, Row, Col, FormControl, ControlLabel } from 'react-bootstrap';
import { PropTypes } from 'prop-types';
import _ from 'lodash';
import { winRatesCalculator } from '../../Services';
import BarChart from '../BarChart';
import { config } from '../../Config'

/**
 * This component is responsible for displaying the overall win rates for
 * a particular Foosball participant.
 * It also displays win rates specifically against another participant.
 **/
class WinRatesResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            overallWinLossRate: '',
            specificWinLossRate: '',
        }
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        const { firstParticipant, secondParticipant } = nextProps;

        // Get overall win rates
        const matchResults = [];
        for (let i = 0; i < localStorage.length; i++) {
            if (localStorage.key(i).startsWith('matchResult')) {
                const matchResultString = localStorage.getItem(localStorage.key(i));
                const matchResult = JSON.parse(matchResultString);
                matchResults.push(matchResult);
            }
        }
        const summaryWinRates = winRatesCalculator({ firstParticipant, secondParticipant, matchResults } );
        const { numGamesWith2ndParticipant, overallWinRate, overallLossRate,
            specificWinRate, specificLossRate} = summaryWinRates;

        const resultsByTime = [];
        matchResults.forEach(r => {
            const calculatedResult = winRatesCalculator({firstParticipant, secondParticipant, matchResults: [r]});
            const { overallWinRate } = calculatedResult;
            resultsByTime.push(
                {
                    title: new Date(r.matchDateTime).toLocaleString(config.LOCALE),
                    value: isNaN(overallWinRate) ? 0.00 : overallWinRate,
                }
            );
        });
        
        return {
            firstParticipant,
            resultsByTime,
            numGamesWith2ndParticipant,
            overallWinRate,
            overallWinLossRate: isNaN(overallWinRate)
                ? 'N/A (Participant may not be entered/found)'
                : `${overallWinRate}% (WIN) / ${overallLossRate}% (LOSS)`,
            specificWinLossRate: isNaN(specificWinRate)
                ? 'N/A (Participant may not be entered/found)'
                : `${specificWinRate }% (WIN) / ${specificLossRate}% (LOSS)`,
          };
    }
    render() {
        const { firstParticipant, overallWinRate, numGamesWith2ndParticipant, resultsByTime } = this.state;
        return (
            <div className="top-spacer">
                <Row>
                    <Col xs={6}>
                        <ControlLabel>Overall Win/Loss Rate:</ControlLabel>
                    </Col>
                    <Col xs={6}>
                        <ControlLabel className="left">{this.state.overallWinLossRate}</ControlLabel>
                    </Col>                    
                </Row>
                {
                    numGamesWith2ndParticipant <= 0 ? null
                    : <Row>
                        <Col xs={6}>
                            <ControlLabel>Win/Loss Rate against {this.props.secondParticipant}:</ControlLabel>
                        </Col>
                        <Col xs={6}>
                            <ControlLabel className="left">{this.state.specificWinLossRate}</ControlLabel>
                        </Col>
                    </Row>
                }
                {
                    isNaN(overallWinRate) ? null
                    : <BarChart firstParticipant={firstParticipant} data={resultsByTime} />
                }                
                <Button bsStyle="warning" onClick={this.props.onClose}>Close</Button>
            </div>
        );
    }
}

export default WinRatesResult;