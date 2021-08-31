import styled from "@emotion/styled";
import { motion } from "framer-motion";
import ReactTooltip from "react-tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseUser } from "@fortawesome/free-solid-svg-icons";
import {
  faUser,
  faBed,
  faDumbbell,
  faShuttleVan,
  faPaw,
  faWifi,
  faBus,
  faUtensils,
  faParking,
  faConciergeBell,
} from "@fortawesome/free-solid-svg-icons";

const Hotels = ({ hotels }) => {
  return (
    <HotelWrapper id="hotel-wrapper">
      {hotels.map((hotel) => {
        return (
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            key={hotel.id}
          >
            <HotelCard className="hotel-card">
              <img src={hotel.imageUrl} alt={hotel.name} />
              <div className="hotel-amenities">
                {hotel.amenityIds.map((id) => {
                  let amenity = null;
                  switch (id) {
                    case 1:
                      amenity = (
                        <FontAwesomeIcon
                          icon={faDumbbell}
                          data-tip="Fitness Center"
                        />
                      );
                      break;
                    case 2:
                      amenity = (
                        <FontAwesomeIcon
                          icon={faShuttleVan}
                          data-tip="Airport Shuttle"
                        />
                      );
                      break;
                    case 3:
                      amenity = (
                        <FontAwesomeIcon icon={faPaw} data-tip="Pet Friendly" />
                      );
                      break;
                    case 4:
                      amenity = (
                        <FontAwesomeIcon icon={faWifi} data-tip="Free WIFI" />
                      );
                      break;
                    case 5:
                      amenity = (
                        <FontAwesomeIcon
                          icon={faBus}
                          data-tip="Free Area Shuttle"
                        />
                      );
                      break;
                    case 6:
                      amenity = (
                        <FontAwesomeIcon
                          icon={faUtensils}
                          data-tip="Free Breakfast"
                        />
                      );
                      break;
                    case 7:
                      amenity = (
                        <FontAwesomeIcon
                          icon={faParking}
                          data-tip="Free Parking"
                        />
                      );
                      break;
                    case 8:
                      amenity = (
                        <FontAwesomeIcon
                          icon={faConciergeBell}
                          data-tip="All Inclusive"
                        />
                      );
                      break;

                    default:
                      amenity = null;
                      break;
                  }
                  return (
                    <span key={id} className="amenity">
                      {amenity}
                    </span>
                  );
                })}
              </div>
              <hr className="hr"></hr>
              <div className="wrapper">
                <h3>{hotel.name}</h3>
                <div className="prices">
                  <span className="market-rate">
                    ${hotel.marketBase.toFixed(2)}
                  </span>
                  <span className="net-rate">${hotel.netBase.toFixed(2)}</span>
                </div>
              </div>
              <p className="nearby" data-tip={hotel.location}>
                Nearby
              </p>
              <ReactTooltip
                data-type="light"
                data-effect="float"
                data-multiline="true"
                clickable={true}
                backgroundColor="#6b9512"
                textColor="white"
              />
              <span className="savings">
                {`SAVE $${(hotel.marketBase - hotel.netBase).toFixed(2)}`}
              </span>
              <small>{hotel.shortDescription}</small>
              <BookButton>BOOK</BookButton>
              <hr className="hr"></hr>
              <div className="room-details">
                <div>
                  <FontAwesomeIcon icon={faHouseUser} />
                  <span> ### sq ft</span>
                </div>
                <div>
                  <FontAwesomeIcon icon={faUser} />
                  <span> # Guests</span>
                </div>
                <div>
                  <FontAwesomeIcon icon={faBed} />
                  <span> # Beds</span>
                </div>
              </div>
            </HotelCard>
          </motion.div>
        );
      })}
    </HotelWrapper>
  );
};

export default Hotels;

const HotelWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 1rem 0;
`;

const BookButton = styled.button`
  height: 3rem;
  margin: 0rem 1rem 1rem;
  color: white;
  background-color: #6b9512;
  border: 0;
  border-radius: 0.3rem;
  transition: all 0.2s ease-in-out;
  -webkit-font-smoothing: antialiased;

  &:hover {
    background-color: #638b0f;
    transform: scale(1.05);
  }
`;

const HotelCard = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 22rem;
  border: 2px solid #c3c3c3;
  margin: 1rem;
  border-radius: 1rem;
  box-shadow: 0px 6px 10px 0px #c3c3c3;
  position: relative;

  img {
    object-fit: fill;
    border-radius: 0.9rem 0.9rem 0 0;
    height: 14rem;
    margin-bottom: 1.3rem;
  }

  .hr {
    background-color: #c3c3c3;
    height: 1px;
    width: 90%;
  }

  .room-details {
    display: flex;
    justify-content: space-between;
    margin: 0 1rem 1rem;

    div {
      color: #898989;
      font-weight: 600;
    }
  }

  .hotel-amenities {
    font-weight: 600;
    display: flex;
    justify-content: space-evenly;
    margin: 0 1rem;

    .amenity {
      font-size: 18px;
      color: #6b9512;
    }
  }

  .wrapper {
    display: flex;
    justify-content: space-between;
    padding: 0rem 1rem 0.2rem;

    h3 {
      text-align: left;
      font-weight: 500;
      padding-right: 0.5rem;
    }

    .prices {
      display: flex;
      flex-direction: column;
      align-items: flex-end;

      .market-rate {
        text-decoration: line-through;
      }

      .net-rate {
        font-size: 1.75rem;
        font-weight: bold;
        color: #6b9512;
      }
    }
  }

  .savings {
    color: white;
    font-size: 18px;
    font-weight: 400;
    background-color: #282c34;
    border: 3px solid white;
    box-shadow: 0px 0px 2px 2px #898989;
    border-radius: 50%;
    height: 5.1rem;
    width: 5.1rem;
    padding: 1.2rem 0rem;
    text-align: center;
    position: absolute;
    right: -1rem;
    top: 10rem;
    line-height: 18px;
  }

  small {
    padding: 0 1rem 1rem;
    text-align: left;
  }

  .nearby {
    font-size: 14px;
    cursor: pointer;
    padding: 0 1rem 0.5rem;
    text-align: left;
    color: #6b9512;
    text-decoration: underline;
    max-width: max-content;
  }
`;
