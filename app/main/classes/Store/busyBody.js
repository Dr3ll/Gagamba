const Future = require('./../Future/_future.js');

class BusyBody {
    constructor() {
        this._counter = 0;
        this._queue = new Map();
    }

    static getInstance() {
        if (!BusyBody._instance) {
            BusyBody._instance = new BusyBody();
        }
        return BusyBody._instance;
    }

    _count() {
        if (this._counter === Number.MAX_SAFE_INTEGER) {
            this._counter = 0;
        }
        return this._counter++;
    }

    _refreshLoading() {
        if (this._callback) {
            this._callback.apply(this._callbackTarget, this._queue.size !== 0);
        }
    }

    startJob(label) {
        let c = this._count();
        this._queue.set(c, label);
        this._refreshLoading();
        return c;
    }

    removeJob(id) {
        this._queue.delete(id);
        this._refreshLoading();
    }

    registerCallback(callback, target) {
        this._callback = callback;
        this._callbackTarget = target;
        this._refreshLoading();
    }

}




module.exports = BusyBody;