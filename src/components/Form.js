import { useState, useEffect } from "react";
import DateInput from "./DateInput";
import SubmitButton from "./SubmitButton";
import PlacesInput from "./PlacesInput";

import { motion } from "framer-motion";
import Styled from "@emotion/styled";
import PlacesOutput from "./PlacesOutput";

const Form = () => {
  const [places, setPlaces] = useState([]);

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
      console.log(locations.places);
      return locations;
    } catch (error) {
      console.log(`geoSearch API Error: ${error}`);
    }
  };

  // const getHotels = async (searchLocation, lat, long, checkIn, checkOut) => {
  //   const apiUrl = `http://land-dev-apim-dev-usw.azure-api.net/hotel-example-fromsrc/v1/location?requestId=reqId&searchRadius=1&searchType=radius&locale=en_US&latitude=${lat}&longitude=${long}&adultCount=2&checkIn=${checkIn}&checkOut=${checkOut}&childAges=11&placeName=${searchLocation}`;

  //   try {
  //     const resp = await fetch(apiUrl, {
  //       method: "GET",
  //       headers: {
  //         "Ocp-Apim-Subscription-Key": "db152264ff8f4e71a15dad565f7fc98d",
  //         "Ocp-Apim-Trace": "true",
  //       },
  //     });
  //     const jsonResp = await resp.json();
  //     console.log(jsonResp);
  //     return jsonResp;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    // should pass places and dates to child components on submit
    getLocations(places);
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
          handleSubmit(e);
        }}
      >
        <PlacesInput getLocations={getLocations} />
        <DateInput />
        <SubmitButton />
      </SearchForm>
      <PlacesOutput places={places} />
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
  button {
    height: 50px;
    padding: 0.8rem;
    margin: 0.2rem;
  }
`;
