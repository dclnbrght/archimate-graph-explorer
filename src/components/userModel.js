import * as dataAccess from './dataAccess.js';
import * as userSettings from './userSettings.js';

const modelFileLoad = (e, callback) => {
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 1) {
        alert("Oops, only one file can be loaded!");
        return;
    }    
    const droppedFile = e.dataTransfer.files[0];
    if (!droppedFile.name.endsWith('.xml') || !droppedFile.type.match('^text/xml')) {        
        alert("Oops, it must be and XML file! Please ensure it is an ArchiMate Exchange Format file.");
        return;
    }
    const msg = document.getElementById('userModelLoad-dragDrop-message');
    msg.innerText = `Loading: ${droppedFile.name}`;

    const reader = new FileReader();
    reader.onload = (e) => {
        dataAccess.processExchangeFormatFile(e.target.result);

        userSettings.updateSetting("userLoadedModel", true);
        userSettings.updateSetting("userLoadedModelFilename", droppedFile.name);

        document.getElementById('userModelLoad-delete').classList.remove('hidden');

        msg.innerText = `The ${droppedFile.name} file has been loaded into your browser's session storage.`;
        callback();
    };
    reader.readAsText(droppedFile);
}

const modelFileDelete = () => {
    const userLoadedModelFilename = userSettings.getSetting('userLoadedModelFilename');

    dataAccess.deleteDataFromStore();
    
    const msg = document.getElementById('userModelLoad-dragDrop-message');
    msg.innerText = `${userLoadedModelFilename} has been deleted, the default model has been loaded`;

    userSettings.updateSetting("userLoadedModel", false);
    userSettings.updateSetting("userLoadedModelFilename", "");

    document.getElementById('userModelLoad-delete').classList.add('hidden');    
}

export { 
    modelFileLoad,
    modelFileDelete
}; 