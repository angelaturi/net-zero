import { useState } from "react";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { createPledgeAction } from "../../actions/pledge_actions";
import ImageUploader from "react-images-upload";

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
    file: "",
  });
  const [imagefile, setFile] = useState(null);

  const onDrop = (picture) => {
    setFile(picture[0]);
    // formData.append("image", imagefile);
  };

  const { title, description, isPublic, file } = formData;
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
    debugger;
    formData.append("file", imagefile);
    dispatch(
      createPledgeAction({
        ...formData,
        public: isPublic,
        category: selectedCategory,
      })
    );
    toggleAddPledgeModal();
  };

  // const onDrop = (picture) => {
  //   setPictures([...image, picture]);
  // };

  return (
    <div>
      <Modal
        isOpen={showAddPledgeModal}
        onRequestClose={toggleAddPledgeModal}
        style={customStyles}
      >
        <button className="x-modal-button" onClick={toggleAddPledgeModal}>
          X
        </button>

        <h2>Add a Pledge</h2>

        <form onSubmit={handleCreatePledge}>
          <div className="create-pledge-titles">Title: </div>
          <input
            className="create-pledge-input"
            name="title"
            value={title}
            onChange={handleInputChange}
          />{" "}
          <br />
          <div className="create-pledge-titles"> Description: </div>
          <input
            className="create-pledge-input"
            type="textarea"
            name="description"
            value={description}
            onChange={handleInputChange}
          />
          <br />
          <div className="create-pledge-titles"> Public: </div>
          <input
            name="isPublic"
            type="checkbox"
            checked={isPublic}
            onChange={handleInputChange}
          />
          <br />
          <ImageUploader
            withIcon={true}
            buttonText="Choose Image"
            onChange={onDrop}
            imgExtension={[".jpg", ".gif", ".png", ".gif"]}
            maxFileSize={5242880}
            withPreview={true}
          />
          <br /> <br />
          <button className="signup-submit-button">Save</button>
          <br />
        </form>
      </Modal>
    </div>
  );
};
export default AddPledge;
