const Future = require('./../Future/_future.js');
const BusyBody = require('./busyBody.js');
const path = require('path');
const fs = require('fs');

class SaveFile {
    constructor(opts, container, sync) {
        this.fileName = opts.configName;
        if (this.fileName.indexOf('.json') !== this.fileName.length - 5) {
            this.fileName += '.json'
        }
        this.path = path.join(container, this.fileName);
        this.defaults = opts.defaults;

        this._busyBody = BusyBody.getInstance();

        if (!sync) {
            this.loader = new Future(fs.readFile, this.path, this._parseDataFile, fs, this);
        } else {
            this.data = parseDataFileSynch(this.path, this.defaults);
        }
    }

    get load() {
        return this.loader.unify;
    }

    get(key) {
        return this.data[key];
    }

    set(key, value, sync) {
        if(this.data === undefined) {
            this.data = {};
        }
        this.data[key] = value;

        if (sync) {
            let jobId = this._busyBody.startJob(key);
            let bb = this._busyBody;
            fs.writeFileSync(this.path, JSON.stringify(this.data));
        } else {
            fs.writeFile(this.path, JSON.stringify(this.data), () => {
                bb.removeJob(jobId);
            });
        }
    }

    save(data, callback, target) {
        this.data = data;
        fs.writeFile(this.path, JSON.stringify(this.data), () => {
            callback.apply(target);
        });
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