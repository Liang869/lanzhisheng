var Cloud=function(){this.isLogin=!1,this.token=!1,this.Root="",this.Place=!1,this.pageRoot="",this.apiRoot="",this.iosURL="",this.androidURL="",this.iphoneSchema="Dinglc://",this.androidSchema="app://www.dinglc.com",this.init()};Cloud.prototype.init=function(){this.setRoot(),this.setPlace(),this.token=this.getUrlParam("data"),this.iosURL="http://a.app.qq.com/o/simple.jsp?pkgname=com.dinglc.app",this.androidURL="http://a.app.qq.com/o/simple.jsp?pkgname=com.dinglc.app"},Cloud.prototype.setPlace=function(){var a=-1;/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)?a=navigator.userAgent.indexOf("MicroMessenger")>-1||navigator.userAgent.indexOf("QQ")>-1||navigator.userAgent.indexOf("Safari")>-1?0:1:/(Android)/i.test(navigator.userAgent)?navigator.userAgent.indexOf("MicroMessenger")>-1||navigator.userAgent.indexOf("QQ")>-1?a="0":window.stlc?window.stlc.toMain&&(a=2):a=0:a=0,this.Place=a},Cloud.prototype.getPlace=function(){return setPlace()},Cloud.prototype.setRoot=function(){var a="",b="",c="",d=window.location.href;return a=d.indexOf("mobile-app.lanshenglc.com/")>-1?"http://mobile-app.lanshenglc.com/":d.indexOf("mobile-app.lanzhishenglc.com/")>-1?"http://mobile-app.lanzhishenglc.com/":"http://mobile-app.lanshenglc.com/",this.Root=a,this.pageRoot=b,this.apiRoot=c,{root:a,pageRoot:b,apiRoot:c}},Cloud.prototype.getRoot=function(){return Cloud.prototype.setRoot()},Cloud.prototype.goTo=function(type,options){try{var opt=options||{};isAndroid()&&(opt=JSON.stringify(opt));var fun="dinglc."+type+"(opt)";eval(fun)}catch(e){gotoApp()}finally{}},Cloud.prototype.on=function(a,b){Cloud.prototype.getUrlParam("cid");try{switch(a){case"proItem":return b.id&&0!=b.id?dinglc.toProjectDetail(1*b.id):dinglc.toMain(1);case"proList":return dinglc.toMain(1);case"login":return dinglc.login();case"download":gotoApp();break;case"share":return dinglc.share(b)}}catch(c){gotoApp()}},Cloud.prototype.goTo=function(type,options){try{var opt=options||{};isAndroid()&&(opt=JSON.stringify(opt));var fun="dinglc."+type+"(opt)";eval(fun)}catch(e){gotoApp()}finally{}};var isAndroid=function(){var a=navigator.userAgent.toLowerCase();return!/iphone|ipad|ipod/.test(a)&&(!!/android/.test(a)||void 0)},gotoApp=function(){var a=navigator.userAgent.toLowerCase(),b="ipad"==a.match(/ipad/i),c="iphone os"==a.match(/iphone os/i),d="midp"==a.match(/midp/i),e="rv:1.2.3.4"==a.match(/rv:1.2.3.4/i),f="ucweb"==a.match(/ucweb/i),g="android"==a.match(/android/i),h="windows ce"==a.match(/windows ce/i),i="windows mobile"==a.match(/windows mobile/i);(b||c||d||e||f||g||h||i)&&(isAndroid()?(window.location.href="app://www.dinglc.com",window.setTimeout(function(){window.location.href="http://a.app.qq.com/o/simple.jsp?pkgname=com.dinglc.app"},1e3)):window.setTimeout(function(){window.location.href="Dinglc://",window.setTimeout(function(){window.location.href="http://a.app.qq.com/o/simple.jsp?pkgname=com.dinglc.app"},1e3)}))};Cloud.prototype.getUrlParam=function(a){var b=window.location.href,c="";if(b.indexOf("?")>-1){var d=b.split("?")[1];if(d.indexOf("&")>-1){for(var e=d.split("&"),f=0;f<e.length;f++)if(e[f].split("=")[0]==a){c=e[f].split("=")[1];break}}else d.split("=")[0]==a&&(c=d.split("=")[1])}return c},Cloud.prototype.getUrlParam2=function(a){var b=new RegExp("(^|&)"+a+"=([^&]*)(&|$)"),c=window.location.search.substr(1).match(b);return null!=c?unescape(c[2]):null},Cloud.prototype.download=function(a){var b=this.iosURL,c=this.androidURL;window.mobileUtil.isAndroid&&window.mobileUtil.isWeixin||(window.mobileUtil.isIos?window.location.href=b:window.mobileUtil.isAndroid&&(window.location=c))},Cloud.prototype.checkTel=function(a){var b=/^0?1[0-9][0-9]\d{8}$/;return b.test(a)},function(a,b){"function"==typeof define&&define.amd?define(function(){return b(a)}):b(a)}(this,function(a){var b=function(){function b(a){return null==a?String(a):X[Y.call(a)]||"object"}function c(a){return"function"==b(a)}function d(a){return null!=a&&a==a.window}function e(a){return null!=a&&a.nodeType==a.DOCUMENT_NODE}function f(a){return"object"==b(a)}function g(a){return f(a)&&!d(a)&&Object.getPrototypeOf(a)==Object.prototype}function h(a){var b=!!a&&"length"in a&&a.length,c=z.type(a);return"function"!=c&&!d(a)&&("array"==c||0===b||"number"==typeof b&&b>0&&b-1 in a)}function i(a){return F.call(a,function(a){return null!=a})}function j(a){return a.length>0?z.fn.concat.apply([],a):a}function k(a){return a.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/_/g,"-").toLowerCase()}function l(a){return a in J?J[a]:J[a]=new RegExp("(^|\\s)"+a+"(\\s|$)")}function m(a,b){return"number"!=typeof b||K[k(a)]?b:b+"px"}function n(a){var b,c;return I[a]||(b=H.createElement(a),H.body.appendChild(b),c=getComputedStyle(b,"").getPropertyValue("display"),b.parentNode.removeChild(b),"none"==c&&(c="block"),I[a]=c),I[a]}function o(a){return"children"in a?G.call(a.children):z.map(a.childNodes,function(a){if(1==a.nodeType)return a})}function p(a,b){var c,d=a?a.length:0;for(c=0;c<d;c++)this[c]=a[c];this.length=d,this.selector=b||""}function q(a,b,c){for(y in b)c&&(g(b[y])||aa(b[y]))?(g(b[y])&&!g(a[y])&&(a[y]={}),aa(b[y])&&!aa(a[y])&&(a[y]=[]),q(a[y],b[y],c)):b[y]!==x&&(a[y]=b[y])}function r(a,b){return null==b?z(a):z(a).filter(b)}function s(a,b,d,e){return c(b)?b.call(a,d,e):b}function t(a,b,c){null==c?a.removeAttribute(b):a.setAttribute(b,c)}function u(a,b){var c=a.className||"",d=c&&c.baseVal!==x;return b===x?d?c.baseVal:c:void(d?c.baseVal=b:a.className=b)}function v(a){try{return a?"true"==a||"false"!=a&&("null"==a?null:+a+""==a?+a:/^[\[\{]/.test(a)?z.parseJSON(a):a):a}catch(b){return a}}function w(a,b){b(a);for(var c=0,d=a.childNodes.length;c<d;c++)w(a.childNodes[c],b)}var x,y,z,A,B,C,D=[],E=D.concat,F=D.filter,G=D.slice,H=a.document,I={},J={},K={"column-count":1,columns:1,"font-weight":1,"line-height":1,opacity:1,"z-index":1,zoom:1},L=/^\s*<(\w+|!)[^>]*>/,M=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,N=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,O=/^(?:body|html)$/i,P=/([A-Z])/g,Q=["val","css","html","text","data","width","height","offset"],R=["after","prepend","before","append"],S=H.createElement("table"),T=H.createElement("tr"),U={tr:H.createElement("tbody"),tbody:S,thead:S,tfoot:S,td:T,th:T,"*":H.createElement("div")},V=/complete|loaded|interactive/,W=/^[\w-]*$/,X={},Y=X.toString,Z={},$=H.createElement("div"),_={tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},aa=Array.isArray||function(a){return a instanceof Array};return Z.matches=function(a,b){if(!b||!a||1!==a.nodeType)return!1;var c=a.matches||a.webkitMatchesSelector||a.mozMatchesSelector||a.oMatchesSelector||a.matchesSelector;if(c)return c.call(a,b);var d,e=a.parentNode,f=!e;return f&&(e=$).appendChild(a),d=~Z.qsa(e,b).indexOf(a),f&&$.removeChild(a),d},B=function(a){return a.replace(/-+(.)?/g,function(a,b){return b?b.toUpperCase():""})},C=function(a){return F.call(a,function(b,c){return a.indexOf(b)==c})},Z.fragment=function(a,b,c){var d,e,f;return M.test(a)&&(d=z(H.createElement(RegExp.$1))),d||(a.replace&&(a=a.replace(N,"<$1></$2>")),b===x&&(b=L.test(a)&&RegExp.$1),b in U||(b="*"),f=U[b],f.innerHTML=""+a,d=z.each(G.call(f.childNodes),function(){f.removeChild(this)})),g(c)&&(e=z(d),z.each(c,function(a,b){Q.indexOf(a)>-1?e[a](b):e.attr(a,b)})),d},Z.Z=function(a,b){return new p(a,b)},Z.isZ=function(a){return a instanceof Z.Z},Z.init=function(a,b){var d;if(!a)return Z.Z();if("string"==typeof a)if(a=a.trim(),"<"==a[0]&&L.test(a))d=Z.fragment(a,RegExp.$1,b),a=null;else{if(b!==x)return z(b).find(a);d=Z.qsa(H,a)}else{if(c(a))return z(H).ready(a);if(Z.isZ(a))return a;if(aa(a))d=i(a);else if(f(a))d=[a],a=null;else if(L.test(a))d=Z.fragment(a.trim(),RegExp.$1,b),a=null;else{if(b!==x)return z(b).find(a);d=Z.qsa(H,a)}}return Z.Z(d,a)},z=function(a,b){return Z.init(a,b)},z.extend=function(a){var b,c=G.call(arguments,1);return"boolean"==typeof a&&(b=a,a=c.shift()),c.forEach(function(c){q(a,c,b)}),a},Z.qsa=function(a,b){var c,d="#"==b[0],e=!d&&"."==b[0],f=d||e?b.slice(1):b,g=W.test(f);return a.getElementById&&g&&d?(c=a.getElementById(f))?[c]:[]:1!==a.nodeType&&9!==a.nodeType&&11!==a.nodeType?[]:G.call(g&&!d&&a.getElementsByClassName?e?a.getElementsByClassName(f):a.getElementsByTagName(b):a.querySelectorAll(b))},z.contains=H.documentElement.contains?function(a,b){return a!==b&&a.contains(b)}:function(a,b){for(;b&&(b=b.parentNode);)if(b===a)return!0;return!1},z.type=b,z.isFunction=c,z.isWindow=d,z.isArray=aa,z.isPlainObject=g,z.isEmptyObject=function(a){var b;for(b in a)return!1;return!0},z.isNumeric=function(a){var b=Number(a),c=typeof a;return null!=a&&"boolean"!=c&&("string"!=c||a.length)&&!isNaN(b)&&isFinite(b)||!1},z.inArray=function(a,b,c){return D.indexOf.call(b,a,c)},z.camelCase=B,z.trim=function(a){return null==a?"":String.prototype.trim.call(a)},z.uuid=0,z.support={},z.expr={},z.noop=function(){},z.map=function(a,b){var c,d,e,f=[];if(h(a))for(d=0;d<a.length;d++)c=b(a[d],d),null!=c&&f.push(c);else for(e in a)c=b(a[e],e),null!=c&&f.push(c);return j(f)},z.each=function(a,b){var c,d;if(h(a)){for(c=0;c<a.length;c++)if(b.call(a[c],c,a[c])===!1)return a}else for(d in a)if(b.call(a[d],d,a[d])===!1)return a;return a},z.grep=function(a,b){return F.call(a,b)},a.JSON&&(z.parseJSON=JSON.parse),z.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(a,b){X["[object "+b+"]"]=b.toLowerCase()}),z.fn={constructor:Z.Z,length:0,forEach:D.forEach,reduce:D.reduce,push:D.push,sort:D.sort,splice:D.splice,indexOf:D.indexOf,concat:function(){var a,b,c=[];for(a=0;a<arguments.length;a++)b=arguments[a],c[a]=Z.isZ(b)?b.toArray():b;return E.apply(Z.isZ(this)?this.toArray():this,c)},map:function(a){return z(z.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return z(G.apply(this,arguments))},ready:function(a){return V.test(H.readyState)&&H.body?a(z):H.addEventListener("DOMContentLoaded",function(){a(z)},!1),this},get:function(a){return a===x?G.call(this):this[a>=0?a:a+this.length]},toArray:function(){return this.get()},size:function(){return this.length},remove:function(){return this.each(function(){null!=this.parentNode&&this.parentNode.removeChild(this)})},each:function(a){return D.every.call(this,function(b,c){return a.call(b,c,b)!==!1}),this},filter:function(a){return c(a)?this.not(this.not(a)):z(F.call(this,function(b){return Z.matches(b,a)}))},add:function(a,b){return z(C(this.concat(z(a,b))))},is:function(a){return this.length>0&&Z.matches(this[0],a)},not:function(a){var b=[];if(c(a)&&a.call!==x)this.each(function(c){a.call(this,c)||b.push(this)});else{var d="string"==typeof a?this.filter(a):h(a)&&c(a.item)?G.call(a):z(a);this.forEach(function(a){d.indexOf(a)<0&&b.push(a)})}return z(b)},has:function(a){return this.filter(function(){return f(a)?z.contains(this,a):z(this).find(a).size()})},eq:function(a){return a===-1?this.slice(a):this.slice(a,+a+1)},first:function(){var a=this[0];return a&&!f(a)?a:z(a)},last:function(){var a=this[this.length-1];return a&&!f(a)?a:z(a)},find:function(a){var b,c=this;return b=a?"object"==typeof a?z(a).filter(function(){var a=this;return D.some.call(c,function(b){return z.contains(b,a)})}):1==this.length?z(Z.qsa(this[0],a)):this.map(function(){return Z.qsa(this,a)}):z()},closest:function(a,b){var c=[],d="object"==typeof a&&z(a);return this.each(function(f,g){for(;g&&!(d?d.indexOf(g)>=0:Z.matches(g,a));)g=g!==b&&!e(g)&&g.parentNode;g&&c.indexOf(g)<0&&c.push(g)}),z(c)},parents:function(a){for(var b=[],c=this;c.length>0;)c=z.map(c,function(a){if((a=a.parentNode)&&!e(a)&&b.indexOf(a)<0)return b.push(a),a});return r(b,a)},parent:function(a){return r(C(this.pluck("parentNode")),a)},children:function(a){return r(this.map(function(){return o(this)}),a)},contents:function(){return this.map(function(){return this.contentDocument||G.call(this.childNodes)})},siblings:function(a){return r(this.map(function(a,b){return F.call(o(b.parentNode),function(a){return a!==b})}),a)},empty:function(){return this.each(function(){this.innerHTML=""})},pluck:function(a){return z.map(this,function(b){return b[a]})},show:function(){return this.each(function(){"none"==this.style.display&&(this.style.display=""),"none"==getComputedStyle(this,"").getPropertyValue("display")&&(this.style.display=n(this.nodeName))})},replaceWith:function(a){return this.before(a).remove()},wrap:function(a){var b=c(a);if(this[0]&&!b)var d=z(a).get(0),e=d.parentNode||this.length>1;return this.each(function(c){z(this).wrapAll(b?a.call(this,c):e?d.cloneNode(!0):d)})},wrapAll:function(a){if(this[0]){z(this[0]).before(a=z(a));for(var b;(b=a.children()).length;)a=b.first();z(a).append(this)}return this},wrapInner:function(a){var b=c(a);return this.each(function(c){var d=z(this),e=d.contents(),f=b?a.call(this,c):a;e.length?e.wrapAll(f):d.append(f)})},unwrap:function(){return this.parent().each(function(){z(this).replaceWith(z(this).children())}),this},clone:function(){return this.map(function(){return this.cloneNode(!0)})},hide:function(){return this.css("display","none")},toggle:function(a){return this.each(function(){var b=z(this);(a===x?"none"==b.css("display"):a)?b.show():b.hide()})},prev:function(a){return z(this.pluck("previousElementSibling")).filter(a||"*")},next:function(a){return z(this.pluck("nextElementSibling")).filter(a||"*")},html:function(a){return 0 in arguments?this.each(function(b){var c=this.innerHTML;z(this).empty().append(s(this,a,b,c))}):0 in this?this[0].innerHTML:null},text:function(a){return 0 in arguments?this.each(function(b){var c=s(this,a,b,this.textContent);this.textContent=null==c?"":""+c}):0 in this?this.pluck("textContent").join(""):null},attr:function(a,b){var c;return"string"!=typeof a||1 in arguments?this.each(function(c){if(1===this.nodeType)if(f(a))for(y in a)t(this,y,a[y]);else t(this,a,s(this,b,c,this.getAttribute(a)))}):0 in this&&1==this[0].nodeType&&null!=(c=this[0].getAttribute(a))?c:x},removeAttr:function(a){return this.each(function(){1===this.nodeType&&a.split(" ").forEach(function(a){t(this,a)},this)})},prop:function(a,b){return a=_[a]||a,1 in arguments?this.each(function(c){this[a]=s(this,b,c,this[a])}):this[0]&&this[0][a]},removeProp:function(a){return a=_[a]||a,this.each(function(){delete this[a]})},data:function(a,b){var c="data-"+a.replace(P,"-$1").toLowerCase(),d=1 in arguments?this.attr(c,b):this.attr(c);return null!==d?v(d):x},val:function(a){return 0 in arguments?(null==a&&(a=""),this.each(function(b){this.value=s(this,a,b,this.value)})):this[0]&&(this[0].multiple?z(this[0]).find("option").filter(function(){return this.selected}).pluck("value"):this[0].value)},offset:function(b){if(b)return this.each(function(a){var c=z(this),d=s(this,b,a,c.offset()),e=c.offsetParent().offset(),f={top:d.top-e.top,left:d.left-e.left};"static"==c.css("position")&&(f.position="relative"),c.css(f)});if(!this.length)return null;if(H.documentElement!==this[0]&&!z.contains(H.documentElement,this[0]))return{top:0,left:0};var c=this[0].getBoundingClientRect();return{left:c.left+a.pageXOffset,top:c.top+a.pageYOffset,width:Math.round(c.width),height:Math.round(c.height)}},css:function(a,c){if(arguments.length<2){var d=this[0];if("string"==typeof a){if(!d)return;return d.style[B(a)]||getComputedStyle(d,"").getPropertyValue(a)}if(aa(a)){if(!d)return;var e={},f=getComputedStyle(d,"");return z.each(a,function(a,b){e[b]=d.style[B(b)]||f.getPropertyValue(b)}),e}}var g="";if("string"==b(a))c||0===c?g=k(a)+":"+m(a,c):this.each(function(){this.style.removeProperty(k(a))});else for(y in a)a[y]||0===a[y]?g+=k(y)+":"+m(y,a[y])+";":this.each(function(){this.style.removeProperty(k(y))});return this.each(function(){this.style.cssText+=";"+g})},index:function(a){return a?this.indexOf(z(a)[0]):this.parent().children().indexOf(this[0])},hasClass:function(a){return!!a&&D.some.call(this,function(a){return this.test(u(a))},l(a))},addClass:function(a){return a?this.each(function(b){if("className"in this){A=[];var c=u(this),d=s(this,a,b,c);d.split(/\s+/g).forEach(function(a){z(this).hasClass(a)||A.push(a)},this),A.length&&u(this,c+(c?" ":"")+A.join(" "))}}):this},removeClass:function(a){return this.each(function(b){if("className"in this){if(a===x)return u(this,"");A=u(this),s(this,a,b,A).split(/\s+/g).forEach(function(a){A=A.replace(l(a)," ")}),u(this,A.trim())}})},toggleClass:function(a,b){return a?this.each(function(c){var d=z(this),e=s(this,a,c,u(this));e.split(/\s+/g).forEach(function(a){(b===x?!d.hasClass(a):b)?d.addClass(a):d.removeClass(a)})}):this},scrollTop:function(a){if(this.length){var b="scrollTop"in this[0];return a===x?b?this[0].scrollTop:this[0].pageYOffset:this.each(b?function(){this.scrollTop=a}:function(){this.scrollTo(this.scrollX,a)})}},scrollLeft:function(a){if(this.length){var b="scrollLeft"in this[0];return a===x?b?this[0].scrollLeft:this[0].pageXOffset:this.each(b?function(){this.scrollLeft=a}:function(){this.scrollTo(a,this.scrollY)})}},position:function(){if(this.length){var a=this[0],b=this.offsetParent(),c=this.offset(),d=O.test(b[0].nodeName)?{top:0,left:0}:b.offset();return c.top-=parseFloat(z(a).css("margin-top"))||0,c.left-=parseFloat(z(a).css("margin-left"))||0,d.top+=parseFloat(z(b[0]).css("border-top-width"))||0,d.left+=parseFloat(z(b[0]).css("border-left-width"))||0,{top:c.top-d.top,left:c.left-d.left}}},offsetParent:function(){return this.map(function(){for(var a=this.offsetParent||H.body;a&&!O.test(a.nodeName)&&"static"==z(a).css("position");)a=a.offsetParent;return a})}},z.fn.detach=z.fn.remove,["width","height"].forEach(function(a){var b=a.replace(/./,function(a){return a[0].toUpperCase()});z.fn[a]=function(c){var f,g=this[0];return c===x?d(g)?g["inner"+b]:e(g)?g.documentElement["scroll"+b]:(f=this.offset())&&f[a]:this.each(function(b){g=z(this),g.css(a,s(this,c,b,g[a]()))})}}),R.forEach(function(c,d){var e=d%2;z.fn[c]=function(){var c,f,g=z.map(arguments,function(a){var d=[];return c=b(a),"array"==c?(a.forEach(function(a){return a.nodeType!==x?d.push(a):z.zepto.isZ(a)?d=d.concat(a.get()):void(d=d.concat(Z.fragment(a)))}),d):"object"==c||null==a?a:Z.fragment(a)}),h=this.length>1;return g.length<1?this:this.each(function(b,c){f=e?c:c.parentNode,c=0==d?c.nextSibling:1==d?c.firstChild:2==d?c:null;var i=z.contains(H.documentElement,f);g.forEach(function(b){if(h)b=b.cloneNode(!0);else if(!f)return z(b).remove();f.insertBefore(b,c),i&&w(b,function(b){if(!(null==b.nodeName||"SCRIPT"!==b.nodeName.toUpperCase()||b.type&&"text/javascript"!==b.type||b.src)){var c=b.ownerDocument?b.ownerDocument.defaultView:a;c.eval.call(c,b.innerHTML)}})})})},z.fn[e?c+"To":"insert"+(d?"Before":"After")]=function(a){return z(a)[c](this),this}}),Z.Z.prototype=p.prototype=z.fn,Z.uniq=C,Z.deserializeValue=v,z.zepto=Z,z}();return a.Zepto=b,void 0===a.$&&(a.$=b),function(b){function c(a){return a._zid||(a._zid=n++)}function d(a,b,d,g){if(b=e(b),b.ns)var h=f(b.ns);return(r[c(a)]||[]).filter(function(a){return a&&(!b.e||a.e==b.e)&&(!b.ns||h.test(a.ns))&&(!d||c(a.fn)===c(d))&&(!g||a.sel==g)})}function e(a){var b=(""+a).split(".");return{e:b[0],ns:b.slice(1).sort().join(" ")}}function f(a){return new RegExp("(?:^| )"+a.replace(" "," .* ?")+"(?: |$)")}function g(a,b){return a.del&&!t&&a.e in u||!!b}function h(a){return v[a]||t&&u[a]||a}function i(a,d,f,i,j,l,n){var o=c(a),p=r[o]||(r[o]=[]);d.split(/\s/).forEach(function(c){if("ready"==c)return b(document).ready(f);var d=e(c);d.fn=f,d.sel=j,d.e in v&&(f=function(a){var c=a.relatedTarget;if(!c||c!==this&&!b.contains(this,c))return d.fn.apply(this,arguments)}),d.del=l;var o=l||f;d.proxy=function(b){if(b=k(b),!b.isImmediatePropagationStopped()){b.data=i;var c=o.apply(a,b._args==m?[b]:[b].concat(b._args));return c===!1&&(b.preventDefault(),b.stopPropagation()),c}},d.i=p.length,p.push(d),"addEventListener"in a&&a.addEventListener(h(d.e),d.proxy,g(d,n))})}function j(a,b,e,f,i){var j=c(a);(b||"").split(/\s/).forEach(function(b){d(a,b,e,f).forEach(function(b){delete r[j][b.i],"removeEventListener"in a&&a.removeEventListener(h(b.e),b.proxy,g(b,i))})})}function k(a,c){if(c||!a.isDefaultPrevented){c||(c=a),b.each(z,function(b,d){var e=c[b];a[b]=function(){return this[d]=w,e&&e.apply(c,arguments)},a[d]=x});try{a.timeStamp||(a.timeStamp=Date.now())}catch(d){}(c.defaultPrevented!==m?c.defaultPrevented:"returnValue"in c?c.returnValue===!1:c.getPreventDefault&&c.getPreventDefault())&&(a.isDefaultPrevented=w)}return a}function l(a){var b,c={originalEvent:a};for(b in a)y.test(b)||a[b]===m||(c[b]=a[b]);return k(c,a)}var m,n=1,o=Array.prototype.slice,p=b.isFunction,q=function(a){return"string"==typeof a},r={},s={},t="onfocusin"in a,u={focus:"focusin",blur:"focusout"},v={mouseenter:"mouseover",mouseleave:"mouseout"};s.click=s.mousedown=s.mouseup=s.mousemove="MouseEvents",b.event={add:i,remove:j},b.proxy=function(a,d){var e=2 in arguments&&o.call(arguments,2);if(p(a)){var f=function(){return a.apply(d,e?e.concat(o.call(arguments)):arguments)};return f._zid=c(a),f}if(q(d))return e?(e.unshift(a[d],a),b.proxy.apply(null,e)):b.proxy(a[d],a);throw new TypeError("expected function")},b.fn.bind=function(a,b,c){return this.on(a,b,c)},b.fn.unbind=function(a,b){return this.off(a,b)},b.fn.one=function(a,b,c,d){return this.on(a,b,c,d,1)};var w=function(){return!0},x=function(){return!1},y=/^([A-Z]|returnValue$|layer[XY]$|webkitMovement[XY]$)/,z={preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"};b.fn.delegate=function(a,b,c){return this.on(b,a,c)},b.fn.undelegate=function(a,b,c){return this.off(b,a,c)},b.fn.live=function(a,c){return b(document.body).delegate(this.selector,a,c),this},b.fn.die=function(a,c){return b(document.body).undelegate(this.selector,a,c),this},b.fn.on=function(a,c,d,e,f){var g,h,k=this;return a&&!q(a)?(b.each(a,function(a,b){k.on(a,c,d,b,f)}),k):(q(c)||p(e)||e===!1||(e=d,d=c,c=m),e!==m&&d!==!1||(e=d,d=m),e===!1&&(e=x),k.each(function(k,m){f&&(g=function(a){return j(m,a.type,e),e.apply(this,arguments)}),c&&(h=function(a){var d,f=b(a.target).closest(c,m).get(0);if(f&&f!==m)return d=b.extend(l(a),{currentTarget:f,liveFired:m}),(g||e).apply(f,[d].concat(o.call(arguments,1)))}),i(m,a,e,d,c,h||g)}))},b.fn.off=function(a,c,d){var e=this;return a&&!q(a)?(b.each(a,function(a,b){e.off(a,c,b)}),e):(q(c)||p(d)||d===!1||(d=c,c=m),d===!1&&(d=x),e.each(function(){j(this,a,d,c)}))},b.fn.trigger=function(a,c){return a=q(a)||b.isPlainObject(a)?b.Event(a):k(a),a._args=c,this.each(function(){a.type in u&&"function"==typeof this[a.type]?this[a.type]():"dispatchEvent"in this?this.dispatchEvent(a):b(this).triggerHandler(a,c)})},b.fn.triggerHandler=function(a,c){var e,f;return this.each(function(g,h){e=l(q(a)?b.Event(a):a),e._args=c,e.target=h,b.each(d(h,a.type||a),function(a,b){if(f=b.proxy(e),e.isImmediatePropagationStopped())return!1})}),f},"focusin focusout focus blur load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(a){b.fn[a]=function(b){return 0 in arguments?this.bind(a,b):this.trigger(a)}}),b.Event=function(a,b){q(a)||(b=a,a=b.type);var c=document.createEvent(s[a]||"Events"),d=!0;if(b)for(var e in b)"bubbles"==e?d=!!b[e]:c[e]=b[e];return c.initEvent(a,d,!0),k(c)}}(b),function(b){function c(a,b,c,d){return Math.abs(a-b)>=Math.abs(c-d)?a-b>0?"Left":"Right":c-d>0?"Up":"Down"}function d(){l=null,n.last&&(n.el.trigger("longTap"),n={})}function e(){l&&clearTimeout(l),l=null}function f(){i&&clearTimeout(i),j&&clearTimeout(j),k&&clearTimeout(k),l&&clearTimeout(l),i=j=k=l=null,n={}}function g(a){return("touch"==a.pointerType||a.pointerType==a.MSPOINTER_TYPE_TOUCH)&&a.isPrimary}function h(a,b){return a.type=="pointer"+b||a.type.toLowerCase()=="mspointer"+b}var i,j,k,l,m,n={},o=750;b(document).ready(function(){var p,q,r,s,t=0,u=0;"MSGesture"in a&&(m=new MSGesture,m.target=document.body),b(document).bind("MSGestureEnd",function(a){var b=a.velocityX>1?"Right":a.velocityX<-1?"Left":a.velocityY>1?"Down":a.velocityY<-1?"Up":null;b&&(n.el.trigger("swipe"),n.el.trigger("swipe"+b))}).on("touchstart MSPointerDown pointerdown",function(a){(s=h(a,"down"))&&!g(a)||(r=s?a:a.touches[0],a.touches&&1===a.touches.length&&n.x2&&(n.x2=void 0,n.y2=void 0),p=Date.now(),q=p-(n.last||p),n.el=b("tagName"in r.target?r.target:r.target.parentNode),i&&clearTimeout(i),n.x1=r.pageX,n.y1=r.pageY,q>0&&q<=250&&(n.isDoubleTap=!0),n.last=p,l=setTimeout(d,o),m&&s&&m.addPointer(a.pointerId))}).on("touchmove MSPointerMove pointermove",function(a){(s=h(a,"move"))&&!g(a)||(r=s?a:a.touches[0],e(),n.x2=r.pageX,n.y2=r.pageY,t+=Math.abs(n.x1-n.x2),u+=Math.abs(n.y1-n.y2))}).on("touchend MSPointerUp pointerup",function(a){(s=h(a,"up"))&&!g(a)||(e(),n.x2&&Math.abs(n.x1-n.x2)>30||n.y2&&Math.abs(n.y1-n.y2)>30?k=setTimeout(function(){n.el&&(n.el.trigger("swipe"),n.el.trigger("swipe"+c(n.x1,n.x2,n.y1,n.y2))),n={}},0):"last"in n&&(t<30&&u<30?j=setTimeout(function(){var a=b.Event("tap");a.cancelTouch=f,n.el&&n.el.trigger(a),n.isDoubleTap?(n.el&&n.el.trigger("doubleTap"),n={}):i=setTimeout(function(){i=null,n.el&&n.el.trigger("singleTap"),n={}},250)},0):n={}),t=u=0)}).on("touchcancel MSPointerCancel pointercancel",f),b(a).on("scroll",f)}),["swipe","swipeLeft","swipeRight","swipeUp","swipeDown","doubleTap","tap","singleTap","longTap"].forEach(function(a){b.fn[a]=function(b){return this.on(a,b)}})}(b),function(a){function b(b,d){var i=b[h],j=i&&e[i];if(void 0===d)return j||c(b);if(j){if(d in j)return j[d];var k=g(d);if(k in j)return j[k]}return f.call(a(b),d)}function c(b,c,f){var i=b[h]||(b[h]=++a.uuid),j=e[i]||(e[i]=d(b));return void 0!==c&&(j[g(c)]=f),j}function d(b){var c={};return a.each(b.attributes||i,function(b,d){0==d.name.indexOf("data-")&&(c[g(d.name.replace("data-",""))]=a.zepto.deserializeValue(d.value))}),c}var e={},f=a.fn.data,g=a.camelCase,h=a.expando="Zepto"+ +new Date,i=[];a.fn.data=function(d,e){return void 0===e?a.isPlainObject(d)?this.each(function(b,e){a.each(d,function(a,b){c(e,a,b)})}):0 in this?b(this[0],d):void 0:this.each(function(){c(this,d,e)})},a.data=function(b,c,d){return a(b).data(c,d)},a.hasData=function(b){var c=b[h],d=c&&e[c];return!!d&&!a.isEmptyObject(d)},a.fn.removeData=function(b){return"string"==typeof b&&(b=b.split(/\s+/)),this.each(function(){var c=this[h],d=c&&e[c];d&&a.each(b||d,function(a){delete d[b?g(this):a]})})},["remove","empty"].forEach(function(b){var c=a.fn[b];a.fn[b]=function(){var a=this.find("*");return"remove"===b&&(a=a.add(this)),a.removeData(),c.call(this)}})}(b),function(b){function c(a,c,d){var e=b.Event(c);return b(a).trigger(e,d),!e.isDefaultPrevented()}function d(a,b,d,e){if(a.global)return c(b||u,d,e)}function e(a){a.global&&0===b.active++&&d(a,null,"ajaxStart")}function f(a){a.global&&!--b.active&&d(a,null,"ajaxStop")}function g(a,b){var c=b.context;return b.beforeSend.call(c,a,b)!==!1&&d(b,c,"ajaxBeforeSend",[a,b])!==!1&&void d(b,c,"ajaxSend",[a,b])}function h(a,b,c,e){var f=c.context,g="success";c.success.call(f,a,g,b),e&&e.resolveWith(f,[a,g,b]),d(c,f,"ajaxSuccess",[b,c,a]),j(g,b,c)}function i(a,b,c,e,f){var g=e.context;e.error.call(g,c,b,a),f&&f.rejectWith(g,[c,b,a]),d(e,g,"ajaxError",[c,e,a||b]),j(b,c,e)}function j(a,b,c){var e=c.context;c.complete.call(e,b,a),d(c,e,"ajaxComplete",[b,c]),f(c)}function k(a,b,c){if(c.dataFilter==l)return a;var d=c.context;return c.dataFilter.call(d,a,b)}function l(){}function m(a){return a&&(a=a.split(";",2)[0]),a&&(a==z?"html":a==y?"json":w.test(a)?"script":x.test(a)&&"xml")||"text"}function n(a,b){return""==b?a:(a+"&"+b).replace(/[&?]{1,2}/,"?")}function o(a){a.processData&&a.data&&"string"!=b.type(a.data)&&(a.data=b.param(a.data,a.traditional)),!a.data||a.type&&"GET"!=a.type.toUpperCase()&&"jsonp"!=a.dataType||(a.url=n(a.url,a.data),a.data=void 0)}function p(a,c,d,e){return b.isFunction(c)&&(e=d,d=c,c=void 0),b.isFunction(d)||(e=d,d=void 0),{url:a,data:c,success:d,dataType:e}}function q(a,c,d,e){var f,g=b.isArray(c),h=b.isPlainObject(c);b.each(c,function(c,i){f=b.type(i),e&&(c=d?e:e+"["+(h||"object"==f||"array"==f?c:"")+"]"),!e&&g?a.add(i.name,i.value):"array"==f||!d&&"object"==f?q(a,i,d,c):a.add(c,i)})}var r,s,t=+new Date,u=a.document,v=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,w=/^(?:text|application)\/javascript/i,x=/^(?:text|application)\/xml/i,y="application/json",z="text/html",A=/^\s*$/,B=u.createElement("a");B.href=a.location.href,b.active=0,b.ajaxJSONP=function(c,d){if(!("type"in c))return b.ajax(c);var e,f,j=c.jsonpCallback,k=(b.isFunction(j)?j():j)||"Zepto"+t++,l=u.createElement("script"),m=a[k],n=function(a){b(l).triggerHandler("error",a||"abort")},o={abort:n};return d&&d.promise(o),b(l).on("load error",function(g,j){clearTimeout(f),b(l).off().remove(),"error"!=g.type&&e?h(e[0],o,c,d):i(null,j||"error",o,c,d),a[k]=m,e&&b.isFunction(m)&&m(e[0]),m=e=void 0}),g(o,c)===!1?(n("abort"),o):(a[k]=function(){e=arguments},l.src=c.url.replace(/\?(.+)=\?/,"?$1="+k),u.head.appendChild(l),c.timeout>0&&(f=setTimeout(function(){n("timeout")},c.timeout)),o)},b.ajaxSettings={type:"GET",beforeSend:l,success:l,error:l,complete:l,context:null,global:!0,xhr:function(){return new a.XMLHttpRequest},accepts:{script:"text/javascript, application/javascript, application/x-javascript",json:y,xml:"application/xml, text/xml",html:z,text:"text/plain"},crossDomain:!1,timeout:0,processData:!0,cache:!0,dataFilter:l},b.ajax=function(c){var d,f,j=b.extend({},c||{}),p=b.Deferred&&b.Deferred();for(r in b.ajaxSettings)void 0===j[r]&&(j[r]=b.ajaxSettings[r]);e(j),j.crossDomain||(d=u.createElement("a"),d.href=j.url,d.href=d.href,j.crossDomain=B.protocol+"//"+B.host!=d.protocol+"//"+d.host),j.url||(j.url=a.location.toString()),(f=j.url.indexOf("#"))>-1&&(j.url=j.url.slice(0,f)),o(j);var q=j.dataType,t=/\?.+=\?/.test(j.url);if(t&&(q="jsonp"),j.cache!==!1&&(c&&c.cache===!0||"script"!=q&&"jsonp"!=q)||(j.url=n(j.url,"_="+Date.now())),"jsonp"==q)return t||(j.url=n(j.url,j.jsonp?j.jsonp+"=?":j.jsonp===!1?"":"callback=?")),b.ajaxJSONP(j,p);var v,w=j.accepts[q],x={},y=function(a,b){x[a.toLowerCase()]=[a,b]},z=/^([\w-]+:)\/\//.test(j.url)?RegExp.$1:a.location.protocol,C=j.xhr(),D=C.setRequestHeader;if(p&&p.promise(C),j.crossDomain||y("X-Requested-With","XMLHttpRequest"),y("Accept",w||"*/*"),(w=j.mimeType||w)&&(w.indexOf(",")>-1&&(w=w.split(",",2)[0]),C.overrideMimeType&&C.overrideMimeType(w)),(j.contentType||j.contentType!==!1&&j.data&&"GET"!=j.type.toUpperCase())&&y("Content-Type",j.contentType||"application/x-www-form-urlencoded"),j.headers)for(s in j.headers)y(s,j.headers[s]);if(C.setRequestHeader=y,C.onreadystatechange=function(){if(4==C.readyState){C.onreadystatechange=l,clearTimeout(v);var a,c=!1;if(C.status>=200&&C.status<300||304==C.status||0==C.status&&"file:"==z){if(q=q||m(j.mimeType||C.getResponseHeader("content-type")),"arraybuffer"==C.responseType||"blob"==C.responseType)a=C.response;else{a=C.responseText;try{a=k(a,q,j),"script"==q?(0,eval)(a):"xml"==q?a=C.responseXML:"json"==q&&(a=A.test(a)?null:b.parseJSON(a))}catch(d){c=d}if(c)return i(c,"parsererror",C,j,p)}h(a,C,j,p)}else i(C.statusText||null,C.status?"error":"abort",C,j,p)}},g(C,j)===!1)return C.abort(),i(null,"abort",C,j,p),C;var E=!("async"in j)||j.async;if(C.open(j.type,j.url,E,j.username,j.password),j.xhrFields)for(s in j.xhrFields)C[s]=j.xhrFields[s];for(s in x)D.apply(C,x[s]);return j.timeout>0&&(v=setTimeout(function(){C.onreadystatechange=l,C.abort(),i(null,"timeout",C,j,p)},j.timeout)),C.send(j.data?j.data:null),C},b.get=function(){return b.ajax(p.apply(null,arguments))},b.post=function(){var a=p.apply(null,arguments);return a.type="POST",b.ajax(a)},b.getJSON=function(){var a=p.apply(null,arguments);return a.dataType="json",b.ajax(a)},b.fn.load=function(a,c,d){if(!this.length)return this;var e,f=this,g=a.split(/\s/),h=p(a,c,d),i=h.success;
return g.length>1&&(h.url=g[0],e=g[1]),h.success=function(a){f.html(e?b("<div>").html(a.replace(v,"")).find(e):a),i&&i.apply(f,arguments)},b.ajax(h),this};var C=encodeURIComponent;b.param=function(a,c){var d=[];return d.add=function(a,c){b.isFunction(c)&&(c=c()),null==c&&(c=""),this.push(C(a)+"="+C(c))},q(d,a,c),d.join("&").replace(/%20/g,"+")}}(b),b}),$(function(){var a={id:0},b=new Cloud;try{$.ajax({url:b.Root+"ProjectInfo/ProjectInfo?project_duration=6",type:"get",dataType:"json",success:function(b){200==b.code&&b.data&&b.data.length>0&&(a=b.data[0])},error:function(a){}})}catch(c){}$(".bar-floor").click(function(){_czc.push(["_trackEvent","180117六月期活动","立即投资"]),b.on("proItem",a)})});