// CatfoOD 2009.12.9
// v0.15


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
			if (typeof alertfunc=='function') {
				alertfunc();
			}
			else {
				eval(alertfunc);
			}
		}
	}
	func();
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
	return document.getElementById(id);
}

/**
 * ��ʾһ��������Ϣ��״̬��������ӵ��ĵ�ĩβ
 */
function showError(msg) {
	window.status = msg;
	var ediv = document.createElement("p");
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
	var form = getByid(formid);;
	
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
	if (typeof divid == "string") {
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
	div.style.display = "block";
}

/**
 * ����div,����������idҲ������div����
 */
function hideDiv(divid) {
	var div = getDiv(divid);
	div.style.display = "none";
}

/**
 * ���div�Ѿ���ʾ����true,���򷵻�false
 */
function divDisplay(divid) {
	var div = getDiv(divid);
	return div.style.display == "block";
}