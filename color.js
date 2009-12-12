/**
 * �������ͣ��obj�����ʱ����ɫ��Ϊcolor
 * 
 * @param obj - html��Ƕ���
 * @param color - ��Ч��css��ɫֵ
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
 * �޸�obj����ɫΪcolor
 * 
 * @param obj - html��Ƕ���
 * @param color - ��Ч��css��ɫֵ
 * @return null
 */
function changeColor(obj, color) {
	obj.style.backgroundColor = color;
}
