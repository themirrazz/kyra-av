//!wrt
(async function () {
    var webCamShieldActive = false;
    var webCamShieldActiveInScript = false;
    try {
        var stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        });
        stream.getTracks().forEach(track => {
            // We are not interested in using the 
            track.stop();
        });
    } catch (error) {
        webCamShieldActive = true;
        webCamShieldActiveInScript = true;
    }
    if(!webCamShieldActive) {
        try {
            var stream = await window.navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true
            });
            stream.getTracks().forEach(track => {
                // We are not interested in using the 
                track.stop();
            });
        } catch (error) {
            webCamShieldActive = true;
        }
    }
    if(!webCamShieldActive) {
        alert("Webcam shield is not activated.", {
            title: "Webcam Shield Tester"
        });
        return;
    };
    var details = [
        {
            title: "Webcam shield active",
            value: 'Yes'
        },
        {
            title: "Has exception",
            value: webCamShieldActiveInScript ? 'No' : 'Yes'
        },
        {
            title: "Screen share works",
            value: typeof navigator.mediaDevices.getDisplayMedia === 'function' ? 'Yes' : 'No'
        },
        {
            title: "Web USB works",
            value: navigator.usb ? 'Yes' : 'No'
        },
        {
            title: "Web Share API works",
            value: typeof navigator.share === 'function' ? 'Yes' : 'No'
        },
        {
            title: "Web Share API works, pt. 2",
            value: typeof navigator.canShare === 'function' ? 'Yes' : 'No'
        },
        {
            title: "Web honorifics enabled",
            value: typeof navigator.honorifics === 'boolean' ? (
                navigator.honorifics ? 'Yes' : 'No'
            ) : 'Unavailable'
        },
        {
            title: "GPC enabled",
            value: navigator.globalPrivacyControl ? 'Yes' : 'No'
        },
        {
            title: "Do not track enabled",
            value: navigator.doNotTrack === '1' ? 'Yes' : 'No'
        },
        {
            title: "User-agent",
            value: navigator.userAgent || 'User-agent Error'
        }
    ];
    var html = '<b>RESULTS:</b><br/>';
    details.forEach(detail => {
        html += "<br/><b>";
        html += detail.title.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">","&gt;");
        html += ":</b>&nbsp;";
        html += detail.value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">","&gt;");
    });
    alert(html, {
        title: "Webcam Shield Tester"
    });
})();
