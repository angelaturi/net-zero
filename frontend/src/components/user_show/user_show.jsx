import React from 'react';
import "./user_show.css";
import { Link } from 'react-router-dom';

class UserShow extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userToShow: null,
            pledgesToShow: null,
        }
    }

    componentDidMount() {
        this.props.fetchUsers()
        .then((res) => {
            this.setState({
                userToShow: res.users.data.find((user) => user._id === this.props.showUserId)
            })
        });
        this.props.fetchPledges()
        .then((res) => {
            let pledges = res.pledges.data;
            pledges = pledges.filter((pledge) => {
                return pledge.follows.includes(this.props.showUserId)
            })
            this.setState({
                pledgesToShow: pledges,
            })
        });
    }

    componentDidUpdate(prevProps) {
        if (this.props.showUserId != prevProps.showUserId) {
            this.props.fetchUsers()
            .then((res) => {
                this.setState({
                    userToShow: res.users.data.find((user) => user._id === this.props.showUserId)
                })              
            });
            this.props.fetchPledges()
            .then((res) => {
                let pledges = res.pledges.data;
                pledges = pledges.filter((pledge) => {
                    return pledge.follows.includes(this.props.showUserId)
                })
                this.setState({
                    pledgesToShow: pledges,
                })
            });
        }
    }

    render(){

        let { userToShow } = this.state;
        let { pledgesToShow } = this.state;

        if (this.state.userToShow && this.state.pledgesToShow) {
            return (
                <div className="user-show">
                    <div className="profile-main">

                        <h1>
                            {userToShow.handle}'s Pledges
                        </h1>
                        <h2>Followed Pledges</h2>
                            {pledgesToShow.map((pledge) => {
                                
                                return (
                                    <div className="pledge-item" key={pledge._id}>
                                        <div className="pledge-item-content">
                                            <h3>
                                                {pledge.title}
                                            </h3>
                                            <p>
                                                {pledge.description}
                                            </p>
                                        </div>
                                        
                                        <Link to={`/pledges/${pledge._id}`}>
                                            <button>
                                                View
                                            </button>
                                        </Link>
                                    </div>
                                    )
                                })}
                    </div>
                </div>
            )
        } else if (this.state.userToShow) {
            return (
                <div className="user-show">
                     <div className="profile-main">
                        <h1>
                            {userToShow.handle}
                        </h1>
                        <h2>
                            Followed Pledges
                        </h2>
                        <p>This user has no followed pledges!</p>
                     </div>
                    
                </div>
            )
        } else {
            return (
                <div className="user-show">
                    
                </div>
            )
        }
    }
}

export default UserShow;