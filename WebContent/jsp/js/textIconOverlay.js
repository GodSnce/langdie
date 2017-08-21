var BMapLib = window.BMapLib = BMapLib || {};
(function() {
	var t, e = t = e || {
		version : "1.3.8"
	};
	(function() {
		e.guid = "$BAIDU$";
		window[e.guid] = window[e.guid] || {};
		e.dom = e.dom || {};
		e.dom.g = function(t) {
			if ("string" == typeof t || t instanceof String) {
				return document.getElementById(t)
			} else if (t && t.nodeName && (t.nodeType == 1 || t.nodeType == 9)) {
				return t
			}
			return null
		};
		e.g = e.G = e.dom.g;
		e.dom.getDocument = function(t) {
			t = e.dom.g(t);
			return t.nodeType == 9 ? t : t.ownerDocument || t.document
		};
		e.lang = e.lang || {};
		e.lang.isString = function(t) {
			return "[object String]" == Object.prototype.toString.call(t)
		};
		e.isString = e.lang.isString;
		e.dom._g = function(t) {
			if (e.lang.isString(t)) {
				return document.getElementById(t)
			}
			return t
		};
		e._g = e.dom._g;
		e.browser = e.browser || {};
		if (/msie (\d+\.\d)/i.test(navigator.userAgent)) {
			e.browser.ie = e.ie = document.documentMode || +RegExp["$1"]
		}
		e.dom.getComputedStyle = function(t, i) {
			t = e.dom._g(t);
			var n = e.dom.getDocument(t), o;
			if (n.defaultView && n.defaultView.getComputedStyle) {
				o = n.defaultView.getComputedStyle(t, null);
				if (o) {
					return o[i] || o.getPropertyValue(i)
				}
			}
			return ""
		};
		e.dom._styleFixer = e.dom._styleFixer || {};
		e.dom._styleFilter = e.dom._styleFilter || [];
		e.dom._styleFilter.filter = function(t, i, n) {
			for (var o = 0, s = e.dom._styleFilter, r; r = s[o]; o++) {
				if (r = r[n]) {
					i = r(t, i)
				}
			}
			return i
		};
		e.string = e.string || {};
		e.string.toCamelCase = function(t) {
			if (t.indexOf("-") < 0 && t.indexOf("_") < 0) {
				return t
			}
			return t.replace(/[-_][^-_]/g, function(t) {
				return t.charAt(1).toUpperCase()
			})
		};
		e.dom.getStyle = function(t, i) {
			var n = e.dom;
			t = n.g(t);
			i = e.string.toCamelCase(i);
			var o = t.style[i] || (t.currentStyle ? t.currentStyle[i] : "")
					|| n.getComputedStyle(t, i);
			if (!o) {
				var s = n._styleFixer[i];
				if (s) {
					o = s.get ? s.get(t) : e.dom.getStyle(t, s)
				}
			}
			if (s = n._styleFilter) {
				o = s.filter(i, o, "get")
			}
			return o
		};
		e.getStyle = e.dom.getStyle;
		if (/opera\/(\d+\.\d)/i.test(navigator.userAgent)) {
			e.browser.opera = +RegExp["$1"]
		}
		e.browser.isWebkit = /webkit/i.test(navigator.userAgent);
		e.browser.isGecko = /gecko/i.test(navigator.userAgent)
				&& !/like gecko/i.test(navigator.userAgent);
		e.browser.isStrict = document.compatMode == "CSS1Compat";
		e.dom.getPosition = function(t) {
			t = e.dom.g(t);
			var i = e.dom.getDocument(t), n = e.browser, o = e.dom.getStyle, s = n.isGecko > 0
					&& i.getBoxObjectFor
					&& o(t, "position") == "absolute"
					&& (t.style.top === "" || t.style.left === ""), r = {
				left : 0,
				top : 0
			}, a = n.ie && !n.isStrict ? i.body : i.documentElement, l, p;
			if (t == a) {
				return r
			}
			if (t.getBoundingClientRect) {
				p = t.getBoundingClientRect();
				r.left = Math.floor(p.left)
						+ Math.max(i.documentElement.scrollLeft,
								i.body.scrollLeft);
				r.top = Math.floor(p.top)
						+ Math.max(i.documentElement.scrollTop,
								i.body.scrollTop);
				r.left -= i.documentElement.clientLeft;
				r.top -= i.documentElement.clientTop;
				var u = i.body, d = parseInt(o(u, "borderLeftWidth")), f = parseInt(o(
						u, "borderTopWidth"));
				if (n.ie && !n.isStrict) {
					r.left -= isNaN(d) ? 2 : d;
					r.top -= isNaN(f) ? 2 : f
				}
			} else {
				l = t;
				do {
					r.left += l.offsetLeft;
					r.top += l.offsetTop;
					if (n.isWebkit > 0 && o(l, "position") == "fixed") {
						r.left += i.body.scrollLeft;
						r.top += i.body.scrollTop;
						break
					}
					l = l.offsetParent
				} while (l && l != t);
				if (n.opera > 0 || n.isWebkit > 0
						&& o(t, "position") == "absolute") {
					r.top -= i.body.offsetTop
				}
				l = t.offsetParent;
				while (l && l != i.body) {
					r.left -= l.scrollLeft;
					if (!n.opera || l.tagName != "TR") {
						r.top -= l.scrollTop
					}
					l = l.offsetParent
				}
			}
			return r
		};
		e.event = e.event || {};
		e.event._listeners = e.event._listeners || [];
		e.event.on = function(t, i, n) {
			i = i.replace(/^on/i, "");
			t = e.dom._g(t);
			var o = function(e) {
				n.call(t, e)
			}, s = e.event._listeners, r = e.event._eventFilter, a, l = i;
			i = i.toLowerCase();
			if (r && r[i]) {
				a = r[i](t, i, o);
				l = a.type;
				o = a.listener
			}
			if (t.addEventListener) {
				t.addEventListener(l, o, false)
			} else if (t.attachEvent) {
				t.attachEvent("on" + l, o)
			}
			s[s.length] = [ t, i, n, o, l ];
			return t
		};
		e.on = e.event.on;
		(function() {
			var t = window[e.guid];
			e.lang.guid = function() {
				return "TANGRAM__" + (t._counter++).toString(36)
			};
			t._counter = t._counter || 1
		})();
		window[e.guid]._instances = window[e.guid]._instances || {};
		e.lang.isFunction = function(t) {
			return "[object Function]" == Object.prototype.toString.call(t)
		};
		e.lang.Class = function(t) {
			this.guid = t || e.lang.guid();
			window[e.guid]._instances[this.guid] = this
		};
		window[e.guid]._instances = window[e.guid]._instances || {};
		e.lang.Class.prototype.dispose = function() {
			delete window[e.guid]._instances[this.guid];
			for ( var t in this) {
				if (!e.lang.isFunction(this[t])) {
					delete this[t]
				}
			}
			this.disposed = true
		};
		e.lang.Class.prototype.toString = function() {
			return "[object " + (this._className || "Object") + "]"
		};
		e.lang.Event = function(t, e) {
			this.type = t;
			this.returnValue = true;
			this.target = e || null;
			this.currentTarget = null
		};
		e.lang.Class.prototype.addEventListener = function(t, i, n) {
			if (!e.lang.isFunction(i)) {
				return
			}
			!this.__listeners && (this.__listeners = {});
			var o = this.__listeners, s;
			if (typeof n == "string" && n) {
				if (/[^\w\-]/.test(n)) {
					throw "nonstandard key:" + n
				} else {
					i.hashCode = n;
					s = n
				}
			}
			t.indexOf("on") != 0 && (t = "on" + t);
			typeof o[t] != "object" && (o[t] = {});
			s = s || e.lang.guid();
			i.hashCode = s;
			o[t][s] = i
		};
		e.lang.Class.prototype.removeEventListener = function(t, i) {
			if (typeof i != "undefined") {
				if (e.lang.isFunction(i) && !(i = i.hashCode)
						|| !e.lang.isString(i)) {
					return
				}
			}
			!this.__listeners && (this.__listeners = {});
			t.indexOf("on") != 0 && (t = "on" + t);
			var n = this.__listeners;
			if (!n[t]) {
				return
			}
			if (typeof i != "undefined") {
				n[t][i] && delete n[t][i]
			} else {
				for ( var o in n[t]) {
					delete n[t][o]
				}
			}
		};
		e.lang.Class.prototype.dispatchEvent = function(t, i) {
			if (e.lang.isString(t)) {
				t = new e.lang.Event(t)
			}
			!this.__listeners && (this.__listeners = {});
			i = i || {};
			for ( var n in i) {
				t[n] = i[n]
			}
			var n, o = this.__listeners, s = t.type;
			t.target = t.target || this;
			t.currentTarget = this;
			s.indexOf("on") != 0 && (s = "on" + s);
			e.lang.isFunction(this[s]) && this[s].apply(this, arguments);
			if (typeof o[s] == "object") {
				for (n in o[s]) {
					o[s][n].apply(this, arguments)
				}
			}
			return t.returnValue
		};
		e.lang.inherits = function(t, e, i) {
			var n, o, s = t.prototype, r = new Function;
			r.prototype = e.prototype;
			o = t.prototype = new r;
			for (n in s) {
				o[n] = s[n]
			}
			t.prototype.constructor = t;
			t.superClass = e.prototype;
			if ("string" == typeof i) {
				o._className = i
			}
		};
		e.inherits = e.lang.inherits
	})();
	var i = "http://api.map.baidu.com/library/TextIconOverlay/1.2/src/images/m";
	var n = "png";
	var o = BMapLib.TextIconOverlay = function(t, e, i) {
		this._position = t;
		this._text = e;
		this._options = i || {};
		this._styles = this._options["styles"] || [];
		!this._styles.length && this._setupDefaultStyles()
	};
	t.lang.inherits(o, BMap.Overlay, "TextIconOverlay");
	o.prototype._setupDefaultStyles = function() {
		var t = [ 53, 56, 66, 78, 90 ];
		for (var e = 0, o; o = t[e]; e++) {
			this._styles.push({
				url : i + e + "." + n,
				size : new BMap.Size(o, o)
			})
		}
	};
	o.prototype.initialize = function(t) {
		this._map = t;
		this._domElement = document.createElement("div");
		this._updateCss();
		this._updateText();
		this._updatePosition();
		this._bind();
		this._map.getPanes().markerMouseTarget.appendChild(this._domElement);
		return this._domElement
	};
	o.prototype.draw = function() {
		this._map && this._updatePosition()
	};
	o.prototype.getText = function() {
		return this._text
	};
	o.prototype.setText = function(t) {
		if (t && (!this._text || this._text.toString() != t.toString())) {
			this._text = t;
			this._updateText();
			this._updateCss();
			this._updatePosition()
		}
	};
	o.prototype.getPosition = function() {
		return this._position
	};
	o.prototype.setPosition = function(t) {
		if (t && (!this._position || !this._position.equals(t))) {
			this._position = t;
			this._updatePosition()
		}
	};
	o.prototype.getStyleByText = function(t, e) {
		var i = parseInt(t);
		if (!i)
			i = 0;
		var n = parseInt(i / 10);
		n = Math.max(0, n);
		n = Math.min(n, e.length - 1);
		return e[n]
	};
	o.prototype._updateCss = function() {
		var t = this.getStyleByText(this._text, this._styles);
		this._domElement.style.cssText = this._buildCssText(t)
	};
	o.prototype._updateText = function() {
		if (this._domElement) {
			this._domElement.innerHTML = this._text
		}
	};
	o.prototype._updatePosition = function() {
		if (this._domElement && this._position) {
			var t = this._domElement.style;
			var e = this._map.pointToOverlayPixel(this._position);
			e.x -= Math.ceil(parseInt(t.width) / 2);
			e.y -= Math.ceil(parseInt(t.height) / 2);
			t.left = e.x + "px";
			t.top = e.y + "px"
		}
	};
	o.prototype._buildCssText = function(e) {
		var i = e["url"];
		var n = e["size"];
		var o = e["anchor"];
		var s = e["offset"];
		var r = e["textColor"] || "black";
		var a = e["textSize"] || 10;
		var l = [];
		if (t.browser["ie"] < 7) {
			l.push("filter:progid:DXImageTransform.Microsoft.AlphaImageLoader("
					+ 'sizingMethod=scale,src="' + i + '");')
		} else {
			l.push("background-image:url(" + i + ");");
			var p = "0 0";
			s instanceof BMap.Size
					&& (p = s.width + "px" + " " + s.height + "px");
			l.push("background-position:" + p + ";")
		}
		if (n instanceof BMap.Size) {
			if (o instanceof BMap.Size) {
				if (o.height > 0 && o.height < n.height) {
					l.push("height:" + (n.height - o.height)
							+ "px; padding-top:" + o.height + "px;")
				}
				if (o.width > 0 && o.width < n.width) {
					l.push("width:" + (n.width - o.width) + "px; padding-left:"
							+ o.width + "px;")
				}
			} else {
				l.push("height:" + n.height + "px; line-height:" + n.height
						+ "px;");
				l.push("width:" + n.width + "px; text-align:center;")
			}
		}
		l.push("cursor:pointer; color:" + r + "; position:absolute; font-size:"
				+ a + "px; font-family:Arial,sans-serif; font-weight:bold");
		return l.join("")
	};
	o.prototype._bind = function() {
		if (!this._domElement) {
			return
		}
		var e = this;
		var i = this._map;
		var n = t.lang.Event;
		function o(e, n) {
			var o = e.srcElement || e.target;
			var s = e.clientX || e.pageX;
			var r = e.clientY || e.pageY;
			if (e && n && s && r && o) {
				var a = t.dom.getPosition(i.getContainer());
				n.pixel = new BMap.Pixel(s - a.left, r - a.top);
				n.point = i.pixelToPoint(n.pixel)
			}
			return n
		}
		t.event.on(this._domElement, "mouseover", function(t) {
			e.dispatchEvent(o(t, new n("onmouseover")))
		});
		t.event.on(this._domElement, "mouseout", function(t) {
			e.dispatchEvent(o(t, new n("onmouseout")))
		});
		t.event.on(this._domElement, "click", function(t) {
			e.dispatchEvent(o(t, new n("onclick")))
		})
	}
})();