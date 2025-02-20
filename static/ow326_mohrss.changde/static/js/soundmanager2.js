/** @license


 SoundManager 2: JavaScript Sound for the Web
 ----------------------------------------------
 http://schillmania.com/projects/soundmanager2/

 Copyright (c) 2007, Scott Schiller. All rights reserved.
 Code provided under the BSD License:
 http://schillmania.com/projects/soundmanager2/license.txt

 V2.97a.20131201
*/
(function (k, g) {
    function fa(fa, wa) {
        function ga(b) { return c.preferFlash && F && !c.ignoreFlash && c.flash[b] !== g && c.flash[b] }

        function s(b) {
            return function (d) {
                var e = this._s;
                !e || !e._a
                    ? (e && e.id ? c._wD(e.id + ": Ignoring " + d.type) : c._wD(sb + "Ignoring " + d.type), d = null)
                    : d = b.call(this, d);
                return d;
            };
        }

        this.setupOptions = {
            url: fa || null,
            flashVersion: 8,
            debugMode: !0,
            debugFlash: !1,
            useConsole: !0,
            consoleOnly: !0,
            waitForWindowLoad: !1,
            bgColor: "#ffffff",
            useHighPerformance: !1,
            flashPollingInterval: null,
            html5PollingInterval: null,
            flashLoadTimeout: 1E3,
            wmode: null,
            allowScriptAccess: "always",
            useFlashBlock: !1,
            useHTML5Audio: !0,
            html5Test: /^(probably|maybe)$/i,
            preferFlash: !1,
            noSWFCache: !1,
            idPrefix: "sound"
        };
        this.defaultOptions = {
            autoLoad: !1,
            autoPlay: !1,
            from: null,
            loops: 1,
            onid3: null,
            onload: null,
            whileloading: null,
            onplay: null,
            onpause: null,
            onresume: null,
            whileplaying: null,
            onposition: null,
            onstop: null,
            onfailure: null,
            onfinish: null,
            multiShot: !0,
            multiShotEvents: !1,
            position: null,
            pan: 0,
            stream: !0,
            to: null,
            type: null,
            usePolicyFile: !1,
            volume: 100
        };
        this.flash9Options = {
            isMovieStar: null,
            usePeakData: !1,
            useWaveformData: !1,
            useEQData: !1,
            onbufferchange: null,
            ondataerror: null
        };
        this.movieStarOptions = { bufferTime: 3, serverURL: null, onconnect: null, duration: null };
        this.audioFormats = {
            mp3: {
                type: ['audio/mpeg; codecs\x3d"mp3"', "audio/mpeg", "audio/mp3", "audio/MPA", "audio/mpa-robust"],
                required: !0
            },
            mp4: {
                related: ["aac", "m4a", "m4b"],
                type: [
                    'audio/mp4; codecs\x3d"mp4a.40.2"', "audio/aac", "audio/x-m4a", "audio/MP4A-LATM",
                    "audio/mpeg4-generic"
                ],
                required: !1
            },
            ogg: { type: ["audio/ogg; codecs\x3dvorbis"], required: !1 },
            opus: { type: ["audio/ogg; codecs\x3dopus", "audio/opus"], required: !1 },
            wav: { type: ['audio/wav; codecs\x3d"1"', "audio/wav", "audio/wave", "audio/x-wav"], required: !1 }
        };
        this.movieID = "sm2-container";
        this.id = wa || "sm2movie";
        this.debugID = "soundmanager-debug";
        this.debugURLParam = /([#?&])debug=1/i;
        this.versionNumber = "V2.97a.20131201";
        this.altURL = this.movieURL = this.version = null;
        this.enabled = this.swfLoaded = !1;
        this.oMC = null;
        this.sounds = {};
        this.soundIDs = [];
        this.didFlashBlock = this.muted = !1;
        this.filePattern = null;
        this.filePatterns =
            { flash8: /\.mp3(\?.*)?$/i, flash9: /\.mp3(\?.*)?$/i };
        this.features = { buffering: !1, peakData: !1, waveformData: !1, eqData: !1, movieStar: !1 };
        this.sandbox = {
            type: null,
            types: {
                remote: "remote (domain-based) rules",
                localWithFile: "local with file access (no internet access)",
                localWithNetwork: "local with network (internet access only, no local access)",
                localTrusted: "local, trusted (local+internet access)"
            },
            description: null,
            noRemote: null,
            noLocal: null
        };
        this.html5 = { usingFlash: null };
        this.flash = {};
        this.ignoreFlash = this.html5Only =
            !1;
        var Va,
            c = this,
            Wa = null,
            l = null,
            sb = "HTML5::",
            A,
            u = navigator.userAgent,
            U = k.location.href.toString(),
            p = document,
            xa,
            Xa,
            ya,
            m,
            G = [],
            za = !0,
            C,
            V = !1,
            W = !1,
            q = !1,
            t = !1,
            ha = !1,
            n,
            tb = 0,
            X,
            B,
            Aa,
            O,
            Ba,
            M,
            P,
            Q,
            Ya,
            Ca,
            Da,
            ia,
            I,
            ja,
            Ea,
            R,
            Fa,
            Y,
            ka,
            la,
            S,
            Za,
            Ga,
            $a = ["log", "info", "warn", "error"],
            ab,
            Ha,
            bb,
            Z = null,
            Ia = null,
            r,
            Ja,
            T,
            cb,
            ma,
            na,
            J,
            w,
            $ = !1,
            Ka = !1,
            db,
            eb,
            fb,
            oa = 0,
            aa = null,
            pa,
            N = [],
            ba,
            z = null,
            gb,
            qa,
            ca,
            K,
            ra,
            La,
            hb,
            x,
            ib = Array.prototype.slice,
            E = !1,
            Ma,
            F,
            Na,
            jb,
            H,
            kb,
            Oa,
            sa,
            lb = 0,
            ta = u.match(/(ipad|iphone|ipod)/i),
            mb = u.match(/android/i),
            L = u.match(/msie/i),
            ub = u.match(/webkit/i),
            ua = u.match(/safari/i) && !u.match(/chrome/i),
            Pa = u.match(/opera/i),
            Qa = u.match(/(mobile|pre\/|xoom)/i) || ta || mb,
            Ra = !U.match(/usehtml5audio/i) &&
                !U.match(/sm2\-ignorebadua/i) &&
                ua &&
                !u.match(/silk/i) &&
                u.match(/OS X 10_6_([3-7])/i),
            da = k.console !== g && console.log !== g,
            Sa = p.hasFocus !== g ? p.hasFocus() : null,
            va = ua && (p.hasFocus === g || !p.hasFocus()),
            nb = !va,
            ob = /(mp3|mp4|mpa|m4a|m4b)/i,
            ea = p.location ? p.location.protocol.match(/http/i) : null,
            pb = !ea ? "http://" : "",
            qb = /^\s*audio\/(?:x-)?(?:mpeg4|aac|flv|mov|mp4||m4v|m4a|m4b|mp4v|3gp|3g2)\s*(?:$|;)/i,
            rb = "mpeg4 aac flv mov mp4 m4v f4v m4a m4b mp4v 3gp 3g2".split(" "),
            vb = RegExp("\\.(" + rb.join("|") + ")(\\?.*)?$", "i");
        this.mimePattern = /^\s*audio\/(?:x-)?(?:mp(?:eg|3))\s*(?:$|;)/i;
        this.useAltURL = !ea;
        var Ta;
        try {
            Ta = Audio !== g &&
                (Pa && opera !== g && 10 > opera.version() ? new Audio(null) : new Audio).canPlayType !== g;
        } catch (wb) {
            Ta = !1;
        }
        this.hasHTML5 = Ta;
        this.setup = function (b) {
            var d = !c.url;
            b !== g &&
                (q && z && c.ok() && (b.flashVersion !== g || b.url !== g || b.html5Test !== g)) &&
                J(r("setupLate"));
            Aa(b);
            b &&
            (d && (Y && b.url !== g) && c.beginDelayedInit(),
                !Y && (b.url !== g && "complete" === p.readyState) && setTimeout(R, 1));
            return c;
        };
        this.supported = this.ok = function () { return z ? q && !t : c.useHTML5Audio && c.hasHTML5 };
        this.getMovie = function (c) { return A(c) || p[c] || k[c] };
        this.createSound = function (b, d) {
            function e() {
                f = ma(f);
                c.sounds[f.id] = new Va(f);
                c.soundIDs.push(f.id);
                return c.sounds[f.id];
            }

            var a,
                f;
            a = null;
            a = "soundManager.createSound(): " + r(!q ? "notReady" : "notOK");
            if (!q || !c.ok()) {
                return J(a), !1;
            }
            d !== g && (b = { id: b, url: d });
            f = B(b);
            f.url = pa(f.url);
            void 0 === f.id &&
            (f.id = c.setupOptions.idPrefix +
                lb++);
            f.id.toString().charAt(0).match(/^[0-9]$/) && c._wD("soundManager.createSound(): " + r("badID", f.id), 2);
            c._wD("soundManager.createSound(): " + f.id + (f.url ? " (" + f.url + ")" : ""), 1);
            if (w(f.id, !0)) {
                return c._wD("soundManager.createSound(): " + f.id + " exists", 1), c.sounds[f.id];
            }
            if (qa(f)) {
                a = e(), c._wD(f.id + ": Using HTML5"), a._setup_html5(f);
            } else {
                if (c.html5Only) {
                    return c._wD(f.id + ": No HTML5 support for this sound, and no Flash. Exiting."), e();
                }
                if (c.html5.usingFlash && f.url && f.url.match(/data\:/i)) {
                    return c._wD(f.id +
                        ": data: URIs not supported via Flash. Exiting."), e();
                }
                8 < m &&
                (null === f.isMovieStar &&
                        (f.isMovieStar = !(!f.serverURL && !(f.type && f.type.match(qb) || f.url && f.url.match(vb)))),
                    f.isMovieStar &&
                        (c._wD("soundManager.createSound(): using MovieStar handling"), 1 < f.loops && n("noNSLoop")));
                f = na(f, "soundManager.createSound(): ");
                a = e();
                8 === m
                    ? l._createSound(f.id, f.loops || 1, f.usePolicyFile)
                    : (l._createSound(f.id,
                        f.url,
                        f.usePeakData,
                        f.useWaveformData,
                        f.useEQData,
                        f.isMovieStar,
                        f.isMovieStar ? f.bufferTime : !1,
                        f.loops || 1,
                        f.serverURL,
                        f.duration || null,
                        f.autoPlay,
                        !0,
                        f.autoLoad,
                        f.usePolicyFile), f.serverURL || (a.connected = !0, f.onconnect && f.onconnect.apply(a)));
                !f.serverURL && (f.autoLoad || f.autoPlay) && a.load(f);
            }
            !f.serverURL && f.autoPlay && a.play();
            return a;
        };
        this.destroySound = function (b, d) {
            if (!w(b)) {
                return!1;
            }
            var e = c.sounds[b],
                a;
            e._iO = {};
            e.stop();
            e.unload();
            for (a = 0; a < c.soundIDs.length; a++) {
                if (c.soundIDs[a] === b) {
                    c.soundIDs.splice(a, 1);
                    break;
                }
            }
            d || e.destruct(!0);
            delete c.sounds[b];
            return!0;
        };
        this.load = function (b, d) { return!w(b) ? !1 : c.sounds[b].load(d) };
        this.unload = function (b) { return!w(b) ? !1 : c.sounds[b].unload() };
        this.onposition = this.onPosition =
            function (b, d, e, a) { return!w(b) ? !1 : c.sounds[b].onposition(d, e, a) };
        this.clearOnPosition = function (b, d, e) { return!w(b) ? !1 : c.sounds[b].clearOnPosition(d, e) };
        this.start = this.play = function (b, d) {
            var e = null,
                a = d && !(d instanceof Object);
            if (!q || !c.ok()) {
                return J("soundManager.play(): " + r(!q ? "notReady" : "notOK")), !1;
            }
            if (w(b, a)) {
                a && (d = { url: d });
            } else {
                if (!a) {
                    return!1;
                }
                a && (d = { url: d });
                d &&
                    d.url &&
                    (c._wD('soundManager.play(): Attempting to create "' +
                        b +
                        '"',
                        1), d.id = b, e = c.createSound(d).play());
            }
            null === e && (e = c.sounds[b].play(d));
            return e;
        };
        this.setPosition = function (b, d) { return!w(b) ? !1 : c.sounds[b].setPosition(d) };
        this.stop = function (b) {
            if (!w(b)) {
                return!1;
            }
            c._wD("soundManager.stop(" + b + ")", 1);
            return c.sounds[b].stop();
        };
        this.stopAll = function () {
            var b;
            c._wD("soundManager.stopAll()", 1);
            for (b in c.sounds) {
                c.sounds.hasOwnProperty(b) && c.sounds[b].stop();
            }
        };
        this.pause = function (b) { return!w(b) ? !1 : c.sounds[b].pause() };
        this.pauseAll = function () {
            var b;
            for (b = c.soundIDs.length -
                    1;
                0 <= b;
                b--) {
                c.sounds[c.soundIDs[b]].pause();
            }
        };
        this.resume = function (b) { return!w(b) ? !1 : c.sounds[b].resume() };
        this.resumeAll = function () {
            var b;
            for (b = c.soundIDs.length - 1; 0 <= b; b--) {
                c.sounds[c.soundIDs[b]].resume();
            }
        };
        this.togglePause = function (b) { return!w(b) ? !1 : c.sounds[b].togglePause() };
        this.setPan = function (b, d) { return!w(b) ? !1 : c.sounds[b].setPan(d) };
        this.setVolume = function (b, d) { return!w(b) ? !1 : c.sounds[b].setVolume(d) };
        this.mute = function (b) {
            var d = 0;
            b instanceof String && (b = null);
            if (b) {
                if (!w(b)) {
                    return!1;
                }
                c._wD('soundManager.mute(): Muting "' +
                    b +
                    '"');
                return c.sounds[b].mute();
            }
            c._wD("soundManager.mute(): Muting all sounds");
            for (d = c.soundIDs.length - 1; 0 <= d; d--) {
                c.sounds[c.soundIDs[d]].mute();
            }
            return c.muted = !0;
        };
        this.muteAll = function () { c.mute() };
        this.unmute = function (b) {
            b instanceof String && (b = null);
            if (b) {
                if (!w(b)) {
                    return!1;
                }
                c._wD('soundManager.unmute(): Unmuting "' + b + '"');
                return c.sounds[b].unmute();
            }
            c._wD("soundManager.unmute(): Unmuting all sounds");
            for (b = c.soundIDs.length - 1; 0 <= b; b--) {
                c.sounds[c.soundIDs[b]].unmute();
            }
            c.muted = !1;
            return!0;
        };
        this.unmuteAll =
            function () { c.unmute() };
        this.toggleMute = function (b) { return!w(b) ? !1 : c.sounds[b].toggleMute() };
        this.getMemoryUse = function () {
            var c = 0;
            l && 8 !== m && (c = parseInt(l._getMemoryUse(), 10));
            return c;
        };
        this.disable = function (b) {
            var d;
            b === g && (b = !1);
            if (t) {
                return!1;
            }
            t = !0;
            n("shutdown", 1);
            for (d = c.soundIDs.length - 1; 0 <= d; d--) {
                ab(c.sounds[c.soundIDs[d]]);
            }
            X(b);
            x.remove(k, "load", P);
            return!0;
        };
        this.canPlayMIME = function (b) {
            var d;
            c.hasHTML5 && (d = ca({ type: b }));
            !d && z && (d = b && c.ok() ? !!(8 < m && b.match(qb) || b.match(c.mimePattern)) : null);
            return d;
        };
        this.canPlayURL = function (b) {
            var d;
            c.hasHTML5 && (d = ca({ url: b }));
            !d && z && (d = b && c.ok() ? !!b.match(c.filePattern) : null);
            return d;
        };
        this.canPlayLink = function (b) {
            return b.type !== g && b.type && c.canPlayMIME(b.type) ? !0 : c.canPlayURL(b.href);
        };
        this.getSoundById = function (b, d) {
            if (!b) {
                return null;
            }
            var e = c.sounds[b];
            !e && !d && c._wD('soundManager.getSoundById(): Sound "' + b + '" not found.', 2);
            return e;
        };
        this.onready = function (b, d) {
            if ("function" === typeof b) {
                q && c._wD(r("queue", "onready")), d || (d = k), Ba("onready", b, d), M();
            } else {
                throw r("needFunction",
                    "onready");
            }
            return!0;
        };
        this.ontimeout = function (b, d) {
            if ("function" === typeof b) {
                q && c._wD(r("queue", "ontimeout")), d || (d = k), Ba("ontimeout", b, d), M({ type: "ontimeout" });
            } else {
                throw r("needFunction", "ontimeout");
            }
            return!0;
        };
        this._writeDebug = function (b, d) {
            var e,
                a;
            if (!c.debugMode) {
                return!1;
            }
            if (da && c.useConsole) {
                if (d && "object" === typeof d) {
                    console.log(b, d);
                } else if ($a[d] !== g) {
                    console[$a[d]](b);
                } else {
                    console.log(b);
                }
                if (c.consoleOnly) {
                    return!0;
                }
            }
            e = A("soundmanager-debug");
            if (!e) {
                return!1;
            }
            a = p.createElement("div");
            0 === ++tb % 2 &&
            (a.className =
                "sm2-alt");
            d = d === g ? 0 : parseInt(d, 10);
            a.appendChild(p.createTextNode(b));
            d && (2 <= d && (a.style.fontWeight = "bold"), 3 === d && (a.style.color = "#ff3333"));
            e.insertBefore(a, e.firstChild);
            return!0;
        };
        -1 !== U.indexOf("sm2-debug\x3dalert") && (this._writeDebug = function (c) { k.alert(c) });
        this._wD = this._writeDebug;
        this._debug = function () {
            var b,
                d;
            n("currentObj", 1);
            b = 0;
            for (d = c.soundIDs.length; b < d; b++) {
                c.sounds[c.soundIDs[b]]._debug();
            }
        };
        this.reboot = function (b, d) {
            c.soundIDs.length &&
                c._wD("Destroying " +
                    c.soundIDs.length +
                    " SMSound object" +
                    (1 !== c.soundIDs.length ? "s" : "") +
                    "...");
            var e,
                a,
                f;
            for (e = c.soundIDs.length - 1; 0 <= e; e--) {
                c.sounds[c.soundIDs[e]].destruct();
            }
            if (l) {
                try {
                    L && (Ia = l.innerHTML), Z = l.parentNode.removeChild(l);
                } catch (g) {
                    n("badRemove", 2);
                }
            }
            Ia = Z = z = l = null;
            c.enabled = Y = q = $ = Ka = V = W = t = E = c.swfLoaded = !1;
            c.soundIDs = [];
            c.sounds = {};
            lb = 0;
            if (b) {
                G = [];
            } else {
                for (e in G) {
                    if (G.hasOwnProperty(e)) {
                        a = 0;
                        for (f = G[e].length; a < f; a++) {
                            G[e][a].fired = !1;
                        }
                    }
                }
            }
            d || c._wD("soundManager: Rebooting...");
            c.html5 = { usingFlash: null };
            c.flash = {};
            c.html5Only = !1;
            c.ignoreFlash = !1;
            k.setTimeout(function () {
                    Ea();
                    d || c.beginDelayedInit();
                },
                20);
            return c;
        };
        this.reset = function () {
            n("reset");
            return c.reboot(!0, !0);
        };
        this.getMoviePercent = function () { return l && "PercentLoaded" in l ? l.PercentLoaded() : null };
        this.beginDelayedInit = function () {
            ha = !0;
            R();
            setTimeout(function () {
                    if (Ka) {
                        return!1;
                    }
                    la();
                    ja();
                    return Ka = !0;
                },
                20);
            Q();
        };
        this.destruct = function () {
            c._wD("soundManager.destruct()");
            c.disable(!0);
        };
        Va = function (b) {
            var d,
                e,
                a = this,
                f,
                k,
                h,
                v,
                p,
                q,
                s = !1,
                D = [],
                u = 0,
                Ua,
                z,
                t = null,
                A;
            e = d = null;
            this.sID = this.id = b.id;
            this.url = b.url;
            this._iO = this.instanceOptions =
                this.options = B(b);
            this.pan = this.options.pan;
            this.volume = this.options.volume;
            this.isHTML5 = !1;
            this._a = null;
            A = this.url ? !1 : !0;
            this.id3 = {};
            this._debug = function () { c._wD(a.id + ": Merged options:", a.options) };
            this.load = function (b) {
                var d = null,
                    e;
                b !== g
                    ? a._iO = B(b, a.options)
                    : (b = a.options, a._iO = b, t && t !== a.url && (n("manURL"), a._iO.url = a.url, a.url = null));
                a._iO.url || (a._iO.url = a.url);
                a._iO.url = pa(a._iO.url);
                e = a.instanceOptions = a._iO;
                c._wD(a.id + ": load (" + e.url + ")");
                if (!e.url && !a.url) {
                    return c._wD(a.id + ": load(): url is unassigned. Exiting.",
                        2), a;
                }
                !a.isHTML5 &&
                    (8 === m && !a.url && !e.autoPlay) &&
                    c._wD(a.id + ": Flash 8 load() limitation: Wait for onload() before calling play().", 1);
                if (e.url === a.url && 0 !== a.readyState && 2 !== a.readyState) {
                    return n("onURL", 1), 3 === a.readyState &&
                        e.onload &&
                        sa(a, function () { e.onload.apply(a, [!!a.duration]) }), a;
                }
                a.loaded = !1;
                a.readyState = 1;
                a.playState = 0;
                a.id3 = {};
                if (qa(e)) {
                    d = a._setup_html5(e), d._called_load
                        ? c._wD(a.id + ": Ignoring request to load again")
                        : (a._html5_canplay = !1, a.url !== e.url &&
                        (c._wD(n("manURL") + ": " + e.url), a._a.src =
                            e.url, a.setPosition(0)), a._a.autobuffer = "auto", a._a.preload =
                            "auto", a._a._called_load = !0);
                } else {
                    if (c.html5Only) {
                        return c._wD(a.id + ": No flash support. Exiting."), a;
                    }
                    if (a._iO.url && a._iO.url.match(/data\:/i)) {
                        return c._wD(a.id + ": data: URIs not supported via Flash. Exiting."), a;
                    }
                    try {
                        a.isHTML5 = !1, a._iO = na(ma(e)), e = a._iO, 8 === m
                            ? l._load(a.id, e.url, e.stream, e.autoPlay, e.usePolicyFile)
                            : l._load(a.id,
                                e.url,
                                !!e.stream,
                                !!e.autoPlay,
                                e.loops || 1,
                                !!e.autoLoad,
                                e.usePolicyFile);
                    } catch (f) {
                        n("smError", 2), C("onload", !1), S({
                            type: "SMSOUND_LOAD_JS_EXCEPTION",
                            fatal: !0
                        });
                    }
                }
                a.url = e.url;
                return a;
            };
            this.unload = function () {
                0 !== a.readyState &&
                (c._wD(a.id + ": unload()"), a.isHTML5
                    ? (v(), a._a && (a._a.pause(), t = ra(a._a)))
                    : 8 === m
                    ? l._unload(a.id, "about:blank")
                    : l._unload(a.id), f());
                return a;
            };
            this.destruct = function (b) {
                c._wD(a.id + ": Destruct");
                a.isHTML5
                    ? (v(), a._a && (a._a.pause(), ra(a._a), E || h(), a._a._s = null, a._a = null))
                    : (a._iO.onfailure = null, l._destroySound(a.id));
                b || c.destroySound(a.id, !0);
            };
            this.start = this.play = function (b, d) {
                var e,
                    f,
                    h,
                    v,
                    k,
                    y = !0,
                    y = null;
                e = a.id + ": play(): ";
                d = d ===
                    g
                    ? !0
                    : d;
                b || (b = {});
                a.url && (a._iO.url = a.url);
                a._iO = B(a._iO, a.options);
                a._iO = B(b, a._iO);
                a._iO.url = pa(a._iO.url);
                a.instanceOptions = a._iO;
                if (!a.isHTML5 && a._iO.serverURL && !a.connected) {
                    return a.getAutoPlay() ||
                        (c._wD(e + " Netstream not connected yet - setting autoPlay"), a.setAutoPlay(!0)), a;
                }
                qa(a._iO) && (a._setup_html5(a._iO), p());
                1 === a.playState &&
                    !a.paused &&
                    ((f = a._iO.multiShot)
                        ? c._wD(e + "Already playing (multi-shot)", 1)
                        : (c._wD(e + "Already playing (one-shot)", 1), a.isHTML5 && a.setPosition(a._iO.position), y =
                            a));
                if (null !==
                    y) {
                    return y;
                }
                b.url && b.url !== a.url && (!a.readyState && !a.isHTML5 && 8 === m && A ? A = !1 : a.load(a._iO));
                a.loaded
                    ? c._wD(e.substr(0, e.lastIndexOf(":")))
                    : 0 === a.readyState
                    ? (c._wD(e + "Attempting to load"), !a.isHTML5 && !c.html5Only
                        ? (a._iO.autoPlay = !0, a.load(a._iO))
                        : a.isHTML5
                        ? a.load(a._iO)
                        : (c._wD(e + "Unsupported type. Exiting."), y = a), a.instanceOptions = a._iO)
                    : 2 === a.readyState
                    ? (c._wD(e + "Could not load - exiting", 2), y = a)
                    : c._wD(e + "Loading - attempting to play...");
                if (null !== y) {
                    return y;
                }
                !a.isHTML5 &&
                    (9 === m &&
                        0 < a.position &&
                        a.position ===
                        a.duration) &&
                    (c._wD(e + "Sound at end, resetting to position:0"), b.position = 0);
                if (a.paused && 0 <= a.position && (!a._iO.serverURL || 0 < a.position)) {
                    c._wD(e + "Resuming from paused state", 1), a.resume();
                } else {
                    a._iO = B(b, a._iO);
                    if (null !== a._iO.from &&
                        null !== a._iO.to &&
                        0 === a.instanceCount &&
                        0 === a.playState &&
                        !a._iO.serverURL) {
                        f = function () {
                            a._iO = B(b, a._iO);
                            a.play(a._iO);
                        };
                        if (a.isHTML5 && !a._html5_canplay) {
                            c._wD(e + "Beginning load for from/to case"), a.load({ _oncanplay: f }), y = !1;
                        } else if (!a.isHTML5 &&
                            !a.loaded &&
                            (!a.readyState ||
                                2 !== a.readyState)) {
                            c._wD(e + "Preloading for from/to case"), a.load({ onload: f }), y = !1;
                        }
                        if (null !== y) {
                            return y;
                        }
                        a._iO = z();
                    }
                    (!a.instanceCount ||
                            a._iO.multiShotEvents ||
                            a.isHTML5 && a._iO.multiShot && !E ||
                            !a.isHTML5 && 8 < m && !a.getAutoPlay()) &&
                        a.instanceCount++;
                    a._iO.onposition && 0 === a.playState && q(a);
                    a.playState = 1;
                    a.paused = !1;
                    a.position = a._iO.position !== g && !isNaN(a._iO.position) ? a._iO.position : 0;
                    a.isHTML5 || (a._iO = na(ma(a._iO)));
                    a._iO.onplay && d && (a._iO.onplay.apply(a), s = !0);
                    a.setVolume(a._iO.volume, !0);
                    a.setPan(a._iO.pan,
                        !0);
                    a.isHTML5
                        ? 2 > a.instanceCount
                        ? (p(), e = a._setup_html5(), a.setPosition(a._iO.position), e.play())
                        : (c._wD(a.id + ": Cloning Audio() for instance #" + a.instanceCount + "..."), h =
                            new Audio(a._iO.url), v = function () {
                            x.remove(h, "ended", v);
                            a._onfinish(a);
                            ra(h);
                            h = null;
                        }, k = function () {
                            x.remove(h, "canplay", k);
                            try {
                                h.currentTime = a._iO.position / 1E3;
                            } catch (c) {
                                J(a.id + ": multiShot play() failed to apply position of " + a._iO.position / 1E3);
                            }
                            h.play();
                        }, x.add(h, "ended", v), void 0 !== a._iO.volume &&
                        (h.volume = Math.max(0,
                            Math.min(1,
                                a._iO.volume /
                                100))), a.muted && (h.muted = !0), a._iO.position ? x.add(h, "canplay", k) : h.play())
                        : (y = l._start(a.id,
                            a._iO.loops || 1,
                            9 === m ? a.position : a.position / 1E3,
                            a._iO.multiShot || !1), 9 === m &&
                            !y &&
                            (c._wD(e + "No sound hardware, or 32-sound ceiling hit", 2), a._iO.onplayerror &&
                                a._iO.onplayerror.apply(a)));
                }
                return a;
            };
            this.stop = function (b) {
                var d = a._iO;
                1 === a.playState &&
                (c._wD(a.id + ": stop()"), a._onbufferchange(0), a._resetOnPosition(0), a.paused =
                    !1, a.isHTML5 || (a.playState = 0), Ua(), d.to && a.clearOnPosition(d.to), a.isHTML5
                    ? a._a &&
                    (b = a.position,
                        a.setPosition(0), a.position = b, a._a.pause(), a.playState = 0, a._onTimer(), v())
                    : (l._stop(a.id, b), d.serverURL && a.unload()), a.instanceCount = 0, a._iO =
                    {}, d.onstop && d.onstop.apply(a));
                return a;
            };
            this.setAutoPlay = function (b) {
                c._wD(a.id + ": Autoplay turned " + (b ? "on" : "off"));
                a._iO.autoPlay = b;
                a.isHTML5 ||
                (l._setAutoPlay(a.id, b), b &&
                    (!a.instanceCount && 1 === a.readyState) &&
                    (a.instanceCount++, c._wD(a.id + ": Incremented instance count to " + a.instanceCount)));
            };
            this.getAutoPlay = function () { return a._iO.autoPlay };
            this.setPosition =
                function (b) {
                    b === g && (b = 0);
                    var d = a.isHTML5 ? Math.max(b, 0) : Math.min(a.duration || a._iO.duration, Math.max(b, 0));
                    a.position = d;
                    b = a.position / 1E3;
                    a._resetOnPosition(a.position);
                    a._iO.position = d;
                    if (a.isHTML5) {
                        if (a._a) {
                            if (a._html5_canplay) {
                                if (a._a.currentTime !== b) {
                                    c._wD(a.id + ": setPosition(" + b + ")");
                                    try {
                                        a._a.currentTime = b, (0 === a.playState || a.paused) && a._a.pause();
                                    } catch (e) {
                                        c._wD(a.id + ": setPosition(" + b + ") failed: " + e.message, 2);
                                    }
                                }
                            } else if (b) {
                                return c._wD(a.id + ": setPosition(" + b + "): Cannot seek yet, sound not ready",
                                    2), a;
                            }
                            a.paused && a._onTimer(!0);
                        }
                    } else {
                        b = 9 === m ? a.position : b, a.readyState &&
                            2 !== a.readyState &&
                            l._setPosition(a.id, b, a.paused || !a.playState, a._iO.multiShot);
                    }
                    return a;
                };
            this.pause = function (b) {
                if (a.paused || 0 === a.playState && 1 !== a.readyState) {
                    return a;
                }
                c._wD(a.id + ": pause()");
                a.paused = !0;
                a.isHTML5 ? (a._setup_html5().pause(), v()) : (b || b === g) && l._pause(a.id, a._iO.multiShot);
                a._iO.onpause && a._iO.onpause.apply(a);
                return a;
            };
            this.resume = function () {
                var b = a._iO;
                if (!a.paused) {
                    return a;
                }
                c._wD(a.id + ": resume()");
                a.paused = !1;
                a.playState = 1;
                a.isHTML5
                    ? (a._setup_html5().play(), p())
                    : (b.isMovieStar && !b.serverURL && a.setPosition(a.position), l._pause(a.id, b.multiShot));
                !s && b.onplay ? (b.onplay.apply(a), s = !0) : b.onresume && b.onresume.apply(a);
                return a;
            };
            this.togglePause = function () {
                c._wD(a.id + ": togglePause()");
                if (0 === a.playState) {
                    return a.play({ position: 9 === m && !a.isHTML5 ? a.position : a.position / 1E3 }), a;
                }
                a.paused ? a.resume() : a.pause();
                return a;
            };
            this.setPan = function (b, c) {
                b === g && (b = 0);
                c === g && (c = !1);
                a.isHTML5 || l._setPan(a.id, b);
                a._iO.pan = b;
                c || (a.pan = b, a.options.pan = b);
                return a;
            };
            this.setVolume = function (b, d) {
                b === g && (b = 100);
                d === g && (d = !1);
                a.isHTML5
                    ? a._a &&
                    (c.muted && !a.muted && (a.muted = !0, a._a.muted = !0), a._a.volume =
                        Math.max(0, Math.min(1, b / 100)))
                    : l._setVolume(a.id, c.muted && !a.muted || a.muted ? 0 : b);
                a._iO.volume = b;
                d || (a.volume = b, a.options.volume = b);
                return a;
            };
            this.mute = function () {
                a.muted = !0;
                a.isHTML5 ? a._a && (a._a.muted = !0) : l._setVolume(a.id, 0);
                return a;
            };
            this.unmute = function () {
                a.muted = !1;
                var b = a._iO.volume !== g;
                a.isHTML5
                    ? a._a && (a._a.muted = !1)
                    : l._setVolume(a.id,
                        b ? a._iO.volume : a.options.volume);
                return a;
            };
            this.toggleMute = function () { return a.muted ? a.unmute() : a.mute() };
            this.onposition = this.onPosition = function (b, c, d) {
                D.push({ position: parseInt(b, 10), method: c, scope: d !== g ? d : a, fired: !1 });
                return a;
            };
            this.clearOnPosition = function (a, b) {
                var c;
                a = parseInt(a, 10);
                if (isNaN(a)) {
                    return!1;
                }
                for (c = 0; c < D.length; c++) {
                    if (a === D[c].position && (!b || b === D[c].method)) {
                        D[c].fired && u--, D.splice(c, 1);
                    }
                }
            };
            this._processOnPosition = function () {
                var b,
                    c;
                b = D.length;
                if (!b || !a.playState || u >= b) {
                    return!1;
                }
                for (b -=
                        1;
                    0 <= b;
                    b--) {
                    c = D[b], !c.fired &&
                        a.position >= c.position &&
                        (c.fired = !0, u++, c.method.apply(c.scope, [c.position]));
                }
                return!0;
            };
            this._resetOnPosition = function (a) {
                var b,
                    c;
                b = D.length;
                if (!b) {
                    return!1;
                }
                for (b -= 1; 0 <= b; b--) {
                    c = D[b], c.fired && a <= c.position && (c.fired = !1, u--);
                }
                return!0;
            };
            z = function () {
                var b = a._iO,
                    d = b.from,
                    e = b.to,
                    f,
                    g;
                g = function () {
                    c._wD(a.id + ': "To" time of ' + e + " reached.");
                    a.clearOnPosition(e, g);
                    a.stop();
                };
                f = function () {
                    c._wD(a.id + ': Playing "from" ' + d);
                    if (null !== e && !isNaN(e)) {
                        a.onPosition(e, g);
                    }
                };
                null !== d &&
                    !isNaN(d) &&
                    (b.position = d, b.multiShot = !1, f());
                return b;
            };
            q = function () {
                var b,
                    c = a._iO.onposition;
                if (c) {
                    for (b in c) {
                        if (c.hasOwnProperty(b)) {
                            a.onPosition(parseInt(b, 10), c[b]);
                        }
                    }
                }
            };
            Ua = function () {
                var b,
                    c = a._iO.onposition;
                if (c) {
                    for (b in c) {
                        c.hasOwnProperty(b) && a.clearOnPosition(parseInt(b, 10));
                    }
                }
            };
            p = function () { a.isHTML5 && db(a) };
            v = function () { a.isHTML5 && eb(a) };
            f = function (b) {
                b || (D = [], u = 0);
                s = !1;
                a._hasTimer = null;
                a._a = null;
                a._html5_canplay = !1;
                a.bytesLoaded = null;
                a.bytesTotal = null;
                a.duration = a._iO && a._iO.duration ? a._iO.duration : null;
                a.durationEstimate =
                    null;
                a.buffered = [];
                a.eqData = [];
                a.eqData.left = [];
                a.eqData.right = [];
                a.failures = 0;
                a.isBuffering = !1;
                a.instanceOptions = {};
                a.instanceCount = 0;
                a.loaded = !1;
                a.metadata = {};
                a.readyState = 0;
                a.muted = !1;
                a.paused = !1;
                a.peakData = { left: 0, right: 0 };
                a.waveformData = { left: [], right: [] };
                a.playState = 0;
                a.position = null;
                a.id3 = {};
            };
            f();
            this._onTimer = function (b) {
                var c,
                    f = !1,
                    g = {};
                if (a._hasTimer || b) {
                    if (a._a && (b || (0 < a.playState || 1 === a.readyState) && !a.paused)) {
                        c = a._get_html5_duration(), c !== d && (d = c, a.duration = c, f = !0), a.durationEstimate =
                            a.duration, c =
                            1E3 * a._a.currentTime || 0, c !== e && (e = c, f = !0), (f || b) &&
                            a._whileplaying(c, g, g, g, g);
                    }
                    return f;
                }
            };
            this._get_html5_duration = function () {
                var b = a._iO;
                return(b = a._a && a._a.duration ? 1E3 * a._a.duration : b && b.duration ? b.duration : null) &&
                    !isNaN(b) &&
                    Infinity !== b
                    ? b
                    : null;
            };
            this._apply_loop = function (a, b) {
                !a.loop && 1 < b && c._wD("Note: Native HTML5 looping is infinite.", 1);
                a.loop = 1 < b ? "loop" : "";
            };
            this._setup_html5 = function (b) {
                b = B(a._iO, b);
                var c = E ? Wa : a._a,
                    d = decodeURI(b.url),
                    e;
                E
                    ? d === decodeURI(Ma) && (e = !0)
                    : d === decodeURI(t) &&
                    (e = !0);
                if (c) {
                    if (c._s) {
                        if (E) {
                            c._s && (c._s.playState && !e) && c._s.stop();
                        } else if (!E && d === decodeURI(t)) {
                            return a._apply_loop(c, b.loops), c;
                        }
                    }
                    e || (t && f(!1), c.src = b.url, Ma = t = a.url = b.url, c._called_load = !1);
                } else {
                    b.autoLoad || b.autoPlay
                        ? (a._a = new Audio(b.url), a._a.load())
                        : a._a = Pa && 10 > opera.version() ? new Audio(null) : new Audio, c = a._a, c._called_load =
                        !1, E && (Wa = c);
                }
                a.isHTML5 = !0;
                a._a = c;
                c._s = a;
                k();
                a._apply_loop(c, b.loops);
                b.autoLoad || b.autoPlay ? a.load() : (c.autobuffer = !1, c.preload = "auto");
                return c;
            };
            k = function () {
                if (a._a._added_events) {
                    return!1;
                }
                var b;
                a._a._added_events = !0;
                for (b in H) {
                    H.hasOwnProperty(b) && a._a && a._a.addEventListener(b, H[b], !1);
                }
                return!0;
            };
            h = function () {
                var b;
                c._wD(a.id + ": Removing event listeners");
                a._a._added_events = !1;
                for (b in H) {
                    H.hasOwnProperty(b) && a._a && a._a.removeEventListener(b, H[b], !1);
                }
            };
            this._onload = function (b) {
                var d = !!b || !a.isHTML5 && 8 === m && a.duration;
                b = a.id + ": ";
                c._wD(b +
                    (d
                        ? "onload()"
                        : "Failed to load / invalid sound?" +
                        (!a.duration ? " Zero-length duration reported." : " -") +
                        " (" +
                        a.url +
                        ")"),
                    d ? 1 : 2);
                !d &&
                    !a.isHTML5 &&
                    (!0 === c.sandbox.noRemote &&
                        c._wD(b + r("noNet"), 1), !0 === c.sandbox.noLocal && c._wD(b + r("noLocal"), 1));
                a.loaded = d;
                a.readyState = d ? 3 : 2;
                a._onbufferchange(0);
                a._iO.onload && sa(a, function () { a._iO.onload && a._iO.onload.apply(a, [d]) });
                return!0;
            };
            this._onbufferchange = function (b) {
                if (0 === a.playState || b && a.isBuffering || !b && !a.isBuffering) {
                    return!1;
                }
                a.isBuffering = 1 === b;
                a._iO.onbufferchange && (c._wD(a.id + ": Buffer state change: " + b), a._iO.onbufferchange.apply(a));
                return!0;
            };
            this._onsuspend = function () {
                a._iO.onsuspend && (c._wD(a.id + ": Playback suspended"), a._iO.onsuspend.apply(a));
                return!0;
            };
            this._onfailure = function (b, d, e) {
                a.failures++;
                c._wD(a.id + ": Failures \x3d " + a.failures);
                if (a._iO.onfailure && 1 === a.failures) {
                    a._iO.onfailure(a, b, d, e);
                } else {
                    c._wD(a.id + ": Ignoring failure");
                }
            };
            this._onfinish = function () {
                var b = a._iO.onfinish;
                a._onbufferchange(0);
                a._resetOnPosition(0);
                if (a.instanceCount &&
                (a.instanceCount--, a.instanceCount ||
                (Ua(), a.playState = 0, a.paused = !1, a.instanceCount = 0, a.instanceOptions = {}, a._iO =
                    {}, v(), a.isHTML5 && (a.position = 0)), (!a.instanceCount || a._iO.multiShotEvents) && b)) {
                    c._wD(a.id +
                        ": onfinish()"), sa(a, function () { b.apply(a) });
                }
            };
            this._whileloading = function (b, c, d, e) {
                var f = a._iO;
                a.bytesLoaded = b;
                a.bytesTotal = c;
                a.duration = Math.floor(d);
                a.bufferLength = e;
                a.durationEstimate = !a.isHTML5 && !f.isMovieStar
                    ? f.duration
                    ? a.duration > f.duration
                    ? a.duration
                    : f.duration
                    : parseInt(a.bytesTotal / a.bytesLoaded * a.duration, 10)
                    : a.duration;
                a.isHTML5 || (a.buffered = [{ start: 0, end: a.duration }]);
                (3 !== a.readyState || a.isHTML5) && f.whileloading && f.whileloading.apply(a);
            };
            this._whileplaying = function (b, c, d, e, f) {
                var h = a._iO;
                if (isNaN(b) || null === b) {
                    return!1;
                }
                a.position = Math.max(0, b);
                a._processOnPosition();
                !a.isHTML5 &&
                    8 < m &&
                    (h.usePeakData && (c !== g && c) && (a.peakData = { left: c.leftPeak, right: c.rightPeak }),
                        h.useWaveformData &&
                            (d !== g && d) &&
                            (a.waveformData = { left: d.split(","), right: e.split(",") }), h.useEQData &&
                            (f !== g && f && f.leftEQ) &&
                            (b = f.leftEQ.split(","), a.eqData = b, a.eqData.left = b, f.rightEQ !== g &&
                                f.rightEQ &&
                                (a.eqData.right = f.rightEQ.split(","))));
                1 === a.playState &&
                (!a.isHTML5 && (8 === m && !a.position && a.isBuffering) && a._onbufferchange(0), h.whileplaying &&
                    h.whileplaying.apply(a));
                return!0;
            };
            this._oncaptiondata = function (b) {
                c._wD(a.id + ": Caption data received.");
                a.captiondata = b;
                a._iO.oncaptiondata && a._iO.oncaptiondata.apply(a, [b]);
            };
            this._onmetadata = function (b, d) {
                c._wD(a.id + ": Metadata received.");
                var e = {},
                    f,
                    g;
                f = 0;
                for (g = b.length; f < g; f++) {
                    e[b[f]] = d[f];
                }
                a.metadata = e;
                a._iO.onmetadata && a._iO.onmetadata.apply(a);
            };
            this._onid3 = function (b, d) {
                c._wD(a.id + ": ID3 data received.");
                var e = [],
                    f,
                    g;
                f = 0;
                for (g = b.length; f < g; f++) {
                    e[b[f]] = d[f];
                }
                a.id3 = B(a.id3, e);
                a._iO.onid3 && a._iO.onid3.apply(a);
            };
            this._onconnect = function (b) {
                b = 1 === b;
                c._wD(a.id + ": " + (b ? "Connected." : "Failed to connect? - " + a.url), b ? 1 : 2);
                if (a.connected = b) {
                    a.failures =
                            0, w(a.id) && (a.getAutoPlay() ? a.play(g, a.getAutoPlay()) : a._iO.autoLoad && a.load()),
                        a._iO.onconnect && a._iO.onconnect.apply(a, [b]);
                }
            };
            this._ondataerror = function (b) {
                0 < a.playState &&
                    (c._wD(a.id + ": Data error: " + b), a._iO.ondataerror && a._iO.ondataerror.apply(a));
            };
            this._debug();
        };
        ka = function () { return p.body || p.getElementsByTagName("div")[0] };
        A = function (b) { return p.getElementById(b) };
        B = function (b, d) {
            var e = b || {},
                a,
                f;
            a = d === g ? c.defaultOptions : d;
            for (f in a) {
                a.hasOwnProperty(f) &&
                    e[f] === g &&
                    (e[f] = "object" !== typeof a[f] || null === a[f] ? a[f] : B(e[f], a[f]));
            }
            return e;
        };
        sa = function (b, c) { !b.isHTML5 && 8 === m ? k.setTimeout(c, 0) : c() };
        O = { onready: 1, ontimeout: 1, defaultOptions: 1, flash9Options: 1, movieStarOptions: 1 };
        Aa = function (b, d) {
            var e,
                a = !0,
                f = d !== g,
                y = c.setupOptions;
            if (b === g) {
                a = [];
                for (e in y) {
                    y.hasOwnProperty(e) && a.push(e);
                }
                for (e in O) {
                    O.hasOwnProperty(e) &&
                    ("object" === typeof c[e]
                        ? a.push(e + ": {...}")
                        : c[e] instanceof
                        Function
                        ? a.push(e + ": function() {...}")
                        : a.push(e));
                }
                c._wD(r("setup", a.join(", ")));
                return!1;
            }
            for (e in b) {
                if (b.hasOwnProperty(e)) {
                    if ("object" !== typeof b[e] || null === b[e] || b[e] instanceof Array || b[e] instanceof RegExp) {
                        f && O[d] !== g
                            ? c[d][e] = b[e]
                            : y[e] !== g
                            ? (c.setupOptions[e] = b[e], c[e] = b[e])
                            : O[e] === g
                            ? (J(r(c[e] === g ? "setupUndef" : "setupError", e), 2), a = !1)
                            : c[e] instanceof Function
                            ? c[e].apply(c, b[e] instanceof Array ? b[e] : [b[e]])
                            : c[e] = b[e];
                    } else if (O[e] === g) {
                        J(r(c[e] === g ? "setupUndef" : "setupError", e), 2), a = !1;
                    } else {
                        return Aa(b[e],
                            e);
                    }
                }
            }
            return a;
        };
        x = function () {
            function b(a) {
                a = ib.call(a);
                var b = a.length;
                e ? (a[1] = "on" + a[1], 3 < b && a.pop()) : 3 === b && a.push(!1);
                return a;
            }

            function c(b, d) {
                var g = b.shift(),
                    v = [a[d]];
                if (e) {
                    g[v](b[0], b[1]);
                } else {
                    g[v].apply(g, b);
                }
            }

            var e = k.attachEvent,
                a = { add: e ? "attachEvent" : "addEventListener", remove: e ? "detachEvent" : "removeEventListener" };
            return{ add: function () { c(b(arguments), "add") }, remove: function () { c(b(arguments), "remove") } };
        }();
        H = {
            abort: s(function () { c._wD(this._s.id + ": abort") }),
            canplay: s(function () {
                var b = this._s,
                    d;
                if (b._html5_canplay) {
                    return!0;
                }
                b._html5_canplay = !0;
                c._wD(b.id + ": canplay");
                b._onbufferchange(0);
                d = b._iO.position !== g && !isNaN(b._iO.position) ? b._iO.position / 1E3 : null;
                if (b.position && this.currentTime !== d) {
                    c._wD(b.id + ": canplay: Setting position to " + d);
                    try {
                        this.currentTime = d;
                    } catch (e) {
                        c._wD(b.id + ": canplay: Setting position of " + d + " failed: " + e.message, 2);
                    }
                }
                b._iO._oncanplay && b._iO._oncanplay();
            }),
            canplaythrough: s(function () {
                var b = this._s;
                b.loaded ||
                (b._onbufferchange(0), b._whileloading(b.bytesLoaded, b.bytesTotal, b._get_html5_duration()),
                    b._onload(!0));
            }),
            ended: s(function () {
                var b = this._s;
                c._wD(b.id + ": ended");
                b._onfinish();
            }),
            error: s(function () {
                c._wD(this._s.id + ": HTML5 error, code " + this.error.code);
                this._s._onload(!1);
            }),
            loadeddata: s(function () {
                var b = this._s;
                c._wD(b.id + ": loadeddata");
                !b._loaded && !ua && (b.duration = b._get_html5_duration());
            }),
            loadedmetadata: s(function () { c._wD(this._s.id + ": loadedmetadata") }),
            loadstart: s(function () {
                c._wD(this._s.id + ": loadstart");
                this._s._onbufferchange(1);
            }),
            play: s(function () { this._s._onbufferchange(0) }),
            playing: s(function () {
                c._wD(this._s.id + ": playing");
                this._s._onbufferchange(0);
            }),
            progress: s(function (b) {
                var d = this._s,
                    e,
                    a,
                    f;
                e = 0;
                var g = "progress" === b.type,
                    h = b.target.buffered,
                    v = b.loaded || 0,
                    k = b.total || 1;
                d.buffered = [];
                if (h && h.length) {
                    e = 0;
                    for (a = h.length; e < a; e++) {
                        d.buffered.push({ start: 1E3 * h.start(e), end: 1E3 * h.end(e) });
                    }
                    e = 1E3 * (h.end(0) - h.start(0));
                    v = Math.min(1, e / (1E3 * b.target.duration));
                    if (g && 1 < h.length) {
                        f = [];
                        a = h.length;
                        for (e = 0; e < a; e++) {
                            f.push(1E3 * b.target.buffered.start(e) + "-" + 1E3 * b.target.buffered.end(e));
                        }
                        c._wD(this._s.id + ": progress, timeRanges: " + f.join(", "));
                    }
                    g && !isNaN(v) && c._wD(this._s.id + ": progress, " + Math.floor(100 * v) + "% loaded");
                }
                isNaN(v) ||
                (d._onbufferchange(0), d._whileloading(v, k, d._get_html5_duration()), v &&
                    (k && v === k) &&
                    H.canplaythrough.call(this, b));
            }),
            ratechange: s(function () { c._wD(this._s.id + ": ratechange") }),
            suspend: s(function (b) {
                var d = this._s;
                c._wD(this._s.id + ": suspend");
                H.progress.call(this, b);
                d._onsuspend();
            }),
            stalled: s(function () { c._wD(this._s.id + ": stalled") }),
            timeupdate: s(function () { this._s._onTimer() }),
            waiting: s(function () {
                var b = this._s;
                c._wD(this._s.id + ": waiting");
                b._onbufferchange(1);
            })
        };
        qa = function (b) {
            return!b || !b.type && !b.url && !b.serverURL
                ? !1
                : b.serverURL || b.type && ga(b.type)
                ? !1
                : b.type
                ? ca({ type: b.type })
                : ca({ url: b.url }) || c.html5Only || b.url.match(/data\:/i);
        };
        ra = function (b) {
            var d;
            b &&
            (d = ua
                ? "about:blank"
                : c.html5.canPlayType("audio/wav")
                ? "data:audio/wave;base64,/UklGRiYAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQIAAAD//w\x3d\x3d"
                : "about:blank", b.src = d, void 0 !== b._called_unload && (b._called_load = !1));
            E && (Ma = null);
            return d;
        };
        ca = function (b) {
            if (!c.useHTML5Audio || !c.hasHTML5) {
                return!1;
            }
            var d = b.url || null;
            b = b.type || null;
            var e = c.audioFormats,
                a;
            if (b && c.html5[b] !== g) {
                return c.html5[b] && !ga(b);
            }
            if (!K) {
                K = [];
                for (a in e) {
                    e.hasOwnProperty(a) && (K.push(a), e[a].related && (K = K.concat(e[a].related)));
                }
                K = RegExp("\\.(" + K.join("|") + ")(\\?.*)?$", "i");
            }
            a = d ? d.toLowerCase().match(K) : null;
            !a || !a.length ? b && (d = b.indexOf(";"), a = (-1 !== d ? b.substr(0, d) : b).substr(6)) : a = a[1];
            a && c.html5[a] !== g
                ? d = c.html5[a] && !ga(a)
                : (b = "audio/" + a, d = c.html5.canPlayType({ type: b }),
                    d = (c.html5[a] = d) && c.html5[b] && !ga(b));
            return d;
        };
        hb = function () {
            function b(a) {
                var b,
                    e = b = !1;
                if (!d || "function" !== typeof d.canPlayType) {
                    return b;
                }
                if (a instanceof Array) {
                    h = 0;
                    for (b = a.length; h < b; h++) {
                        if (c.html5[a[h]] || d.canPlayType(a[h]).match(c.html5Test)) {
                            e = !0, c.html5[a[h]] = !0, c.flash[a[h]] = !!a[h].match(ob);
                        }
                    }
                    b = e;
                } else {
                    a = d && "function" === typeof d.canPlayType ? d.canPlayType(a) : !1, b =
                        !(!a || !a.match(c.html5Test));
                }
                return b;
            }

            if (!c.useHTML5Audio || !c.hasHTML5) {
                return z = c.html5.usingFlash = !0, !1;
            }
            var d = Audio !== g ? Pa && 10 > opera.version() ? new Audio(null) : new Audio : null,
                e,
                a,
                f = {},
                k,
                h;
            k = c.audioFormats;
            for (e in k) {
                if (k.hasOwnProperty(e) &&
                (a = "audio/" + e, f[e] = b(k[e].type), f[a] =
                    f[e], e.match(ob) ? (c.flash[e] = !0, c.flash[a] = !0) : (c.flash[e] = !1, c.flash[a] = !1), k[e] &&
                    k[e].related)) {
                    for (h = k[e].related.length - 1; 0 <= h; h--) {
                        f["audio/" + k[e].related[h]] = f[e], c.html5[k[e].related[h]] =
                            f[e], c.flash[k[e].related[h]] = f[e];
                    }
                }
            }
            f.canPlayType = d ? b : null;
            c.html5 = B(c.html5, f);
            c.html5.usingFlash = gb();
            z = c.html5.usingFlash;
            return!0;
        };
        I = {
            notReady: "Unavailable - wait until onready() has fired.",
            notOK: "Audio support is not available.",
            domError: "soundManagerexception caught while appending SWF to DOM.",
            spcWmode: "Removing wmode, preventing known SWF loading issue(s)",
            swf404: "soundManager: Verify that %s is a valid path.",
            tryDebug: "Try soundManager.debugFlash \x3d true for more security details (output goes to SWF.)",
            checkSWF: "See SWF output for more debug info.",
            localFail: "soundManager: Non-HTTP page (" +
                p.location.protocol +
                " URL?) Review Flash player security settings for this special case:\nhttp://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager04.html\nMay need to add/allow path, eg. c:/sm2/ or /users/me/sm2/",
            waitFocus: "soundManager: Special case: Waiting for SWF to load with window focus...",
            waitForever: "soundManager: Waiting indefinitely for Flash (will recover if unblocked)...",
            waitSWF: "soundManager: Waiting for 100% SWF load...",
            needFunction: "soundManager: Function object expected for %s",
            badID: 'Sound ID "%s" should be a string, starting with a non-numeric character',
            currentObj: "soundManager: _debug(): Current sound objects",
            waitOnload: "soundManager: Waiting for window.onload()",
            docLoaded: "soundManager: Document already loaded",
            onload: "soundManager: initComplete(): calling soundManager.onload()",
            onloadOK: "soundManager.onload() complete",
            didInit: "soundManager: init(): Already called?",
            secNote:
                "Flash security note: Network/internet URLs will not load due to security restrictions. Access can be configured via Flash Player Global Security Settings Page: http://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager04.html",
            badRemove: "soundManager: Failed to remove Flash node.",
            shutdown: "soundManager.disable(): Shutting down",
            queue: "soundManager: Queueing %s handler",
            smError: "SMSound.load(): Exception: JS-Flash communication failed, or JS error.",
            fbTimeout: "No flash response, applying .swf_timedout CSS...",
            fbLoaded: "Flash loaded",
            fbHandler: "soundManager: flashBlockHandler()",
            manURL: "SMSound.load(): Using manually-assigned URL",
            onURL: "soundManager.load(): current URL already assigned.",
            badFV: 'soundManager.flashVersion must be 8 or 9. "%s" is invalid. Reverting to %s.',
            as2loop: "Note: Setting stream:false so looping can work (flash 8 limitation)",
            noNSLoop: "Note: Looping not implemented for MovieStar formats",
            needfl9: "Note: Switching to flash 9, required for MP4 formats.",
            mfTimeout: "Setting flashLoadTimeout \x3d 0 (infinite) for off-screen, mobile flash case",
            needFlash:
                "soundManager: Fatal error: Flash is needed to play some required formats, but is not available.",
            gotFocus: "soundManager: Got window focus.",
            policy: "Enabling usePolicyFile for data access",
            setup: "soundManager.setup(): allowed parameters: %s",
            setupError: 'soundManager.setup(): "%s" cannot be assigned with this method.',
            setupUndef: 'soundManager.setup(): Could not find option "%s"',
            setupLate:
                "soundManager.setup(): url, flashVersion and html5Test property changes will not take effect until reboot().",
            noURL: "soundManager: Flash URL required. Call soundManager.setup({url:...}) to get started.",
            sm2Loaded: "SoundManager 2: Ready.",
            reset: "soundManager.reset(): Removing event callbacks",
            mobileUA: "Mobile UA detected, preferring HTML5 by default.",
            globalHTML5: "Using singleton HTML5 Audio() pattern for this device."
        };
        r = function () {
            var b,
                c,
                e,
                a;
            b = ib.call(arguments);
            c = b.shift();
            if ((a = I && I[c] ? I[c] : "") && b && b.length) {
                c = 0;
                for (e = b.length; c < e; c++) {
                    a = a.replace("%s", b[c]);
                }
            }
            return a;
        };
        ma = function (b) {
            8 === m && (1 < b.loops && b.stream) && (n("as2loop"), b.stream = !1);
            return b;
        };
        na = function (b, d) {
            if (b && !b.usePolicyFile && (b.onid3 || b.usePeakData || b.useWaveformData || b.useEQData)) {
                c._wD((d || "") + r("policy")), b.usePolicyFile = !0;
            }
            return b;
        };
        J = function (b) { da && console.warn !== g ? console.warn(b) : c._wD(b) };
        xa = function () { return!1 };
        ab = function (b) {
            for (var c in b) {
                b.hasOwnProperty(c) &&
                    "function" === typeof b[c] &&
                    (b[c] = xa);
            }
        };
        Ha = function (b) {
            b === g && (b = !1);
            (t || b) && c.disable(b);
        };
        bb = function (b) {
            var d = null;
            if (b) {
                if (b.match(/\.swf(\?.*)?$/i)) {
                    if (d = b.substr(b.toLowerCase().lastIndexOf(".swf?") + 4)) {
                        return b;
                    }
                } else {
                    b.lastIndexOf("/") !== b.length - 1 && (b += "/");
                }
            }
            b = (b && -1 !== b.lastIndexOf("/") ? b.substr(0, b.lastIndexOf("/") + 1) : "./") + c.movieURL;
            c.noSWFCache && (b += "?ts\x3d" + (new Date).getTime());
            return b;
        };
        Da = function () {
            m = parseInt(c.flashVersion, 10);
            8 !== m && 9 !== m && (c._wD(r("badFV", m, 8)), c.flashVersion = m = 8);
            var b =
                c.debugMode || c.debugFlash ? "_debug.swf" : ".swf";
            c.useHTML5Audio &&
                (!c.html5Only && c.audioFormats.mp4.required && 9 > m) &&
                (c._wD(r("needfl9")), c.flashVersion = m = 9);
            c.version = c.versionNumber +
                (c.html5Only ? " (HTML5-only mode)" : 9 === m ? " (AS3/Flash 9)" : " (AS2/Flash 8)");
            8 < m
                ? (c.defaultOptions = B(c.defaultOptions, c.flash9Options), c.features.buffering =
                    !0, c.defaultOptions = B(c.defaultOptions, c.movieStarOptions), c.filePatterns.flash9 =
                    RegExp("\\.(mp3|" + rb.join("|") + ")(\\?.*)?$", "i"), c.features.movieStar = !0)
                : c.features.movieStar =
                !1;
            c.filePattern = c.filePatterns[8 !== m ? "flash9" : "flash8"];
            c.movieURL = (8 === m ? "soundmanager2.swf" : "soundmanager2_flash9.swf").replace(".swf", b);
            c.features.peakData = c.features.waveformData = c.features.eqData = 8 < m;
        };
        Za = function (b, c) {
            if (!l) {
                return!1;
            }
            l._setPolling(b, c);
        };
        Ga = function () {
            c.debugURLParam.test(U) && (c.debugMode = !0);
            if (A(c.debugID)) {
                return!1;
            }
            var b,
                d,
                e,
                a;
            if (c.debugMode && !A(c.debugID) && (!da || !c.useConsole || !c.consoleOnly)) {
                b = p.createElement("div");
                b.id = c.debugID + "-toggle";
                d = {
                    position: "fixed",
                    bottom: "0px",
                    right: "0px",
                    width: "1.2em",
                    height: "1.2em",
                    lineHeight: "1.2em",
                    margin: "2px",
                    textAlign: "center",
                    border: "1px solid #999",
                    cursor: "pointer",
                    background: "#fff",
                    color: "#333",
                    zIndex: 10001
                };
                b.appendChild(p.createTextNode("-"));
                b.onclick = cb;
                b.title = "Toggle SM2 debug console";
                u.match(/msie 6/i) && (b.style.position = "absolute", b.style.cursor = "hand");
                for (a in d) {
                    d.hasOwnProperty(a) && (b.style[a] = d[a]);
                }
                d = p.createElement("div");
                d.id = c.debugID;
                d.style.display = c.debugMode ? "block" : "none";
                if (c.debugMode && !A(b.id)) {
                    try {
                        e = ka(),
                            e.appendChild(b);
                    } catch (f) {
                        throw Error(r("domError") + " \n" + f.toString());
                    }
                    e.appendChild(d);
                }
            }
        };
        w = this.getSoundById;
        n = function (b, d) { return!b ? "" : c._wD(r(b), d) };
        cb = function () {
            var b = A(c.debugID),
                d = A(c.debugID + "-toggle");
            if (!b) {
                return!1;
            }
            za ? (d.innerHTML = "+", b.style.display = "none") : (d.innerHTML = "-", b.style.display = "block");
            za = !za;
        };
        C = function (b, c, e) {
            if (k.sm2Debugger !== g) {
                try {
                    sm2Debugger.handleEvent(b, c, e);
                } catch (a) {
                    return!1;
                }
            }
            return!0;
        };
        T = function () {
            var b = [];
            c.debugMode && b.push("sm2_debug");
            c.debugFlash && b.push("flash_debug");
            c.useHighPerformance && b.push("high_performance");
            return b.join(" ");
        };
        Ja = function () {
            var b = r("fbHandler"),
                d = c.getMoviePercent(),
                e = { type: "FLASHBLOCK" };
            if (c.html5Only) {
                return!1;
            }
            c.ok()
                ? (c.didFlashBlock && c._wD(b + ": Unblocked"), c.oMC &&
                (c.oMC.className =
                    [T(), "movieContainer", "swf_loaded" + (c.didFlashBlock ? " swf_unblocked" : "")].join(" ")))
                : (z &&
                (c.oMC.className =
                    T() + " movieContainer " + (null === d ? "swf_timedout" : "swf_error"), c._wD(
                    b + ": " + r("fbTimeout") + (d ? " (" + r("fbLoaded") + ")" : ""))), c.didFlashBlock = !0, M({
                    type: "ontimeout",
                    ignoreInit: !0,
                    error: e
                }), S(e));
        };
        Ba = function (b, c, e) {
            G[b] === g && (G[b] = []);
            G[b].push({ method: c, scope: e || null, fired: !1 });
        };
        M = function (b) {
            b || (b = { type: c.ok() ? "onready" : "ontimeout" });
            if (!q && b && !b.ignoreInit || "ontimeout" === b.type && (c.ok() || t && !b.ignoreInit)) {
                return!1;
            }
            var d = { success: b && b.ignoreInit ? c.ok() : !t },
                e = b && b.type ? G[b.type] || [] : [],
                a = [],
                f,
                d = [d],
                g = z && !c.ok();
            b.error && (d[0].error = b.error);
            b = 0;
            for (f = e.length; b < f; b++) {
                !0 !== e[b].fired && a.push(e[b]);
            }
            if (a.length) {
                b = 0;
                for (f = a.length; b < f; b++) {
                    a[b].scope
                        ? a[b].method.apply(a[b].scope,
                            d)
                        : a[b].method.apply(this, d), g || (a[b].fired = !0);
                }
            }
            return!0;
        };
        P = function () {
            k.setTimeout(function () {
                    c.useFlashBlock && Ja();
                    M();
                    "function" === typeof c.onload && (n("onload", 1), c.onload.apply(k), n("onloadOK", 1));
                    c.waitForWindowLoad && x.add(k, "load", P);
                },
                1);
        };
        Na = function () {
            if (F !== g) {
                return F;
            }
            var b = !1,
                c = navigator,
                e = c.plugins,
                a,
                f = k.ActiveXObject;
            if (e && e.length) {
                (c = c.mimeTypes) &&
                    (c["application/x-shockwave-flash"] &&
                        c["application/x-shockwave-flash"].enabledPlugin &&
                        c["application/x-shockwave-flash"].enabledPlugin.description) &&
                    (b = !0);
            } else if (f !== g && !u.match(/MSAppHost/i)) {
                try {
                    a = new f("ShockwaveFlash.ShockwaveFlash");
                } catch (p) {
                    a = null;
                }
                b = !!a;
            }
            return F = b;
        };
        gb = function () {
            var b,
                d,
                e = c.audioFormats;
            if (ta && u.match(/os (1|2|3_0|3_1)/i)) {
                c.hasHTML5 = !1, c.html5Only = !0, c.oMC && (c.oMC.style.display = "none");
            } else if (c.useHTML5Audio) {
                if (!c.html5 || !c.html5.canPlayType) {
                    c._wD("SoundManager: No HTML5 Audio() support detected."), c.hasHTML5 = !1;
                }
                Ra &&
                    c._wD(
                        "soundManager: Note: Buggy HTML5 Audio in Safari on this OS X release, see https://bugs.webkit.org/show_bug.cgi?id\x3d32159 - " +
                        (!F
                            ? " would use flash fallback for MP3/MP4, but none detected."
                            : "will use flash fallback for MP3/MP4, if available"),
                        1);
            }
            if (c.useHTML5Audio && c.hasHTML5) {
                for (d in ba = !0, e) {
                    if (e.hasOwnProperty(d) && e[d].required) {
                        if (c.html5.canPlayType(e[d].type)) {
                            if (c.preferFlash && (c.flash[d] || c.flash[e[d].type])) {
                                b = !0;
                            }
                        } else {
                            ba = !1, b = !0;
                        }
                    }
                }
            }
            c.ignoreFlash && (b = !1, ba = !0);
            c.html5Only = c.hasHTML5 && c.useHTML5Audio && !b;
            return!c.html5Only;
        };
        pa = function (b) {
            var d,
                e,
                a = 0;
            if (b instanceof Array) {
                d = 0;
                for (e = b.length; d < e; d++) {
                    if (b[d] instanceof Object) {
                        if (c.canPlayMIME(b[d].type)) {
                            a =
                                d;
                            break;
                        }
                    } else if (c.canPlayURL(b[d])) {
                        a = d;
                        break;
                    }
                }
                b[a].url && (b[a] = b[a].url);
                b = b[a];
            }
            return b;
        };
        db = function (b) {
            b._hasTimer ||
            (b._hasTimer = !0, !Qa &&
                c.html5PollingInterval &&
                (null === aa && 0 === oa && (aa = setInterval(fb, c.html5PollingInterval)), oa++));
        };
        eb = function (b) { b._hasTimer && (b._hasTimer = !1, !Qa && c.html5PollingInterval && oa--) };
        fb = function () {
            var b;
            if (null !== aa && !oa) {
                return clearInterval(aa), aa = null, !1;
            }
            for (b = c.soundIDs.length - 1; 0 <= b; b--) {
                c.sounds[c.soundIDs[b]].isHTML5 &&
                    c.sounds[c.soundIDs[b]]._hasTimer &&
                    c.sounds[c.soundIDs[b]]._onTimer();
            }
        };
        S = function (b) {
            b = b !== g ? b : {};
            "function" === typeof c.onerror && c.onerror.apply(k, [{ type: b.type !== g ? b.type : null }]);
            b.fatal !== g && b.fatal && c.disable();
        };
        jb = function () {
            if (!Ra || !Na()) {
                return!1;
            }
            var b = c.audioFormats,
                d,
                e;
            for (e in b) {
                if (b.hasOwnProperty(e) && ("mp3" === e || "mp4" === e)) {
                    if (c._wD("soundManager: Using flash fallback for " + e + " format"), c.html5[e] =
                        !1, b[e] && b[e].related) {
                        for (d = b[e].related.length - 1; 0 <= d; d--) {
                            c.html5[b[e].related[d]] = !1;
                        }
                    }
                }
            }
        };
        this._setSandboxType = function (b) {
            var d = c.sandbox;
            d.type = b;
            d.description = d.types[d.types[b] !==
                g
                ? b
                : "unknown"];
            "localWithFile" === d.type
                ? (d.noRemote = !0, d.noLocal = !1, n("secNote", 2))
                : "localWithNetwork" === d.type
                ? (d.noRemote = !1, d.noLocal = !0)
                : "localTrusted" === d.type && (d.noRemote = !1, d.noLocal = !1);
        };
        this._externalInterfaceOK = function (b) {
            if (c.swfLoaded) {
                return!1;
            }
            var d;
            C("swf", !0);
            C("flashtojs", !0);
            c.swfLoaded = !0;
            va = !1;
            Ra && jb();
            if (!b || b.replace(/\+dev/i, "") !== c.versionNumber.replace(/\+dev/i, "")) {
                return d = 'soundManager: Fatal: JavaScript file build "' +
                    c.versionNumber +
                    '" does not match Flash SWF build "' +
                    b +
                    '" at ' +
                    c.url +
                    ". Ensure both are up-to-date.", setTimeout(function () { throw Error(d); }, 0), !1;
            }
            setTimeout(ya, L ? 100 : 1);
        };
        la = function (b, d) {
            function e() {
                var a = [],
                    b,
                    d = [];
                b = "SoundManager " +
                    c.version +
                    (!c.html5Only && c.useHTML5Audio ? c.hasHTML5 ? " + HTML5 audio" : ", no HTML5 audio support" : "");
                c.html5Only
                    ? c.html5PollingInterval && a.push("html5PollingInterval (" + c.html5PollingInterval + "ms)")
                    : (c.preferFlash && a.push("preferFlash"), c.useHighPerformance && a.push("useHighPerformance"),
                        c.flashPollingInterval &&
                            a.push("flashPollingInterval (" +
                                c.flashPollingInterval +
                                "ms)"), c.html5PollingInterval &&
                            a.push("html5PollingInterval (" + c.html5PollingInterval + "ms)"), c.wmode &&
                            a.push("wmode (" + c.wmode + ")"), c.debugFlash && a.push("debugFlash"), c.useFlashBlock &&
                            a.push("flashBlock"));
                a.length && (d = d.concat([a.join(" + ")]));
                c._wD(b + (d.length ? " + " + d.join(", ") : ""), 1);
                kb();
            }

            function a(a, b) { return'\x3cparam name\x3d"' + a + '" value\x3d"' + b + '" /\x3e' }

            if (V && W) {
                return!1;
            }
            if (c.html5Only) {
                return Da(), e(), c.oMC = A(c.movieID), ya(), W = V = !0, !1;
            }
            var f = d || c.url,
                k = c.altURL || f,
                h = ka(),
                l = T(),
                m = null,
                m = p.getElementsByTagName("html")[0],
                n,
                s,
                q,
                m = m && m.dir && m.dir.match(/rtl/i);
            b = b === g ? c.id : b;
            Da();
            c.url = bb(ea ? f : k);
            d = c.url;
            c.wmode = !c.wmode && c.useHighPerformance ? "transparent" : c.wmode;
            if (null !== c.wmode &&
                (u.match(/msie 8/i) || !L && !c.useHighPerformance) &&
                navigator.platform.match(/win32|win64/i)) {
                N.push(I.spcWmode), c.wmode = null;
            }
            h = {
                name: b,
                id: b,
                src: d,
                quality: "high",
                allowScriptAccess: c.allowScriptAccess,
                bgcolor: c.bgColor,
                pluginspage: pb + "www.macromedia.com/go/getflashplayer",
                title: "JS/Flash audio component (SoundManager 2)",
                type: "application/x-shockwave-flash",
                wmode: c.wmode,
                hasPriority: "true"
            };
            c.debugFlash && (h.FlashVars = "debug\x3d1");
            c.wmode || delete h.wmode;
            if (L) {
                f = p.createElement("div"), s = [
                    '\x3cobject id\x3d"' +
                    b +
                    '" data\x3d"' +
                    d +
                    '" type\x3d"' +
                    h.type +
                    '" title\x3d"' +
                    h.title +
                    '" classid\x3d"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase\x3d"' +
                    pb +
                    'download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version\x3d6,0,40,0"\x3e',
                    a("movie", d), a("AllowScriptAccess", c.allowScriptAccess), a("quality", h.quality),
                    c.wmode ? a("wmode", c.wmode) : "", a("bgcolor", c.bgColor), a("hasPriority", "true"),
                    c.debugFlash ? a("FlashVars", h.FlashVars) : "", "\x3c/object\x3e"
                ].join("");
            } else {
                for (n in f = p.createElement("embed"), h) {
                    h.hasOwnProperty(n) && f.setAttribute(n, h[n]);
                }
            }
            Ga();
            l = T();
            if (h = ka()) {
                if (c.oMC = A(c.movieID) || p.createElement("div"), c.oMC.id) {
                    q = c.oMC.className, c.oMC.className =
                        (q ? q + " " : "movieContainer") + (l ? " " + l : ""), c.oMC.appendChild(f), L &&
                    (n = c.oMC.appendChild(p.createElement("div")), n.className = "sm2-object-box", n.innerHTML =
                        s), W = !0;
                } else {
                    c.oMC.id =
                        c.movieID;
                    c.oMC.className = "movieContainer " + l;
                    n = l = null;
                    c.useFlashBlock ||
                    (c.useHighPerformance
                        ? l = {
                            position: "fixed",
                            width: "8px",
                            height: "8px",
                            bottom: "0px",
                            left: "0px",
                            overflow: "hidden"
                        }
                        : (l =
                            { position: "absolute", width: "6px", height: "6px", top: "-9999px", left: "-9999px" }, m &&
                            (l.left = Math.abs(parseInt(l.left, 10)) + "px")));
                    ub && (c.oMC.style.zIndex = 1E4);
                    if (!c.debugFlash) {
                        for (q in l) {
                            l.hasOwnProperty(q) && (c.oMC.style[q] = l[q]);
                        }
                    }
                    try {
                        L || c.oMC.appendChild(f), h.appendChild(c.oMC), L &&
                        (n = c.oMC.appendChild(p.createElement("div")),
                            n.className = "sm2-object-box", n.innerHTML = s), W = !0;
                    } catch (t) {
                        throw Error(r("domError") + " \n" + t.toString());
                    }
                }
            }
            V = !0;
            e();
            return!0;
        };
        ja = function () {
            if (c.html5Only) {
                return la(), !1;
            }
            if (l) {
                return!1;
            }
            if (!c.url) {
                return n("noURL"), !1;
            }
            l = c.getMovie(c.id);
            l ||
            (Z ? (L ? c.oMC.innerHTML = Ia : c.oMC.appendChild(Z), Z = null, V = !0) : la(c.id, c.url), l =
                c.getMovie(c.id));
            "function" === typeof c.oninitmovie && setTimeout(c.oninitmovie, 1);
            Oa();
            return!0;
        };
        Q = function () { setTimeout(Ya, 1E3) };
        Ca = function () {
            k.setTimeout(function () {
                    J(
                        "soundManager: useFlashBlock is false, 100% HTML5 mode is possible. Rebooting with preferFlash: false...");
                    c.setup({ preferFlash: !1 }).reboot();
                    c.didFlashBlock = !0;
                    c.beginDelayedInit();
                },
                1);
        };
        Ya = function () {
            var b,
                d = !1;
            if (!c.url || $) {
                return!1;
            }
            $ = !0;
            x.remove(k, "load", Q);
            if (F && va && !Sa) {
                return n("waitFocus"), !1;
            }
            q || (b = c.getMoviePercent(), 0 < b && 100 > b && (d = !0));
            setTimeout(function () {
                    b = c.getMoviePercent();
                    if (d) {
                        return $ = !1, c._wD(r("waitSWF")), k.setTimeout(Q, 1), !1;
                    }
                    q ||
                    (c._wD("soundManager: No Flash response within expected time. Likely causes: " +
                            (0 === b ? "SWF load failed, " : "") +
                            "Flash blocked or JS-Flash security error." +
                            (c.debugFlash ? " " + r("checkSWF") : ""),
                            2), !ea && b && (n("localFail", 2), c.debugFlash || n("tryDebug", 2)),
                        0 === b && c._wD(r("swf404", c.url), 1), C("flashtojs",
                            !1,
                            ": Timed out" + ea
                            ? " (Check flash security or flash blockers)"
                            : " (No plugin/missing SWF?)"));
                    !q &&
                        nb &&
                        (null === b
                            ? c.useFlashBlock || 0 === c.flashLoadTimeout
                            ? (c.useFlashBlock && Ja(), n("waitForever"))
                            : !c.useFlashBlock && ba
                            ? Ca()
                            : (n("waitForever"), M(
                                { type: "ontimeout", ignoreInit: !0, error: { type: "INIT_FLASHBLOCK" } }))
                            : 0 === c.flashLoadTimeout
                            ? n("waitForever")
                            : !c.useFlashBlock && ba
                            ? Ca()
                            : Ha(!0));
                },
                c.flashLoadTimeout);
        };
        ia = function () {
            if (Sa || !va) {
                return x.remove(k, "focus", ia), !0;
            }
            Sa = nb = !0;
            n("gotFocus");
            $ = !1;
            Q();
            x.remove(k, "focus", ia);
            return!0;
        };
        Oa = function () { N.length && (c._wD("SoundManager 2: " + N.join(" "), 1), N = []) };
        kb = function () {
            Oa();
            var b,
                d = [];
            if (c.useHTML5Audio && c.hasHTML5) {
                for (b in c.audioFormats) {
                    c.audioFormats.hasOwnProperty(b) &&
                        d.push(b +
                            " \x3d " +
                            c.html5[b] +
                            (!c.html5[b] && z && c.flash[b]
                                ? " (using flash)"
                                : c.preferFlash && c.flash[b] && z
                                ? " (preferring flash)"
                                : !c.html5[b]
                                ? " (" + (c.audioFormats[b].required ? "required, " : "") + "and no flash support)"
                                : ""));
                }
                c._wD("SoundManager 2 HTML5 support: " + d.join(", "), 1);
            }
        };
        X = function (b) {
            if (q) {
                return!1;
            }
            if (c.html5Only) {
                return n("sm2Loaded"), q = !0, P(), C("onload", !0), !0;
            }
            var d = !0,
                e;
            if (!c.useFlashBlock || !c.flashLoadTimeout || c.getMoviePercent()) {
                q = !0;
            }
            e = { type: !F && z ? "NO_FLASH" : "INIT_TIMEOUT" };
            c._wD("SoundManager 2 " +
                (t ? "failed to load" : "loaded") +
                " (" +
                (t ? "Flash security/load error" : "OK") +
                ")",
                t ? 2 : 1);
            t || b
                ? (c.useFlashBlock &&
                    c.oMC &&
                    (c.oMC.className = T() + " " + (null === c.getMoviePercent() ? "swf_timedout" : "swf_error")), M({
                    type: "ontimeout",
                    error: e,
                    ignoreInit: !0
                }), C("onload", !1), S(e), d = !1)
                : C("onload", !0);
            t ||
            (c.waitForWindowLoad && !ha
                ? (n("waitOnload"), x.add(k, "load", P))
                : (c.waitForWindowLoad && ha && n("docLoaded"), P()));
            return d;
        };
        Xa = function () {
            var b,
                d = c.setupOptions;
            for (b in d) {
                d.hasOwnProperty(b) && (c[b] === g ? c[b] = d[b] : c[b] !== d[b] && (c.setupOptions[b] = c[b]));
            }
        };
        ya = function () {
            if (q) {
                return n("didInit"), !1;
            }
            if (c.html5Only) {
                return q || (x.remove(k, "load", c.beginDelayedInit), c.enabled = !0, X()), !0;
            }
            ja();
            try {
                l._externalInterfaceTest(!1),
                    Za(!0, c.flashPollingInterval || (c.useHighPerformance ? 10 : 50)),
                    c.debugMode || l._disableDebug(), c.enabled =
                        !0, C("jstoflash", !0), c.html5Only || x.add(k, "unload", xa);
            } catch (b) {
                return c._wD("js/flash exception: " + b.toString()), C("jstoflash", !1), S({
                    type: "JS_TO_FLASH_EXCEPTION",
                    fatal: !0
                }), Ha(!0), X(), !1;
            }
            X();
            x.remove(k, "load", c.beginDelayedInit);
            return!0;
        };
        R = function () {
            if (Y) {
                return!1;
            }
            Y = !0;
            Xa();
            Ga();
            var b = null,
                b = null,
                d = U.toLowerCase();
            -1 !== d.indexOf("sm2-usehtml5audio\x3d") &&
            (b = "1" ===
                    d.charAt(d.indexOf("sm2-usehtml5audio\x3d") +
                        18), da && console.log((b ? "Enabling " : "Disabling ") + "useHTML5Audio via URL parameter"),
                c.setup({ useHTML5Audio: b }));
            -1 !== d.indexOf("sm2-preferflash\x3d") &&
            (b = "1" === d.charAt(d.indexOf("sm2-preferflash\x3d") + 16), da &&
                console.log((b ? "Enabling " : "Disabling ") + "preferFlash via URL parameter"), c.setup({
                preferFlash: b
            }));
            !F &&
                c.hasHTML5 &&
                (c._wD("SoundManager 2: No Flash detected" +
                    (!c.useHTML5Audio ? ", enabling HTML5." : ". Trying HTML5-only mode."),
                    1), c.setup({ useHTML5Audio: !0, preferFlash: !1 }));
            hb();
            !F &&
                z &&
                (N.push(I.needFlash),
                    c.setup({ flashLoadTimeout: 1 }));
            p.removeEventListener && p.removeEventListener("DOMContentLoaded", R, !1);
            ja();
            return!0;
        };
        La = function () {
            "complete" === p.readyState && (R(), p.detachEvent("onreadystatechange", La));
            return!0;
        };
        Fa = function () {
            ha = !0;
            x.remove(k, "load", Fa);
        };
        Ea = function () {
            if (Qa &&
            ((!c.setupOptions.useHTML5Audio || c.setupOptions.preferFlash) && N.push(I.mobileUA),
                c.setupOptions.useHTML5Audio = !0, c.setupOptions.preferFlash =
                    !1, ta || mb && !u.match(/android\s2\.3/i))) {
                N.push(I.globalHTML5), ta && (c.ignoreFlash = !0), E =
                    !0;
            }
        };
        Ea();
        Na();
        x.add(k, "focus", ia);
        x.add(k, "load", Q);
        x.add(k, "load", Fa);
        p.addEventListener
            ? p.addEventListener("DOMContentLoaded", R, !1)
            : p.attachEvent
            ? p.attachEvent("onreadystatechange", La)
            : (C("onload", !1), S({ type: "NO_DOM2_EVENTS", fatal: !0 }));
    }

    var wa = null;
    if (void 0 === k.SM2_DEFER || !SM2_DEFER) {
        wa = new fa;
    }
    k.SoundManager = fa;
    k.soundManager = wa;
})(window);