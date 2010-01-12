// CatfoOD 2009.12.9
// charset: UTF-8
// v0.11

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