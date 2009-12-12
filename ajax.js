// CatfoOD 2009.11.25
// ����common.js
// v0.25


/**
 * ����XMLHttpRequest����
 * ʧ�ܷ���false
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
	 * ������
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
	 * ��post�������url
	 */
	this.post = function(url) {
		this.setMethod("POST");
		this.open(url);
	}
	
	/**
	 * ��get�������url
	 */
	this.get = function(url) {
		this.setMethod("GET");
		this.open(url);
	}
	
	/**
	 * ��������
	 */
	this.send = function(content) {
		if (!content) content = null;
		xmlreq.send(content);
	}
	
	/**
	 * �ж�����
	 */
	this.abort = function() {
		xmlreq.abort();
	}
	
	/**
	 * ��������ķ�����post;get;...
	 */
	this.setMethod = function(method) {
		m_method = method;
	}
	
	/**
	 * ����Ϊpost�������������ϴ�����������Ϊform
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
	 * ����¼��޸Ĵ����������������ʽ��
	 * headle(readyState, status, xmlobj);
	 *
	 * readyState - ajax״̬��
	 * status - ���ص�http״̬��
	 * xmlobj - XMLHttpRequest����
	 */
	this.setListener = function(headle) {
		m_headles.push( function() {
			headle( xmlreq.readyState, xmlreq.status, xmlreq );
		} );
	}
	
	/**
	 * ����¼������������������ʽ��
	 * headle(xmlobj);
	 * ��readyState==4�� status==200ʱ������
	 *
	 * xmlobj - XMLHttpRequest����
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
	 * ����ı����վ���������ʽ��
	 * headle(text);
	 * 
	 * text - Ӧ�𷵻ص��ı�
	 */
	this.setTextListener = function(headle) {
		this.setOkListener( function(_xmlreq) {
			headle(_xmlreq.responseText);
		} );
	}
	
	/**
	 * ���xml���վ���������ʽ��
	 * headle(xml);
	 * 
	 * xml - Ӧ�𷵻ص�xml����
	 */
	this.setXmlListener = function(headle) {
		this.setOkListener( function(_xmlreq) {
			headle(_xmlreq.responseXML);
		} );
	}
	
	/**
	 * ��Ӵ������������������ʽ��
	 * headle(errmsg, status, xmlobj);
	 *
	 * errmsg - �����������Ϣ
	 * status - ���ص�http״̬��
	 * xmlobj - XMLHttpRequest����
	 */
	this.setErrorListener = function(headle) {
		m_headles.push( function() {
			if ( xmlreq.readyState==4 &&
					(xmlreq.status!=200 && xmlreq.status!=0) ) {
				var errmsg = "δ֪����";
				switch (xmlreq.status) {
					case 204: errmsg="������";
						break;
					case 400: errmsg="�������";
						break;
					case 403: errmsg="��ֹ����";
						break;
					case 404: errmsg="�ļ�δ�ҵ�";
						break;
					case 408: errmsg="����ʱ";
						break;
					case 500: errmsg="����������";
						break;
					case 501: errmsg="δʵ��";
						break;
					case 505: errmsg="Http�汾��֧��";
						break;
				}
				headle( errmsg, xmlreq.status, xmlreq );
			}
		} );
	}
	
	/**
	 * �Ƴ�ȫ���¼�������
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
	 * 0: δ��ʼ��
	 * 1: ���ڼ���
	 * 2: �Ѽ���
	 * 3: ����
	 * 4: ���
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
