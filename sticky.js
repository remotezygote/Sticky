var $S = (function(stick,stickies,update) {
	stick = this;
	stickies = {};
	stick.r = function(elem,trans) {
		stickies[trans] || (stickies[trans] = []);
		stickies[trans].push(elem);
	};
	update = function(ev,c,i,j,s) {
		for(i in stickies) {
			s=stickies[i];
			if(i > document.body.scrollTop) {
				for(j=0;j<s.length;j++) s[j].u();
			} else {
				for(j=0;j<s.length;j++) s[j].s();
			};
		};
	};
	window.addEventListener("scroll",update,1);
	return(stick);
})();
var Sticky = function(element,pad,style,pos,obj,a,s,repos) {
	pad || (pad = 10);
	style = element["get"+(a="Attribute")]((s="style"));
	pos = [0,0];
	stuck = 0;
	element.s = function(ev) {
		if(!stuck) {
			element["set"+a](s,style+";position:fixed;top:"+pad+"px;left:"+pos[0]+"px;margin:0;");
			stuck = 1;
		};
	};
	element.u = function() {
		if(stuck) {
			element["set"+a](s,style);
			stuck = 0;
		};
	};
	repos = function() {
		pos = [0,0];
		obj = element;
		if(obj.offsetParent) {
			do {
				pos[0] += obj.offsetLeft;
				pos[1] += obj.offsetTop;
			} while((obj=obj.offsetParent));
		};
		stuck?element.s():element.u();
	};
	repos();
	window.addEventListener("resize",repos,1);
	$S.r(element,pos[1]-pad);
	return(element);
};
