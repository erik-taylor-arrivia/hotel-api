import Hotels from "./Hotels";

import styled from "@emotion/styled";
import { motion } from "framer-motion";

const PlacesOutput = ({ places, hotels, isVisible, handlePlaceClick }) => {
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
                  data-placename={place.placeLongName}
                  data-lat={place.latitude}
                  data-long={place.longitude}
                  onClick={(e) => {
                    handlePlaceClick(e);
                  }}
                >
                  {place.placeLongName}
                </h4>
              </motion.div>
            );
          })}
        </LocationResults>
      </>
    );
  }
  return <Hotels hotels={hotels} />;
};

export default PlacesOutput;

const LocationResults = styled.div`
  text-align: left;
  margin: 0 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (min-width: 600px) {
    max-width: 625px;
    margin: 0 auto;
  }

  h4 {
    font-weight: 500;
    padding: 0.5rem 0rem;
    color: #6b9512;
    font-weight: 600;
  }
`;
