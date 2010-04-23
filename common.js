// CatfoOD 2009.12.9
// charset: UTF-8
// v0.17

/*
	----- 目录 -----
function:
	waitTag(alertfunc, id)
	waitBody(alertfunc)
	moveCenter(divid)
	getByid(id)
	showError(msg)
	insertDom(obj, dom)
	getFormData(formid)
	creatHttpRequest()
	include(filename)
	encodeUri(uri)
	getDiv(divid)
	showDiv(divid)
	hideDiv(divid)
	divDisplay(divid)
	changeTableColor(tableid, fcolor, scolor, mousecolor)
	tableRowMouseOverListener(tableid, func)
	onMouseOverChangeColor(obj, color)
	transitionColor(obj, scolor, ecolor)
	changeColor(obj, color)
	getColorInt(csscolor)
	setX(obj, x)
	setY(obj, y)
	movex(obj, startx, finishx, after)
	isie()
	setOpacity(obj, opa)
	
class:
	LockObj(obj)
		lock()
		check()
		free()
	DivPack(divid, touchid)
		setX()
		setY()
		getX()
		getY()
		getDiv()
	Parabola(x1, x2, y)
		get(x)
	Dialog(w,h)
		show()
		close()
		setHtml(html)
		getContentDiv()
	ajax()
		post(url)
		get(url)
		send(rul)
		abort()
		setAsync()
		setRequestHeader()
		setOkListener(h)
		setTextListener(h)
		setXmlListener(h)
		setJSonListener(h)
		setErrorListener(h)
*/

(function() {
	var head = document.getElementsByTagName("head")[0];
	var srps = head.getElementsByTagName("script");
	for (var i=0; i<srps.length; ++i) {
		var index = srps[i].src.indexOf("JSX/common.js");
		
		if (index>=0) {
			path = srps[i].src.substring(0, index);
			path = path + "JSX/"
			include(path + "ajax.js");
			include(path + "dom.js");
		}
	}
})();

/**
 * 等待id指定的标记加载结束，并执行alertfunc指定的表达式
 * 
 * @param alertfunc - 表达式字符串，通常为函数
 * @param id - 标记的id
 */
function waitTag(alertfunc, id) {
	var func = function() {
		if (getByid(id)===null) {
			setTimeout(func, 100);
		} else {
			if (typeof alertfunc==='function') {
				alertfunc();
			}
			else {
				eval(alertfunc);
			}
		}
	}
	func();
}

function waitBody(alertfunc) {
	var f = function() {
		if (!document.body) {
			setTimeout(f, 100);
		} else {
			if (typeof alertfunc==='function') {
				alertfunc();
			}
			else {
				eval(alertfunc);
			}
		}
	}
	f();
}

/**
 * 移动divid指定的层到屏幕的中央
 * 
 * @param divid
 * @return 返回divid的对象
 */
function moveCenter(divid) {
	var div = getByid(divid);
	var w = div.style.width;
	var h = div.style.height;
	var x = (document.documentElement.clientWidth - w)/2
	var y = (document.documentElement.clientHeight - h)/2
	div.style.top = y;
	div.style.left = x;
	
	return div;
}


function getByid(id) {
	try {
		return document.getElementById(id);
	} catch(e) {
		return null;
	}
}

/**
 * 显示一个错误消息到状态条，并添加到文档末尾
 */
function showError(msg) {
	//window.status = msg;
	var ediv = document.createElement("div");
	ediv.style.color = "#FF0000";
	ediv.style.fontSize = "11px";
	ediv.innerHTML = '<span>' + msg + '</span>';
	insertDom(document.body, ediv);
}

/**
 * 向obj对象的末尾添加dom元素
 */
function insertDom(obj, dom) {
	if (isie()) {
		try {
			obj.appendChild(dom);	
		} catch(e) {
			obj.insertAdjacentElement('afterEnd', dom);
		}
	} else {
		obj.insertBefore(dom, null);
	}
}

