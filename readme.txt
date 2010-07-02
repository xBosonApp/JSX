Java Script 辅助库

自动兼容FireFox

// ---------------------- API目录 ----------------------

function:
	// 等待id指定的标签加载完毕,执行alertfunc方法
	waitTag(alertfunc, id)
	// 等待document.body加载完毕,执行alertfunc方法
	waitBody(alertfunc)
	// divid放在窗口中间
	moveCenter(divid)
	// 同document.getElementById(id)
	getByid(id)
	// 在文档的末尾显示msg消息,一般用来显示调试信息
	showError(msg)
	// 在obj对象后面插入dom对象
	insertDom(obj, dom)
	// 取得formid指定的form对象中表单值的格式化字符串
	getFormData(formid)
	// 创建request对象(ajax)
	creatHttpRequest()
	// 包含一个js脚本,该包含的脚本需在body载入后执行
	include(filename)
	// 编码uri,对中文字符不进行转换
	encodeUri(uri)
	// 没什么用....
	getDiv(divid)
	// 用动画显示一个div
	showDiv(divid, after)
	// 用动画隐藏一个div
	hideDiv(divid, after)
	// 如果div已经显示返回true
	divDisplay(divid)
	// 让表格动画化
	changeTableColor(tableid, fcolor, scolor, mousecolor)
	// 表格行鼠标点击事件封装
	tableRowMouseOverListener(tableid, func)
	// 鼠标在obj对象上停留,颜色变为color
	onMouseOverChangeColor(obj, color)
	// obj背景颜色用动画方法由scolor变为ecolor
	transitionColor(obj, scolor, ecolor)
	// 直接改变obj的背景色
	changeColor(obj, color)
	// 取得css颜色格式的int值
	getColorInt(csscolor)
	// 把int转换为css颜色
	int2color(int)
	// 直接设置obj的水平坐标(绝对定位)
	setX(obj, x)
	// 直接设置obj的垂直坐标(绝对定位)
	setY(obj, y)
	// 计算指定的标记对象到文档顶端的像素
	getTop(tag)
	// 动画化水平移动obj
	movex(obj, startx, finishx, after)
	// 动画化垂直移动obj
	movey(obj, starty, finishy, after)
	// 如果是ie返回真
	isie()
	// 动画化设置obj的透明度
	setOpacity(obj, opa) [opa(0-100)]
	// 一个动画函数,millise是从start到end的时间每次执行func
	anim(func, start, end, millise)
	// 为target设置右键菜单,menu指定菜单对象
	setMenu(menu, target);
	
class:
	LockObj(obj)
		lock()
		check()
		free()
		
	DivPack(divid, touchid)
		setX()
		setY()
		getX()
		getY()
		getDiv()
		
	Parabola(x1, x2, y)
		get(x)
		
	Dialog(w,h)
		show()
		close()
		setHtml(html)
		getContentDiv()
		
	ajax()
		post(url)
		get(url)
		send(rul)
		abort()
		setAsync()
		setRequestHeader()
		setOkListener(h)
		setTextListener(h)
		setXmlListener(h)
		setJSonListener(h)
		setErrorListener(h)
		
	selector()
		tagname(name)
		clazz(name)
		id(id)
		attr(attrName, value)
		todo(function)
		getTags()
		node(path)
		hasattr(attrName)