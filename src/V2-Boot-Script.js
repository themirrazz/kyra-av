setTimeout(async function () {
    if(w96.sys.rel.getVersion() >= 300000) {
        // The boot script should not run on v3+
        return false;
    }
    if(w96.WRT) {
        w96.WRT.runFile('C:/local/KyraAV/kyra.js', {});
    } else {
        eval(await w96.FS.readstr('C:/local/KyraAV/kyra.js'));
    }
},500);
