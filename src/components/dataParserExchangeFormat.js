
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

const convertXmlToJson = (xml) => {
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
};

const exportForTesting = {
    parsePropertyDefinitionsFromXml,
    parseNodesFromXml,
    parseLinksFromXml
}

export { 
    convertXmlToJson,
    exportForTesting
}; 