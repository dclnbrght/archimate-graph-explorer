import * as filterBar from '../src/components/filterBar.js';

describe("filterBar", function() {

    let mockNodeList = [];
    beforeEach(function() {        
        var mockOption0 = document.createElement('option');
        mockOption0.value = "Value0";
        var mockOption1 = document.createElement('option');
        mockOption1.value = "Value1";
        var mockOption2 = document.createElement('option');
        mockOption2.value = "Value2"; 

        mockNodeList = document.createDocumentFragment();
        mockNodeList.appendChild(mockOption0);
        mockNodeList.appendChild(mockOption1);
        mockNodeList.appendChild(mockOption2);

        document.querySelectorAll = jasmine.createSpy('Option Element').and.returnValue(mockNodeList.childNodes);
    });
    
    it("should be able to set dropdown option values", () => {
        filterBar.exportForTesting.setSelectBoxValues("dummy", ["Value0", "Value2"]);
        expect(mockNodeList.childNodes[0].selected).toEqual(true); 
        expect(mockNodeList.childNodes[1].selected).toEqual(false); 
        expect(mockNodeList.childNodes[2].selected).toEqual(true);  
    });
    
    it("should be able to get dropdown option values", () => {        
        filterBar.exportForTesting.setSelectBoxValues("dummy", ["Value1", "Value2"]);

        const selectedValues = filterBar.exportForTesting.getSelectBoxValues("dummy");
        
        expect(selectedValues).toEqual(["Value1", "Value2"]); 
    });
});