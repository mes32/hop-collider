import React, { Component } from 'react';
import { connect } from 'react-redux';

import './HopComparisonPage.css';
import DeleteHopBar from './DeleteHopBar/DeleteHopBar';
import HopComparisonControlPane from '../HopComparisonControlPane/HopComparisonControlPane';
import HopCompoundDataset from '../../modules/HopCompoundDataset/HopCompoundDataset';
import HopCompoundChart from '../HopCompoundChart/HopCompoundChart';

class HopComparisonPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedHops: [],
            alphaAcidData: new HopCompoundDataset('alpha_acid', this.props.reduxStore.hops, []),
            betaAcidData: new HopCompoundDataset('beta_acid', this.props.reduxStore.hops, []),
            cohumuloneData: new HopCompoundDataset('cohumulone', this.props.reduxStore.hops, [])
        };
    }

    componentDidMount() {
        const action = { type: 'FETCH_HOPS' };
        this.props.dispatch(action);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.reduxStore.hops !== prevProps.reduxStore.hops) {
            this.setState({
                selectedHops: [],
                alphaAcidData: new HopCompoundDataset('alpha_acid', this.props.reduxStore.hops, []),
                betaAcidData: new HopCompoundDataset('beta_acid', this.props.reduxStore.hops, []),
                cohumuloneData: new HopCompoundDataset('cohumulone', this.props.reduxStore.hops, [])
            });
        }
    }

    addHop = (newHop) => {
        const selectedHops = [...this.state.selectedHops, newHop];
        this.setState({
            selectedHops: selectedHops,
            alphaAcidData: new HopCompoundDataset('alpha_acid', this.props.reduxStore.hops, selectedHops),
            betaAcidData: new HopCompoundDataset('beta_acid', this.props.reduxStore.hops, selectedHops),
            cohumuloneData: new HopCompoundDataset('cohumulone', this.props.reduxStore.hops, selectedHops),
        });
    }

    removeHop = (hopToRemove) => {
        const selectedHops = this.state.selectedHops.filter(hop => hop !== hopToRemove);
        this.setState({
            selectedHops: selectedHops,
            alphaAcidData: new HopCompoundDataset('alpha_acid', this.props.reduxStore.hops, selectedHops),
            betaAcidData: new HopCompoundDataset('beta_acid', this.props.reduxStore.hops, selectedHops),
            cohumuloneData: new HopCompoundDataset('cohumulone', this.props.reduxStore.hops, selectedHops),
        });
    }

    render() {
        return (
            <div className="hop-comparison-div">
                <div className="control-pane-div">
                    <HopComparisonControlPane hops={this.props.reduxStore.hops} selectedHops={this.state.selectedHops} addHop={this.addHop} />
                </div>
                <div className="scroll-pane-div">
                    <h2>Hop Comparison</h2>
                    <HopCompoundChart data={this.state.alphaAcidData} />
                    <HopCompoundChart data={this.state.betaAcidData} />
                    <HopCompoundChart data={this.state.cohumuloneData} />
                </div>
                <DeleteHopBar selectedHops={this.state.selectedHops} removeHop={this.removeHop} />
            </div>
        );
    }
}

const mapReduxStoreToProps = (reduxStore) => ({ reduxStore });
export default connect(mapReduxStoreToProps)(HopComparisonPage);