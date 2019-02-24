import React, { Component } from 'react';
import { connect } from 'react-redux';

import './HomePage.css';

import HopComparisonRow from './HopComparisonRow/HopComparisonRow';
import LogOutButton from '../LogOutButton/LogOutButton';

class UserPage extends Component {

    componentDidMount() {
        const action = { type: 'FETCH_HOP_COMPARISONS' };
        this.props.dispatch(action);
    }

    render() {
        return (
            <div className="home-page-container">
                <div className="home-page">
                    <h1 id="welcome">
                        Welcome, <span id="welcome-name">{this.props.reduxStore.user.username}</span>.
                    </h1>
                    <h5 className="user-id-heading">User ID number: {this.props.reduxStore.user.id}</h5>
                    <LogOutButton className="log-in" />
                    <div id="saved-hop-comparisons">
                        <h2>Saved Hop Comparisons</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Date Created</th>
                                    <th>Hops Compared</th>
                                    <th>Load</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.reduxStore.hopComparisons.map(comparison => 
                                    <HopComparisonRow key={comparison.id} comparison={comparison} history={this.props.history} />
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapReduxStoreToProps = reduxStore => ({
  reduxStore: reduxStore,
//   user: reduxStore.user,
});

// this allows us to use <App /> in index.js
export default connect(mapReduxStoreToProps)(UserPage);
