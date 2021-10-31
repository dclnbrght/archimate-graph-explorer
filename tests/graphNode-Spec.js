import * as graphNode from '../src/components/graphNode.js';

/// <reference path="../libs/d3.v7.min.js" />

describe("graphNode", function() {

    it("colorForNodeType should return the color code for a node type", () => {
        const nodeType = "BusinessActor";

        const color = graphNode.exportForTesting.colorForNodeType(nodeType);

        expect(color).toEqual("#ffffb1");    
    });
    
    it("colorForNodeType should return a default color if the node type is not found", () => {
        const nodeType = "dummy";

        const color = graphNode.exportForTesting.colorForNodeType(nodeType);

        expect(color).toEqual("#fefefe");    
    });
    
    it("iconForNodeType should return the icon SVG path for a node type", () => {
        const nodeType = "Location";

        const iconSvgPath = graphNode.exportForTesting.iconForNodeType(nodeType);

        expect(iconSvgPath).toEqual("m 4 -1 C 6 -8 -6 -8 -4 -1 L 0 6 Z");    
    });
    
    it("addNodes should render nodes to the viewer", () => {
        const explorerWidth = 100;
        const explorerHeight = 80;
        const viewer = d3.create('g');
        const nodes = [{
            "id": "nodeid-100",
            "type": "ApplicationService",
            "name": "App Service 1",
            "properties": {}
        }, {
            "id": "nodeid-101",
            "type": "ApplicationService",
            "name": "App Service 2",
            "properties": {
                "status": "Deprecated"
            }
        }];
        const rootNodeId = "nodeid-100";
        const expectedSvgRenderedToViewer = `<g id="nodes"><g id="nodeid-100" class="element-applicationservice node-root"><circle r="10" fill="#b6f4f6"><title>App Service 1</title></circle><path d="m -4 3 z c -4 0 -4 -6 0 -6 H 4 C 8 -3 8 3 4 3 z" class="node-icon"></path><text class="node-label-type" dx="16" dy="-2">(ApplicationService)</text><text class="node-label-name" dx="16" dy="8">App Service 1</text></g><g id="nodeid-101" class="element-applicationservice"><circle r="10" fill="#b6f4f6"><title>App Service 2</title></circle><path d="m -4 3 z c -4 0 -4 -6 0 -6 H 4 C 8 -3 8 3 4 3 z" class="node-icon"></path><text class="node-label-type" dx="16" dy="-2">(ApplicationService)</text><text class="node-label-name" dx="16" dy="8">App Service 2</text></g></g>`;

        graphNode.addNodes(explorerWidth, explorerHeight, viewer, nodes, rootNodeId);
        const svgRenderedToViewer = viewer.html();

        expect(svgRenderedToViewer).toEqual(expectedSvgRenderedToViewer);
    });

});