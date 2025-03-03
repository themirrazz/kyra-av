# KyraAV
KyraAV is an antivirus for Windows 96 v3 and above. It works pretty well and features automatic updates, self-defense, secure config, a virus shield, and a web shield. Plus, an optional Camera Shield! More features coming in the future. The appearance is designed to kinda resemble Avast! antivirus so it's familiar for people who have Avast!.

![image](rm/img/KYRA_AV_HERO.png)

## Features
### Virus Shield
The Virus Shield scans viruses against all file read attempts. If a file is known malware, or contains a known malware sample, it blocks the app. It also tells you where the file read request came from - if the app is the in `apps.json` list, it'll show you the name of the file from there (only works on apps that are in the `C:/system/local/bin` folder).

### Web Shield
Web Shield blocks all HTTP requests to suspicious websites like ones that contain malware or adware, or websites that are scams or try to trick you into giving personal information. Web Shield also hooks into iframes to warn you about suspicious and scammy websites that you visit - and it even blocks JavaScript and websites that are thought to contain malware!

### Behavior Shield
Behavior Shield blocks known malware or known malware samples from being run directly in the WRT environment. That means even if we aren't aware of a domain yet, we can block an app from downloading and running a known virus from that website - keeping you safe. We also block attempts to change or remove KyraAV's source code, and attempts to mess with certain DOM objects or overwrite your operating system.

### Webcam Shield
Off by default, but you can enable it to only allow apps you want to be able to use your webcam. Webcam Shield doesn't apply to iframes.

## Changelog
### KyraAV v1.3.1
* Patched a minor bug with the WRT hook that broke apps, including Monaco
* Experimental support for Windows 96 v2sp2
* Removed reliance on WRT for running on v2sp1 (not supported)

### KyraAV v1.3
* Patched minor bugs in currently unused code (future-proofing)
* Introduced experimental UI dashboard (NOT INCLUDED!!!)

### KyraAV v1.2
* Bug fixes

### KyraAV v1.1
* Behavior Shield now blocks malicious code pasted into eval
* Framework for a UI is now in place (a UI is in the works)
* Web Shield can now block malicious websites in `<iframe>` tags
* New AT&T scams added to the list of deceptive sites.

### KyraAV v1.0
* Initial release!!

## Reporting Malware
You can report any malware or viruses using our Google Form.
https://forms.gle/n7VbXjVJHaKyc1uW8

By submitting, you agree to Google's privacy policy.

## Cross-Platform Compatibility
### KyraAV and Windows 96 v3+
> [!NOTE]
> KyraAV is stable on Windows 96 v3. Any problems or glitches that are a bug in KyraAV itself.

All versions of KyraAV have 100% compatibility with Windows 96 v3 or newer.

### KyraAV and Windows 96 v2sp2
> [!WARNING]
> We are experimenting with support for running KyraAV on v2sp2. Please report all issues to this GitHub repository.

As of v1.3.1, KyraAV *officially* supports running on Windows 96 v2sp2. This support is experimental, so please report any bugs to this GitHub repository.

### KyraAV and Windows 96 v2sp1
> [!CAUTION]
> KyraAV is NOT designed to run on Windows 96 v2sp1. Bugs or glitches may occur, and we are not responsible for them.

> [!CAUTION]
> Windows 96 v2sp1 does NOT support the WRT Runtime, which is required for KyraAV to run properly. Some advanced features - like webcam exceptions and the dashboard - will be completely unavailable.

Even though KyraAV will work on v2sp1 without crashing, this is by design (antivirus systems should not crash). Due to the abscense of the WRT (Windows 96 RunTime), some features will be completely unavailable on Windows 96 v2sp1. We do NOT officially support v2sp1, and won't be able to help with issues that cause from using it their.

Things known to work:
* Overall virus protection and Web Shield
* Camera Shield

Things known not to work (properly or at all):
* Adding exceptions to Camera Shield
* Using the dashboard
* Detecting the app that tried to read a malicious file
* Detecting the app that tried to make a malicious web request
* Detecting the app that opened a malicious <iframe>
