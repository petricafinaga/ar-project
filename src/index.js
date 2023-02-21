window.onload = async () => {
  const testPosition = {
    coords: {
      latitude: 47.6395075,
      longitude: 26.2438617,
    },
  };

  window.camera = document.querySelector("[gps-new-camera]");

  navigator.geolocation.getCurrentPosition(setInitialPosition);
  // setInitialPosition(testPosition);

  let alreadyAdded = false;
  const handleCameraPositionChange = (event) => {
    updateGPSPosition(event);

    if (!alreadyAdded) {
      drawElements();
      renderOpenStreetMapData();
      alreadyAdded = true;
    }
  };

   // Load the OpenStreetMap XML data
   const mapFile = document.getElementById("open-street-map");
   mapFile.addEventListener("loaded", onFileLoaded);

  camera.addEventListener(
    "gps-camera-update-position",
    handleCameraPositionChange
  );
};
