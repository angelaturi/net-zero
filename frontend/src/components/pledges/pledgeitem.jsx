import React from 'react';

class PledgeItem extends React.Component {
    render() {
        debugger
        // let { pledge } = this.props.pledge;
        return(
            <div>
                <h3>{this.props.pledge.title}</h3>
                <p>{this.props.pledge.description}</p>
            </div>
        )
    }
}

export default PledgeItem;