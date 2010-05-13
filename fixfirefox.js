(function () {
	
// 在fireFox中给HTMLTag增加IE的一些属性
	
if (typeof HTMLElement != 'undefined') {
	fix_select_tag();
	fix_inner_text();
	fix_style_pixel();
	fix_event();
}

function fix_select_tag() {
	var sp = document.createElement("select").constructor.prototype;

	sp.add = function(option, index) {
		index = index ? index : this.length;
		this.options.add(option, index);
	}
}

function fix_inner_text() {
	HTMLElement.prototype.__defineGetter__("innerText", function() {
		return this.textContent;
	});
	
	HTMLElement.prototype.__defineSetter__("innerText", function(v) {
		this.textContent = v;
	});
}

function fix_style_pixel() {
	var pix = ["height", "left", "right", "top", "width"];
	
	var dofix = function(name) {
		var fixname = name;
		fixname = (fixname.substring(0,1).toUpperCase()) 
				+ (fixname.substr(1));
		
		fixname = 'pixel' + fixname;
		
		CSSStyleDeclaration.prototype.__defineSetter__(fixname, function(v){
			if (v<0) v= 0;
			this[name] = parseInt(v) + 'px';
		});
		
		CSSStyleDeclaration.prototype.__defineGetter__(fixname, function(){
			var sv = this[name];
			if (sv.length>2) {
				sv = sv.substr(0, sv.length-2);
			} else {
				sv = 0;
			}
			return parseInt(sv);
		});
	}
	
	for (var i=0; i<pix.length; ++i) {
		dofix(pix[i]);
	}
}

function fix_event() {
	
	if(window.addEventListener)	{
		FixPrototypeForGecko();
	}
	
	function FixPrototypeForGecko()	{
		HTMLElement.prototype.__defineGetter__("runtimeStyle",
				element_prototype_get_runtimeStyle );
		window.constructor.prototype.__defineGetter__("event",
				window_prototype_get_event );
		Event.prototype.__defineGetter__("srcElement",
				event_prototype_get_srcElement );
	}
	
	function element_prototype_get_runtimeStyle() {
		return this.style;
	}
	
	function window_prototype_get_event() {
		return SearchEvent();
	}
	
	function event_prototype_get_srcElement() {
		return this.target;
	}

	function SearchEvent() {
		if(document.all)
			return window.event;
			
		func=SearchEvent.caller;
		
		while(func!=null)
		{
			var arg0=func.arguments[0];
			if(arg0)
			{
				if(arg0.constructor==Event)
					return arg0;
			}
			func=func.caller;
		}
		return null;
	}
}


})();