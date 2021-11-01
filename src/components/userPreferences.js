const userPreferencesStoreKey = "archiGraphUserPreferences";

let defaultUserPrefs = {
    userLoadedModel: false,
    userLoadedModelFilename: "",
};

const savePreferences = (userPreferences) => {    
    localStorage.setItem(userPreferencesStoreKey, JSON.stringify(userPreferences));
}

const getPreferences = () => {
    let userPrefs = defaultUserPrefs;
    if (localStorage.getItem(userPreferencesStoreKey))
        userPrefs = JSON.parse(localStorage.getItem(userPreferencesStoreKey));
    return userPrefs;
}

const updatePreference = (preference, value) => {
    let userPrefs = getPreferences();
    userPrefs[preference] = value;
    savePreferences(userPrefs);
}

export { 
    updatePreference,
    getPreferences
};