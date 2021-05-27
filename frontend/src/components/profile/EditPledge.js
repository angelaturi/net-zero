import { useState } from "react";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
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

const categories = [
  "Built Environment",
  "Energy",
  "Industry",
  "Food",
  "Environmental Justice",
  "Transport",
  "Finance",
  "Sustainable Living",
  "Nature",
  "Policy",
];

const AddPledge = ({
  showEditPledgeModal,
  toggleEditPledgeModal,
  selectedPledge,
}) => {
  const [formData, setFormData] = useState({
    ...selectedPledge,
    isPublic: selectedPledge.public,
  });

  const { title, description, isPublic } = formData;
  const dispatch = useDispatch();
  
  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleUpdatePledge = (e) => {
    e.preventDefault();
    editPledgeAction(
      { ...formData, id: formData._id, public: isPublic },
      dispatch
    );
    toggleEditPledgeModal();
  };

  return (
    <div>
      <Modal
        isOpen={showEditPledgeModal}
        onRequestClose={toggleEditPledgeModal}
        style={customStyles}
      >
        <button onClick={toggleEditPledgeModal}>close</button>

        <h2>Edit a Pledge</h2>

        <form onSubmit={handleUpdatePledge}>
          Title:{" "}
          <input name="title" value={title} onChange={handleInputChange} />{" "}
          <br />
          Description:{" "}
          <input
            name="description"
            value={description}
            onChange={handleInputChange}
          />
          <br />
          Public:{" "}
          <input
            name="isPublic"
            type="checkbox"
            checked={isPublic}
            onChange={handleInputChange}
          />
          <button>Save</button>
          <br />
        </form>
      </Modal>
    </div>
  );
};
export default AddPledge;
