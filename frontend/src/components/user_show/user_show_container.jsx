import { connect } from "react-redux";
import { 
    fetchUsers, 
} from "../../actions/user_actions";
import {
    fetchPledges,
} from "../../actions/pledge_actions"
import UserShow from "./user_show";

const mapStateToProps = (state, ownProps) => {

  return {
      users: state.users,
      pledges: state.pledges,
      currentUser: state.session.user,
      currentPledge: state.pledges.show,
      showUserId: ownProps.match.params.userId,
  };
};

//need to add follow pledge functionality
const mapDispatchToProps = (dispatch) => {
  return {
    //   showPledge: (pledgeId) => dispatch(showPledge(pledgeId)),
    //   followPledge: (pledgeId) => dispatch(followPledge(pledgeId)),
    //   unfollowPledge: (pledgeId) => dispatch(unfollowPledge(pledgeId)),
    //   createCommentOnPledge: ({pledgeId, ...comment}) => 
    //     dispatch(createCommentOnPledge({pledgeId, ...comment})),
    //   editCommentOnPledge: ({pledgeId, commentId, ...comment}) => 
    //     dispatch(editCommentOnPledge({pledgeId, commentId, ...comment})),
    //   deleteComment: ({pledgeId, commentId}) =>
    //     dispatch(deleteComment({pledgeId, commentId}))
    fetchUsers: () => dispatch(fetchUsers()),
    fetchPledges: () => dispatch(fetchPledges()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserShow);