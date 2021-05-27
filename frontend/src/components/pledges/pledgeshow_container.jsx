import { connect } from "react-redux";
import { fetchPledge } from "../../actions/pledge_actions";
import PledgeShow from "./pledgeshow";

const mapStateToProps = (state, ownProps) => {
  return {
      currentUser: state.session.user,
      currentPledge: state.pledges.show
  };
};

//need to add follow pledge functionality
const mapDispatchToProps = (dispatch) => {
  return {
      fetchPledge: (pledgeId) => dispatch(fetchPledge(pledgeId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PledgeShow);