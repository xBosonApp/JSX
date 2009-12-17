// 依赖 common.js, color.js

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