/**
 * 包含入filename指定的js脚本文件<br>
 * 包含文件的目录相对于html文档的目录,或'/'开始相对网站目录<br>
 * 
 * 包含的脚本在body加载完毕后可用<br>
 */
function include(filename) {
	var head = document.getElementsByTagName("head")[0];
	var script = document.createElement("script");
	script.src = filename;
	script.type= "text/javascript";

	insertDom(head, script);
}

/**
 * 包含入filename指定的样式表文件<br>
 * 包含文件的目录相对于html文档的目录,或'/'开始相对网站目录<br>
 * 
 * 包含的脚本在body加载完毕后可用<br>
 */
function includecss(cssfilename) {
	var head = document.getElementsByTagName("head")[0];
	var css = document.createElement("link");
	css.rel = "stylesheet";
	css.type = "text/css";
	css.href = cssfilename;
	
	insertDom(head, css);
}

/**
 * 收集formid的表单值对，格式化为x-www-form-urlencoded
 */
function getFormData(formid) {
	var formtext = new Array();
	var form = getByid(formid);
	if (!form) {
		form = formid;
	}
	
	var pushvalue = function(name, value, last) {
		formtext.push( name );
		formtext.push( '=' );
		formtext.push( encodeUri(value) );
		if (!last) {
			formtext.push( '&' );
		}
	}
	
	var inputs = form.getElementsByTagName("input");
	for (var i=0; i<inputs.length; ++i) {
		pushvalue(inputs[i].name, inputs[i].value);
	}
	
	var selects = form.getElementsByTagName("select");
	for (var i=0; i<selects.length; ++i) {
		pushvalue(selects[i].name, selects[i].value);
	}
	
	return formtext.join('');
}

/**
 * 创建XMLHttpRequest对象
 * 失败返回false
 */
function creatHttpRequest() {
	var http = false;
	
	if (window.XMLHttpRequest) {
		http = new XMLHttpRequest();
	}
	
	else if (window.ActiveXObject) {
		try {
			http = new ActiveXObject("MSXML2.XMLHttp.3.0");
		} catch(e) {
			try {
				http = new ActiveXObject("Microsoft.XMLHTTP");
			} catch(e1) {}
		}
	}
	
	return http;
}

/**
 * 替代encodeURIComponent编码
 * 对中文字符不进行转换
 */
function encodeUri(uri) {
	var cachename = "net.jym.js.encodeUri";
	var signs = null;
	if (!window[cachename]) {
		signs = new Array();
		signs[' '] = "%20";	
		signs['/'] = "%2F";
		signs['%'] = "%25";
		signs['\\']= "%5C";
		signs['='] = "%3D";
		signs['&'] = "%26";
		signs[':'] = "%3A";
		window[cachename] = signs;
	} else {
		signs = window[cachename];
	}
	
	var newuri = new Array();
	
	for (var i=0; i<uri.length; ++i) {
		var ch = uri.charAt(i);
		if (signs[ch]) {
			newuri.push(signs[ch]);
		} else {
			newuri.push(ch);
		}
	}
	
	return newuri.join('');
}

function getDiv(divid) {
	var div = null;
	if (typeof divid === "string") {
		div = getByid(divid);
	} else {
		div = divid;
	}
	return div;
}

/**
 * 显示div,参数可以是id也可以是div对象
 */
function showDiv(divid) {
	var div = getDiv(divid);
	var alpha = 0;
	var strength = 20;
	
	var func = function() {
		if (alpha<100) {
			if (isie()) {
				div.style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity="+alpha+") "
						+ "progid:DXImageTransform.Microsoft.MotionBlur(Strength="+strength+",Direction=200);";
			} else {
				setOpacity(div, alpha);
			}
			setTimeout(func, 20);
			alpha += 8;
			strength-=2;
		} else {
			div.style.filter = null;
		}
	}
	func();
	div.style.display = "block";
}

