import React from 'react';
import { withRouter } from 'react-router-dom';
import PledgeItem from './pledgeitem';

class PledgeIndex extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            pledges: []
        }
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
                        <PledgeItem key={pledge._id} pledge={pledge} />
                    ))}
                </div>
            )
        }
    }
}

export default withRouter(PledgeIndex);