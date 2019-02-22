import React, { Component } from 'react';
import { connect } from 'react-redux';

// A drop down menu that allows the user to select a country of origin for a hop
class CountrySelector extends Component {

    // When this component mounds dispatch a request to the server for a list of
    // selectable countries. A list of possible countries of origin.
    componentDidMount() {
        const action = { type: 'FETCH_COUNTRIES' };
        this.props.dispatch(action);
    }

    // Select a country of origin for this hop
    selected = (event) => {
        this.props.setCountry(event.target.value);
    }

    // Show this component on the DOM
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