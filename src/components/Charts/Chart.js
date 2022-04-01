import { XYPlot, XAxis, YAxis, LineSeries, Crosshair } from 'react-vis';
import React, { Component } from 'react';
import './Chart.css';
import * as d3 from 'd3'
import '../../../../node_modules/react-vis/dist/style.css'
import moment from 'moment';

class Chart extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            crossHairValues: [],
            condition: false
        }

        this.DATA = [this.props.data.tenPercentile, this.props.data.fiftyPercentile, this.props.data.sevenFivePercentile, this.props.data.benchmark, this.props.data.totalDeposit];
    }

    _onMouseLeave = () => {
        this.setState({crossHairValues: [],
                        condition: false});
    }

    _onNearestX = (value, {index}) => {
        this.setState({crossHairValues: this.DATA.map(d => d[index]),
                        condition: true})
        console.log(this.state.crossHairValues[0].x);
    }

    crosshairCondition = () => {
        if (!this.state.condition) return null;
        else return (
            <Crosshair
                values={this.state.crossHairValues}
                className="">
                    <div className='crosshair-container' >
                        <h3 className='crosshair-title'>{`${moment(this.state.crossHairValues[0].x).format('MMM YYYY')}`}</h3>
                        <hr/>
                        <h4 className='crosshair-second-header'>Chance of outcome</h4>
                        <text className='grey-left-text'><span className='lightblue-dot'/> Top 25% <span className='grey-right-text'>{`>S$${this.state.crossHairValues[2].y.toLocaleString(undefined, {maximumFractionDigits: 0})}`}</span></text>
                            <br/><br/>
                        <text className='blue-left-text'><span className='blue-dot'/> Median <span className='blue-right-text'>{`S$${this.state.crossHairValues[1].y.toLocaleString(undefined, {maximumFractionDigits: 0})}`}</span></text>
                        <br/><br/>
                        <text className='grey-left-text'><span className='lightblue-dot'/> Bottom 10% <span className='grey-right-text'>{`<S$${this.state.crossHairValues[0].y.toLocaleString(undefined, {maximumFractionDigits: 0})}`}</span></text>
                            <br/><br/>
                        <text className='grey-left-text'>Underperforming 2.5% p.a.<span className='grey-right-text'>3%</span></text>
                            <br/><br/>
                            <hr/>
                        <text className='grey-left-text'><span className='orange-dot'/> 2.5% p.a.<span className='grey-right-text'>{`S$${this.state.crossHairValues[3].y.toLocaleString(undefined, {maximumFractionDigits: 0})}`}</span></text>
                            <br/><br/>
                        <text className='grey-left-text'><span className='black-dot'/> Deposits<span className='grey-right-text'>{`S$${this.state.crossHairValues[4].y.toLocaleString(undefined, {maximumFractionDigits: 0})}`}</span></text>
                            <br/><br/>
                    </div>
             </Crosshair>
        )
    }

    render() {

        const configuredCurve = d3.curveCatmullRom.alpha(0.5);
        const DATA = [this.props.data.tenPercentile, this.props.data.fiftyPercentile, this.props.data.sevenFivePercentile, this.props.data.benchmark, this.props.data.totalDeposit];
        // console.log(DATA[0][0].x);
        return(
            <div className='chart-div'>
                <XYPlot
                onMouseLeave={this._onMouseLeave}
                width={1000}
                height={500}
                xType='time'
                yType='linear'
                yDomain={[0, 4000000 * 1.25]}
                margin={{right:65}}
                >
                <LineSeries color="lightblue" curve={'curveMonotoneX'} data={DATA[0]} />
                <LineSeries onNearestX={this._onNearestX} color ="#367af6" curve={'curveMonotoneX'} data={DATA[1]} />
                <LineSeries color ="lightblue" curve={configuredCurve} data={DATA[2]} />
                <LineSeries curve={configuredCurve} data={DATA[3]} />
                <LineSeries color="black" data={DATA[4]} />
                {this.crosshairCondition()}
                <XAxis 
                    style={{
                        line: {stroke: 'lightgrey'},
                        ticks: {stroke: 'grey'}
                    }}/>
                <YAxis
                    tickValues={[0, 500000, 1000000, 1500000, 2000000, 2500000, 3000000,3500000,4000000,4500000]}
                    tickFormat={(v) => {
                        if(v==0) return `$${v}`;
                        else if(v < 1000000) return `$${v/1000}k`
                        else return `$${v/1000000}m`
                    }}
                    orientation='right'
                    style={{
                        line: {stroke: 'lightgrey'},
                        ticks: {stroke: 'grey'}
                    }}/>
            </XYPlot>
        </div>
        )
    }
}

export default Chart;