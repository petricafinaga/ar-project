const nodeToLatLong = (node, xmlDoc) => {
  const id = node.getAttribute("ref");
  const nodeXml = xmlDoc.getElementById(id);

  const lat = nodeXml.getAttribute("lat");
  const long = nodeXml.getAttribute("lon");

  return { lat, long };
};

const createPointOfInterest = (interestPoint) => {
  const { latitude, longitude } = interestPoint.position;

  const model =
    interestPoint.model === "house" ? "#houseModel" : "#buildingModel";
  const scale = interestPoint.model === "house" ? 4 : 0.1;

  const entity = document.createElement("a-gltf-model");
  entity.setAttribute("src", model);
  entity.setAttribute("look-at", "[gps-new-camera]");
  entity.setAttribute("position", "0 0 0");
  entity.setAttribute("scale", {
    x: scale,
    y: scale,
    z: scale,
  });

  entity.setAttribute("gps-new-entity-place", {
    latitude,
    longitude,
  });

  const text = document.createElement("a-entity");
  text.setAttribute("position", "0 40 0");
  text.setAttribute("look-at", "[gps-new-camera]");
  text.setAttribute("text", {
    value: interestPoint.name,
    color: "green",
    side: "double",
  });
  text.setAttribute("scale", {
    x: 150,
    y: 150,
    z: 150,
  });
  text.setAttribute("gps-new-entity-place", {
    latitude,
    longitude,
  });

  const info = document.createElement("a-entity");
  info.setAttribute("position", "0 34 0");
  info.setAttribute("look-at", "[gps-new-camera]");
  info.setAttribute("text", {
    value: interestPoint.info,
    color: "red",
    side: "double",
  });
  info.setAttribute("scale", {
    x: 130,
    y: 130,
    z: 130,
  });
  info.setAttribute("gps-new-entity-place", {
    latitude,
    longitude,
  });

  return [entity, text, info];
};

const createLine = (node1, node2, name) => {
  const cam = camera.components["gps-new-camera"];

  const p1 = cam.latLonToWorld(node1.lat, node1.long);
  const p2 = cam.latLonToWorld(node2.lat, node2.long);

  const lineEntity = document.createElement("a-entity");
  lineEntity.setAttribute(
    "line",
    `start: ${p1[0]} 0 ${p1[1]}; end: ${p2[0]} 0 ${p2[1]}; color: blue;`
  );

  return lineEntity;
};

const drawElements = () => {
  pointsOfInterest.forEach((interestPoint) => {
    const createdPoints = createPointOfInterest(interestPoint);

    createdPoints.forEach((point) => {
      document.querySelector("a-scene").appendChild(point);
    });
  });

  const line = createLine(
    { lat: 47.6413581, long: 26.2436994 },
    { lat: 47.6377001, long: 26.2256172 },
    "nume strada"
  );

  document.querySelector("a-scene").appendChild(line);
};
