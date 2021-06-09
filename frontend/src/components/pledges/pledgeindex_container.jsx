import { connect } from 'react-redux';
import { fetchPledges, followPledge, unfollowPledge } from '../../actions/pledge_actions';
import PledgeIndex from './pledgeindex';

const mapStateToProps = (state) => {
    return {
        pledges: Object.values(state.pledges.all),
        currentUser: state.session.user,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        fetchPledges: () => dispatch(fetchPledges()),
        followPledge: (pledgeId) => dispatch(followPledge(pledgeId)),
        unfollowPledge: (pledgeId) => dispatch(unfollowPledge(pledgeId))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PledgeIndex);