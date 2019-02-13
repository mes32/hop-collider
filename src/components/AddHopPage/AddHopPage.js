import React, { Component } from 'react';
import { connect } from 'react-redux';

import './AddHopPage.css';
import BrewingRoleSelector from '../BrewingRoleSelector/BrewingRoleSelector';
import CountrySelector from '../CountrySelector/CountrySelector';

const DEFAULT_STATE = {
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

class AddHopPage extends Component {
    constructor(props) {
        super(props);
        this.state = DEFAULT_STATE;
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        if (id) {
            const action = { type: 'FETCH_FOCUS_HOP', payload: id };
            this.props.dispatch(action);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const prevHop = prevProps.reduxStore.focusHop;
        const focusHop = this.props.reduxStore.focusHop;
        if (focusHop !== prevHop) {
            this.loadState(focusHop);
        }
    }

    loadState = (focusHop) => {
        if (focusHop) {
            let newState = focusHop;
            for (let attribute in newState) {
                if (newState[attribute] === null) {
                    newState[attribute] = '';
                }
            }
            this.setState({
                ...newState
            });
        }
    }

    getHeading = () => {
        if (this.props.match.params.id) {
            return `Update Hop: ${this.props.reduxStore.focusHop.variety_name}`;
        } else {
            return 'Add Hop Variety';
        }
    }

    getSubmitText = () => {
        if (this.props.match.params.id) {
            return 'Update Hop';
        } else {
            return 'Add Hop';
        }
    }

    changeInput = (event) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        });
    }

    submit = (event) => {
        event.preventDefault();
        let hopToSend = this.state;
        for (let attribute in hopToSend) {
            if (hopToSend[attribute] === '') {
                hopToSend[attribute] = null;
            } 
        }
        if (this.props.match.params.id) {
            const action = {
                type: 'UPDATE_HOP',
                payload: hopToSend,
            };
            this.props.dispatch(action);
        } else {
            const action = {
                type: 'ADD_HOP',
                payload: hopToSend,
            };
            this.props.dispatch(action);
        }
        this.setState(DEFAULT_STATE);
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
                <h2>{this.getHeading()}</h2>
                <form onSubmit={this.submit} className="add-hop-form">
                    <input onChange={this.changeInput} value={this.state.variety_name} name="variety_name" placeholder="Variety Name" type="text" required />
                    <CountrySelector setCountry={this.setCountry} value={this.state.country_id} />
                    <input onChange={this.changeInput} value={this.state.aromas} name="aromas" placeholder="Aroma Descriptors" type="text" />
                    <BrewingRoleSelector setBrewingRole={this.setBrewingRole} value={this.state.brewing_role_id} />
                    <input onChange={this.changeInput} value={this.state.alpha_acid_min} name="alpha_acid_min" placeholder="Alpha Acid (min)" type="number" step="0.001" />
                    <input onChange={this.changeInput} value={this.state.alpha_acid_max} name="alpha_acid_max" placeholder="Alpha Acid (max)" type="number" step="0.001" />
                    <input onChange={this.changeInput} value={this.state.beta_acid_min} name="beta_acid_min" placeholder="Beta Acid (min)" type="number" step="0.001" />
                    <input onChange={this.changeInput} value={this.state.beta_acid_max} name="beta_acid_max" placeholder="Beta Acid (max)" type="number" step="0.001" />
                    <input onChange={this.changeInput} value={this.state.cohumulone_min} name="cohumulone_min" placeholder="Cohumulone (min)" type="number" step="0.001" />
                    <input onChange={this.changeInput} value={this.state.cohumulone_max} name="cohumulone_max" placeholder="Cohumulone (max)" type="number" step="0.001" />
                    <input onChange={this.changeInput} value={this.state.total_oil_min} name="total_oil_min" placeholder="Total Oil (min)" type="number" step="0.001" />
                    <input onChange={this.changeInput} value={this.state.total_oil_max} name="total_oil_max" placeholder="Total Oil (max)" type="number" step="0.001" />
                    <input onChange={this.changeInput} value={this.state.beta_pinene_min} name="beta_pinene_min" placeholder="Beta Pinene (min)" type="number" step="0.001" />
                    <input onChange={this.changeInput} value={this.state.beta_pinene_max} name="beta_pinene_max" placeholder="Beta Pinene (max)" type="number" step="0.001" />
                    <input onChange={this.changeInput} value={this.state.myrcene_min} name="myrcene_min" placeholder="Myrcene (min)" type="number" step="0.001" />
                    <input onChange={this.changeInput} value={this.state.myrcene_max} name="myrcene_max" placeholder="Myrcene (max)" type="number" step="0.001" />
                    <input onChange={this.changeInput} value={this.state.linalool_min} name="linalool_min" placeholder="Linalool (min)" type="number" step="0.001" />
                    <input onChange={this.changeInput} value={this.state.linalool_max} name="linalool_max" placeholder="Linalool (max)" type="number" step="0.001" />
                    <input onChange={this.changeInput} value={this.state.caryophyllene_min} name="caryophyllene_min" placeholder="Caryophyllene (min)" type="number" step="0.001" />
                    <input onChange={this.changeInput} value={this.state.caryophyllene_max} name="caryophyllene_max" placeholder="Caryophyllene (max)" type="number" step="0.001" />
                    <input onChange={this.changeInput} value={this.state.farnesene_min} name="farnesene_min" placeholder="Farnesene (min)" type="number" step="0.001" />
                    <input onChange={this.changeInput} value={this.state.farnesene_max} name="farnesene_max" placeholder="Farnesene (max)" type="number" step="0.001" />
                    <input onChange={this.changeInput} value={this.state.humulene_min} name="humulene_min" placeholder="Humulene (min)" type="number" step="0.001" />
                    <input onChange={this.changeInput} value={this.state.humulene_max} name="humulene_max" placeholder="Humulene (max)" type="number" step="0.001" />
                    <input onChange={this.changeInput} value={this.state.geraniol_min} name="geraniol_min" placeholder="Geraniol (min)" type="number" step="0.001" />
                    <input onChange={this.changeInput} value={this.state.geraniol_max} name="geraniol_max" placeholder="Geraniol (max)" type="number" step="0.001" />
                    <input onChange={this.changeInput} value={this.state.selinene_min} name="selinene_min" placeholder="Selinene (min)" type="number" step="0.001" />
                    <input onChange={this.changeInput} value={this.state.selinene_max} name="selinene_max" placeholder="Selinene (max)" type="number" step="0.001" />
                    <input onChange={this.changeInput} value={this.state.other_oils_min} name="other_oils_min" placeholder="Other Oils (min)" type="number" step="0.001" />
                    <input onChange={this.changeInput} value={this.state.other_oils_max} name="other_oils_max" placeholder="Other Oils (max)" type="number" step="0.001" />
                    <input type="submit" value={this.getSubmitText()} />
                </form>
            </div>
        );
    }
}

const mapReduxStoreToProps = (reduxStore) => ({ reduxStore });
export default connect(mapReduxStoreToProps)(AddHopPage);