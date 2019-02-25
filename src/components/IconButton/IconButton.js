import React, { Component } from 'react';

import './IconButton.css';

class IconButton extends Component {

    render() {
        return (
            <button onClick={this.props.onClick} className="icon-button">
                {this.props.icon}
            </button>
        );
    }
}

export default IconButton;