//
import React from 'react';

class PledgeShow extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            commentText: "",
            followed: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFollow = this.handleFollow.bind(this);
        this.update = this.update.bind(this);
    }

    componentDidMount() {
        let pledgeId = this.props.match.params.pledgeId
        this.props.showPledge(pledgeId);
            
    }

    componentWillReceiveProps(newState) {
        newState.currentPledge.follows.map((followerId) => {
            if (this.props.currentUser.id === followerId) {
                this.setState({followed: true});
            }
        })    
    }

    handleSubmit(e) {
        e.preventDefault();

        let comment = {
            text: this.state.text,
            authorName: this.props.currentUser.handle
        }

        this.props.commentOnPledge({
            pledgeId: this.props.match.params.pledgeId,
            ...comment
        })
    }

    handleFollow(pledgeId) {
        //add userId to pledge follow array
        this.props.followPledge(pledgeId)
        .then(() => {
            this.props.showPledge(pledgeId)
        });
        //update state
        this.setState({followed: true});
        this.props.showPledge(pledgeId);
    }

    update() {
        return e => this.setState({
            text: e.currentTarget.value
        });
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
                        {this.state.followed ? "Followed!": "Follow Pledge" }
                    </button>
                    <p>{this.props.currentPledge.follows.length} Followers</p> 
                    <h2>Comments</h2>
                    <form onSubmit={this.handleSubmit}>
                        <input 
                            type="textarea"
                            value={this.state.text}
                            onChange={this.update()}
                            placeholder="Leave a comment..."
                        />
                        <input type="submit" value="Submit Comment" />
                    </form>
                    
                    {
                        this.props.currentPledge.comments.map((comment) => (
                            <div>
                                <h3>{comment.authorName}</h3>
                                <p>{comment.text}</p>
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