import React, { useState } from "react";
import Completed from "./Completed";
import Calendar from "react-calendar";
import Pending from "./Pending";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";

const User_profile = () => {
  const [page, setPage] = useState("completed");
  const [value, onChange] = useState(new Date());

  return (
    <div>
      <div className="dates">
        <p>TUESDAY, 25 MAY</p>
        <CalendarTodayIcon />
      </div>
      <div className="links">
        <p onClick={() => setPage("pending")}>Pending</p>
        <p onClick={() => setPage("completed")}> Completed</p>
      </div>

      <div>{page === "completed" ? <Completed /> : <Pending />}</div>

      <div>
        <Calendar onChange={onChange} value={value} />
      </div>
    </div>
  );
};

export default User_profile;

// render() {
//     let d = new Date();
//     let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
//     let months = [
//       "January",
//       "February",
//       "March",
//       "April",
//       "May",
//       "June",
//       "July",
//       "August",
//       "September",
//       "October",
//       "November",
//       "December",
//     ];
//     const finalDate = `${days[d.getDay()]}, ${
//       months[d.getMonth()]
//     } ${d.getDate()}`;
