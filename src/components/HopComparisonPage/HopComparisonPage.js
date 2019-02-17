import React, { Component } from 'react';
import { connect } from 'react-redux';

import './HopComparisonPage.css';
import HopComparisonControlPane from '../HopComparisonControlPane/HopComparisonControlPane';
import HopCompoundDataset from '../../modules/HopCompoundDataset/HopCompoundDataset';
import HopCompoundChart from '../HopCompoundChart/HopCompoundChart';

class HopComparisonPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alphaAcidData: new HopCompoundDataset('alpha_acid', this.props.reduxStore.hops, [this.props.reduxStore.focusHop]),
            betaAcidData: new HopCompoundDataset('beta_acid', this.props.reduxStore.hops, [this.props.reduxStore.focusHop]),
            cohumuloneData: new HopCompoundDataset('cohumulone', this.props.reduxStore.hops, [this.props.reduxStore.focusHop])
        };
    }

    componentDidMount() {
        const action = { type: 'FETCH_HOPS' };
        this.props.dispatch(action);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.reduxStore.hops !== prevProps.reduxStore.hops || this.props.reduxStore.focusHop !== prevProps.reduxStore.focusHop) {
            this.setState({
                alphaAcidData: new HopCompoundDataset('alpha_acid', this.props.reduxStore.hops, [this.props.reduxStore.focusHop]),
                betaAcidData: new HopCompoundDataset('beta_acid', this.props.reduxStore.hops, [this.props.reduxStore.focusHop]),
                cohumuloneData: new HopCompoundDataset('cohumulone', this.props.reduxStore.hops, [this.props.reduxStore.focusHop])
            });
        }
    }

    selectHop = (event) => {
        const id = event.target.value;
        if (id === '') {
            // clear plots
        } else {
            const action = { type: 'FETCH_FOCUS_HOP', payload: id };
            this.props.dispatch(action);
        }
    }

    render() {
        return (
            <div className="hop-comparison-div">
                <div className="control-pane-div">
                    <HopComparisonControlPane selectHop={this.selectHop} />
                </div>
                <div className="scroll-pane-div">
                    <h2>Hop Comparison</h2>
                    <HopCompoundChart data={this.state.alphaAcidData} />
                    <HopCompoundChart data={this.state.betaAcidData} />
                    <HopCompoundChart data={this.state.cohumuloneData} />
                </div>
            </div>
        );
    }
}

const mapReduxStoreToProps = (reduxStore) => ({ reduxStore });
export default connect(mapReduxStoreToProps)(HopComparisonPage);