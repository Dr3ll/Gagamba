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
        this._booksContainer = this._setupFolder('books', this._rootContainer);
        this._settingsContainer = this._setupFolder('settings', this._rootContainer);
        this._characterContainer = this._setupFolder('characters', this._rootContainer);
        this._charactersFiles = new Map();

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

    loadBooks(callback, target) {
        fs.readdir(this._booksContainer, (err, files) => {
            let books = [];
            files.forEach(fileName =>  {
                if (fileName.indexOf('.pdf') === fileName.length - 4) {
                    books.push({path: this._booksContainer + '\\' + fileName, fileName: fileName});
                }
            });
            callback.apply(target, [books]);
        });
    }

    loadSettings() {
        this._appSettings = new SaveFile({
            configName: 'settings',
            defaults: { quicksave: true }
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
            callback.apply(target, [this._appSettings.data]);
            this._busyBody.removeJob(jobId);
        }, this._appSettings.loader);
    }

    loadCharacters(callback, target) {
        let dirLoader = new Future();
        let fileLoader = new Future();

        let jobId = this._busyBody.startJob("Charaktere");

        this._charactersFiles.clear();
        dirLoader.asynch(fs.readdir, this._characterContainer, (err, files) => {
            files.forEach( fileName => {
                let char = { file: new SaveFile({configName: fileName}, this._characterContainer) };
                this._charactersFiles.set(fileName, char);
                fileLoader.asynch(char.file.load, undefined, undefined, char.file.loader);
            });
        }, fs).unify(undefined,  () => {
            fileLoader.unify(undefined, () => {
                let characterData = [];
                this._charactersFiles.forEach( char => {
                    char.file.data.fileName = char.file.fileName;
                    characterData.push(char.file.data);
                });
                callback.apply(target, [characterData]);
                this._busyBody.removeJob(jobId);
            });
        });
    }

    loadCharacter(fileName, callback, target) {
        let file = this._charactersFiles.get(fileName);
        if (file === undefined) {
            file = new SaveFile({configName: fileName}, this._characterContainer);
            file.load(undefined, () => {
                file.data.fileName = file.fileName;
                callback.apply(target, [file.data]);
            }, file.loader);

            this._charactersFiles.set(fileName, file);
        }

    }

    saveCharacter(character, callback, target) {
        let file = this._charactersFiles.get(character.fileName);
        if (file === undefined) {
            file = new SaveFile({configName: file}, this._characterContainer);
            this._charactersFiles.set(fileName, file);
        }

        file.save(character, () => {
            callback.apply(target, [undefined]);
        }, this);
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