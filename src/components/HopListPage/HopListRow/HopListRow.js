import React, { Component } from 'react';

class HopListRow extends Component {

    meanAlphaAcid = (hop) => {
        if (hop.alpha_acid_min && hop.alpha_acid_max) {
            const min = Number(hop.alpha_acid_min);
            const max = Number(hop.alpha_acid_max);
            return Number((min + max) / 2.0).toPrecision(2);
        } else {
            return undefined;
        }
    }

    render() {
        const hop = this.props.hop;
        const alphaAcid = this.meanAlphaAcid(hop);
        return (
            <tr>
                <td>{hop.id}</td>
                <td>{hop.variety_name}</td>
                <td>{hop.country}</td>
                <td>{hop.aromas}</td>
                <td>{hop.brewing_role}</td>
                <td>{alphaAcid}</td>
            </tr>
        );
    }
}

export default HopListRow;