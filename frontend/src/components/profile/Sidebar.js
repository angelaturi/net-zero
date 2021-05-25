import React from 'react'
import './Sidebar.css'
import Avatar from "@material-ui/core/Avatar";

const Sidebar = () => {
    return (
      <div>
        <div className="userInfo">
          <Avatar
            className="avatar"
            alt="Remy Sharp"
            src="../../assets/bill_gates.jpg"
          />
          <ul>
            <li>Mediate</li>
            <li>1 Current Stick</li>
          </ul>
        </div>
      </div>
    );
}

export default Sidebar
