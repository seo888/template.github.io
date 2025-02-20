var SwipeSlide = function(a, b) {
		this.options = $.extend({
			first: 0,
			visibleSlides: 1,
			vertical: !1,
			tolerance: 0.1,
			delay: 0.5,
			easing: "ease-out",
			autoPlay: !1,
			useTranslate3d: !0,
			bulletNavigation: "link",
			bulletNavigationObj: null,
			bulletChangeNum: !1,
			directionalNavigation: !1,
			beforeChange: null,
			afterChange: null
		}, b);
		this.isVertical = !! this.options.vertical;
		this.container = $(a).addClass("ui-swipeslide").addClass("ui-swipeslide-" + (this.isVertical ? "vertical" : "horizontal"));
		this.reel = this.container.children().first().addClass("ui-swipeslide-reel");
		this.slides = this.reel.children().addClass("ui-swipeslide-slide");
		this.numPages = Math.ceil(this.slides.length / this.options.visibleSlides);
		this.currentPage = this.validPage(this.options.first);
		this.touch = {};
		this.isTouch = "ontouchstart" in document.documentElement;
		this.events = {
			start: this.isTouch ? "touchstart" : "mousedown",
			move: this.isTouch ? "touchmove" : "mousemove",
			end: this.isTouch ? "touchend touchcancel touchleave" : "mouseup mouseout mouseleave",
			click: this.isTouch ? "touchend" : "click"
		};
		this.setup();
		this.addEventListeners();
		this.options.directionalNavigation && this.setupDirectionalNavigation();
		this.options.bulletNavigation && this.setupBulletNavigation();
		this.options.autoPlay && this.autoPlay()
	};
