
/**
 * ��div��ǩ�ķ�װ�࣬��dividָ����div���Ա�����϶�
 * @author CatfoOD 2009
 * 
 * @param divid - Ŀ��divid
 * @param touchid - ��������¼��Ķ����id,���Ϊnull,��div����������϶�
 * 					���touchid��Ϊnull����ָ���Ķ�����Ч��
 * 					��ʹ��div�Լ���������϶��¼�
 */
function DivPack(divid, touchid) {
	var div = document.getElementById(divid);

	var x = 0;
	var y = 0;
	var stop = true;
	var mx = 0;
	var my = 0;
	var ins = this;
	
	this.setX = function(nx) {
		x = nx;
		div.style.left = x;
	}
	
	this.setY = function(ny) {
		y = ny;
		div.style.top = y;
	}
	
	this.getX = function() {
		return x;
	}
	
	this.getY = function() {
		return y;
	}
	
	this.getDiv = function() {
		return div;
	}
	
	var divmove = function() {
		stop = false;
		mx = event.screenX;
		my = event.screenY;
	}

	var cancelmove = function() {
		stop = true;
	}

	var mousemove = function () {
		if (stop) return;
		
		var offx = event.screenX;
		var offy = event.screenY;
		
		ins.setX( ins.getX()+offx-mx );
		ins.setY( ins.getY()+offy-my );

		mx = offx;
		my = offy;
	}
	
	if (touchid) {
		var toucher = document.getElementById(touchid);
		if (toucher==null) {
			toucher = div;
		}
		toucher.onmousedown = divmove;
		toucher.onmousemove = mousemove;
		toucher.onmouseover = cancelmove;
		toucher.onmouseup = cancelmove;
		
		div.style.position = "absolute";
	}
}
