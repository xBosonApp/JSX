// CatfoOD 2009.12.9
// v0.14

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
	var ediv = document.createElement("div");
	ediv.style.color = "#FF0000";
	ediv.style.fontSize = "11px";
	ediv.innerText = msg;
	document.body.appendChild(ediv);
}

/**
 * �ռ�formid�ı�ֵ�ԣ���ʽ��Ϊx-www-form-urlencoded
 */
function getFormData(formid) {
	var formtext = new Array();
	var form = getByid(formid);
	var inputs = form.getElementsByTagName("input");
	
	for (var i=0; i<inputs.length; ++i) {
		formtext.push( inputs[i].name );
		formtext.push( '=' );
		formtext.push( encodeURI(inputs[i].value) );
		if (i<inputs.length-1) {
			formtext.push( '&' );
		}
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
