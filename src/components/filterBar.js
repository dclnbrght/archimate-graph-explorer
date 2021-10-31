import * as settings from '../settings.js';

const filterBarStoreKey = "archiGraphSelectedFilters";

// Manage  multiple select events firings at once
// i.e. when all or a group of options are selected
const changeEventFunc = (e, filterSearch) => {
    const v = document.getElementById("filter-bar");
    if (v.classList.contains("updating")) {
        e.preventDefault();
        e.stopPropagation();
    } else {
        v.classList.add("updating");
        setTimeout(() => {
            v.classList.remove("updating");
            filterSearch();
        }, 4);
    }
}

const setSelectBoxValues = (id, values) => {
    let options = document.querySelectorAll("#" + id + " option");
    if (options?.length > 0 && values) {
        options.forEach((x) => {
            if (values[0] == "None") {
                x.selected = false;
            } else if (values.includes(x.value) || values[0] == "All") {
                x.selected = true;
            }
        });
    } else {
        console.error(`Error in setSelectBoxValues, id: ${id}, values: ${values}`);
    }
}

const getSelectBoxValues = (id) => {
    let result = [];
    let options = document.querySelectorAll("#" + id + " option");
    options.forEach((x) => {
        if (x.selected) {
            result.push(x.value);
        }
    });
    return result;
}

const setupNodeTypeFilter = (querystringParameters, previousSelectedFilterValues, filterSearch) => {
    setSelectBoxValues("nodeTypeFilter",  
        querystringParameters.get('elementtypes')?.split(',') 
        ?? previousSelectedFilterValues.selectedNodeTypes
        ?? settings.defaultSelectedFilterValues_nodeTypes
    );  
    tail.select("#nodeTypeFilter", {
        placeholder: 'Element types',
        multiSelectAll: true,
        search: true,
        searchFocus: false
    });  
    document.getElementById("nodeTypeFilter").addEventListener("change", (e) => {
        changeEventFunc(e, filterSearch);
    });
}

const setupNodeStatusFilter = (querystringParameters, previousSelectedFilterValues, filterSearch) => {
    if (settings.nodeProperty_StatusFilter_Enabled) {
        const nodeStatusFilter = document.getElementById("nodeStatusFilter");    
        const nodeStatues = settings.lookupFilterValues_nodeStatuses;
        Object.entries(nodeStatues).reverse().forEach(([value, text]) => {
            var option = document.createElement('option');
            option.value = value;
            option.text = text;
            nodeStatusFilter.add(option, 0);
        });
        setSelectBoxValues("nodeStatusFilter",  
            querystringParameters.get('elementstatuses')?.split(',') 
            ?? previousSelectedFilterValues.selectedNodeStatuses
            ?? settings.defaultSelectedFilterValues_nodeStatuses
        );
        tail.select("#nodeStatusFilter", {
            placeholder: 'Element statuses',
            multiSelectAll: true
        }); 
        nodeStatusFilter.addEventListener("change", (e) => {
            changeEventFunc(e, filterSearch);
        });
    }
}

const setupLinkTypeFilter = (querystringParameters, previousSelectedFilterValues, filterSearch) => {
    setSelectBoxValues("linkTypeFilter",  
        querystringParameters.get('relationshiptypes')?.split(',') 
        ?? previousSelectedFilterValues.selectedLinkTypes 
        ?? settings.defaultSelectedFilterValues_linkTypes
    );
    tail.select("#linkTypeFilter", {
        placeholder: 'Relationship types',
        multiSelectAll: true
    })
    document.getElementById("linkTypeFilter").addEventListener("change", (e) => {
        changeEventFunc(e, filterSearch);
    });
}

const setupDepthFilter = (querystringParameters, previousSelectedFilterValues, filterSearch) => {
    const depthFilter = document.getElementById("depthFilter");
    const depths = settings.lookupFilterValues_depths;
    Object.entries(depths).reverse().forEach(([value, text]) => {
        var option = document.createElement('option');
        option.value = value;
        option.text = text;
        depthFilter.add(option, 0);
    });
    depthFilter.value = querystringParameters.get('depth')
        ?? previousSelectedFilterValues.selectedDepth 
        ?? settings.defaultSelectedFilterValues_depth
        ?? 1
    tail.select("#depthFilter", {
        placeholder: 'Select depth',
        width: "7em"
    });
    depthFilter.addEventListener("change", (e) => {
        changeEventFunc(e, filterSearch);
    });
}

const setupUnlinkedNodesFilter = (querystringParameters, previousSelectedFilterValues, filterSearch) => {
    const unlinkedNodesFilter = document.getElementById("unlinkedNodesFilter");
    unlinkedNodesFilter.checked = (querystringParameters.get('unrelatedelements')?.toLowerCase() === 'true')    
        ?? previousSelectedFilterValues.includeUnlinkedNodes 
        ?? settings.defaultSelectedFilterValues_includeUnlinkedNodes
        ?? false
    unlinkedNodesFilter.addEventListener("change", () => {
        filterSearch();
    });
}


