import * as dataParserArchiFormat from '../src/components/dataParserArchiFormat.js';

describe("dataParserArchiFormat", function() {

    it("should be able to parse Nodes from an Archi file", () => {
        const expectedObject = [{
            id: "id-88b914a6a0194baea26e2489ff20fd1b",
            type: "ApplicationComponent",
            name: "Component1",
            documentation: "important component",
            properties: {}
        }];

        const xmlString = `<?xml version="1.0" encoding="UTF-8"?>
            <archimate:model xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:archimate="http://www.archimatetool.com/archimate" name="ArchiGraphDev" id="123" version="5.0.0">
                <folder name="Application" id="0ecf696e-e6f3-467f-a42a-94f6422ca451" type="application">
                    <element xsi:type="archimate:ApplicationComponent" name="Component1" id="id-88b914a6a0194baea26e2489ff20fd1b">
                        <documentation>important component</documentation>
                    </element>
                </folder>
            </archimate:model>
        `;
        const xml = new window.DOMParser().parseFromString(xmlString, "text/xml");
        
        const parsedObject = dataParserArchiFormat.exportForTesting.parseNodesFromXml(xml);
         
        expect(parsedObject).toEqual(expectedObject);
    });

    it("should be able to parse Nodes with Properties from an Archi file", () => {
        const expectedObject = [{
            id: "id-88b914a6a0194baea26e2489ff20fd1b",
            type: "ApplicationComponent",
            name: "Component1",
            documentation: "important component",
            properties: {
                status: "Future"
            }
        }];

        const xmlString = `<?xml version="1.0" encoding="UTF-8"?>
            <archimate:model xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:archimate="http://www.archimatetool.com/archimate" name="ArchiGraphDev" id="123" version="5.0.0">
                <folder name="Application" id="0ecf696e-e6f3-467f-a42a-94f6422ca451" type="application">
                    <element xsi:type="archimate:ApplicationComponent" name="Component1" id="id-88b914a6a0194baea26e2489ff20fd1b">
                        <documentation>important component</documentation>
                        <property key="Status" value="Future"/>
                    </element>
                </folder>
            </archimate:model>
            `;
        const xml = new window.DOMParser().parseFromString(xmlString, "text/xml");
        
        const parsedObject = dataParserArchiFormat.exportForTesting.parseNodesFromXml(xml);
        
        expect(parsedObject).toEqual(expectedObject);
    });

    it("should be able to parse Nodes from nested folders in an Archi file", () => {
        const expectedObject = [{
            "id": "id-c5daf2e351fd4dc8ab136eb552533a2b",
            "type": "ApplicationComponent",
            "name": "App1Comp1",
            "documentation": "",
            "properties": {}
        }, {
            "id": "id-7c6a303065ae46bf85516a3b2bfec6d2",
            "type": "ApplicationComponent",
            "name": "App1Comp2",
            "documentation": "",
            "properties": {}
        }, {
            "id": "id-d3e9f44e8eaa42fd8491e680eadb1462",
            "type": "ApplicationComponent",
            "name": "Comp3",
            "documentation": "",
            "properties": {}
        }];

        const xmlString = `<?xml version="1.0" encoding="UTF-8"?>
            <archimate:model xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:archimate="http://www.archimatetool.com/archimate" name="ArchiGraphDev2" id="id-241df1d32e6c43d18ab0b63a495fdbe2" version="4.6.0">
                <folder name="Application" id="id-e7f1ffa4e94348978be86da35fbe82f9" type="application">
                    <folder name="App1" id="id-bae530de224d4db88da854fd3955b5bf">
                        <element xsi:type="archimate:ApplicationComponent" name="App1Comp1" id="id-c5daf2e351fd4dc8ab136eb552533a2b"/>
                        <element xsi:type="archimate:ApplicationComponent" name="App1Comp2" id="id-7c6a303065ae46bf85516a3b2bfec6d2"/>
                    </folder>
                    <element xsi:type="archimate:ApplicationComponent" name="Comp3" id="id-d3e9f44e8eaa42fd8491e680eadb1462"/>
                </folder>
                <folder name="Relations" id="id-93f260054cb24dc69523b80a8fdcd84d" type="relations">
                    <folder name="App1R" id="id-2c19b58592fd42dda70fa4fd4560c068">
                        <element xsi:type="archimate:ServingRelationship" id="id-9eefbf881a1b4798aa5d41464843d0f4" source="id-7c6a303065ae46bf85516a3b2bfec6d2" target="id-c5daf2e351fd4dc8ab136eb552533a2b"/>
                    </folder>
                    <element xsi:type="archimate:ServingRelationship" id="id-8426680ad4e74617a033986d02960fde" source="id-d3e9f44e8eaa42fd8491e680eadb1462" target="id-7c6a303065ae46bf85516a3b2bfec6d2"/>
                </folder>
                <folder name="Views" id="id-72bf14d3cc5646468d8c5bfb20fd6ba4" type="diagrams">
                    <element xsi:type="archimate:ArchimateDiagramModel" name="Default View" id="id-ead61d1b33284d33a55b82bdc1f09283">    
                    </element>
                </folder>
            </archimate:model>
            `;
        const xml = new window.DOMParser().parseFromString(xmlString, "text/xml");
        
        const parsedObject = dataParserArchiFormat.exportForTesting.parseNodesFromXml(xml);
        
        expect(parsedObject).toEqual(expectedObject);
    });

    it("should be able to parse Links with properties from an Archi file", () => {
        const expectedObject = [{
            "id": "id-ed8ce066a7954fd787dab323e66a9eaf",
            "type": "Access",
            "name": "get data object",
            "documentation": "this data object is useful",
            "source": "id-2ec076e6f5714daa931b65323bb64e73",
            "target": "id-b2f219b5e7614d9fb065b6cf104b776f",
            "accessType": "Read",
            "properties": {
                "status": "Deprecated"
            }
        }];
        
        const xmlString = `<?xml version="1.0" encoding="UTF-8"?>
            <archimate:model xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:archimate="http://www.archimatetool.com/archimate" name="ArchiGraphDev" id="123" version="5.0.0">
                <folder name="Relations" id="0ecf696e-e6f3-467f-a42a-94f6422ca451" type="relations">
                    <element xsi:type="archimate:AccessRelationship" name="get data object" id="id-ed8ce066a7954fd787dab323e66a9eaf" source="id-2ec076e6f5714daa931b65323bb64e73" target="id-b2f219b5e7614d9fb065b6cf104b776f" accessType="1">
                        <documentation>this data object is useful</documentation>
                        <property key="Status" value="Deprecated"/>
                    </element>
                </folder>
            </archimate:model>
        `;
        const xml = new window.DOMParser().parseFromString(xmlString, "text/xml");
        
        const parsedObject = dataParserArchiFormat.exportForTesting.parseLinksFromXml(xml);
         
        expect(parsedObject).toEqual(expectedObject);
    });

});