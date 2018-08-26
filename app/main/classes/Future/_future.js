class Future {
    constructor(foo, args, callbackHandler, functionTarget, callbackTarget) {
        this._closed = false;
        this._count = 0;
        this._joblist = new Map();
        this._doneJobs = new Map();

        this._callBack = function() {};
        this._callBackArgs = undefined;

        if (foo) {
            this.asynch(foo, args, callbackHandler, functionTarget, callbackTarget);
        }
    }

    asynch(foo, args, callbackHandler, functionTarget, callbackTarget) {
        if (!this._closed) {
            this._joblist.set(this._count++,{ f: foo, args: args, callbackHandler: callbackHandler, f_target: functionTarget, c_target: callbackTarget});
        }

        return this;
    }

    unify(args, callback, future) {
        let self = future || this;

        self._closed = true;
        self._callBack = callback || self._callBack;
        self._callBackArgs = args;

        if (self._joblist === undefined) {
            console.log("The future is lost");
            return;
        }

        self._joblist.forEach((job, key, map) => {
            job.f.apply(job.f_target, [job.args, (...args) =>  {
                let para = Array.from(args);
                if (job.callbackHandler) {
                    job.callbackHandler.apply(job.c_target, para);
                }
                self._jobDone(key);
            }]);
        });

        return self;
    }

    _jobDone(id) {
        this._doneJobs.set(id, this._joblist.get(id));
        this._joblist.delete(id);

        if (this._joblist.size === 0) {
            this._joblist = this._doneJobs;
            this._doneJobs = new Map();
            this._callBack(this._callBackArgs);
        }
    }
}


module.exports = Future;