const setupFilters = (filterSearch) => {
    // Set value from: query string || previously selected values in localStorage || default values in settings.js
    const querystringParameters = new URLSearchParams(window.location.search);
    let previousSelectedFilterValues = [];
    if (localStorage.getItem(filterBarStoreKey))
        previousSelectedFilterValues = JSON.parse(localStorage.getItem(filterBarStoreKey));       
    
    setupNodeTypeFilter(querystringParameters, previousSelectedFilterValues, filterSearch);
    setupNodeStatusFilter(querystringParameters, previousSelectedFilterValues, filterSearch);
    setupLinkTypeFilter(querystringParameters, previousSelectedFilterValues, filterSearch);
    setupDepthFilter(querystringParameters, previousSelectedFilterValues, filterSearch);
    setupUnlinkedNodesFilter(querystringParameters, previousSelectedFilterValues, filterSearch);
};

const selectedFilterValues = () => {
    const selectedNodeTypes = getSelectBoxValues("nodeTypeFilter");
    const selectedNodeStatuses = getSelectBoxValues("nodeStatusFilter");
    const selectedLinkTypes = getSelectBoxValues("linkTypeFilter");
    const selectedDepth = document.getElementById("depthFilter").selectedOptions[0].value;
    const includeUnlinkedNodes = document.querySelector("#unlinkedNodesFilter").checked;

    const filterValues = { selectedNodeTypes, selectedNodeStatuses, selectedLinkTypes, selectedDepth, includeUnlinkedNodes }

    localStorage.setItem(filterBarStoreKey, JSON.stringify(filterValues));

    return filterValues;
};

const setupRootNodeSearchFilter = (nodes, filterSearch) => {
    // https://tarekraafat.github.io/autoComplete.js/#/configuration
    if (settings.rootNodeSearchFilter_Enabled) {

        const container = document.getElementById('rootNodeSearchFilter-container');
        if (container.firstElementChild) container.removeChild(container.firstElementChild);

        var input = document.createElement("input");
        input.id = "rootNodeSearchFilter"
        input.type = "search";
        input.maxLength = "128"
        input.tabIndex = "1"
        input.autocomplete = "off"
        input.spellcheck = false;
        container.appendChild(input);

        new autoComplete({ 
            selector: "#rootNodeSearchFilter",
            placeHolder: "Element name",
            data: {
                src: nodes,
                keys: ['name']
            },
            resultsList: {
                maxResults: 10
            },
            resultItem: {                    
                element: (item, data) => {
                    item.innerText = `${data.value.name} (${data.value.type})`;
                },
                highlight: {
                    render: true
                }
            },
            events: {
                input: {
                    selection: (e) => {
                        const node = e.detail.selection.value;
                        const nodeDescription = `${node.name} (${node.type})`;
                        document.getElementById("rootNodeSearchFilter").value = nodeDescription;

                        const url = new URL(window.location);
                        url.searchParams.set('elementid', node.id);
                        window.history.pushState({}, node.name, url);
                        
                        filterSearch(node.id);
                    },
                    search: () => {
                        const url = new URL(window.location); 
                        url.searchParams.delete('elementid');
                        window.history.pushState({}, '', url);
                        filterSearch();
                    }
                }
            }
        });

    };
}

const setupBreadthFirstSearchFilters = (rootNode) => {    
    if (settings.rootNodeSearchFilter_Enabled) {
        document.getElementById('rootNodeSearchFilter-container').classList.remove("filter-hidden");
        document.getElementById("rootNodeSearchFilter").value = `${rootNode.name} (${rootNode.type})`;
    }
    document.getElementById('nodeTypeFilter-container').classList.remove("filter-hidden");
    if (settings.nodeProperty_StatusFilter_Enabled) {
        document.getElementById('nodeStatusFilter-container').classList.remove("filter-hidden");
    } else {
        document.getElementById('nodeStatusFilter-container').classList.add("filter-hidden");
    }
    document.getElementById('linkTypeFilter-container').classList.remove("filter-hidden");    
    document.getElementById('depthFilter-container').classList.remove("filter-hidden");
    document.getElementById('unlinkedNodesFilter-container').classList.add("filter-hidden");
}

const setupFlatSearchFilters = () => {
    if (settings.rootNodeSearchFilter_Enabled) {
        document.getElementById('rootNodeSearchFilter-container').classList.remove("filter-hidden");
        document.getElementById("rootNodeSearchFilter").value = "";
    }    
    document.getElementById('nodeTypeFilter-container').classList.remove("filter-hidden");
    if (settings.nodeProperty_StatusFilter_Enabled) {
        document.getElementById('nodeStatusFilter-container').classList.remove("filter-hidden");
    } else {
        document.getElementById('nodeStatusFilter-container').classList.add("filter-hidden");
    }
    document.getElementById('linkTypeFilter-container').classList.remove("filter-hidden");    
    document.getElementById('depthFilter-container').classList.add("filter-hidden");
    document.getElementById('unlinkedNodesFilter-container').classList.remove("filter-hidden");
}

const exportForTesting = {
    setSelectBoxValues,
    getSelectBoxValues
}

export { 
    setupFilters, 
    selectedFilterValues,
    setupRootNodeSearchFilter, 
    setupBreadthFirstSearchFilters, 
    setupFlatSearchFilters, 
    exportForTesting
};