import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import { editPledgeAction } from "../../actions/pledge_actions";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";

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
  const pledges = useSelector((state) => Object.values(state.pledges.all));
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
        <button className="follow-button-pledge-page" onClick={deletePledge}>
          Delete
        </button>
        <button
          className="editing-pledge-button"
          onClick={(e) => handleEdit(e, pledge._id)}
        >
          Edit
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
