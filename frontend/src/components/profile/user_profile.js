import React, { useState } from "react";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Calendar from "react-calendar";
import Completed from "./Completed";
import Pending from "./Pending";
import PledgeCategories from "./PledgeCategories";
import NewPledge from "./NewPledge";
import Sidebar from "./Sidebar";

import "./User_profile.css";

const UserProfile = () => {
  const [page, setPage] = useState("completed");
  const [value, onChange] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [showCategoriesModal, setShowCategoriesModal] = useState(false);
  const [showAddPledgeModal, setShowAddPledgeModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filter, setFilter] = useState("all");

  let d = new Date();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const finalDate = `${days[d.getDay()]}, ${
    months[d.getMonth()]
  } ${d.getDate()}`;

  const toggleAddPledgeModal = () => setShowAddPledgeModal((prev) => !prev);

  const toggleCategoriesModal = () => setShowCategoriesModal((prev) => !prev);

  return (
    <div className="profile-main">
      <Sidebar setFilter={setFilter} />

      <PledgeCategories
        showCategoriesModal={showCategoriesModal}
        toggleCategoriesModal={toggleCategoriesModal}
        setSelectedCategory={setSelectedCategory}
        toggleAddPledgeModal={toggleAddPledgeModal}
      />

      <NewPledge
        showAddPledgeModal={showAddPledgeModal}
        // toggleCategoriesModal={toggleCategoriesModal}
        // setSelectedCategory={setSelectedCategory}
        toggleAddPledgeModal={toggleAddPledgeModal}
        filter={selectedCategory}
      />
      <div className="dates">
        <div className="dates-text">{finalDate}</div>
        <CalendarTodayIcon onClick={() => setShowCalendar(!showCalendar)} />
      </div>
      <div className="links">
        <p onClick={() => setPage("pending")}>Pending</p>
        <p onClick={() => setPage("completed")}> Completed</p>
      </div>

      <div>
        {page === "completed" ? (
          <Completed filter={filter} />
        ) : (
          <Pending filter={filter} />
        )}
      </div>

      <div className="calendar">
        {showCalendar ? (
          <Calendar calendarType="Hebrew" onChange={onChange} value={value} />
        ) : (
          ""
        )}
      </div>

      <AddCircleIcon onClick={toggleCategoriesModal} />
    </div>
  );
};

export default UserProfile;


 
