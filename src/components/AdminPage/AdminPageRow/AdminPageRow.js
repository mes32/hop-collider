import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class AdminPageRow extends Component {

    // When the 'Edit' button is pressed send the browser to the AddHopPage with 
    // this row's hop data loaded.
    editHop = (event) => {
        this.props.history.push(`/update_hop/${this.props.hop.id}`);
    }

    // When the 'Delete' button is pressed, dispatch a request to remove this 
    // hop from the database.
    deleteHop = (event) => {
        const action = {
            type: 'DELETE_HOP',
            payload: this.props.hop
        };
        this.props.dispatch(action);
    }

    // Show this component on the DOM
    render() {
        const hop = this.props.hop;
        const aboutURL = `/hops/${hop.id}`;
        return (
            <tr>
                <td>{hop.id}</td>
                <td>{hop.variety_name}</td>
                <td>{hop.country}</td>
                <td>{hop.comparison_popularity}</td>
                <td>
                    <Link to={aboutURL}>
                        about
                    </Link>
                </td>
                <td>
                    <button onClick={this.editHop}>
                        edit
                    </button>
                </td>
                <td>
                    <button onClick={this.deleteHop}>
                        delete
                    </button>
                </td>
            </tr>
        );
    }
}

export default connect()(AdminPageRow);