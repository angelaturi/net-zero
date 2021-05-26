import React, { useState } from "react";
import Completed from "./Completed";
import Calendar from "react-calendar";
import Pending from "./Pending";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import './User_profile.css'

const UserProfile = () => {
  const [page, setPage] = useState("completed");
  const [value, onChange] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false)

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


     console.log(finalDate)

  return (
    <div className="profile-main">
      <div className="dates">
        <div className="dates-text">{finalDate}</div>
        <CalendarTodayIcon onClick={() => setShowCalendar(!showCalendar)} />
      </div>
      <div className="links">
        <p onClick={() => setPage("pending")}>Pending</p>
        <p onClick={() => setPage("completed")}> Completed</p>
      </div>

      <div>{page === "completed" ? <Completed /> : <Pending />}</div>

      <div className="calendar">
        {showCalendar ? (
          <Calendar  onChange={onChange} value={value} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default UserProfile;


 