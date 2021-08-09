import { useState, useEffect } from "react";
import styled from "@emotion/styled";

const Hotels = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
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
      setHotels(jsonResp.hotels);
      return jsonResp;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>Hotel Response</h1>
      <HotelWrapper>
        {hotels.map((hotel) => {
          return (
            <HotelCard className="hotel-card">
              <h3 key={hotel.id}>
                {hotel.name} <span>{hotel.starRating}</span>
              </h3>
              <img src={hotel.imageUrl} alt={hotel.name} />
              <p>{`market base: $${hotel.marketBase} market total: $${hotel.marketTotal} `}</p>
              <p>{`net base: $${hotel.netBase} net total: $${hotel.netTotal} `}</p>
              <i>{hotel.location}</i>
              <small>{hotel.shortDescription}</small>
            </HotelCard>
          );
        })}
      </HotelWrapper>
    </>
  );
};

export default Hotels;

const HotelWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const HotelCard = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  max-width: 30%;
  border: 1px solid black;
  padding: 0.5rem;
  margin-bottom: 1rem;
`;
