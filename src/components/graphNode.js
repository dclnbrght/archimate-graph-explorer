import * as settings from '../settings.js';

const colorForNodeType = (nodeType) => {
    switch(nodeType) {
        case "ApplicationComponent":
        case "ApplicationCollaboration":
        case "ApplicationEvent":
        case "ApplicationFunction":
        case "ApplicationInteraction":
        case "ApplicationInterface":
        case "ApplicationProcess":
        case "ApplicationService":
        case "DataObject":
            return "#b6f4f6";
        case "BusinessActor":
        case "BusinessCollaboration":
        case "BusinessEvent":
        case "BusinessFunction":
        case "BusinessInteraction":
        case "BusinessInterface":
        case "BusinessObject":
        case "BusinessProcess":
        case "BusinessRole":
        case "BusinessService":
        case "Contract":
        case "Product":
        case "Representation":
        case "Location":
            return "#ffffb1";
        case "Assessment":
        case "Constraint":
        case "Driver":
        case "Goal":
        case "Meaning":
        case "Outcome":
        case "Principle":
        case "Requirement":
        case "Stakeholder":
        case "Value":
            return "#ccf";
        case "DistributionNetwork":
        case "Equipment":
        case "Facility":
        case "Material":
            return "#d1f6c5";
        case "Artifact":
        case "CommunicationNetwork":
        case "Device":
        case "Node":
        case "Path":
        case "SystemSoftware":
        case "TechnologyCollaboration":
        case "TechnologyEvent":
        case "TechnologyFunction":
        case "TechnologyInteraction":
        case "TechnologyInterface":
        case "TechnologyProcess":
        case "TechnologyService":
            return "#d1f6c5";
        case "Capability":
        case "CourseOfAction":
        case "Resource":
        case "ValueStream":
            return "#f5deaa";
        case "Deliverable":
        case "ImplementationEvent":
        case "WorkPackage":
            return "#ffe0e0";
        case "Gap":
        case "Plateau":
            return "#e0ffe0";
    }
    
    return "#fefefe";
}

