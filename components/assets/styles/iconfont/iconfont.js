(window._iconfont_svg_string_4320336 =
  '<svg><symbol id="ytUi-xianshi" viewBox="0 0 1088 1024"><path d="M544 128c188.544 0 359.168 128 512 384-152.832 256-323.456 384-512 384-188.544 0-359.168-128-512-384 152.832-256 323.456-384 512-384z m0 192c-57.344 0-108.8 25.152-144 65.024l6.4-0.64L416 384a128 128 0 1 1-16 255.04A192 192 0 1 0 544 320z"  ></path></symbol><symbol id="ytUi-yincang" viewBox="0 0 1088 1024"><path d="M896.64 82.048l45.312 45.312L172.608 896.64l-45.248-45.248 95.04-95.04C156.16 695.04 92.672 613.632 32 512c152.832-256 323.456-384 512-384 81.6 0 159.872 24 234.816 71.936l117.824-117.888z m-31.04 185.6C931.84 328.96 995.328 410.368 1056 512c-152.832 256-323.456 384-512 384-81.6 0-159.808-24-234.752-71.936l143.232-143.232a192 192 0 0 0 260.352-260.352l152.768-152.832zM544 320a192 192 0 0 0-168.832 283.52l260.416-260.352A191.168 191.168 0 0 0 544 320z"  ></path></symbol></svg>'),
  (function (n) {
    var t = (t = document.getElementsByTagName("script"))[t.length - 1],
      e = t.getAttribute("data-injectcss"),
      t = t.getAttribute("data-disable-injectsvg");
    if (!t) {
      var i,
        o,
        c,
        d,
        a,
        s = function (t, e) {
          e.parentNode.insertBefore(t, e);
        };
      if (e && !n.__iconfont__svg__cssinject__) {
        n.__iconfont__svg__cssinject__ = !0;
        try {
          document.write(
            "<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>"
          );
        } catch (t) {
          console && console.log(t);
        }
      }
      (i = function () {
        var t,
          e = document.createElement("div");
        (e.innerHTML = n._iconfont_svg_string_4320336),
          (e = e.getElementsByTagName("svg")[0]) &&
            (e.setAttribute("aria-hidden", "true"),
            (e.style.position = "absolute"),
            (e.style.width = 0),
            (e.style.height = 0),
            (e.style.overflow = "hidden"),
            (e = e),
            (t = document.body).firstChild
              ? s(e, t.firstChild)
              : t.appendChild(e));
      }),
        document.addEventListener
          ? ~["complete", "loaded", "interactive"].indexOf(document.readyState)
            ? setTimeout(i, 0)
            : ((o = function () {
                document.removeEventListener("DOMContentLoaded", o, !1), i();
              }),
              document.addEventListener("DOMContentLoaded", o, !1))
          : document.attachEvent &&
            ((c = i),
            (d = n.document),
            (a = !1),
            r(),
            (d.onreadystatechange = function () {
              "complete" == d.readyState &&
                ((d.onreadystatechange = null), l());
            }));
    }
    function l() {
      a || ((a = !0), c());
    }
    function r() {
      try {
        d.documentElement.doScroll("left");
      } catch (t) {
        return void setTimeout(r, 50);
      }
      l();
    }
  })(window);
