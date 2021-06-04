export default function geoLocation({
  geoactive,
  setGeoactive,
  setGeolocation,
}) {
  if (!geoactive) {
    setGeoactive(!geoactive);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(setCoordinates);
    } else {
      alert("Não foi possivel obter a localização!");
      setGeoactive(!geoactive);
    }
    function setCoordinates(event) {
      setGeolocation({
        latitude: event.coords.latitude,
        longitude: event.coords.longitude,
      });
    }
  } else {
    setGeoactive(!geoactive);
    setGeolocation({
      latitude: "",
      longitude: "",
    });
  }
}
