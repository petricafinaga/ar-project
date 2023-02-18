let xmlDoc = undefined;

const setInitialPosition = (position) => {
  const { latitude, longitude } = position.coords;

  console.log("Current camera position: ", position.coords);

  // Set camera position to our position
  camera.setAttribute(
    "gps-new-camera",
    `simulateLatitude: ${latitude}; simulateLongitude: ${longitude}; simulateAltitude: 50`
  );
};

const camera = document.querySelector("[gps-new-camera]");
