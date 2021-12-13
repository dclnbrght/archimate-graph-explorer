const userSettingsStoreKey = "archiGraphUserSettings";

let defaultUserSettings = {
    userLoadedModel: false,
    userLoadedModelFilename: "",
    stickyNodesOnDrag_Enabled: true
};

const saveSettings = (userSettings) => {    
    localStorage.setItem(userSettingsStoreKey, JSON.stringify(userSettings));
}

const getSettings = () => {
    let userSettings = defaultUserSettings;
    if (localStorage.getItem(userSettingsStoreKey))
        userSettings = JSON.parse(localStorage.getItem(userSettingsStoreKey));
    return userSettings;
}

const getSetting = (key) => {    
    let userSettings = getSettings();
    if (key in userSettings === false && key in defaultUserSettings) {
        updateSetting(key, defaultUserSettings[key]);
        userSettings = getSettings();
    }
    return userSettings[key];
}

const updateSetting = (key, value) => {
    let userSettings = getSettings();
    userSettings[key] = value;
    saveSettings(userSettings);
}

const settingsDialogOpen = () => {
    const settings = getSettings();
    if (settings.userLoadedModel) {
        const msg = document.getElementById('userModelLoad-dragDrop-message');
        msg.innerText = `Current loaded model: ${settings.userLoadedModelFilename}`;
        document.getElementById('userModelLoad-delete').classList.remove('hidden');
    }
    
    document.getElementById("dialog-userSettings").showModal();
}

const settingsDialogClose = () => {    
    document.getElementById("dialog-userSettings").close();
    document.getElementById('userModelLoad-dragDrop-message').innerText = "";
}

export { 
    settingsDialogOpen,
    settingsDialogClose,
    updateSetting,
    getSettings,
    getSetting
};