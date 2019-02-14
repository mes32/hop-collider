import React, { Component } from 'react';
import { Bar, Line } from 'react-chartjs-2';

import './HopCompoundChart.css';

const numIntervals = 200;

class HopCompoundChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            labels: [''],
            datasets: [
                {
                    label: '',
                    data: [],
                    backgroundColor: 'rgba(200, 200, 200, 0.6)',
                }
            ],
        };
    }

    render() {
        return (
            <div className="chart-container">
                <div className="chart">
                    <Line
                        data={this.state}
                        width={100}
                        height={60}
                        options={{
                            maintainAspectRatio: true,
                        }}
                    />
                </div>
            </div>
        );
    }
}

export default HopCompoundChart;