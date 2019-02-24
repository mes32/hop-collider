import React, { Component } from 'react';
import { connect } from 'react-redux';
import SaveIcon from '@material-ui/icons/Save';


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

    disableSave = () => {
        if (this.props.reduxStore.selectedHops.length === 0) {
            return true;
        } else {
            return false;
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
                    {/* <button onClick={this.addNote}>
                        Add Note
                    </button> */}
                    <h2>Hop Comparison</h2>
                    <button onClick={this.saveComparison} disabled={this.disableSave()} className="save-comparison-button">
                        <SaveIcon /> &nbsp; Save
                    </button>
                    <HopCompoundChart title="Alpha Acid (% total)" data={this.props.reduxStore.datasets.alphaAcid} />
                    <HopCompoundChart title="Beta Acid (% total)" data={this.props.reduxStore.datasets.betaAcid} />
                    <HopCompoundChart title="Cohumulone (% of Alpha Acids)" data={this.props.reduxStore.datasets.cohumulone} />
                    <HopCompoundChart title="Total Oil (milliliters / 100 grams)" data={this.props.reduxStore.datasets.total_oil} />
                    <HopCompoundChart title="Myrcene (% oils)" data={this.props.reduxStore.datasets.myrcene} />
                    <HopCompoundChart title="Humulene (% oils)" data={this.props.reduxStore.datasets.humulene} />
                    <HopCompoundChart title="Caryophyllene (% oils)" data={this.props.reduxStore.datasets.caryophyllene} />
                    <HopCompoundChart title="Farnesene (% oils)"data={this.props.reduxStore.datasets.farnesene} />
                </div>
                <DeleteHopBar />
            </div>
        );
    }
}

const mapReduxStoreToProps = (reduxStore) => ({ reduxStore });
export default connect(mapReduxStoreToProps)(HopComparisonPage);