const iconForNodeType = (nodeType) => {
    switch(nodeType) {
        case "ApplicationComponent":
            return "m -5 1 l 4 0 l 0 2 l -4 0 z m 0 -4 l 4 0 l 0 2 l -4 0 z m 2 0 l 0 -2 l 8 0 l 0 10 l -8 0 l 0 -2 m 0 -2 l 0 -2";
            
        case "Artifact":
            return "M 4 -1 V 5 H -4 V -5 H 0 L 3.35 -1.5 H 0 V -5";

        case "Assessment":
            return "m -3.5 -2 C -3.5 -8 5.5 -8 5.5 -2 C 5.5 4 -3.5 4 -3.5 -2 M -1 2 L -4 7";

        case "ApplicationCollaboration":
        case "BusinessCollaboration":
        case "TechnologyCollaboration":
            return "m -7 0 A 1 1 0 0 0 2 0 A 1 1 0 0 0 -7 0 M -2 0 A 1 1 0 0 0 7 0 A 1 1 0 0 0 -2 0";

        case "ApplicationEvent":
        case "BusinessEvent":
        case "TechnologyEvent":
        case "ImplementationEvent":
            return "m -5 -4 C -2 -3 -2 3 -5 4 H 3 C 6 3 6 -3 3 -4 H -5 M 3 -4";

        case "ApplicationFunction":
        case "BusinessFunction":
        case "TechnologyFunction":
            return "M -0.35 -5.2 L 4 -1 L 4 5 L 0 2 L -4 5 L -4 -1 L 0.35 -5.2";

        case "ApplicationInteraction":
        case "BusinessInteraction":
        case "TechnologyInteraction":
            return "m -1 -5 C -6 -4 -6 4 -1 5 Z M 1 -5 V -5 C 6 -4 6 4 1 5 Z";
                
        case "ApplicationInterface":
        case "BusinessInterface":
        case "TechnologyInterface":
            return "m -3 0 z c 0 -6 9 -6 9 0 C 6 6 -3 6 -3 0 H -8 z";
            
        case "ApplicationProcess":
        case "BusinessProcess":
        case "TechnologyProcess":
            return "m -5 -1.5 H 2 V -4 L 6 0 L 2 4 V 1.5 H -5 z";

        case "ApplicationService":
        case "BusinessService":
        case "TechnologyService":
            return "m -4 3 z c -4 0 -4 -6 0 -6 H 4 C 8 -3 8 3 4 3 z";
        
        case "BusinessActor":
            return "m 0 -2 A 1 1 0 0 0 0 -6 A 1 1 0 0 0 0 -2 V 3 M -3 6 L 0 3 M 3 6 L 0 3 M -3 0 H 3";

        case "BusinessRole":
        case "Stakeholder":
            return "m -4 -3 C -6 -3 -6 3 -4 3 H 4 C 6 3 6 -3 4 -3 H -4 M 4 -3 c -2 0 -2 6 0 6";

        case "BusinessObject":
        case "DataObject":
            return "m -5 -5 H 5 V 5 V 5 V 5 H -5 Z M -5 -3 H 5";
            
        case "Capability":
            return "m -4.5 4.5 h 9 v -9 h -3 v 9 m 3 -6 h -6 v 6 m 6 -3 h -9 v 3";

        case "CommunicationNetwork":
            return "m -4 -3 A 1 1 0 0 0 -1 -3 m 0 0 A 1 1 0 0 0 -4 -3 m 6 0 A 1 1 0 0 0 5 -3 A 1 1 0 0 0 2 -3 H -1 m -4 6 A 1 1 0 0 0 -2 3 A 1 1 0 0 0 -5 3 m 6 0 A 1 1 0 0 0 4 3 A 1 1 0 0 0 1 3 H -2 M -2.5 -1.5 L -3.5 1.5 M 3.5 -1.5 L 2.5 1.5";

        case "Constraint":
            return "m -4 -4 H 6 L 4 4 H -6 L -4 -4 M -3 4 L -1 -4";

        case "Contract":
            return "m -5 -5 H 5 V 5 V 5 V 5 H -5 Z M -5 -3 H 5 M -5 3 H 5"

        case "CourseOfAction":
            return "M -4 -1 A 1 1 0 0 0 6 -1 M 6 -1 A 1 1 0 0 0 -4 -1 M -2 -1 A 1 1 0 0 0 4 -1 A 1 1 0 0 0 -2 -1 M 0 -1 A 1 1 0 0 0 2 -1 A 1 1 0 0 0 0 -1 m 0.5 0 a 0.5 0.5 0 0 0 1 0 a 0.5 0.5 0 0 0 -1 0 m 0.5 0 m -6 3 L -2.5 2.5 L -3 5 Z M -6 5 Q -6 3 -4 3 L -3.5 4 Q -5 4 -5 6 Z";

        case "Device":
            return "M -3 2 L -5 5 H 5 L 3 2 H 4 C 5 2 5 2 5 1 V -4 C 5 -5 5 -5 4 -5 h -8 C -5 -5 -5 -5 -5 -4 V 1 C -5 2 -5 2 -4 2 H -3 H 3";

        case "Driver":
            return "M -5 0 A 1 1 0 0 0 5 0 M 5 0 A 1 1 0 0 0 -5 0 M -3 0 A 1 1 0 0 0 3 0 A 1 1 0 0 0 -3 0 M -1 0 A 1 1 0 0 0 1 0 A 1 1 0 0 0 -1 0 M -0.5 0 A 0.5 -0.5 0 0 0 0.5 0 A 0.5 0.5 0 0 0 -0.5 0";

        case "Gap":
            return "M -5 0 A 1 1 0 0 0 5 0 M 5 0 A 1 1 0 0 0 -5 0 M -6.3 1.5 H 6.3 M -6.3 -1.5 H 6.3";

        case "Goal":
            return "M -5 0 A 1 1 0 0 0 5 0 M 5 0 A 1 1 0 0 0 -5 0 M -3 0 A 1 1 0 0 0 3 0 A 1 1 0 0 0 -3 0 M -1 0 A 1 1 0 0 0 1 0 A 1 1 0 0 0 -1 0";
        
        case "Location":
            return "m 4 -1 C 6 -8 -6 -8 -4 -1 L 0 6 Z";

        case "Meaning":
            return "M -5 0 C -7 -1 -3 -5 -2 -3 C 0 -5 3 -4 2 -2 C 4 -3 6 -2 5 0 C 7 1 5 4 2 3 C 3 5 -3 5 -3 3 C -5 4 -6 2 -5 0 Z";

        case "Node":
            return "m -5 -3 V 5 h 8 v -8.5 h -7.32 l 2 -2 H 5 V 2 L 3.1 5.23 M 3 -3 L 5 -5";
        
        case "Outcome":
            return "M -5 0 A 1 1 0 0 0 5 0 M 5 0 A 1 1 0 0 0 -5 0 M -3 0 A 1 1 0 0 0 3 0 A 1 1 0 0 0 -3 0 M -1 0 A 1 1 0 0 0 1 0 A 1 1 0 0 0 -1 0 M -0.5 0 A 0.5 -0.5 0 0 0 0.5 0 A 0.5 0.5 0 0 0 -0.5 0 M 0 0 L 5.7 -5.7 M 4.5 -7 L 4.2 -4.2 L 7 -4.5";
        
        case "Path":
            return "m -3 4 L -6 0 L -3 -4 M 3 -4 L 6 0 L 3 4 M -3.2 -0.2 H -2.8 V 0.2 H -3.2 Z M -0.2 -0.2 H 0.2 V 0.2 H -0.2 Z M 2.8 -0.2 H 3.2 V 0.2 H 2.8 Z";

        case "Plateau":
            return "M -5 0 H 5 M -6 2.4 H 4 M -4 -2.4 H 6";

        case "Principle":
            return "M -5 -5 Q -5 -6 -4 -6 Q 0 -6 4 -6 Q 5 -6 5 -5 V 5 Q 5 6 4 6 H -4 Q -5 6 -5 5 Z M -0.35 1.5 V -4 H 0.35 V 1.5 Z M -0.35 3.35 V 4 H 0.35 V 3.35 Z";

        case "Product":
            return "m -5 -5 H 5 V 5 V 5 V 5 H -5 Z M -5 -3 H 0 V -5";
        
        case "Representation":
            return "m -5 -5 H 5 v 9 v 0 v 0 c -5 -3 -5 3 -10 0 Z M -5 -3 H 5";

        case "Requirement":
            return "m -4 -4 H 6 L 4 4 H -6 Z";

        case "Resource":
            return "M -6 -3 Q -6 -4 -5 -4 H 4 Q 5 -4 5 -3 V 3 Q 5 4 4 4 H -5 Q -6 4 -6 3 z m 11 5 A 1 1 0 0 0 6 1 V -1 A 1 1 0 0 0 5 -2 Z M -4 -2 H -4 V 2 M -2 -2 V 2 M 0 -2 V 2";

        case "SystemSoftware":
            return "m -6 1 Z c 0 -7 10 -7 10 0 c 0 7 -10 7 -10 0 z m 1 -3.3 c 4 -8.7 15 -1.7 8 6.6";

        case "Value":
            return "m -6 0 C -6 -6 6 -6 6 0 C 6 6 -6 6 -6 0";

        case "ValueStream":
            return "M 6 0 L 3 4 H -5 L -2 0 L -5 -4 H 3 Z";
        
        case "AndJunction":
        case "OrJunction":
            return "M -5 0 A 1 1 0 0 0 5 0 M 5 0 A 1 1 0 0 0 -5 0";
    }
    return "";
}

