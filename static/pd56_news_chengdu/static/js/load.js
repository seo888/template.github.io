!
    function(t, e) {
        "function" == typeof define && define.amd ? define(function() {
            return e(t)
        }) : "object" == typeof exports ? module.exports = e: t.echo = e(t)
    } (this,
        function(t) {
            "use strict";
            var e, n, o, r, c, a = {},
                d = function() {},
                u = function(t, e) {
                    var n = t.getBoundingClientRect();
                    return n.right >= e.l && n.bottom >= e.t && n.left <= e.r && n.top <= e.b
                },
                l = function() { (r || !n) && (clearTimeout(n), n = setTimeout(function() {
                        a.render(),
                            n = null
                    },
                    o))
                };
            return a.init = function(n) {
                n = n || {};
                var u = n.offset || 0,
                    i = n.offsetVertical || u,
                    f = n.offsetHorizontal || u,
                    s = function(t, e) {
                        return parseInt(t || e, 10)
                    };
                e = {
                    t: s(n.offsetTop, i),
                    b: s(n.offsetBottom, i),
                    l: s(n.offsetLeft, f),
                    r: s(n.offsetRight, f)
                },
                    o = s(n.throttle, 250),
                    r = n.debounce !== !1,
                    c = !!n.unload,
                    d = n.callback || d,
                    a.render(),
                    document.addEventListener ? (t.addEventListener("scroll", l, !1), t.addEventListener("load", l, !1)) : (t.attachEvent("onscroll", l), t.attachEvent("onload", l))
            },
                a.render = function() {
                    for (var n, o, r = document.querySelectorAll("img[data-echo], [data-echo-background]"), l = r.length, i = {
                            l: 0 - e.l,
                            t: 0 - e.t,
                            b: (t.innerHeight || document.documentElement.clientHeight) + e.b,
                            r: (t.innerWidth || document.documentElement.clientWidth) + e.r
                        },
                             f = 0; l > f; f++) o = r[f],
                        u(o, i) ? (c && o.setAttribute("data-echo-placeholder", o.src), null !== o.getAttribute("data-echo-background") ? o.style.backgroundImage = "url(" + o.getAttribute("data-echo-background") + ")": o.src = o.getAttribute("data-echo"), c || o.removeAttribute("data-echo"), d(o, "load")) : c && (n = o.getAttribute("data-echo-placeholder")) && (null !== o.getAttribute("data-echo-background") ? o.style.backgroundImage = "url(" + n + ")": o.src = n, o.removeAttribute("data-echo-placeholder"), d(o, "unload"));
                    l || a.detach()
                },
                a.detach = function() {
                    document.removeEventListener ? t.removeEventListener("scroll", l) : t.detachEvent("onscroll", l),
                        clearTimeout(n)
                },
                a
        });
window.onload = function() {

    var timer = null;
    var isTop = true;
    var obtn = document.getElementById('top');
    obtn.onclick = function() {
        if(!isTop){return}
        timer = setInterval(function() {
                var osTop = document.documentElement.scrollTop || document.body.scrollTop;
                var isSpeed = Math.floor( - osTop / 6);
                document.documentElement.scrollTop = document.body.scrollTop = osTop + isSpeed;
                if (osTop === 0) {
                   clearInterval(timer);
                    isTop = true;
                }else{
                    isTop = false;
                }
            },
            15);
    };
    var client_height = document.documentElement.clientHeight || document.body.clientHeight;
    window.onscroll = function() {
        return;
        var osTop = document.documentElement.scrollTop || document.body.scrollTop;
        if (osTop >= client_height) {
            obtn.style.opacity = '1';
        } else {
            obtn.style.opacity = '0';
        }
        if (!isTop) {
            clearInterval(timer);
        }
        isTop = false;
    };
};
echo.init();