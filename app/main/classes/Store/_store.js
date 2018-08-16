const electron = require('electron');
const SaveFile = require('./saveFile.js');

class Store {
    constructor() {
        // Renderer process has to get `app` module via `remote`, whereas the main process can get it directly
        // app.getPath('userData') will return a string of the user's app data directory path.
        this.userDataPath = (electron.app || electron.remote.app).getPath('userData');
        // We'll use the `configName` property to set the file name and path.join to bring it all together as a string

        this.settingsContainer = 'settings';
        this.characterContainer = 'characters';

        this.loadSettings();
    }

    loadSettings() {
        this._windowBounds = new SaveFile({
            configName: 'user-preferences',
            defaults: {
                windowBounds: { width: 1200, height: 900 }
            }
        }, this.userDataPath, this.settingsContainer);
    }

    saveBounds(val) {
        let key = 'windowBounds';
        this._windowBounds.set(key, val);
    }

    getBounds() {
        let key = 'windowBounds';
        return this._windowBounds.get(key);
    }

}


module.exports = Store;