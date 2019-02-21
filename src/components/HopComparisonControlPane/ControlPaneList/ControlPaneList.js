import React, { Component } from 'react';
import { connect } from 'react-redux';

import './ControlPaneList.css';
import ControlPaneRow from './ControlPaneRow/ControlPaneRow';

class ControlPaneList extends Component {
    render() {
        return (
            <div>
                <div className="hop-list-div">
                    <table className="hop-list-table">
                        <tbody>
                            {this.props.reduxStore.hops.map(
                                hop => <ControlPaneRow key={hop.id} hop={hop} />
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

const mapReduxStoreToProps = (reduxStore) => ({ reduxStore });
export default connect(mapReduxStoreToProps)(ControlPaneList);