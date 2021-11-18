import * as graphDataSearch from '../src/components/graphDataSearch.js';
import * as settings from '../src/settings.js';

describe("graphDataSearch", function() {
    
    describe("filter functions", function() {
        
        let graphData = JSON.parse('{"nodes": [], "links": []}');
        beforeEach(function() {
            graphData = JSON.parse(`
                {
                    "modelName": "ArchiGraph",
                    "modelDocumentation": "test model",
                    "nodes": [{
                            "id": "nodeid-1",
                            "type": "ApplicationComponent",
                            "name": "Component1",
                            "properties": {}
                        }, {
                            "id": "nodeid-2",
                            "type": "ApplicationComponent",
                            "name": "Component2",
                            "properties": {}
                        }, {
                            "id": "nodeid-X",
                            "type": "ApplicationComponent",
                            "name": "ComponentX",
                            "properties": {}
                        }, {
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
                        }
                    ],
                    "links": [{
                            "id": "linkid-1",
                            "type": "Serving",
                            "source": "nodeid-1",
                            "target": "nodeid-2"
                        }, {
                            "id": "linkid-2",
                            "type": "Serving",
                            "source": "nodeid-1",
                            "target": "nodeid-3"
                        }, {
                            "id": "linkid-3",
                            "type": "Serving",
                            "source": "nodeid-3",
                            "target": "nodeid-4"
                        }
                    ]
                }
            `);
        });

        it("filterNodes should filter a set nodes, for a nodeType of ApplicationService and Status of Current", () => {
            const nodeTypes = ["ApplicationService"];
            const nodeStatuses = ["Current"]; 
                
            const nodesFiltered = graphDataSearch.exportForTesting.filterNodes(graphData.nodes, nodeTypes, nodeStatuses);
    
            expect(nodesFiltered.length).toEqual(settings.nodeProperty_StatusFilter_Enabled ? 1 : 2);
        });

        it("filterNodes should filter a set nodes, for a nodeType of ApplicationService and Status of All", () => {
            const nodeTypes = ["ApplicationService"];
            const nodeStatuses = ["All"]; 
    
            const nodesFiltered = graphDataSearch.exportForTesting.filterNodes(graphData.nodes, nodeTypes, nodeStatuses);
    
            expect(nodesFiltered.length).toEqual(2);
        });

        it("filterLinksForNodes should filter a set of links and only return those that link the nodes in the set", () => {
            const linkTypes = ["Serving"];    
            const expectedLinksFiltered = [{
                "id": "linkid-1",
                "type": "Serving",
                "source": "nodeid-1",
                "target": "nodeid-2"
            }];
    
            const linksFiltered = graphDataSearch.exportForTesting.filterLinksForNodes(graphData.nodes, graphData.links, linkTypes);
    
            expect(linksFiltered).toEqual(expectedLinksFiltered);
        });

    });
    
    describe("search functions", function() {

        let graphData = JSON.parse('{"nodes": [], "links": []}');
        beforeEach(function() {
            graphData = JSON.parse(`
            {
                "modelName": "ArchiGraph",
                "modelDocumentation": "test model",
                "nodes": [{
                        "id": "id-Component1",
                        "type": "ApplicationComponent",
                        "name": "Component1",
                        "documentation": "component 1 does some cool stuff",
                        "properties": {
                            "stereotype": "Microservice",
                            "repo": "/git/archigraph/"
                        }
                    }, {
                        "id": "id-Component2",
                        "type": "ApplicationComponent",
                        "name": "Component2",
                        "documentation": "",
                        "properties": {}
                    }, {
                        "id": "id-Component3",
                        "type": "ApplicationComponent",
                        "name": "Component3",
                        "documentation": "",
                        "properties": {
                            "status": "Future"
                        }
                    }, {
                        "id": "id-Component4",
                        "type": "ApplicationComponent",
                        "name": "Component4",
                        "documentation": "",
                        "properties": {}
                    }, {
                        "id": "id-Component5",
                        "type": "ApplicationComponent",
                        "name": "Component5",
                        "documentation": "",
                        "properties": {}
                    }, {
                        "id": "id-Component6",
                        "type": "ApplicationComponent",
                        "name": "Component6",
                        "documentation": "",
                        "properties": {}
                    }, {
                        "id": "id-Component7",
                        "type": "ApplicationComponent",
                        "name": "Component7",
                        "documentation": "",
                        "properties": {}
                    }, {
                        "id": "id-b2f219b5e7614d9fb065b6cf104b776f",
                        "type": "DataObject",
                        "name": "DataObject1",
                        "documentation": "",
                        "properties": {}
                    }, {
                        "id": "id-OrJunction1",
                        "type": "OrJunction",
                        "name": "OrJunction1",
                        "documentation": "",
                        "properties": {}
                    }, {
                        "id": "id-OrJunction2",
                        "type": "OrJunction",
                        "name": "OrJunction2",
                        "documentation": "",
                        "properties": {}
                    }, {
                        "id": "id-Service1",
                        "type": "ApplicationService",
                        "name": "Service1",
                        "documentation": "",
                        "properties": {}
                    }, {
                        "id": "id-Service2",
                        "type": "ApplicationService",
                        "name": "Service2",
                        "documentation": "",
                        "properties": {}
                    }
                ],
                "links": [{
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
                        "type": "Serving",
                        "name": "",
                        "documentation": "",
                        "source": "id-Component2",
                        "target": "id-Component3",
                        "accessType": null,
                        "properties": {}
                    }, {
                        "id": "id-ed8ce066a7954fd787dab323e66a9eaf",
                        "type": "Access",
                        "name": "get data object",
                        "documentation": "this data object is useful",
                        "source": "id-Component2",
                        "target": "id-b2f219b5e7614d9fb065b6cf104b776f",
                        "accessType": "Read",
                        "properties": {
                            "status": "Deprecated"
                        }
                    }, {
                        "id": "id-0a12f7ff9edd4924880bcf2d7c02ee04",
                        "type": "Serving",
                        "name": "",
                        "documentation": "",
                        "source": "id-Component3",
                        "target": "id-Component4",
                        "accessType": null,
                        "properties": {}
                    }, {
                        "id": "id-53c35cea7761496390306be0383918d0",
                        "type": "Serving",
                        "name": "",
                        "documentation": "",
                        "source": "id-Component4",
                        "target": "id-Component5",
                        "accessType": null,
                        "properties": {}
                    }, {
                        "id": "id-213a0ce8cfea4990be47ca8d853b0aad",
                        "type": "Serving",
                        "name": "",
                        "documentation": "",
                        "source": "id-Component5",
                        "target": "id-Component6",
                        "accessType": null,
                        "properties": {}
                    }, {
                        "id": "id-a55ae416a70c40e9890de21ee89c529e",
                        "type": "Serving",
                        "name": "",
                        "documentation": "",
                        "source": "id-Component6",
                        "target": "id-Component7",
                        "accessType": null,
                        "properties": {}
                    }, {
                        "id": "id-df30cc2badfd4b71a82fc67ebb061548",
                        "type": "Serving",
                        "name": "",
                        "documentation": "",
                        "source": "id-Component5",
                        "target": "id-Component3",
                        "accessType": null,
                        "properties": {}
                    }, {
                        "id": "id-Flow1",
                        "type": "Flow",
                        "name": "",
                        "documentation": "",
                        "source": "id-Component4",
                        "target": "id-OrJunction1",
                        "accessType": null,
                        "properties": {}
                    }, {
                        "id": "id-Flow2",
                        "type": "Flow",
                        "name": "",
                        "documentation": "",
                        "source": "id-Component6",
                        "target": "id-OrJunction1",
                        "accessType": null,
                        "properties": {}
                    }, {
                        "id": "id-Flow3",
                        "type": "Flow",
                        "name": "",
                        "documentation": "",
                        "source": "id-OrJunction1",
                        "target": "id-Service1",
                        "accessType": null,
                        "properties": {}
                    }, {
                        "id": "id-Flow4",
                        "type": "Flow",
                        "name": "",
                        "documentation": "",
                        "source": "id-Component4",
                        "target": "id-OrJunction2",
                        "accessType": null,
                        "properties": {}
                    }, {
                        "id": "id-Flow5",
                        "type": "Flow",
                        "name": "",
                        "documentation": "",
                        "source": "id-Component6",
                        "target": "id-OrJunction2",
                        "accessType": null,
                        "properties": {}
                    }, {
                        "id": "id-Flow6",
                        "type": "Flow",
                        "name": "",
                        "documentation": "",
                        "source": "id-OrJunction2",
                        "target": "id-Service2",
                        "accessType": null,
                        "properties": {}
                    }
                ]
            }
            `);
        });

        it("flatGraphSearch should filter arrays of nodes and links based on the search parameters", () => {
            const nodeTypes = ["ApplicationComponent"]; 
            const nodeStatuses = ["Current","Future"];
            const linkTypes = ["Serving"];
            const includeUnlinkedNodes = false;

            const filteredData = graphDataSearch.flatGraphSearch(graphData, nodeTypes, nodeStatuses, linkTypes, includeUnlinkedNodes);
            
            expect(filteredData.nodesFiltered.length).toEqual(7);
            expect(filteredData.linksFiltered.length).toEqual(7);
        });

        it("breadthFirstSearch should filter arrays of nodes and links based on the search parameters, depth of 2", () => {
            const nodeId = "id-Component1";
            const depth = 2;
            const nodeTypes = ["ApplicationComponent"]; 
            const nodeStatuses = ["Current","Future"];
            const linkTypes = ["Serving"];

            const filteredData = graphDataSearch.breadthFirstSearch(graphData, nodeId, depth, nodeTypes, nodeStatuses, linkTypes);
            
            expect(filteredData.nodesFiltered.length).toEqual(3);
            expect(filteredData.linksFiltered.length).toEqual(2);
        });

        it("breadthFirstSearch should filter arrays of nodes and links based on the search parameters, depth of 6, includes a closed loop", () => {
            const nodeId = "id-Component1";
            const depth = 6;
            const nodeTypes = ["ApplicationComponent"]; 
            const nodeStatuses = ["Current","Future"];
            const linkTypes = ["Serving"];

            const filteredData = graphDataSearch.breadthFirstSearch(graphData, nodeId, depth, nodeTypes, nodeStatuses, linkTypes);
            
            expect(filteredData.nodesFiltered.length).toEqual(7);
            expect(filteredData.linksFiltered.length).toEqual(7);
        });

        it("breadthFirstSearch should filter arrays of nodes and links based on the search parameters, depth of 2, includes 2 closed loops", () => {
            const nodeId = "id-OrJunction1";
            const depth = 3;
            const nodeTypes = ["ApplicationComponent", "ApplicationService", "OrJunction"]; 
            const nodeStatuses = ["Current"];
            const linkTypes = ["Flow"];

            const filteredData = graphDataSearch.breadthFirstSearch(graphData, nodeId, depth, nodeTypes, nodeStatuses, linkTypes);
            
            expect(filteredData.nodesFiltered.length).toEqual(6);
            expect(filteredData.linksFiltered.length).toEqual(6);
        });
    
    });

});