SwipeSlide.prototype = {
	page: function(a) {
		this.stopAutoPlay();
		var a = this.validPage(a),
			b;
		this.currentPage != a ? ($.isFunction(this.options.beforeChange) && this.options.beforeChange(this, this.currentPage, a), this.currentPage = a, b = $.proxy(this.callback, this)) : this.options.autoPlay && (b = $.proxy(this.autoPlay, this));
		this.move(0, this.options.delay, b);
		this.options.bulletNavigation && this.setActiveBullet();
		this.options.bulletChangeNum && this.setBulletChangeNum()
	},
	first: function() {
		this.page(0)
	},
	next: function() {
		this.page(this.currentPage + 1)
	},
	prev: function() {
		this.page(this.currentPage - 1)
	},
	last: function() {
		this.page(this.numPages - 1)
	},
	isFirst: function() {
		return 0 == this.currentPage
	},
	isLast: function() {
		return this.currentPage == this.numPages - 1
	},
	validPage: function(a) {
		return Math.max(Math.min(a, this.numPages - 1), 0)
	},
	autoPlay: function() {
		if (this.timeout) return !1;
		var a = this.isLast() ? this.first : this.next;
		this.timeout = setTimeout($.proxy(a, this), 1E3 * this.options.autoPlay)
	},
	stopAutoPlay: function() {
		clearTimeout(this.timeout);
		delete this.timeout
	},
	visibleSlides: function() {
		return this.slides.slice(this.currentPage, this.currentPage + this.options.visibleSlides)
	},
	move: function(a, b, c) {
		this.reel.animate(this.animationProperties(a), {
			duration: 1E3 * b,
			easing: this.options.easing,
			complete: c
		})
	},
	animationProperties: function(a) {
		var a = -this.currentPage * this.dimension + a + "px",
			b = {};
		this.options.useTranslate3d ? b.translate3d = (this.isVertical ? "0," + a : a + ",0") + ",0" : b[this.isVertical ? "translateY" : "translateX"] = a;
		return b
	},
	setup: function() {
		var a = this.isVertical ? "height" : "width";
		this.dimension = this.container[a]();
		this.tolerance = this.options.tolerance * this.dimension / 2;
		this.reel[a](this.dimension * this.numPages + "px");
		this.slides[a](this.dimension / this.options.visibleSlides + "px");
		this.move(0, 0)
	},
	addEventListeners: function() {
		this.reel.on(this.events.start, $.proxy(this.touchStart, this)).on(this.events.move, $.proxy(this.touchMove, this)).on(this.events.end, $.proxy(this.touchEnd, this));
		this.container.on(this.events.click, ".next", $.proxy(this.next, this)).on(this.events.click, ".prev", $.proxy(this.prev, this)).on(this.events.click, ".first", $.proxy(this.first, this)).on(this.events.click, ".last", $.proxy(this.last, this));
		$(window).on("resize", $.proxy(this.setup, this))
	},
	touchStart: function(a) {
		this.touch.start = this.trackTouch(a);
		delete this.isScroll;
		if (!this.isTouch) return !1
	},
	touchMove: function(a) {
		if (this.touch.start && (this.touch.end = this.trackTouch(a), a = this.distance(this.isVertical), "undefined" == typeof this.isScroll && (this.isScroll = Math.abs(a) < Math.abs(this.distance(!this.isVertical))), !this.isScroll)) return this.stopAutoPlay(), this.move(this.withResistance(a), 0), !1
	},
	touchEnd: function() {
		if (!this.isScroll) {
			var a = this.distance(this.isVertical),
				b = 0;
			Math.abs(a) > this.tolerance && (b = 0 > a ? 1 : -1);
			this.page(this.currentPage + b)
		}
		this.touch = {};
		return !1
	},
	trackTouch: function(a) {
		a = this.isTouch ? a.touches[0] : a;
		return {
			x: a.pageX,
			y: a.pageY
		}
	},
	distance: function(a) {
		a = a ? "y" : "x";
		try {
			return this.touch.end[a] - this.touch.start[a]
		} catch (b) {
			return 0
		}
	},
	withResistance: function(a) {
		if (this.isFirst() && 0 < a || this.isLast() && 0 > a) a /= 1 + Math.abs(a) / this.dimension;
		return a
	},
	callback: function() {
		$.isFunction(this.options.afterChange) && this.options.afterChange(this, this.currentPage);
		this.options.autoPlay && this.autoPlay()
	},
	setupDirectionalNavigation: function() {
		this.container.append('<ul class="ui-swipeslide-nav"><li class="prev">Previous</li><li class="next">Next</li></ul>')
	},
	setupBulletNavigation: function() {
		this.navBullets = this.options.bulletNavigationObj ? this.options.bulletNavigationObj : $('<ul class="ui-swipeslide-bullets"></ul>');
		for (i = 0; i < this.numPages; i++) this.navBullets.append('<li data-index="' + i + '">' + (i + 1) + "</li>");
		if ("link" == this.options.bulletNavigation) this.navBullets.on(this.events.click, "li", $.proxy(function(a) {
			this.page(parseInt($(a.currentTarget).data("index"), 10))
		}, this));
		$(".ui-swipeslide-bullets")[0] || this.container.append(this.navBullets);
		this.setActiveBullet()
	},
	setBulletChangeNum: function() {
		var a = this.currentPage + 1;
		this.container.find(".swipeslide-bullets var").html(a)
	},
	setActiveBullet: function() {
		this.navBullets.children("li").removeClass("active").eq(this.currentPage).addClass("active")
	}
};
var SwipeSlide3D = function(a, b) {
		SwipeSlide.call(this, a, b);
		this.container.addClass("ui-swipeslide-3d")
	};
SwipeSlide3D.prototype = new SwipeSlide;
$.extend(SwipeSlide3D.prototype, {
	setup: function() {
		this.dimension = this.container[this.isVertical ? "height" : "width"]();
		this.tolerance = this.options.tolerance * this.dimension / 2;
		this.alpha = 360 / this.slides.length * (this.isVertical ? -1 : 1);
		this.radius = Math.round(this.dimension / 2 / Math.tan(Math.PI / this.slides.length));
		this.slides.each($.proxy(this.positionSlide, this));
		this.move(0, 0)
	},
	validPage: function(a) {
		0 > a ? a += this.numPages : a >= this.numPages && (a %= this.numPages);
		return a
	},
	animationProperties: function(a) {
		return {
			translate3d: "0,0," + -this.radius + "px",
			rotate3d: this.vectorsWithDeg(this.alpha * a / this.dimension - this.alpha * this.currentPage)
		}
	},
	positionSlide: function(a, b) {
		$(b).animate({
			rotate3d: this.vectorsWithDeg(a * this.alpha),
			translate3d: "0,0," + this.radius + "px"
		}, {
			duration: 0
		})
	},
	vectorsWithDeg: function(a) {
		return (this.isVertical ? "1,0" : "0,1") + ",0," + a + "deg"
	},
	withResistance: function(a) {
		return a
	}
});
(function(a) {
	a.fn.swipeSlide = function(a) {
		var c = (a = a || {}).threeD ? SwipeSlide3D : SwipeSlide;
		return this.each(function() {
			new c(this, a)
		})
	}
})(window.Zepto);