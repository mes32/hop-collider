import React, { Component } from 'react';
import { connect } from 'react-redux';

const DEFAULT_HOP = {
    variety_name: '[ Hop Variety Name ]',
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
}

class HopVarietyPage extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            hop: DEFAULT_HOP
        };
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        const action = { type: 'FETCH_FOCUS_HOP', payload: id };
        this.props.dispatch(action);
    }

    componentDidUpdate(prevProps, prevState) {
        const prevHop = prevProps.reduxStore.focusHop;
        const hop = this.props.reduxStore.focusHop;
        console.log('hop:', hop.variety_name);
        if (hop !== prevHop) {
            this.setState({
                hop: hop}
            );
        }
    }

    render() {
        return (
            <div>
                <h2>{this.state.hop.variety_name}</h2>
                <p>id: {JSON.stringify(this.props.match.params.id)}</p>
                <p>params: {JSON.stringify(this.props.match.params)}</p>
                <p>match: {JSON.stringify(this.props.match)}</p>
                <p>hop array: {JSON.stringify(this.props.reduxStore.hops)}</p>
            </div>
        );
    }
}

const mapReduxStoreToProps = (reduxStore) => ({reduxStore});
export default connect(mapReduxStoreToProps)(HopVarietyPage);