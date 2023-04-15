
const formatType = (xsiType, junctionType) => {
    if (xsiType === "archimate:Junction") {
        if (junctionType == "or") {
            return "OrJunction";
        }
        else {
            return "AndJunction";
        }
    } 

    return xsiType.replace("archimate:", "");
}

const parseNodesFromXml = (xml) => {
    // get all elements, except those in the relations and diagrams folders
    const nodes = [].map.call(xml.querySelectorAll('folder:not([type="relations"],[type="diagrams"]) element'), (e) => {
        return {
            id: e.getAttribute("id"),         
            type: formatType(e.getAttribute("xsi:type"), e.getAttribute("type")),
            name: (e.getAttribute("name") ? e.getAttribute("name") : ""), 
            documentation: (e.querySelector("documentation") ? e.querySelector("documentation").textContent : ""),
            properties: ([].map.call(e.querySelectorAll("property"), (p) => {
                return { 
                    name: p.getAttribute("key") ?? "",
                    value: p.getAttribute("value") ?? ""
                };
            })).reduce((map, obj) => {
                map[obj.name.toLowerCase()] = obj.value;
                return map;
            }, {})
        };
    });

    return nodes;
};

const accessTypeMap = {
    1: "Read",
    2: "Write",
    3: "ReadWrite"
};

const parseLinksFromXml = (xml) => {
    const links = [].map.call(xml.querySelectorAll('folder[type="relations"] element'), (r) => {
        return {
            id: r.getAttribute("id"),
            type: r.getAttribute("xsi:type").replace("archimate:", "").replace("Relationship", ""),
            name: (r.getAttribute("name") ? r.getAttribute("name") : ""), 
            documentation: (r.querySelector("documentation") ? r.querySelector("documentation").textContent : ""),
            source: r.getAttribute("source"),
            target: r.getAttribute("target"),
            accessType: accessTypeMap[r.getAttribute("accessType")] ?? null,
            properties: ([].map.call(r.querySelectorAll("property"), (p) => {
                return { 
                    name: p.getAttribute("key"),
                    value: p.getAttribute("value")
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
    const modelName = xml.querySelector("model").getAttribute("name");
    const modelDocumentation = xml.querySelector("model > purpose") ? xml.querySelector("model > purpose").textContent : "";

    const nodes = parseNodesFromXml(xml);
    const links = parseLinksFromXml(xml);

    const graphDataJson = {
        modelName: modelName,
        modelDocumentation: modelDocumentation,
        nodes: nodes,
        links: links
    };

    return graphDataJson;
};

const exportForTesting = {
    parseNodesFromXml,
    parseLinksFromXml
}

export { 
    convertXmlToJson,
    exportForTesting
}; 