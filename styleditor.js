/* CSS 样式选择控件
 * 依赖common.js */

/** create tag */
function cc(name, _parent) {
	var _tag = document.createElement(name);
	if (_parent) _parent.appendChild(_tag);
	return _tag;
}

function chref(text, _parent) {
	var href = cc('a', _parent);
	href.innerHTML = text;
	href.href = '#';
	href.style.marginLeft = '5px';
	return href;
}

var css_color_list = {
	'黑色' : '#000000',	'白色' : '#FFFFFF', '鸨色' : '#f7acbc',
	'曙色' : '#bd6758', '红色' : '#d71345', '梅染' : '#987165',
	'朱色' : '#f26522', '绯色' : '#aa2116', '焦香' : '#853f04',
	'栗梅' : '#6b2c25', '金赤' : '#f15a22', '桦色' : '#c85d44',
	'黄茶' : '#de773f', '橙色' : '#f47920', '茶色' : '#8f4b2e',
	'杏色' : '#fab27b', '黄栌' : '#64492b', '香色' : '#8e7437',
	'土色' : '#b36d41', '金色' : '#c37e00', '山吹' : '#fcaf17',
	'砂色' : '#d3c6a6', '芥子' : '#c7a252', '淡黄' : '#dec674',
	'油色' : '#817936', '媚茶' : '#454926', '黄緑' : '#b2d235',
	'苔色' : '#5c7a29', '萌黄' : '#a3cf62', '柳色' : '#78a355',
	'白緑' : '#cde6c7', '青緑' : '#007d65', '萌葱' : '#006c54',
	'锖鼠' : '#122e29', '白群' : '#78cdd1', '新桥' : '#50b7c1',
	'瓮覗' : '#94d6da', '露草' : '#33a3dc', '浓蓝' : '#11264f',
	'花色' : '#2b4490', '瑠璃' : '#2a5caa', '杜若' : '#426ab3',
	'胜色' : '#46485f', '铁绀' : '#181d4b', '褐返' : '#0c212b',
	'青褐' : '#121a2a', '藤纳' : '#6a6da9', '藤紫' : '#9b95c9',
	'菫色' : '#6f60aa', '鸠羽' : '#867892', '薄色' : '#918597',
	'银鼠' : '#a1a3a6', '铅色' : '#72777b', '黒铁' : '#281f1d',
	'江戸紫' : '#6f599c', '葡萄鼠' : '#63434f', '茄子绀' : '#45224a',
	'菖蒲色' : '#c77eb5', '牡丹色' : '#ea66a6', '石竹色' : '#d1c7b7',
	'象牙色' : '#f2eada', '薄墨色' : '#74787c', '煤竹色' : '#6c4c49'
};

var css_border_style = {
	'无边框'	: 'none',
	'虚线'	: 'dotted',
	'实线'	: 'solid',
	'双实线'	: 'double',
	'3D凹槽'	: 'groove',
	'菱形'	: 'ridge',
	'3D凹边'	: 'inset',
	'3D凸边'	: 'outset'
};

var css_align_type = {
	'左对齐'		: 'left',
	'右对齐'		: 'right',
	'居中'		: 'center',
	'两端对齐'	: 'justify'
};

var css_dialog_struct = [
/*	[name, css, type, {name:value,...}]
 *  type::	's' -> select
 *  		'c' -> color select
 *  		'n' -> number */
	 [null]
	,['背景色',		'backgroundColor',	'c', css_color_list			]
	,['字体色',		'color', 			'c', css_color_list			]
	,['字体大小',	'fontSize',			'n', {'min': 5, 'max':40}	]
	,['字间距',		'letterSpacing',	'n', {'min': 0, 'max':20}	]
	,['对齐方式',	'textAlign',		's', css_align_type			]
	,[null]
	,['边框样式',	'borderStyle',		's', css_border_style		]
	,['边框宽度',	'borderWidth',		'n', {'min':0 , 'max':50}	]
	,['边框颜色', 	'borderColor',		'c', css_color_list			]
	,[null]
	,['宽度',		'width',			'n', {'min':10, 'max':500}	]
	,['高度',		'height',			'n', {'min':10, 'max':500}	]
	,['内边距',		'padding',			'n', {'min':0 , 'max':50}	]
	,['外边距',		'margin',			'n', {'min':0 , 'max':50}	]
	,[null]
];

