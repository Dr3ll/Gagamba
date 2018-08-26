const Future = require('./../Future/_future.js');
const BusyBody = require('./busyBody.js');
const path = require('path');
const fs = require('fs');

class SaveFile {
    constructor(opts, container, sync) {
        let filename = opts.configName;
        if (filename.indexOf('.json') !== filename.length - 5) {
            filename += '.json'
        }
        this.path = path.join(container, filename);
        this.defaults = opts.defaults;

        if (!sync) {
            this._busyBody = BusyBody.getInstance();
            this.loader = new Future(fs.readFile, this.path, this._parseDataFile, fs, this);
        } else {
            this.data = parseDataFileSynch(this.path, this.defaults);
        }
    }

    get load() {
        return this.loader.unify;
    }

    // This will just return the property on the `data` object
    get(key) {
        return this.data[key];
    }

    // ...and this will set it
    set(key, value, sync) {
        this.data[key] = value;

        let jobId = this._busyBody.startJob(key);

        if (sync) {
            fs.writeFileSync(this.path, JSON.stringify(this.data));
        } else {
            fs.writeFile(this.path, JSON.stringify(this.data), () => {
                this._busyBody.remove(jobId);
            });
        }
    }

    _parseDataFile(err, data) {
        if (err === null) {
            try {
                this.data = JSON.parse(data);
            } catch (e) {
                this.data = this.defaults;
            }
        } else {
            this.data = this.defaults;
        }
    }

}

function parseDataFileSynch(filePath, defaults) {
    // We'll try/catch it in case the file doesn't exist yet, which will be the case on the first application run.
    // `fs.readFileSync` will return a JSON string which we then parse into a Javascript object
    try {
        return JSON.parse(fs.readFileSync(filePath));
    } catch(error) {
        // if there was some kind of error, return the passed in defaults instead.
        return defaults;
    }
}


module.exports = SaveFile;