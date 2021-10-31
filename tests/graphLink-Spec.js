import * as graphLink from '../src/components/graphLink.js';

describe("graphLink", function() {

    it("linkMarkerStart should return the reference to the arrow head definition based on type", () => {
        const nodeObject = {
            type: "Aggregation"
        };

        const definitionReference = graphLink.exportForTesting.linkMarkerStart(nodeObject);

        expect(definitionReference).toEqual("url(#relationship-diamond-open-start)");    
    });
    
    it("linkMarkerStart should return the reference to the arrow head definition based on type and accessType", () => {
        const nodeObject = {
            type: "Access",
            accessType: "ReadWrite"
        };

        const definitionReference = graphLink.exportForTesting.linkMarkerStart(nodeObject);

        expect(definitionReference).toEqual("url(#relationship-arrow-open-read)");    
    });
    
    it("linkMarkerEnd should return the reference to the arrow head definition based on type", () => {
        const nodeObject = {
            type: "Flow"
        };

        const definitionReference = graphLink.exportForTesting.linkMarkerEnd(nodeObject);

        expect(definitionReference).toEqual("url(#relationship-arrow-closed)");    
    });
    
    it("linkMarkerEnd should return the reference to the arrow head definition based on type and accessType", () => {
        const nodeObject = {
            type: "Access",
            accessType: "ReadWrite"
        };

        const definitionReference = graphLink.exportForTesting.linkMarkerEnd(nodeObject);

        expect(definitionReference).toEqual("url(#relationship-arrow-open)");    
    });
   
    it("addLinks should render nodes to the viewer", () => {
        const viewer = d3.create('g');
        const links = [{
            "id": "id-cf8f3adf72da48c49afb417f10a2b5c8",
            "type": "Serving",
            "name": "",
            "documentation": "",
            "source": "id-Component1",
            "target": "id-Component2",
            "accessType": null,
            "properties": {}
        }, {
            "id": "id-fb099f2d95f3451c974165cfacbbcb20",
            "type": "Aggregation",
            "name": "",
            "documentation": "",
            "source": "id-Component2",
            "target": "id-Component3",
            "accessType": null,
            "properties": {}
        }];
        const expectedSvgRenderedToViewer = `<g id="links"><line id="id-cf8f3adf72da48c49afb417f10a2b5c8" class="relationship-serving" marker-end="url(#relationship-arrow-open)"><title></title></line><line id="id-fb099f2d95f3451c974165cfacbbcb20" class="relationship-aggregation" marker-start="url(#relationship-diamond-open-start)"><title></title></line></g>`;

        graphLink.addLinks(viewer, links);
        const svgRenderedToViewer = viewer.html();

        expect(svgRenderedToViewer).toEqual(expectedSvgRenderedToViewer);        
    });
});