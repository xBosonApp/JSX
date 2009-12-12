// CatfoOD 2009.12.9
// v0.1

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
	 * ��·��ȡ�ýڵ�
	 * ·��ʹ��'.'�ָ��������ڷ���null
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
	 * ��·��ȡ�ýڵ��ֵ��ֵ����Դ����������ֵ���ı��ڵ�ֵ
	 * ·��ʹ��'.'�ָ��������ڷ���null
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