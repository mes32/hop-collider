import React, { Component } from 'react';
import { connect } from 'react-redux';

import AdminPageRow from './AdminPageRow/AdminPageRow';

class AdminPage extends Component {

    componentDidMount() {
        const action = { type: 'FETCH_HOPS' };
        this.props.dispatch(action);
    }

    addHop = (event) => {
        console.log(' - Pressed add hop variety button');
    }

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
                            <th>About</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.reduxStore.hops.map(hop =>
                            <AdminPageRow key={hop.id} hop={hop} />
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapReduxStoreToProps = (reduxStore) => ({reduxStore});
export default connect(mapReduxStoreToProps)(AdminPage);