/**
 * 隐藏div,参数可以是id也可以是div对象
 */
function hideDiv(divid) {
	var div = getDiv(divid);
	var alpha = 90;
	var strength = 0;
	
	var func = function() {
		if (alpha>0) {
			if (isie()) {
				div.style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity="+alpha+") "
						+ "progid:DXImageTransform.Microsoft.MotionBlur(Strength="+strength+",Direction=35);";
			} else {
				setOpacity(div, alpha);
			}
			setTimeout(func, 20);
			alpha -= 8;
			strength+=2;
		} else {
			div.style.display = "none";
		}
	}
	func();
}

/**
 * 如果div已经显示返回true,否则返回false
 */
function divDisplay(divid) {
	var div = getDiv(divid);
	return div.style.display == "block";
}


/**
 * 修改tableid指定的表的颜色，其颜色为隔行显示
 * 
 * @param tableid - 表格的id
 * @param fcolor - 奇数行的颜色
 * @param scolor - 偶数行的颜色
 * @param mousecolor - 鼠标悬停的颜色
 * @return 返回tableid的对象
 */
function changeTableColor(tableid, fcolor, scolor, mousecolor) {
	var table = getByid(tableid);
	if (table==null) return;
	
	var color = true;
	
	if (fcolor==null) {
		fcolor = '#dddddd';
	}
	if (scolor==null) {
		scolor = '#f0f0f0';
	}
	if (mousecolor==null) {
		mousecolor = '#ffaaaa';
	}
	
	var rows = table.rows;
	for (var i=0; i<rows.length; ++i) {
		var row = rows[i];
		
		if (color) {
			changeColor(row, fcolor);
		} else {
			changeColor(row, scolor);
		}
		color = !color;

		onMouseOverChangeColor(row, mousecolor);
	}
	
	return table;
}

/**
 * 表格行鼠标点击事件
 * 
 * @param tableid - 要监听的表格id
 * @param func - 监听函数,第一个参数为当前鼠标悬停的tr对象,
 * 						第二个参数是当前行的索引从0开始
 * @return 返回tableid的对象
 */
function tableRowMouseOverListener(tableid, func) {
	var table = getByid(tableid);
	if (table==null) return;
	
	var rows = table.rows;
	for (var i=0; i<rows.length; ++i) {
		(function () {
			var funcstr = func;
			var row = rows[i];
			var rowindex = i;
			
			row.ondblclick = function () {
				funcstr(row, rowindex);
			}
		})();
	}
	
	return table;
}

/**
 * 当鼠标悬停在obj标记上时，颜色变为color
 * 
 * @param obj - html标记对象
 * @param color - 有效的css颜色值
 * @return null
 */
function onMouseOverChangeColor(obj, color) {
	var oldcolor = getColorInt(obj.style.backgroundColor);
	var ncolor = getColorInt(color);
	
	obj.onmouseover = function() {
		if (oldcolor) {
			transitionColor(obj, oldcolor, ncolor);
		} else {
			changeColor(obj, ncolor);
		}
	}
	obj.onmouseout = function() {
		if (oldcolor) {
			transitionColor(obj, ncolor, oldcolor);
		} else {
			changeColor(obj, oldcolor);
		}
	}
}

/**
 * obj的颜色由scolor变为ecolor, 颜色值为整数 
 */
function transitionColor(obj, scolor, ecolor) {
	var count = 15;
	
	var er = ecolor >>> 16;
	var eg =(ecolor & 0x00ff00) >>> 8;
	var eb =(ecolor & 0x0000ff);
	
	var sr = scolor >>> 16;
	var sg =(scolor & 0x00ff00) >>> 8;
	var sb =(scolor & 0x0000ff);
	
	var rstep = (er-sr)/count;
	var gstep = (eg-sg)/count;
	var bstep = (eb-sb)/count;
	
	var cc = 0;
	var i = 0;
	
	var func = function() {
		if ( i<count ) {
			sr += rstep;
			sg += gstep;
			sb += bstep;
			cc = (sr<<16) | (sg<<8) | (sb);
			changeColor(obj, cc);
			
			setTimeout(func, 20);
			i++;
		}
	}
	func();
}

