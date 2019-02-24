import React, { Component } from 'react';
import { connect } from 'react-redux';

class HopComparisonRow extends Component {

    listHops = () => {
        const hops = this.props.comparison.hops;
        if (hops.length === 0) {
            return '';
        } else {
            let hopString = hops[0].variety_name;
            for (let i = 1; i < hops.length; i++) {
                hopString += `, ${hops[i].variety_name}`
            }
            return hopString;
        }
    }

    load = () => {
        const action = {
            type: 'LOAD_HOP_COMPARISON',
            payload: this.props.comparison
        };
        this.props.dispatch(action);
        this.props.history.push('/hop_comparison');
    }

    delete = () => {
        const action = {
            type: 'DELETE_HOP_COMPARISON',
            payload: this.props.comparison
        };
        this.props.dispatch(action);
    }

    render() {
        return (
            <tr>
                <td>{this.props.comparison.created_at}</td>
                <td>{this.listHops()}</td>
                <td>
                    <button onClick={this.load}>
                        Load
                    </button>
                </td>
                <td>
                    <button onClick={this.delete}>
                        Delete
                    </button>        
                </td>
            </tr>
        );
    }
}

const mapReduxStoreToProps = (reduxStore) => ({ reduxStore });
export default connect(mapReduxStoreToProps)(HopComparisonRow);