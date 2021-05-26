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
  const pledges = useSelector((state) => state.pledges);

  let items = pledges.filter((pledge) => pledge.state === "completed");
  
  items = items.filter((pledge) =>
    filter === "public"
      ? pledge.public
      : filter === "private"
      ? !pledge.public
      : true
  );

  const [currentItemId, setCurrentItemId] = useState("");
  const dispatch = useDispatch();
  var subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const openModal = (id) => {
    setIsOpen(true);
    setCurrentItemId(id);
  };

  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    //subtitle.style.color = "#f00";
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const renderPledges = () => {
    return items.map((pledge) => (
      <div className="item" key={pledge.id}>
        <CheckCircleIcon
          className="check"
          onClick={() => openModal(pledge.id)}
        />
        <ul>
          <li>{pledge.title}</li>
          <li>{pledge.description}</li>
        </ul>
      </div>
    ));
  };

  const removeItem = () => {
    //  const filteredItems = items.filter(item => item.id !== currentItemId)
    //  setItems(filteredItems)
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
    <div id="hey">
      {renderPledges()}

        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="profile-modal-title">Confirmation</div>
          <button className="profile-modal-button" onClick={() => removeItem()}>Remove</button>
          <button className="profile-modal-button">Edit</button>
          <button className="x-modal-button" onClick={closeModal}>X</button>
        </Modal>
      </div>
    );
}

export default Completed;
