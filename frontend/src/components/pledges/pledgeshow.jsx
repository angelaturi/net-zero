//

import React from 'react';
import './pledges.css'

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
        this.convertDate = this.convertDate.bind(this)
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

    convertDate = dateTime => {
    let dateObject = new Date(dateTime);
    const dateOptions = { month: 'numeric', day: 'numeric', year: 'numeric' };
    let date = dateObject.toLocaleDateString('en-US', dateOptions);
    const now = new Date();
    const dateObj = new Date(date);
    if ((now.getDate() === dateObj.getDate()) && (now.getMonth() === dateObj.getMonth()) && (now.getYear() === dateObj.getFullYear())) {
        return `Today`;
    }
    if ((now.getDate() - dateObj.getDate() === 1) || (now.getMonth() - dateObj.getMonth() === 1) || (now.getYear() - dateObj.getFullYear() === 1)) {
        return `Yesterday`;
    }
    return date;
    };

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
                <div className="pledge-show-card">
                    <button className="pledge-show-follow-button" onClick={() => this.handleFollow(this.props.currentPledge._id)}>
                        {this.state.followed ? "Followed!": "Follow Pledge" }
                    </button>
                    <div className="pledge-show-followers">{this.props.currentPledge.follows.length} people follow this pledge</div> 
                     {this.props.currentPledge.user &&
                            <p>By {this.props.currentPledge.user.name}</p>
                        }
                    <div className="pledge-show-date">Pledged {this.convertDate(this.props.currentPledge.date)}</div>
                    
                    <div className="pledge-show-title">{this.props.currentPledge.title}</div>
                    {/* <div>Category÷: {this.props.currentPledge.category}</div> */}
                    <div className="pledge-show-description">{this.props.currentPledge.description}</div>
                    <img className="pledge-show-img" src={this.props.currentPledge.image} />
                    <div className="pledge-show-comment-title">Comments</div>
                    <form onSubmit={this.handleSubmit}>
                        <input 
                            className="pledge-show-comment-input"
                            type="textarea"
                            value={this.state.text}
                            onChange={this.update()}
                            placeholder="Leave a comment..."
                        />
                        <br />
                        <input className="pledge-show-submit-comment" type="submit" value="Submit Comment" />
                    </form>
                    <div className="pledge-show-border"></div>
                    
                    {
                        this.props.currentPledge.comments.map((comment) => (
                            <div>
                                <div className="comment-username"><u>{comment.authorName}</u></div>
                                <div className="comment-text">{comment.text}</div>
                                <div className="pledge-show-border"></div>
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