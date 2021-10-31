
const addArrowHeadsDefinitions = (svg) => {

    const defs = svg.append("defs")
    const markerBoxWidth = 10, markerBoxHeight = 10;

    defs.append('marker')
        .attr('id', 'relationship-arrow-open')
        .attr('viewBox', [0,-8,20,20])
        .attr('refX', 31)
        .attr('refY', 0)
        .attr('markerUnits', 'strokeWidth')
        .attr('markerWidth', markerBoxWidth)
        .attr('markerHeight', markerBoxHeight)
        .attr('orient', 'auto')
        .append('path')
        .attr("d", "M0,-5L10,0L0,5")
        .attr("class", "relationship-arrow-open");

    defs.append('marker')
        .attr('id', 'relationship-arrow-open-read')
        .attr('viewBox', [0,-8,20,20])
        .attr('refX', -21)
        .attr('refY', 0)
        .attr('markerUnits', 'strokeWidth')
        .attr('markerWidth', markerBoxWidth)
        .attr('markerHeight', markerBoxHeight)
        .attr('orient', 'auto')
        .append('path')
        .attr("d", "M10,-5L0,0L10,5")
        .attr("class", "relationship-arrow-open");
    
    defs.append('marker')
        .attr('id', 'relationship-arrow-closed')
        .attr('viewBox', [0,-8,20,20])
        .attr('refX', 31)
        .attr('refY', 0)
        .attr('markerUnits', 'strokeWidth')
        .attr('markerWidth', markerBoxWidth)
        .attr('markerHeight', markerBoxHeight)
        .attr('orient', 'auto')
        .append('path')
        .attr("d", "M0,-5L10,0L0,5")
        .attr("class", "relationship-arrow-closed");
    
    defs.append('marker')
        .attr('id', 'relationship-arrowlarge-open')
        .attr('viewBox', [0,-8,20,20])
        .attr('refX', 31)
        .attr('refY', 0)
        .attr('markerUnits', 'strokeWidth')
        .attr('markerWidth', markerBoxWidth)
        .attr('markerHeight', markerBoxHeight)
        .attr('orient', 'auto')
        .append('path')
        .attr("d", "M 0 0 L 0 -8 L 10 0 L 0 8 L 0 0")
        .attr("class", "relationship-arrowlarge-open");
    
    defs.append('marker')
        .attr('id', 'relationship-diamond-open-start')
        .attr('viewBox', [0,-8,22,22])
        .attr('refX', -23)
        .attr('refY', 0)
        .attr('markerUnits', 'strokeWidth')
        .attr('markerWidth', markerBoxWidth)
        .attr('markerHeight', markerBoxHeight)
        .attr('orient', 'auto')
        .append('path')
        .attr("d", "M 0 0 L 8 -6 L 16 0 L 8 6 L 0 0")
        .attr("class", "relationship-diamond-open");

    defs.append('marker')
        .attr('id', 'relationship-diamond-closed-start')
        .attr('viewBox', [0,-8,22,22])
        .attr('refX', -23)
        .attr('refY', 0)
        .attr('markerUnits', 'strokeWidth')
        .attr('markerWidth', markerBoxWidth)
        .attr('markerHeight', markerBoxHeight)
        .attr('orient', 'auto')
        .append('path')
        .attr("d", "M 0 0 L 8 -6 L 16 0 L 8 6 L 0 0")
        .attr("class", "relationship-diamond-closed");

    defs.append('marker')
        .attr('id', 'relationship-circle-closed-start')
        .attr('viewBox', [0,-8,22,22])
        .attr('refX', -23)
        .attr('refY', 0)
        .attr('markerUnits', 'strokeWidth')
        .attr('markerWidth', markerBoxWidth)
        .attr('markerHeight', markerBoxHeight)
        .attr('orient', 'auto')
        .append('path')
        .attr("d", "M 5, 0 m -5, 0 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0")
        .attr("class", "relationship-circle-closed");
}

const addLinks = (viewer, links) => {
    const renderedLinks = viewer.append("g")
        .attr("id", "links")
        .selectAll("line")
        .data(links)
        .enter()
            .append("line")
            .attr("id", (d) => { return d.id; }) 
            .attr("class", (d) => { return "relationship-" + d.type.toLowerCase(); }) 
            .attr("marker-start", (d) => { return linkMarkerStart(d); })
            .attr("marker-end", (d) => { return linkMarkerEnd(d); });
      
    renderedLinks.append("title")
        .text((d) => { return d.name; });

    return renderedLinks;
}

const linkMarkerStart = (d) => {
    switch (d.type) {
        case "Access": 
            if (d.accessType === "Read" || d.accessType === "ReadWrite") 
                return "url(#relationship-arrow-open-read)"; 
            else  
                return null;
        case "Aggregation":
            return "url(#relationship-diamond-open-start)";
        case "Composition":
            return "url(#relationship-diamond-closed-start)";
        case "Assignment":
            return "url(#relationship-circle-closed-start)";
    };
}

const linkMarkerEnd = (d) => {
    switch (d.type) {
        case "Triggering":
        case "Assignment":
        case "Flow":
            return "url(#relationship-arrow-closed)";  
        case "Influence":
        case "Serving":
            return "url(#relationship-arrow-open)"; 
        case "Access": 
            if (d.accessType === "Write" || d.accessType === "ReadWrite") 
                return "url(#relationship-arrow-open)"; 
            else  
                return null;
        case "Realization":
        case "Specialization":
            return "url(#relationship-arrowlarge-open)";
    }        
}

const exportForTesting = {
    linkMarkerStart,
    linkMarkerEnd
}

export { 
    addArrowHeadsDefinitions, 
    addLinks, 
    exportForTesting 
};