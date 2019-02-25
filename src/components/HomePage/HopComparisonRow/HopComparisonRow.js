import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

const POSTGRESQL_FORMAT = 'YYYY-MM-DDTHH:mm:ss.SSSZ';
const OUTPUT_FORMAT = 'DD MMMM YYYY @ h:mm a';

class HopComparisonRow extends Component {

    getCreatedAt = () => {
        const rawString = this.props.comparison.created_at;
        const timeStamp = moment(rawString, POSTGRESQL_FORMAT);
        return timeStamp.format(OUTPUT_FORMAT);
    }

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
                <td>{this.getCreatedAt()}</td>
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