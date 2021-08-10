import { useState, useEffect } from "react";
// import SubmitButton from "./SubmitButton";
// import PlacesInput from "./PlacesInput";
import PlacesOutput from "./PlacesOutput";

import { motion } from "framer-motion";
import Styled from "@emotion/styled";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Form = () => {
  const [places, setPlaces] = useState([]);
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);

  useEffect(() => {
    //getLocations("San Diego");
    // getHotels(
    //   "San Diego",
    //   "32.714439",
    //   "-117.162369",
    //   "2021-10-15",
    //   "2021-10-31"
    // );
  }, []);

  const getLocations = async (places) => {
    try {
      const geosearch = await fetch(
        `https://geoservices-wa-dev-usw2.azurewebsites.net/api/v1/places/suggestions/${places}`
      );

      const locations = await geosearch.json();
      setPlaces(locations.places);
      return locations;
    } catch (error) {
      console.log(`geoSearch API Error: ${error}`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const input = document.getElementById("geo-location");
    getLocations(input.value);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Title>External API</Title>
      <SearchForm
        id="geosearch-form"
        autoComplete="off"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        {/* <PlacesInput getLocations={getLocations} /> */}
        <input
          required
          type="text"
          name="geo-search"
          id="geo-location"
          placeholder="Search Location"
          // onBlur={(e) => {
          //   getLocations(e.target.value);
          // }}
          // onChange={(e) => {
          //   getLocations(e.target.value);
          // }}
          // onKeyDown={(e) => {
          //   getLocations(e.target.value);
          // }}
        />
        {/* <DateInput setCheckIn={checkIn} setCheckOut={checkOut} /> */}
        <div id="date-wrapper" style={{ display: "flex" }}>
          <DatePicker
            id="check-in"
            selected={checkIn}
            onChange={(date) => setCheckIn(date)}
            selectsStart
            startDate={checkIn}
            endDate={checkOut}
            minDate={new Date()}
            placeholderText="Check In Date"
            required={true}
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
            required={true}
          />
        </div>
        {/* <SubmitButton /> */}
        <SubmitBtn type="submit">SEARCH</SubmitBtn>
      </SearchForm>
      <PlacesOutput places={places} checkIn={checkIn} checkOut={checkOut} />
    </motion.div>
  );
};

export default Form;

const Title = Styled.h1`
  padding: 1rem;
`;

const SearchForm = Styled.form`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  input {
    height: 50px;
    padding: 0.2rem;
    margin: 0.2rem;
  }
`;

const SubmitBtn = Styled.button`
  height: 50px;
  padding: 0.8rem;
  margin: 0.2rem;
`;
