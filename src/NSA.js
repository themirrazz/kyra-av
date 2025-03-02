return await (async function anonymous () {
    const XMLHttpRequest = this.raw.xhr;
    const fetch = this.raw.fetch;
    const env = this.boxedEnv;
    const current = this;
    const document = (function (env) {
        var {
            HookIframe, element, src, define
        } = env;
        var tree = {};
        var keys = Object.keys(window.Document.prototype);
        // enumerate through window.document
        keys.forEach(function (key) {
            if(key != 'createElement') {
                if(typeof window.document[key] === 'function') {
                    tree[key] = function (...args) {
                        return window.document[key].call(
                            window.document, ...args
                        );
                    }
                } else {
                    define(tree, key, {
                        get: function () {
                            return window.document[key]
                        },
                        set: function (v) {
                            return window.document[key] = v;
                        }
                    });
                }
            }
        });
        // iframe protection
        tree.createElement = function createElement(tag, options) {
            var k = element.call(window.document, tag, options);
            if(tag.toLowerCase() === 'iframe') {
                HookIframe(k, src);
            };
            return k
        };
        return tree;
    })(this.raw);
    const navigator = (function (env) {
        var {
            hooks, getUserMedia, webcamShield,
            webcamShieldExceptions, src, define
        } = env;
        var tree = {};
        var keys = Object.keys(window.Navigator.prototype);
        // enumerate through window.navigator
        keys.forEach(function (key) {
            if(key != 'mediaDevices') {
                define(tree, key, {
                    get: function () {
                        return window.navigator[key];
                    }
                });
            }
        });
        if(!window.navigator.mediaDevices) {
            return tree;
        }
        // camera
        tree.mediaDevices = {};
        var mkeys = Object.keys(window.navigator.mediaDevices.constructor.prototype);
        mkeys.forEach(function (mkey) {
            if(mkey != 'getUserMedia') {
                define(tree.mediaDevices, mkey, {
                    get: function () {
                        return window.navigator.mediaDevices[mkey];
                    }
                });
            }
        });
        tree.mediaDevices.getUserMedia = async function (constraints) {
            if(webcamShield()) {
                if(src === 'script_untrusted') {
                    throw new DOMException(
                        "Webcam access was blocked by KyraAV",
                        'SecurityError'
                    );
                } else if(!(webcamShieldExceptions().includes(
                    w96.FSUtil.fixPath(
                        w96.FSUtil.normalizeDriveLetter(src)
                    )
                ))) {
                    throw new DOMException(
                        "Webcam access was blocked by KyraAV",
                        'SecurityError'
                    );
                }
            }
            return await getUserMedia(constraints);
        };
        return tree;
    })(this.raw);
    const w96 = (function (env) {
        var {
            src, readbin, readstr,
            virusShield, hooks, defs, wapi,
            FileIsExcepted, ContainsSubArray
        } = env;
        var tree = {};
        var keys = Object.keys(env.wapi);
        keys.forEach(function (key) {
            if(key != 'FS') {
                env.define(tree, key, {
                    value: env.wapi[key]
                });
            }
        });
        tree.FS = {
            readstr: async function (url) {
                var data = await readstr.call(wapi.FS,url);
                var asBin = [];
                if(!virusShield()) {
                    // The user has intentionally disabled the virus shield.
                    return data;
                }
                if(FileIsExcepted(url)) {
                    return data;
                }
                for(var g = 0; g < data.length; g++) {
                    asBin.push(data.charCodeAt(g));
                }
                for(var i = 0; i < defs.length; i++) {
                    if(
                        defs[i] &&
                        JSON.stringify(defs[i].src)
                        === JSON.stringify(asBin)
                        && virusShield
                    ) {
                        hooks.trigger(
                            'DOMOpenMalware',
                            {
                                source: src,
                                type: defs[i].type,
                                id: defs[i].id,
                                target: url
                            }
                        );
                        throw new DOMException(
                            "This file could harm your device (blocked by KyraAV)",
                            "SecurityError"
                        );
                    } else if(
                        defs[i]&&defs[i].grp=="sample"&&
                        ContainsSubArray(asBin, defs[i].src)
                    ) {
                        hooks.trigger(
                            'DOMOpenMalware',
                            {
                                source: src,
                                type: defs[i].type,
                                id: defs[i].id,
                                target: url
                            }
                        );
                        throw new DOMException(
                            "This file could harm your device (blocked by KyraAV)",
                            "SecurityError"
                        );
                    }
                }
                return data;
            },
            readbin: async function (url) {
                var data = await readbin.call(wapi.FS,url);
                if(!virusShield()) {
                    // The user has intentionally disabled the virus shield.
                    return data;
                }
                if(FileIsExcepted(url)) {
                    return data;
                }
                for(var i = 0; i < defs.length; i++) {
                    if(
                        defs[i] &&
                        JSON.stringify(defs[i].src)
                        === JSON.stringify(Array.from(data))
                    ) {
                        hooks.trigger(
                            'DOMOpenMalware',
                            {
                                source: src,
                                type: defs[i].type,
                                id: defs[i].id,
                                target: url
                            }
                        );
                        throw new DOMException(
                            "This file could harm your device (blocked by KyraAV)",
                            "SecurityError"
                        );
                    } else if(
                        defs[i]&&defs[i].grp=="sample"&&
                        ContainsSubArray(Array.from(data), defs[i].src)
                    ) {
                        hooks.trigger(
                            'DOMOpenMalware',
                            {
                                source: src,
                                type: defs[i].type,
                                id: defs[i].id,
                                target: url
                            }
                        );
                        throw new DOMException(
                            "This file could harm your device (blocked by KyraAV)",
                            "SecurityError"
                        );
                    }
                }
                return data;
            }
        };
        var kk = [
            'get', 'hash', 'getFromCache', 'exists',
            'cp', 'cpdir', 'rm', 'rmdir', 'writestr', 'writebin',
            'touch', 'toBlob', 'toURL', 'mvdir', 'mvfile',
            'rename', 'stat', 'mount', 'mounts', 'isFile',
            'name', 'nextLetter', 'umount', 'walk', 'filetype',
            'list', 'isEmpty', 'uncache', 'readdir', 'readBinChunk',
            'readStrChunk'
        ];
        kk.forEach(function (key) {
            if(typeof env.wapi.FS[key] === 'function') {
                tree.FS[key] = function (...args) {
                    return env.wapi.FS[key].call(env.wapi.FS, ...args);
                }
            } else {
                tree.FS[key] = env.wapi.FS[key];
            }
        });
        return tree;
    })(this.raw);

    if(this.raw.trusted) {
        var RawAccess = this.raw;
    }

    this.raw = this.raw.extra;
    if(this.raw === undefined) {
        delete this.raw;
    }

    const FS = w96.FS;
    const FSUtil = w96.FSUtil;
    const WApplication = w96.WApplication;
    const StandardWindow = w96.StandardWindow;
    const include = this.include;
    const registerApp = (!w96.sys.reg) ? null : w96.sys.reg.registerApp;
    const deregisterApp = (!w96.sys.reg) ? null : w96.sys.reg.deregisterApp;
    const require_check = this.require_check;
