import React, { Component } from 'react';
import { connect } from 'react-redux';

import './ControlPaneFilter.css';

class ControlPaneFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOrder: 'Alphabetical'
        };
    }

    changeOrder = (event) => {
        console.log(`event.target.name: ${event.target.name}`)
        if (event.target.value === 'Alphabetical') {
            this.setState({
                selectedOrder: 'Alphabetical'
            });
            const action = { type: 'FETCH_HOPS' };
            this.props.dispatch(action);
        } else if (event.target.value === 'Popularity') {
            this.setState({
                selectedOrder: 'Popularity'
            });
            const action = { type: 'FETCH_HOPS_POPULARITY' };
            this.props.dispatch(action);
        }
    }

    render() {
        return (
            <div className="control-pane-filter">
                <h5>Order Hops:</h5>
                <form className="control-pane-filter-radios">
                    <label>
                        <input
                            type="radio"
                            name="react-tips"
                            value="Alphabetical"
                            onChange={this.changeOrder}
                            checked={this.state.selectedOrder === 'Alphabetical'}
                            className="form-check-input"
                        />
                        Alphabetical
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="react-tips"
                            value="Popularity"
                            onChange={this.changeOrder}
                            checked={this.state.selectedOrder === 'Popularity'}
                            className="form-check-input"
                        />
                        Popularity
                    </label>
                </form>
            </div>
        );
    }
}

export default connect()(ControlPaneFilter);