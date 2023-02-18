const onFileLoaded = (file) => {
    // Parse the XML data
    const parser = new DOMParser();
    xmlDoc = parser.parseFromString(file.target.data, "text/xml");
  
    const openMapWays = xmlDoc.getElementsByTagName("way");
    const roads = document.getElementById("roads-container");
  
    Array.from(openMapWays).forEach((way) => {
      const name = way.querySelector("[k=name]");
      if (!name) return;
  
      const nodes = way.getElementsByTagName("nd");
  
      // Create curve
      if (nodes.length > 2) {
        // console.log("curve");
        // create line
      } else {
        const line = createLine(
          nodeToLatLong(nodes[0]),
          nodeToLatLong(nodes[1]),
          name
        );
  
        console.log(line);
        // roads.appendChild(line);
      }
    });
  };