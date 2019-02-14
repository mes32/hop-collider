import React, { Component } from 'react';
import { connect } from 'react-redux';

import './HopListPage.css';
import HopListRow from './HopListRow/HopListRow';

class HopListPage extends Component {

    componentDidMount() {
        const action = { type: 'FETCH_HOPS' };
        this.props.dispatch(action);
    }

    render() {
        return (
            <div>
                <h2>Hop List</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Variety Name</th>
                            <th>Country of Origin</th>
                            <th>Aromas</th>
                            <th>Brewing Role</th>
                            <th>Alpha Acid (%)</th>
                            <th>About</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.reduxStore.hops.map(hop => 
                            <HopListRow key={hop.id} hop={hop} />    
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapReduxStoreToProps = (reduxStore) => ({reduxStore}); 
export default connect(mapReduxStoreToProps)(HopListPage);
