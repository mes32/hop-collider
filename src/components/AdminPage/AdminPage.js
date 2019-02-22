import React, { Component } from 'react';
import { connect } from 'react-redux';

import AdminPageRow from './AdminPageRow/AdminPageRow';

class AdminPage extends Component {

    // When this component mounts request data for all hops from the server
    componentDidMount() {
        const action = { type: 'FETCH_HOPS' };
        this.props.dispatch(action);
    }

    // Send the browser to the AddHopPage
    addHop = (event) => {
        this.props.history.push('/add_hop');
    }

    // Show this component on the DOM
    render() {
        return (
            <div>
                <h2>Admin Page</h2>
                <h3>Hop Varieties</h3>
                <button onClick={this.addHop}>
                    Add Hop Variety
                </button>
                <table>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Variety Name</th>
                            <th>Country of Origin</th>
                            <th>Popularity</th>
                            <th>About</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.reduxStore.hops.map(hop =>
                            <AdminPageRow key={hop.id} history={this.props.history} hop={hop} />
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapReduxStoreToProps = (reduxStore) => ({reduxStore});
export default connect(mapReduxStoreToProps)(AdminPage);