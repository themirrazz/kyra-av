//!wrt
(async function () {
var zing = await data.text();
var fxr = JSON.parse(zing);
if(!await w96.FS.exists('C:/local/KyraAV')) {
  await w96.FS.mkdir('C:/local/KyraAV');
}
for(var i = 0; i < fxr.length; i++) {
  await w96.FS.writebin(fxr[i].name,fxr[i].data);
}
await w96.FS.writestr(
  'C:/system/startup/aaaaa-KyraAV.link',
  JSON.stringify({
    icon: "W:/system/resource/icons/win96/32x32/mime/unknown.png",
    action: "c:/local/KyraAV/kyra.js"
  })
);
})();
