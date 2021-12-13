import * as nodeUtils from './graphNode.js';
import * as linkUtils from './graphLink.js';
import * as userSettings from './userSettings.js';

// Drag
const dragHandler = (simulation) => {
    
    function dragstarted(event, d) {
        d.fx = d.x;
        d.fy = d.y;
        if (!event.active) simulation.alpha(0.2).restart();
        
        if (userSettings.getSetting('stickyNodesOnDrag_Enabled')) {
            d3.select(this).classed("node-fixed", true);
        }
    }
    
    function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }
    
    function dragended(event, d) {
        if (!userSettings.getSetting('stickyNodesOnDrag_Enabled')) {
            delete d.fx;
            delete d.fy;
        }
        if (!event.active) simulation.alpha(0.1).restart();
    }    
        
    return d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
};

const setupGraphActions = (simulation, renderedNodes, callback) => {
    renderedNodes.on("dblclick", function (event, d) {
        const url = new URL(window.location);
        url.searchParams.set('elementid', d.id);
        window.history.pushState({}, d.Name, url);

        callback(d.id);
    });

    if (userSettings.getSetting('stickyNodesOnDrag_Enabled')) {
        renderedNodes.on("click", function (event, d) {
            delete d.fx;
            delete d.fy;
            simulation.alpha(0.3).restart();
            d3.select(this).classed("node-fixed", false);
        });
    }
    
    renderedNodes.call(dragHandler(simulation));
}

const drawGraph = (nodes, pinnedNodeId, links, callback) => {
    d3.selectAll("#graph-viewer").remove();

    const width = window.innerWidth - 4;
    const height = window.innerHeight - 33;

    const svg = d3.select('body').append('svg')
        .attr('id', "graph-viewer")
        .attr('width', width)
        .attr('height', height);

    linkUtils.addArrowHeadsDefinitions(svg);

    const viewer = svg.append("g")
        .attr("id", "viewer");
    
    let simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links)
            .id((d) => { return d.id; } )
            .strength(0.3)
            .distance(160)
        )
        .force("charge", d3.forceManyBody()
            .strength(-200)
        )
        .force("center", d3.forceCenter(width / 2, height / 2)
            .strength(0.05)
        )
        .force('collision', d3.forceCollide()
            .radius(24)
        )
        .on("tick", simulationTick);


    // Links
    const renderedLinks = linkUtils.addLinks(viewer, links);
    

    // Nodes
    const renderedNodes = nodeUtils.addNodes(width, height, viewer, nodes, pinnedNodeId);
    setupGraphActions(simulation, renderedNodes, callback);

    
    // Tick
    function simulationTick(d) { 
        renderedLinks
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);
        renderedNodes
            .attr("transform", (d) => { 
                return "translate(" + (d.x) + ", " + (d.y) + ")" 
            }
        );
    } 


    // Zoom
    const zoomHandler = d3.zoom()
        .on("zoom", (event) => {
            viewer.attr("transform", event.transform)
        });
    svg
        .call(zoomHandler)
        .on("dblclick.zoom", null);
}

export { drawGraph };