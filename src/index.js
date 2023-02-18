// import DrawingHelper from "./drawing-helper";

window.onload = async () => {
  const testPosition = {
    coords: {
      latitude: 47.643904,
      longitude: 26.2623057,
    },
  };

  //   navigator.geolocation.getCurrentPosition(setInitialPosition);
  setInitialPosition(testPosition);

  camera.addEventListener("gps-camera-update-position", (e) => {
    console.log("GPS position update from camera:", e.detail.position);
    drawBoxAtCurrentPosition(e.detail.position);
  });

  // Load the OpenStreetMap XML data
  const mapFile = document.getElementById("open-street-map");
  mapFile.addEventListener("loaded", onFileLoaded);

  const scenes = document.getElementsByTagName("a-scene");
  console.log(scenes);
  scenes[0].addEventListener("click", (e) => {
    console.log("click event dispatched", e);
  });
};
