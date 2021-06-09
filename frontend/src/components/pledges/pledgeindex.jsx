import React from 'react';
import { withRouter } from 'react-router-dom';
import {Link} from 'react-router-dom';


class PledgeIndex extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            pledges: []
        }
        this.toggleFollow = this.toggleFollow.bind(this);
    }

    toggleFollow(pledge) {
        //add userId to pledge follow array
        if (pledge.follows.includes(this.props.currentUser.id)) {
            this.props.unfollowPledge(pledge._id);
        } else {
            this.props.followPledge(pledge._id);
        }
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
                    <div className="feedItem">
                        <p>By {pledge.user.handle}</p>
                        <div className="pledge-title">{pledge.title}</div>
                        <div className="pledge-description">{pledge.description}</div>
                        <p>{pledge.follows.length} followers!</p>
                        <p>{pledge.category}</p> 
                        <Link className="pledge-index-link" style={{ textDecoration: 'none' }}  to={`/pledges/${pledge._id}`}>View Pledge</Link>
                        <button className="follow-button" onClick={() => this.toggleFollow(pledge)}>
                            { pledge.follows.includes(this.props.currentUser.id) ? "Unfollow Pledge" : "Follow Pledge" }

                        </button>
                    </div>
                    ))}
                </div>
            )
        }
    }
}

export default withRouter(PledgeIndex);