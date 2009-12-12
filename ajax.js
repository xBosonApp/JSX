// CatfoOD 2009.11.25
// 依赖common.js
// v0.25


/**
 * 创建XMLHttpRequest对象
 * 失败返回false
 */
function creatHttpRequest() {
	var http = false;
	
	if (window.XMLHttpRequest) {
		http = new XMLHttpRequest();
	}
	
	else if (window.ActiveXObject) {
		try {
			http = new ActiveXObject("MSXML2.XMLHttp.3.0");
		} catch(e) {
			try {
				http = new ActiveXObject("Microsoft.XMLHTTP");
			} catch(e1) {}
		}
	}
	
	return http;
}


function ajax() {

	var m_method = "GET";
	var m_url = false;
	var m_async = false;
	var m_headles = new Array();
	var xmlreq = creatHttpRequest();
	
	
	var eventheadle = function() {
		for (var i=0; i<m_headles.length; ++i) {
			m_headles[i]();
		}
	}
	
	var initheader = function() {
		xmlreq.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
		xmlreq.setRequestHeader('cache-control', 'no-cache');
	}
	
	if (!xmlreq) {
		showError("ajax.init: xml request error!");
	}
	else {
		xmlreq.onreadystatechange = eventheadle;
	}
	
	
	/**
	 * 打开请求
	 */
	this.open = function(url) {
		if (url) {
			m_url = url;
		}
		if (m_url) {
			xmlreq.Open(m_method, m_url, m_async);
			initheader();
		} else {
			showError("ajax.open() url fail");
		}
	}
	
	/**
	 * 用post打开请求的url
	 */
	this.post = function(url) {
		this.setMethod("POST");
		this.open(url);
	}
	
	/**
	 * 用get打开请求的url
	 */
	this.get = function(url) {
		this.setMethod("GET");
		this.open(url);
	}
	
	/**
	 * 发送请求
	 */
	this.send = function(content) {
		if (!content) content = null;
		xmlreq.send(content);
	}
	
	/**
	 * 中断请求
	 */
	this.abort = function() {
		xmlreq.abort();
	}
	
	/**
	 * 设置请求的方法，post;get;...
	 */
	this.setMethod = function(method) {
		m_method = method;
	}
	
	/**
	 * 设置为post方法，并更新上传的内容类型为form
	 */
	this.setPostMethod = function() {
		m_method = "POST";
	}
	
	this.setUrl = function(url) {
		m_url = url;
	}
	
	this.setAsync = function(syncFlag) {
		m_async = syncFlag;
	}
	
	this.setRequestHeader = function(name, value) {
		try {
			xmlreq.setRequestHeader(name, value);
		} catch(e) {
			showError( "ajax.setRequestHeader() after open()" );
		}
	}
	
	/**
	 * 添加事件修改处理句柄，句柄函数格式：
	 * headle(readyState, status, xmlobj);
	 *
	 * readyState - ajax状态码
	 * status - 返回的http状态码
	 * xmlobj - XMLHttpRequest对象
	 */
	this.setListener = function(headle) {
		m_headles.push( function() {
			headle( xmlreq.readyState, xmlreq.status, xmlreq );
		} );
	}
	
	/**
	 * 添加事件处理句柄，句柄函数格式：
	 * headle(xmlobj);
	 * 当readyState==4， status==200时被调用
	 *
	 * xmlobj - XMLHttpRequest对象
	 */
	this.setOkListener = function(headle) {
		m_headles.push( function() {
			if ( xmlreq.readyState==4 &&
					(xmlreq.status==200 || xmlreq.status==0) ) {
				headle(xmlreq);
			}
		} );
	}
	
	/**
	 * 添加文本接收句柄，句柄格式：
	 * headle(text);
	 * 
	 * text - 应答返回的文本
	 */
	this.setTextListener = function(headle) {
		this.setOkListener( function(_xmlreq) {
			headle(_xmlreq.responseText);
		} );
	}
	
	/**
	 * 添加xml接收句柄，句柄格式：
	 * headle(xml);
	 * 
	 * xml - 应答返回的xml对象
	 */
	this.setXmlListener = function(headle) {
		this.setOkListener( function(_xmlreq) {
			headle(_xmlreq.responseXML);
		} );
	}
	
	/**
	 * 添加错误处理句柄，句柄函数格式：
	 * headle(errmsg, status, xmlobj);
	 *
	 * errmsg - 错误的中文消息
	 * status - 返回的http状态码
	 * xmlobj - XMLHttpRequest对象
	 */
	this.setErrorListener = function(headle) {
		m_headles.push( function() {
			if ( xmlreq.readyState==4 &&
					(xmlreq.status!=200 && xmlreq.status!=0) ) {
				var errmsg = "未知错误";
				switch (xmlreq.status) {
					case 204: errmsg="无内容";
						break;
					case 400: errmsg="请求错误";
						break;
					case 403: errmsg="禁止访问";
						break;
					case 404: errmsg="文件未找到";
						break;
					case 408: errmsg="请求超时";
						break;
					case 500: errmsg="服务器错误";
						break;
					case 501: errmsg="未实现";
						break;
					case 505: errmsg="Http版本不支持";
						break;
				}
				headle( errmsg, xmlreq.status, xmlreq );
			}
		} );
	}
	
	/**
	 * 移除全部事件监听器
	 */
	this.clearListener = function() {
		m_headles = new Array();
	}
	
	// only read -------------------------------------------
	
	this.getAllResponseHeaders = function() {
		return xmlreq.getAllResponseHeaders();
	}
	
	this.getResponseHeader = function(name) {
		return xmlreq.getResponseHeader(name);
	}
	
	/**
	 * readyState:
	 * 0: 未初始化
	 * 1: 正在加载
	 * 2: 已加载
	 * 3: 交互
	 * 4: 完成
	 */
	this.getReadyState = function() {
		return xmlreq.readyState;
	}
	
	this.getBody = function() {
		return xmlreq.responseBody;
	}
	
	this.getStream = function() {
		return xmlreq.responseStream;
	}
	
	this.getText = function() {
		return xmlreq.responseText;
	}
	
	this.getXml = function() {
		return xmlreq.responseXML;
	}
	
	this.getStatus = function() {
		return xmlreq.Status;
	}
	
	this.getStatusText = function() {
		return xmlreq.statusText;
	}
}
