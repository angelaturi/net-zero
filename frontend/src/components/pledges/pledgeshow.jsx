import React from "react";
import "./pledges.css";
import Modal from "react-modal";
import { deleteComment } from "../../actions/pledge_actions";
import { Link } from "react-router-dom";
import EditPledge from "../profile/EditPledge";


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

class PledgeShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentText: "",
      followed: false,
      modalIsOpen: false,

      editCommentId: null,
      editCommentText: "",

      showEditPledgeModal: false,
      currentPledge: null,
      newPledgeTitle: '',
      newPledgeDescription: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleFollow = this.toggleFollow.bind(this);
    this.update = this.update.bind(this);
    this.convertDate = this.convertDate.bind(this);

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleUpdateComment = this.handleUpdateComment.bind(this);
    this.handleDeleteComment = this.handleDeleteComment.bind(this);

    this.toggleEditPledgeModal = this.toggleEditPledgeModal.bind(this);
    this.handleUpdatePledge = this.handleUpdatePledge.bind(this);
    this.handleDeletePledge = this.handleDeletePledge.bind(this);
  }

  updateField(field) {

    return e => {
        this.setState({ [field]: e.currentTarget.value });
      }
  }

  componentDidMount() {
    let pledgeId = this.props.match.params.pledgeId;
    this.props.showPledge(pledgeId);
    if (this.props.currentPledge) {

      this.setState({
        currentPledge: this.props.currentPledge,
        newPledgeTitle: this.props.currentPledge.title,
        newPledgeDescription: this.props.currentPledge.description,
  
      })
    }
  }

  componentWillReceiveProps(newState) {

    if(!newState.currentPledge) {
      let pledgeId = this.props.match.params.pledgeId;
      this.props.showPledge(pledgeId);
      
    } else {

      newState.currentPledge.follows.map((followerId) => {
        if (this.props.currentUser.id === followerId) {
          this.setState({ followed: true });
        }
      });
    } 
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentPledge != prevProps.currentPledge) {
      this.setState({
        currentPledge: this.props.currentPledge,
        newPledgeTitle: this.props.currentPledge.title,
        newPledgeDescription: this.props.currentPledge.description,
  
      })
    }
  }

  convertDate = (dateTime) => {
    let dateObject = new Date(dateTime);
    const dateOptions = { month: "numeric", day: "numeric", year: "numeric" };
    let date = dateObject.toLocaleDateString("en-US", dateOptions);
    const now = new Date();
    const dateObj = new Date(date);
    if (
      now.getDate() === dateObj.getDate() &&
      now.getMonth() === dateObj.getMonth() &&
      now.getYear() === dateObj.getFullYear()
    ) {
      return `Today`;
    }
    if (
      now.getDate() - dateObj.getDate() === 1 ||
      now.getMonth() - dateObj.getMonth() === 1 ||
      now.getYear() - dateObj.getFullYear() === 1
    ) {
      return `Yesterday`;
    }
    return date;
  };

  handleSubmit(e) {
    e.preventDefault();
    let comment = {
      text: this.state.commentText,
      authorName: this.props.currentUser.handle,
    };

    this.setState({
      commentText: "",
    })
    this.props.createCommentOnPledge({
      pledgeId: this.props.match.params.pledgeId,
      ...comment,
    });
  }

  toggleFollow(pledge) {
    //if already following
    if (pledge.follows.includes(this.props.currentUser.id)) {
      this.props.unfollowPledge(pledge._id).then(() => {
        this.props.showPledge(pledge._id);
      });
      //update state
      this.setState({ followed: false });
    } else {
      //add userId to pledge follow array
      this.props.followPledge(pledge._id).then(() => {
        this.props.showPledge(pledge._id);
      });
      //update state
      this.setState({ followed: true });
    }
  }

  update() {
    return (e) =>
      this.setState({
        commentText: e.currentTarget.value,
      });
  }

  updateEditCommentText() {
    return (e) =>
      this.setState({
        editCommentText: e.currentTarget.value,
      });
  }

  handleUpdateComment(e) {
    e.preventDefault();

    this.props.editCommentOnPledge({
      pledgeId: this.props.currentPledge._id, 
      commentId: this.state.editCommentId, 
      text: this.state.editCommentText})
    this.setState({ modalIsOpen: false });

  }

  handleDeleteComment(comment) {
    //e.preventDefault();
    this.props.deleteComment({
      pledgeId: this.props.currentPledge._id,
      commentId: comment._id
    });

  }

  openModal(comment) {
    this.setState({ 
      modalIsOpen: true, 
      editCommentId: comment._id,
      editCommentText: comment.text
    });
    
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  toggleEditPledgeModal() {
    let prevshowEditPledgeModal = this.state.showEditPledgeModal;
    this.setState({
      showEditPledgeModal: !prevshowEditPledgeModal,
      currentPledge: this.props.currentPledge,

    });
  }

  handleDeletePledge(pledge) {
    this.props.deletePledge(pledge._id);
    this.props.history.push(`/pledges/`)
  }

  handleUpdatePledge(e) {
    e.preventDefault();
    let newPledge = this.props.currentPledge;
    newPledge.title = this.state.newPledgeTitle;
    newPledge.description = this.state.newPledgeDescription;
    debugger
    this.props.updatePledge(newPledge);
    this.toggleEditPledgeModal();
  };

  render() {
    
    if (this.props.currentPledge) {
      let comments = this.props.currentPledge.comments.slice().reverse();
      return (
        <div className="pledge-show-card">

          <div className="pledge-show-options">

            <div className="pledge-show-options-follow">
              <button
                className="button"
                onClick={() => this.toggleFollow(this.props.currentPledge)}
              >
                {this.state.followed ? "Followed!" : "Follow Pledge"}
              </button>
              <div className="pledge-show-followers">
                {this.props.currentPledge.follows.length} people follow this pledge
              </div>
            </div>


              {(this.props.currentPledge.user._id === this.props.currentUser.id) ? 
                <div className="pledge-show-options-edit-delete">

                  <button
                    className="button"
                    onClick={(e) => this.toggleEditPledgeModal()}>
                    Edit
                  </button> 
                  <button 
                    className="button"
                    onClick={(e) => this.handleDeletePledge(this.props.currentPledge)}>
                    Delete
                  </button>             
                </div>: null}

          </div>



          {this.props.currentPledge.user && (
            <p>By <Link
            className="pledge-index-link"
            style={{ textDecoration: "none" }}
            to={`/users/${this.props.currentPledge.user._id}`}>
              {this.props.currentPledge.user.handle}
            </Link></p>
          )}
          <div className="pledge-show-date">
            Pledged {this.convertDate(this.props.currentPledge.date)}
          </div>
          <div className="pledge-show-title">
            {this.props.currentPledge.title}
          </div>
          {/* <div>Category÷: {this.props.currentPledge.category}</div> */}
          <div className="pledge-show-description">
            {this.props.currentPledge.description}
          </div>
          <img
            className="pledge-show-img"
            src={this.props.currentPledge.image}
          />
          <div className="pledge-show-comment-title">Comments</div>
          <form onSubmit={this.handleSubmit}>
            <input
              className="pledge-show-comment-input"
              type="textarea"
              value={this.state.commentText}
              onChange={this.update()}
              placeholder="Leave a comment..."
            />
            <br />
            <input
              className="pledge-show-submit-comment"
              type="submit"
              value="Submit Comment"
            />
          </form>
          <div className="pledge-show-border"></div>
          {comments.map((comment) => (
            <div className="comment-container">
              <div className="comment-content-container">
                <div className="comment-username">
                  <u><Link 
                    style={{ textDecoration: "none" }}
                    to={`/users/${comment.authorId}`}>
                    {comment.authorName}
                  </Link></u>
                </div>
                <div className="comment-text">{comment.text}</div>
              </div>
              {comment.authorId == this.props.currentUser.id ? 
                <div className="comments-crud-buttons-container">
                  <button className="comments-crud-button" 
                  onClick={() => this.openModal(comment)}>Edit</button> 
                  <button className="comments-crud-button" 
                  onClick={() => this.handleDeleteComment(comment)}>Delete</button>
                </div>: 
                null
              }
            </div>
          ))}
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Edit Comment"
            
          >
            <div className="edit-pledge-modal">
              <h2>Edit Comment</h2>
              <button className="x-modal-button" onClick={this.closeModal}>X</button>
              <form className="edit-pledge-form">
                <textarea 
                  className="create-pledge-input"
                  value={this.state.editCommentText}
                  onChange={this.updateEditCommentText()} />
                <button className="signup-submit-button" onClick={this.handleUpdateComment}>Submit Edited Comment</button>
              </form>
            </div>
          </Modal>
          {
            this.state.currentPledge &&
            // <EditPledge
            //   selectedPledge={this.state.currentPledge}
            //   showEditPledgeModal={this.state.showEditPledgeModal}
            //   toggleEditPledgeModal={this.toggleEditPledgeModal}
            // />
            <Modal
              isOpen={this.state.showEditPledgeModal}
              onRequestClose={this.toggleEditPledgeModal}
              style={customStyles}
            >
            <h2>Edit a Pledge</h2>
            <form onSubmit={(e) => this.handleUpdatePledge(e)}>

              <div className="create-pledge-titles">Title:</div>
              <input className="create-pledge-input" name="title" value={this.state.newPledgeTitle} 
              onChange={this.updateField('newPledgeTitle')} />

              <div className="create-pledge-titles">Title:</div>
              <input className="create-pledge-input" name="title" value={this.state.newPledgeDescription} 
              onChange={this.updateField('newPledgeDescription')} />
              <br />
              <button className="signup-submit-button">Save</button>

            </form>
            </Modal>
          }
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}
export default PledgeShow;
