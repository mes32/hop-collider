import React, { Component } from 'react';
import { connect } from 'react-redux';

class HopListPage extends Component {

    componentDidMount() {
        const action = { type: 'FETCH_HOPS' };
        this.props.dispatch(action);
    }

    render() {
        return (
            <div>
                <h2>Hop List Page</h2>
                {JSON.stringify(this.props.reduxStore.hops)}
            </div>
        );
    }
}

const mapReduxStoreToProps = (reduxStore) => ({reduxStore}); 
export default connect(mapReduxStoreToProps)(HopListPage);
