// CatfoOD 2009.12.9
// charset: UTF-8
// v0.11

/**
 * 节点搜索器方法<br>
 * path使用'.'分割,如x.y.z其中x y z可以是标签名字,class或id
 * 
 * @param element - html对象
 * @param path - 路径字符串,用'.'分割
 * @return 返回所有符合path的元素数组
 */
function node(element, path) {
	var keys = path.toLowerCase().split('.');
	
	var filter = function(elem ,key) {
		var child = new Array();

		for (var j=0; j<elem.length; ++j) {
			var e = elem[j];
			if (	( e.id && key == e.id.toLowerCase() )
			    ||	( e.className && key == e.className.toLowerCase() )
				||	( e.tagName && key == e.tagName.toLowerCase() )
				) 
			{
			child.push(elem[j]);
			}
		}
		return child;
	}
	
	var copy = function(to, src) {
		for (var i=src.length-1; i>=0; --i) {
			to.push( src[i] );
		}
	}

	var childs = new Array();
	var cns = new Array();
	copy(cns, element.childNodes);
	
	for (var i=0; i<keys.length; ++i) {
		childs.length = 0;
		childs = filter(cns, keys[i]);
		cns.length = 0;
		
		for (var j=childs.length-1; j>=0; --j) {
			copy(cns, childs[j].childNodes);
		}
	}
	
	return childs;
}

function Dom(xml) {
	
	var getElement = function(nodename, parent) {
		var nodes = getElements(nodename, parent);
		var node = null;
		if (nodes && nodes.length>0) {
			node = nodes[0];
		}
		return node;
	}
	
	var getElements = function(nodename, parent) {
		var nodes = parent.getElementsByTagName(nodename);
		return nodes;
	}
	
	/**
	 * 沿路径取得节点
	 * 路径使用'.'分割，如果不存在返回null
	 */
	this.getNode = function(path) {
		var elems = path.split('.');
		var node = xml;
		
		for (var i=0; i<elems.length; ++i) {
			node = getElement(elems[i], node);
			if (node==null) break;
		}
		return node;
	}
	
	/**
	 * 沿路径取得节点的值，值的来源可以是属性值或文本节点值
	 * 路径使用'.'分割，如果不存在返回null
	 */
	this.getValue = function(path) {
		var node = this.getNode(path);
		var value = null;
		if (node) {
			value = node.firstChild.data;
		}
		return value;
	}
}