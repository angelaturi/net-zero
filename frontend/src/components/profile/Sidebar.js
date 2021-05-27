import React from "react";
import Avatar from "@material-ui/core/Avatar";
import "./Sidebar.css";

const Sidebar = ({ setFilter }) => {
    return (
      <div>
        <div className="userInfo">
          {/* <Avatar
            className="avatar-profile"
            alt="Remy Sharp"
            src="../../assets/bill_gates.jpg"
          /> */}
          </div>
      <div className="dropdown">
          <span>Sort</span>
        <div className="dropdown-content">
      <p className="dropdown-text" onClick={() => setFilter("private")}>Private pledges</p>
      <p className="dropdown-text" onClick={() => setFilter("public")}>Public pledges</p>
      <p className="dropdown-text" onClick={() => setFilter("all")}>All pledges</p>
      </div>
      </div>
    </div>
  );
};

export default Sidebar;
