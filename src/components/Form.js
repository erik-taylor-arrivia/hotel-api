import { useState, useEffect } from "react";

import { motion } from "framer-motion";
import styled from "@emotion/styled";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Form = () => {
  const [location, setLocation] = useState([]);
  // const [lat, setLat] = useState("");
  // const [long, setLong] = useState("");
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);

  const getLocation = async (place) => {
    try {
      const geosearch = await fetch(
        `https://geoservices-wa-dev-usw2.azurewebsites.net/api/v1/places/suggestions/${place}`
      );

      const locations = await geosearch.json();
      setLocation(locations.places);
      console.log(locations.places);
      return locations;
    } catch (error) {
      console.log(`geoSearch API Error: ${error}`);
    }
  };

  useEffect(() => {
    //getLocation("");
    getHotels(
      "San Diego",
      "32.714439",
      "-117.162369",
      "2021-10-15",
      "2021-10-31"
    );
  }, []);

  const getHotels = async (searchLocation, lat, long, checkIn, checkOut) => {
    const apiUrl = `http://land-dev-apim-dev-usw.azure-api.net/hotel-example-fromsrc/v1/location?requestId=reqId&searchRadius=1&searchType=radius&locale=en_US&latitude=${lat}&longitude=${long}&adultCount=2&checkIn=${checkIn}&checkOut=${checkOut}&childAges=11&placeName=${searchLocation}`;

    try {
      const resp = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Ocp-Apim-Subscription-Key": "db152264ff8f4e71a15dad565f7fc98d",
          "Ocp-Apim-Trace": "true",
        },
      });
      const jsonResp = await resp.json();
      console.log(jsonResp);
      return jsonResp;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Title>External API</Title>
      <SearchForm
        id="geosearchForm"
        autoComplete="off"
        onSubmit={(e) => {
          handleSubmit();
        }}
      >
        <input
          required
          type="text"
          name="geo-search"
          id="geo-location"
          placeholder="Search Location"
          onChange={(e) => {
            getLocation(e.target.value);
          }}
        />
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

        <button type="submit">SEARCH</button>
      </SearchForm>
      <LocationResults id="places">
        {location.map((query) => {
          if (query) {
            return (
              <h4 key={query.placeId}>
                {query.placeLongName} {query.latitude} {query.longitude}
              </h4>
            );
          }
          return console.log(`No query`);
        })}
      </LocationResults>
    </motion.div>
  );
};

export default Form;

const Title = styled.h1`
  padding: 1rem;
`;

const SearchForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  input {
    height: 50px;
    padding: 0.2rem;
    margin: 0.2rem;
  }
  button {
    height: 50px;
    padding: 0.8rem;
    margin: 0.2rem;
  }
`;

const LocationResults = styled.div`
  margin: 0 auto;
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: center;

  h4 {
    font-weight: 500;
  }
`;
