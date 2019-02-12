import React, { Component } from 'react';
import { connect } from 'react-redux'

import './AddHopPage.css';
import BrewingRoleSelector from '../BrewingRoleSelector/BrewingRoleSelector';

class AddHopPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            variety_name: '',
            country_id: '',
            aromas: '',
            brewing_role_id: '',
            alpha_acid_min: '',
            alpha_acid_max: '',
            beta_acid_min: '',
            beta_acid_max: '',
            cohumulone_min: '',
            cohumulone_max: '',
            total_oil_min: '',
            total_oil_max: '',
            beta_pinene_min: '',
            beta_pinene_max: '',
            myrcene_min: '',
            myrcene_max: '',
            linalool_min: '',
            linalool_max: '',
            caryophyllene_min: '',
            caryophyllene_max: '',
            farnesene_min: '',
            farnesene_max: '',
            humulene_min: '',
            humulene_max: '',
            geraniol_min: '',
            geraniol_max: '',
            selinene_min: '',
            selinene_max: '',
            other_oils_min: '',
            other_oils_max: ''
        };
    }

    componentDidMount() {
        const action = { type: 'FETCH_HOPS' };
        this.props.dispatch(action);
    }

    changeInput = (event) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        });
    }

    submit = (event) => {
        event.preventDefault();
        console.log(' - in submit');
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
                {JSON.stringify(this.props.reduxStore.hopUsage)}
                <h2>Add Hop Variety</h2>
                <form onSubmit={this.submit} className="add-hop-form">
                    <input onChange={this.changeInput} name="variety_name" placeholder="Variety Name" type="text" required />
                    <input onChange={this.changeInput} name="country_id" placeholder="Country ID" type="text" />
                    <input onChange={this.changeInput} name="aromas" placeholder="Aroma Descriptors" type="text" />
                    {/* <input onChange={this.changeInput} name="brewing_role_id" placeholder="Brewing Role ID" type="text" /> */}
                    <BrewingRoleSelector setBrewingRole={this.setBrewingRole} />
                    <input onChange={this.changeInput} name="alpha_acid_min" placeholder="Alpha Acid (min)" type="text" />
                    <input onChange={this.changeInput} name="alpha_acid_max" placeholder="Alpha Acid (max)" type="text" />
                    <input onChange={this.changeInput} name="beta_acid_min" placeholder="Beta Acid (min)" type="text" />
                    <input onChange={this.changeInput} name="beta_acid_max" placeholder="Beta Acid (max)" type="text" />
                    <input onChange={this.changeInput} name="cohumulone_min" placeholder="Cohumulone (min)" type="text" />
                    <input onChange={this.changeInput} name="cohumulone_max" placeholder="Cohumulone (max)" type="text" />
                    <input onChange={this.changeInput} name="total_oil_min" placeholder="Total Oil (min)" type="text" />
                    <input onChange={this.changeInput} name="total_oil_max" placeholder="Total Oil (max)" type="text" />
                    <input onChange={this.changeInput} name="beta_pinene_min" placeholder="Beta Pinene (min)" type="text" />
                    <input onChange={this.changeInput} name="beta_pinene_max" placeholder="Beta Pinene (max)" type="text" />
                    <input onChange={this.changeInput} name="myrcene_min" placeholder="Myrcene (min)" type="text" />
                    <input onChange={this.changeInput} name="myrcene_max" placeholder="Myrcene (max)" type="text" />
                    <input onChange={this.changeInput} name="linalool_min" placeholder="Linalool (min)" type="text" />
                    <input onChange={this.changeInput} name="linalool_max" placeholder="Linalool (max)" type="text" />
                    <input onChange={this.changeInput} name="caryophyllene_min" placeholder="Caryophyllene (min)" type="text" />
                    <input onChange={this.changeInput} name="caryophyllene_max" placeholder="Caryophyllene (max)" type="text" />
                    <input onChange={this.changeInput} name="farnesene_min" placeholder="Farnesene (min)" type="text" />
                    <input onChange={this.changeInput} name="farnesene_max" placeholder="Farnesene (max)" type="text" />
                    <input onChange={this.changeInput} name="humulene_min" placeholder="Humulene (min)" type="text" />
                    <input onChange={this.changeInput} name="humulene_max" placeholder="Humulene (max)" type="text" />
                    <input onChange={this.changeInput} name="geraniol_min" placeholder="Geraniol (min)" type="text" />
                    <input onChange={this.changeInput} name="geraniol_max" placeholder="Geraniol (max)" type="text" />
                    <input onChange={this.changeInput} name="selinene_min" placeholder="Selinene (min)" type="text" />
                    <input onChange={this.changeInput} name="selinene_max" placeholder="Selinene (max)" type="text" />
                    <input onChange={this.changeInput} name="other_oils_min" placeholder="Other Oils (min)" type="text" />
                    <input onChange={this.changeInput} name="other_oils_max" placeholder="Other Oils (max)" type="text" />
                    <input type="submit" />
                </form>
            </div>
        );
    }
}

const mapReduxStoreToProps = (reduxStore) => ({reduxStore});
export default connect(mapReduxStoreToProps)(AddHopPage);