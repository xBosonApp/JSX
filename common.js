// CatfoOD 2009.12.9
// v0.13

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
