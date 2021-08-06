import Styled from "@emotion/styled";

const PlacesOutput = ({ places }) => {
  return (
    <LocationResults id="places">
      {places.map((query) => {
        return (
          <h4 key={query.placeId}>
            {query.placeLongName} {query.latitude} {query.longitude}
          </h4>
        );
      })}
    </LocationResults>
  );
};

export default PlacesOutput;

const LocationResults = Styled.div`
  margin: 0 auto;
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: center;

  h4 {
    font-weight: 500;
  }
`;
