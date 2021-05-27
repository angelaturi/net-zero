import Modal from "react-modal";

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

const PledgeCategories = ({
  showCategoriesModal,
  toggleCategoriesModal,
  setSelectedCategory,
  toggleAddPledgeModal,
}) => (
  <div>
    <Modal
      isOpen={showCategoriesModal}
      onRequestClose={toggleCategoriesModal}
      style={customStyles}
    >
      <button className="x-modal-button" onClick={toggleCategoriesModal}>X</button>
      <div className="category-title">Choose a category: </div>
      {categories.map((category, i) => (
        <div key={i}>
          <p className="dropdown-text"
            onClick={() => {
              setSelectedCategory(category);
              toggleCategoriesModal();
              toggleAddPledgeModal();
            }}
          >
            <li>{category}</li>
          </p>
        </div>
      ))}
    </Modal>
  </div>
);

export default PledgeCategories;
