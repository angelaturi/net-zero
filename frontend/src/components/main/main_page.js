import React, {useState} from "react";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";
import './main_page.css'

const Main_page = () => {

//   User id
// Title
// Description


  const [data, setData] = useState([
    {
      name: "Jubril",
      image: "Bill_gate.jpg",
      id: "4",
      title: "Take a shorter shower",
      description:
        "Taking a 3 minute shorter shower every day could save over 40 bathtubs of water in a year",
    },

    {
      name: "Gates",
      image: "Bill_gate.jpg",
      id: "1",
      title: "Take a shorter shower",
      description:
        "Taking a 3 minute shorter shower every day could save over 40 bathtubs of water in a year",
    },

    {
      name: "Grace",
      image: "Bill_gate.jpg",
      id: "2",
      title: "Take a shorter shower",
      description:
        "Taking a 3 minute shorter shower every day could save over 40 bathtubs of water in a year",
    },

    {
      name: "John",
      image: "Bill_gate.jpg",
      id: "3",
      title: "Take a shorter shower",
      description:
        "Taking a 3 minute shorter shower every day could save over 40 bathtubs of water in a year",
    },
  ]);

  const renderPledges = () => {

    return data.map((pledge) => (
      <div className="feedItem" key={pledge.id}>
        <div className="item1">
          <Avatar
            className="avatar"
            alt="Remy Sharp"
            src="../../assets/bill_gates.jpg"
          />
          <p>
            Rob mii made a pledge Jubril's{" "}
            <Link className="pledgeLink" to="#">
              Pledge
            </Link>
          </p>
        </div>
        <div>
          <p>2 hrs</p>
        </div>

        <div className="title">
          <p>{pledge.title}</p>
        </div>

        <div className="pledgeImg">
          <img src="../../assets/shower.jpg" alt="img" />
        </div>

        <div className="description">
          <p>{pledge.description}</p>
        </div>
      </div>
    ));
    
  }
  return (
    <div className="main">
    {renderPledges()}
    </div>
  );
};

export default Main_page;
