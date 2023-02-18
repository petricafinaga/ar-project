let testEntityAdded = false;

const nodeToLatLong = (node) => {
  const id = node.getAttribute("ref");
  const nodeXml = xmlDoc.getElementById(id);

  const lat = nodeXml.getAttribute("lat");
  const long = nodeXml.getAttribute("lon");

  return { lat, long };
};

const drawBoxAtCurrentPosition = (position) => {
  if (!testEntityAdded) {
    const { latitude, longitude } = position;

    // Add a box to the north of the initial GPS position
    const entity = document.createElement("a-gltf-model");
    entity.setAttribute("src", "#buildingModel");
    entity.setAttribute("scale", {
      x: 0.5,
      y: 0.5,
      z: 0.5,
    });

    entity.setAttribute("material", { color: "red" });
    entity.setAttribute("gps-new-entity-place", {
      latitude: latitude + 0.002,
      longitude: longitude,
    });

    console.log("first  entity", latitude + 0.002, longitude - 0.002);
    document.querySelector("a-scene").appendChild(entity);

    const entity1 = document.createElement("a-gltf-model");
    entity1.setAttribute("src", "#buildingModel");
    entity1.setAttribute("scale", {
      x: 0.5,
      y: 0.5,
      z: 0.5,
    });

    entity1.setAttribute("material", { color: "green" });
    entity1.setAttribute("gps-new-entity-place", {
      latitude: latitude + 0.002,
      longitude: longitude + 0.003,
    });

    console.log("second entity", latitude + 0.004, longitude + 0.003);

    entity1.setAttribute("position", "0 0 0");
    document.querySelector("a-scene").appendChild(entity1);

    // const line = createLine(
    //   { lat: 47.0, long: 24.0 },
    //   { lat: 47.11111, long: 24.1111 },
    //   "nume strada"
    // );

    // document.querySelector("a-scene").appendChild(line);
  }
  testEntityAdded = true;
};

const createLine = (node1, node2, name) => {
  console.log(node1, node2);
  const lineEntity = document.createElement("a-entity");

  const setLineAttributes = () => {
    console.log("line loaded", lineEntity);

    lineEntity.setAttribute(
      "line",
      `start: ${node1.lat} ${node1.long} 0; end: ${node2.lat} ${node2.long} 0;`
    );
    // lineEntity.setAttribute("position", "0 0 0");
    // lineEntity.setAttribute("material", { color: "#00ff00" });
    // lineEntity.setAttribute("geometry", { primitive: "line" });
    lineEntity.setAttribute("text", `value: ${name}; align: center`);

    lineEntity.setAttribute("line", "start: 0 1 0; end: 2 0 -5; color: red");
  };

  lineEntity.addEventListener("loaded", setLineAttributes);

  const start = `start: ${node1.lat} ${node1.long} 0; end: ${node2.lat} ${node2.long} 0;`;

  // lineEntity.setAttribute(
  //   "line",
  //   `start: ${node1.lat} ${node1.long} 0; end: ${node2.lat} ${node2.long} 0;`
  // );
  // lineEntity.setAttribute("position", "0 0 0");
  // lineEntity.setAttribute("material", "color: #00ff00");
  // // lineEntity.setAttribute("geometry", "primitive: line");
  // lineEntity.setAttribute("text", `value: ${name}; align: center`);

  // lineEntity.setAttribute("line", "start: 0 1 0; end: 2 0 -5; color: red");

  return lineEntity;
};

const createPlane = (node1, node2, name) => {
  const height = Math.abs(node1.lat - node2.lat);
  const width = Math.abs(node1.long - node2.long);

  // console.log(node1, node2);
  const planeEntity = document.createElement("a-plane");

  const setLineAttributes = () => {
    console.log("line loaded", lineEntity);

    lineEntity.setAttribute(
      "line",
      `start: ${node1.lat} ${node1.long} 0; end: ${node2.lat} ${node2.long} 0;`
    );
    // lineEntity.setAttribute("position", "0 0 0");
    // lineEntity.setAttribute("material", { color: "#00ff00" });
    // lineEntity.setAttribute("geometry", { primitive: "line" });
    lineEntity.setAttribute("text", `value: ${name}; align: center`);

    lineEntity.setAttribute("line", "start: 0 1 0; end: 2 0 -5; color: red");
  };

  planeEntity.setAttribute(
    "gps-new-camera",
    `latitude: ${node1.lat}; longitude: ${node1.long}`
  );

  planeEntity;

  lineEntity.addEventListener("loaded", setLineAttributes);

  const start = `start: ${node1.lat} ${node1.long} 0; end: ${node2.lat} ${node2.long} 0;`;

  // lineEntity.setAttribute(
  //   "line",
  //   `start: ${node1.lat} ${node1.long} 0; end: ${node2.lat} ${node2.long} 0;`
  // );
  // lineEntity.setAttribute("position", "0 0 0");
  // lineEntity.setAttribute("material", "color: #00ff00");
  // // lineEntity.setAttribute("geometry", "primitive: line");
  // lineEntity.setAttribute("text", `value: ${name}; align: center`);

  // lineEntity.setAttribute("line", "start: 0 1 0; end: 2 0 -5; color: red");

  return lineEntity;
};
