import { motion } from "framer-motion";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";

const Form = () => {
  const [location, setLocation] = useState([]);
  // const [lat, setLat] = useState("");
  // const [long, setLong] = useState("");
  // const [checkIn, setCheckIn] = useState("");
  // const [checkOut, setCheckOut] = useState("");

  useEffect(() => {
    getLocation("");
  }, []);

  const getLocation = async (place) => {
    try {
      const geosearch = await fetch(
        `https://geoservices-wa-dev-usw2.azurewebsites.net/api/v1/places/suggestions/${place}`
      );

      const locations = await geosearch.json();
      setLocation(locations.places);
      return locations;
    } catch (error) {
      console.log(`geoSearch API Error: ${error}`);
    }
  };

  const getHotels = async (searchLocation, lat, long, checkIn, checkOut) => {
    const apiUrl = `http://land-dev-apim-dev-usw.azure-api.net/hotel-example-fromsrc/v1/location?requestId=reqId&searchRadius=1&searchType=radius&locale=en_US&latitude=${lat}&longitude=${long}&adultCount=2&checkIn=${checkIn}&checkOut=${checkOut}&childAges=11&placeName=${searchLocation}`;
    const targetDiv = document.getElementById("places");

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
    } catch (error) {}
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
          //value={location}
          onChange={(e) => {
            getLocation(e.target.value);
          }}
        />
        {/* <input
          required
          type="date"
          name="checkInDate"
          id="checkIn"
          placeholder="Departure (YYYY-MM-DD)"
          value={checkIn}
          onChange={setCheckIn}
        />
        <input
          required
          type="date"
          name="checkOutDate"
          id="checkOut"
          placeholder="Arrival (YYYY-MM-DD)"
          value={checkOut}
          onChange={setCheckOut}
        />
        <button type="submit">SEARCH</button> */}
      </SearchForm>
      <LocationResults id="places">
        {location.map((query) => {
          return <h4 key={query.placeId}>{query.placeLongName}</h4>;
          // onClick should set place input value
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
