import React from 'react';
import "./user_show.css";

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
                    <h1>
                        {userToShow.handle}
                    </h1>
                    <h2>Followed Pledges</h2>
                        {pledgesToShow.map((pledge) => {
                            
                            return (
                                <div key={pledge._id}>
                                    {pledge.title}
                                </div>
                                )
                            })}
                </div>
            )
        } else if (this.state.userToShow) {
            return (
                <div className="user-show">
                    <h1>
                        {userToShow.handle}
                    </h1>
                    <h2>
                        Followed Pledges
                    </h2>
                    <p>This user has no followed pledges!</p>
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