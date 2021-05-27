import React, { useState, useEffect } from "react";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Calendar from "react-calendar";
import { useDispatch } from "react-redux";
import Completed from "./Completed";
import Pending from "./Pending";
import PledgeCategories from "./PledgeCategories";
import NewPledge from "./NewPledge";
import Sidebar from "./Sidebar";
import { fetchPledges } from "../../actions/pledge_actions";

import "./User_profile.css";

const UserProfile = () => {
  const [page, setPage] = useState("completed");
  const [value, onChange] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [showCategoriesModal, setShowCategoriesModal] = useState(false);
  const [showAddPledgeModal, setShowAddPledgeModal] = useState(false);
  const [showEditPledgeModal, setShowEditPledgeModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filter, setFilter] = useState("all");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPledges());
  }, []);

  let d = new Date();
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
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

  const toggleEditPledgeModal = (pled) => setShowEditPledgeModal((prev) => !prev);

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
        selectedCategory={selectedCategory}
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
        <Pending toggleEditPledgeModal={toggleEditPledgeModal} filter={filter} />
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