/**
 * 线程锁对象，在obj对象上添加锁
 */
function LockObj(obj) {
	var lockname = "jym_jsx_thread_lock_object";
	
	if ( !obj[lockname] ) {
		obj[lockname] = 0;
	}
	
	/**
	 * 在对象上加锁，如果对象已经被其他线程锁定，
	 * 则需要等待，锁被释放才能继续执行
	 *
	 * @parm func - 锁被释放后，执行的方法
	 */
	this.lock = function(func) {
		if (typeof func==='function') {
			var waitlock = function() {
				if (obj[lockname]>0) {
					setTimeout(waitlock, 50);
				} else {
					obj[lockname]++;
					func();
				}
			}
			waitlock();
		}
	}
	
	/**
	 * 如果对象没有被锁定，执行func函数
	 * 否则忽略
	 */
	this.check = function(func) {
		if (typeof func==='function') {
			if (obj[lockname]==0) {
				obj[lockname]++;
				func();
			}
		}
	}
	
	/**
	 * 释放对象上的锁
	 */
	this.free = function() {
		obj[lockname]--;
		if ( obj[lockname]<0 ) obj[lockname]=0;
	}
}

/**
 * css颜色格式('#000000')转换为整数，并返回
 */
function getColorInt(csscolor) {
	if (csscolor) {
		return parseInt( csscolor.substr(1,csscolor.length),16 );
	} else {
		return false; //0xffffff;
	}
}

/**
 * 修改obj的颜色为color
 * 
 * @param obj - html标记对象
 * @param color - 有效的css颜色值, 如果color为整数自动格式化为css格式
 *					如果color===false, 则对象变为透明背景
 * @return null
 */
function changeColor(obj, color) {
	if (color===false) {
		obj.style.backgroundColor = '';
	}
	else if (isNaN(color)) {
		obj.style.backgroundColor = color
	} else {
		var c = new Number(color).toString(16);
		obj.style.backgroundColor = '#'+c;
	}
}


/**
 * 对div标签的封装类，让divid指定的div可以被鼠标拖动
 * @author CatfoOD 2009
 * 
 * @param divid - 目标divid
 * @param touchid - 触发鼠标事件的对象的id,如果为null,则div不可用鼠标拖动
 * 					如果touchid不为null并且指定的对象无效，
 * 					则使用div自己触发鼠标拖动事件
 */
function DivPack(divid, touchid) {
	var div = document.getElementById(divid);
	if (div==null) div = divid;

	var x = 0;
	var y = 0;
	var stop = true;
	var mx = 0;
	var my = 0;
	var ins = this;
	
	this.setX = function(nx) {
		x = nx;
		setX(div, x);
	}
	
	this.setY = function(ny) {
		y = ny;
		setY(div, y);
	}
	
	this.getX = function() {
		return x;
	}
	
	this.getY = function() {
		return y;
	}
	
	this.getDiv = function() {
		return div;
	}
	
	var divmove = function() {
		stop = false;
		mx = event.screenX;
		my = event.screenY;
	}

	var cancelmove = function() {
		stop = true;
	}

	var mousemove = function () {
		if (stop) return;
		
		var offx = event.screenX;
		var offy = event.screenY;
		
		ins.setX( ins.getX()+offx-mx );
		ins.setY( ins.getY()+offy-my );

		mx = offx;
		my = offy;
	}
	
	if (touchid) {
		var toucher = document.getElementById(touchid);
		if (toucher==null) {
			toucher = div;
		}
		toucher.onmousedown = divmove;
		toucher.onmousemove = mousemove;
		toucher.onmouseover = cancelmove;
		toucher.onmouseup = cancelmove;
		
		div.style.position = "absolute";
	}
}

