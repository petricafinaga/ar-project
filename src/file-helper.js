let xmlFile = null;

const onFileLoaded = (file) => {
  xmlFile = file.target.data;
};

const renderOpenStreetMapData = () => {
  // Parse the XML data
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlFile, "text/xml");

  const openMapWays = xmlDoc.getElementsByTagName("way");

  Array.from(openMapWays).forEach((way) => {
    const name = way.querySelector("[k=name]");
    if (!name) return;

    const nodes = way.getElementsByTagName("nd");

    const line = createLine(
      nodeToLatLong(nodes[0], xmlDoc),
      nodeToLatLong(nodes[1], xmlDoc),
      name
    );

    document.querySelector("a-scene").appendChild(line);
  });
};
