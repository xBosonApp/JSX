// CatfoOD 2009.12.9
// v0.16


/**
 * �ȴ�idָ���ı�Ǽ��ؽ�������ִ��alertfuncָ���ı��ʽ
 * 
 * @param alertfunc - ���ʽ�ַ�����ͨ��Ϊ����
 * @param id - ��ǵ�id
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
 * �ƶ�dividָ���Ĳ㵽��Ļ������
 * 
 * @param divid
 * @return ����divid�Ķ���
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
 * ��ʾһ��������Ϣ��״̬��������ӵ��ĵ�ĩβ
 */
function showError(msg) {
	window.status = msg;
	var ediv = document.createElement("div");
	ediv.style.color = "#FF0000";
	ediv.style.fontSize = "11px";
	ediv.innerText = msg;
	try {
		document.body.appendChild(ediv);	
	} catch(e) {
		document.body.insertAdjacentElement('afterEnd', ediv);
	}
}

/**
 * �ռ�formid�ı�ֵ�ԣ���ʽ��Ϊx-www-form-urlencoded
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
 * ����XMLHttpRequest����
 * ʧ�ܷ���false
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
 * ������filenameָ�����ļ�
 * �����ļ���Ŀ¼�����html�ĵ���Ŀ¼
 */
function include(filename) {
	var arrname = "com.jym.jsx.common_inlude_files";
	if (!window[arrname]) {
		window[arrname] = new Array();
	}
	
	if (!window[arrname][filename]) {
		
		var request = creatHttpRequest();
		try {
			request.open("GET", filename, false);
			request.send(null);
		} catch(e) {
			// IE8 ��ȫ����
		}
		
		if ( request.readyState==4 &&
					(request.status==200 || request.status==0) ) {
			
			var jstext = request.responseText;
			window.eval(jstext);
			window[arrname][filename] = true;
			//showError("include ok");
		}
		else {
			showError("cannot include file: " + filename);
		}
	}
}

/**
 * ���encodeURIComponent����
 * �������ַ�������ת��
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
 * ��ʾdiv,����������idҲ������div����
 */
function showDiv(divid) {
	var div = getDiv(divid);
	var alpha = 0;
	var strength = 20;
	
	var func = function() {
		if (alpha<90) {
			div.style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity="+alpha+") "
					+ "progid:DXImageTransform.Microsoft.MotionBlur(Strength="+strength+",Direction=200);";
			setTimeout(func, 20);
			alpha += 8;
			strength-=2;
		}
	}
	func();
	div.style.display = "block";
}

/**
 * ����div,����������idҲ������div����
 */
function hideDiv(divid) {
	var div = getDiv(divid);
	var alpha = 90;
	var strength = 0;
	
	var func = function() {
		if (alpha>0) {
			div.style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity="+alpha+") "
					+ "progid:DXImageTransform.Microsoft.MotionBlur(Strength="+strength+",Direction=35);";
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
 * ���div�Ѿ���ʾ����true,���򷵻�false
 */
function divDisplay(divid) {
	var div = getDiv(divid);
	return div.style.display == "block";
}


/**
 * �޸�tableidָ���ı����ɫ������ɫΪ������ʾ
 * 
 * @param tableid - ����id
 * @param fcolor - �����е���ɫ
 * @param scolor - ż���е���ɫ
 * @param mousecolor - �����ͣ����ɫ
 * @return ����tableid�Ķ���
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
 * �����������¼�
 * 
 * @param tableid - Ҫ�����ı��id
 * @param func - ��������,��һ������Ϊ��ǰ�����ͣ��tr����,
 * 						�ڶ��������ǵ�ǰ�е�������0��ʼ
 * @return ����tableid�Ķ���
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
 * �������ͣ��obj�����ʱ����ɫ��Ϊcolor
 * 
 * @param obj - html��Ƕ���
 * @param color - ��Ч��css��ɫֵ
 * @return null
 */
function onMouseOverChangeColor(obj, color) {
	var oldcolor = getColorInt(obj.style.backgroundColor);
	var ncolor = getColorInt(color);
	
	var lock = new LockObj(obj);
	
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
 * obj����ɫ��scolor��Ϊecolor, ��ɫֵΪ���� 
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
 * �߳���������obj�����������
 */
function LockObj(obj) {
	var lockname = "jym_jsx_thread_lock_object";
	
	if ( !obj[lockname] ) {
		obj[lockname] = 0;
	}
	
	/**
	 * �ڶ����ϼ�������������Ѿ��������߳�������
	 * ����Ҫ�ȴ��������ͷŲ��ܼ���ִ��
	 *
	 * @parm func - �����ͷź�ִ�еķ���
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
	 * �������û�б�������ִ��func����
	 * �������
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
	 * �ͷŶ����ϵ���
	 */
	this.free = function() {
		obj[lockname]--;
		if ( obj[lockname]<0 ) obj[lockname]=0;
	}
}

/**
 * css��ɫ��ʽ('#000000')ת��Ϊ������������
 */
function getColorInt(csscolor) {
	if (csscolor) {
		return parseInt( csscolor.substr(1,csscolor.length),16 );
	} else {
		return false; //0xffffff;
	}
}

/**
 * �޸�obj����ɫΪcolor
 * 
 * @param obj - html��Ƕ���
 * @param color - ��Ч��css��ɫֵ, ���colorΪ�����Զ���ʽ��Ϊcss��ʽ
 *					���color===false, ������Ϊ͸������
 * @return null
 */
function changeColor(obj, color) {
	if (color===false) {
		obj.style.backgroundColor = '';
	}
	else if (isNaN(obj)) {
		obj.style.backgroundColor = color;
	} else {
		var c = new Number(color).toString(16);
		obj.style.backgroundColor = '#'+c;
	}
}


/**
 * ��div��ǩ�ķ�װ�࣬��dividָ����div���Ա�����϶�
 * @author CatfoOD 2009
 * 
 * @param divid - Ŀ��divid
 * @param touchid - ��������¼��Ķ����id,���Ϊnull,��div����������϶�
 * 					���touchid��Ϊnull����ָ���Ķ�����Ч��
 * 					��ʹ��div�Լ���������϶��¼�
 */
function DivPack(divid, touchid) {
	var div = document.getElementById(divid);

	var x = 0;
	var y = 0;
	var stop = true;
	var mx = 0;
	var my = 0;
	var ins = this;
	
	this.setX = function(nx) {
		x = nx;
		div.style.left = x;
	}
	
	this.setY = function(ny) {
		y = ny;
		div.style.top = y;
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
