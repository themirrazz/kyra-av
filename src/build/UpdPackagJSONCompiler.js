await (async function (paths) {
  var k = [];
  for (var i = 0; i < paths.length; i++) {
    k.push({
      name: paths[i],
      data: await Array.from(await w96.FS.readbin(paths[i]))
    });
  }
  return JSON.stringify(k);
})(
[
  "C:/local/KyraAV/kyra.js",
  "C:/local/KyraAV/NSA.js",
  "C:/local/KyraAV/definitions.json",
  "C:/local/KyraAV/web-shield.json",
  "C:/local/KyraAV/webcam-shield-test",
  "C:/local/KyraAV/sfx.mp3",
  "C:/local/KyraAV/eicar.com.txt",
  "C:/local/KyraAV/eicar.readme.txt",
]
)
