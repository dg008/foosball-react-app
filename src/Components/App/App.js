import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import './App.css';
import logo from './logo.svg';
import { MatchResultInput } from '../MatchResultInput';
import { WinRates } from '../WinRates';

/**
 * App is a container component representing the Foosball Rankings Application 
 */
const buttonStyle = {
  marginRight:'4px',
  marginTop: '4px',
  marginBottom: '8px',
};
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMatchResultInput: false,
      showWinRates: false
    }
  }
  hideAll = () => {
    this.setState({ showMatchResultInput: false, showWinRates: false })
  }
  showMatchResultInput = () => {
    this.setState({ showMatchResultInput: true, showWinRates: false })
  }
  showWinRates = () => {
    this.setState({ showWinRates: true, showMatchResultInput: false })
  }  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to the Foosball Rankings Application</h1>
        </header>
        <Button style={buttonStyle} onClick={this.hideAll}>Home</Button>
        <Button style={buttonStyle} onClick={this.showMatchResultInput}>Record Match Result</Button>
        <Button style={buttonStyle} onClick={this.showWinRates}>View Win Rates</Button>
        {
          this.state.showMatchResultInput
            ? <MatchResultInput onSave={this.hideAll} />
            : null
        }
        {
          this.state.showWinRates
            ? <WinRates onClose={this.hideAll} />
            : null
        }
      </div>
    );
  }
} 

export default App;
