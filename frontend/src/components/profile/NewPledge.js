import { useState } from "react";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { createPledgeAction } from "../../actions/pledge_actions";

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
  showAddPledgeModal,
  toggleAddPledgeModal,
  selectedCategory,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    isPublic: false,
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

  const handleCreatePledge = (e) => {
    e.preventDefault();
    dispatch(
      createPledgeAction({
        ...formData,
        public: isPublic,
        category: selectedCategory,
      })
    );
    toggleAddPledgeModal();
  };

  return (
    <div>
      <Modal
        isOpen={showAddPledgeModal}
        onRequestClose={toggleAddPledgeModal}
        style={customStyles}
      >
        <button onClick={toggleAddPledgeModal}>close</button>

        <form onSubmit={handleCreatePledge}>
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
