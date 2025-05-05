# KyraAV *roasted*?
I told *refactornow.dev/roast* to roast snippets of KyraAV.js, this is what happened.

-----

Snippet:
```js
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
```


Response:
> Oh, look at you, trying to play cybersecurity expert with your browser-side JavaScript. Isn't that cute? You're redefining XMLHttpRequest.prototype.open? That's like trying to fix a leaky pipe with duct tape. It's a hack, not a solution. And what's with this for loop iterating over wbs_defs? Ever heard of Array.prototype.some or Array.prototype.find? They're like the for loop's smarter, more efficient siblings. You're throwing a DOMException for blocked websites? How user-friendly of you. Why not just redirect them to a safer location or show a warning? But no, you just HAVE to scare them off with your 'SecurityError'. Keep it up, and you'll have more exceptions than actual functionality.

-----

Snippet:
```js
    var UnHookedIframeArray = [];
    setInterval(function HookUnHookedIframes() {
        var UnHookedIframeArray = Array.from(document.querySelectorAll('iframe'));
        UnHookedIframeArray.forEach(frame => {
            if(!(frame.hookedByKyraAV&&frame.destroyIFrame)) {
                HookIframe(frame, 'src');
            }
        });
    }, 1000);
```

Response:
> This code is like a bad magic trick: you've managed to make good coding practices disappear. You're re-declaring `UnHookedIframeArray` within your interval function, effectively making it a local variable. Oh, and that interval function, running every second? It's like a ticking time bomb for performance. And let's not even start on the fact that you're trying to write an antivirus in JavaScript. You might as well try to stop a flood with a sieve.

-----

Snippet:
```js
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
            /* - snip - */
        }
    }
```

Response:
> Oh, look at this! An antivirus written in JavaScript, running on the client side. I'm not sure whether to laugh or cry. I mean, who needs server-side security, am I right? And that error handling... it's like watching a one-legged man in a butt-kicking contest. You're throwing a DOMException for a malware detection? That's like calling the fire department because you burnt your toast. And let's not even get started on the variable naming. 'w96', 'wrtObj', 'chk'... It's like you're playing a game of "how cryptic can I be?". This code smells worse than a gym locker room on a hot summer day. Get it together, champ.

(I don't think this AI knows about the Windows 96 API.)

-----

Snippet:
```js
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
```

Response:
> Oh, look! A JavaScript code snippet that's as organized as a toddler's playroom after a sugar rush. Your variable names are so descriptive, I'm sure even you don't know what they stand for. And that error message? "wahhhhhh your "+(typeof d)+" makes me cryyyy" - I'm sure it's going to be a great help during debugging. Not to mention, an antivirus written entirely in browser-side JS? I'm sure your users will appreciate the extra layer of "security". And the cherry on top? The unnecessary semicolons. It's like you're trying to win a semicolon usage contest. Next time, try writing code that doesn't look like it was written by a cat walking across the keyboard.

Hey, I know what they stand for!

- k = **K**yraAV definitions loaded from file system
- d = parsed JSON **d**efinitions
- o = pr**o**tected mirror (helps mitigate malicious apps trying to deform the array to crash KyraAV)
- z = u**ze**less (forgot to remove from the codebase)
- g = cooler looking alternative to `for (var i = 0; ..., ...) { }`

Of course, I told this to the AI roaster, too:

Snippet:
>  Hey! I know exactly what they stand for!!!

Response:
> First off, congratulations on knowing what your variables stand for. A gold star for you! But guess what? The rest of us aren't mind readers. Your code is more cryptic than the Zodiac Killer's letters. Variable names should be clear and descriptive, not some cryptic shorthand that only makes sense to you. And that's just the beginning. Your code structure is as shaky as a house of cards in a windstorm. Next time, try to write code that doesn't require a Rosetta Stone to decipher.

----

Snippet:
```js
            var sw = new w96.StandardWindow({
                resizable: false,
                center: true,
                /* snip */
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
```

Response:
> The code is valid.
>
> Oh wow, look at this Picasso of programming, creating a masterpiece by applying styles directly in the JavaScript. Ever heard of a CSS file? It's this magical thing that lets you keep your styles separate from your script. But no, let's just make our code as unreadable and unmanageable as possible, shall we? And what's this? You're manually hiding elements and removing classes? Ever heard of toggling visibility or using conditional rendering? I can see you're a fan of the 'let's just do everything the hardest way possible' approach to coding. It's a bold strategy, let's see if it pays off for you.

Again, Border uses CSS styles and it breaks other apps that use the same class names. Gotta love the "the code is valid" though.

-----

Snippet:
```js
    async function GetApps(wapi) {
        var i = w96.FSUtil.deconstructFullPath('c:/system/etc/apps.json');
        var k = await wapi.FS._invokeFsFunc(i.path, i.prefix, "readstr", i.path);
        return JSON.parse(k);
    },
```

Response:
> Oh, dear. Where do I even start with this? First off, you're using `var` in 2021. It's like you're trying to summon the ghost of JavaScript past. Ever heard of `let` and `const`? They're not just keywords, they're a lifestyle.
> 
> Next, you're using `async` and `await` with no error handling. I see you like to live dangerously, but in the real world, we use `try-catch blocks`.
> 
> And finally, you're parsing JSON with no schema validation. That's like blindly reaching into a mystery bag filled with potential runtime errors.
> 
> This code is the equivalent of walking on a tightrope over a pit of lava, with no safety net. Good luck with that.

Actually useful tips, I'll have to check to make sure that KyraAV handles the schema/errors properly somewhere else in the code.

-----

The AI does have a point, though. It's all a bunch of spaghetti code. In fact, KyraAV v2.0.0 is going to be rewritten using a packaging software. KyraAV v2.0.0 won't come out for a while, and you'll have to update it manually due to architecture changes.

To delete KyraAV, reboot Windows 96, and press ALT+I to enter recovery mode (KyraAV can't run in recovery mode). Then, delete KyraAV's files! (Don't do this until we've released KyraAV v2.0.0, though!)

Besides a cleaner codebase, KyraAV v2.0.0 will also introduce brand new features!