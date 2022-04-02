import './App.css';
import React, { Component } from 'react';
import InitialInput from './components/Inputs/InitialInput';
import MonthlyInput from './components/Inputs/MonthlyInput';
import Button from './components/Buttons/Button';
import Chart from './components/Charts/Chart';
import Loading from './components/Loading/Loading'

const API = 'https://www.mocky.io/v2/5e69de892d00007a005f9e29?mocky-delay=2000ms';

class App extends Component { 

  constructor(props) {
    super(props);

    this.state = {
      initialDeposit: null,
      monthlyDeposit: null,
      loading: false,
      totalDeposit: [],
      tenPercentile: [],
      fiftyPercentile: [],
      sevenFivePercentile: [],
      benchmark: [],
      condition: false
    };

    this.updateChart = this.updateChart.bind(this);
  }

  handleInitialCallBack = (initialData) => {
    this.setState({initialDeposit: initialData});
  }

  handleMonthlyCallBack = (monthlyData) => {
    this.setState({monthlyDeposit: monthlyData})
  }

  async updateChart() {
    const initialInvest = this.state.initialDeposit;
    const monthlyInvest = this.state.monthlyDeposit;

    this.setState({ loading: true });
    const res = await fetch(API, {
        method: 'POST',
        body: {
            "initialInvestment": initialInvest,
            "monthlyInvestment": monthlyInvest
        }
    });

    const json = await res.json();
    console.log(typeof(json[0].expectedAmounts["10"]));
    var ten = [];
    var fifty = [];
    var sevenfive = [];
    var benchmark = [];
    var deposit = [];

    for(var i in json){
      ten.push({x: new Date(json[i].yearMonth), y: json[i].expectedAmounts["10"]});
      fifty.push({x: new Date(json[i].yearMonth), y: json[i].expectedAmounts["50"]});
      sevenfive.push({x: new Date(json[i].yearMonth), y: json[i].expectedAmounts["75"]});
      benchmark.push({x: new Date(json[i].yearMonth), y: json[i].expectedAmounts.benchmark});
      deposit.push({x: new Date(json[i].yearMonth), y: json[i].totalDeposit});
    }

    this.setState({
      loading: false,
      totalDeposit: deposit,
      tenPercentile: ten,
      fiftyPercentile: fifty,
      sevenFivePercentile: sevenfive,
      benchmark: benchmark,
      condition: true
    });
  }

  loading() {
    if (!this.state.loading) return null;

    return (
        <div className='overlay'>
            <div className='spinner'><Loading /></div>
        </div>
        
    );
 }

  chart() {
    if(!this.state.condition) return null;

    return(
      <Chart data={ this.state }/>
    );
  }

  render() {
    return (
        <div className='App'>
          <div>
            <header className="App-header">
              <h1 className='title'> Plan Projection </h1>
              <p className='header-text'>
                This is an illustration of your plan and our recommendation based on your input. We ran 1,000 simultations to determine your range of possible outcomes at any point in the future net of all fees.
                <hr/>
              </p>
            </header>
          </div>
          <div className='input-div'>
            <InitialInput callBack = {this.handleInitialCallBack}/> <MonthlyInput callBack = {this.handleMonthlyCallBack}/> <Button onClick={this.updateChart}/>
          </div>
            { this.loading()}
            <div className='main-chart-div'>{this.chart()}</div>
        </div>
            
    )
  }
}

export default App;
