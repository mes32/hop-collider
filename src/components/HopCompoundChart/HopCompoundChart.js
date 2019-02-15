import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

import './HopCompoundChart.css';

class HopCompoundChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            labels: this.props.data.labels,
            datasets: this.getDatasets()
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.data !== prevProps.data) {
            this.setState({
                labels: this.props.data.labels,
                datasets: this.getDatasets()
            });
        }
    }

    getDatasets = () => {
        let datasets = [];
        for (let selected of this.props.data.selectedData) {
            datasets.push(this.getSelected(selected));
        }
        datasets.push(this.getCumulativeDist());
        return datasets;
    }

    getSelected = (selected) => {
        return {
            label: selected.label,
            data: selected.data,
            type: 'line',
            backgroundColor: 'rgba(200, 200, 200, 0)',
            borderColor: 'rgba(100, 100, 250, 1)',
            borderWidth: 5,
            pointRadius: 0,
            pointHoverRadius: 0,
        }
    }

    getCumulativeDist = () => {
        return {
            label: this.props.data.distribution.label,
            data: this.props.data.distribution.data,
            borderColor: 'rgba(0, 0, 0, 0)',
            backgroundColor: 'rgba(200, 200, 200, 0.6)',
            pointRadius: 0,
            fill: true,
            lineTension: 0
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