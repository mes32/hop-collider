import React, { Component } from 'react';
import { connect } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';
import LoadIcon from '@material-ui/icons/OpenInBrowser';
import moment from 'moment';

import IconButton from '../../IconButton/IconButton';

const POSTGRESQL_FORMAT = 'YYYY-MM-DDTHH:mm:ss.SSSZ';
const DATE_FORMAT = 'MMMM DD, YYYY';
const TIME_FORMAT = ' @ h:mm a';

const timeStampStyle = {
    fontWeight: 'bold',
    color: '#666666',
};

class HopComparisonRow extends Component {

    getCreatedAt = () => {
        const current = moment();
        const rawString = this.props.comparison.created_at;
        const timeStamp = moment(rawString, POSTGRESQL_FORMAT);

        let datePrinted = timeStamp.format(DATE_FORMAT);
        if (current.day() === timeStamp.day()) {
            datePrinted = 'Today';
        } else if (current.add(-1, 'days').day() === timeStamp.day()) {
            datePrinted = 'Yesterday';
        }

        return {
            date: datePrinted,
            time: timeStamp.format(TIME_FORMAT),
        }
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
        const timeStamp = this.getCreatedAt();
        return (
            <tr>
                <td><span style={timeStampStyle}>{timeStamp.date}</span> {timeStamp.time}</td>
                <td>{this.listHops()}</td>
                <td>
                    <IconButton icon={<LoadIcon />} onClick={this.load} />
                </td>
                <td>
                    <IconButton icon={<DeleteIcon />} onClick={this.delete} />
                </td>
            </tr>
        );
    }
}

const mapReduxStoreToProps = (reduxStore) => ({ reduxStore });
export default connect(mapReduxStoreToProps)(HopComparisonRow);