function setX(obj, x) {
	obj.style.left = x + 'px';
}

function setY(obj, y) {
	obj.style.top = parseInt(y) +  'px';
}

/**
 * 移动obj对象,从startx到finishx, 移动完成后调用after()
 */
function movex(obj, startx, finishx, after) {
	var func = false;
	var size = Math.max(finishx,startx)-Math.min(finishx,startx);
	var count = size/40;
	var f = startx<finishx ? 1 : -1;
	
	func = function() {
		if ( f*startx < f*finishx ) {
			count += 10;
			s = size/count;
			var step = 0.335 * s*s + 1;
			startx += (f*step);
			setX(obj, startx);
			setTimeout(func, 20);
		} else {
			setX(obj, finishx);
			if (after) after();
		}
	}
	
	func();
}

function isie() {
	var name = 'jym.jsx.iename.cache';
	if (!window[name]) {
		 window[name] = navigator.appName.search('Microsoft');
	}
	return window[name]>=0;
}

/**
 * 设置obj的透明度为opa(0-100)
 */
function setOpacity(obj, opa) {
	if (isie()) {
		obj.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity='+opa+');';
	} else {
		obj.style.opacity = opa/100;
	}
}

/**
 * 抛物线函数,x1-起始,x2-结束,y-get()返回的最大值
 */
function Parabola(x1, x2, y) {
	var w, p, my, sx;
	
	if (x1<x2) {
		w = Math.abs( (x2-x1)/2 );
		sx = x1;
	} else {
		w = Math.abs( (x1-x2)/2 );
		sx = x2;
	}
	my = y;
	p = (w*w) / -my;
	
	/**
	 * x1<x<x2
	 */
	this.get = function(x) {
		x = x-sx-w;
		return x*x / p+my;
	}
}

/** 显示对话框 */
function Dialog(width, height) {
	var obj = document.body;
	var ox = obj.offsetLeft;
	var oy = obj.offsetTop;
	var ow = obj.clientWidth;
	var oh = obj.clientHeight;
	
	var hide = createDiv(ow, oh, '#555', 50);
	var div = createDiv(width, height);
	
	/** 显示对话框 */
	this.show = function() {
		hide.style.display = "block";
		showDiv(div);
	}
	
	/** 关闭对话框 */
	this.close = function() {
		hide.style.display = "none";
		hideDiv(div);
	}
	
	/** 设置内容为html */
	this.setHtml = function(html) {
		div.innerHTML = html;
		// 自动调整大小
		div.style.height = div.scrollHeight;
	}
	
	this.getContentDiv = function() {
		return div;
	}

	window.onresize = function() {
		var bw = document.body.clientWidth;
		var bh = document.body.clientHeight;
		var sw = document.body.scrollWidth;
		var sh = document.body.scrollHeight;
		hide.style.width 	= (bw>sw)?bw:sw + 'px';
		hide.style.height	= (bh>sh)?bh:sh + 'px';
	}
	
	function createDiv(wid, hei, color, opacity) {
		var w = wid;
		var h = hei;
		var x = (ow-w)/2 + ox;
		var y = (oh-h)/2 + oy;

		if (!color) color = '#ffffff';
		var ediv = document.createElement("div");
		ediv.style.backgroundColor = color;
		ediv.style.position 	= "absolute";
		ediv.style.left 		= x + 'px';
		ediv.style.top 			= y + 'px';
		ediv.style.width 		= w + 'px';
		ediv.style.height		= h + 'px';
		ediv.style.display		= "none";
		ediv.style.padding		= 15;
		
		insertDom(document.body, ediv);
		if (opacity) setOpacity(ediv, opacity);
		
		return ediv;
	}
}