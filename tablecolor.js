// ���� common.js, color.js

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
		fcolor = '#ddd';
	}
	if (scolor==null) {
		scolor = '#f0f0f0';
	}
	if (mousecolor==null) {
		mousecolor = '#faa';
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