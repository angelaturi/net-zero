import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import { editPledgeAction } from "../../actions/pledge_actions";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import { Link } from "react-router-dom";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const Pending = ({ filter, toggleEditPledgeModal }) => {
  let pledges = useSelector((state) => Object.values(state.pledges.all));
  const userId = useSelector((state) => state.session.user.id);
  pledges = pledges.filter((pledge) => {
    return pledge.follows.includes(userId)
  })
  const [modalIsOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  let items = pledges.filter((pledge) => pledge.state === "pending");

  items = items.filter((pledge) =>
    filter === "public"
      ? pledge.public
      : filter === "private"
      ? !pledge.public
      : true
  );

  //   const openModal = (id) => {
  //     setIsOpen(true);
  //     setCurrentItemId(id);
  //   };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleEdit = (e, pledgeId) => {
    e.preventDefault();
    toggleEditPledgeModal(pledgeId);
  };

  const deletePledge = () => {};

  const renderPledges = () => {
    return items.map((pledge) => (
      <div
        // onContextMenu={(e) => handleEdit(e, pledge._id)}
        className="item"
        key={pledge._id}
      >
        <RadioButtonUncheckedIcon
          className="check"
          onClick={() => removeItem(pledge._id)}
        />
        <ul className="ul-pending-pledges">
          <li>{pledge.title}</li>
          <li className="pending-pledge-description">{pledge.description}</li>
        </ul>
        <Link to={`/pledges/${pledge._id}`}
              style={{ textDecoration: "none" }}
              >
          <button
            className="button-pledge-page">
            View
          </button>
        </Link>


        {(pledge.user._id === userId) ? <button
          className="button-pledge-page"
          onClick={(e) => handleEdit(e, pledge._id)}>
          Edit
        </button> : null}
        <button 
          className="button-pledge-page" 
          onClick={deletePledge}>
          Delete
        </button>
      </div>
    ));
  };

  const removeItem = (id) => {
    editPledgeAction(
      {
        id,
        state: "completed",
      },
      dispatch
    );
    closeModal();
  };

  return (
    <div id="pending-pledges">
      {renderPledges()}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2>Confirmation</h2>
        <button onClick={() => removeItem()}>remove</button>
        <button>enter log manually</button>
        <button onClick={closeModal}>cancel</button>
      </Modal>
    </div>
  );
};

export default Pending;
