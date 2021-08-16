import { useState } from "react";
import Loading from "./Loading";
import PlacesOutput from "./PlacesOutput";

import { motion } from "framer-motion";
import styled from "@emotion/styled";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Form = () => {
  const [places, setPlaces] = useState([]);
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hotels, setHotels] = useState([]);
  const [searchParams, setSearchParams] = useState({
    placeName: null,
    latitude: null,
    longitude: null,
    checkIn: null,
    checkOut: null,
  });

  const getLocations = async (places) => {
    setLoading(true);
    setIsVisible(true);

    try {
      const geosearch = await fetch(
        `https://geoservices-wa-dev-usw2.azurewebsites.net/api/v1/places/suggestions/${places}`
      );

      const locations = await geosearch.json();
      setPlaces(locations.places);
      setLoading(false);
      return locations;
    } catch (error) {
      console.log(`geoSearch API Error: ${error}`);
      setLoading(false);
    }
  };

  const handlePlaceClick = (e) => {
    e.preventDefault();
    const name = e.target.getAttribute("data-placename");
    const lat = e.target.getAttribute("data-lat");
    const long = e.target.getAttribute("data-long");
    const input = document.getElementById("geo-location");
    input.value = name;
    setSearchParams({ placeName: name, latitude: lat, longitude: long });
    setIsVisible(false);
  };

  const getHotels = async (name, lat, long, checkIn, checkOut) => {
    setIsVisible(false);
    setLoading(true);
    const apiUrl = `http://land-dev-apim-dev-usw.azure-api.net/hotel-example-fromsrc/v1/location?requestId=reqId&searchRadius=1&searchType=radius&locale=en_US&latitude=${lat}&longitude=${long}&adultCount=2&checkIn=${checkIn}&checkOut=${checkOut}&childAges=11&placeName=${name}`;

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
      setHotels(jsonResp.hotels);
      setLoading(false);
      return jsonResp;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getHotels(
      searchParams.placeName,
      searchParams.latitude,
      searchParams.longitude,
      checkIn.toLocaleDateString(),
      checkOut.toLocaleDateString()
    );
  };

  return (
    <>
      <motion.div
        id="form-wrapper"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        style={{
          backgroundColor: "rgb(40, 44, 52)",
          padding: "1rem",
        }}
      >
        <Title className="react-blue">External API</Title>
        <SearchForm
          id="geosearch-form"
          autoComplete="off"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <input
            required
            type="text"
            name="geo-search"
            id="geo-location"
            placeholder="Search Location"
            onFocus={(e) => {
              // clear input value onFocus
              e.target.value = null;
            }}
            onKeyDown={(e) => {
              getLocations(e.target.value);
            }}
          />
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
          <SubmitBtn type="submit">SEARCH</SubmitBtn>
        </SearchForm>
        <Loading loading={loading} />
      </motion.div>
      <PlacesOutput
        places={places}
        hotels={hotels}
        setLoading={setLoading}
        isVisible={isVisible}
        handlePlaceClick={handlePlaceClick}
        style={{
          backgroundColor: "white",
          padding: "1rem",
        }}
      />
    </>
  );
};

export default Form;

const Title = styled.h1`
  padding: 1rem;
`;

const SearchForm = styled.form`
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

const SubmitBtn = styled.button`
  height: 50px;
  padding: 0.8rem;
  margin: 0.2rem;
  color: black;
  border-radius: 8px;
  border: 2px solid white;
  background-color: #0494c4;
`;
