;(function($, window) {
	if (!$) return false;
	var defaults = {
		btn: false,
		nav: true,
		txt: true,
		effect: 1, //1为渐隐，2为左右滑动，3为上下滑动
		time: 2000,
		autoPlay: true,
		navType: 1 //1为click, 2为mouseenter
	}
	$.fn.fjzcSlide = function(opts) {
		var $this = $(this);
		var iNow = 0; //默认从第一个开始
		var timer = '';
		var settings = $.extend({}, defaults, opts);
		if (this.length > 1) {
			this.each(function() {
				$(this).mfSlide(opts)
			})
			return this;
		}

		var container = {
			ul: $this.find('ul'),
			li: $this.find('li'),
			len: $this.find('li').length,
			width: $this.find('li').width(),
			height: $this.find('li').height()
		}
		var method = {
			init: function() {
				var _self = this;
				if (settings.effect == 1) {
					container.li.css({
						'display': 'none',
						'opacity': 0
					}).eq(iNow).css({
						'display': 'block',
						'opacity': 1
					})
				}
				if (settings.effect == 2) {
					container.ul.css('width', container.len * container.li.width());
				}
				if (settings.effect == 3) {
					container.ul.css('width', container.li.width());
				}
				if (settings.btn) {
					_self._btn();
				}
				if (settings.txt) {
					_self.createTxt();
				}
				if (settings.autoPlay) {
					_self.autoPlay();
					$this.mouseenter(function() {
						clearInterval(timer);
					}).mouseleave(function() {
						_self.autoPlay();
					})
				}
				if (settings.nav) {
					_self.createNav();
				}

				$this.find('.slidenav').on(settings.navType == 1 ? 'click' : 'mouseenter', 'span', function() {
					var index = $(this).index();
					iNow = index;
					_self.tab(iNow);
				})

			},
			createNav: function() {
				var str = '';
				for (var i = 0; i < container.len; i++) {
					str += '<span></span>';
				}
				str = '<div class=\'slidenav\'>' + str + '</div>';
				$(str).insertAfter(container.ul.parent())
				$this.find('.slidenav span').eq(0).addClass('cur');
			},
			createBtn: function() {
				var str = '<div class = \'prevbtn\'><</div><div class = \'nextbtn\'>></div>';
				$(str).appendTo($this);
			},
			createTxt: function() {
				if (!container.li.eq(0).data('title'))
					return false;
				$('<div class=\'slidetxt\'>'+container.li.eq(0).data('title')+'</div>').appendTo($this);
			},
			_txt: function() {
				$this.find('.slidetxt').text(container.li.eq(iNow).data('title'));
			},
			_btn: function() {
				var _self = this;
				this.createBtn();
				$this.mouseenter(function() {
					$('.prevbtn, .nextbtn').stop().fadeIn();
				}).mouseleave(function() {
					$('.prevbtn, .nextbtn').stop().fadeOut();
				})
				$this.on('click', '.prevbtn', function() {
					iNow--;
					if (iNow < 0) {
						iNow = container.len - 1;
					}
					_self.tab();
				})
				$this.on('click', '.nextbtn', function() {
					iNow++;
					if (iNow > container.len - 1) {
						iNow = 0;
					}
					_self.tab();
				})
			},
			_focusNav: function() {
				$this.find('.slidenav span').eq(iNow).addClass('cur').siblings().removeClass('cur');
			},
			_fade: function() {
				container.li.eq(iNow).css('display', 'block').stop().animate({
					'opacity': 1
				}).siblings().stop().animate({
					'opacity': 0
				}).css('display', 'none');
			},
			_scrollHorizontal: function() {
				container.ul.stop().animate({
					'left': -iNow * container.width
				});
			},
			_scrollVertical: function() {
				container.ul.stop().animate({
					'top': -iNow * container.height
				});
			},
			tab: function() {
				if (settings.effect == 1) {
					this._fade();
				} else if (settings.effect == 2) {
					this._scrollHorizontal();
				} else {
					this._scrollVertical();
				}
				if (settings.txt) {
					this._txt();
				}
				this._focusNav();

			},
			autoPlay: function() {
				var _self = this;
				timer = window.setInterval(function() {
					iNow++;
					if (iNow > container.len - 1) {
						iNow = 0;
					}
					_self.tab();
				}, settings.time)
			}
		}
		method.init();
	}
})(jQuery, window);


