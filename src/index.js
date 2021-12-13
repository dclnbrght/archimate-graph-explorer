import * as dataAccess from './components/dataAccess.js';
import * as graphDataSearch from './components/graphDataSearch.js';
import * as filterBar from './components/filterBar.js';
import * as graphExplorer from './components/graphExplorer.js';
import * as settings from './settings.js';
import * as userSettings from './components/userSettings.js';
import * as userModel from './components/userModel.js';

let querystringParameters = new URLSearchParams(window.location.search);

const modelLoaded = () => {
    try {
        const graphData = dataAccess.requestDataFromStore();
        filterBar.setupRootNodeSearchFilter(graphData.nodes, filterSearch);

        document.getElementById('loading-message').style.display = 'none';

        filterSearch();
    } catch (error) {
        const msg = `Error loading model \r\n\r\n${error}`;
        console.error(msg);
        alert(msg);
    }
};

const filterSearch = (selectedNodeId) => {
    try {
        querystringParameters = new URLSearchParams(window.location.search);
        let filteredData = null;
        const filterValues = filterBar.selectedFilterValues();  
        const graphData = dataAccess.requestDataFromStore();

        // Perform a breadth first search if a root node has been specified
        const rootNodeId = selectedNodeId ?? querystringParameters.get('elementid');
        if (rootNodeId !== null) {
            filteredData = graphDataSearch.breadthFirstSearch(
                graphData,
                rootNodeId,
                filterValues.selectedDepth,
                filterValues.selectedNodeTypes, 
                filterValues.selectedNodeStatuses, 
                filterValues.selectedLinkTypes
            );
            filterBar.setupBreadthFirstSearchFilters(filteredData.nodesFiltered[0]);
        } else {
            filteredData = graphDataSearch.flatGraphSearch(
                graphData,
                filterValues.selectedNodeTypes, 
                filterValues.selectedNodeStatuses, 
                filterValues.selectedLinkTypes, 
                filterValues.includeUnlinkedNodes
            );
            filterBar.setupFlatSearchFilters();
        }

        const resultsSummary = `Elements: ${filteredData.nodesFiltered.length}, Relationships: ${filteredData.linksFiltered.length}`;
        document.getElementById('search-result-summary').innerText = resultsSummary;

        graphExplorer.drawGraph(filteredData.nodesFiltered, rootNodeId, filteredData.linksFiltered, filterSearch);
        
    } catch (error) {
        const msg = `Error searching \r\n\r\n${error}`;
        console.error(msg);
        alert(msg);
    }
}

const debounce = (callback, wait) => {
    let timer;
    return (...args) => {
        const context = this;
        clearTimeout(timer);
        timer = setTimeout(() => callback.apply(context, args), wait);
    };
}
const requestModelData = (callback) => {
    dataAccess.requestDataFromServer(settings.modelPath, callback);
}

const modelOverviewOpen = () => {
    const modelOverview = dataAccess.modelOverview();

    document.getElementById("model-name").innerText = modelOverview.modelName;
    document.getElementById("model-documentation").innerText = modelOverview.modelDocumentation;

    document.getElementById("dialog-overview").showModal();
}
const modelOverviewClose = () => {
    document.getElementById("dialog-overview").close();
}

const setupFeatures = () => {
    if (querystringParameters.get('showheader')) {
        if (querystringParameters.get('showheader') === "true")
            document.querySelector("header").style.display = "block";
    } else if (settings.header_Enabled) {
        document.querySelector("header").style.display = "block";
    }

    if (settings.userSettings_Enabled) {
        document.getElementById("action-userSettings").classList.remove('hidden');
    }

    if (settings.dragDropModel_Enabled) {
        document.getElementById("userSettings-userModelLoad").classList.remove('hidden');
    }
}

document.getElementById("action-reload").addEventListener("click", function (e) {
    requestModelData(modelLoaded);
});

document.getElementById("action-model-overview").addEventListener("click", function (e) {    
    modelOverviewOpen();
});
document.getElementById("dialog-overview-close").addEventListener("click", function (e) {
    modelOverviewClose();
});
document.getElementById("dialog-overview-close-x").addEventListener("click", function (e) {
    modelOverviewClose();
});

document.getElementById("action-userSettings").addEventListener("click", function (e) {
    userSettings.settingsDialogOpen();
});
document.getElementById("dialog-userSettings-close").addEventListener("click", function (e) {
    userSettings.settingsDialogClose();
});
document.getElementById("dialog-userSettings-close-x").addEventListener("click", function (e) {
    userSettings.settingsDialogClose();
});

document.getElementById("userModelLoad-dragDrop-zone").addEventListener("dragover", function (e) {
    e.preventDefault();
});
document.getElementById("userModelLoad-dragDrop-zone").addEventListener("drop", function (e) { 
    e.preventDefault();
    userModel.modelFileLoad(e, modelLoaded);
});
document.getElementById("userModelLoad-delete").addEventListener("click", function (e) {
    userModel.modelFileDelete();    
    // request default model from server
    requestModelData(modelLoaded);
});
document.getElementById("stickyNodesOnDrag").addEventListener("change", function (e) {
    userSettings.updateSetting('stickyNodesOnDrag_Enabled', this.checked);    
});

window.onload = () => {
    setupFeatures();
    filterBar.setupFilters(filterSearch);
    
    if (!dataAccess.dataExistsInStore())
    {
        userSettings.updateSetting("userLoadedModel", false);
        userSettings.updateSetting("userLoadedModelFilename", "");
    }
    
    if (!userSettings.getSetting('userLoadedModel'))
        requestModelData(modelLoaded);
    else 
        modelLoaded();
};
window.onresize = debounce(() => {
    filterSearch();
}, 100);
window.onpopstate = () => { 
    filterSearch();
};