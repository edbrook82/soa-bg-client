import React, { Component } from 'react';
import Card from './Card';
import './App.css';
import config from './config';

function apiRequest(url, body) {
  const headers = { 'Content-Type': 'application/json' };
  const options = { headers, method: 'POST' };
  if (body) { options['body'] = JSON.stringify(body); }
  return new Promise((resolve, reject) => {
    fetch(url, options)
    .then(res => resolve(res.json()))
    .catch(error => reject(error));
  });
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gas: {
        title: "Gas Bill",
        prompt: "Units of gas used",
        cost: null,
        kwh: null,
        isLoading: false
      },
      elec: {
        title: "Electricity Bill",
        prompt: "Units of electricity used",
        cost: null,
        kwh: null,
        isLoading: false
      }
    };
  }

  toggleIsLoading = (utility, isLoading) => {
    const update = { ...this.state[utility], isLoading };
    this.setState({ [utility]: update });
  };

  calc = (utility, units, url) => {
    this.toggleIsLoading(utility, true);
    apiRequest(url, { units })
    .then(bill => {
      const utilityBill = {
        ...this.state[utility],
        ...bill,
        isLoading: false };
        this.setState({ [utility]: utilityBill });
    })
    .catch(err => {
      this.toggleIsLoading(utility, false);
    });
  };

  calcGas = units => {
    this.calc('gas', units, config.submitGasReadingUrl);
  };
  
  calcElec = units => {
    this.calc('elec', units, config.submitElectricityReadingUrl);
  };

  onChangeGas = event => {
    const gas = event.target.value;
    this.setState({ gas })
  }

  render() {
    const { gas, elec } = this.state;
    return (
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-md-6">
            <Card {...gas} onSubmit={this.calcGas}/>
            <Card {...elec} onSubmit={this.calcElec}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
