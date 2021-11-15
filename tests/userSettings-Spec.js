import * as userSettings from '../src/components/userSettings.js';

describe("userSettings", function() {
   
    it("should get default user settings", () => {
        const settings = userSettings.getSettings();
        expect(settings).toEqual({
            userLoadedModel: false,
            userLoadedModelFilename: "",
        });
    });
    
    it("should get default userLoadedModel user setting", () => {
        const setting = userSettings.getSetting('userLoadedModel');
        
        expect(setting).toEqual(false);
    });
    
    it("should update userLoadedModel user setting", () => {
        userSettings.updateSetting('userLoadedModel', true);

        const setting = userSettings.getSetting('userLoadedModel');

        userSettings.updateSetting('userLoadedModel', false);

        expect(setting).toEqual(true);        
    });

});