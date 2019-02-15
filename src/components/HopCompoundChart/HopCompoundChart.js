import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

import './HopCompoundChart.css';

class HopCompoundChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            labels: this.props.data.labels,
            datasets: [
                {
                    label: this.props.data.distribution.label,
                    data: this.props.data.distribution.data,
                    backgroundColor: 'rgba(200, 200, 200, 0.6)',
                    pointRadius: 0,
                }
            ],
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.data !== prevProps.data) {
            this.setState({
                labels: this.props.data.labels,
                datasets: [
                    {
                        label: this.props.data.distribution.label,
                        data: this.props.data.distribution.data,
                        backgroundColor: 'rgba(200, 200, 200, 0.6)',
                        pointRadius: 0,
                    }
                ],
            });
        }
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