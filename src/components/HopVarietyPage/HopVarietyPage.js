import React, { Component } from 'react';
import { connect } from 'react-redux';

class HopVarietyPage extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            hop: {
                variety_name: '[ Hop Variety Name ]',
                country: '[ Country of Origin ]',
                aromas: '[ aromas ]'
            }
        };
    }

    componentDidMount() {
        const action = { type: 'FETCH_HOPS' };
        this.props.dispatch(action);
        const id = this.props.match.params.id;
        console.log('id:', id);
        const hops = this.props.reduxStore.hops;
        console.log('hop:', hops);
        // this.setState({
        //     hop: hop
        // });
    }

    // Needs some life-cycle function love
    // propsDidChange()

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