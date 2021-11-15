const graphDataStoreKey = "archiGraphDataStore";

const requestDataFromServer = (modelPath, callback) => {
    fetch(modelPath)
        .then(response => {
            if (!response.ok) {                
                throw new Error(response.statusText);
            }            
            return response.text()
        })
        .then(xmlString => {
            processExchangeFormatFile(xmlString);
            callback();
        })
        .catch(error => {
            const msg = `Error retrieving the model file from the server, please check the modelPath in settings \r\n\r\n${error}`;
            console.error(msg);
            alert(msg);
        });
}

const dataExistsInStore = () => {
    return ((sessionStorage.getItem(graphDataStoreKey) === null) ? false : true);
}

const requestDataFromStore = () => {
    if (!dataExistsInStore()) {
        alert("Ooops, that's not good, we've lost the data, please reload the app ....");
        return JSON.parse('{"nodes": [], "links": []}');
    }
    else {
        return JSON.parse(sessionStorage.getItem(graphDataStoreKey));
    }
}

const deleteDataFromStore = () => {
    if (sessionStorage.getItem(graphDataStoreKey) !== null) {
        sessionStorage.removeItem(graphDataStoreKey);
    }
}

const modelOverview = () => {
    const graph = requestDataFromStore();

    const modelName = graph.modelName;
    const modelDocumentation = graph.modelDocumentation;
    
    return { modelName, modelDocumentation };
}

const parsePropertyDefinitionsFromXml = (xml) => {
    // Create a JSON map of the property definitions from the exchange format file xml
    const propertyDefinitionsMap = [].map.call(xml.querySelectorAll("propertyDefinition"), (e) => {
        return {
            propertyDefinitionRef: e.getAttribute("identifier"),
            name: e.querySelector("name").textContent
        };
    }).reduce((map, obj) => {
        map[obj.propertyDefinitionRef] = obj.name;
        return map;
    }, {});

    return propertyDefinitionsMap;
};

const parseNodesFromXml = (xml, propertyDefinitionsMap) => {
    const nodes = [].map.call(xml.querySelectorAll("element"), (e) => {
        return {
            id: e.getAttribute("identifier"),
            type: e.getAttribute("xsi:type"),
            name: (e.querySelector("name") ? e.querySelector("name").textContent : ""), 
            documentation: (e.querySelector("documentation") ? e.querySelector("documentation").textContent : ""), 
            properties: ([].map.call(e.querySelectorAll("property"), (p) => {                
                return { 
                    name: propertyDefinitionsMap[p.getAttribute("propertyDefinitionRef")],
                    value: p.querySelector("value").textContent
                };
            })).reduce((map, obj) => {
                map[obj.name.toLowerCase()] = obj.value;
                return map;
            }, {})
        };
    });

    return nodes;
};

const parseLinksFromXml = (xml, propertyDefinitionsMap) => {
    const links = [].map.call(xml.querySelectorAll("relationship"), (r) => {
        return {
            id: r.getAttribute("identifier"),            
            type: r.getAttribute("xsi:type"),            
            name: (r.querySelector("name") ? r.querySelector("name").textContent : ""), 
            documentation: (r.querySelector("documentation") ? r.querySelector("documentation").textContent : ""),
            source: r.getAttribute("source"),
            target: r.getAttribute("target"),
            accessType: r.getAttribute("accessType"),
            properties: ([].map.call(r.querySelectorAll("property"), (p) => {                
                return { 
                    name: propertyDefinitionsMap[p.getAttribute("propertyDefinitionRef")],
                    value: p.querySelector("value").textContent
                };
            })).reduce((map, obj) => {
                map[obj.name.toLowerCase()] = obj.value;
                return map;
            }, {})
        };
    });

    return links;
};

const convertXmlToJson = (xmlString) => {
    try {
        const xml = new window.DOMParser().parseFromString(xmlString, "text/xml");

        if (xml.querySelectorAll("parsererror").length > 0) {
            const msg = `Error parsing the model file \r\n\r\n${ xml.querySelector("parsererror > div").textContent }`;
            console.log();
            alert(msg);
        }

        const modelName = xml.querySelector("model > name") ? xml.querySelector("model > name").textContent : "";
        const modelDocumentation = xml.querySelector("model > documentation") ? xml.querySelector("model > documentation").textContent : "";

        const propertyDefinitionsMap = parsePropertyDefinitionsFromXml(xml);
        const nodes = parseNodesFromXml(xml, propertyDefinitionsMap);
        const links = parseLinksFromXml(xml, propertyDefinitionsMap);

        const graphDataJson = {
            modelName: modelName,
            modelDocumentation: modelDocumentation,
            nodes: nodes,
            links: links
        };
        
        return graphDataJson;
    } catch (error) {
        const msg = `Error parsing the model file, please ensure it is a valid ArchiMate Model Exchange Format file \r\n\r\n${error}`;
        console.error(msg);
        alert(msg);
    }
}

const processExchangeFormatFile = (xmlString) => {
    const jsonGraph = convertXmlToJson(xmlString);
    sessionStorage.setItem(graphDataStoreKey, JSON.stringify(jsonGraph));
}

const exportForTesting = {
    parsePropertyDefinitionsFromXml,
    parseNodesFromXml,
    parseLinksFromXml
}

export { 
    requestDataFromServer, 
    dataExistsInStore,
    requestDataFromStore,
    deleteDataFromStore,
    processExchangeFormatFile, 
    modelOverview, 
    exportForTesting 
}; 