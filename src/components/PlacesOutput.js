import Styled from "@emotion/styled";

const PlacesOutput = ({ places, getHotels, checkIn, checkOut }) => {
  const handlePlaceClick = (e) => {
    e.preventDefault();
    const placesDiv = document.getElementById("places");
    console.log(`Awesome work ${e.target.innerText}`);
    //placesDiv.style.display = "none";
  };

  return (
    <LocationResults id="places">
      {places.map((query) => {
        return (
          query,
          (
            <h4
              key={query.placeId}
              onClick={(e) => {
                handlePlaceClick(e);
                getHotels(
                  query.placeLongName,
                  query.latitude,
                  query.longitude,
                  "2021-10-15",
                  "2021-10-30"
                );
              }}
            >
              {query.placeLongName} {query.latitude} {query.longitude}
            </h4>
          )
        );
      })}
    </LocationResults>
  );
};

export default PlacesOutput;

const LocationResults = Styled.div`
  text-align: left;
  margin: 0 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media(min-width: 700px){
    max-width: 700px;
    margin: 0 auto;
  }

  h4 {
    font-weight: 500;
  }
`;
