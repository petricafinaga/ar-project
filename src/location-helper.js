const setInitialPosition = (position) => {
  const { latitude, longitude } = position.coords;

  console.log("Current camera position: ", position.coords);

  // Set camera position to our position
  camera.setAttribute(
    "gps-new-camera",
    `simulateLatitude: ${latitude}; simulateLongitude: ${longitude}; simulateAltitude: 10`
  );
};

const handleCameraPositionChange = (event) => {
  console.log("GPS position update from camera:", event.detail.position);

  drawBoxAtCurrentPosition(event.detail.position);

  const {latitude, longitude} = event.detail.position;
  document.getElementById('current-position').innerText = `lat: ${latitude}; long: ${longitude}`;
}
