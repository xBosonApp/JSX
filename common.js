
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
	return document.getElementById(id);
}
