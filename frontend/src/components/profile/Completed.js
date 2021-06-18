import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Modal from "react-modal";
import { editPledgeAction } from "../../actions/pledge_actions";

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

const Completed = ({ filter }) => {
  let pledges = useSelector((state) => state.pledges.all);
  const userId = useSelector((state) => state.session.user.id);
  pledges = pledges.filter((pledge) => {
    return pledge.follows.includes(userId)
  })
  let items = pledges.filter((pledge) => pledge.state === "completed");
  items = items.filter((pledge) =>
    filter === "public"
      ? pledge.public
      : filter === "private"
      ? !pledge.public
      : true
  );
  const [currentItemId, setCurrentItemId] = useState(null);

  const dispatch = useDispatch();
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const openModal = (id) => {
    setIsOpen(true);
    setCurrentItemId(id);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const renderPledges = () => {
    return items.map((pledge) => (
      <div className="item" key={pledge.id}>
        <CheckCircleIcon
          className="check"
          onClick={() => openModal(pledge._id)}
        />
        <ul>
          <li>{pledge.title}</li>
          <li>{pledge.description}</li>
        </ul>
      </div>
    ));
  };

  const removeItem = () => {
    editPledgeAction(
      {
        id: currentItemId,
        state: "pending",
      },
      dispatch
    );
    closeModal();
  };

  return (
    <div id="completed-pledges">
      {renderPledges()}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="profile-modal-title"></div>
        <button className="profile-modal-button" onClick={() => removeItem()}>
          Remove from Completed
        </button>
        <button className="x-modal-button" onClick={closeModal}>
          X
        </button>
      </Modal>
    </div>
  );
};

export default Completed;
