//
import React from 'react';

class PledgeShow extends React.Component {
    constructor(props){
        super(props)

    }

    componentDidMount() {
        let pledgeId = this.props.match.params.pledgeId
        this.props.showPledge(pledgeId);
    }

    handleFollow(pledgeId) {
        //add userId to pledge follow array
        this.props.followPledge(pledgeId);
        //update state

    }

    render() {

        if (this.props.currentPledge) {
            return (
                <div>
                    <h1>{this.props.currentPledge.title}</h1>
                    <p>Category: {this.props.currentPledge.category}</p>
                    <img src={this.props.currentPledge.image} />
                    <p>{this.props.currentPledge.description}</p>
                    <p>{this.props.currentPledge.date}</p>
                    <button onClick={() => this.handleFollow(this.props.currentPledge._id)}>
                        Follow Pledge
                    </button>
                    <p>{this.props.currentPledge.follows.length} Followers</p> 
                    <h2>Comments</h2>

                    {
                        this.props.currentPledge.comments.map((comment) => (
                            <div>
                                <h3>{comment.author}</h3>
                                <p>{comment.content}</p>
                            </div>
                        ))
                    }
                </div>
            )
        } else {
            return (
                <div>
                </div>
            )
        }
        
    }
}

export default PledgeShow;