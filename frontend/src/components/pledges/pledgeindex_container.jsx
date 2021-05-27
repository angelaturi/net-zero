import { connect } from 'react-redux';
import { fetchPledges,followPledge } from '../../actions/pledge_actions';
import PledgeIndex from './pledgeindex';

const mapStateToProps = (state) => {
    return {
        pledges: Object.values(state.pledges.all)
    };
}

const mapDispatchToProps = dispatch => {
    return {
        fetchPledges: () => dispatch(fetchPledges()),
        followPledge: (pledgeId) => dispatch(followPledge(pledgeId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PledgeIndex);