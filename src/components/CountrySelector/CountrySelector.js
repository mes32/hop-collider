import React, { Component } from 'react';
import { connect } from 'react-redux';

class CountrySelector extends Component {

    componentDidMount() {
        const action = { type: 'FETCH_COUNTRIES' };
        this.props.dispatch(action);
    }

    selected = (event) => {
        this.props.setCountry(event.target.value);
    }

    render() {
        return (
            <select onChange={this.selected} value={this.props.value}>
                <option value="" disabled hidden>( Select a Country of Origin )</option>
                {this.props.reduxStore.countries.map(
                    (country) => <option key={country.id} value={country.id}>{country.country_name}</option>
                )}
            </select>
        );
    }
}

const mapReduxStoreToProps = (reduxStore) => ({ reduxStore });
export default connect(mapReduxStoreToProps)(CountrySelector);