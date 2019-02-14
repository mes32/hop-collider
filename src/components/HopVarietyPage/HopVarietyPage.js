import React, { Component } from 'react';
import { connect } from 'react-redux';

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
        // Note: used some example code from stackoverflow.com for this check on URL changes
        // https://stackoverflow.com/questions/52252353/re-render-same-component-on-url-change-in-react
        // user: c6754
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.fetchHop();
        } else if (this.props.reduxStore.focusHop !== prevProps.reduxStore.focusHop) {
            this.setState(this.props.reduxStore.focusHop);
        }
    }

    getCountry = () => {
        if (this.state.country !== '') {
            return <h3>{this.state.country}</h3>;
        }
    }

    render() {
        return (
            <div>
                <h2>{this.state.variety_name}</h2>
                {this.getCountry()}
            </div>
        );
    }
}

const mapReduxStoreToProps = (reduxStore) => ({reduxStore});
export default connect(mapReduxStoreToProps)(HopVarietyPage);