;(function(){var defaultOptions={frameRate:150,animationTime:400,stepSize:120,pulseAlgorithm:true,pulseScale:8,pulseNormalize:1,accelerationDelta:20,accelerationMax:1,keyboardSupport:true,arrowScroll:50,touchpadSupport:true,fixedBackground:true,excluded:""};var options=defaultOptions;var isExcluded=false;var isFrame=false;var direction={x:0,y:0};var initDone=false;var root=document.documentElement;var activeElement;var observer;var deltaBuffer=[120,120,120];var key={left:37,up:38,right:39,down:40,spacebar:32,pageup:33,pagedown:34,end:35,home:36};var options=defaultOptions;function initTest(){var disableKeyboard=false;if(disableKeyboard){removeEvent("keydown",keydown)}if(options.keyboardSupport&&!disableKeyboard){addEvent("keydown",keydown)}}function init(){if(!document.body)return;var body=document.body;var html=document.documentElement;var windowHeight=window.innerHeight;var scrollHeight=body.scrollHeight;root=(document.compatMode.indexOf('CSS')>=0)?html:body;activeElement=body;initTest();initDone=true;if(top!=self){isFrame=true}else if(scrollHeight>windowHeight&&(body.offsetHeight<=windowHeight||html.offsetHeight<=windowHeight)){var pending=false;var refresh=function(){if(!pending&&html.scrollHeight!=document.height){pending=true;setTimeout(function(){html.style.height=document.height+'px';pending=false},500)}};html.style.height='auto';setTimeout(refresh,10);if(root.offsetHeight<=windowHeight){var underlay=document.createElement("div");underlay.style.clear="both";body.appendChild(underlay)}}if(!options.fixedBackground&&!isExcluded){body.style.backgroundAttachment="scroll";html.style.backgroundAttachment="scroll"}}var que=[];var pending=false;var lastScroll=+new Date;function scrollArray(elem,left,top,delay){delay||(delay=1000);directionCheck(left,top);if(options.accelerationMax!=1){var now=+new Date;var elapsed=now-lastScroll;if(elapsed<options.accelerationDelta){var factor=(1+(30/elapsed))/2;if(factor>1){factor=Math.min(factor,options.accelerationMax);left*=factor;top*=factor}}lastScroll=+new Date}que.push({x:left,y:top,lastX:(left<0)?0.99:-0.99,lastY:(top<0)?0.99:-0.99,start:+new Date});if(pending){return}var scrollWindow=(elem===document.body);var step=function(time){var now=+new Date;var scrollX=0;var scrollY=0;for(var i=0;i<que.length;i++){var item=que[i];var elapsed=now-item.start;var finished=(elapsed>=options.animationTime);var position=(finished)?1:elapsed/options.animationTime;if(options.pulseAlgorithm){position=pulse(position)}var x=(item.x*position-item.lastX)>>0;var y=(item.y*position-item.lastY)>>0;scrollX+=x;scrollY+=y;item.lastX+=x;item.lastY+=y;if(finished){que.splice(i,1);i--}}if(scrollWindow){window.scrollBy(scrollX,scrollY)}else{if(scrollX)elem.scrollLeft+=scrollX;if(scrollY)elem.scrollTop+=scrollY}if(!left&&!top){que=[]}if(que.length){requestFrame(step,elem,(delay/options.frameRate+1))}else{pending=false}};requestFrame(step,elem,0);pending=true}function wheel(event){if(!initDone){init()}var target=event.target;var overflowing=overflowingAncestor(target);if(!overflowing||event.defaultPrevented||isNodeName(activeElement,"embed")||(isNodeName(target,"embed")&&/\.pdf/i.test(target.src))){return true}var deltaX=event.wheelDeltaX||0;var deltaY=event.wheelDeltaY||0;if(!deltaX&&!deltaY){deltaY=event.wheelDelta||0}if(!options.touchpadSupport&&isTouchpad(deltaY)){return true}if(Math.abs(deltaX)>1.2){deltaX*=options.stepSize/120}if(Math.abs(deltaY)>1.2){deltaY*=options.stepSize/120}scrollArray(overflowing,-deltaX,-deltaY);event.preventDefault()}function keydown(event){var target=event.target;var modifier=event.ctrlKey||event.altKey||event.metaKey||(event.shiftKey&&event.keyCode!==key.spacebar);if(/input|textarea|select|embed/i.test(target.nodeName)||target.isContentEditable||event.defaultPrevented||modifier){return true}if(isNodeName(target,"button")&&event.keyCode===key.spacebar){return true}var shift,x=0,y=0;var elem=overflowingAncestor(activeElement);var clientHeight=elem.clientHeight;if(elem==document.body){clientHeight=window.innerHeight}switch(event.keyCode){case key.up:y=-options.arrowScroll;break;case key.down:y=options.arrowScroll;break;case key.spacebar:shift=event.shiftKey?1:-1;y=-shift*clientHeight*0.9;break;case key.pageup:y=-clientHeight*0.9;break;case key.pagedown:y=clientHeight*0.9;break;case key.home:y=-elem.scrollTop;break;case key.end:var damt=elem.scrollHeight-elem.scrollTop-clientHeight;y=(damt>0)?damt+10:0;break;case key.left:x=-options.arrowScroll;break;case key.right:x=options.arrowScroll;break;default:return true}scrollArray(elem,x,y);event.preventDefault()}function mousedown(event){activeElement=event.target}var cache={};setInterval(function(){cache={}},10*1000);var uniqueID=(function(){var i=0;return function(el){return el.uniqueID||(el.uniqueID=i++)}})();function setCache(elems,overflowing){for(var i=elems.length;i--;)cache[uniqueID(elems[i])]=overflowing;return overflowing}function overflowingAncestor(el){var elems=[];var rootScrollHeight=root.scrollHeight;do{var cached=cache[uniqueID(el)];if(cached){return setCache(elems,cached)}elems.push(el);if(rootScrollHeight===el.scrollHeight){if(!isFrame||root.clientHeight+10<rootScrollHeight){return setCache(elems,document.body)}}else if(el.clientHeight+10<el.scrollHeight){overflow=getComputedStyle(el,"").getPropertyValue("overflow-y");if(overflow==="scroll"||overflow==="auto"){return setCache(elems,el)}}}while(el=el.parentNode)}function addEvent(type,fn,bubble){window.addEventListener(type,fn,(bubble||false))}function removeEvent(type,fn,bubble){window.removeEventListener(type,fn,(bubble||false))}function isNodeName(el,tag){return(el.nodeName||"").toLowerCase()===tag.toLowerCase()}function directionCheck(x,y){x=(x>0)?1:-1;y=(y>0)?1:-1;if(direction.x!==x||direction.y!==y){direction.x=x;direction.y=y;que=[];lastScroll=0}}var deltaBufferTimer;function isTouchpad(deltaY){if(!deltaY)return;deltaY=Math.abs(deltaY);deltaBuffer.push(deltaY);deltaBuffer.shift();clearTimeout(deltaBufferTimer);var allDivisable=(isDivisible(deltaBuffer[0],120)&&isDivisible(deltaBuffer[1],120)&&isDivisible(deltaBuffer[2],120));return!allDivisable}function isDivisible(n,divisor){return(Math.floor(n/divisor)==n/divisor)}var requestFrame=(function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||function(callback,element,delay){window.setTimeout(callback,delay||(1000/60))}})();function pulse_(x){var val,start,expx;x=x*options.pulseScale;if(x<1){val=x-(1-Math.exp(-x))}else{start=Math.exp(-1);x-=1;expx=1-Math.exp(-x);val=start+(expx*(1-start))}return val*options.pulseNormalize}function pulse(x){if(x>=1)return 1;if(x<=0)return 0;if(options.pulseNormalize==1){options.pulseNormalize/=pulse_(1)}return pulse_(x)}var isChrome=/chrome/i.test(window.navigator.userAgent);var wheelEvent=null;if("onwheel"in document.createElement("div"))wheelEvent="wheel";else if("onmousewheel"in document.createElement("div"))wheelEvent="mousewheel";if(wheelEvent&&isChrome){addEvent(wheelEvent,wheel);addEvent("mousedown",mousedown);addEvent("load",init)}})();

