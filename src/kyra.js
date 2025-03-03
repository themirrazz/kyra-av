//!wrt $BSPEC:{"frn":"Kyra","dsc":"A fully-fleged antivirus for Windows 96.","cpr":"Copyright themirrazz 2025. All rights reserved.","ver":1.0}
(async function main(
    HooksSystem, LoadAVDefs, LoadWBSDefs, ValidateWBSUrl,
    CreateVirusWarning, ContainsSubArray, GetApps, TestForApp,
    GetSettings, VarBinToString, CheckVirusesInSource,
    GetChangedSettings, CompareArray, GenerateFSOverlay,
    StartUpdateProcess, ParsePermissions, CreateWebAlertTemplate,
    FixFilePaths, ToURL
) {
    var trustedApps = [
        "//!wrt $BSPEC:{\"frn\": \"KyraAV Dashboard\",\"ver\":1.0,\"dsc\":\"Dashboard for controlling KyraAV.\"}\r\nif(typeof RawAccess === 'undefined') {\r\n    var RawAccess;\r\n}\r\n\r\nif(RawAccess === window.RawAccess) {\r\n    var RawAccess;\r\n}\r\n\r\nclass KyraAVApp extends WApplication {\r\n    constructor() {\r\n        super();\r\n    }\r\n\r\n    taskName = \"KyraAV Dashboard\";\r\n\r\n    async main (argv) {\r\n        super.main(argv);\r\n        var wnd = this.appWindow = this.createWindow({\r\n            title: \"KyraAV\",\r\n            taskbar: true,\r\n            body: `<div style=\"width: 100%;height:100%;background-color:#5a36bf;display:flex;flex-direction:column;\">\r\n                <div style=\"width:100%;height:28px;display:flex;flex-direction:row-reverse;background-color:#3d1b9e;\">\r\n                    <div id=\"kyra-av-close-button\">\r\n                        <svg style=\"width: 26px; height: 26px\" fill=\"white\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 384 512\"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d=\"M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z\"/></svg>\r\n                    </div>\r\n                    <div id=\"kyra-av-minimize-button\">\r\n                        <svg style=\"width: 26px; height: 26px\" fill=\"white\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 448 512\"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d=\"M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z\"/></svg>\r\n                    </div>\r\n                </div>\r\n                <div style=\"color: white;width:100%;height:calc(100% - 28px); display: flex;flex-direction:row;\">\r\n                    <div id='kyra-av-sidebar' class='nodrag' style=\"width: 128px; padding: 4px; height: calc(100% - 8px); display: flex; flex-direction: column;background-color:#3d1b9e;\">\r\n                        <div id='kyra-av-status-button' style='width:100%;display: flex;flex-direction:column;border-radius: 14px;background-color:#0000007f;justify-content:space-evenly;height:86px;'>\r\n                            <p style=\"margin: 0px;font-size:12px;text-align:center;padding:0px;\">\r\n                                <svg fill=\"white\" style=\"width: 32px; height: 32px\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d=\"M256 0c4.6 0 9.2 1 13.4 2.9L457.7 82.8c22 9.3 38.4 31 38.3 57.2c-.5 99.2-41.3 280.7-213.6 363.2c-16.7 8-36.1 8-52.8 0C57.3 420.7 16.5 239.2 16 140c-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.8 1 251.4 0 256 0zm0 66.8l0 378.1C394 378 431.1 230.1 432 141.4L256 66.8s0 0 0 0z\"/></svg>\r\n                            </p>\r\n                            <p style=\"margin: 0px;font-size:16px;text-align:center;padding:0px;\">Status</p>\r\n                        </div>\r\n                        <div id='kyra-av-core-button' style='width:100%;display: flex;flex-direction:column;border-radius: 14px;background-color:transparent;justify-content:space-evenly;height:86px;'>\r\n                            <p style=\"margin: 0px;font-size:12px;text-align:center;padding:0px;\">\r\n                                <svg fill=\"white\" style=\"width: 32px; height: 32px\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d=\"M256 398.8c-11.8 5.1-23.4 9.7-34.9 13.5c16.7 33.8 31 35.7 34.9 35.7s18.1-1.9 34.9-35.7c-11.4-3.9-23.1-8.4-34.9-13.5zM446 256c33 45.2 44.3 90.9 23.6 128c-20.2 36.3-62.5 49.3-115.2 43.2c-22 52.1-55.6 84.8-98.4 84.8s-76.4-32.7-98.4-84.8c-52.7 6.1-95-6.8-115.2-43.2C21.7 346.9 33 301.2 66 256c-33-45.2-44.3-90.9-23.6-128c20.2-36.3 62.5-49.3 115.2-43.2C179.6 32.7 213.2 0 256 0s76.4 32.7 98.4 84.8c52.7-6.1 95 6.8 115.2 43.2c20.7 37.1 9.4 82.8-23.6 128zm-65.8 67.4c-1.7 14.2-3.9 28-6.7 41.2c31.8 1.4 38.6-8.7 40.2-11.7c2.3-4.2 7-17.9-11.9-48.1c-6.8 6.3-14 12.5-21.6 18.6zm-6.7-175.9c2.8 13.1 5 26.9 6.7 41.2c7.6 6.1 14.8 12.3 21.6 18.6c18.9-30.2 14.2-44 11.9-48.1c-1.6-2.9-8.4-13-40.2-11.7zM290.9 99.7C274.1 65.9 259.9 64 256 64s-18.1 1.9-34.9 35.7c11.4 3.9 23.1 8.4 34.9 13.5c11.8-5.1 23.4-9.7 34.9-13.5zm-159 88.9c1.7-14.3 3.9-28 6.7-41.2c-31.8-1.4-38.6 8.7-40.2 11.7c-2.3 4.2-7 17.9 11.9 48.1c6.8-6.3 14-12.5 21.6-18.6zM110.2 304.8C91.4 335 96 348.7 98.3 352.9c1.6 2.9 8.4 13 40.2 11.7c-2.8-13.1-5-26.9-6.7-41.2c-7.6-6.1-14.8-12.3-21.6-18.6zM336 256a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zm-80-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z\"/></svg>\r\n                            </p>\r\n                            <p style=\"margin: 0px;font-size:16px;text-align:center;padding:0px;\">Core</p>\r\n                        </div>\r\n                        <div id='kyra-av-extras-button' style='width:100%;display: flex;flex-direction:column;border-radius: 14px;background-color:transparent;justify-content:space-evenly;height:86px;'>\r\n                            <p style=\"margin: 0px;font-size:12px;text-align:center;padding:0px;\">\r\n                                <svg fill=\"white\" style=\"width: 32px; height: 32px\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 448 512\"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d=\"M349.4 44.6c5.9-13.7 1.5-29.7-10.6-38.5s-28.6-8-39.9 1.8l-256 224c-10 8.8-13.6 22.9-8.9 35.3S50.7 288 64 288l111.5 0L98.6 467.4c-5.9 13.7-1.5 29.7 10.6 38.5s28.6 8 39.9-1.8l256-224c10-8.8 13.6-22.9 8.9-35.3s-16.6-20.7-30-20.7l-111.5 0L349.4 44.6z\"/></svg>\r\n                            </p>\r\n                            <p style=\"margin: 0px;font-size:16px;text-align:center;padding:0px;\">Extras</p>\r\n                        </div>\r\n                    </div>\r\n                    <div id='kyra-av-app' style=\"height: 100%; width: calc(100% - 136px);\">\r\n                        <div id='kyra-av-status-tab' style=\"width: 100%; height: 100%; overflow: auto;\">\r\n                            <div id='kyra-av-status-okay' style=\"width: 100%; height: 100%; display: none; flex-direction: column; justify-content: center;\">\r\n                                <p style=\"margin: 0px;font-size:32px;text-align:center;padding:0px;\">\r\n                                    <svg fill=\"#27c486\" style=\"height: 140px; width: 140px;\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d=\"M256 0c4.6 0 9.2 1 13.4 2.9L457.7 82.8c22 9.3 38.4 31 38.3 57.2c-.5 99.2-41.3 280.7-213.6 363.2c-16.7 8-36.1 8-52.8 0C57.3 420.7 16.5 239.2 16 140c-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.8 1 251.4 0 256 0zm0 66.8l0 378.1C394 378 431.1 230.1 432 141.4L256 66.8s0 0 0 0z\"/></svg>\r\n                                </p>\r\n                                <p style=\"margin: 0px;font-size:32px;text-align:center;padding:0px;\">\r\n                                    Okay!\r\n                                </p>\r\n                            </div>\r\n                            <div id='kyra-av-status-fail' style=\"width: 100%; height: 100%; display: none; flex-direction: column; justify-content: center;\">\r\n                                <p style=\"margin: 0px;font-size:32px;text-align:center;padding:0px;\">\r\n                                    <svg fill=\"#d44449\" style=\"height: 140px; width: 140px;\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d=\"M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24l0 112c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-112c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z\"/></svg>\r\n                                </p>\r\n                                <p style=\"margin: 0px;font-size:32px;text-align:center;padding:0px;\">\r\n                                    We can't connect to the KyraAV service.\r\n                                </p>\r\n                            </div>\r\n                            <div id='kyra-av-status-off' style=\"width: 100%; height: 100%; display: none; flex-direction: column; justify-content: center;\">\r\n                                <p style=\"margin: 0px;font-size:32px;text-align:center;padding:0px;\">\r\n                                    <svg fill=\"#d44449\" style=\"height: 140px; width: 140px;\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d=\"M459.1 52.4L442.6 6.5C440.7 2.6 436.5 0 432.1 0s-8.5 2.6-10.4 6.5L405.2 52.4l-46 16.8c-4.3 1.6-7.3 5.9-7.2 10.4c0 4.5 3 8.7 7.2 10.2l45.7 16.8 16.8 45.8c1.5 4.4 5.8 7.5 10.4 7.5s8.9-3.1 10.4-7.5l16.5-45.8 45.7-16.8c4.2-1.5 7.2-5.7 7.2-10.2c0-4.6-3-8.9-7.2-10.4L459.1 52.4zm-132.4 53c-12.5-12.5-32.8-12.5-45.3 0l-2.9 2.9C256.5 100.3 232.7 96 208 96C93.1 96 0 189.1 0 304S93.1 512 208 512s208-93.1 208-208c0-24.7-4.3-48.5-12.2-70.5l2.9-2.9c12.5-12.5 12.5-32.8 0-45.3l-80-80zM200 192c-57.4 0-104 46.6-104 104l0 8c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-8c0-75.1 60.9-136 136-136l8 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-8 0z\"/></svg>\r\n                                </p>\r\n                                <p style=\"margin: 0px;font-size:32px;text-align:center;padding:0px;\">\r\n                                    You're not being fully protected\r\n                                </p>\r\n                            </div>\r\n                        </div>\r\n                        <div id='kyra-av-core-tab' class='nodrag' style=\"width: 100%; height: 100%; overflow: auto;display:none;\">\r\n                            <h1> experimental core </h1>\r\n                            <p style='font-size:24px'>\r\n                                Virus shield\r\n                                <button onclick=\"if(!event.isTrusted) {return;};w96.FS.readstr('C:/local/KyraAV/settings.json').then(d=>{var x = JSON.parse(d);x.virusShield=!x.virusShield;this.innerText=x.virusShield?'off':'on';w96.FS.writestr('C:/local/KyraAV/settings.json',JSON.stringify(x))})\">toggle</button\r\n                            </p>\r\n                        </div>\r\n                        <div id='kyra-av-extras-tab' class='nodrag' style=\"width: 100%; height: 100%; overflow: auto;display:none;\">\r\n                            extras\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>`,\r\n            initialHeight: 460,\r\n            initialWidth: 800,\r\n            resizable: true,\r\n            center: true\r\n        });\r\n        wnd.show();\r\n        wnd.wndObject.querySelector('.titlebar').remove();\r\n        wnd.wndObject.querySelector('.window-html-content').classList.remove('nodrag');\r\n        wnd.wndObject.querySelector('#kyra-av-close-button').onclick = function () {\r\n            wnd.close();\r\n        };\r\n        wnd.wndObject.querySelector('#kyra-av-minimize-button').onclick = function () {\r\n            wnd.toggleMinimize();\r\n        };\r\n        // tab buttons\r\n        var btnStatus = wnd.wndObject.querySelector('#kyra-av-status-button');\r\n        var btnCore = wnd.wndObject.querySelector('#kyra-av-core-button');\r\n        var btnExtras = wnd.wndObject.querySelector('#kyra-av-extras-button');\r\n        // tabs\r\n        var tabStatus = wnd.wndObject.querySelector('#kyra-av-status-tab');\r\n        var tabCore = wnd.wndObject.querySelector('#kyra-av-core-tab');\r\n        var tabExtras = wnd.wndObject.querySelector('#kyra-av-extras-tab');\r\n        // status\r\n        var statusOk = tabStatus.querySelector('#kyra-av-status-okay');\r\n        var statusOff = tabStatus.querySelector('#kyra-av-status-off');\r\n        var statusFail = tabStatus.querySelector('#kyra-av-status-fail');\r\n        if(!RawAccess) {\r\n            statusOk.style.display = 'none';\r\n            statusOff.style.display = 'none';\r\n            statusFail.style.display = 'flex';\r\n        } else if(!(RawAccess.virusShield() && RawAccess.webShield())) {\r\n            statusOk.style.display = 'none';\r\n            statusOff.style.display = 'flex';\r\n            statusFail.style.display = 'none';\r\n        } else {\r\n            statusOk.style.display = 'flex';\r\n            statusOff.style.display = 'none';\r\n            statusFail.style.display = 'none';\r\n        }\r\n        // onclick handlers\r\n        btnStatus.onclick = function () {\r\n            btnStatus.style.backgroundColor = '#0000007f';\r\n            btnCore.style.backgroundColor = 'transparent';\r\n            btnExtras.style.backgroundColor = 'transparent';\r\n            tabStatus.style.display = '';\r\n            tabCore.style.display = 'none';\r\n            tabExtras.style.display = 'none';\r\n            if(!RawAccess) {\r\n                statusOk.style.display = 'none';\r\n                statusOff.style.display = 'none';\r\n                statusFail.style.display = 'flex';\r\n            } else if(!(RawAccess.virusShield() && RawAccess.webShield())) {\r\n                statusOk.style.display = 'none';\r\n                statusOff.style.display = 'flex';\r\n                statusFail.style.display = 'none';\r\n            } else {\r\n                statusOk.style.display = 'flex';\r\n                statusOff.style.display = 'none';\r\n                statusFail.style.display = 'none';\r\n            }\r\n        };\r\n        btnCore.onclick = function () {\r\n            btnStatus.style.backgroundColor = 'transparent';\r\n            btnCore.style.backgroundColor = '#0000007f';\r\n            btnExtras.style.backgroundColor = 'transparent';\r\n            tabStatus.style.display = 'none';\r\n            tabCore.style.display = '';\r\n            tabExtras.style.display = 'none';\r\n        };\r\n        btnExtras.onclick = function () {\r\n            btnStatus.style.backgroundColor = 'transparent';\r\n            btnCore.style.backgroundColor = 'transparent';\r\n            btnExtras.style.backgroundColor = '#0000007f';\r\n            tabStatus.style.display = 'none';\r\n            tabCore.style.display = 'none';\r\n            tabExtras.style.display = '';\r\n        };\r\n    };\r\n};\r\n\r\nreturn await WApplication.execAsync(new KyraAVApp(), this.boxedEnv.args);"
    ];
    var version = 1003001;
    var latestVersion = NaN;
    var SoundFXURL;
    ToURL('c:/local/KyraAV/sfx.mp3').then(url=>SoundFXURL=url).catch(_=>void(_));
    // Set up our hooks
    var hooks = HooksSystem();
    // Get settings
    var settings = await GetSettings();
    // AV definitions
    var defs = [];
    var wbs_defs = [];
    // Hooks cooldown
    var bscd_Unauth = {};
    var behaviorShieldCoolDown = {};
    var virusShieldCoolDown = {};
    var webShieldCoolDown = {};
    // Core shields
    var virusShield = settings.virusShield;
    var behaviorShield = true;
    var webShield = settings.webShield;
    var ransomShield = true;
    // upd
    hooks.addHook('UpdSetting', async function (argv) {
        settings = await GetSettings();
        virusShield = settings.virusShield;
        behaviorShield = true;
        webShield = settings.webShield;
        ransomShield = true;
    });
    // Assets
    var threatSecured_img = '';
    var malWebBlock_img = '';
    var domEscapeStop_img = '';
    var ransomWare_img = '';
    var critical_img = '';
    // Exceptions
    var virusExceptions = [];
    var folderExceptions = [];
    var fileExceptions = [];
    var webExceptions = [];
    // 60 seconds
    var coolDownTime = 10000;
    // Add hooks
    hooks.addHook('DOMOpenMalware', async function (argv) {
        try {
            var AppList = await GetApps(wapi);
            if(!(AppList instanceof Array)) { throw new TypeError("ikitakunai"); }
        } catch {
            var AppList = [];
        }
        if((virusShieldCoolDown[argv.id]||0) < Date.now()) {
            CreateVirusWarning({
                title: "Threat secured",
                img: threatSecured_img,
                sound: SoundFXURL,
                desc: (
                    "We've blocked your file "
                    + w96.FSUtil.fname(argv.target) +
                    " because it was infected with " +
                    (
                        argv.type === 'malware' ? "a virus." :
                        (argv.type==='adware'?"adware.":(
                            argv.type==="ransomware"?"ransomware.":(
                            argv.type==="keylogger"?"a keylogger.":(
                                argv.type==="spyware"?"spyware.":"something bad."
                            )
                            )
                        ))
                    )
                ),
                technical: [
                    {
                        title: "Source",
                        value: argv.source === null ? "Kernel Access" : (
                            argv.source === "script_untrusted" ? "Dynamic WRT Runtime" : (
                                TestForApp(
                                    AppList, FixFilePaths(argv.source)
                                )||w96.FSUtil.fname(argv.source)
                            )
                        )
                    },
                    {
                        title: "Infected File",
                        value: argv.target
                    },
                    {
                        title: "Virus",
                        value: argv.id
                    }
                ]
            });
        }
        virusShieldCoolDown[argv.id] = Date.now() + coolDownTime;
    });
    hooks.addHook('DOMOpenMalwareWRT', async function (argv) {
        if((virusShieldCoolDown[argv.id]||0) < Date.now()) {
            CreateVirusWarning({
                title: "Threat secured",
                img: threatSecured_img,
                sound: SoundFXURL,
                desc: (
                    "We've blocked a WRT script from running"
                    + " because it was infected with " +
                    (
                        argv.type === 'malware' ? "a virus." :
                        (argv.type==='adware'?"adware.":(
                            argv.type==="ransomware"?"ransomware.":(
                            argv.type==="keylogger"?"a keylogger.":(
                                argv.type==="spyware"?"spyware.":"something bad."
                            )
                            )
                        ))
                    )
                ),
                technical: [
                    {
                        title: "Source",
                        value: "Kernel Access"
                    },
                    {
                        title: "Infected File",
                        value: '<WRTTemporarySource>'
                    },
                    {
                        title: "Virus",
                        value: argv.id
                    }
                ]
            });
        }
        virusShieldCoolDown[argv.id] = Date.now() + coolDownTime;
    });
    hooks.addHook('DOMWebRequestBlocked', async function (argv) {
        try {
            var AppList = await GetApps(wapi);
            if(!(AppList instanceof Array)) { throw new TypeError("ikitakunai"); }
        } catch {
            var AppList = [];
        }
        if((webShieldCoolDown[argv.url]||0) < Date.now()) {
            // Code to show warning
           CreateVirusWarning({
                title: "Threat secured",
                sound: SoundFXURL,
                img: threatSecured_img,
                desc: "We've blocked a suspicious website for you.",
                technical: [
                    {
                        title: "Source",
                        value: argv.source === null ? "Kernel Access" : (
                            argv.source === "script_untrusted" ? "Dynamic WRT Runtime" : (
                                TestForApp(
                                    AppList, FixFilePaths(argv.source)
                                )||w96.FSUtil.fname(argv.source)
                            )
                        )
                    },
                    {
                        title: "URL",
                        value: argv.url
                    },
                    {
                        title: "Type",
                        value: argv.type === 'phishing_wbs' ? "Phishing/Scam" : (
                            argv.type === 'malware_wbs'?"Malware":(
                                argv.type === "adware_wbs" ? "Adware" : "Unknown"
                            )
                        )
                    }
                ]
            });
        }
    });
    hooks.addHook('DOMObjectRewriteAttempt', function (argv) {
        if((webShieldCoolDown[argv.url]||0) < Date.now()) {
            // Code to show warning
            /*alert("We blocked an app from damaging your system<br/>Source:"+argv.source, {
                title: "KyraAv: Security Alert"
            });*/
        }
    });
    // Check exception
    var FileIsExcepted = function (url_o) {
        var url = FixFilePaths(url_o)
        if(fileExceptions.indexOf(url) > -1) {
            return true;
        };
        for(var i = 0; i < folderExceptions.length; i++) {
            if(url.indexOf(folderExceptions[i]) === 0) {
                return true;
            }
        }
        return false;
    };
    // Get the things we're proxying
    var wapi = window.w96;
    var readstr = wapi.FS.readstr;
    var readbin = wapi.FS.readbin;
    var writestr = wapi.FS.writestr;
    var writebin = wapi.FS.writebin;
    var rm = wapi.FS.rm;
    var rmd = wapi.FS.rmdir;
    var mv = wapi.FS.mvfile;
    var mvd = wapi.FS.mvdir;
    var cp = wapi.FS.cpfile;
    var cpd = wapi.FS.cpdir;
    var fetch = window.fetch;
    var xhr = XMLHttpRequest;
    var xhr_open = XMLHttpRequest.prototype.open;
    var xhr_send = XMLHttpRequest.prototype.send;
    var ws = WebSocket;
    var au = Audio;
    var ls = window.localStorage;
    var lsdb = window.localStorageDB;
    var idb = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;
    var creEl = document.createElement;
    var dp = Object.defineProperty;
    var dpPlural = Object.defineProperties;
    var wrtObj = wapi.WRT;
    if(!wrtObj) {
        var wrt = function () {
            return Promise.reject(
                new DOMException('Your version of Windows 96 does not support WRT.')
            )
        };
        var wrtFile = function () {
            return Promise.reject(
                new DOMException('Your version of Windows 96 does not support WRT.')
            )
        };
        // alert the user
        if(w96.sys.log) {
            w96.sys.log(
                "The WRT runtime is missing. Malware on your computer might be manipulating it, or your version might not support it (WRT is supported on v2sp2 and newer)",
                "KyraAV Antivirus",
                "warning"
            );
        } else {
            // Syslog is only available on v3+
            console.warn("The WRT runtime is missing. Malware on your computer might be manipulating it, or your version might not support it (WRT is supported on v2sp2 and newer)");
        }
    } else {
        var wrt = wapi.WRT.run;
        var wrtFile = wapi.WRT.runFile;
    }
    var evalUnsafe = window.eval;
    var getUserMedia_orig;
    var getUserMedia;
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // For the webcam shield
        getUserMedia_orig = navigator.mediaDevices.getUserMedia;
        getUserMedia = function (constraints) {
            return getUserMedia_orig.call(navigator.mediaDevices, constraints);
        }
    }
    // Kernel image protection
    var k = ls.setItem;
    if(ls.getItem('kernel-image')) {
        ls.removeItem('kernel-image');
    }
    ls.setItem = function (key, value) {
        if(key === 'kernel-image') {
            throw new DOMException(
                "Access to system kernel denied (blocked by KyraAV)",
                'DOMException'
            );
        }
        k.call(ls, key, value);
    };
    // Virus protection in evals
    window.eval = function (source) {
        if(virusShield) {
            var chk = CheckVirusesInSource(source, defs, VarBinToString);
            if(chk) {
                hooks.trigger('DOMOpenMalwareWRT', {
                    type: chk.type,
                    id: chk.id,
                    source: 'script_untrusted'
                });
                throw new DOMException(
                    'This WRT program includes malware (blocked by KyraAV)',
                    'SecurityError'
                );
            }
        };
        // We don't want to accidentally leak anything
        return evalUnsafe.call(window, source);
    };
    // updates
    var chkUpd = function () {
        fetch("https://raw.githubusercontent.com/themirrazz/kyra-av/refs/heads/main/upd-skr/latest.txt", {
            mode: 'cors'
        }).then(async function (k) {
            latestVersion = Number(await k.text());
            if(!isNaN(latestVersion)) {
                if(latestVersion > version) {
                    StartUpdateProcess({ writebin, fetch, dp }).catch(async function (error) {
                        console.warn(error);
                    });
                }
            } else {
                setTimeout(chkUpd, 30 * 60000);
                // Even if the source code stays the same,
                // check for updates to virus definitions/malicious websites
                var vN = 1000000;
                try {
                    vN = Number(await readstr.call(wapi.FS, 'C:/local/KyraAV/defupd.txt'));
                } catch (error) {
                    vN = 1000000;
                    if(!await wapi.FS.exists('C:/local/KyraAV/defupd.txt')) {
                        await wapi.FS.touch('C:/local/KyraAV/defupd.txt');
                        await writestr.call(wapi.FS, 'C:/local/KyraAV/defupd.txt', '1000000');
                    }
                }
                if(isNaN(vN)) {
                    vN = 1000000;
                };
                fetch("https://raw.githubusercontent.com/themirrazz/kyra-av/refs/heads/main/definitions/version.text", {
                    mode: 'cors'
                }).then(async function (verRes) {
                    var ver = Number(await verRes.text());
                    if(isNaN(ver)) {
                        ver = 0; // DO NOT UPDATE IF CORRUPTED!!!
                    }
                    if(ver > vN) {
                        // Time to definition update.
                        fetch("https://raw.githubusercontent.com/themirrazz/kyra-av/refs/heads/main/definitions/web-shield.json", {
                            mode: 'cors'
                        }).then(async function (wbsd) {
                            var z = await wbsd.text();
                            var zg = JSON.parse(z);
                            wbs_defs = z;
                            await writestr.call(w96.FS, 'C:/local/KyraAV/web-shield.json');
                        });
                        fetch("https://raw.githubusercontent.com/themirrazz/kyra-av/refs/heads/main/definitions/definitions.json", {
                            mode: 'cors'
                        }).then(async function (wbsd) {
                            var z = await wbsd.text();
                            var zg = JSON.parse(z);
                            wbs_defs = z;
                            await writestr.call(w96.FS, 'C:/local/KyraAV/definitions.json');
                        });
                    }
                });
            }
        }).catch(_ => {
            setTimeout(chkUpd, 25000);
        });
    };
    chkUpd();
    // Virus Shield
    w96.FS.readbin = async function (url) {
        var data = await readbin.call(wapi.FS,url);
        if(virusShield === false) {
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
                        source: null,
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
                        source: null,
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
    };
    w96.FS.readstr = async function (url) {
        var data = await readstr.call(wapi.FS,url);
        var asBin = [];
        if(virusShield === false) {
            // The user has intentionally disabled the virus shield.
            return data;
        }
        for(var g = 0; g < data.length; g++) {
            asBin.push(data.charCodeAt(g));
        }
        if(FileIsExcepted(url)) {
            return data;
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
                        source: null,
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
                        source: null,
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
    };
    // Prevent Tampering
    w96.FS.writebin = function (loc, data) {
        // fixed
        var url = FixFilePaths(loc);
        // System files
        var bannedURLAccess = [
            'C:/local/KyraAV/sfx.mp3',
            'C:/local/KyraAV/web-shield.json',
            'C:/local/KyraAV/NSA.js',
            'C:/local/KyraAV/definitions.json',
            'C:/local/KyraAV/webcam-shield-test',
            'C:/local/KyraAV/kyra.js',
        ];
        if(w96.sys.rel.getVersion() >= 300000) {
            // Using Windows 96 v3 or newer
            bannedURLAccess.push("C:/system/startup/aaaaaa-KyraAV.link");
        } else {
            // Using Windows 96 v2sp2 or older
            bannedURLAccess.push("C:/system/boot/AAAKyraProtector.js")
        }
        // Configuration files
        var configFile = "C:/local/KyraAV/settings.json";
        if(bannedURLAccess.includes(url)) {
            throw new DOMException(
                "These files are write-protected (blocked by KyraAV)",
                'SecurityError'
            );
        } else if(url === configFile) {
            throw new DOMException(
                "Please use writestr to change antivirus settings.",
                'SecurityError'
            );
        }
        return writebin.call(w96.FS, loc, data);
    };
    var isConfiguring = false;
    w96.FS.writestr = async function (loc, data) {
        // fixed
        var url = FixFilePaths(loc);
        // System files
        var bannedURLAccess = [
            'C:/local/KyraAV/sfx.mp3',
            'C:/local/KyraAV/web-shield.json',
            'C:/local/KyraAV/NSA.js',
            'C:/local/KyraAV/definitions.json',
            'C:/local/KyraAV/webcam-shield-test',
            'C:/local/KyraAV/kyra.js'
        ];
        if(w96.sys.rel.getVersion() >= 300000) {
            // Using Windows 96 v3 or newer
            bannedURLAccess.push("C:/system/startup/aaaaaa-KyraAV.link");
        } else {
            // Using Windows 96 v2sp2 or older
            bannedURLAccess.push("C:/system/boot/AAAKyraProtector.js")
        }
        // Configuration files
        var configFile = "C:/local/KyraAV/settings.json";
        if(bannedURLAccess.includes(url)) {
            throw new DOMException(
                "These files are write-protected (blocked by KyraAV)",
                'SecurityError'
            );
        } else if(url === configFile) {
            if(isConfiguring) {
                throw new ReferenceError(
                    "Another app is already attempting to configure KyraAV"
                );
            };
            isConfiguring = true;
            try {
                var parsedCfg = JSON.parse(data);
            } catch (error) {
                isConfiguring = false;
                throw new SyntaxError('KyraAV requires valid JSON');
            }
            if(
                !(parsedCfg.exclusions &&
                (parsedCfg.exclusions.folders instanceof Array) &&
                (parsedCfg.exclusions.files instanceof Array) &&
                (parsedCfg.exclusions.viruses instanceof Array) &&
                (parsedCfg.exclusions.software instanceof Array) &&
                (parsedCfg.exclusions.websites instanceof Array) &&
                (parsedCfg.exclusions.camera instanceof Array))
            ) {
                isConfiguring = false;
                throw new SyntaxError(
                    "The data provided is valid JSON, but doesn't comply with the KyraAV Settings API Schema."
                );
            }
            var diff = GetChangedSettings(
                settings, parsedCfg, CompareArray
            );
            // Turn off virus shield?
            if(typeof diff.virusShield === 'boolean') {
                if(!diff.virusShield) {
                    if(await GenerateFSOverlay(
                        {
                            title: "An app is trying to turn off your Virus Shield.",
                            desc: "If you turn off Virus Shield, KyraAV won't scan files when you open them.",
                            okay: "Turn Off",
                            cancel: "Leave It On"
                        },
                        dp,
                        creEl
                    )) {
                        settings.virusShield = false;
                    } else {
                        isConfiguring = false;
                        throw new DOMException(
                            "Virus Shield cannot be disabled",
                            'SecurityError'
                        );
                    }
                } else {
                    settings.virusShield = true;
                }
            }
            // Turn off web shield shield?
            if(typeof diff.webShield === 'boolean') {
                if(!diff.webShield) {
                    if(await GenerateFSOverlay(
                        {
                            title: "An app is trying to turn off the Web Shield.",
                            desc: "If you turn off Web Shield, KyraAV won't be able to block malicious web requests.",
                            okay: "Turn Off",
                            cancel: "Leave It On"
                        },
                        dp,
                        creEl
                    )) {
                        settings.webShield = false;
                    } else {
                        isConfiguring = false;
                        throw new DOMException(
                            "Web Shield cannot be disabled",
                            'SecurityError'
                        );
                    }
                } else {
                    settings.webShield = true;
                }
            }
            // Turn off behavior shield?
            if(typeof diff.behaviorShield === 'boolean') {
                if(!diff.behaviorShield) {
                    if(await GenerateFSOverlay(
                        {
                            title: "An app is trying to turn off the Behavior Shield.",
                            desc: "If you turn off Behavior Shield, KyraAV might not be able to detect viruses as quickly.",
                            okay: "Turn Off",
                            cancel: "Leave It On"
                        },
                        dp,
                        creEl
                    )) {
                        settings.behaviorShield = false;
                    } else {
                        isConfiguring = false;
                        throw new DOMException(
                            "Behavior Shield cannot be disabled",
                            'SecurityError'
                        );
                    }
                } else {
                    settings.behaviorShield = true;
                }
            }
            // Turn off ransomware shield?
            if(typeof diff.ransomShield === 'boolean') {
                if(!diff.ransomShield) {
                    if(await GenerateFSOverlay(
                        {
                            title: "An app is trying to turn off the Ransomware Shield.",
                            desc: "If you turn off Ransomware Shield, KyraAV won't be able to protect your documents against ransomware.",
                            okay: "Turn Off",
                            cancel: "Leave It On"
                        },
                        dp,
                        creEl
                    )) {
                        settings.ransomShield = false;
                    } else {
                        isConfiguring = false;
                        throw new DOMException(
                            "Ransomware Shield cannot be disabled",
                            'SecurityError'
                        );
                    }
                } else {
                    settings.ransomShield = true;
                }
            }
            // Turn off webcam shield?
            if(typeof diff.optional.webcamShield === 'boolean') {
                if(!diff.optional.webcamShield) {
                    if(await GenerateFSOverlay(
                        {
                            title: "An app is trying to turn off the Camera Shield.",
                            desc: "If you turn it off, KyraAV won't block access to your camera or microphone - even from untrusted scripts or apps.",
                            okay: "Turn Off",
                            cancel: "Leave It On"
                        },
                        dp,
                        creEl
                    )) {
                        settings.optional.webcamShield = false;
                    } else {
                        isConfiguring = false;
                        throw new DOMException(
                            "Camera Shield cannot be disabled",
                            'SecurityError'
                        );
                    }
                } else {
                    settings.optional.webcamShield = true;
                }
            }
            var kg = 0;
            // folder exclusions
            if(
                (diff.exclusions.folders.added.length > 0)
            ) {
                for(kg = 0; kg < diff.exclusions.folders.added.length; kg++) {
                    if(diff.exclusions.folders.added[kg] && await GenerateFSOverlay(
                        {
                            title: "An app is trying to exclude a folder.",
                            desc: "KyraAV won't scan for malware inside of "+(
                                diff.exclusions.folders.added[kg]
                            ),
                            okay: "Add Exception",
                            cancel: "Don't Add"
                        },
                        dp,
                        creEl
                    )) {
                        settings.exclusions.folders.push(diff.exclusions.folders.added[kg]);
                    } else {
                        /*isConfiguring = false;
                        throw new DOMException(
                            "Failed to add exceptions",
                            'SecurityError'
                        );*/
                    }
                }
            }
            // file exclusions
            if(
                (diff.exclusions.files.added.length > 0)
            ) {
                for(kg = 0; kg < diff.exclusions.files.added.length; kg++) {
                    if(diff.exclusions.files.added[kg] && await GenerateFSOverlay(
                        {
                            title: "An app is trying to exclude a file.",
                            desc: "KyraAV won't scan "+(
                                diff.exclusions.files.added[kg]
                            ),
                            okay: "Add Exception",
                            cancel: "Don't Add"
                        },
                        dp,
                        creEl
                    )) {
                        settings.exclusions.folders.push(diff.exclusions.files.added[kg]);
                    } else {
                        /*isConfiguring = false;
                        throw new DOMException(
                            "Failed to add exceptions",
                            'SecurityError'
                        );*/
                    }
                }
            }
            // website exclusions
            if(
                (diff.exclusions.websites.added.length > 0)
            ) {
                for(kg = 0; kg < diff.exclusions.websites.added.length; kg++) {
                    if(diff.exclusions.websites.added[kg] && await GenerateFSOverlay(
                        {
                            title: "An app is trying to add websites exceptions.",
                            desc: "KyraAV won't block the URL "+(
                                diff.exclusions.websites.added[kg]
                            )+".",
                            okay: "Add Exception",
                            cancel: "Don't Add"
                        },
                        dp,
                        creEl
                    )) {
                        settings.exclusions.websites.push(diff.exclusions.websites.added[kg]);
                    } else {
                        /*isConfiguring = false;
                        throw new DOMException(
                            "Failed to add exceptions",
                            'SecurityError'
                        );*/
                    }
                }
            }
            // virus exclusions
            if(
                (diff.exclusions.viruses.added.length > 0)
            ) {
                for(kg = 0; kg < diff.exclusions.viruses.added.length; kg++) {
                    if(diff.exclusions.viruses.added[kg] && await GenerateFSOverlay(
                        {
                            title: "An app is trying to add exceptions.",
                            desc: "KyraAV won't block viruses identified as "+(
                                diff.exclusions.viruses.added[kg]
                            )+".",
                            okay: "Add Exception",
                            cancel: "Don't Add"
                        },
                        dp,
                        creEl
                    )) {
                        settings.exclusions.viruses.push(diff.exclusions.viruses.added[kg]);
                    } else {
                        /*isConfiguring = false;
                        throw new DOMException(
                            "Failed to add exceptions",
                            'SecurityError'
                        );*/
                    }
                }
            }
            // software exclusions
            if(
                (diff.exclusions.software.added.length > 0)
            ) {
                for(kg = 0; kg < diff.exclusions.software.added.length; kg++) {
                    if(diff.exclusions.software.added[kg] && await GenerateFSOverlay(
                        {
                            title: "An app is trying to add software exceptions.",
                            desc: "KyraAV will allow the app at "+(
                                diff.exclusions.software.added[kg]
                            )+" to XYZ.",
                            okay: "Add Exception",
                            cancel: "Don't Add"
                        },
                        dp,
                        creEl
                    )) {
                        settings.exclusions.software.push(diff.exclusions.software.added[kg]);
                    } else {
                        /*isConfiguring = false;
                        throw new DOMException(
                            "Failed to add exceptions",
                            'SecurityError'
                        );*/
                    }
                }
            }
            // camera exclusions
            if(
                (diff.exclusions.camera.added.length > 0)
            ) {
                for(kg = 0; kg < diff.exclusions.camera.added.length; kg++) {
                    if(diff.exclusions.camera.added[kg] && await GenerateFSOverlay(
                        {
                            title: "An app is trying to add camera exceptions.",
                            desc: "KyraAV will allow the app at "+(
                                diff.exclusions.camera.added[kg]
                            )+" to access your camera when Webcam Shield is enabled.",
                            okay: "Add Exception",
                            cancel: "Don't Add"
                        },
                        dp,
                        creEl
                    )) {
                        settings.exclusions.camera.push(diff.exclusions.camera.added[kg]);
                    } else {
                        /*isConfiguring = false;
                        throw new DOMException(
                            "Failed to add exceptions",
                            'SecurityError'
                        );*/
                    }
                }
            }
            // we're done
            isConfiguring = false;
            var exp = await writebin.call(
                w96.FS, loc, JSON.stringify(settings)
            );
            hooks.trigger('UpdSetting', {});
            return exp;
        }
        return await writebin.call(w96.FS, loc, data);
    };
    // Let's add more
    w96.FS.rm = function (path) {
        var url = FixFilePaths(path);
        var undeletable = [
            'C:/local/KyraAV',
            'C:/local/KyraAV/settings.json',
            'C:/local/KyraAV/sfx.mp3',
            'C:/local/KyraAV/web-shield.json',
            'C:/local/KyraAV/NSA.js',
            'C:/local/KyraAV/definitions.json',
            'C:/local/KyraAV/webcam-shield-test',
            'C:/local/KyraAV/kyra.js'
        ];
        if(w96.sys.rel.getVersion() >= 300000) {
            // Using Windows 96 v3 or newer
            undeletable.push("C:/system/startup/aaaaaa-KyraAV.link");
        } else {
            // Using Windows 96 v2sp2 or older
            undeletable.push("C:/system/boot/AAAKyraProtector.js")
        }
        if(undeletable.includes(url)) {
            throw new DOMException(
                "KyraAV blocked access to this file.",
                'SecurityError'
            );
        }
        return rm.call(w96.FS, path);
    };
    w96.FS.rmdir = function (path) {
        var url = FixFilePaths(path);
        var undeletable = [
            'C:/local/KyraAV',
            'C:/local/KyraAV/settings.json',
            'C:/local/KyraAV/sfx.mp3',
            'C:/local/KyraAV/web-shield.json',
            'C:/local/KyraAV/NSA.js',
            'C:/local/KyraAV/definitions.json',
            'C:/local/KyraAV/webcam-shield-test',
            'C:/local/KyraAV/kyra.js'
        ];
        if(w96.sys.rel.getVersion() >= 300000) {
            // Using Windows 96 v3 or newer
            undeletable.push("C:/system/startup/aaaaaa-KyraAV.link");
        } else {
            // Using Windows 96 v2sp2 or older
            undeletable.push("C:/system/boot/AAAKyraProtector.js")
        }
        if(undeletable.includes(url)) {
            throw new DOMException(
                "KyraAV blocked access to this file.",
                'SecurityError'
            );
        }
        return rmd.call(w96.FS, path);
    };
    w96.FS.mvfile = function (src, dest) {
        var url = FixFilePaths(src);
        var url2 = FixFilePaths(dest);
        var undeletable = [
            'C:/local/KyraAV',
            'C:/local/KyraAV/settings.json',
            'C:/local/KyraAV/sfx.mp3',
            'C:/local/KyraAV/web-shield.json',
            'C:/local/KyraAV/NSA.js',
            'C:/local/KyraAV/definitions.json',
            'C:/local/KyraAV/webcam-shield-test',
            'C:/local/KyraAV/kyra.js'
        ];
        if(w96.sys.rel.getVersion() >= 300000) {
            // Using Windows 96 v3 or newer
            undeletable.push("C:/system/startup/aaaaaa-KyraAV.link");
        } else {
            // Using Windows 96 v2sp2 or older
            undeletable.push("C:/system/boot/AAAKyraProtector.js")
        }
        if(undeletable.includes(url) || undeletable.includes(url2)) {
            throw new DOMException(
                "KyraAV blocked access to this file.",
                'SecurityError'
            );
        }
        return mv.call(w96.FS, src, dest);
    };
    w96.FS.mvdir = function (src, dest) {
        var url = FixFilePaths(src);
        var url2 = FixFilePaths(dest);
        var undeletable = [
            'C:/local/KyraAV',
            'C:/local/KyraAV/settings.json',
            'C:/local/KyraAV/sfx.mp3',
            'C:/local/KyraAV/web-shield.json',
            'C:/local/KyraAV/NSA.js',
            'C:/local/KyraAV/definitions.json',
            'C:/local/KyraAV/webcam-shield-test',
            'C:/local/KyraAV/kyra.js',
        ];
        if(w96.sys.rel.getVersion() >= 300000) {
            // Using Windows 96 v3 or newer
            undeletable.push("C:/system/startup/aaaaaa-KyraAV.link");
        } else {
            // Using Windows 96 v2sp2 or older
            undeletable.push("C:/system/boot/AAAKyraProtector.js")
        }
        if(undeletable.includes(url) || undeletable.includes(url2)) {
            throw new DOMException(
                "KyraAV blocked access to this file.",
                'SecurityError'
            );
        }
        return mvd.call(w96.FS, src, dest);
    };
    w96.FS.cpfile = function (src, path) {
        var url = FixFilePaths(path);
        var undeletable = [
            'C:/local/KyraAV',
            'C:/local/KyraAV/settings.json',
            'C:/local/KyraAV/sfx.mp3',
            'C:/local/KyraAV/web-shield.json',
            'C:/local/KyraAV/NSA.js',
            'C:/local/KyraAV/definitions.json',
            'C:/local/KyraAV/webcam-shield-test',
            'C:/local/KyraAV/kyra.js',
        ];
        if(w96.sys.rel.getVersion() >= 300000) {
            // Using Windows 96 v3 or newer
            undeletable.push("C:/system/startup/aaaaaa-KyraAV.link");
        } else {
            // Using Windows 96 v2sp2 or older
            undeletable.push("C:/system/boot/AAAKyraProtector.js")
        }
        if(undeletable.includes(url)) {
            throw new DOMException(
                "KyraAV blocked access to this file.",
                'SecurityError'
            );
        }
        return cp.call(w96.FS, src, path);
    };
    w96.FS.cpdir = function (src, path) {
        var url = FixFilePaths(path);
        var undeletable = [
            'C:/local/KyraAV',
            'C:/local/KyraAV/settings.json',
            'C:/local/KyraAV/sfx.mp3',
            'C:/local/KyraAV/web-shield.json',
            'C:/local/KyraAV/NSA.js',
            'C:/local/KyraAV/definitions.json',
            'C:/local/KyraAV/webcam-shield-test',
            'C:/local/KyraAV/kyra.js',
        ];
        if(w96.sys.rel.getVersion() >= 300000) {
            // Using Windows 96 v3 or newer
            undeletable.push("C:/system/startup/aaaaaa-KyraAV.link");
        } else {
            // Using Windows 96 v2sp2 or older
            undeletable.push("C:/system/boot/AAAKyraProtector.js")
        }
        if(undeletable.includes(url)) {
            throw new DOMException(
                "KyraAV blocked access to this file.",
                'SecurityError'
            );
        }
        return cpd.call(w96.FS, src, path);
    };
    // AV definitions
    LoadAVDefs({ FS: { readstr: function(u) { return readstr.call(wapi.FS, u); } } }).then(function (d) {
        for(var z = 0; z < d.length; z++) {
            if(d[z]) {
                defs.push(d[z]);
            }
        }
    }).catch(function (error) {
        console.warn("Failed to load virus definitions; you may have evasive malware");
    });
    LoadWBSDefs({ FS: { readstr: function(u) { return readstr.call(wapi.FS, u); } } }).then(function (d) {
        for(var z = 0; z < d.length; z++) {
            if(d[z]) {
                wbs_defs.push(d[z]);
            }
        }
    }).catch(function (error) {
        console.warn("Failed to load virus definitions; you may have evasive malware");
    });
    // These items cannot be defined via
    // Object.defineProperty.
    var protectedItems_window = [
        'w96', 'localStorage', 'sessionStorage', 'localStorageDB', 'indexedDB',
        'webkitIndexedDB', 'mozIndexedDB', 'msIndexedDB', 'document',
        'fetch', 'XMLHttpRequest', 'HTMLIFrameElement', 'Audio', 'Object'
    ];
    var protectedItems_dom = [
        'createElement'
    ];
    // Prevent unauthorized redefinitions
    dp(window.Object, 'defineProperty', {
        get: function () {
            return function (obj, prop, desc) {
                if(obj === window) {
                    if(protectedItems_window.indexOf(prop) > -1) {
                        hooks.trigger('DOMObjectRewriteAttempt', {
                            source: null,
                            target: 'Window',
                            property: prop
                        });
                        throw new DOMException("This operation has been blocked by KyraAV.", "SecurityError");
                    }
                } else if(obj === document) {
                    if(protectedItems_dom.indexOf(prop) > -1) {
                        hooks.trigger('DOMObjectRewriteAttempt', {
                            source: null,
                            target: 'Document',
                            property: prop
                        });
                        throw new DOMException("This operation has been blocked by KyraAV.", "SecurityError");
                    }
                } else if(obj === Object) {
                    if(prop === 'defineProperty' || prop === 'defineProperties') {
                        hooks.trigger('DOMObjectRewriteAttempt', {
                            source: null,
                            target: 'Object',
                            property: prop
                        });
                        throw new DOMException("This operation has been blocked by KyraAV.", "SecurityError");
                    }
                }
            };
        },
        configurable: false
    });
    dp(window.Object, 'defineProperties', {
        get: function () {
            return function (obj, properties) {
                var key = Object.keys(properties);
                for(var i = 0; i < key.length; i++) {
                    window.Object.defineProperty(
                        obj,
                        key[i],
                        properties[key[i]]
                    );
                }
            }
        },
        configurable: false
    });
    // Web Shield
    XMLHttpRequest.prototype.open = function (method, url) {
        if(!webShield) {
            return fetch(url, opt);
        }
        for(var i = 0; i < wbs_defs.length; i++) {
            if(ValidateWBSUrl(wbs_defs[i], url)
            && !(webExceptions.indexOf(i) > -1)) {
                hooks.trigger('DOMWebRequestBlocked', {
                    source: null,
                    method: 'xmlhttprequest',
                    url: url,
                    type: wbs_defs[i].type
                });
                throw new DOMException(
                    "This website was blocked by KyraAV",
                    'SecurityError'
                );
            }
        }
        xhr_open.call(this, method, url);
    };
    window.fetch = async function (url, opt) {
        if(!webShield) {
            return await fetch(url, opt);
        }
        for(var i = 0; i < wbs_defs.length; i++) {
            if(ValidateWBSUrl(wbs_defs[i], url)
            && !(webExceptions.indexOf(i) > -1)) {
                hooks.trigger('DOMWebRequestBlocked', {
                    source: null,
                    method: 'fetch',
                    url: url,
                    type: wbs_defs[i].type
                });
                throw new DOMException(
                    "This website was blocked by KyraAV",
                    'SecurityError'
                );
            }
        }
        return await fetch(url, opt);
    };
    // Web Shield in iframes
    const IframeHooks = {
        Src: Object.getOwnPropertyDescriptor(HTMLIFrameElement.prototype, 'src'),
        Sandbox: Object.getOwnPropertyDescriptor(HTMLIFrameElement.prototype, 'sandbox'),
        Allow: Object.getOwnPropertyDescriptor(HTMLIFrameElement.prototype, 'allow'),
    };
    const HookIframe = function (iframe, source) {
        var trueColors = '';
        var destroyed = false;
        var wksi = setInterval(function () {
            var k = ParsePermissions(trueColors);
            if(settings.optional.webcamShield) {
                if(
                    source && source !== 'script_untrusted'
                    && settings.exclusions.camera.includes(source)
                ) {
                    IframeHooks.Allow.set.call(iframe, trueColors);
                } else {
                    var keys = [];
                    Object.keys(k).forEach(key => {
                        // remove all camera and microphone permissions
                        if(key != 'camera' && key != 'microphone') {
                            keys.push(key)
                        }
                    });
                    // re-assembly time
                    var res = [];
                    keys.forEach(key => {
                        res.push(key);
                        k[key].forEach(data => {
                            res.push(data);
                        });
                    });
                    IframeHooks.Allow.set.call(iframe, res.join(' '));
                }
            } else {
                IframeHooks.Allow.set.call(iframe, trueColors);
            }
        }, 100);
        dp(iframe, 'hookedByKyraAV', {
            value: true,
            configurable: false
        });
        dp(iframe, 'destroyIFrame', {
            value: function () {
                IframeHooks.Src.set.call(iframe, 'about:blank');
                destroyed = true;
                clearInterval(wksi);
            }
        });
        dp(iframe, 'allow', {
            configurable: false,
            get: function () {
                return trueColors;
            },
            set: function (value) {
                trueColors = value;
            }
        });
        dp(iframe, 'src', {
            configurable: false,
            get: function () {
                if(destroyed) {
                    throw new ReferenceError("the iframe was destroyed");
                }
                return IframeHooks.Src.get.call(iframe)
            },
            set: function (src) {
                if(destroyed) {
                    throw new ReferenceError("the iframe was destroyed");
                }
                if(webShield) {
                    for(var k = 0; k < wbs_defs.length; k++) {
                        if(ValidateWBSUrl(
                            wbs_defs[k], src
                        ) && !(webExceptions.indexOf(k) > -1)) {
                            IframeHooks.Src.set.call(
                                iframe,
                                CreateWebAlertTemplate({
                                    source: source,
                                    method: 'iframe',
                                    url: src,
                                    type: wbs_defs[k].type
                                })
                            );
                            return console.warn(
                                source ? (
                                    source === 'script_untrusted' ?
                                    "An untrusted WRT script attempted to load a malicious website in an iframe, redirecting."
                                    :
                                    "The app located at "+source+" attempted to load a malicious website in an iframe, redirecting."
                                ) : "The kernel (or an elevated process) attempted to load a malicious website in an iframe, redirecting."
                            );
                        }
                    }
                };
                return IframeHooks.Src.set.call(iframe, src);
            }
        });
    };
    var UnHookedIframeArray = [];
    setInterval(function HookUnHookedIframes() {
        var UnHookedIframeArray = Array.from(document.querySelectorAll('iframe'));
        UnHookedIframeArray.forEach(frame => {
            if(!(frame.hookedByKyraAV&&frame.destroyIFrame)) {
                HookIframe(frame, 'src');
            }
        });
    }, 1000);
    document.createElement = function createElement(tag, options) {
        var k = creEl.call(document, tag, options);
        if(tag.toLowerCase() === 'iframe') {
            HookIframe(k, null);
        };
        return k;
    };
    // Optional feature: webcam shield
    if(getUserMedia) {
        navigator.mediaDevices.getUserMedia = async function(constraints) {
            if(settings.optional.webcamShield) {
                throw new DOMException(
                    "Webcam access was blocked by KyraAV",
                    'SecurityError'
                );
            };
            return await getUserMedia(constraints);
        }
    }
    // NSA
    var NSA = await readstr.call(wapi.FS, 'c:/local/KyraAV/NSA.js');
    // WRT intercept - not from file
    if(wrtObj) {
        w96.WRT.run = function (e, t) {
            if(virusShield) {
                var chk = CheckVirusesInSource(e, defs, VarBinToString);
                if(chk) {
                    hooks.trigger('DOMOpenMalwareWRT', {
                        type: chk.type,
                        id: chk.id,
                        source: 'script_untrusted'
                    });
                    throw new DOMException(
                        'This WRT program includes malware (blocked by KyraAV)',
                        'SecurityError'
                    );
                }
            };
            var env = {
                src: 'script_untrusted',
                wapi: wapi,
                eval: evalUnsafe,
                readbin,
                readstr,
                writebin,
                writestr,
                trusted: false,
                FixFilePaths,
                xhr: function () {
                    var zty = new XMLHttpRequest();
                    zty.open = function (method, url) {
                        if(!webShield) {
                            return fetch(url, opt);
                        }
                        for(var i = 0; i < wbs_defs.length; i++) {
                            if(ValidateWBSUrl(wbs_defs[i], url)
                            && !(webExceptions.indexOf(i) > -1)) {
                                hooks.trigger('DOMWebRequestBlocked', {
                                    source: 'script_untrusted',
                                    method: 'xmlhttprequest',
                                    url: url,
                                    type: wbs_defs[i].type
                                });
                                throw new DOMException(
                                    "This website was blocked by KyraAV",
                                    'SecurityError'
                                );
                            }
                        }
                        xhr_open.call(this, method, url);
                    };
                    return zty;
                },
                fetch: async function (url, opt) {
                    if(!webShield) {
                        return await fetch(url, opt);
                    }
                    for(var i = 0; i < wbs_defs.length; i++) {
                        if(ValidateWBSUrl(wbs_defs[i], url)
                        && !(webExceptions.indexOf(i) > -1)) {
                            hooks.trigger('DOMWebRequestBlocked', {
                                source: 'script_untrusted',
                                method: 'fetch',
                                url: url,
                                type: wbs_defs[i].type
                            });
                            throw new DOMException(
                                "This website was blocked by KyraAV",
                                'SecurityError'
                            );
                        }
                    }
                    return await fetch(url, opt);
                },
                fetchRaw: fetch,
                xhrRaw: xhr,
                hooks: hooks,
                define: dp,
                virusShield: function () {
                    return virusShield;
                },
                webShield: function () {
                    return webShield;
                },
                ransomShield: function () {
                    return ransomShield;
                },
                behaviorShield: function () {
                    return behaviorShield;
                },
                webcamShieldExceptions: function () {
                    return settings.exclusions.camera
                },
                getUserMedia,
                FileIsExcepted,
                element: creEl,
                ValidateWBSUrl,
                ContainsSubArray,
                defs,
                HookIframe
            };
            if(t.raw) {
                env.extra = t.raw;
                t.raw = undefined;
                delete t.raw;
            }
            return wrt.call(wapi.WRT, NSA+'\n\n'+e+'\n\n;}).call(this);', {raw: env, ...t});
        }
        // WRT intercept - from file
        w96.WRT.runFile = async function (bcd, gx) {
            let i = w96.FSUtil.getParentPath(bcd);
            if(i.length === 2) { i += "/"; }
            var e = await w96.FS.readstr(bcd);
            var t = {cwd: i, scriptDir: i, modulePath: i, envType: "normal", launchCommand: bcd, boxedEnv: null, ...gx};
            var env = {
                src: bcd,
                wapi: wapi,
                readbin,
                readstr,
                writebin,
                writestr,
                trustedApp: trustedApps.includes(e),
                fetchRaw: fetch,
                xhrRaw: xhr,
                FixFilePaths,
                xhr: function () {
                    var zty = new XMLHttpRequest();
                    zty.open = function (method, url) {
                        if(!webShield) {
                            return fetch(url, opt);
                        }
                        for(var i = 0; i < wbs_defs.length; i++) {
                            if(ValidateWBSUrl(wbs_defs[i], url)
                            && !(webExceptions.indexOf(i) > -1)) {
                                hooks.trigger('DOMWebRequestBlocked', {
                                    source: bcd,
                                    method: 'xmlhttprequest',
                                    url: url,
                                    type: wbs_defs[i].type
                                });
                                throw new DOMException(
                                    "This website was blocked by KyraAV",
                                    'SecurityError'
                                );
                            }
                        }
                        xhr_open.call(this, method, url);
                    };
                    return zty;
                },
                fetch: async function (url, opt) {
                    if(!webShield) {
                        return await fetch(url, opt);
                    }
                    for(var i = 0; i < wbs_defs.length; i++) {
                        if(ValidateWBSUrl(wbs_defs[i], url)
                        && !(webExceptions.indexOf(i) > -1)) {
                            hooks.trigger('DOMWebRequestBlocked', {
                                source: bcd,
                                method: 'fetch',
                                url: url,
                                type: wbs_defs[i].type
                            });
                            throw new DOMException(
                                "This website was blocked by KyraAV",
                                'SecurityError'
                            );
                        }
                    }
                    return await fetch(url, opt);
                },
                hooks: hooks,
                define: dp,
                virusShield: function () {
                    return virusShield;
                },
                webShield: function () {
                    return webShield;
                },
                ransomShield: function () {
                    return ransomShield;
                },
                behaviorShield: function () {
                    return behaviorShield;
                },
                webcamShield: function () {
                    return settings.optional.webcamShield;
                },
                webcamShieldExceptions: function () {
                    return settings.exclusions.camera
                },
                getUserMedia,
                FileIsExcepted,
                element: creEl,
                ValidateWBSUrl,
                ContainsSubArray,
                defs,
                HookIframe
            };
            if(t.raw) {
                env.extra = t.raw;
                t.raw = undefined;
                delete t.raw;
            }
            return wrt.call(wapi.WRT, NSA+'\n\n'+e+'\n\n;}).call(this);', {raw: env, ...t});
        }
    }
})(
    function () {
        var hooks = {};
        return {
            addHook: function (id, func) {
                if(!hooks[id]) {
                    hooks[id] = [];
                }
                hooks[id].push(func);
            },
            trigger: function (id, args) {
                if(hooks[id]) {
                    for(var k = 0; k < hooks[id].length; k++) {
                        try {
                            hooks[id][k](args);
                        } catch (error) {
                            void(error);
                        }
                    }
                }
            }
        };
    },
    async function LoadAVDefs(wapi) {
        var k = await wapi.FS.readstr("C:/local/KyraAV/definitions.json");
        var d = JSON.parse(k);
        var o = [];
        if(!(d instanceof Array)) {
            throw new TypeError("wahhhhhh your "+(typeof d)+" makes me cryyyy");
        };
        var z;
        for(var g = 0; g < d.length; g++) {
            o.push({
                src: d[g].src,
                id: d[g].id,
                grp: d[g].grp === 'sample' ? 'sample' : 'known',
                type: d[g].type
            });
        };
        return o;
    },
    async function LoadWBSDefs(wapi) {
        var k = await wapi.FS.readstr("C:/local/KyraAV/web-shield.json");
        var d = JSON.parse(k);
        var o = [];
        if(!(d instanceof Array)) {
            // We have a funny bone lol
            throw new TypeError("wahhhhhh your "+(typeof d)+" makes me cryyyy");
        };
        for(var g = 0; g < d.length; g++) {
            o.push({
                url: d[g].url,
                domain: d[g].domain,
                type: d[g].type
            });
        };
        return o;
    },
    function ValidateWBSUrl(data, url) {
        // it doesn't matter if this errors;
        // it just crashes whoever tries to use it wrong (not us)
        var k = new URL(url, 'https://'+location.hostname);
        if(data.domain) {
            if(k.hostname === data.domain) {
                return true
            }
            return false
        } else {
            if(!data.url) {
                return false;
            }
            if(data.url.indexOf("*://") === 0) {
                var z = new URL('https'+data.url.slice(1));
                if(z.pathname === k.pathname && z.hostname === k.hostname) {
                    return true;
                }
                return false;
            } else {
                var z = new URL(data.url);
                if(z.pathname === k.pathname && z.hostname === k.hostname) {
                    return true;
                }
                return false;
            }
        }
    },
    function (details) {
        var a = new Audio(details.sound);
        setTimeout(function () {
            var sw = new w96.StandardWindow({
                resizable: false,
                center: true,
                maximizable: false,
                minimizable: false,
                taskbar: true,
                show: true,
                title: details.title,
                initialWidth: 567,
                initialHeight: 345
            });
            sw.toggleMaximize = function () {};
            sw.toggleMinimize = function () {};
            var root = sw.wndObject;
            root.style.fontFamily = 'Arial,sans-serif';
            root.style.border = 'none';
            root.style.overflow = 'hidden';
            root.style.borderRadius = '20px';
            var tbi = root.querySelector('.titlebar');
            tbi.style.display = 'none';
            var body = root.querySelector('.window-html-content');
            body.classList.remove('nodrag');
            body.style.backgroundColor = '#5a36bf';
            body.style.color = 'white';
            body.style.display = 'flex';
            body.style.flexDirection = 'column';
            body.style.justifyContent = 'center';
            body.style.textAlign = 'center';
            body.style.color = 'white';
            body.style.borderRadius = '20px';
            var ip = document.createElement('p');
            var img = document.createElement('img');
            img.src = details.icon;
            img.style.width = img.style.height = '100px';
            ip.appendChild(img);
            ip.style.margin = '4px';
            body.appendChild(ip);
            var header = document.createElement('p');
            header.style.fontSize = '32px';
            header.style.margin = '4px';
            header.innerText = details.title || "Alert";
            body.appendChild(header);
            var desc = document.createElement('p');
            desc.style.fontSize = '22px';
            desc.style.margin = '4px';
            desc.innerText = details.desc || "This is a test alert.";
            body.appendChild(desc);
            // okay button
            var okp = document.createElement('p');
            okp.style.margin = '4px';
            var ok = document.createElement('div');
            ok.style.display = 'inline-block';
            ok.style.fontSize = '19px';
            ok.style.padding = '4.5px 17px';
            ok.style.borderRadius = '16px';
            ok.style.border = '3px solid white';
            ok.style.backgroundColor = '#32a868';
            ok.innerText = details.okay || "Okay";
            ok.onclick = function () {
                sw.close();
            };
            okp.appendChild(ok);
            body.appendChild(okp);
            // more details button
            var mdb = document.createElement('p');
            mdb.style.fontSize = '14px';
            mdb.style.margin = '4px';
            mdb.innerText = "Show details";
            body.appendChild(mdb);
            var DS = false;
            // We'll add details
            var div = document.createElement('div');
            div.style.display = 'none';
            div.appendChild(document.createElement('hr'));
            details.technical.forEach(detail => {
                var k = document.createElement('p');
                k.style.fontSize = '17px';
                k.style.margin = '4px';
                var b = document.createElement('b');
                b.innerText = detail.title + ":";
                var span = document.createElement('span');
                span.innerText = detail.value;
                k.appendChild(b);
                k.appendChild(span);
                div.appendChild(k);
            });
            body.appendChild(div);
            mdb.onclick = function () {
                DS = !DS;
                if(DS) {
                    mdb.innerText = "Hide details";
                    div.style.display = '';
                    sw.setSize(567, 345+((27)*details.technical.length));
                } else {
                    mdb.innerText = "Show details";
                    div.style.display = 'none';
                    sw.setSize(567, 345);
                }
            };
            sw.show();
            a.play();
        }, 320);
    },
    function ContainsSubArray(buffer, pattern) {
        // thanks chatgpt
        for (let i = 0; i <= buffer.length - pattern.length; i++) {
            let match = true;
            for (let j = 0; j < pattern.length; j++) {
                if (buffer[i + j] !== pattern[j]) {
                    match = false;
                    break;
                }
            }
            if (match) return true;
        }
        return false;
    },
    async function GetApps(wapi) {
        var i = w96.FSUtil.deconstructFullPath('c:/system/etc/apps.json');
        var k = await wapi.FS._invokeFsFunc(i.path, i.prefix, "readstr", i.path);
        return JSON.parse(k);
    },
    function TestForApp (appList, url) {
        for(var i = 0; i < appList.length; i++) {
            if(appList[i]) {
                if(appList[i].name) {
                    if(
                        url === "C:/system/local/bin/"+appList[i].exec
                    ) {
                        return appList[i].name
                    }
                }
            }
        }
    },
    async function GetSettings() {
        try {
            var k = await w96.FS.readstr('c:/local/KyraAV/settings.json');
            var g = JSON.parse(k);
            if(!g.optional) { g.optional = {
                webcamShield: false
            }; };
            if(
                g.exclusions &&
                (g.exclusions.folders instanceof Array) &&
                (g.exclusions.files instanceof Array) &&
                (g.exclusions.viruses instanceof Array) &&
                (g.exclusions.software instanceof Array) &&
                (g.exclusions.websites instanceof Array) &&
                (g.exclusions.camera instanceof Array)
            ) {
                var gex = g.exclusions;
            } else {
                var gex = {
                    folders: [],
                    files: [],
                    viruses: [],
                    software: [],
                    websites: [],
                    camera: []
                };
            }
            return {
                webShield: g.webShield === false ? false : true,
                virusShield: g.virusShield === false ? false : true,
                behaviorShield: g.behaviorShield === false ? false : true,
                ransomShield: g.ransomShield === false ? false : true,
                exclusions: gex,
                optional: {
                    webcamShield: g.optional.webcamShield ? true : false,
                    sandboxAllIframes: g.optional.sandboxAllIframes ? true : false
                },
            }
        } catch (error) {
            w96.FS.writestr('c:/local/KyraAV/settings.json', JSON.stringify(
                {
                    webShield: true,
                    virusShield: true,
                    behaviorShield: true,
                    ransomShield: true,
                    exclusions: {
                        folders: [],
                        files: [],
                        viruses: [],
                        software: [],
                        websites: [],
                        camera: []
                    },
                    optional: {
                        webcamShield: false,
                        sandboxAllIframes: false
                    }
                }
            )).catch(_ => console.warn(_));
            return {
                webShield: true,
                virusShield: true,
                behaviorShield: true,
                ransomShield: true,
                exclusions: {
                    folders: [],
                    files: [],
                    viruses: [],
                    software: [],
                    websites: [],
                    camera: []
                },
                optional: {
                    webcamShield: false,
                    sandboxAllIframes: false
                }
            };
        }
    },
    function VarBinToString(uint8) {
        var g = "";
        for(var z = 0; z < uint8.length; z++) {
            g += String.fromCharCode(uint8[z]);
        }
        return g;
    },
    function CheckVirusesInSource(source, defs, VarBinToString) {
        for(var i = 0; i < defs.length; i++) {
            if(
                defs[i] &&
                source === VarBinToString(defs[i].src)
            ) {
                return defs[i]
            } else if(
                defs[i] &&
                source.includes(VarBinToString(defs[i].src))
                && defs[i].grp === 'sample'
            ) {
                return defs[i]
            }
        }
    },
    function GetChangedSettings(oldSettings, newSettings, compareArray) {
        var result = {};
        if(oldSettings.webShield !== newSettings.webShield) {
            result.webShield = newSettings.webShield
        }
        if(oldSettings.virusShield !== newSettings.virusShield) {
            result.virusShield = newSettings.virusShield
        }
        if(oldSettings.behaviorShield !== newSettings.behaviorShield) {
            result.behaviorShield = newSettings.behaviorShield
        }
        if(oldSettings.ransomShield !== newSettings.ransomShield) {
            result.ransomShield = newSettings.ransomShield
        }
        result.exclusions = {
            folders: compareArray(
                oldSettings.exclusions.folders,
                newSettings.exclusions.folders
            ),
            files: compareArray(
                oldSettings.exclusions.files,
                newSettings.exclusions.files
            ),
            viruses: compareArray(
                oldSettings.exclusions.viruses,
                newSettings.exclusions.viruses
            ),
            software: compareArray(
                oldSettings.exclusions.software,
                newSettings.exclusions.software
            ),
            websites: compareArray(
                oldSettings.exclusions.websites,
                newSettings.exclusions.websites
            ),
            camera: compareArray(
                oldSettings.exclusions.camera,
                newSettings.exclusions.camera
            )
        };
        result.optional = {};
        if(oldSettings.optional.webcamShield !== newSettings.optional.webcamShield) {
            result.optional.webcamShield = Boolean(newSettings.optional.webcamShield);
        }
        if(oldSettings.optional.sandboxAllIframes !== newSettings.optional.sandboxAllIframes) {
            result.optional.sandboxAllIframes = Boolean(newSettings.optional.sandboxAllIframes);
        }
        return result;
    },
    function CompareArray(oldArray, newArray) {
        var addedItems = [];
        var removedItems = [];
        for(var i = 0; i < oldArray.length; i++) {
            if(!newArray.includes(oldArray[i])) {
                removedItems.push(oldArray[i])
            }
        }
        for(var g = 0; g < newArray.length; g++) {
            if(!oldArray.includes(newArray[g])) {
                addedItems.push(newArray[g])
            }
        }
        return {
            added: addedItems,
            removed: removedItems
        }
    },
    function GenerateFSOverlay(options, dp, crEl) {
        return new Promise(async function (resolve) {
            var iframe = crEl.call(document,'iframe');
            //iframe.src = 'about:blank';
            iframe.style.border = 'none';
            iframe.style.outline = 'none';
            iframe.style.pointerEvents = 'all';
            iframe.style.zIndex = "99999999999999999";
            iframe.style.position = 'fixed';
            iframe.style.top = '0px';
            iframe.style.left = '0px';
            iframe.style.height = '100vh';
            iframe.style.width = '100vw';
            dp(iframe, 'hookedByKyraAV', {
                value: true
            });
            dp(iframe, 'destroyIFrame', {
                value: function () {}
            });
            document.body.appendChild(iframe);
            setTimeout(function () {
                var win = iframe.contentWindow;
                var dom = iframe.contentDocument;
                dp(iframe, 'contentWindow', {
                    value: null,
                    configurable: false
                });
                dp(iframe, 'contentDocument', {
                    value: null,
                    configurable: false
                });
                dp(iframe, 'src', {
                    value: null,
                    configurable: false
                });
                // introduce UI
                var body = dom.createElement('div');
                body.style.position = 'fixed';
                body.style.fontFamily = 'Arial, Helvetica, sans-serif';
                body.style.cursor = 'url(https://windows96.net/system/resource/cursors/default.png),default';
                body.style.width = '100vw';
                body.style.height = '100vh';
                body.style.top = '0px';
                body.style.left = '0px';
                body.style.backgroundColor = '#0000007f';
                body.style.backdropFilter = 'grayscale(1) blur(4px)';
                // now we add the confirmation popup
                body.innerHTML = `<div style="top: calc((100vh - 294px) / 2); left: calc((100vw - 560px) / 2);"></div>`;
                var div = body.querySelector('div');
                div.style.width = '560px';
                div.style.height = '294px';
                div.style.position = 'absolute';
                div.style.borderRadius = '21px';
                div.style.backgroundColor = '#5a36bf';
                div.style.color = 'white';
                div.style.textAlign = 'center';
                div.style.display = 'flex';
                div.style.flexDirection = 'column';
                div.style.justifyContent = 'center';
                // let's add the title
                var header = document.createElement('p');
                header.style.fontSize = '32px';
                header.style.margin = '4px';
                header.innerText = options.title || "Alert";
                div.appendChild(header);
                var desc = document.createElement('p');
                desc.style.fontSize = '22px';
                desc.style.margin = '4px';
                desc.innerText = options.desc || "This is a test alert.";
                div.appendChild(desc);
                // Button holders
                var okp = document.createElement('div');
                okp.style.margin = '4px';
                okp.style.display = 'flex';
                okp.style.flexDirection = 'row';
                okp.style.justifyContent = 'space-evenly';
                // OK button
                var ok = document.createElement('div');
                ok.style.display = 'inline-block';
                ok.style.fontSize = '19px';
                ok.style.padding = '4.5px 17px';
                ok.style.borderRadius = '16px';
                ok.style.border = '3px solid white';
                ok.style.backgroundColor = '#32a868';
                ok.innerText = options.okay || "Okay";
                ok.onclick = function () {
                    win.location.reload();
                    iframe.parentNode.removeChild(iframe);
                    resolve(true);
                };
                // Cancel button
                var cancel = document.createElement('div');
                cancel.style.display = 'block';
                cancel.style.fontSize = '19px';
                cancel.style.padding = '4.5px 17px';
                cancel.style.borderRadius = '16px';
                cancel.style.border = '3px solid white';
                cancel.style.backgroundColor = 'transparent';
                cancel.innerText = options.cancel || "Cancel";
                cancel.onclick = function () {
                    win.location.reload();
                    iframe.parentNode.removeChild(iframe);
                    resolve(false);
                };
                okp.appendChild(ok);
                okp.appendChild(cancel);
                div.appendChild(okp);
                dom.body.appendChild(body);
            },321);
        });
    },
    async function StartUpdateProcess({
        writebin, 
    }) {
        // get updates
        var data = await fetch('https://raw.githubusercontent.com/themirrazz/kyra-av/refs/heads/main/upd-skr/latest/package.txt?nocache=4fyjdbjfenjk8x8kq', {mode: 'cors'});
        var zing = await data.text();
        var bin = JSON.parse(zing);
        for(var i = 0; i < bin.length; i++) {
            await writebin.call(FS, bin[i].name, bin[i].data);
        }
        alert(
            "A restart is required. You can choose to restart later, but lots of features on<br/>your system won't work until you restart your device. Your current version of KyraAV will continue protecting you until you reboot.",
            {
                title: 'KyraAV: Update Complete'
            }
        );
    },
    function ParsePermissions(string) {
        var permissions = {};
        var currentPermission = null;
        var x = string.split(" ");
        var specialOrigins = [
            "'self'",
            "'self';",
            "'src'",
            "'src';",
            "*",
            "*;",
            "()",
            "();"
        ];
        for(var i = 0; i < x.length; i++) {
            try {
                // main origins
                new URL((x[i]).replaceAll('*','wildcard').replaceAll(';',''));
                if(currentPermission) {
                    if(!permissions[currentPermission]) {
                        permissions[currentPermission] = [];
                    }
                    permissions[currentPermission].push(x[i]);
                }
            } catch (error) {
                if(specialOrigins.includes(x[i])) {
                    if(currentPermission) {
                        if(!permissions[currentPermission]) {
                            permissions[currentPermission] = [];
                        }
                        permissions[currentPermission].push(x[i]);
                    }
                } else {
                    currentPermission = x[i];
                    if(currentPermission.endsWith(';')) {
                        currentPermission = currentPermission.slice(0,-1);
                    }
                }
            }
        }
        return permissions;
    },
    function CreateWebAlertTemplate({
        source, method, url, type
    }) {
        var descriptions = {
            phishing_wbs: "This website might try to trick you into giving out sensitive information.",
            malware_wbs: "This website might try to hack you or trick you into downloading a virus.",
            adware_wbs: "This website might show you inappropriate or malicious ads.",
            OTHER: "This website has been marked as deceptive. Visiting it could harm your computer."
        };
        if(!descriptions[type]) {
            var theDesc = 'OTHER';
        } else {
            var theDesc = type;
        };
        var html = `<!DOCTYPE html>
<html>
    <head>
        <title>Warning: Dangerous Site</title>
        <style>
            html {
                background-color: #7b0000;
                font-family: Arial, Helvetica, sans-serif;
                color: white;
                width: 100%;
                height: 100%;
                padding: 0px;
                margin: 0px;
                overflow-y: auto;
                overflow-x: hidden;
                display: flex;
                flex-direction: column;
                justify-content: center;
                cursor: url("/system/resource/cursors/default.png"),default;
            }
            
            body {
                width: 100%;
                height: fit-content;
                display: flex;
                flex-direction: row;
                justify-content: center;
            }
            .app {
                max-width: 80%;
                width: fit-content;
                height: fit-content;
            }
            .description {
                margin: 4px;
                font-size: 17px;
            }
            a {
                cursor: url("/system/resource/cursors/pointer.png"),pointer;
                text-decoration: underline;
                color: white;
            }
            .protectiveFrame {
                position: fixed;
                width: 100vw;
                height: 100vh;
                top: 0px;
                left: 0px;
            }
            .pf-banner {
                width: calc(100% - 18px);
                padding: 6px;
                height: 18px;
                font-size: 16px;
                display: flex;
                flex-direction: row;
                border-radius: 16px;
                border: 3px solid #910707;
                color: black;
            }
            .pf-banner-label {
                margin: 0px;
                padding: 0px;
            }
            iframe {
                border: none;
                outline: none;
                width: 100%;
                height: calc(100% - 36px);
            }
        </style>
    </head>
    <body>
        <div style='display:none' class='protectiveFrame'>
            <div class='pf-banner'>
                <svg style="height: 16px; width: 16px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="red"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24l0 112c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-112c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>
                <div style='width: 5px'></div>
                <p class='pf-banner-label'>Warning text here.</p>
            </div>
            <iframe></iframe>
        </div>
        <div class='app'>
            <svg style="height: 64px; width: 64px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="white"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24l0 112c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-112c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>
            <p
                style="font-weight: bold; font-size: 48px; margin: 4px; "
            >
            Heads up! This website is dangerous!
            </p>
            <p class='description'>
                ${descriptions[theDesc]}
                <br/>
                <br/>
                URL: ${url.replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll("&","&amp;")} <br/>
                Source: ${(source ? (
                    source === 'script_untrsuted' ? "WRT Runtime" : source
                ) : "Kernel Access").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll("&","&amp;")}
                <br/>
                <br/>
                You can <a>click here</a> if you still want to proceed.
                <br/>
                <br/>
                You're being protected by KyraAV
            </p>
        </div>
        <script>
            var url = ${JSON.stringify(url)};
            var type = '${type}';
            var sandBox = type === 'OTHER' || type === 'malware_wbs';
            var a = document.querySelector('a');
            var iframe = document.querySelector('iframe');
            var label = document.querySelector('.pf-banner-label');
            a.onclick = function () {
                if(sandBox) {
                    iframe.referrerPolicy = "no-referrer";
                    iframe.sandbox = "allow-forms";
                } else {
                    iframe.allowFullscreen = true;
                    iframe.allow = 'geolocation camera microphone';
                }
                switch (type) {
                    case 'malware_wbs':
                    case 'OTHER':
                    default:
                        label.innerText = "We've disabled JavaScript on this website.";
                        break
                    case 'adware_wbs':
                        label.innerText = "This website might show inappropriate ads.";
                        break;
                    case 'phishing_wbs':
                        label.innerText = "Don't enter any sensitive information on this site.";
                        break;
                }
                document.documentElement.style.backgroundColor = 'transparent';
                document.querySelector('.app').style.display = 'none';
                document.querySelector('.protectiveFrame').style.display = '';
                iframe.src = url;
            };
        </script>
    </body>
</html>`;
        var blob = new Blob([html],{
            type: "text/html"
        });
        return URL.createObjectURL(blob);
    },
    function FixFilePaths(path) {
        var k = path[0].toUpperCase() + path.slice(1);
        let t = k.replace(/(^\/)|(\/$)/gi,"");
        t = t.replace(/(\/){2,}/gi,"/");
        return t;
    },
    async function ToURL(path) {
        var blob = await w96.FS.toBlob(path);
        return URL.createObjectURL(blob);
    }
);