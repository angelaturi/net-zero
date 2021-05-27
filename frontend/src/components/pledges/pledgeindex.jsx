import React from 'react';
import { withRouter } from 'react-router-dom';
import {Link} from 'react-router-dom';


class PledgeIndex extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            pledges: []
        }
        this.handleFollow = this.handleFollow.bind(this);
    }

    handleFollow(pledgeId) {
        //add userId to pledge follow array
        this.props.followPledge(pledgeId);
        //update state

    }

    componentWillMount() {
        this.props.fetchPledges();
    }

    componentWillReceiveProps(newState) {
        this.setState({ pledges: newState.pledges });
    }

    render() {
        if (this.state.pledges.length === 0) {
            return (<div>There are no Pledges</div>)
        } else {
            return (
                <div>
                    <h2>Pledges</h2>
                    {this.state.pledges.map(pledge => (
                    <div>
                        <h3>{pledge.title}</h3>
                        <p>{pledge.description}</p>
                        <p>{pledge.follows.length} followers!</p>
                        <Link to={`/pledges/${pledge._id}`}>View Pledge</Link>
                        <button onClick={() => this.handleFollow(pledge._id)}>Follow Pledge</button>
                    </div>
                    ))}
                </div>
            )
        }
    }
}

export default withRouter(PledgeIndex);