
import * as dataParserExchangeFormat from './dataParserExchangeFormat.js';
import * as dataParserArchiFormat from './dataParserArchiFormat.js';

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
            processModelFile(xmlString);
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

const processModelFile = (xmlString) => {
    
    const xml = new window.DOMParser().parseFromString(xmlString, "text/xml");
    if (xml.querySelectorAll("parsererror").length > 0) {
        const msg = `Error parsing the model file \r\n\r\n${ xml.querySelector("parsererror > div").textContent }`;
        console.log();
        alert(msg);
    }    

    try {
        // Determine if Archi file or ArchiMate Model Exchange Format
        if (xml.querySelector('model') !== null) {
            if (xml.querySelector('model').namespaceURI === "http://www.archimatetool.com/archimate") {
                // Archi file    
                sessionStorage.setItem(graphDataStoreKey, JSON.stringify(dataParserArchiFormat.convertXmlToJson(xml)));
            }
            else {
                // ArchiMate Model Exchange Format file
                sessionStorage.setItem(graphDataStoreKey, JSON.stringify(dataParserExchangeFormat.convertXmlToJson(xml)));
            }
        }
    } catch (error) {
        const msg = `Error parsing the model file, it must be a valid ArchiMate Model Exchange Format or Archi file \r\n\r\n${error}`;
        console.error(msg);
        alert(msg);
    }
}

export { 
    requestDataFromServer, 
    dataExistsInStore,
    requestDataFromStore,
    deleteDataFromStore,
    processModelFile,
    modelOverview
}; 