import * as dataAccess from '../src/components/dataAccess.js';

describe("dataAccess", function() {

    it("should be able to parse Property Definitions from xml", () => {
        const expectedObject = {
            "propid-1": "Stereotype",
            "propid-2": "Status"
        };

        const xmlString = `<propertyDefinitions>
            <propertyDefinition identifier="propid-1" type="string">
                <name>Stereotype</name>
            </propertyDefinition>
            <propertyDefinition identifier="propid-2" type="string">
                <name>Status</name>
            </propertyDefinition>
        </propertyDefinitions>`;
        const xml = new window.DOMParser().parseFromString(xmlString, "text/xml");

        const parsedObject = dataAccess.exportForTesting.parsePropertyDefinitionsFromXml(xml);

        expect(JSON.stringify(parsedObject)).toEqual(JSON.stringify(expectedObject));    
    });    

    it("should be able to parse Nodes from xml", () => {
        const expectedObject = [{
            id: "id-88b914a6a0194baea26e2489ff20fd1b",
            type: "ApplicationComponent",
            name: "Component1",
            documentation: "important component",
            properties: {}
        }];

        const xmlString = `<?xml version="1.0" encoding="UTF-8"?>
            <model xmlns="http://www.opengroup.org/xsd/archimate/3.0/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengroup.org/xsd/archimate/3.0/ http://www.opengroup.org/xsd/archimate/3.1/archimate3_Diagram.xsd" identifier="id-436d7928a0374d1abbc71a541733ee61">
                <elements>
                    <element identifier="id-88b914a6a0194baea26e2489ff20fd1b" xsi:type="ApplicationComponent">
                        <name xml:lang="en">Component1</name>
                        <documentation>important component</documentation>
                    </element>
                </elements>
            </model>
        `;
        const xml = new window.DOMParser().parseFromString(xmlString, "text/xml");
        
        const parsedObject = dataAccess.exportForTesting.parseNodesFromXml(xml, null);
         
        expect(parsedObject).toEqual(expectedObject);
    });

    it("should be able to parse Nodes with Properties from xml", () => {
        const expectedObject = [{
            id: "id-88b914a6a0194baea26e2489ff20fd1b",
            type: "ApplicationComponent",
            name: "Component1",
            documentation: "important component",
            properties: {
                status: "Future"
            }
        }];

        const propertyDefinitions = {
            "propid-1": "Stereotype",
            "propid-2": "Status"
        };

        const xmlString = `<?xml version="1.0" encoding="UTF-8"?>
            <model xmlns="http://www.opengroup.org/xsd/archimate/3.0/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengroup.org/xsd/archimate/3.0/ http://www.opengroup.org/xsd/archimate/3.1/archimate3_Diagram.xsd" identifier="id-436d7928a0374d1abbc71a541733ee61">
                <elements>
                    <element identifier="id-88b914a6a0194baea26e2489ff20fd1b" xsi:type="ApplicationComponent">
                        <name xml:lang="en">Component1</name>
                        <documentation>important component</documentation>
                        <properties>
                            <property propertyDefinitionRef="propid-2">
                                <value>Future</value>
                            </property>
                        </properties>
                    </element>
                </elements>
            </model>`;
        const xml = new window.DOMParser().parseFromString(xmlString, "text/xml");
        
        const parsedObject = dataAccess.exportForTesting.parseNodesFromXml(xml, propertyDefinitions);
        
        expect(parsedObject).toEqual(expectedObject);
    });

    
    it("should be able to parse Links with properties from xml", () => {
        const expectedObject = [{
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
        }];
        
        const propertyDefinitions = {
            "propid-1": "Stereotype",
            "propid-3": "Status"
        };

        const xmlString = `<?xml version="1.0" encoding="UTF-8"?>
            <model xmlns="http://www.opengroup.org/xsd/archimate/3.0/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengroup.org/xsd/archimate/3.0/ http://www.opengroup.org/xsd/archimate/3.1/archimate3_Diagram.xsd" identifier="id-436d7928a0374d1abbc71a541733ee61">
                <relationships>
                    <relationship identifier="id-ed8ce066a7954fd787dab323e66a9eaf" source="id-Component2" target="id-b2f219b5e7614d9fb065b6cf104b776f" xsi:type="Access" accessType="Read">
                        <name xml:lang="en">get data object</name>
                        <documentation xml:lang="en">this data object is useful</documentation>
                        <properties>
                            <property propertyDefinitionRef="propid-3">
                                <value xml:lang="en">Deprecated</value>
                            </property>
                        </properties>
                    </relationship>
                </relationships>
            </model>
        `;
        const xml = new window.DOMParser().parseFromString(xmlString, "text/xml");
        
        const parsedObject = dataAccess.exportForTesting.parseLinksFromXml(xml, propertyDefinitions);
         
        expect(parsedObject).toEqual(expectedObject);
    });

});