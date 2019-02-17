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

    selectHop = (id) => {
        if (id === '') {
            this.setState({
                selectedHops: [],
                alphaAcidData: new HopCompoundDataset('alpha_acid', this.props.reduxStore.hops, []),
                betaAcidData: new HopCompoundDataset('beta_acid', this.props.reduxStore.hops, []),
                cohumuloneData: new HopCompoundDataset('cohumulone', this.props.reduxStore.hops, [])
            });
        } else {            
            const hop = this.props.reduxStore.hops.find(element => element.id === parseInt(id));
            if (hop) {
                this.setState({
                    selectedHops: [hop],
                    alphaAcidData: new HopCompoundDataset('alpha_acid', this.props.reduxStore.hops, [hop]),
                    betaAcidData: new HopCompoundDataset('beta_acid', this.props.reduxStore.hops, [hop]),
                    cohumuloneData: new HopCompoundDataset('cohumulone', this.props.reduxStore.hops, [hop]),
                });
            }
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