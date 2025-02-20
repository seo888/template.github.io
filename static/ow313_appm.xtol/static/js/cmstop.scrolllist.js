(function() {
	function g(a) {
		a = this.options = $.extend({}, h, a);
		if ((this.trigger = a.trigger) && this.trigger.length) if (this.savedTriggerText = this.trigger.text(), (this.container = a.container) && this.container.length) this.template = window.Template ? new Template(a.template) : a.template, this.page = a.page, this.pagesize = a.pagesize, this.sorttime = a.sorttime, this.ajaxOptions = $.isPlainObject(a.ajaxOptions) ? a.ajaxOptions : {}, this.init()
	}
	var h = {
		url: null,
		trigger: null,
		container: null,
		template: null,
		page: 1,
		pageVar: "page",
		pagesize: 10,
		pagesizeVar: "pagesize",
		sorttime: 0,
		sorttimeVar: "time",
		loading: "加载中…"
	};
	g.prototype = {
		init: function() {
			var a = this;
			a.trigger.click(function() {
				a.trigger.text(a.options.loading);
				a.query();
				return !1
			})
		},
		query: function() {
			var a = this,
				b = a.options,
				c = a.ajaxOptions;
			a.queryLock || (a.queryLock = !0, c[b.pageVar] = a.page, c[b.pagesizeVar] = a.pagesize, a.sorttime && (c[b.sorttimeVar] = a.sorttime), $.post(b.url, c, function(b) {
				$("[bind='total']").text(b.total);
				b && b.total>0 && b.data ? (a.render(b.data), (b = a.page * a.pagesize < parseInt(b.total)) && (a.page += 1)) : b = !1;
				b || a.trigger.hide();
				a.queryLock = !1
				if(a.container.html()==''){a.trigger.show().text('没有相关记录');}
			}, "json"))
		},
		render: function(a) {
			var b = this,
				c = document.createDocumentFragment();
			$.each(a, function(a, f) {
				var d;
				b.template.render ? d = b.template.render(f) : (d = b.template, $.isPlainObject(f) && (d = d.replace(/\{([^\}]+?)\}/gm, function(a, b) {
					for (var c = b.split("."), d, e = f;
					(d = c.shift()) && (e = e[d]););
					return "undefined" == typeof e || null === e ? "" : e
				})));
				c.appendChild($(d)[0])
			});
			b.container.append(c);
			b.trigger.text(b.savedTriggerText);
			
			c = null
		}
	};
	window.ScrollList = g
})();