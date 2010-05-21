(function () {
	
/** 
 * 过滤选择器,首先从全部tag中取出名字tagName的tag
 * 进而可以用其他方法筛选出需要的tag
 */
window.selector = function(tags_) {	
	if (typeof tags_=="array") {
		this.ts = tags_;
	} 
	else if (typeof tags_=="string"){
		this.ts = document.getElementsByTagName(tags_);
	}
	else {
		this.ts = document.getElementsByTagName('*');
	}
}

selector.prototype = {
		
	// 筛选出指定name的tag
	"tagname" : function(tagname_) {
		var newtags = this.looptag(function(tag) {
			return (tag.tagName && tag.tagName.toLowerCase()==tagname_);
		});
		return this.r(newtags);
	},
		
	// 筛选出指定className的tag,
	"clazz" : function(className_) {
		var newtags = this.looptag(function(tag) {
			return (tag.className && tag.className.toLowerCase()==className_);
		});
		return this.r(newtags);
	},
	
	// 筛选出指定id的tag
	"id" : function(id_) {
		var newtags = this.looptag(function(tag) {
			return (tag.id && tag.id.toLowerCase()==id_);
		});
		return this.r(newtags);
	},
	
	// 筛选出属性为attrName,并且值是value的标记
	"attr" : function(attrName, value) {
		var nt = this.looptag(function(tag) {
			var v = tag.getAttribute(attrName);
			return (v && v==value);
		});
		return this.r(nt);
	},
	
	// 在筛选出的tags上执行handle_方法, function handle(tag) {...}
	"todo" : function(handle_) {
		for (var i=0; i<this.ts.length; ++i) {
			handle_(this.ts[i]);
		}
		return this;
	},
	
	// 返回当前选择器下的全部对象
	"getTags" : function() {
		return this.ts;
	},
	
	// ----------------------------------------------- 内部调用
	
	// 返回包含newtags_的新的selector对象
	"r" : function(newtags_) {
		if (!newtags_) {
			newtags_ = this.ts;
		}
		return new selector(newtags_);
	},
	
	// 循环所有标签,如果filter返回true,则加入被选标签组,并返回它
	"looptag" : function(filter_) {
		var newtags = new Array();

		this.todo(function (tag) {
			if (filter_(tag)) {
				newtags.push(tag);
			}
		});
		
		return newtags;
	}
};


})();