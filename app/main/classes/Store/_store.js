const electron = require('electron');
const SaveFile = require('./saveFile.js');
const Future = require('./../Future/_future.js');
const BusyBody = require('./busyBody.js');
const path = require('path');
const fs = require('fs');

class Store {
    constructor() {
        // Renderer process has to get `app` module via `remote`, whereas the main process can get it directly
        // app.getPath('userData') will return a string of the user's app data directory path.
        this._userDataPath = (electron.app).getPath('userData');
        // We'll use the `configName` property to set the file name and path.join to bring it all together as a string

        this._userDataPath = this._userDataPath.replace('Electron', 'Gagamba');

        if (!fs.existsSync(this._userDataPath)) {
            fs.mkdir(this._userDataPath);
        }

        this._busyBody = BusyBody.getInstance();

        this._rootContainer = this._setupFolder(this._userDataPath);
        this._settingsContainer = this._setupFolder('settings', this._rootContainer);
        this._characterContainer = this._setupFolder('characters', this._rootContainer);

        this.loadSettings();
    }

    _setupFolder(dirname, rootPath, callback) {
        if (rootPath) {
            dirname = path.join(rootPath, dirname);
        }
        if (!fs.existsSync(dirname)) {
            fs.mkdir(dirname);
        }
        return dirname;
    }

    registerLoadingCallback(callback, target) {
        this._busyBody.registerCallback(callback, target);
    }

    loadSettings() {
        this._appSettings = new SaveFile({
            configName: 'settings',
            defaults: { }
        }, this._settingsContainer);

        this._windowBounds = new SaveFile({
            configName: 'window-bounds',
            defaults: {
                windowBounds: { width: 1200, height: 900 }
            }
        }, this._settingsContainer, true);
    }

    loadAppSettings(callback, target) {
        let jobId = this._busyBody.startJob("Einstellungen");
        this._appSettings.load(undefined, () => {
            callback.apply(target, this._appSettings.data);
            this._busyBody.removeJob(jobId);
        });
    }

    loadCharacters(callback, target) {
        let dirLoader = new Future();
        let fileLoader = new Future();

        let jobId = this._busyBody.startJob("Charaktere");

        let characterFiles = [];
        dirLoader.asynch(fs.readdir, this._characterContainer, (err, files) => {
            files.forEach( file => {
                let char = { file: new SaveFile({configName: file}, this._characterContainer) };
                characterFiles.push(char);
                fileLoader.asynch(char.file.load, undefined, undefined, char.file.loader);
            });
        }, fs).unify(undefined,  () => {
            fileLoader.unify(undefined, () => {
                let characterData = [];
                characterFiles.forEach( char => {
                    characterData.push(char.file.data);
                });
                callback.apply(target, [characterData]);
                this._busyBody.removeJob(jobId);
            });
        });
    }

    saveBounds(value) {
        let key = 'windowBounds';
        this._windowBounds.set(key, value, true);
    }

    getBounds() {
        let key = 'windowBounds';
        return this._windowBounds.get(key);
    }

    saveAppSetting(key, value) {
        this._appSettings.set(key, value);
    }

}


module.exports = Store;