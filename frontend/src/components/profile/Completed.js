
import React, {useState} from 'react'
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
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



const Completed = () => {

    const [items, setItems] = useState([
      {
        id: "1",
        title: "Use the dishwasher",
        description:
          "Dishwashers use ½ the energy and ⅓rd of the water as handwashing. Finally, the perfect excuse for not doing the dishes.",
      },
      {
        id: "2",
        title: "Use the dishwasher",
        description:
          "Dishwashers use ½ the energy and ⅓rd of the water as handwashing. Finally, the perfect excuse for not doing the dishes.",
      },
      {
        id: "3",
        title: "Use the dishwasher",
        description:
          "Dishwashers use ½ the energy and ⅓rd of the water as handwashing. Finally, the perfect excuse for not doing the dishes.",
      },
      {
        id: "4",
        title: "Use the dishwasher",
        description:
          "Dishwashers use ½ the energy and ⅓rd of the water as handwashing. Finally, the perfect excuse for not doing the dishes.",
      },
    ]);
    const [currentItemId, setCurrentItemId] = useState("")

      var subtitle;
      const [modalIsOpen, setIsOpen] = React.useState(false);
      const openModal = (id) => {
        setIsOpen(true);
        setCurrentItemId(id)
      }

      const afterOpenModal = () => {
        // references are now sync'd and can be accessed.
        //subtitle.style.color = "#f00";
      }

      const closeModal = () => {
        setIsOpen(false);
      }

     const renderPledges = () => {
       return items.map((pledge) => (
         <div className="item" key={pledge.id} >
           <CheckCircleIcon className="check" onClick={() => openModal(pledge.id)}/>
           <ul>
             <li>Mediate</li>
             <li>1 Current Stick</li>
           </ul>
         </div>
       ));
     };

     const removeItem = () => {
         const filteredItems = items.filter(item => item.id !== currentItemId)
         setItems(filteredItems)
        closeModal()
     }
    
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

export default Completed