var css_default_values = {
	 'backgroundColor'	: '#FFFFFF'
	,'color'			: '#000000'
	,'fontSize'			: '12'
	,'letterSpacing'	: '0'
	,'borderStyle'		: 'none'
	,'borderWidth'		: '1'
	,'borderColor'		: '#FFFFFF'
	,'padding'			: '0'
	,'margin'			: '0'
	,'width'			: ''
	,'height'			: ''
	,'textAlign'		: 'left'
}

/**
 * 创建对话框的方法,返回的对象不可以复用
 * 
 * @param {} _parent - 该对话框的父对象容器
 * @param {} _initValue - 初始化参数,如果无效使用内部定义的初始化值,当'确定'按钮
 * 						被点击后,该当前样式参数将被复制到该map中
 * @param [] _objArrs - 存储所有控制样式对象的数组
 */
function createCssDialog(_parent, _initValue, _objArrs) {
	
	if (!_objArrs) throw new Error("参数3:被控对象数组不能为空");
	if (!_initValue) throw new Error("参数2:初始化数组不能为空");
		
	/** 创建参数的副本 */
	var modifyValue = {};
	
	for (var i in css_dialog_struct) {
		if (css_dialog_struct[i] && css_dialog_struct[i][1]) {
			var name = css_dialog_struct[i][1];
			if (!_initValue[name]) {
				_initValue[name] = css_default_values[name];	
			}
			modifyValue[name] = _initValue[name];
		}
	}
		
	/** 用来保存释放内存的过程 */
	var _frees = [];
	var _width = 300;
	var _listeners = [];
	
	/** 创建主框架 */
	var rh = create_round_horn(_parent);
	rh.autoMove(false);
	rh.frame.style.width = _width + 'px';
	
	/** 使框架可以移动 */
	var move = new DivPack(rh.frame, rh.frame);
	
	/** 创建内容元素 */
	var table = cc('table', rh.content);
	table.style.width = (_width-30) + "px";
	var tbody = cc('tbody', table);
	
	var tmp = css_dialog_struct.length;
	for (var ri = 0; ri<tmp; ++ri) {
		if (!css_dialog_struct[ri][0]) {
			createSeptation();
			continue;
		}
		
		(function () {
			var type = css_dialog_struct[ri][2];
			var tag = null;
			var _ri = ri;
			
			if (type=='c') {
				tag = createColorRow(css_dialog_struct[ri]);
			} 
			else if (type=='n') {
				tag = createNumRow(css_dialog_struct[ri]);
			} 
			else {
				tag = createSelectRow(css_dialog_struct[ri]);
			}
	
			_freeListener( onchange(tag, function() {
				changeStyle(css_dialog_struct[_ri][1], tag.value, tag);
			}) );
		})();
	}
	
	
	/* 创建按钮 */
	var tr = cc('tr', tbody);
	var td = cc('td', tr); // 占位
	var td = cc('td', tr);
	
	var ok = chref('确定', td);
	ok.onclick = function() {
		_sendEvent('ok');
		for (var i in modifyValue) {
			_initValue[i] = modifyValue[i]; 
		}
		_close();
	}
	
	var cancel = chref('取消', td);
	cancel.onclick = function() {
		_sendEvent('cancel');
		// 后退所有修改
		for (var i in _initValue) { 
			changeStyle(i, _initValue[i]);
		}
		_close();
	}
	
	_freeListener(function() {
		cancel.onclick = null;
		ok.onclick = null;
	});
	
	
	function createSeptation() {
		var tr = cc('tr', tbody);
		var td = cc('td', tr);
		td.colSpan = 2;
		var div = cc('div', td);
		
		div.style.height = '2px';
		div.style.width = '100%';
		div.style.overflow = 'hidden';
		div.style.backgroundColor = '#cccccc';
		div.style.margin = '5px';
	}
	
	function createColorRow(_arr) {
		var select = createSelect(_arr[0]);
		var color_list = _arr[3];
		
		for (var cl in color_list) {
			var option = cc('option', select);
			option.value = color_list[cl];
			option.style.backgroundColor = color_list[cl];
			
			if (color_list[cl]!='#FFFFFF') // 低效 
				option.style.color = '#FFFFFF';
			option.innerHTML = cl;
			
			if (_initValue[_arr[1]]==color_list[cl]) {
				option.selected = true;
			}
		}
		return select;
	}
	
	function createSelectRow(_arr) {
		var select = createSelect(_arr[0]);
		var op_list = _arr[3];
		
		for (var cl in op_list) {
			var option = cc('option', select);
			option.value = op_list[cl];
			option.innerHTML = cl;
			
			if (_initValue[_arr[1]]==op_list[cl]) {
				option.selected = true;
			}
		}
		return select;
	}
	
	function createNumRow(_arr) {
		var td = createTSc(_arr[0]);
		var input = cc('input', td);
		var add = chref('+1', td);
		var sub = chref('-1', td);
		
		if (_initValue[_arr[1]]) {
			input.value = _initValue[_arr[1]];
		}
		input.size = 5;
		
		add.onclick = function() {
			var i = parseInt(input.value) + 1;
			if (i<=_arr[3].max) {
				input.value = i;
			} else {
				input.value = 0;
			}
		}
		sub.onclick = function() {
			var i = parseInt(input.value) - 1;
			if (i>=_arr[3].min) {
				input.value = i;
			} else {
				input.value = 0;
			}
		}
		
		_freeListener(function() {
			sub.onclick = null;
			add.onclick = null;
		});
		
		return input;
	}
	
	function createSelect(_title_name) {
		var td = createTSc(_title_name);
		var select = cc('select', td);
		return select;
	}
	
	function createTSc(_title_name) {
		var tr = cc('tr', tbody);
		var th = cc('th', tr);
		th.innerHTML = _title_name;
		var td = cc('td', tr);
		return td;
	}
	
	/* 如果_name属性不能使用_value赋值,_input会被清空 */
	function changeStyle(_name, _value, _input) {
		for (var i in _objArrs) {
			if (i!='length' && _objArrs[i] && _objArrs[i].style) {
				try {
					_objArrs[i].style[_name] = _value;
				} catch (e) {
					_input && (_input.value = '');
				}
			}
		}
		modifyValue[_name] = _value;
	}
	
	function _freeListener(_o) {
		_frees.push(_o);
	}
	
	/** 插入新的标签对象并用当前样式属性设置他 */
	function _addTag(_tag) {
		_objArrs.push(_tag);
		for (var name in modifyValue) {
			_tag.style[name] = modifyValue[name];
		}
	}
	
	function _show(_x, _y) {
		_sendEvent('show');
		if (!_x) _x = (document.body.clientWidth - 300)/2;
		if (!_y) _y = 150;
		rh.show(_x, _y);
	}
	
	function _close() {
		_sendEvent('close');
		rh.close();
		move.free();
		for (var i=_frees.length-1; i>=0; --i) {
			if ( _frees[i] ) {
				_frees[i]();
				_frees[i] = null;
			}
		}
		_frees = null;
		_sendEvent('closed');
		_listeners = null;
	}
	
	/** 将监听器压入,待发生事件时触发,监听器原型:
	 *  function listen(eventStr) */
	function _listener(_l) {
		if (typeof _l =='function') {
			_listeners.push(_l);
		}
	}
	
	/**
	 * 事件类型:
	 * close	- 关闭并释放内存
	 * show		- 组件被显示
	 * ok		- 确定按钮按下
	 * cancel	- 取消按钮按下
	 * closed	- 当组件被完全关闭后发出
	 * @param {} eventStr
	 */
	function _sendEvent(eventStr) {
		for (var i=_listeners.length-1; i>=0; i--) {
			_listeners[i](eventStr);
		}
	}
	
	return {
		 'show'		: _show
		,'close'	: _close
		,'objArrays': _objArrs
		,'listener'	: _listener
		,'addTag'	: _addTag
	};
}