//!wrt $BSPEC:{"frn": "KyraAV Dashboard","ver":1.0,"dsc":"Dashboard for controlling KyraAV."}
if(typeof RawAccess === 'undefined') {
    var RawAccess;
}

if(RawAccess === window.RawAccess) {
    var RawAccess;
}

class KyraAVApp extends WApplication {
    constructor() {
        super();
    }

    taskName = "KyraAV Dashboard";

    async main (argv) {
        super.main(argv);
        var wnd = this.appWindow = this.createWindow({
            title: "KyraAV",
            taskbar: true,
            body: `<div style="width: 100%;height:100%;background-color:#5a36bf;display:flex;flex-direction:column;">
                <div style="width:100%;height:28px;display:flex;flex-direction:row-reverse;background-color:#3d1b9e;">
                    <div id="kyra-av-close-button">
                        <svg style="width: 26px; height: 26px" fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
                    </div>
                    <div id="kyra-av-minimize-button">
                        <svg style="width: 26px; height: 26px" fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/></svg>
                    </div>
                </div>
                <div style="color: white;width:100%;height:calc(100% - 28px); display: flex;flex-direction:row;">
                    <div id='kyra-av-sidebar' class='nodrag' style="width: 128px; padding: 4px; height: calc(100% - 8px); display: flex; flex-direction: column;background-color:#3d1b9e;">
                        <div id='kyra-av-status-button' style='width:100%;display: flex;flex-direction:column;border-radius: 14px;background-color:#0000007f;justify-content:space-evenly;height:86px;'>
                            <p style="margin: 0px;font-size:12px;text-align:center;padding:0px;">
                                <svg fill="white" style="width: 32px; height: 32px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M256 0c4.6 0 9.2 1 13.4 2.9L457.7 82.8c22 9.3 38.4 31 38.3 57.2c-.5 99.2-41.3 280.7-213.6 363.2c-16.7 8-36.1 8-52.8 0C57.3 420.7 16.5 239.2 16 140c-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.8 1 251.4 0 256 0zm0 66.8l0 378.1C394 378 431.1 230.1 432 141.4L256 66.8s0 0 0 0z"/></svg>
                            </p>
                            <p style="margin: 0px;font-size:16px;text-align:center;padding:0px;">Status</p>
                        </div>
                        <div id='kyra-av-core-button' style='width:100%;display: flex;flex-direction:column;border-radius: 14px;background-color:transparent;justify-content:space-evenly;height:86px;'>
                            <p style="margin: 0px;font-size:12px;text-align:center;padding:0px;">
                                <svg fill="white" style="width: 32px; height: 32px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M256 398.8c-11.8 5.1-23.4 9.7-34.9 13.5c16.7 33.8 31 35.7 34.9 35.7s18.1-1.9 34.9-35.7c-11.4-3.9-23.1-8.4-34.9-13.5zM446 256c33 45.2 44.3 90.9 23.6 128c-20.2 36.3-62.5 49.3-115.2 43.2c-22 52.1-55.6 84.8-98.4 84.8s-76.4-32.7-98.4-84.8c-52.7 6.1-95-6.8-115.2-43.2C21.7 346.9 33 301.2 66 256c-33-45.2-44.3-90.9-23.6-128c20.2-36.3 62.5-49.3 115.2-43.2C179.6 32.7 213.2 0 256 0s76.4 32.7 98.4 84.8c52.7-6.1 95 6.8 115.2 43.2c20.7 37.1 9.4 82.8-23.6 128zm-65.8 67.4c-1.7 14.2-3.9 28-6.7 41.2c31.8 1.4 38.6-8.7 40.2-11.7c2.3-4.2 7-17.9-11.9-48.1c-6.8 6.3-14 12.5-21.6 18.6zm-6.7-175.9c2.8 13.1 5 26.9 6.7 41.2c7.6 6.1 14.8 12.3 21.6 18.6c18.9-30.2 14.2-44 11.9-48.1c-1.6-2.9-8.4-13-40.2-11.7zM290.9 99.7C274.1 65.9 259.9 64 256 64s-18.1 1.9-34.9 35.7c11.4 3.9 23.1 8.4 34.9 13.5c11.8-5.1 23.4-9.7 34.9-13.5zm-159 88.9c1.7-14.3 3.9-28 6.7-41.2c-31.8-1.4-38.6 8.7-40.2 11.7c-2.3 4.2-7 17.9 11.9 48.1c6.8-6.3 14-12.5 21.6-18.6zM110.2 304.8C91.4 335 96 348.7 98.3 352.9c1.6 2.9 8.4 13 40.2 11.7c-2.8-13.1-5-26.9-6.7-41.2c-7.6-6.1-14.8-12.3-21.6-18.6zM336 256a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zm-80-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>
                            </p>
                            <p style="margin: 0px;font-size:16px;text-align:center;padding:0px;">Core</p>
                        </div>
                        <div id='kyra-av-extras-button' style='width:100%;display: flex;flex-direction:column;border-radius: 14px;background-color:transparent;justify-content:space-evenly;height:86px;'>
                            <p style="margin: 0px;font-size:12px;text-align:center;padding:0px;">
                                <svg fill="white" style="width: 32px; height: 32px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M349.4 44.6c5.9-13.7 1.5-29.7-10.6-38.5s-28.6-8-39.9 1.8l-256 224c-10 8.8-13.6 22.9-8.9 35.3S50.7 288 64 288l111.5 0L98.6 467.4c-5.9 13.7-1.5 29.7 10.6 38.5s28.6 8 39.9-1.8l256-224c10-8.8 13.6-22.9 8.9-35.3s-16.6-20.7-30-20.7l-111.5 0L349.4 44.6z"/></svg>
                            </p>
                            <p style="margin: 0px;font-size:16px;text-align:center;padding:0px;">Extras</p>
                        </div>
                    </div>
                    <div id='kyra-av-app' style="height: 100%; width: calc(100% - 136px);">
                        <div id='kyra-av-status-tab' style="width: 100%; height: 100%; overflow: auto;">
                            <div id='kyra-av-status-okay' style="width: 100%; height: 100%; display: none; flex-direction: column; justify-content: center;">
                                <p style="margin: 0px;font-size:32px;text-align:center;padding:0px;">
                                    <svg fill="#27c486" style="height: 140px; width: 140px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M256 0c4.6 0 9.2 1 13.4 2.9L457.7 82.8c22 9.3 38.4 31 38.3 57.2c-.5 99.2-41.3 280.7-213.6 363.2c-16.7 8-36.1 8-52.8 0C57.3 420.7 16.5 239.2 16 140c-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.8 1 251.4 0 256 0zm0 66.8l0 378.1C394 378 431.1 230.1 432 141.4L256 66.8s0 0 0 0z"/></svg>
                                </p>
                                <p style="margin: 0px;font-size:32px;text-align:center;padding:0px;">
                                    Okay!
                                </p>
                            </div>
                            <div id='kyra-av-status-fail' style="width: 100%; height: 100%; display: none; flex-direction: column; justify-content: center;">
                                <p style="margin: 0px;font-size:32px;text-align:center;padding:0px;">
                                    <svg fill="#d44449" style="height: 140px; width: 140px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24l0 112c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-112c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>
                                </p>
                                <p style="margin: 0px;font-size:32px;text-align:center;padding:0px;">
                                    We can't connect to the KyraAV service.
                                </p>
                            </div>
                            <div id='kyra-av-status-off' style="width: 100%; height: 100%; display: none; flex-direction: column; justify-content: center;">
                                <p style="margin: 0px;font-size:32px;text-align:center;padding:0px;">
                                    <svg fill="#d44449" style="height: 140px; width: 140px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M459.1 52.4L442.6 6.5C440.7 2.6 436.5 0 432.1 0s-8.5 2.6-10.4 6.5L405.2 52.4l-46 16.8c-4.3 1.6-7.3 5.9-7.2 10.4c0 4.5 3 8.7 7.2 10.2l45.7 16.8 16.8 45.8c1.5 4.4 5.8 7.5 10.4 7.5s8.9-3.1 10.4-7.5l16.5-45.8 45.7-16.8c4.2-1.5 7.2-5.7 7.2-10.2c0-4.6-3-8.9-7.2-10.4L459.1 52.4zm-132.4 53c-12.5-12.5-32.8-12.5-45.3 0l-2.9 2.9C256.5 100.3 232.7 96 208 96C93.1 96 0 189.1 0 304S93.1 512 208 512s208-93.1 208-208c0-24.7-4.3-48.5-12.2-70.5l2.9-2.9c12.5-12.5 12.5-32.8 0-45.3l-80-80zM200 192c-57.4 0-104 46.6-104 104l0 8c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-8c0-75.1 60.9-136 136-136l8 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-8 0z"/></svg>
                                </p>
                                <p style="margin: 0px;font-size:32px;text-align:center;padding:0px;">
                                    You're not being fully protected
                                </p>
                            </div>
                        </div>
                        <div id='kyra-av-core-tab' class='nodrag' style="width: 100%; height: 100%; overflow: auto;display:none;">
                            <h1> experimental core </h1>
                            <p style='font-size:24px'>
                                Virus shield
                                <button onclick="if(!event.isTrusted) {return;};w96.FS.readstr('C:/local/KyraAV/settings.json').then(d=>{var x = JSON.parse(d);x.virusShield=!x.virusShield;this.innerText=x.virusShield?'off':'on';w96.FS.writestr('C:/local/KyraAV/settings.json',JSON.stringify(x))})">toggle</button
                            </p>
                        </div>
                        <div id='kyra-av-extras-tab' class='nodrag' style="width: 100%; height: 100%; overflow: auto;display:none;">
                            extras
                        </div>
                    </div>
                </div>
            </div>`,
            initialHeight: 460,
            initialWidth: 800,
            resizable: true,
            center: true
        });
        wnd.show();
        wnd.wndObject.querySelector('.titlebar').remove();
        wnd.wndObject.querySelector('.window-html-content').classList.remove('nodrag');
        wnd.wndObject.querySelector('#kyra-av-close-button').onclick = function () {
            wnd.close();
        };
        wnd.wndObject.querySelector('#kyra-av-minimize-button').onclick = function () {
            wnd.toggleMinimize();
        };
        // tab buttons
        var btnStatus = wnd.wndObject.querySelector('#kyra-av-status-button');
        var btnCore = wnd.wndObject.querySelector('#kyra-av-core-button');
        var btnExtras = wnd.wndObject.querySelector('#kyra-av-extras-button');
        // tabs
        var tabStatus = wnd.wndObject.querySelector('#kyra-av-status-tab');
        var tabCore = wnd.wndObject.querySelector('#kyra-av-core-tab');
        var tabExtras = wnd.wndObject.querySelector('#kyra-av-extras-tab');
        // status
        var statusOk = tabStatus.querySelector('#kyra-av-status-okay');
        var statusOff = tabStatus.querySelector('#kyra-av-status-off');
        var statusFail = tabStatus.querySelector('#kyra-av-status-fail');
        if(!RawAccess) {
            statusOk.style.display = 'none';
            statusOff.style.display = 'none';
            statusFail.style.display = 'flex';
        } else if(!(RawAccess.virusShield() && RawAccess.webShield())) {
            statusOk.style.display = 'none';
            statusOff.style.display = 'flex';
            statusFail.style.display = 'none';
        } else {
            statusOk.style.display = 'flex';
            statusOff.style.display = 'none';
            statusFail.style.display = 'none';
        }
        // onclick handlers
        btnStatus.onclick = function () {
            btnStatus.style.backgroundColor = '#0000007f';
            btnCore.style.backgroundColor = 'transparent';
            btnExtras.style.backgroundColor = 'transparent';
            tabStatus.style.display = '';
            tabCore.style.display = 'none';
            tabExtras.style.display = 'none';
            if(!RawAccess) {
                statusOk.style.display = 'none';
                statusOff.style.display = 'none';
                statusFail.style.display = 'flex';
            } else if(!(RawAccess.virusShield() && RawAccess.webShield())) {
                statusOk.style.display = 'none';
                statusOff.style.display = 'flex';
                statusFail.style.display = 'none';
            } else {
                statusOk.style.display = 'flex';
                statusOff.style.display = 'none';
                statusFail.style.display = 'none';
            }
        };
        btnCore.onclick = function () {
            btnStatus.style.backgroundColor = 'transparent';
            btnCore.style.backgroundColor = '#0000007f';
            btnExtras.style.backgroundColor = 'transparent';
            tabStatus.style.display = 'none';
            tabCore.style.display = '';
            tabExtras.style.display = 'none';
        };
        btnExtras.onclick = function () {
            btnStatus.style.backgroundColor = 'transparent';
            btnCore.style.backgroundColor = 'transparent';
            btnExtras.style.backgroundColor = '#0000007f';
            tabStatus.style.display = 'none';
            tabCore.style.display = 'none';
            tabExtras.style.display = '';
        };
    };
};

return await WApplication.execAsync(new KyraAVApp(), this.boxedEnv.args);
