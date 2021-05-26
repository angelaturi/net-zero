import React from 'react';
import Link from 'react-router-dom'

class PledgeItem extends React.Component {
    render() {
        debugger
        // let { pledge } = this.props.pledge;
        return(
            <div>
                <h3>{this.props.pledge.title}</h3>
                <p>{this.props.pledge.description}</p>
                <a href="#">View Pledge</a>
            </div>
        )
    }
}

export default PledgeItem;