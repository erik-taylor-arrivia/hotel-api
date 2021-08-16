import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseUser } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faBed } from "@fortawesome/free-solid-svg-icons";

const Hotels = ({ hotels }) => {
  return (
    <>
      <HotelWrapper id="hotel-wrapper">
        {hotels.map((hotel) => {
          return (
            <HotelCard className="hotel-card" key={hotel.id}>
              <img src={hotel.imageUrl} alt={hotel.name} />
              <div className="room-details">
                <div>
                  <FontAwesomeIcon icon={faHouseUser} />
                  <span> 150 sq ft</span>
                </div>
                <div>
                  <FontAwesomeIcon icon={faUser} />
                  <span> 2 Guests</span>
                </div>
                <div>
                  <FontAwesomeIcon icon={faBed} />
                  <span> Guests</span>
                </div>
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
              <small className="nearby">{hotel.location}</small>
              <span className="savings">
                {`SAVE $${(hotel.marketBase - hotel.netBase).toFixed(2)}`}
              </span>
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
  justify-content: center;
  padding: 1rem 0;
`;

const HotelCard = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  max-width: 20rem;
  border: 2px solid #c3c3c3;
  margin: 1rem;
  border-radius: 1rem;
  box-shadow: 0px 6px 10px 0px #c3c3c3;
  position: relative;

  img {
    object-fit: fill;
    border-radius: 0.9rem 0.9rem 0 0;
    height: 14rem;
    margin-bottom: 1.5rem;
  }

  .hr {
    background-color: #c3c3c3;
    height: 1px;
    width: 90%;
  }

  .room-details {
    display: flex;
    justify-content: space-between;
    margin: 0 1rem;
    div {
      color: #898989;
      font-weight: 600;
    }
  }

  .wrapper {
    display: flex;
    justify-content: space-between;
    padding: 1rem 1rem 0.2rem;
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
        font-size: 28px;
        font-weight: bold;
        color: #6b9512;
      }
    }
  }
  .savings {
    color: white;
    font-weight: bold;
    background-color: #6b9512;
    border: 3px solid white;
    box-shadow: 0px 0px 2px 2px #898989;
    border-radius: 50%;
    height: 5.1rem;
    width: 5.1rem;
    padding: 1.2rem 0.8rem;
    text-align: center;
    position: absolute;
    right: -1rem;
    top: 10rem;
    line-height: 16px;
  }

  small {
    padding: 1rem;
    text-align: left;
    &.nearby {
      padding: 0 1rem;
      font-style: italic;
    }
  }
`;
