var mpc = window.navigator.userAgent;
if(/Mobile|iP(hone|ad)|Android|BlackBerry|IEMobile/.test(mpc)) {
    var head = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = '//www.eol.cn/e_css/list/2018/mlist.css';
    link.id = 'mlistcss';

    $('link').each(function(index, el) {
        var href = $(el).attr('href');
        if(href == '//www.eol.cn/e_css/list/2018/list.css') {
            link.href = '//www.eol.cn/e_css/list/2018/mlist.css';
        }else if(href == '//www.eol.cn/e_css/article/2018/article.css'){
            link.href = '//www.eol.cn/e_css/article/2018/marticle.css';
        }
    });
    head.appendChild(link);
    var meta =  document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=750, user-scalable=no';
    head.appendChild(meta);
}
! function(r) {
    "use strict";

    function t(t, e, n, o) {
        function i(r, t) {
            return r -= o, t -= o, !(0 > r || r >= u || 0 > t || t >= u) && a.isDark(r, t)
        }
        var a = r(n, e);
        a.addData(t), a.make(), o = o || 0;
        var u = a.getModuleCount(),
            f = a.getModuleCount() + 2 * o,
            c = function(r, t, e, n) {
                var o = this.isDark,
                    i = 1 / f;
                this.isDark = function(a, u) {
                    var f = u * i,
                        c = a * i,
                        s = f + i,
                        l = c + i;
                    return o(a, u) && (r > s || f > e || t > l || c > n)
                }
            };
        this.text = t, this.level = e, this.version = n, this.moduleCount = f, this.isDark = i, this.addBlank = c
    }

    function e(r, e, n, o, i) {
        n = Math.max(1, n || 1), o = Math.min(40, o || 40);
        for(var a = n; o >= a; a += 1) try {
            return new t(r, e, a, i)
        } catch(r) {}
    }

    function n(r, t, e) {
        var n = e.size,
            o = "bold " + e.mSize * n + "px " + e.fontname,
            i = p("<canvas/>")[0].getContext("2d");
        i.font = o;
        var a = i.measureText(e.label).width,
            u = e.mSize,
            f = a / n,
            c = (1 - f) * e.mPosX,
            s = (1 - u) * e.mPosY,
            l = c + f,
            h = s + u,
            d = .01;
        1 === e.mode ? r.addBlank(0, s - d, n, h + d) : r.addBlank(c - d, s - d, l + d, h + d), t.fillStyle = e.fontcolor, t.font = o, t.fillText(e.label, c * n, s * n + .75 * e.mSize * n)
    }

    function o(r, t, e) {
        var n = e.size,
            o = e.image.naturalWidth || 1,
            i = e.image.naturalHeight || 1,
            a = e.mSize,
            u = a * o / i,
            f = (1 - u) * e.mPosX,
            c = (1 - a) * e.mPosY,
            s = f + u,
            l = c + a,
            h = .01;
        3 === e.mode ? r.addBlank(0, c - h, n, l + h) : r.addBlank(f - h, c - h, s + h, l + h), t.drawImage(e.image, f * n, c * n, u * n, a * n)
    }

    function i(r, t, e) {
        p(e.background).is("img") ? t.drawImage(e.background, 0, 0, e.size, e.size) : e.background && (t.fillStyle = e.background, t.fillRect(e.left, e.top, e.size, e.size));
        var i = e.mode;
        1 === i || 2 === i ? n(r, t, e) : (3 === i || 4 === i) && o(r, t, e)
    }

    function a(r, t, e, n, o, i, a, u) {
        r.isDark(a, u) && t.rect(n, o, i, i)
    }

    function u(r, t, e, n, o, i, a, u, f, c) {
        a ? r.moveTo(t + i, e) : r.moveTo(t, e), u ? (r.lineTo(n - i, e), r.arcTo(n, e, n, o, i)) : r.lineTo(n, e), f ? (r.lineTo(n, o - i), r.arcTo(n, o, t, o, i)) : r.lineTo(n, o), c ? (r.lineTo(t + i, o), r.arcTo(t, o, t, e, i)) : r.lineTo(t, o), a ? (r.lineTo(t, e + i), r.arcTo(t, e, n, e, i)) : r.lineTo(t, e)
    }

    function f(r, t, e, n, o, i, a, u, f, c) {
        a && (r.moveTo(t + i, e), r.lineTo(t, e), r.lineTo(t, e + i), r.arcTo(t, e, t + i, e, i)), u && (r.moveTo(n - i, e), r.lineTo(n, e), r.lineTo(n, e + i), r.arcTo(n, e, n - i, e, i)), f && (r.moveTo(n - i, o), r.lineTo(n, o), r.lineTo(n, o - i), r.arcTo(n, o, n - i, o, i)), c && (r.moveTo(t + i, o), r.lineTo(t, o), r.lineTo(t, o - i), r.arcTo(t, o, t + i, o, i))
    }

    function c(r, t, e, n, o, i, a, c) {
        var s = r.isDark,
            l = n + i,
            h = o + i,
            d = e.radius * i,
            g = a - 1,
            v = a + 1,
            p = c - 1,
            w = c + 1,
            m = s(a, c),
            T = s(g, p),
            y = s(g, c),
            E = s(g, w),
            A = s(a, w),
            B = s(v, w),
            k = s(v, c),
            b = s(v, p),
            C = s(a, p);
        m ? u(t, n, o, l, h, d, !y && !C, !y && !A, !k && !A, !k && !C) : f(t, n, o, l, h, d, y && C && T, y && A && E, k && A && B, k && C && b)
    }

    function s(r, t, e) {
        var n, o, i = r.moduleCount,
            u = e.size / i,
            f = a;
        for(m && e.radius > 0 && e.radius <= .5 && (f = c), t.beginPath(), n = 0; i > n; n += 1)
            for(o = 0; i > o; o += 1) {
                var s = e.left + o * u,
                    l = e.top + n * u,
                    h = u;
                f(r, t, e, s, l, h, n, o)
            }
        if(p(e.fill).is("img")) {
            t.strokeStyle = "rgba(0,0,0,0.5)", t.lineWidth = 2, t.stroke();
            var d = t.globalCompositeOperation;
            t.globalCompositeOperation = "destination-out", t.fill(), t.globalCompositeOperation = d, t.clip(), t.drawImage(e.fill, 0, 0, e.size, e.size), t.restore()
        } else t.fillStyle = e.fill, t.fill()
    }

    function l(r, t) {
        var n = e(t.text, t.ecLevel, t.minVersion, t.maxVersion, t.quiet);
        if(!n) return null;
        var o = p(r).data("qrcode", n),
            a = o[0].getContext("2d");
        return i(n, a, t), s(n, a, t), o
    }

    function h(r) {
        var t = p("<canvas/>").attr("width", r.size).attr("height", r.size);
        return l(t, r)
    }

    function d(r) {
        return p("<img/>").attr("src", h(r)[0].toDataURL("image/png"))
    }

    function g(r) {
        var t = e(r.text, r.ecLevel, r.minVersion, r.maxVersion, r.quiet);
        if(!t) return null;
        var n, o, i = r.size,
            a = r.background,
            u = Math.floor,
            f = t.moduleCount,
            c = u(i / f),
            s = u(.5 * (i - c * f)),
            l = {
                position: "relative",
                left: 0,
                top: 0,
                padding: 0,
                margin: 0,
                width: i,
                height: i
            },
            h = {
                position: "absolute",
                padding: 0,
                margin: 0,
                width: c,
                height: c,
                "background-color": r.fill
            },
            d = p("<div/>").data("qrcode", t).css(l);
        for(a && d.css("background-color", a), n = 0; f > n; n += 1)
            for(o = 0; f > o; o += 1) t.isDark(n, o) && p("<div/>").css(h).css({
                left: s + o * c,
                top: s + n * c
            }).appendTo(d);
        return d
    }

    function v(r) {
        return w && "canvas" === r.render ? h(r) : w && "image" === r.render ? d(r) : g(r)
    }
    var p = jQuery,
        w = function() {
            var r = document.createElement("canvas");
            return Boolean(r.getContext && r.getContext("2d"))
        }(),
        m = "[object Opera]" !== Object.prototype.toString.call(window.opera),
        T = {
            render: "canvas",
            minVersion: 1,
            maxVersion: 40,
            ecLevel: "L",
            left: 0,
            top: 0,
            size: 200,
            fill: "#000",
            background: null,
            text: "no text",
            radius: 0,
            quiet: 0,
            mode: 0,
            mSize: .1,
            mPosX: .5,
            mPosY: .5,
            label: "no label",
            fontname: "sans",
            fontcolor: "#000",
            image: null
        };
    p.fn.qrcode = function(r) {
        var t = p.extend({}, T, r);
        return this.each(function() {
            "canvas" === this.nodeName.toLowerCase() ? l(this, t) : p(this).append(v(t))
        })
    }
}(function() {
    var r = function() {
        function r(t, e) {
            if("undefined" == typeof t.length) throw new Error(t.length + "/" + e);
            var n = function() {
                    for(var r = 0; r < t.length && 0 == t[r];) r += 1;
                    for(var n = new Array(t.length - r + e), o = 0; o < t.length - r; o += 1) n[o] = t[o + r];
                    return n
                }(),
                o = {};
            return o.getAt = function(r) {
                return n[r]
            }, o.getLength = function() {
                return n.length
            }, o.multiply = function(t) {
                for(var e = new Array(o.getLength() + t.getLength() - 1), n = 0; n < o.getLength(); n += 1)
                    for(var i = 0; i < t.getLength(); i += 1) e[n + i] ^= a.gexp(a.glog(o.getAt(n)) + a.glog(t.getAt(i)));
                return r(e, 0)
            }, o.mod = function(t) {
                if(o.getLength() - t.getLength() < 0) return o;
                for(var e = a.glog(o.getAt(0)) - a.glog(t.getAt(0)), n = new Array(o.getLength()), i = 0; i < o.getLength(); i += 1) n[i] = o.getAt(i);
                for(var i = 0; i < t.getLength(); i += 1) n[i] ^= a.gexp(a.glog(t.getAt(i)) + e);
                return r(n, 0).mod(t)
            }, o
        }
        var t = function(t, e) {
            var o = 236,
                a = 17,
                s = t,
                l = n[e],
                h = null,
                d = 0,
                v = null,
                p = new Array,
                w = {},
                m = function(r, t) {
                    d = 4 * s + 17, h = function(r) {
                        for(var t = new Array(r), e = 0; r > e; e += 1) {
                            t[e] = new Array(r);
                            for(var n = 0; r > n; n += 1) t[e][n] = null
                        }
                        return t
                    }(d), T(0, 0), T(d - 7, 0), T(0, d - 7), A(), E(), k(r, t), s >= 7 && B(r), null == v && (v = M(s, l, p)), b(v, t)
                },
                T = function(r, t) {
                    for(var e = -1; 7 >= e; e += 1)
                        if(!(-1 >= r + e || r + e >= d))
                            for(var n = -1; 7 >= n; n += 1) - 1 >= t + n || t + n >= d || (e >= 0 && 6 >= e && (0 == n || 6 == n) || n >= 0 && 6 >= n && (0 == e || 6 == e) || e >= 2 && 4 >= e && n >= 2 && 4 >= n ? h[r + e][t + n] = !0 : h[r + e][t + n] = !1)
                },
                y = function() {
                    for(var r = 0, t = 0, e = 0; 8 > e; e += 1) {
                        m(!0, e);
                        var n = i.getLostPoint(w);
                        (0 == e || r > n) && (r = n, t = e)
                    }
                    return t
                },
                E = function() {
                    for(var r = 8; d - 8 > r; r += 1) null == h[r][6] && (h[r][6] = r % 2 == 0);
                    for(var t = 8; d - 8 > t; t += 1) null == h[6][t] && (h[6][t] = t % 2 == 0)
                },
                A = function() {
                    for(var r = i.getPatternPosition(s), t = 0; t < r.length; t += 1)
                        for(var e = 0; e < r.length; e += 1) {
                            var n = r[t],
                                o = r[e];
                            if(null == h[n][o])
                                for(var a = -2; 2 >= a; a += 1)
                                    for(var u = -2; 2 >= u; u += 1) - 2 == a || 2 == a || -2 == u || 2 == u || 0 == a && 0 == u ? h[n + a][o + u] = !0 : h[n + a][o + u] = !1
                        }
                },
                B = function(r) {
                    for(var t = i.getBCHTypeNumber(s), e = 0; 18 > e; e += 1) {
                        var n = !r && 1 == (t >> e & 1);
                        h[Math.floor(e / 3)][e % 3 + d - 8 - 3] = n
                    }
                    for(var e = 0; 18 > e; e += 1) {
                        var n = !r && 1 == (t >> e & 1);
                        h[e % 3 + d - 8 - 3][Math.floor(e / 3)] = n
                    }
                },
                k = function(r, t) {
                    for(var e = l << 3 | t, n = i.getBCHTypeInfo(e), o = 0; 15 > o; o += 1) {
                        var a = !r && 1 == (n >> o & 1);
                        6 > o ? h[o][8] = a : 8 > o ? h[o + 1][8] = a : h[d - 15 + o][8] = a
                    }
                    for(var o = 0; 15 > o; o += 1) {
                        var a = !r && 1 == (n >> o & 1);
                        8 > o ? h[8][d - o - 1] = a : 9 > o ? h[8][15 - o - 1 + 1] = a : h[8][15 - o - 1] = a
                    }
                    h[d - 8][8] = !r
                },
                b = function(r, t) {
                    for(var e = -1, n = d - 1, o = 7, a = 0, u = i.getMaskFunction(t), f = d - 1; f > 0; f -= 2)
                        for(6 == f && (f -= 1);;) {
                            for(var c = 0; 2 > c; c += 1)
                                if(null == h[n][f - c]) {
                                    var s = !1;
                                    a < r.length && (s = 1 == (r[a] >>> o & 1));
                                    var l = u(n, f - c);
                                    l && (s = !s), h[n][f - c] = s, o -= 1, -1 == o && (a += 1, o = 7)
                                }
                            if(n += e, 0 > n || n >= d) {
                                n -= e, e = -e;
                                break
                            }
                        }
                },
                C = function(t, e) {
                    for(var n = 0, o = 0, a = 0, u = new Array(e.length), f = new Array(e.length), c = 0; c < e.length; c += 1) {
                        var s = e[c].dataCount,
                            l = e[c].totalCount - s;
                        o = Math.max(o, s), a = Math.max(a, l), u[c] = new Array(s);
                        for(var h = 0; h < u[c].length; h += 1) u[c][h] = 255 & t.getBuffer()[h + n];
                        n += s;
                        var d = i.getErrorCorrectPolynomial(l),
                            g = r(u[c], d.getLength() - 1),
                            v = g.mod(d);
                        f[c] = new Array(d.getLength() - 1);
                        for(var h = 0; h < f[c].length; h += 1) {
                            var p = h + v.getLength() - f[c].length;
                            f[c][h] = p >= 0 ? v.getAt(p) : 0
                        }
                    }
                    for(var w = 0, h = 0; h < e.length; h += 1) w += e[h].totalCount;
                    for(var m = new Array(w), T = 0, h = 0; o > h; h += 1)
                        for(var c = 0; c < e.length; c += 1) h < u[c].length && (m[T] = u[c][h], T += 1);
                    for(var h = 0; a > h; h += 1)
                        for(var c = 0; c < e.length; c += 1) h < f[c].length && (m[T] = f[c][h], T += 1);
                    return m
                },
                M = function(r, t, e) {
                    for(var n = u.getRSBlocks(r, t), c = f(), s = 0; s < e.length; s += 1) {
                        var l = e[s];
                        c.put(l.getMode(), 4), c.put(l.getLength(), i.getLengthInBits(l.getMode(), r)), l.write(c)
                    }
                    for(var h = 0, s = 0; s < n.length; s += 1) h += n[s].dataCount;
                    if(c.getLengthInBits() > 8 * h) throw new Error("code length overflow. (" + c.getLengthInBits() + ">" + 8 * h + ")");
                    for(c.getLengthInBits() + 4 <= 8 * h && c.put(0, 4); c.getLengthInBits() % 8 != 0;) c.putBit(!1);
                    for(; !(c.getLengthInBits() >= 8 * h) && (c.put(o, 8), !(c.getLengthInBits() >= 8 * h));) c.put(a, 8);
                    return C(c, n)
                };
            return w.addData = function(r) {
                var t = c(r);
                p.push(t), v = null
            }, w.isDark = function(r, t) {
                if(0 > r || r >= d || 0 > t || t >= d) throw new Error(r + "," + t);
                return h[r][t]
            }, w.getModuleCount = function() {
                return d
            }, w.make = function() {
                m(!1, y())
            }, w.createTableTag = function(r, t) {
                r = r || 2, t = "undefined" == typeof t ? 4 * r : t;
                var e = "";
                e += '<table style="', e += " border-width: 0px; border-style: none;", e += " border-collapse: collapse;", e += " padding: 0px; margin: " + t + "px;", e += '">', e += "<tbody>";
                for(var n = 0; n < w.getModuleCount(); n += 1) {
                    e += "<tr>";
                    for(var o = 0; o < w.getModuleCount(); o += 1) e += '<td style="', e += " border-width: 0px; border-style: none;", e += " border-collapse: collapse;", e += " padding: 0px; margin: 0px;", e += " width: " + r + "px;", e += " height: " + r + "px;", e += " background-color: ", e += w.isDark(n, o) ? "#000000" : "#ffffff", e += ";", e += '"/>';
                    e += "</tr>"
                }
                return e += "</tbody>", e += "</table>"
            }, w.createImgTag = function(r, t) {
                r = r || 2, t = "undefined" == typeof t ? 4 * r : t;
                var e = w.getModuleCount() * r + 2 * t,
                    n = t,
                    o = e - t;
                return g(e, e, function(t, e) {
                    if(t >= n && o > t && e >= n && o > e) {
                        var i = Math.floor((t - n) / r),
                            a = Math.floor((e - n) / r);
                        return w.isDark(a, i) ? 0 : 1
                    }
                    return 1
                })
            }, w
        };
        t.stringToBytes = function(r) {
            for(var t = new Array, e = 0; e < r.length; e += 1) {
                var n = r.charCodeAt(e);
                t.push(255 & n)
            }
            return t
        }, t.createStringToBytes = function(r, t) {
            var e = function() {
                    for(var e = h(r), n = function() {
                            var r = e.read();
                            if(-1 == r) throw new Error;
                            return r
                        }, o = 0, i = {};;) {
                        var a = e.read();
                        if(-1 == a) break;
                        var u = n(),
                            f = n(),
                            c = n(),
                            s = String.fromCharCode(a << 8 | u),
                            l = f << 8 | c;
                        i[s] = l, o += 1
                    }
                    if(o != t) throw new Error(o + " != " + t);
                    return i
                }(),
                n = "?".charCodeAt(0);
            return function(r) {
                for(var t = new Array, o = 0; o < r.length; o += 1) {
                    var i = r.charCodeAt(o);
                    if(128 > i) t.push(i);
                    else {
                        var a = e[r.charAt(o)];
                        "number" == typeof a ? (255 & a) == a ? t.push(a) : (t.push(a >>> 8), t.push(255 & a)) : t.push(n)
                    }
                }
                return t
            }
        };
        var e = {
                MODE_NUMBER: 1,
                MODE_ALPHA_NUM: 2,
                MODE_8BIT_BYTE: 4,
                MODE_KANJI: 8
            },
            n = {
                L: 1,
                M: 0,
                Q: 3,
                H: 2
            },
            o = {
                PATTERN000: 0,
                PATTERN001: 1,
                PATTERN010: 2,
                PATTERN011: 3,
                PATTERN100: 4,
                PATTERN101: 5,
                PATTERN110: 6,
                PATTERN111: 7
            },
            i = function() {
                var t = [
                        [],
                        [6, 18],
                        [6, 22],
                        [6, 26],
                        [6, 30],
                        [6, 34],
                        [6, 22, 38],
                        [6, 24, 42],
                        [6, 26, 46],
                        [6, 28, 50],
                        [6, 30, 54],
                        [6, 32, 58],
                        [6, 34, 62],
                        [6, 26, 46, 66],
                        [6, 26, 48, 70],
                        [6, 26, 50, 74],
                        [6, 30, 54, 78],
                        [6, 30, 56, 82],
                        [6, 30, 58, 86],
                        [6, 34, 62, 90],
                        [6, 28, 50, 72, 94],
                        [6, 26, 50, 74, 98],
                        [6, 30, 54, 78, 102],
                        [6, 28, 54, 80, 106],
                        [6, 32, 58, 84, 110],
                        [6, 30, 58, 86, 114],
                        [6, 34, 62, 90, 118],
                        [6, 26, 50, 74, 98, 122],
                        [6, 30, 54, 78, 102, 126],
                        [6, 26, 52, 78, 104, 130],
                        [6, 30, 56, 82, 108, 134],
                        [6, 34, 60, 86, 112, 138],
                        [6, 30, 58, 86, 114, 142],
                        [6, 34, 62, 90, 118, 146],
                        [6, 30, 54, 78, 102, 126, 150],
                        [6, 24, 50, 76, 102, 128, 154],
                        [6, 28, 54, 80, 106, 132, 158],
                        [6, 32, 58, 84, 110, 136, 162],
                        [6, 26, 54, 82, 110, 138, 166],
                        [6, 30, 58, 86, 114, 142, 170]
                    ],
                    n = 1335,
                    i = 7973,
                    u = 21522,
                    f = {},
                    c = function(r) {
                        for(var t = 0; 0 != r;) t += 1, r >>>= 1;
                        return t
                    };
                return f.getBCHTypeInfo = function(r) {
                    for(var t = r << 10; c(t) - c(n) >= 0;) t ^= n << c(t) - c(n);
                    return(r << 10 | t) ^ u
                }, f.getBCHTypeNumber = function(r) {
                    for(var t = r << 12; c(t) - c(i) >= 0;) t ^= i << c(t) - c(i);
                    return r << 12 | t
                }, f.getPatternPosition = function(r) {
                    return t[r - 1]
                }, f.getMaskFunction = function(r) {
                    switch(r) {
                    case o.PATTERN000:
                        return function(r, t) {
                            return(r + t) % 2 == 0
                        };
                    case o.PATTERN001:
                        return function(r, t) {
                            return r % 2 == 0
                        };
                    case o.PATTERN010:
                        return function(r, t) {
                            return t % 3 == 0
                        };
                    case o.PATTERN011:
                        return function(r, t) {
                            return(r + t) % 3 == 0
                        };
                    case o.PATTERN100:
                        return function(r, t) {
                            return(Math.floor(r / 2) + Math.floor(t / 3)) % 2 == 0
                        };
                    case o.PATTERN101:
                        return function(r, t) {
                            return r * t % 2 + r * t % 3 == 0
                        };
                    case o.PATTERN110:
                        return function(r, t) {
                            return(r * t % 2 + r * t % 3) % 2 == 0
                        };
                    case o.PATTERN111:
                        return function(r, t) {
                            return(r * t % 3 + (r + t) % 2) % 2 == 0
                        };
                    default:
                        throw new Error("bad maskPattern:" + r)
                    }
                }, f.getErrorCorrectPolynomial = function(t) {
                    for(var e = r([1], 0), n = 0; t > n; n += 1) e = e.multiply(r([1, a.gexp(n)], 0));
                    return e
                }, f.getLengthInBits = function(r, t) {
                    if(t >= 1 && 10 > t) switch(r) {
                    case e.MODE_NUMBER:
                        return 10;
                    case e.MODE_ALPHA_NUM:
                        return 9;
                    case e.MODE_8BIT_BYTE:
                        return 8;
                    case e.MODE_KANJI:
                        return 8;
                    default:
                        throw new Error("mode:" + r)
                    } else if(27 > t) switch(r) {
                    case e.MODE_NUMBER:
                        return 12;
                    case e.MODE_ALPHA_NUM:
                        return 11;
                    case e.MODE_8BIT_BYTE:
                        return 16;
                    case e.MODE_KANJI:
                        return 10;
                    default:
                        throw new Error("mode:" + r)
                    } else {
                        if(!(41 > t)) throw new Error("type:" + t);
                        switch(r) {
                        case e.MODE_NUMBER:
                            return 14;
                        case e.MODE_ALPHA_NUM:
                            return 13;
                        case e.MODE_8BIT_BYTE:
                            return 16;
                        case e.MODE_KANJI:
                            return 12;
                        default:
                            throw new Error("mode:" + r)
                        }
                    }
                }, f.getLostPoint = function(r) {
                    for(var t = r.getModuleCount(), e = 0, n = 0; t > n; n += 1)
                        for(var o = 0; t > o; o += 1) {
                            for(var i = 0, a = r.isDark(n, o), u = -1; 1 >= u; u += 1)
                                if(!(0 > n + u || n + u >= t))
                                    for(var f = -1; 1 >= f; f += 1) 0 > o + f || o + f >= t || (0 != u || 0 != f) && a == r.isDark(n + u, o + f) && (i += 1);
                            i > 5 && (e += 3 + i - 5)
                        }
                    for(var n = 0; t - 1 > n; n += 1)
                        for(var o = 0; t - 1 > o; o += 1) {
                            var c = 0;
                            r.isDark(n, o) && (c += 1), r.isDark(n + 1, o) && (c += 1), r.isDark(n, o + 1) && (c += 1), r.isDark(n + 1, o + 1) && (c += 1), (0 == c || 4 == c) && (e += 3)
                        }
                    for(var n = 0; t > n; n += 1)
                        for(var o = 0; t - 6 > o; o += 1) r.isDark(n, o) && !r.isDark(n, o + 1) && r.isDark(n, o + 2) && r.isDark(n, o + 3) && r.isDark(n, o + 4) && !r.isDark(n, o + 5) && r.isDark(n, o + 6) && (e += 40);
                    for(var o = 0; t > o; o += 1)
                        for(var n = 0; t - 6 > n; n += 1) r.isDark(n, o) && !r.isDark(n + 1, o) && r.isDark(n + 2, o) && r.isDark(n + 3, o) && r.isDark(n + 4, o) && !r.isDark(n + 5, o) && r.isDark(n + 6, o) && (e += 40);
                    for(var s = 0, o = 0; t > o; o += 1)
                        for(var n = 0; t > n; n += 1) r.isDark(n, o) && (s += 1);
                    var l = Math.abs(100 * s / t / t - 50) / 5;
                    return e += 10 * l
                }, f
            }(),
            a = function() {
                for(var r = new Array(256), t = new Array(256), e = 0; 8 > e; e += 1) r[e] = 1 << e;
                for(var e = 8; 256 > e; e += 1) r[e] = r[e - 4] ^ r[e - 5] ^ r[e - 6] ^ r[e - 8];
                for(var e = 0; 255 > e; e += 1) t[r[e]] = e;
                var n = {};
                return n.glog = function(r) {
                    if(1 > r) throw new Error("glog(" + r + ")");
                    return t[r]
                }, n.gexp = function(t) {
                    for(; 0 > t;) t += 255;
                    for(; t >= 256;) t -= 255;
                    return r[t]
                }, n
            }(),
            u = function() {
                var r = [
                        [1, 26, 19],
                        [1, 26, 16],
                        [1, 26, 13],
                        [1, 26, 9],
                        [1, 44, 34],
                        [1, 44, 28],
                        [1, 44, 22],
                        [1, 44, 16],
                        [1, 70, 55],
                        [1, 70, 44],
                        [2, 35, 17],
                        [2, 35, 13],
                        [1, 100, 80],
                        [2, 50, 32],
                        [2, 50, 24],
                        [4, 25, 9],
                        [1, 134, 108],
                        [2, 67, 43],
                        [2, 33, 15, 2, 34, 16],
                        [2, 33, 11, 2, 34, 12],
                        [2, 86, 68],
                        [4, 43, 27],
                        [4, 43, 19],
                        [4, 43, 15],
                        [2, 98, 78],
                        [4, 49, 31],
                        [2, 32, 14, 4, 33, 15],
                        [4, 39, 13, 1, 40, 14],
                        [2, 121, 97],
                        [2, 60, 38, 2, 61, 39],
                        [4, 40, 18, 2, 41, 19],
                        [4, 40, 14, 2, 41, 15],
                        [2, 146, 116],
                        [3, 58, 36, 2, 59, 37],
                        [4, 36, 16, 4, 37, 17],
                        [4, 36, 12, 4, 37, 13],
                        [2, 86, 68, 2, 87, 69],
                        [4, 69, 43, 1, 70, 44],
                        [6, 43, 19, 2, 44, 20],
                        [6, 43, 15, 2, 44, 16],
                        [4, 101, 81],
                        [1, 80, 50, 4, 81, 51],
                        [4, 50, 22, 4, 51, 23],
                        [3, 36, 12, 8, 37, 13],
                        [2, 116, 92, 2, 117, 93],
                        [6, 58, 36, 2, 59, 37],
                        [4, 46, 20, 6, 47, 21],
                        [7, 42, 14, 4, 43, 15],
                        [4, 133, 107],
                        [8, 59, 37, 1, 60, 38],
                        [8, 44, 20, 4, 45, 21],
                        [12, 33, 11, 4, 34, 12],
                        [3, 145, 115, 1, 146, 116],
                        [4, 64, 40, 5, 65, 41],
                        [11, 36, 16, 5, 37, 17],
                        [11, 36, 12, 5, 37, 13],
                        [5, 109, 87, 1, 110, 88],
                        [5, 65, 41, 5, 66, 42],
                        [5, 54, 24, 7, 55, 25],
                        [11, 36, 12, 7, 37, 13],
                        [5, 122, 98, 1, 123, 99],
                        [7, 73, 45, 3, 74, 46],
                        [15, 43, 19, 2, 44, 20],
                        [3, 45, 15, 13, 46, 16],
                        [1, 135, 107, 5, 136, 108],
                        [10, 74, 46, 1, 75, 47],
                        [1, 50, 22, 15, 51, 23],
                        [2, 42, 14, 17, 43, 15],
                        [5, 150, 120, 1, 151, 121],
                        [9, 69, 43, 4, 70, 44],
                        [17, 50, 22, 1, 51, 23],
                        [2, 42, 14, 19, 43, 15],
                        [3, 141, 113, 4, 142, 114],
                        [3, 70, 44, 11, 71, 45],
                        [17, 47, 21, 4, 48, 22],
                        [9, 39, 13, 16, 40, 14],
                        [3, 135, 107, 5, 136, 108],
                        [3, 67, 41, 13, 68, 42],
                        [15, 54, 24, 5, 55, 25],
                        [15, 43, 15, 10, 44, 16],
                        [4, 144, 116, 4, 145, 117],
                        [17, 68, 42],
                        [17, 50, 22, 6, 51, 23],
                        [19, 46, 16, 6, 47, 17],
                        [2, 139, 111, 7, 140, 112],
                        [17, 74, 46],
                        [7, 54, 24, 16, 55, 25],
                        [34, 37, 13],
                        [4, 151, 121, 5, 152, 122],
                        [4, 75, 47, 14, 76, 48],
                        [11, 54, 24, 14, 55, 25],
                        [16, 45, 15, 14, 46, 16],
                        [6, 147, 117, 4, 148, 118],
                        [6, 73, 45, 14, 74, 46],
                        [11, 54, 24, 16, 55, 25],
                        [30, 46, 16, 2, 47, 17],
                        [8, 132, 106, 4, 133, 107],
                        [8, 75, 47, 13, 76, 48],
                        [7, 54, 24, 22, 55, 25],
                        [22, 45, 15, 13, 46, 16],
                        [10, 142, 114, 2, 143, 115],
                        [19, 74, 46, 4, 75, 47],
                        [28, 50, 22, 6, 51, 23],
                        [33, 46, 16, 4, 47, 17],
                        [8, 152, 122, 4, 153, 123],
                        [22, 73, 45, 3, 74, 46],
                        [8, 53, 23, 26, 54, 24],
                        [12, 45, 15, 28, 46, 16],
                        [3, 147, 117, 10, 148, 118],
                        [3, 73, 45, 23, 74, 46],
                        [4, 54, 24, 31, 55, 25],
                        [11, 45, 15, 31, 46, 16],
                        [7, 146, 116, 7, 147, 117],
                        [21, 73, 45, 7, 74, 46],
                        [1, 53, 23, 37, 54, 24],
                        [19, 45, 15, 26, 46, 16],
                        [5, 145, 115, 10, 146, 116],
                        [19, 75, 47, 10, 76, 48],
                        [15, 54, 24, 25, 55, 25],
                        [23, 45, 15, 25, 46, 16],
                        [13, 145, 115, 3, 146, 116],
                        [2, 74, 46, 29, 75, 47],
                        [42, 54, 24, 1, 55, 25],
                        [23, 45, 15, 28, 46, 16],
                        [17, 145, 115],
                        [10, 74, 46, 23, 75, 47],
                        [10, 54, 24, 35, 55, 25],
                        [19, 45, 15, 35, 46, 16],
                        [17, 145, 115, 1, 146, 116],
                        [14, 74, 46, 21, 75, 47],
                        [29, 54, 24, 19, 55, 25],
                        [11, 45, 15, 46, 46, 16],
                        [13, 145, 115, 6, 146, 116],
                        [14, 74, 46, 23, 75, 47],
                        [44, 54, 24, 7, 55, 25],
                        [59, 46, 16, 1, 47, 17],
                        [12, 151, 121, 7, 152, 122],
                        [12, 75, 47, 26, 76, 48],
                        [39, 54, 24, 14, 55, 25],
                        [22, 45, 15, 41, 46, 16],
                        [6, 151, 121, 14, 152, 122],
                        [6, 75, 47, 34, 76, 48],
                        [46, 54, 24, 10, 55, 25],
                        [2, 45, 15, 64, 46, 16],
                        [17, 152, 122, 4, 153, 123],
                        [29, 74, 46, 14, 75, 47],
                        [49, 54, 24, 10, 55, 25],
                        [24, 45, 15, 46, 46, 16],
                        [4, 152, 122, 18, 153, 123],
                        [13, 74, 46, 32, 75, 47],
                        [48, 54, 24, 14, 55, 25],
                        [42, 45, 15, 32, 46, 16],
                        [20, 147, 117, 4, 148, 118],
                        [40, 75, 47, 7, 76, 48],
                        [43, 54, 24, 22, 55, 25],
                        [10, 45, 15, 67, 46, 16],
                        [19, 148, 118, 6, 149, 119],
                        [18, 75, 47, 31, 76, 48],
                        [34, 54, 24, 34, 55, 25],
                        [20, 45, 15, 61, 46, 16]
                    ],
                    t = function(r, t) {
                        var e = {};
                        return e.totalCount = r, e.dataCount = t, e
                    },
                    e = {},
                    o = function(t, e) {
                        switch(e) {
                        case n.L:
                            return r[4 * (t - 1) + 0];
                        case n.M:
                            return r[4 * (t - 1) + 1];
                        case n.Q:
                            return r[4 * (t - 1) + 2];
                        case n.H:
                            return r[4 * (t - 1) + 3];
                        default:
                            return
                        }
                    };
                return e.getRSBlocks = function(r, e) {
                    var n = o(r, e);
                    if("undefined" == typeof n) throw new Error("bad rs block @ typeNumber:" + r + "/errorCorrectLevel:" + e);
                    for(var i = n.length / 3, a = new Array, u = 0; i > u; u += 1)
                        for(var f = n[3 * u + 0], c = n[3 * u + 1], s = n[3 * u + 2], l = 0; f > l; l += 1) a.push(t(c, s));
                    return a
                }, e
            }(),
            f = function() {
                var r = new Array,
                    t = 0,
                    e = {};
                return e.getBuffer = function() {
                    return r
                }, e.getAt = function(t) {
                    var e = Math.floor(t / 8);
                    return 1 == (r[e] >>> 7 - t % 8 & 1)
                }, e.put = function(r, t) {
                    for(var n = 0; t > n; n += 1) e.putBit(1 == (r >>> t - n - 1 & 1))
                }, e.getLengthInBits = function() {
                    return t
                }, e.putBit = function(e) {
                    var n = Math.floor(t / 8);
                    r.length <= n && r.push(0), e && (r[n] |= 128 >>> t % 8), t += 1
                }, e
            },
            c = function(r) {
                var n = e.MODE_8BIT_BYTE,
                    o = t.stringToBytes(r),
                    i = {};
                return i.getMode = function() {
                    return n
                }, i.getLength = function(r) {
                    return o.length
                }, i.write = function(r) {
                    for(var t = 0; t < o.length; t += 1) r.put(o[t], 8)
                }, i
            },
            s = function() {
                var r = new Array,
                    t = {};
                return t.writeByte = function(t) {
                    r.push(255 & t)
                }, t.writeShort = function(r) {
                    t.writeByte(r), t.writeByte(r >>> 8)
                }, t.writeBytes = function(r, e, n) {
                    e = e || 0, n = n || r.length;
                    for(var o = 0; n > o; o += 1) t.writeByte(r[o + e])
                }, t.writeString = function(r) {
                    for(var e = 0; e < r.length; e += 1) t.writeByte(r.charCodeAt(e))
                }, t.toByteArray = function() {
                    return r
                }, t.toString = function() {
                    var t = "";
                    t += "[";
                    for(var e = 0; e < r.length; e += 1) e > 0 && (t += ","), t += r[e];
                    return t += "]"
                }, t
            },
            l = function() {
                var r = 0,
                    t = 0,
                    e = 0,
                    n = "",
                    o = {},
                    i = function(r) {
                        n += String.fromCharCode(a(63 & r))
                    },
                    a = function(r) {
                        if(0 > r);
                        else {
                            if(26 > r) return 65 + r;
                            if(52 > r) return 97 + (r - 26);
                            if(62 > r) return 48 + (r - 52);
                            if(62 == r) return 43;
                            if(63 == r) return 47
                        }
                        throw new Error("n:" + r)
                    };
                return o.writeByte = function(n) {
                    for(r = r << 8 | 255 & n, t += 8, e += 1; t >= 6;) i(r >>> t - 6), t -= 6
                }, o.flush = function() {
                    if(t > 0 && (i(r << 6 - t), r = 0, t = 0), e % 3 != 0)
                        for(var o = 3 - e % 3, a = 0; o > a; a += 1) n += "="
                }, o.toString = function() {
                    return n
                }, o
            },
            h = function(r) {
                var t = r,
                    e = 0,
                    n = 0,
                    o = 0,
                    i = {};
                i.read = function() {
                    for(; 8 > o;) {
                        if(e >= t.length) {
                            if(0 == o) return -1;
                            throw new Error("unexpected end of file./" + o)
                        }
                        var r = t.charAt(e);
                        if(e += 1, "=" == r) return o = 0, -1;
                        r.match(/^\s$/) || (n = n << 6 | a(r.charCodeAt(0)), o += 6)
                    }
                    var i = n >>> o - 8 & 255;
                    return o -= 8, i
                };
                var a = function(r) {
                    if(r >= 65 && 90 >= r) return r - 65;
                    if(r >= 97 && 122 >= r) return r - 97 + 26;
                    if(r >= 48 && 57 >= r) return r - 48 + 52;
                    if(43 == r) return 62;
                    if(47 == r) return 63;
                    throw new Error("c:" + r)
                };
                return i
            },
            d = function(r, t) {
                var e = r,
                    n = t,
                    o = new Array(r * t),
                    i = {};
                i.setPixel = function(r, t, n) {
                    o[t * e + r] = n
                }, i.write = function(r) {
                    r.writeString("GIF87a"), r.writeShort(e), r.writeShort(n), r.writeByte(128), r.writeByte(0), r.writeByte(0), r.writeByte(0), r.writeByte(0), r.writeByte(0), r.writeByte(255), r.writeByte(255), r.writeByte(255), r.writeString(","), r.writeShort(0), r.writeShort(0), r.writeShort(e), r.writeShort(n), r.writeByte(0);
                    var t = 2,
                        o = u(t);
                    r.writeByte(t);
                    for(var i = 0; o.length - i > 255;) r.writeByte(255), r.writeBytes(o, i, 255), i += 255;
                    r.writeByte(o.length - i), r.writeBytes(o, i, o.length - i), r.writeByte(0), r.writeString(";")
                };
                var a = function(r) {
                        var t = r,
                            e = 0,
                            n = 0,
                            o = {};
                        return o.write = function(r, o) {
                            if(r >>> o != 0) throw new Error("length over");
                            for(; e + o >= 8;) t.writeByte(255 & (r << e | n)), o -= 8 - e, r >>>= 8 - e, n = 0, e = 0;
                            n |= r << e, e += o
                        }, o.flush = function() {
                            e > 0 && t.writeByte(n)
                        }, o
                    },
                    u = function(r) {
                        for(var t = 1 << r, e = (1 << r) + 1, n = r + 1, i = f(), u = 0; t > u; u += 1) i.add(String.fromCharCode(u));
                        i.add(String.fromCharCode(t)), i.add(String.fromCharCode(e));
                        var c = s(),
                            l = a(c);
                        l.write(t, n);
                        var h = 0,
                            d = String.fromCharCode(o[h]);
                        for(h += 1; h < o.length;) {
                            var g = String.fromCharCode(o[h]);
                            h += 1, i.contains(d + g) ? d += g : (l.write(i.indexOf(d), n), i.size() < 4095 && (i.size() == 1 << n && (n += 1), i.add(d + g)), d = g)
                        }
                        return l.write(i.indexOf(d), n), l.write(e, n), l.flush(), c.toByteArray()
                    },
                    f = function() {
                        var r = {},
                            t = 0,
                            e = {};
                        return e.add = function(n) {
                            if(e.contains(n)) throw new Error("dup key:" + n);
                            r[n] = t, t += 1
                        }, e.size = function() {
                            return t
                        }, e.indexOf = function(t) {
                            return r[t]
                        }, e.contains = function(t) {
                            return "undefined" != typeof r[t]
                        }, e
                    };
                return i
            },
            g = function(r, t, e, n) {
                for(var o = d(r, t), i = 0; t > i; i += 1)
                    for(var a = 0; r > a; a += 1) o.setPixel(a, i, e(a, i));
                var u = s();
                o.write(u);
                for(var f = l(), c = u.toByteArray(), h = 0; h < c.length; h += 1) f.writeByte(c[h]);
                f.flush();
                var g = "";
                return g += "<img", g += ' src="', g += "data:image/gif;base64,", g += f, g += '"', g += ' width="', g += r, g += '"', g += ' height="', g += t, g += '"', n && (g += ' alt="', g += n, g += '"'), g += "/>"
            };
        return t
    }();
    return function(r) {
        "function" == typeof define && define.amd ? define([], r) : "object" == typeof exports && (module.exports = r())
    }(function() {
        return r
    }), ! function(r) {
        r.stringToBytes = function(r) {
            function t(r) {
                for(var t = [], e = 0; e < r.length; e++) {
                    var n = r.charCodeAt(e);
                    128 > n ? t.push(n) : 2048 > n ? t.push(192 | n >> 6, 128 | 63 & n) : 55296 > n || n >= 57344 ? t.push(224 | n >> 12, 128 | n >> 6 & 63, 128 | 63 & n) : (e++, n = 65536 + ((1023 & n) << 10 | 1023 & r.charCodeAt(e)), t.push(240 | n >> 18, 128 | n >> 12 & 63, 128 | n >> 6 & 63, 128 | 63 & n))
                }
                return t
            }
            return t(r)
        }
    }(r), r
}()),
function(r) {
    r.fn.share = function(t) {
        function e(t, e) {
            var n = o(e);
            "prepend" == e.mode ? n.reverse() : n, n.length && r.each(n, function(n, o) {
                var a = i(o, e),
                    u = e.initialized ? t.find(".icon-" + o) : r('<a class="social-share-icon icon-' + o + '"></a>');
                return !u.length || (u.prop("aria-label", "分享到" + h[o]), u.prop("href", a), "wechat" === o ? u.prop("tabindex", -1) : u.prop("target", "_blank"), void(e.initialized || ("prepend" == e.mode ? t.prepend(u) : t.append(u))))
            })
        }

        function n(r, t) {
            var e = r.find("a.icon-wechat");
            e.length && (e.append('<div class="wechat-qrcode"><h4>' + t.wechatQrcodeTitle + '</h4><div class="qrcode"></div><div class="help">' + t.wechatQrcodeHelper + "</div></div>"), e.find(".qrcode").qrcode({
                render: "image",
                size: t.wechatQrcodeSize,
                text: t.url
            }), e.offset().top < 100 && e.find(".wechat-qrcode").addClass("bottom"))
        }

        function o(t) {
            0 === t.mobileSites.length && t.sites.length && (t.mobileSites = t.sites);
            var e = (u() ? t.mobileSites : t.sites.length ? t.sites : []).slice(0),
                n = t.disabled;
            return "string" == typeof e && (e = e.split(/\s*,\s*/)), "string" == typeof n && (n = n.split(/\s*,\s*/)), a() && n.push("wechat"), n.length && r.each(n, function(t, n) {
                var o = r.inArray(n, e);
                o !== -1 && e.splice(o, 1)
            }), e
        }

        function i(r, t) {
            var e = l[r];
            t.summary = t.description;
            for(var n in t)
                if(t.hasOwnProperty(n)) {
                    var o = r + n.replace(/^[a-z]/, function(r) {
                            return r.toUpperCase()
                        }),
                        i = encodeURIComponent(void 0 === t[o] ? t[n] : t[o]);
                    e = e.replace(new RegExp("{{" + n.toUpperCase() + "}}", "g"), i)
                }
            return e
        }

        function a() {
            return /MicroMessenger/i.test(navigator.userAgent)
        }

        function u() {
            return r(window).width() <= 768
        }
        var f = r(document.head),
            c = {
                url: location.href,
                site_url: location.origin,
                source: f.find("[name=site], [name=Site]").attr("content") || document.title,
                // title: f.find("[name=title], [name=Title]").attr("content") || document.title,
                title: '中国教育在线-推动教育前进的力量',
                description: f.find("[name=description], [name=Description]").attr("content") || "",
                // image: r("img:first").prop("src") || "",
                image: 'http://www.eol.cn/e_images/index/2018/fxlogo.jpg',
                imageSelector: void 0,
                weiboKey: "",
                wechatQrcodeTitle: "微信扫一扫：分享",
                wechatQrcodeHelper: "<p>微信里点“发现”，扫一下</p><p>二维码便可将本文分享至朋友圈。</p>",
                wechatQrcodeSize: 100,
                mobileSites: [],
                sites: ["weibo", "qq", "wechat", "tencent", "douban", "qzone", "linkedin", "diandian", "facebook", "twitter", "google"],
                disabled: [],
                initialized: !1
            },
            s = r.extend({}, c, t),
            l = {
                qzone: "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url={{URL}}&title={{TITLE}}&desc={{DESCRIPTION}}&summary={{SUMMARY}}&site={{SOURCE}}",
                qq: "http://connect.qq.com/widget/shareqq/index.html?url={{URL}}&title={{TITLE}}&source={{SOURCE}}&desc={{DESCRIPTION}}&pics={{IMAGE}}",
                tencent: "http://share.v.t.qq.com/index.php?c=share&a=index&title={{TITLE}}&url={{URL}}&pic={{IMAGE}}",
                weibo: "http://service.weibo.com/share/share.php?url={{URL}}&title={{TITLE}}&pic={{IMAGE}}&appkey={{WEIBOKEY}}",
                wechat: "javascript:;",
                douban: "http://shuo.douban.com/!service/share?href={{URL}}&name={{TITLE}}&text={{DESCRIPTION}}&image={{IMAGE}}&starid=0&aid=0&style=11",
                diandian: "http://www.diandian.com/share?lo={{URL}}&ti={{TITLE}}&type=link",
                linkedin: "http://www.linkedin.com/shareArticle?mini=true&ro=true&title={{TITLE}}&url={{URL}}&summary={{SUMMARY}}&source={{SOURCE}}&armin=armin",
                facebook: "https://www.facebook.com/sharer/sharer.php?u={{URL}}&title={{TITLE}}&description={{DESCRIPTION}}&caption={{SUBHEAD}}&link={{URL}}&picture={{IMAGE}}",
                twitter: "https://twitter.com/intent/tweet?text={{TITLE}}&url={{URL}}&via={{SITE_URL}}",
                google: "https://plus.google.com/share?url={{URL}}"
            },
            h = {
                qzone: "QQ空间",
                qq: "QQ",
                tencent: "腾讯微博",
                weibo: "微博",
                wechat: "微信",
                douban: "豆瓣",
                diandian: "点点",
                linkedin: "LinkedIn",
                facebook: "Facebook",
                twitter: "Twitter",
                google: "Google"
            };
        this.each(function() {
            if(r(this).data("initialized")) return !0;
            var t = r.extend({}, s, r(this).data());
            t.imageSelector && (t.image = r(t.imageSelector).map(function() {
                return r(this).prop("src")
            }).get().join("||"));
            var o = r(this).addClass("share-component social-share");
            e(o, t), n(o, t), r(this).data("initialized", !0)
        })
    }, r(function() {
        r(".share-component,.social-share").share()
    })
}(jQuery);
