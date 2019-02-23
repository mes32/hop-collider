import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Line } from 'react-chartjs-2';

import './HopCompoundChart.css';

const SELECTED_COLORS = [
    'rgba(0, 84, 165, 1)', 
    'rgba(243, 101, 35, 1)',
    'rgba(0, 166, 82, 1)',
    'rgba(146, 39, 143, 1)',
    'rgba(254, 242, 0, 1)',
    'rgba(46, 49, 146, 1)',
    'rgba(255, 148, 0, 1)',
    'rgba(1, 168, 158, 1)',
    'rgba(238, 28, 37, 1)',
    'rgba(141, 199, 1, 1)',
    'rgba(102, 46, 145, 1)',
    'rgba(255, 197, 1, 1)'
];

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

    // datasetKeyProvider() {
    //     // Note: I don't think this is the right way to address this warning
    //     // [react-chartjs-2] Warning: Each dataset needs a unique key. By default, the "label" property on each dataset is used. Alternatively, you may provide a "datasetKeyProvider" as a prop that returns a unique key.
    //     return Math.random();
    // }

    getDatasets = () => {
        let datasets = [];
        for (let i = 0; i < this.props.data.selectedData.length; i++) {
            const selected = this.props.data.selectedData[i];
            const backgroundColor = SELECTED_COLORS[i % SELECTED_COLORS.length];
            datasets.push(this.getSelected(selected, backgroundColor));
        }
        datasets.push(this.getCumulativeDist());
        return datasets;
    }

    getSelected = (selected, borderColor) => {
        return {
            label: selected.label,
            data: selected.data,
            type: 'line',
            backgroundColor: 'rgba(200, 200, 200, 0)',
            borderColor: borderColor,
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
            pointHoverRadius: 0,
            fill: true,
            lineTension: 0
        };
    }

    getLabelCSS = (index) => {
        return {
            color: SELECTED_COLORS[index % SELECTED_COLORS.length],
            // color: 'white',
            // fontWeight: 'bold',
            // fontSize: '0.5rem',
            // border: '1px solid white',
            // padding: '3px 6px',
            // borderRadius: '5px',
            // marginLeft: '2px',
            // marginTop: '8px',
        };
    }

    render() {
        return (
            <div>
                <h3>{this.props.title}</h3>
                <div className="chart-container">
                    <div className="y-labels-wrapper">
                        <div className="y-labels">
                            {this.props.reduxStore.selectedHops.map((hop, i) =>
                                <div key={hop.id}>
                                    <h4 style={this.getLabelCSS(i)}>{hop.variety_name}</h4>
                                </div>
                            )}
                        </div>
                        <div className="y-labels-spacer">
                        </div>
                    </div>
                    <div className="chart">
                        <Line
                            data={this.state}
                            // datasetKeyProvider={this.datasetKeyProvider}
                            width={100}
                            height={60}
                            options={{
                                maintainAspectRatio: true,
                                tooltips: {
                                    enabled: false
                                },
                                legend: {
                                    display: false,
                                },
                                animation: {
                                    duration: 1000,
                                    easing: 'easeOutBounce',
                                },
                                scales: {
                                    yAxes: [{
                                        gridLines: {
                                            display: false
                                        },
                                        ticks: {
                                            display: false
                                        }
                                    }],
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

const mapReduxStoreToProps = (reduxStore) => ({ reduxStore });
export default connect(mapReduxStoreToProps)(HopCompoundChart);