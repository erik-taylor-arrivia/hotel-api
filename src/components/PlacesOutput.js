import { useState } from "react";

import Styled from "@emotion/styled";
import { motion } from "framer-motion";

const PlacesOutput = ({
  places,
  checkIn,
  checkOut,
  setLoading,
  isVisible,
  setIsVisible,
}) => {
  const [hotels, setHotels] = useState([]);

  const getHotels = async (searchLocation, lat, long, checkIn, checkOut) => {
    setLoading(true);
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
      setHotels(jsonResp.hotels);
      setLoading(false);
      return jsonResp;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handlePlaceClick = (e, place) => {
    e.preventDefault();
    setIsVisible(false);
    if ((checkIn || checkOut) === null) {
      alert(`CHECKIN or CHECKOUT are NULL`);
    } else {
      document.getElementById("geo-location").value = place.placeLongName;

      getHotels(
        place.placeLongName,
        place.latitude,
        place.longitude,
        checkIn.toLocaleDateString(),
        checkOut.toLocaleDateString()
      );
    }
  };

  if (isVisible) {
    return (
      <>
        <LocationResults id="places">
          {places.map((place) => {
            return (
              <motion.div
                whileHover={{ scale: 1.1 }}
                style={{ cursor: "pointer" }}
                key={place.placeId}
              >
                <h4
                  onClick={(e) => {
                    handlePlaceClick(e, place);
                  }}
                >
                  {place.placeLongName}
                </h4>
              </motion.div>
            );
          })}
        </LocationResults>
        <HotelWrapper id="hotel-wrapper">
          {hotels.map((hotel) => {
            return (
              <HotelCard className="hotel-card" key={hotel.id}>
                <h3>
                  {hotel.name} <span>{hotel.starRating}</span>
                </h3>
                <img src={hotel.imageUrl} alt={hotel.name} />
                <p style={{ textDecoration: "line-through" }}>
                  {`market base: $${hotel.marketBase.toFixed(
                    2
                  )} market total: $${hotel.marketTotal.toFixed(2)} `}
                </p>
                <p>
                  {`net base: $${hotel.netBase.toFixed(
                    2
                  )} net total: $${hotel.netTotal.toFixed(2)} `}
                </p>
                <p>
                  {`Savings: ${(hotel.marketBase - hotel.netBase).toFixed(2)}`}
                </p>
                <i>{hotel.location}</i>
                <small>{hotel.shortDescription}</small>
              </HotelCard>
            );
          })}
        </HotelWrapper>
      </>
    );
  } else return "";
};

export default PlacesOutput;

const LocationResults = Styled.div`
  text-align: left;
  margin: 0 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media(min-width: 600px){
    max-width: 625px;
    margin: 0 auto;
  }

  h4 {
    font-weight: 500;
  }
`;

const HotelWrapper = Styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const HotelCard = Styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  max-width: 30%;
  border: 1px solid black;
  padding: 0.5rem;
  margin-bottom: 1rem;
`;
