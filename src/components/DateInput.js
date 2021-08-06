import { useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateInput = () => {
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);

  return (
    <div>
      <DatePicker
        id="check-in"
        selected={checkIn}
        onChange={(date) => setCheckIn(date)}
        selectsStart
        startDate={checkIn}
        endDate={checkOut}
      />
      <DatePicker
        id="check-out"
        selected={checkOut}
        onChange={(date) => setCheckOut(date)}
        selectsEnd
        startDate={checkIn}
        endDate={checkOut}
        minDate={checkIn}
      />
    </div>
  );
};

export default DateInput;
