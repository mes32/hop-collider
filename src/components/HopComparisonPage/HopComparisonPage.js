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
            alphaAcidData: new HopCompoundDataset('alpha_acid', this.props.reduxStore.hops, []),
            // betaAcidData: new HopCompoundDataset('beta_acid', this.props.reduxStore.hops, []),
            // cohumuloneData: new HopCompoundDataset('cohumulone', this.props.reduxStore.hops, [])
        };
    }

    componentDidMount() {
        const action = { type: 'FETCH_HOPS' };
        this.props.dispatch(action);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.reduxStore.hops !== prevProps.reduxStore.hops) {
            this.setState({
                alphaAcidData: new HopCompoundDataset('alpha_acid', this.props.reduxStore.hops, []),
                // betaAcidData: new HopCompoundDataset('beta_acid', this.props.reduxStore.hops, []),
                // cohumuloneData: new HopCompoundDataset('cohumulone', this.props.reduxStore.hops, [])
            });
        }
    }

    saveComparison = (event) => {
        if (this.state.selectedHops.length > 0) {
            const action = {
                type: 'SAVE_HOP_COMPARISON',
                payload: {
                    selectedHops: this.state.selectedHops
                }
            };
            this.props.dispatch(action);
        }
    } 

    addNote = (event) => {
        console.log('addNote()');
    }

    render() {
        return (
            <div className="hop-comparison-div">
                <div className="control-pane-div">
                    <HopComparisonControlPane hops={this.props.reduxStore.hops} />
                </div>
                <div className="scroll-pane-div">
                    <button onClick={this.saveComparison}>
                        Save Comparison
                    </button>
                    <button onClick={this.addNote}>
                        Add Note
                    </button>
                    <h2>Hop Comparison</h2>
                    <HopCompoundChart data={this.state.alphaAcidData} />
                    {/* <HopCompoundChart data={this.state.betaAcidData} /> */}
                    {/* <HopCompoundChart data={this.state.cohumuloneData} /> */}
                </div>
                <DeleteHopBar />
            </div>
        );
    }
}

const mapReduxStoreToProps = (reduxStore) => ({ reduxStore });
export default connect(mapReduxStoreToProps)(HopComparisonPage);