const addNodes = (explorerWidth, explorerHeight, viewer, nodes, rootNodeId) => {

    const nodeRadius = 10;
    
    const renderedNodes = viewer.append("g")
        .attr("id", "nodes")
        .selectAll("g")
        .data(nodes)
        .enter()
            .append("g")
            .attr("id", (d) => { return d.id; })
            .attr("class", (d) => { return "element-" + d.type.toLowerCase(); })
            .classed("node-root", (d) => { 
                // style and position the pinned root node
                if (rootNodeId !== null && d.id === rootNodeId) {
                    d.fx = explorerWidth / 2;
                    d.fy = (explorerHeight * 0.9) / 2;
                    return true;
                }
                return false;
            });
      
    const nodeSymbol = renderedNodes.append("circle")
        .attr("r", nodeRadius)
        .attr("fill", (d) => { 
            if (settings.nodeProperty_DataClassificationLevelStyling_Enabled
                && d.properties !== undefined && d.properties.dataclassificationlevel !== undefined) {
                return settings.nodeProperty_DataClassificationLevelStyling_ColourMap[d.properties.dataclassificationlevel];
            }
            return colorForNodeType(d.type); 
        });

    nodeSymbol.append("title")
        .text((d) => { 
            let t = d.name;
            if (d.documentation !== undefined && d.documentation.length > 0)
                t += " - " + d.documentation
            return t; 
        });

    renderedNodes.append("path")
        .attr("d", (d) => { return iconForNodeType(d.type); })
        .attr("class", "node-icon");
        
    renderedNodes.append("text")      
        .attr("class", "node-label-type")
        .attr("dx", (d) => { return 16; })
        .attr("dy", (d) => { return -2; })
        .text((d) => { 
            let t = "(" + d.type + ")";
            if (settings.nodeProperty_StereotypeLabel_Enabled 
                && d.properties !== undefined && d.properties.stereotype !== undefined) {
                t += " «" + d.properties.stereotype + "»";
            }
            return t; 
        });

    renderedNodes.append("text")
        .attr("class", "node-label-name")
        .attr("dx", (d) => { return 16; })
        .attr("dy", (d) => { return 8; })
        .text((d) => { return d.name; });

    return renderedNodes;
}

const exportForTesting = {
    colorForNodeType,
    iconForNodeType
}

export { 
    addNodes, 
    exportForTesting 
};