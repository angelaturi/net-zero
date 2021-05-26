import React from 'react';
import {Link} from 'react-router-dom';

class PledgeItem extends React.Component {
    render() {
        
        // let { pledge } = this.props.pledge;
        return(
            <div>
                <h3>{this.props.pledge.title}</h3>
                <p>{this.props.pledge.description}</p>
                <Link to={`/pledges/${this.props.pledge._id}`}>View Pledge</Link>
            </div>
        )
    }
}

export default PledgeItem;