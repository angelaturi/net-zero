import { connect } from "react-redux";
import { showPledge, followPledge, createCommentOnPledge, editCommentOnPledge } from "../../actions/pledge_actions";
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
      showPledge: (pledgeId) => dispatch(showPledge(pledgeId)),
      followPledge: (pledgeId) => dispatch(followPledge(pledgeId)),
      createCommentOnPledge: ({pledgeId, ...comment}) => 
        dispatch(createCommentOnPledge({pledgeId, ...comment})),
      editCommentOnPledge: ({pledgeId, commentId, ...comment}) => 
        dispatch(editCommentOnPledge({pledgeId, commentId, ...comment}))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PledgeShow);