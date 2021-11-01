/*
modelPath is the file path to the ArchiMate model
IMPORTANT: the file must be in the ArchiMate Model Exchange File Format:
    https://www.opengroup.org/open-group-archimate-model-exchange-file-format
    i.e. in Archi go to "\File\Export\Model to Open Exchange File..."
*/
export const modelPath = "data/ArchiSurance.xml";

/*
Show or hide the header bar
*/
export const header_Enabled = true;

/* 
Default selected filter values
*/
export const defaultSelectedFilterValues_nodeTypes = ["BusinessActor","BusinessFunction"];
export const defaultSelectedFilterValues_nodeStatuses = ["Current"];
export const defaultSelectedFilterValues_linkTypes = ["Assignment","Flow"];
export const defaultSelectedFilterValues_depth = 1;
export const defaultSelectedFilterValues_includeUnlinkedNodes = false;

/*
A dragged node sticks in place, it can be released by clicking on it
*/
export const stickyNodes_Enabled = true;

/*
Drag n drop a model feature switch
*/
export const dragDropModel_Enabled = true;


/*
Root node search filter
*/
export const rootNodeSearchFilter_Enabled = true;


/*
Filter values
*/
export const lookupFilterValues_depths = {
    1 : "Depth: 1",
    2 : "Depth: 2",
    3 : "Depth: 3",
    4 : "Depth: 4",
    5 : "Depth: 5",
    6 : "Depth: 6"
};


// ADDITONAL FEATURES
// Optional features based on custom properties which are set on the elements in the model

/*
Based on a "Status" property, allow users to filter elements by status value
    "Current" - this is the assumed status if a value is not set
    "Future" - elements marked as future state
    "Deprecated" - elements marked as deprecated
*/
export const nodeProperty_StatusFilter_Enabled = true;
export const lookupFilterValues_nodeStatuses = {
    "Current": "Current",
    "Future": "Future",
    "Deprecated": "Deprecated"
};

/*
Based on a "Stereotype" property, add a Stereotype label, with guillemot characters, above the name of node
*/
export const nodeProperty_StereotypeLabel_Enabled = true;

/*
Based on "DataClassificationLevel" property, set the colour of nodes as defined in this ColourMap
*/
export const nodeProperty_DataClassificationLevelStyling_Enabled = true;
export const nodeProperty_DataClassificationLevelStyling_ColourMap = {
    "Confidential (Red)": "#f00", 
    "Restricted (Amber)": "#ff8000",
    "Limited Disclosure (Green)": "#00a400",
    "Unlimited Disclosure (White)": "#fff"
};
