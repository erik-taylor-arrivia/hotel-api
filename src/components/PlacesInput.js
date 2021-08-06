const PlacesInput = ({ getLocations }) => {
  return (
    <input
      required
      type="text"
      name="geo-search"
      id="geo-location"
      placeholder="Search Location"
      onChange={(e) => {
        getLocations(e.target.value);
      }}
    />
  );
};

export default PlacesInput;
