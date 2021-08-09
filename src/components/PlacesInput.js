const PlacesInput = ({ getLocations }) => {
  const val = document.getElementById("geo-location");
  return (
    <input
      required
      type="text"
      name="geo-search"
      id="geo-location"
      placeholder="Search Location"
      onBlur={(e) => {
        getLocations(e.target.value);
      }}
      onChange={(e) => {
        getLocations(e.target.value);
      }}
      onKeyDown={(e) => {
        getLocations(e.target.value);
        if (e.key === "Enter") {
          getLocations(e.target.value);
        }
      }}
    />
  );
};

export default PlacesInput;
