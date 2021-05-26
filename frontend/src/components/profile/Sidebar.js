import React from "react";
import Avatar from "@material-ui/core/Avatar";
import "./Sidebar.css";

const Sidebar = ({ setFilter }) => {
    return (
      <div>
        <div className="userInfo">
          <Avatar
            className="avatar-profile"
            alt="Remy Sharp"
            src="../../assets/bill_gates.jpg"
          />
          </div>
      <div>
      <p onClick={() => setFilter("private")}>Private pledges</p>
      <p onClick={() => setFilter("public")}>Public pledges</p>
      <p onClick={() => setFilter("all")}>All pledges</p>
      </div>
    </div>
  );
};

export default Sidebar;
