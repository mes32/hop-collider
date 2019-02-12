import React, { Component } from 'react';
import { connect } from 'react-redux';

import './AddHopPage.css';
import BrewingRoleSelector from '../BrewingRoleSelector/BrewingRoleSelector';
import CountrySelector from '../CountrySelector/CountrySelector';

class AddHopPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            variety_name: null,
            country_id: null,
            aromas: null,
            brewing_role_id: null,
            alpha_acid_min: null,
            alpha_acid_max: null,
            beta_acid_min: null,
            beta_acid_max: null,
            cohumulone_min: null,
            cohumulone_max: null,
            total_oil_min: null,
            total_oil_max: null,
            beta_pinene_min: null,
            beta_pinene_max: null,
            myrcene_min: null,
            myrcene_max: null,
            linalool_min: null,
            linalool_max: null,
            caryophyllene_min: null,
            caryophyllene_max: null,
            farnesene_min: null,
            farnesene_max: null,
            humulene_min: null,
            humulene_max: null,
            geraniol_min: null,
            geraniol_max: null,
            selinene_min: null,
            selinene_max: null,
            other_oils_min: null,
            other_oils_max: null
        };
    }

    changeInput = (event) => {
        let newValue = event.target.value;
        if (newValue === '') {
            newValue = null;
        }
        this.setState({
            ...this.state,
            [event.target.name]: newValue
        });
    }

    submit = (event) => {
        event.preventDefault();
        const action = {
            type: 'ADD_HOP',
            payload: this.state,
        };
        this.props.dispatch(action);
    }

    setCountry = (newID) => {
        this.setState({
            ...this.state,
            country_id: newID
        });
    }

    setBrewingRole = (newID) => {
        this.setState({
            ...this.state,
            brewing_role_id: newID
        });
    }

    render() {
        return (
            <div>
                <h2>Add Hop Variety</h2>
                <form onSubmit={this.submit} className="add-hop-form">
                    <input onChange={this.changeInput} name="variety_name" placeholder="Variety Name" type="text" required />
                    <CountrySelector setCountry={this.setCountry} />
                    <input onChange={this.changeInput} name="aromas" placeholder="Aroma Descriptors" type="text" />
                    <BrewingRoleSelector setBrewingRole={this.setBrewingRole} />
                    <input onChange={this.changeInput} name="alpha_acid_min" placeholder="Alpha Acid (min)" type="number" step="0.001" />
                    <input onChange={this.changeInput} name="alpha_acid_max" placeholder="Alpha Acid (max)" type="number" step="0.001" />
                    <input onChange={this.changeInput} name="beta_acid_min" placeholder="Beta Acid (min)" type="number" step="0.001" />
                    <input onChange={this.changeInput} name="beta_acid_max" placeholder="Beta Acid (max)" type="number" step="0.001" />
                    <input onChange={this.changeInput} name="cohumulone_min" placeholder="Cohumulone (min)" type="number" step="0.001" />
                    <input onChange={this.changeInput} name="cohumulone_max" placeholder="Cohumulone (max)" type="number" step="0.001" />
                    <input onChange={this.changeInput} name="total_oil_min" placeholder="Total Oil (min)" type="number" step="0.001" />
                    <input onChange={this.changeInput} name="total_oil_max" placeholder="Total Oil (max)" type="number" step="0.001" />
                    <input onChange={this.changeInput} name="beta_pinene_min" placeholder="Beta Pinene (min)" type="number" step="0.001" />
                    <input onChange={this.changeInput} name="beta_pinene_max" placeholder="Beta Pinene (max)" type="number" step="0.001" />
                    <input onChange={this.changeInput} name="myrcene_min" placeholder="Myrcene (min)" type="number" step="0.001" />
                    <input onChange={this.changeInput} name="myrcene_max" placeholder="Myrcene (max)" type="number" step="0.001" />
                    <input onChange={this.changeInput} name="linalool_min" placeholder="Linalool (min)" type="number" step="0.001" />
                    <input onChange={this.changeInput} name="linalool_max" placeholder="Linalool (max)" type="number" step="0.001" />
                    <input onChange={this.changeInput} name="caryophyllene_min" placeholder="Caryophyllene (min)" type="number" step="0.001" />
                    <input onChange={this.changeInput} name="caryophyllene_max" placeholder="Caryophyllene (max)" type="number" step="0.001" />
                    <input onChange={this.changeInput} name="farnesene_min" placeholder="Farnesene (min)" type="number" step="0.001" />
                    <input onChange={this.changeInput} name="farnesene_max" placeholder="Farnesene (max)" type="number" step="0.001" />
                    <input onChange={this.changeInput} name="humulene_min" placeholder="Humulene (min)" type="number" step="0.001" />
                    <input onChange={this.changeInput} name="humulene_max" placeholder="Humulene (max)" type="number" step="0.001" />
                    <input onChange={this.changeInput} name="geraniol_min" placeholder="Geraniol (min)" type="number" step="0.001" />
                    <input onChange={this.changeInput} name="geraniol_max" placeholder="Geraniol (max)" type="number" step="0.001" />
                    <input onChange={this.changeInput} name="selinene_min" placeholder="Selinene (min)" type="number" step="0.001" />
                    <input onChange={this.changeInput} name="selinene_max" placeholder="Selinene (max)" type="number" step="0.001" />
                    <input onChange={this.changeInput} name="other_oils_min" placeholder="Other Oils (min)" type="number" step="0.001" />
                    <input onChange={this.changeInput} name="other_oils_max" placeholder="Other Oils (max)" type="number" step="0.001" />
                    <input type="submit" />
                </form>
            </div>
        );
    }
}

export default connect()(AddHopPage);