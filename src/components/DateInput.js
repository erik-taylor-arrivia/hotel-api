import { useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateInput = () => {
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);

  return (
    <div id="date-wrapper" style={{ display: "flex" }}>
      <DatePicker
        id="check-in"
        selected={checkIn}
        onChange={(date) => setCheckIn(date)}
        selectsStart
        startDate={checkIn}
        endDate={checkOut}
        placeholderText="Check In Date"
      />
      <DatePicker
        id="check-out"
        selected={checkOut}
        onChange={(date) => setCheckOut(date)}
        selectsEnd
        startDate={checkIn}
        endDate={checkOut}
        minDate={checkIn}
        placeholderText="Check Out Date"
      />
    </div>
  );
};

export default DateInput;
