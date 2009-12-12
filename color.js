/**
 * 当鼠标悬停在obj标记上时，颜色变为color
 * 
 * @param obj - html标记对象
 * @param color - 有效的css颜色值
 * @return null
 */
function onMouseOverChangeColor(obj, color) {
	var oldcolor = obj.style.backgroundColor;
	var r = obj;
	var ncolor = color;
	
	r.onmouseover = function() {
		changeColor(r, ncolor);
	}
	r.onmouseout = function() {
		changeColor(r, oldcolor);
	}
}

/**
 * 修改obj的颜色为color
 * 
 * @param obj - html标记对象
 * @param color - 有效的css颜色值
 * @return null
 */
function changeColor(obj, color) {
	obj.style.backgroundColor = color;
}
