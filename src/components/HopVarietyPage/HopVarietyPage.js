import React, { Component } from 'react';
import { connect } from 'react-redux';

import './HopVarietyPage.css';

const DEFAULT_HOP = {
    variety_name: '[ Hop Variety Name ]',
    country: null,
    aromas: null,
    brewing_role: null,
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
}

class HopVarietyPage extends Component {
    
    constructor(props) {
        super(props);
        this.state = DEFAULT_HOP;
    }

    fetchHop = () => {
        const id = this.props.match.params.id;
        const action = { type: 'FETCH_FOCUS_HOP', payload: id };
        this.props.dispatch(action);
    }

    componentDidMount() {
        this.fetchHop();
    }

    componentDidUpdate(prevProps, prevState) {
        // Note: I used some example code from stackoverflow.com for this check on URL changes
        // https://stackoverflow.com/questions/52252353/re-render-same-component-on-url-change-in-react
        // user: c6754
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.fetchHop();
        } else if (this.props.reduxStore.focusHop !== prevProps.reduxStore.focusHop) {
            this.setState(this.props.reduxStore.focusHop);
        }
    }

    getCountry = () => {
        if (this.state.country) {
            return (<h3>{this.state.country}</h3>);
        }
    }

    getAromas = () => {
        if (this.state.aromas) {
            return (
                <div>
                    <h4>Aroma Profile:</h4>
                    <p>{this.state.aromas}</p>
                </div>
            );
        }
    }

    getUsage = () => {
        if (this.state.brewing_role) {
            return (
                <div>
                    <h4>Typical Usage:</h4>
                    <p>{this.state.brewing_role}</p>
                </div>
            );
        }
    }

    getDescription = () => {
        return (
            <p>
            Secondary fermentation degrees plato units of bitterness, cask conditioned ale ibu real ale pint glass craft beer. krausen goblet grainy ibu brewhouse lagering finishing hops. Trappist, black malt chocolate malt balthazar gravity dextrin saccharification trappist final gravity. Aau scotch ale, adjunct. hops bung infusion, cask conditioning pitching malt extract.
            </p>
        );
    }

    displayRange = (label, min, max) => {
        if (min && max) {
            return (
                <p><span className="bold-text">{label}:</span> {Number(min).toFixed(1)} - {Number(max).toFixed(1)}</p>
            );
        } else if (min) {
            return (
                <p><span className="bold-text">{label}:</span> {Number(min).toFixed(1)}</p>
            );
        }
    }

    displayOilCompositionRow = (label, min, max) => {
        if (min && max) {
            return (
                <tr>
                    <td><span className="bold-text">{label}</span></td>
                    <td>{Number(min).toFixed(1)}</td>
                    <td>-</td>
                    <td>{Number(max).toFixed(1)}</td>
                    <td>% of total oil</td>
                </tr>
            );
        } else if (min) {
            return (
                <tr>
                    <td><span className="bold-text">{label}</span></td>
                    <td>{Number(min).toFixed(1)}</td>
                    <td></td>
                    <td></td>
                    <td>% of total oil</td>
                </tr>
            );
        }
    }

    render() {
        return (
            <div>
                <h2>{this.state.variety_name}</h2>
                {this.getCountry()}
                {this.getAromas()}
                {this.getUsage()}
                {this.getDescription()}
                {this.displayRange('Alpha Acid (%)', this.state.alpha_acid_min, this.state.alpha_acid_max)}
                {this.displayRange('Beta Acid (%)', this.state.beta_acid_min, this.state.beta_acid_max)}
                {this.displayRange('Cohumulone (% of Alpha Acid)', this.state.cohumulone_min, this.state.cohumulone_max)}
                {this.displayRange('Total Oil (mL/100g)', this.state.total_oil_min, this.state.total_oil_max)}
                <h3>Essential Oil Composition</h3>
                <table className="oil-composition-table">
                    <tbody>
                        {this.displayOilCompositionRow('B-pinene', this.state.beta_pinene_min, this.state.beta_pinene_max)}
                        {this.displayOilCompositionRow('Myrcene', this.state.myrcene_min, this.state.myrcene_max)}
                        {this.displayOilCompositionRow('Linalool', this.state.linalool_min, this.state.linalool_max)}
                        {this.displayOilCompositionRow('Caryophyllene', this.state.caryophyllene_min, this.state.caryophyllene_max)}
                        {this.displayOilCompositionRow('Farnesene', this.state.farnesene_min, this.state.farnesene_max)}
                        {this.displayOilCompositionRow('Geraniol', this.state.geraniol_min, this.state.geraniol_max)}
                        {this.displayOilCompositionRow('Selinene', this.state.selinene_min, this.state.selinene_max)}
                        {this.displayOilCompositionRow('Other Oils', this.state.other_oils_min, this.state.other_oils_max)}
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapReduxStoreToProps = (reduxStore) => ({reduxStore});
export default connect(mapReduxStoreToProps)(HopVarietyPage);