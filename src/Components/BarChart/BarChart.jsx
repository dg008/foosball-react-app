import React, { Component } from 'react';
import './BarChart.css';
import Chart from '../Chart'

export default ({firstParticipant, data}) =>
    <div>
        <div className="Chart-container">
            <p className="Chart-description">
                Win Rates for {firstParticipant} over time
            </p>

            <Chart data={data}/>
        </div>
    </div>