import React, { Component } from 'react';
import { connect } from 'react-redux';

import './HopComparisonPage.css';
import DeleteHopBar from './DeleteHopBar/DeleteHopBar';
import HopComparisonControlPane from '../HopComparisonControlPane/HopComparisonControlPane';
import HopCompoundChart from '../HopCompoundChart/HopCompoundChart';

class HopComparisonPage extends Component {

    // When this component mounts request list of all hops
    componentDidMount() {
        const action = { type: 'FETCH_HOPS' };
        this.props.dispatch(action);
    }

    // Save the current hop comparison analysis to the users account
    saveComparison = (event) => {
        if (this.props.reduxStore.selectedHops.length > 0) {
            const action = {
                type: 'SAVE_HOP_COMPARISON',
                payload: {
                    selectedHops: this.props.reduxStore.selectedHops
                }
            };
            this.props.dispatch(action);
        }
    } 

    // Add a note to the current hop comparison analysis
    // addNote = (event) => {
    //     console.log('addNote()');
    // }

    // Show this component on the DOM
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
                    {/* <button onClick={this.addNote}>
                        Add Note
                    </button> */}
                    <h2>Hop Comparison</h2>
                    <HopCompoundChart data={this.props.reduxStore.datasets.alphaAcid} />
                    <HopCompoundChart data={this.props.reduxStore.datasets.betaAcid} />
                    <HopCompoundChart data={this.props.reduxStore.datasets.cohumulone} />
                    <HopCompoundChart data={this.props.reduxStore.datasets.total_oil} />
                    <HopCompoundChart data={this.props.reduxStore.datasets.myrcene} />
                    <HopCompoundChart data={this.props.reduxStore.datasets.humulene} />
                    <HopCompoundChart data={this.props.reduxStore.datasets.caryophyllene} />
                    <HopCompoundChart data={this.props.reduxStore.datasets.farnesene} />
                </div>
                <DeleteHopBar />
            </div>
        );
    }
}

const mapReduxStoreToProps = (reduxStore) => ({ reduxStore });
export default connect(mapReduxStoreToProps)(HopComparisonPage);