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