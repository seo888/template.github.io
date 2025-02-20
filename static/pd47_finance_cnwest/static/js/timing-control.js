/*让代码在一个时间区间运行 e 起始时间 d 结束时间 j 回调函数  例如 "201202270000"*/
function check_time_exec(e, d, j) {
    if (!e || !d) {
        return false
    }
    if (e.length != 12 || d.length != 12) {
        return false
    }
    var g = new Date();
    var a = g.getFullYear();
    var f = g.getMonth() + 1;
    if (f <= 9) {
        f = "0" + f
    }
    var k = g.getDate();
    if (k <= 9) {
        k = "0" + k
    }
    var i = g.getHours();
    if (i <= 9) {
        i = "0" + i
    }
    var b = g.getMinutes();
    if (b <= 9) {
        b = "0" + b
    }
    var h = "" + a + f + k + i + b;
    if (h > d || h < e) {
        return false
    }
    if (typeof j == "function") {
        j()
    }
    return true
};
/**
 * 图片头数据加载就绪事件 - 更快获取图片尺寸
 * @param	{String}	图片路径
 * @param	{Function}	尺寸就绪
 * @param	{Function}	加载完毕 (可选)
 * @param	{Function}	加载错误 (可选)
 * @example imgReady('http://www.google.com.hk/intl/zh-CN/images/logo_cn.png', function () {
		alert('size ready: width=' + this.width + '; height=' + this.height);
	});
 */
var imgReady = (function () {
	var list = [], intervalId = null,

	// 用来执行队列
	tick = function () {
		var i = 0;
		for (; i < list.length; i++) {
			list[i].end ? list.splice(i--, 1) : list[i]();
		};
		!list.length && stop();
	},

	// 停止所有定时器队列
	stop = function () {
		clearInterval(intervalId);
		intervalId = null;
	};

	return function (url, ready, load, error) {
		var onready, width, height, newWidth, newHeight,
			img = new Image();

		img.src = url;

		// 如果图片被缓存，则直接返回缓存数据
		if (img.complete) {
			ready.call(img);
			load && load.call(img);
			return;
		};

		width = img.width;
		height = img.height;

		// 加载错误后的事件
		img.onerror = function () {
			error && error.call(img);
			onready.end = true;
			img = img.onload = img.onerror = null;
		};

		// 图片尺寸就绪
		onready = function () {
			newWidth = img.width;
			newHeight = img.height;
			if (newWidth !== width || newHeight !== height ||
				// 如果图片已经在其他地方加载可使用面积检测
				newWidth * newHeight > 1024
			) {
				ready.call(img);
				onready.end = true;
			};
		};
		onready();

		// 完全加载完毕的事件
		img.onload = function () {
			// onload在定时器时间差范围内可能比onready快
			// 这里进行检查并保证onready优先执行
			!onready.end && onready();

			load && load.call(img);

			// IE gif动画会循环执行onload，置空onload即可
			img = img.onload = img.onerror = null;
		};

		// 加入队列中定期执行
		if (!onready.end) {
			list.push(onready);
			// 无论何时只允许出现一个定时器，减少浏览器性能损耗
			if (intervalId === null) intervalId = setInterval(tick, 40);
		};
	};
})();
/*国美2018曝光率 内容页顶部1L*/
check_time_exec("201806140000","201806182359",function(){
    imgReady('http://g.cn.miaozhen.com/x/k=6006671&p=9P6&rt=2&ns=__IP__&v=__LOC__&vv=1&o=', function () {
		console.log('size ready: width=' + this.width + '; height=' + this.height);
	});
//GLOBAL.Dom.loadScript('http://g.cn.miaozhen.com/x/k=6002468&p=5Hg&rt=2&ns=__IP__&ni=__IESID__&v=__LOC__&vv=1&o='); 
});