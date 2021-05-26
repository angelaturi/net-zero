import React from 'react'
import './Sidebar.css'
import Avatar from "@material-ui/core/Avatar";

const Sidebar = () => {
    return (
      <div>
        <div className="userInfo">
          <Avatar
            className="avatar-profile"
            alt="Remy Sharp"
            src="../../assets/bill_gates.jpg"
          />
          <ul>
           <div className="sidebar-title">Today's Pledges</div>
            <li>Mediate</li>
            <li>1 Current Stick</li>
          </ul>
        </div>
      </div>
    );
}

export default Sidebar
