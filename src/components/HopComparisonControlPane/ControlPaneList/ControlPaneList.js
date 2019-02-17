import React, { Component } from 'react';

import './ControlPaneList.css';
import ControlPaneRow from './ControlPaneRow/ControlPaneRow';

class ControlPaneList extends Component {
    render() {
        return (
            <div>
                <div className="hop-list-div">
                    <table className="hop-list-table">
                        <tbody>
                            {this.props.hops.map(
                                hop => <ControlPaneRow key={hop.id} hop={hop} addHop={this.props.addHop} />
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default ControlPaneList;