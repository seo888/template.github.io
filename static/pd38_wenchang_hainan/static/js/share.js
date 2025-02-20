!function (a) {
    "use strict";

    function u(r, t, e, n) {
        var o = a(e, t);
        o.addData(r), o.make(), n = n || 0;
        var i = o.getModuleCount(), h = o.getModuleCount() + 2 * n;
        this.text = r, this.level = t, this.version = e, this.moduleCount = h, this.isDark = function (r, t) {
            return t -= n, !((r -= n) < 0 || i <= r || t < 0 || i <= t) && o.isDark(r, t)
        }, this.addBlank = function (a, u, f, c) {
            var s = this.isDark, l = 1 / h;
            this.isDark = function (r, t) {
                var e = t * l, n = r * l, o = e + l, i = n + l;
                return s(r, t) && (o < a || f < e || i < u || c < n)
            }
        }
    }

    function g(r, t, e, n, o) {
        e = Math.max(1, e || 1), n = Math.min(40, n || 40);
        for (var i = e; i <= n; i += 1) try {
            return new u(r, t, i, o)
        } catch (r) {
        }
    }

    function i(r, t, e) {
        d(e.background).is("img") ? t.drawImage(e.background, 0, 0, e.size, e.size) : e.background && (t.fillStyle = e.background, t.fillRect(e.left, e.top, e.size, e.size));
        var n = e.mode;
        1 === n || 2 === n ? function (r, t, e) {
            var n = e.size, o = "bold " + e.mSize * n + "px " + e.fontname, i = d("<canvas/>")[0].getContext("2d");
            i.font = o;
            var a = i.measureText(e.label).width, u = e.mSize, f = a / n, c = (1 - f) * e.mPosX, s = (1 - u) * e.mPosY,
                l = c + f, h = s + u;
            1 === e.mode ? r.addBlank(0, s - .01, n, h + .01) : r.addBlank(c - .01, s - .01, .01 + l, h + .01), t.fillStyle = e.fontcolor, t.font = o, t.fillText(e.label, c * n, s * n + .75 * e.mSize * n)
        }(r, t, e) : 3 !== n && 4 !== n || function (r, t, e) {
            var n = e.size, o = e.image.naturalWidth || 1, i = e.image.naturalHeight || 1, a = e.mSize, u = a * o / i,
                f = (1 - u) * e.mPosX, c = (1 - a) * e.mPosY, s = f + u, l = c + a;
            3 === e.mode ? r.addBlank(0, c - .01, n, l + .01) : r.addBlank(f - .01, c - .01, .01 + s, l + .01), t.drawImage(e.image, f * n, c * n, u * n, a * n)
        }(r, t, e)
    }

    function c(r, t, e, n, o, i, a, u) {
        r.isDark(a, u) && t.rect(n, o, i, i)
    }

    function s(r, t, e, n, o, i, a, u) {
        var f = r.isDark, c = n + i, s = o + i, l = e.radius * i, h = a - 1, g = a + 1, d = u - 1, v = u + 1,
            p = f(a, u), w = f(h, d), m = f(h, u), y = f(h, v), k = f(a, v), T = f(g, v), b = f(g, u), C = f(g, d),
            B = f(a, d);
        p ? function (r, t, e, n, o, i, a, u, f, c) {
            a ? r.moveTo(t + i, e) : r.moveTo(t, e), u ? (r.lineTo(n - i, e), r.arcTo(n, e, n, o, i)) : r.lineTo(n, e), f ? (r.lineTo(n, o - i), r.arcTo(n, o, t, o, i)) : r.lineTo(n, o), c ? (r.lineTo(t + i, o), r.arcTo(t, o, t, e, i)) : r.lineTo(t, o), a ? (r.lineTo(t, e + i), r.arcTo(t, e, n, e, i)) : r.lineTo(t, e)
        }(t, n, o, c, s, l, !m && !B, !m && !k, !b && !k, !b && !B) : function (r, t, e, n, o, i, a, u, f, c) {
            a && (r.moveTo(t + i, e), r.lineTo(t, e), r.lineTo(t, e + i), r.arcTo(t, e, t + i, e, i)), u && (r.moveTo(n - i, e), r.lineTo(n, e), r.lineTo(n, e + i), r.arcTo(n, e, n - i, e, i)), f && (r.moveTo(n - i, o), r.lineTo(n, o), r.lineTo(n, o - i), r.arcTo(n, o, n - i, o, i)), c && (r.moveTo(t + i, o), r.lineTo(t, o), r.lineTo(t, o - i), r.arcTo(t, o, t + i, o, i))
        }(t, n, o, c, s, l, m && B && w, m && k && y, b && k && T, b && B && C)
    }

    function e(r, t) {
        var e = g(t.text, t.ecLevel, t.minVersion, t.maxVersion, t.quiet);
        if (!e) return null;
        var n = d(r).data("qrcode", e), o = n[0].getContext("2d");
        return i(e, o, t), function (r, t, e) {
            var n, o, i = r.moduleCount, a = e.size / i, u = c;
            for (l && 0 < e.radius && e.radius <= .5 && (u = s), t.beginPath(), n = 0; n < i; n += 1) for (o = 0; o < i; o += 1) {
                u(r, t, e, e.left + o * a, e.top + n * a, a, n, o)
            }
            if (d(e.fill).is("img")) {
                t.strokeStyle = "rgba(0,0,0,0.5)", t.lineWidth = 2, t.stroke();
                var f = t.globalCompositeOperation;
                t.globalCompositeOperation = "destination-out", t.fill(), t.globalCompositeOperation = f, t.clip(), t.drawImage(e.fill, 0, 0, e.size, e.size), t.restore()
            } else t.fillStyle = e.fill, t.fill()
        }(e, o, t), n
    }

    function t(r) {
        return e(d("<canvas/>").attr("width", r.size).attr("height", r.size), r)
    }

    function n(r) {
        return o && "canvas" === r.render ? t(r) : o && "image" === r.render ? function (r) {
            return d("<img/>").attr("src", t(r)[0].toDataURL("image/png"))
        }(r) : function (r) {
            var t = g(r.text, r.ecLevel, r.minVersion, r.maxVersion, r.quiet);
            if (!t) return null;
            var e, n, o = r.size, i = r.background, a = Math.floor, u = t.moduleCount, f = a(o / u),
                c = a(.5 * (o - f * u)),
                s = {position: "relative", left: 0, top: 0, padding: 0, margin: 0, width: o, height: o},
                l = {position: "absolute", padding: 0, margin: 0, width: f, height: f, "background-color": r.fill},
                h = d("<div/>").data("qrcode", t).css(s);
            for (i && h.css("background-color", i), e = 0; e < u; e += 1) for (n = 0; n < u; n += 1) t.isDark(e, n) && d("<div/>").css(l).css({
                left: c + n * f,
                top: c + e * f
            }).appendTo(h);
            return h
        }(r)
    }

    var r, d = jQuery, o = (r = document.createElement("canvas"), Boolean(r.getContext && r.getContext("2d"))),
        l = "[object Opera]" !== Object.prototype.toString.call(window.opera), f = {
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
    d.fn.qrcode = function (r) {
        var t = d.extend({}, f, r);
        return this.each(function () {
            "canvas" === this.nodeName.toLowerCase() ? e(this, t) : d(this).append(n(t))
        })
    }
}(function () {
    var r, t = function () {
        function w(n, o) {
            if (void 0 === n.length) throw new Error(n.length + "/" + o);
            var t = function () {
                for (var r = 0; r < n.length && 0 == n[r];) r += 1;
                for (var t = new Array(n.length - r + o), e = 0; e < n.length - r; e += 1) t[e] = n[e + r];
                return t
            }(), i = {
                getAt: function (r) {
                    return t[r]
                }, getLength: function () {
                    return t.length
                }, multiply: function (r) {
                    for (var t = new Array(i.getLength() + r.getLength() - 1), e = 0; e < i.getLength(); e += 1) for (var n = 0; n < r.getLength(); n += 1) t[e + n] ^= b.gexp(b.glog(i.getAt(e)) + b.glog(r.getAt(n)));
                    return w(t, 0)
                }, mod: function (r) {
                    if (i.getLength() - r.getLength() < 0) return i;
                    for (var t = b.glog(i.getAt(0)) - b.glog(r.getAt(0)), e = new Array(i.getLength()), n = 0; n < i.getLength(); n += 1) e[n] = i.getAt(n);
                    for (n = 0; n < r.getLength(); n += 1) e[n] ^= b.gexp(b.glog(r.getAt(n)) + t);
                    return w(e, 0).mod(r)
                }
            };
            return i
        }

        function o(r, t) {
            function o(r, t) {
                s = function (r) {
                    for (var t = new Array(r), e = 0; e < r; e += 1) {
                        t[e] = new Array(r);
                        for (var n = 0; n < r; n += 1) t[e][n] = null
                    }
                    return t
                }(l = 4 * u + 17), i(0, 0), i(l - 7, 0), i(0, l - 7), h(), c(), d(r, t), 7 <= u && g(r), null == e && (e = p(u, a, n)), v(e, t)
            }

            var u = r, a = m[t], s = null, l = 0, e = null, n = new Array, f = {}, i = function (r, t) {
                for (var e = -1; e <= 7; e += 1) if (!(r + e <= -1 || l <= r + e)) for (var n = -1; n <= 7; n += 1) t + n <= -1 || l <= t + n || (s[r + e][t + n] = 0 <= e && e <= 6 && (0 == n || 6 == n) || 0 <= n && n <= 6 && (0 == e || 6 == e) || 2 <= e && e <= 4 && 2 <= n && n <= 4)
            }, c = function () {
                for (var r = 8; r < l - 8; r += 1) null == s[r][6] && (s[r][6] = r % 2 == 0);
                for (var t = 8; t < l - 8; t += 1) null == s[6][t] && (s[6][t] = t % 2 == 0)
            }, h = function () {
                for (var r = T.getPatternPosition(u), t = 0; t < r.length; t += 1) for (var e = 0; e < r.length; e += 1) {
                    var n = r[t], o = r[e];
                    if (null == s[n][o]) for (var i = -2; i <= 2; i += 1) for (var a = -2; a <= 2; a += 1) s[n + i][o + a] = -2 == i || 2 == i || -2 == a || 2 == a || 0 == i && 0 == a
                }
            }, g = function (r) {
                for (var t = T.getBCHTypeNumber(u), e = 0; e < 18; e += 1) {
                    var n = !r && 1 == (t >> e & 1);
                    s[Math.floor(e / 3)][e % 3 + l - 8 - 3] = n
                }
                for (e = 0; e < 18; e += 1) {
                    n = !r && 1 == (t >> e & 1);
                    s[e % 3 + l - 8 - 3][Math.floor(e / 3)] = n
                }
            }, d = function (r, t) {
                for (var e = a << 3 | t, n = T.getBCHTypeInfo(e), o = 0; o < 15; o += 1) {
                    var i = !r && 1 == (n >> o & 1);
                    o < 6 ? s[o][8] = i : o < 8 ? s[o + 1][8] = i : s[l - 15 + o][8] = i
                }
                for (o = 0; o < 15; o += 1) {
                    i = !r && 1 == (n >> o & 1);
                    o < 8 ? s[8][l - o - 1] = i : o < 9 ? s[8][15 - o - 1 + 1] = i : s[8][15 - o - 1] = i
                }
                s[l - 8][8] = !r
            }, v = function (r, t) {
                for (var e = -1, n = l - 1, o = 7, i = 0, a = T.getMaskFunction(t), u = l - 1; 0 < u; u -= 2) for (6 == u && (u -= 1); ;) {
                    for (var f = 0; f < 2; f += 1) if (null == s[n][u - f]) {
                        var c = !1;
                        i < r.length && (c = 1 == (r[i] >>> o & 1)), a(n, u - f) && (c = !c), s[n][u - f] = c, -1 == (o -= 1) && (i += 1, o = 7)
                    }
                    if ((n += e) < 0 || l <= n) {
                        n -= e, e = -e;
                        break
                    }
                }
            }, p = function (r, t, e) {
                for (var n = C.getRSBlocks(r, t), o = B(), i = 0; i < e.length; i += 1) {
                    var a = e[i];
                    o.put(a.getMode(), 4), o.put(a.getLength(), T.getLengthInBits(a.getMode(), r)), a.write(o)
                }
                var u = 0;
                for (i = 0; i < n.length; i += 1) u += n[i].dataCount;
                if (o.getLengthInBits() > 8 * u) throw new Error("code length overflow. (" + o.getLengthInBits() + ">" + 8 * u + ")");
                for (o.getLengthInBits() + 4 <= 8 * u && o.put(0, 4); o.getLengthInBits() % 8 != 0;) o.putBit(!1);
                for (; !(o.getLengthInBits() >= 8 * u) && (o.put(236, 8), !(o.getLengthInBits() >= 8 * u));) o.put(17, 8);
                return function (r, t) {
                    for (var e = 0, n = 0, o = 0, i = new Array(t.length), a = new Array(t.length), u = 0; u < t.length; u += 1) {
                        var f = t[u].dataCount, c = t[u].totalCount - f;
                        n = Math.max(n, f), o = Math.max(o, c), i[u] = new Array(f);
                        for (var s = 0; s < i[u].length; s += 1) i[u][s] = 255 & r.getBuffer()[s + e];
                        e += f;
                        var l = T.getErrorCorrectPolynomial(c), h = w(i[u], l.getLength() - 1).mod(l);
                        a[u] = new Array(l.getLength() - 1);
                        for (s = 0; s < a[u].length; s += 1) {
                            var g = s + h.getLength() - a[u].length;
                            a[u][s] = 0 <= g ? h.getAt(g) : 0
                        }
                    }
                    var d = 0;
                    for (s = 0; s < t.length; s += 1) d += t[s].totalCount;
                    var v = new Array(d), p = 0;
                    for (s = 0; s < n; s += 1) for (u = 0; u < t.length; u += 1) s < i[u].length && (v[p] = i[u][s], p += 1);
                    for (s = 0; s < o; s += 1) for (u = 0; u < t.length; u += 1) s < a[u].length && (v[p] = a[u][s], p += 1);
                    return v
                }(o, n)
            };
            return f.addData = function (r) {
                var t = L(r);
                n.push(t), e = null
            }, f.isDark = function (r, t) {
                if (r < 0 || l <= r || t < 0 || l <= t) throw new Error(r + "," + t);
                return s[r][t]
            }, f.getModuleCount = function () {
                return l
            }, f.make = function () {
                o(!1, function () {
                    for (var r = 0, t = 0, e = 0; e < 8; e += 1) {
                        o(!0, e);
                        var n = T.getLostPoint(f);
                        (0 == e || n < r) && (r = n, t = e)
                    }
                    return t
                }())
            }, f.createTableTag = function (r, t) {
                r = r || 2;
                var e = "";
                e += '<table style="', e += " border-width: 0px; border-style: none;", e += " border-collapse: collapse;", e += " padding: 0px; margin: " + (t = void 0 === t ? 4 * r : t) + "px;", e += '">', e += "<tbody>";
                for (var n = 0; n < f.getModuleCount(); n += 1) {
                    e += "<tr>";
                    for (var o = 0; o < f.getModuleCount(); o += 1) e += '<td style="', e += " border-width: 0px; border-style: none;", e += " border-collapse: collapse;", e += " padding: 0px; margin: 0px;", e += " width: " + r + "px;", e += " height: " + r + "px;", e += " background-color: ", e += f.isDark(n, o) ? "#000000" : "#ffffff", e += ";", e += '"/>';
                    e += "</tr>"
                }
                return (e += "</tbody>") + "</table>"
            }, f.createImgTag = function (o, r) {
                o = o || 2, r = void 0 === r ? 4 * o : r;
                var t = f.getModuleCount() * o + 2 * r, i = r, a = t - r;
                return A(t, t, function (r, t) {
                    if (i <= r && r < a && i <= t && t < a) {
                        var e = Math.floor((r - i) / o), n = Math.floor((t - i) / o);
                        return f.isDark(n, e) ? 0 : 1
                    }
                    return 1
                })
            }, f
        }

        o.stringToBytes = function (r) {
            for (var t = new Array, e = 0; e < r.length; e += 1) {
                var n = r.charCodeAt(e);
                t.push(255 & n)
            }
            return t
        }, o.createStringToBytes = function (u, f) {
            var i = function () {
                function r() {
                    var r = t.read();
                    if (-1 == r) throw new Error;
                    return r
                }

                for (var t = S(u), e = 0, n = {}; ;) {
                    var o = t.read();
                    if (-1 == o) break;
                    var i = r(), a = r() << 8 | r();
                    n[String.fromCharCode(o << 8 | i)] = a, e += 1
                }
                if (e != f) throw new Error(e + " != " + f);
                return n
            }(), a = "?".charCodeAt(0);
            return function (r) {
                for (var t = new Array, e = 0; e < r.length; e += 1) {
                    var n = r.charCodeAt(e);
                    if (n < 128) t.push(n); else {
                        var o = i[r.charAt(e)];
                        "number" == typeof o ? (255 & o) == o ? t.push(o) : (t.push(o >>> 8), t.push(255 & o)) : t.push(a)
                    }
                }
                return t
            }
        };

        function g() {
            var e = new Array, o = {
                writeByte: function (r) {
                    e.push(255 & r)
                }, writeShort: function (r) {
                    o.writeByte(r), o.writeByte(r >>> 8)
                }, writeBytes: function (r, t, e) {
                    t = t || 0, e = e || r.length;
                    for (var n = 0; n < e; n += 1) o.writeByte(r[n + t])
                }, writeString: function (r) {
                    for (var t = 0; t < r.length; t += 1) o.writeByte(r.charCodeAt(t))
                }, toByteArray: function () {
                    return e
                }, toString: function () {
                    var r = "";
                    r += "[";
                    for (var t = 0; t < e.length; t += 1) 0 < t && (r += ","), r += e[t];
                    return r + "]"
                }
            };
            return o
        }

        function h(r, t) {
            var n = r, o = t, l = new Array(r * t), e = {
                setPixel: function (r, t, e) {
                    l[t * n + r] = e
                }, write: function (r) {
                    r.writeString("GIF87a"), r.writeShort(n), r.writeShort(o), r.writeByte(128), r.writeByte(0), r.writeByte(0), r.writeByte(0), r.writeByte(0), r.writeByte(0), r.writeByte(255), r.writeByte(255), r.writeByte(255), r.writeString(","), r.writeShort(0), r.writeShort(0), r.writeShort(n), r.writeShort(o), r.writeByte(0);
                    var t = i(2);
                    r.writeByte(2);
                    for (var e = 0; 255 < t.length - e;) r.writeByte(255), r.writeBytes(t, e, 255), e += 255;
                    r.writeByte(t.length - e), r.writeBytes(t, e, t.length - e), r.writeByte(0), r.writeString(";")
                }
            }, i = function (r) {
                for (var t = 1 << r, e = 1 + (1 << r), n = r + 1, o = h(), i = 0; i < t; i += 1) o.add(String.fromCharCode(i));
                o.add(String.fromCharCode(t)), o.add(String.fromCharCode(e));
                var a = g(), u = function (r) {
                    var e = r, n = 0, o = 0, t = {
                        write: function (r, t) {
                            if (r >>> t != 0) throw new Error("length over");
                            for (; 8 <= n + t;) e.writeByte(255 & (r << n | o)), t -= 8 - n, r >>>= 8 - n, n = o = 0;
                            o |= r << n, n += t
                        }, flush: function () {
                            0 < n && e.writeByte(o)
                        }
                    };
                    return t
                }(a);
                u.write(t, n);
                var f = 0, c = String.fromCharCode(l[f]);
                for (f += 1; f < l.length;) {
                    var s = String.fromCharCode(l[f]);
                    f += 1, o.contains(c + s) ? c += s : (u.write(o.indexOf(c), n), o.size() < 4095 && (o.size() == 1 << n && (n += 1), o.add(c + s)), c = s)
                }
                return u.write(o.indexOf(c), n), u.write(e, n), u.flush(), a.toByteArray()
            }, h = function () {
                var t = {}, e = 0, n = {
                    add: function (r) {
                        if (n.contains(r)) throw new Error("dup key:" + r);
                        t[r] = e, e += 1
                    }, size: function () {
                        return e
                    }, indexOf: function (r) {
                        return t[r]
                    }, contains: function (r) {
                        return void 0 !== t[r]
                    }
                };
                return n
            };
            return e
        }

        var d, r, t, e, n = 1, i = 2, a = 4, u = 8, m = {L: 1, M: 0, Q: 3, H: 2}, f = 0, c = 1, s = 2, l = 3, v = 4,
            p = 5, y = 6, k = 7,
            T = (t = [[], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50], [6, 30, 54], [6, 32, 58], [6, 34, 62], [6, 26, 46, 66], [6, 26, 48, 70], [6, 26, 50, 74], [6, 30, 54, 78], [6, 30, 56, 82], [6, 30, 58, 86], [6, 34, 62, 90], [6, 28, 50, 72, 94], [6, 26, 50, 74, 98], [6, 30, 54, 78, 102], [6, 28, 54, 80, 106], [6, 32, 58, 84, 110], [6, 30, 58, 86, 114], [6, 34, 62, 90, 118], [6, 26, 50, 74, 98, 122], [6, 30, 54, 78, 102, 126], [6, 26, 52, 78, 104, 130], [6, 30, 56, 82, 108, 134], [6, 34, 60, 86, 112, 138], [6, 30, 58, 86, 114, 142], [6, 34, 62, 90, 118, 146], [6, 30, 54, 78, 102, 126, 150], [6, 24, 50, 76, 102, 128, 154], [6, 28, 54, 80, 106, 132, 158], [6, 32, 58, 84, 110, 136, 162], [6, 26, 54, 82, 110, 138, 166], [6, 30, 58, 86, 114, 142, 170]], (e = {}).getBCHTypeInfo = function (r) {
                for (var t = r << 10; 0 <= x(t) - x(1335);) t ^= 1335 << x(t) - x(1335);
                return 21522 ^ (r << 10 | t)
            }, e.getBCHTypeNumber = function (r) {
                for (var t = r << 12; 0 <= x(t) - x(7973);) t ^= 7973 << x(t) - x(7973);
                return r << 12 | t
            }, e.getPatternPosition = function (r) {
                return t[r - 1]
            }, e.getMaskFunction = function (r) {
                switch (r) {
                    case f:
                        return function (r, t) {
                            return (r + t) % 2 == 0
                        };
                    case c:
                        return function (r, t) {
                            return r % 2 == 0
                        };
                    case s:
                        return function (r, t) {
                            return t % 3 == 0
                        };
                    case l:
                        return function (r, t) {
                            return (r + t) % 3 == 0
                        };
                    case v:
                        return function (r, t) {
                            return (Math.floor(r / 2) + Math.floor(t / 3)) % 2 == 0
                        };
                    case p:
                        return function (r, t) {
                            return r * t % 2 + r * t % 3 == 0
                        };
                    case y:
                        return function (r, t) {
                            return (r * t % 2 + r * t % 3) % 2 == 0
                        };
                    case k:
                        return function (r, t) {
                            return (r * t % 3 + (r + t) % 2) % 2 == 0
                        };
                    default:
                        throw new Error("bad maskPattern:" + r)
                }
            }, e.getErrorCorrectPolynomial = function (r) {
                for (var t = w([1], 0), e = 0; e < r; e += 1) t = t.multiply(w([1, b.gexp(e)], 0));
                return t
            }, e.getLengthInBits = function (r, t) {
                if (1 <= t && t < 10) switch (r) {
                    case n:
                        return 10;
                    case i:
                        return 9;
                    case a:
                    case u:
                        return 8;
                    default:
                        throw new Error("mode:" + r)
                } else if (t < 27) switch (r) {
                    case n:
                        return 12;
                    case i:
                        return 11;
                    case a:
                        return 16;
                    case u:
                        return 10;
                    default:
                        throw new Error("mode:" + r)
                } else {
                    if (!(t < 41)) throw new Error("type:" + t);
                    switch (r) {
                        case n:
                            return 14;
                        case i:
                            return 13;
                        case a:
                            return 16;
                        case u:
                            return 12;
                        default:
                            throw new Error("mode:" + r)
                    }
                }
            }, e.getLostPoint = function (r) {
                for (var t = r.getModuleCount(), e = 0, n = 0; n < t; n += 1) for (var o = 0; o < t; o += 1) {
                    for (var i = 0, a = r.isDark(n, o), u = -1; u <= 1; u += 1) if (!(n + u < 0 || t <= n + u)) for (var f = -1; f <= 1; f += 1) o + f < 0 || t <= o + f || 0 == u && 0 == f || a != r.isDark(n + u, o + f) || (i += 1);
                    5 < i && (e += 3 + i - 5)
                }
                for (n = 0; n < t - 1; n += 1) for (o = 0; o < t - 1; o += 1) {
                    var c = 0;
                    r.isDark(n, o) && (c += 1), r.isDark(n + 1, o) && (c += 1), r.isDark(n, o + 1) && (c += 1), r.isDark(n + 1, o + 1) && (c += 1), 0 != c && 4 != c || (e += 3)
                }
                for (n = 0; n < t; n += 1) for (o = 0; o < t - 6; o += 1) r.isDark(n, o) && !r.isDark(n, o + 1) && r.isDark(n, o + 2) && r.isDark(n, o + 3) && r.isDark(n, o + 4) && !r.isDark(n, o + 5) && r.isDark(n, o + 6) && (e += 40);
                for (o = 0; o < t; o += 1) for (n = 0; n < t - 6; n += 1) r.isDark(n, o) && !r.isDark(n + 1, o) && r.isDark(n + 2, o) && r.isDark(n + 3, o) && r.isDark(n + 4, o) && !r.isDark(n + 5, o) && r.isDark(n + 6, o) && (e += 40);
                var s = 0;
                for (o = 0; o < t; o += 1) for (n = 0; n < t; n += 1) r.isDark(n, o) && (s += 1);
                return e + Math.abs(100 * s / t / t - 50) / 5 * 10
            }, e), b = function () {
                for (var t = new Array(256), e = new Array(256), r = 0; r < 8; r += 1) t[r] = 1 << r;
                for (r = 8; r < 256; r += 1) t[r] = t[r - 4] ^ t[r - 5] ^ t[r - 6] ^ t[r - 8];
                for (r = 0; r < 255; r += 1) e[t[r]] = r;
                var n = {
                    glog: function (r) {
                        if (r < 1) throw new Error("glog(" + r + ")");
                        return e[r]
                    }, gexp: function (r) {
                        for (; r < 0;) r += 255;
                        for (; 256 <= r;) r -= 255;
                        return t[r]
                    }
                };
                return n
            }(),
            C = (d = [[1, 26, 19], [1, 26, 16], [1, 26, 13], [1, 26, 9], [1, 44, 34], [1, 44, 28], [1, 44, 22], [1, 44, 16], [1, 70, 55], [1, 70, 44], [2, 35, 17], [2, 35, 13], [1, 100, 80], [2, 50, 32], [2, 50, 24], [4, 25, 9], [1, 134, 108], [2, 67, 43], [2, 33, 15, 2, 34, 16], [2, 33, 11, 2, 34, 12], [2, 86, 68], [4, 43, 27], [4, 43, 19], [4, 43, 15], [2, 98, 78], [4, 49, 31], [2, 32, 14, 4, 33, 15], [4, 39, 13, 1, 40, 14], [2, 121, 97], [2, 60, 38, 2, 61, 39], [4, 40, 18, 2, 41, 19], [4, 40, 14, 2, 41, 15], [2, 146, 116], [3, 58, 36, 2, 59, 37], [4, 36, 16, 4, 37, 17], [4, 36, 12, 4, 37, 13], [2, 86, 68, 2, 87, 69], [4, 69, 43, 1, 70, 44], [6, 43, 19, 2, 44, 20], [6, 43, 15, 2, 44, 16], [4, 101, 81], [1, 80, 50, 4, 81, 51], [4, 50, 22, 4, 51, 23], [3, 36, 12, 8, 37, 13], [2, 116, 92, 2, 117, 93], [6, 58, 36, 2, 59, 37], [4, 46, 20, 6, 47, 21], [7, 42, 14, 4, 43, 15], [4, 133, 107], [8, 59, 37, 1, 60, 38], [8, 44, 20, 4, 45, 21], [12, 33, 11, 4, 34, 12], [3, 145, 115, 1, 146, 116], [4, 64, 40, 5, 65, 41], [11, 36, 16, 5, 37, 17], [11, 36, 12, 5, 37, 13], [5, 109, 87, 1, 110, 88], [5, 65, 41, 5, 66, 42], [5, 54, 24, 7, 55, 25], [11, 36, 12, 7, 37, 13], [5, 122, 98, 1, 123, 99], [7, 73, 45, 3, 74, 46], [15, 43, 19, 2, 44, 20], [3, 45, 15, 13, 46, 16], [1, 135, 107, 5, 136, 108], [10, 74, 46, 1, 75, 47], [1, 50, 22, 15, 51, 23], [2, 42, 14, 17, 43, 15], [5, 150, 120, 1, 151, 121], [9, 69, 43, 4, 70, 44], [17, 50, 22, 1, 51, 23], [2, 42, 14, 19, 43, 15], [3, 141, 113, 4, 142, 114], [3, 70, 44, 11, 71, 45], [17, 47, 21, 4, 48, 22], [9, 39, 13, 16, 40, 14], [3, 135, 107, 5, 136, 108], [3, 67, 41, 13, 68, 42], [15, 54, 24, 5, 55, 25], [15, 43, 15, 10, 44, 16], [4, 144, 116, 4, 145, 117], [17, 68, 42], [17, 50, 22, 6, 51, 23], [19, 46, 16, 6, 47, 17], [2, 139, 111, 7, 140, 112], [17, 74, 46], [7, 54, 24, 16, 55, 25], [34, 37, 13], [4, 151, 121, 5, 152, 122], [4, 75, 47, 14, 76, 48], [11, 54, 24, 14, 55, 25], [16, 45, 15, 14, 46, 16], [6, 147, 117, 4, 148, 118], [6, 73, 45, 14, 74, 46], [11, 54, 24, 16, 55, 25], [30, 46, 16, 2, 47, 17], [8, 132, 106, 4, 133, 107], [8, 75, 47, 13, 76, 48], [7, 54, 24, 22, 55, 25], [22, 45, 15, 13, 46, 16], [10, 142, 114, 2, 143, 115], [19, 74, 46, 4, 75, 47], [28, 50, 22, 6, 51, 23], [33, 46, 16, 4, 47, 17], [8, 152, 122, 4, 153, 123], [22, 73, 45, 3, 74, 46], [8, 53, 23, 26, 54, 24], [12, 45, 15, 28, 46, 16], [3, 147, 117, 10, 148, 118], [3, 73, 45, 23, 74, 46], [4, 54, 24, 31, 55, 25], [11, 45, 15, 31, 46, 16], [7, 146, 116, 7, 147, 117], [21, 73, 45, 7, 74, 46], [1, 53, 23, 37, 54, 24], [19, 45, 15, 26, 46, 16], [5, 145, 115, 10, 146, 116], [19, 75, 47, 10, 76, 48], [15, 54, 24, 25, 55, 25], [23, 45, 15, 25, 46, 16], [13, 145, 115, 3, 146, 116], [2, 74, 46, 29, 75, 47], [42, 54, 24, 1, 55, 25], [23, 45, 15, 28, 46, 16], [17, 145, 115], [10, 74, 46, 23, 75, 47], [10, 54, 24, 35, 55, 25], [19, 45, 15, 35, 46, 16], [17, 145, 115, 1, 146, 116], [14, 74, 46, 21, 75, 47], [29, 54, 24, 19, 55, 25], [11, 45, 15, 46, 46, 16], [13, 145, 115, 6, 146, 116], [14, 74, 46, 23, 75, 47], [44, 54, 24, 7, 55, 25], [59, 46, 16, 1, 47, 17], [12, 151, 121, 7, 152, 122], [12, 75, 47, 26, 76, 48], [39, 54, 24, 14, 55, 25], [22, 45, 15, 41, 46, 16], [6, 151, 121, 14, 152, 122], [6, 75, 47, 34, 76, 48], [46, 54, 24, 10, 55, 25], [2, 45, 15, 64, 46, 16], [17, 152, 122, 4, 153, 123], [29, 74, 46, 14, 75, 47], [49, 54, 24, 10, 55, 25], [24, 45, 15, 46, 46, 16], [4, 152, 122, 18, 153, 123], [13, 74, 46, 32, 75, 47], [48, 54, 24, 14, 55, 25], [42, 45, 15, 32, 46, 16], [20, 147, 117, 4, 148, 118], [40, 75, 47, 7, 76, 48], [43, 54, 24, 22, 55, 25], [10, 45, 15, 67, 46, 16], [19, 148, 118, 6, 149, 119], [18, 75, 47, 31, 76, 48], [34, 54, 24, 34, 55, 25], [20, 45, 15, 61, 46, 16]], (r = {}).getRSBlocks = function (r, t) {
                var e, n, o = function (r, t) {
                    switch (t) {
                        case m.L:
                            return d[4 * (r - 1) + 0];
                        case m.M:
                            return d[4 * (r - 1) + 1];
                        case m.Q:
                            return d[4 * (r - 1) + 2];
                        case m.H:
                            return d[4 * (r - 1) + 3];
                        default:
                            return
                    }
                }(r, t);
                if (void 0 === o) throw new Error("bad rs block @ typeNumber:" + r + "/errorCorrectLevel:" + t);
                for (var i = o.length / 3, a = new Array, u = 0; u < i; u += 1) for (var f = o[3 * u + 0], c = o[3 * u + 1], s = o[3 * u + 2], l = 0; l < f; l += 1) a.push((e = s, n = void 0, (n = {}).totalCount = c, n.dataCount = e, n));
                return a
            }, r), B = function () {
                var e = new Array, n = 0, o = {
                    getBuffer: function () {
                        return e
                    }, getAt: function (r) {
                        var t = Math.floor(r / 8);
                        return 1 == (e[t] >>> 7 - r % 8 & 1)
                    }, put: function (r, t) {
                        for (var e = 0; e < t; e += 1) o.putBit(1 == (r >>> t - e - 1 & 1))
                    }, getLengthInBits: function () {
                        return n
                    }, putBit: function (r) {
                        var t = Math.floor(n / 8);
                        e.length <= t && e.push(0), r && (e[t] |= 128 >>> n % 8), n += 1
                    }
                };
                return o
            }, L = function (r) {
                var t = a, e = o.stringToBytes(r), n = {
                    getMode: function () {
                        return t
                    }, getLength: function (r) {
                        return e.length
                    }, write: function (r) {
                        for (var t = 0; t < e.length; t += 1) r.put(e[t], 8)
                    }
                };
                return n
            }, S = function (r) {
                var e = r, n = 0, o = 0, i = 0, t = {
                    read: function () {
                        for (; i < 8;) {
                            if (n >= e.length) {
                                if (0 == i) return -1;
                                throw new Error("unexpected end of file./" + i)
                            }
                            var r = e.charAt(n);
                            if (n += 1, "=" == r) return i = 0, -1;
                            r.match(/^\s$/) || (o = o << 6 | a(r.charCodeAt(0)), i += 6)
                        }
                        var t = o >>> i - 8 & 255;
                        return i -= 8, t
                    }
                }, a = function (r) {
                    if (65 <= r && r <= 90) return r - 65;
                    if (97 <= r && r <= 122) return r - 97 + 26;
                    if (48 <= r && r <= 57) return r - 48 + 52;
                    if (43 == r) return 62;
                    if (47 == r) return 63;
                    throw new Error("c:" + r)
                };
                return t
            }, A = function (r, t, e, n) {
                for (var o = h(r, t), i = 0; i < t; i += 1) for (var a = 0; a < r; a += 1) o.setPixel(a, i, e(a, i));
                var u = g();
                o.write(u);
                for (var f = function () {
                    function e(r) {
                        a += String.fromCharCode(t(63 & r))
                    }

                    var n = 0, o = 0, i = 0, a = "", r = {}, t = function (r) {
                        if (r < 0) ; else {
                            if (r < 26) return 65 + r;
                            if (r < 52) return r - 26 + 97;
                            if (r < 62) return r - 52 + 48;
                            if (62 == r) return 43;
                            if (63 == r) return 47
                        }
                        throw new Error("n:" + r)
                    };
                    return r.writeByte = function (r) {
                        for (n = n << 8 | 255 & r, o += 8, i += 1; 6 <= o;) e(n >>> o - 6), o -= 6
                    }, r.flush = function () {
                        if (0 < o && (e(n << 6 - o), o = n = 0), i % 3 != 0) for (var r = 3 - i % 3, t = 0; t < r; t += 1) a += "="
                    }, r.toString = function () {
                        return a
                    }, r
                }(), c = u.toByteArray(), s = 0; s < c.length; s += 1) f.writeByte(c[s]);
                f.flush();
                var l = "";
                return l += "<img", l += ' src="', l += "data:image/gif;base64,", l += f, l += '"', l += ' width="', l += r, l += '"', l += ' height="', l += t, l += '"', n && (l += ' alt="', l += n, l += '"'), l + "/>"
            };

        function x(r) {
            for (var t = 0; 0 != r;) t += 1, r >>>= 1;
            return t
        }

        return o
    }();
    return r = function () {
        return t
    }, "function" == typeof define && define.amd ? define([], r) : "object" == typeof exports && (module.exports = r()), t.stringToBytes = function (r) {
        return function (r) {
            for (var t = [], e = 0; e < r.length; e++) {
                var n = r.charCodeAt(e);
                n < 128 ? t.push(n) : n < 2048 ? t.push(192 | n >> 6, 128 | 63 & n) : n < 55296 || 57344 <= n ? t.push(224 | n >> 12, 128 | n >> 6 & 63, 128 | 63 & n) : (e++, n = 65536 + ((1023 & n) << 10 | 1023 & r.charCodeAt(e)), t.push(240 | n >> 18, 128 | n >> 12 & 63, 128 | n >> 6 & 63, 128 | 63 & n))
            }
            return t
        }(r)
    }, t
}()), function (f) {
    f.fn.share = function (r) {
        var t = f(document.head), e = {
            url: location.href,
            site_url: location.origin,
            source: t.find("[name=site], [name=Site]").attr("content") || document.title,
            title: t.find("[name=title], [name=Title]").attr("content") || document.title,
            description: t.find("[name=description], [name=Description]").attr("content") || "",
            image: f("img:first").prop("src") || "",
            imageSelector: void 0,
            weiboKey: "",
            wechatQrcodeTitle: "微信扫一扫：分享",
             wechatQrcodeHelper: "<p>扫一扫，分享给好友或朋友圈</p>",
            wechatQrcodeSize: 100,
            mobileSites: [],
            sites: ["weibo", "qq", "wechat", "tencent", "douban", "qzone", "linkedin", "diandian", "facebook", "twitter", "google"],
            disabled: [],
            initialized: !1
        }, n = f.extend({}, e, r), a = {
            qzone: "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url={{URL}}&title={{TITLE}}&desc={{DESCRIPTION}}&summary={{SUMMARY}}&site={{SOURCE}}&pics={{IMAGE}}",
            qq: "http://connect.qq.com/widget/shareqq/index.html?url={{URL}}&title={{TITLE}}&source={{SOURCE}}&desc={{DESCRIPTION}}&pics={{IMAGE}}",
            tencent: "http://share.v.t.qq.com/index.php?c=share&a=index&title={{TITLE}}&url={{URL}}&pic={{IMAGE}}",
            weibo: "https://service.weibo.com/share/share.php?url={{URL}}&title={{TITLE}}&pic={{IMAGE}}&appkey={{WEIBOKEY}}",
            wechat: "javascript:;",
            douban: "http://shuo.douban.com/!service/share?href={{URL}}&name={{TITLE}}&text={{DESCRIPTION}}&image={{IMAGE}}&starid=0&aid=0&style=11",
            diandian: "http://www.diandian.com/share?lo={{URL}}&ti={{TITLE}}&type=link",
            linkedin: "http://www.linkedin.com/shareArticle?mini=true&ro=true&title={{TITLE}}&url={{URL}}&summary={{SUMMARY}}&source={{SOURCE}}&armin=armin",
            facebook: "https://www.facebook.com/sharer/sharer.php?u={{URL}}&title={{TITLE}}&description={{DESCRIPTION}}&caption={{SUBHEAD}}&link={{URL}}&picture={{IMAGE}}",
            twitter: "https://twitter.com/intent/tweet?text={{TITLE}}&url={{URL}}&via={{SITE_URL}}",
            google: "https://plus.google.com/share?url={{URL}}"
        }, u = {
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
        this.each(function () {
            if (f(this).data("initialized")) return !0;
            var r = f.extend({}, n, f(this).data());
            r.imageSelector && (r.image = f(r.imageSelector).map(function () {
                return f(this).prop("src")
            }).get().join("||"));
            var t = f(this).addClass("share-component social-share");
            !function (o, i) {
                var r = function (r) {
                    0 === r.mobileSites.length && r.sites.length && (r.mobileSites = r.sites);
                    var n = (f(window).width() <= 768 ? r.mobileSites : r.sites.length ? r.sites : []).slice(0),
                        t = r.disabled;
                    "string" == typeof n && (n = n.split(/\s*,\s*/));
                    "string" == typeof t && (t = t.split(/\s*,\s*/));
                    /MicroMessenger/i.test(navigator.userAgent) && t.push("wechat");
                    return t.length && f.each(t, function (r, t) {
                        var e = f.inArray(t, n);
                        -1 !== e && n.splice(e, 1)
                    }), n
                }(i);
                if ("prepend" == i.mode && r.reverse(), !r.length) return;
                f.each(r, function (r, t) {
                    var e = function (r, t) {
                            var e = a[r];
                            for (var n in t.summary = t.description, t) if (t.hasOwnProperty(n)) {
                                var o = r + n.replace(/^[a-z]/, function (r) {
                                    return r.toUpperCase()
                                }), i = encodeURIComponent(void 0 === t[o] ? t[n] : t[o]);
                                e = e.replace(new RegExp("{{" + n.toUpperCase() + "}}", "g"), i)
                            }
                            return e
                        }(t, i),
                        n = i.initialized ? o.find(".icon-" + t) : f('<a class="social-share-icon icon-' + t + '"></a>');
                    if (!n.length) return !0;
                    n.prop("aria-label", "分享到 " + u[t]), n.prop("href", e), "wechat" === t ? n.prop("tabindex", -1) : n.prop("target", "_blank"), i.initialized || ("prepend" == i.mode ? o.prepend(n) : o.append(n))
                })
            }(t, r), function (r, t) {
                var e = r.find("a.icon-wechat");
                if (!e.length) return;
                e.append('<div class="wechat-qrcode"><h4>' + t.wechatQrcodeTitle + '</h4><div class="qrcode"></div><div class="help">' + t.wechatQrcodeHelper + "</div></div>"), e.find(".qrcode").qrcode({
                    render: "image",
                    size: t.wechatQrcodeSize,
                    text: t.url
                }), e.offset().top < 100 && e.find(".wechat-qrcode").addClass("bottom")
            }(t, r), f(this).data("initialized", !0)
        })
    }, f(function () {
        f(".share-component,.social-share").share()
    })
}(jQuery);