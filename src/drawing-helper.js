let testEntityAdded = false;

const nodeToLatLong = (node, xmlDoc) => {
  const id = node.getAttribute("ref");
  const nodeXml = xmlDoc.getElementById(id);

  const lat = nodeXml.getAttribute("lat");
  const long = nodeXml.getAttribute("lon");

  return { lat, long };
};

const createPointOfInterest = (interestPoint) => {
  const { latitude, longitude } = interestPoint.position;

  const entity = document.createElement("a-gltf-model");
  entity.setAttribute("src", "#buildingModel");
  entity.setAttribute("look-at", "[gps-new-camera]")
  entity.setAttribute("scale", {
    x: 0.2,
    y: 0.2,
    z: 0.2,
  });

  entity.setAttribute("gps-new-entity-place", {
    latitude,
    longitude,
  });

  const text = document.createElement("a-entity");
  text.setAttribute("position", "0 90 0");
  text.setAttribute("look-at", "[gps-new-camera]")
  text.setAttribute("color", "red");
  text.setAttribute("text", { value: interestPoint.name });
  text.setAttribute("scale", {
    x: 200,
    y: 200,
    z: 200,
  });

  text.setAttribute("material", { color: "red" });
  text.setAttribute("gps-new-entity-place", {
    latitude,
    longitude,
  });

  return [entity, text];
};

const drawBoxAtCurrentPosition = () => {
  if (!testEntityAdded) {
    pointsOfInterest.forEach((interestPoint) => {
      const createdPoints = createPointOfInterest(interestPoint);

      createdPoints.forEach((point) => {
        document.querySelector("a-scene").appendChild(point);
      });
    });

    // const { latitude, longitude } = position;

    // // Add a box to the north of the initial GPS position
    // const entity = document.createElement("a-gltf-model");
    // entity.setAttribute("src", "#buildingModel");
    // entity.setAttribute("scale", {
    //   x: 0.5,
    //   y: 0.5,
    //   z: 0.5,
    // });

    // entity.setAttribute("material", { color: "red" });
    // entity.setAttribute("gps-new-entity-place", {
    //   latitude: latitude + 0.002,
    //   longitude: longitude,
    // });

    // console.log("first  entity", latitude + 0.002, longitude - 0.002);
    // document.querySelector("a-scene").appendChild(entity);

    // const entity1 = document.createElement("a-gltf-model");
    // entity1.setAttribute("src", "#buildingModel");
    // entity1.setAttribute("scale", {
    //   x: 0.5,
    //   y: 0.5,
    //   z: 0.5,
    // });

    // entity1.setAttribute("material", { color: "green" });
    // entity1.setAttribute("gps-new-entity-place", {
    //   latitude: latitude + 0.002,
    //   longitude: longitude + 0.003,
    // });

    // console.log("second entity", latitude + 0.004, longitude + 0.003);

    // entity1.setAttribute("position", "0 0 0");
    // document.querySelector("a-scene").appendChild(entity1);

    // // <a-entity text="value: Hello World;"></a-entity>

    // // Add a box to the north of the initial GPS position
    // const text = document.createElement("a-entity");
    // text.setAttribute("position", "0 140 0");
    // text.setAttribute("color", "red");
    // text.setAttribute("text", "value: Hello World;");
    // text.setAttribute("scale", {
    //   x: 150,
    //   y: 150,
    //   z: 150,
    // });

    // //  entity.setAttribute("material", { color: "red" });
    // text.setAttribute("gps-new-entity-place", {
    //   latitude: latitude + 0.002,
    //   longitude: longitude,
    // });

    // //  console.log("first  entity", text + 0.002, longitude - 0.002);
    // document.querySelector("a-scene").appendChild(text);

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
