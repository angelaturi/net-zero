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
      <button onClick={toggleCategoriesModal}>close</button>

      {categories.map((category, i) => (
        <div key={i}>
          <p
            onClick={() => {
              setSelectedCategory(category);
              toggleCategoriesModal();
              toggleAddPledgeModal();
            }}
          >
            {category}
          </p>
        </div>
      ))}
    </Modal>
  </div>
);

export default PledgeCategories;
