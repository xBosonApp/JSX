
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
