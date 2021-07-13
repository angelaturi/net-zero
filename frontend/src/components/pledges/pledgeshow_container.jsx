import { connect } from "react-redux";
import { showPledge, 
  followPledge, 
  unfollowPledge,
  deletePledge,
  createCommentOnPledge, 
  editCommentOnPledge,
  deleteComment } from "../../actions/pledge_actions";
import PledgeShow from "./pledgeshow";
import { withRouter } from "react-router-dom";

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
      unfollowPledge: (pledgeId) => dispatch(unfollowPledge(pledgeId)),
      createCommentOnPledge: ({pledgeId, ...comment}) => 
        dispatch(createCommentOnPledge({pledgeId, ...comment})),
      editCommentOnPledge: ({pledgeId, commentId, ...comment}) => 
        dispatch(editCommentOnPledge({pledgeId, commentId, ...comment})),
      deleteComment: ({pledgeId, commentId}) =>
        dispatch(deleteComment({pledgeId, commentId})),
      deletePledge: (pledgeId) => dispatch(deletePledge(pledgeId)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PledgeShow));