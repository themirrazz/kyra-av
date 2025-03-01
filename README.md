# KyraAV
KyraAV is an antivirus for Windows 96. It works pretty well and features automatic updates, self-defense, secure config, a virus shield, and a web shield. Plus, an optional Camera Shield! More features coming in the future.

## Known issues
* Web Shield only works with HTTP request. Expansions will come to WebSockets, and possibly even <iframe>s and media sources/WebRTC.
* Camera Shield does not block against access the webcam via an <iframe>.
* We do not have a giant database.
* NanderTGA's Dualboot Wizard does NOT work if you have KyraAV due to a Syntax Error.
* On v2sp2 (unsupported), when commenting 1 line of code, KyraAV loads, but only Web Shield works and files can no longer be read/written.
