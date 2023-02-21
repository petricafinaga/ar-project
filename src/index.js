window.onload = async () => {
  const testPosition = {
    coords: {
      latitude: 47.6376913,
      longitude: 26.2417762,
    },
  };

  navigator.geolocation.getCurrentPosition(setInitialPosition);
  // setInitialPosition(testPosition);

  camera.addEventListener("gps-camera-update-position", (e) => {
    console.log("GPS position update from camera:", e.detail.position);
    drawBoxAtCurrentPosition(e.detail.position);
  });

  // Load the OpenStreetMap XML data
  const mapFile = document.getElementById("open-street-map");
  mapFile.addEventListener("loaded", onFileLoaded);

  // const scenes = document.getElementsByTagName("a-scene");
  // console.log(scenes);
  // scenes[0].addEventListener("click", (e) => {
  //   console.log("click event dispatched", e);
  // });
};
