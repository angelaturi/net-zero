//
import React from 'react';

class PledgeShow extends React.Component {
    constructor(props){
        super(props)
    }

    componentDidMount() {
        this.props.fetchPledge(this.props.match.params.pledgeId);
    }

    render() {

        

        if (this.props.currentPledge) {
            return (
                <div>
                    <h1>{this.props.currentPledge.title}</h1>
                    <p>{this.props.currentPledge.description}</p>
                    <p>{this.props.currentPledge.date}</p>
                    <button>Follow Pledge</button>
                    <h2>Followers</h2> 
    
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