;(function(f){"use strict";"function"===typeof define&&define.amd?define(["jquery"],f):"undefined"!==typeof module&&module.exports?module.exports=f(require("jquery")):f(jQuery)})(function($){"use strict";function n(a){return!a.nodeName||-1!==$.inArray(a.nodeName.toLowerCase(),["iframe","#document","html","body"])}function h(a){return $.isFunction(a)||$.isPlainObject(a)?a:{top:a,left:a}}var p=$.scrollTo=function(a,d,b){return $(window).scrollTo(a,d,b)};p.defaults={axis:"xy",duration:0,limit:!0};$.fn.scrollTo=function(a,d,b){"object"=== typeof d&&(b=d,d=0);"function"===typeof b&&(b={onAfter:b});"max"===a&&(a=9E9);b=$.extend({},p.defaults,b);d=d||b.duration;var u=b.queue&&1<b.axis.length;u&&(d/=2);b.offset=h(b.offset);b.over=h(b.over);return this.each(function(){function k(a){var k=$.extend({},b,{queue:!0,duration:d,complete:a&&function(){a.call(q,e,b)}});r.animate(f,k)}if(null!==a){var l=n(this),q=l?this.contentWindow||window:this,r=$(q),e=a,f={},t;switch(typeof e){case "number":case "string":if(/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(e)){e= h(e);break}e=l?$(e):$(e,q);if(!e.length)return;case "object":if(e.is||e.style)t=(e=$(e)).offset()}var v=$.isFunction(b.offset)&&b.offset(q,e)||b.offset;$.each(b.axis.split(""),function(a,c){var d="x"===c?"Left":"Top",m=d.toLowerCase(),g="scroll"+d,h=r[g](),n=p.max(q,c);t?(f[g]=t[m]+(l?0:h-r.offset()[m]),b.margin&&(f[g]-=parseInt(e.css("margin"+d),10)||0,f[g]-=parseInt(e.css("border"+d+"Width"),10)||0),f[g]+=v[m]||0,b.over[m]&&(f[g]+=e["x"===c?"width":"height"]()*b.over[m])):(d=e[m],f[g]=d.slice&& "%"===d.slice(-1)?parseFloat(d)/100*n:d);b.limit&&/^\d+$/.test(f[g])&&(f[g]=0>=f[g]?0:Math.min(f[g],n));!a&&1<b.axis.length&&(h===f[g]?f={}:u&&(k(b.onAfterFirst),f={}))});k(b.onAfter)}})};p.max=function(a,d){var b="x"===d?"Width":"Height",h="scroll"+b;if(!n(a))return a[h]-$(a)[b.toLowerCase()]();var b="client"+b,k=a.ownerDocument||a.document,l=k.documentElement,k=k.body;return Math.max(l[h],k[h])-Math.min(l[b],k[b])};$.Tween.propHooks.scrollLeft=$.Tween.propHooks.scrollTop={get:function(a){return $(a.elem)[a.prop]()}, set:function(a){var d=this.get(a);if(a.options.interrupt&&a._last&&a._last!==d)return $(a.elem).stop();var b=Math.round(a.now);d!==b&&($(a.elem)[a.prop](b),a._last=this.get(a))}};return p});

