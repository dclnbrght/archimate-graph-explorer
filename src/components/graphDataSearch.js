import * as settings from '../settings.js';

const breadthFirstSearch = (graphData, nodeId, depth, nodeTypes, nodeStatuses, linkTypes) => {
    
    let nodesFiltered = [];
    let linksFiltered = [];
    
    try {
        const nodes = graphData.nodes;
        const links = graphData.links;
        
        const queue = [];
        const visited = new Set();
        
        // setup the root node
        const rootNode = nodes.find(node => node.id === nodeId);
        if (rootNode == null) return { nodesFiltered, linksFiltered };     
        nodesFiltered.push(rootNode);
        queue.push( { node: rootNode, depth: 0 } );
        visited.add(rootNode.id);
        
        // walk the graph
        while (queue.length > 0) {
            const qn = queue.shift();
            const currentDepth = qn.depth;
            
            if (currentDepth < depth) {
                // links from the current node
                const nodeLinks = links.filter(l => 
                    (l.source === qn.node.id || l.target === qn.node.id)
                    && (linkTypes.includes(l.type) || linkTypes[0] === 'All')
                )

                // nodes associated with the links above, filtered by status & type
                const linkedNodes = nodes.filter(n =>
                    nodeLinks.some(nl => nl.source === n.id || nl.target === n.id)
                    && (!settings.nodeProperty_StatusFilter_Enabled
                        || nodeStatuses.includes(n.properties.status || "Current"))
                    && (nodeTypes.includes(n.type) || nodeTypes[0] === 'All')
                );
 
                // links connecting the filtered nodes
                const linkedNodesLinks = filterLinksForNodes([qn.node, ...linkedNodes], links, linkTypes);
                
                linkedNodes.forEach((ln) => {
                    if (!visited.has(ln.id)) {
                        visited.add(ln.id);
                        nodesFiltered.push(ln);
                        queue.push( { node: ln, depth: currentDepth + 1 } );
                    }
                });

                linkedNodesLinks.forEach((lnl) => {
                    if (!linksFiltered.some(lf => lf.id === lnl.id))
                        linksFiltered.push(lnl)
                });
            }
        }
    } catch (error) {
        const msg = `Error in breadthFirstSearch: \r\n\r\n${error}`;
        console.error(msg);
    }

    return { nodesFiltered, linksFiltered };
}

const flatGraphSearch = (graphData, nodeTypes, nodeStatuses, linkTypes, includeUnlinkedNodes) => {
    const nodes = graphData.nodes;
    const links = graphData.links;

    // get nodes based on the selected filters
    let nodesFiltered = filterNodes(nodes, nodeTypes, nodeStatuses);
    
    // get links for the filtered nodes
    let linksFiltered = filterLinksForNodes(nodesFiltered, links, linkTypes);
 
    // exclude unlinked nodes, those without a relationship
    if (!includeUnlinkedNodes) {
        nodesFiltered = nodesFiltered.filter(n =>
            linksFiltered.some(l => l.source === n.id)
            || linksFiltered.some(l => l.target === n.id)
        );
    }

    return { nodesFiltered, linksFiltered };
}

const filterNodes = (nodes, nodeTypes, nodeStatuses) => {
    return nodes.filter(n =>
        (!settings.nodeProperty_StatusFilter_Enabled
            || nodeStatuses.some(s => s === (n.properties.status || "Current"))
            || nodeStatuses[0] === 'All')
        && (nodeTypes.includes(n.type) 
            || nodeTypes[0] === 'All')
    );
}

const filterLinksForNodes = (nodes, links, linkTypes) => {
    return links.filter(l =>
        nodes.some(n => n.id === l.source)
        && nodes.some(n => n.id === l.target)
        && (linkTypes.includes(l.type) 
            || linkTypes[0] === 'All')
    );
}

const exportForTesting = {
    filterNodes,
    filterLinksForNodes
}

export { 
    flatGraphSearch, 
    breadthFirstSearch, 
    exportForTesting
};