!function(a,b,c,d){var e=a(b);a.fn.lazyload=function(f){function g(){var b=0;i.each(function(){var c=a(this);if(!j.skip_invisible||c.is(":visible"))if(a.abovethetop(this,j)||a.leftofbegin(this,j));else if(a.belowthefold(this,j)||a.rightoffold(this,j)){if(++b>j.failure_limit)return!1}else c.trigger("appear"),b=0})}var h,i=this,j={threshold:0,failure_limit:0,event:"scroll",effect:"show",container:b,data_attribute:"original",skip_invisible:!1,appear:null,load:null,placeholder:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"};return f&&(d!==f.failurelimit&&(f.failure_limit=f.failurelimit,delete f.failurelimit),d!==f.effectspeed&&(f.effect_speed=f.effectspeed,delete f.effectspeed),a.extend(j,f)),h=j.container===d||j.container===b?e:a(j.container),0===j.event.indexOf("scroll")&&h.bind(j.event,function(){return g()}),this.each(function(){var b=this,c=a(b);b.loaded=!1,(c.attr("src")===d||c.attr("src")===!1)&&c.is("img")&&c.attr("src",j.placeholder),c.one("appear",function(){if(!this.loaded){if(j.appear){var d=i.length;j.appear.call(b,d,j)}a("<img />").bind("load",function(){var d=c.attr("data-"+j.data_attribute);c.hide(),c.is("img")?c.attr("src",d):c.css("background-image","url('"+d+"')"),c[j.effect](j.effect_speed),b.loaded=!0;var e=a.grep(i,function(a){return!a.loaded});if(i=a(e),j.load){var f=i.length;j.load.call(b,f,j)}}).attr("src",c.attr("data-"+j.data_attribute))}}),0!==j.event.indexOf("scroll")&&c.bind(j.event,function(){b.loaded||c.trigger("appear")})}),e.bind("resize",function(){g()}),/(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion)&&e.bind("pageshow",function(b){b.originalEvent&&b.originalEvent.persisted&&i.each(function(){a(this).trigger("appear")})}),a(c).ready(function(){g()}),this},a.belowthefold=function(c,f){var g;return g=f.container===d||f.container===b?(b.innerHeight?b.innerHeight:e.height())+e.scrollTop():a(f.container).offset().top+a(f.container).height(),g<=a(c).offset().top-f.threshold},a.rightoffold=function(c,f){var g;return g=f.container===d||f.container===b?e.width()+e.scrollLeft():a(f.container).offset().left+a(f.container).width(),g<=a(c).offset().left-f.threshold},a.abovethetop=function(c,f){var g;return g=f.container===d||f.container===b?e.scrollTop():a(f.container).offset().top,g>=a(c).offset().top+f.threshold+a(c).height()},a.leftofbegin=function(c,f){var g;return g=f.container===d||f.container===b?e.scrollLeft():a(f.container).offset().left,g>=a(c).offset().left+f.threshold+a(c).width()},a.inviewport=function(b,c){return!(a.rightoffold(b,c)||a.leftofbegin(b,c)||a.belowthefold(b,c)||a.abovethetop(b,c))},a.extend(a.expr[":"],{"below-the-fold":function(b){return a.belowthefold(b,{threshold:0})},"above-the-top":function(b){return!a.belowthefold(b,{threshold:0})},"right-of-screen":function(b){return a.rightoffold(b,{threshold:0})},"left-of-screen":function(b){return!a.rightoffold(b,{threshold:0})},"in-viewport":function(b){return a.inviewport(b,{threshold:0})},"above-the-fold":function(b){return!a.belowthefold(b,{threshold:0})},"right-of-fold":function(b){return a.rightoffold(b,{threshold:0})},"left-of-fold":function(b){return!a.rightoffold(b,{threshold:0})}})}(jQuery,window,document);