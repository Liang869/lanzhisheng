!function(a,b){var c=parseInt(window.screen.width)/750,d=document.createElement("meta");d.charset="utf-8",d.name="viewport",d.content="user-scalable=no,width=750, minimum-scale = "+c+", maximum-scale = "+c+", 　　target-densitydpi=device-dpi",document.getElementsByTagName("head")[0].appendChild(d);var e="https:"==document.location.protocol?" https://":" http://",f=document.createElement("script");f.src=e+"s19.cnzz.com/z_stat.php?id=1267319880&web_id=1267319880",f.language="JavaScript";var g=document.getElementsByTagName("script")[0];g.parentNode.insertBefore(f,g);var h=document.createElement("span");h.id="cnzz_stat_icon_1267319880",h.style.display="none",document.getElementsByTagName("body")[0].appendChild(h)}(window,document);var Cloud=function(){this.isLogin=!1,this.token=!1,this.Root="",this.Place=!1,this.pageRoot="",this.apiRoot="",this.iosURL="",this.androidURL="",this.iphoneSchema="Dinglc://",this.androidSchema="app://www.dinglc.com",this.init()};Cloud.prototype.init=function(){this.setRoot(),this.setPlace(),this.token=this.getUrlParam("data"),this.iosURL="http://a.app.qq.com/o/simple.jsp?pkgname=com.dinglc.app",this.androidURL="http://a.app.qq.com/o/simple.jsp?pkgname=com.dinglc.app"},Cloud.prototype.setPlace=function(){var a=-1;/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)?a=navigator.userAgent.indexOf("MicroMessenger")>-1||navigator.userAgent.indexOf("QQ")>-1||navigator.userAgent.indexOf("Safari")>-1?0:1:/(Android)/i.test(navigator.userAgent)?navigator.userAgent.indexOf("MicroMessenger")>-1||navigator.userAgent.indexOf("QQ")>-1?a="0":window.stlc?window.stlc.toMain&&(a=2):a=0:a=0,this.Place=a},Cloud.prototype.getPlace=function(){return setPlace()},Cloud.prototype.setRoot=function(){var a="",b="",c="",d=window.location.href;return a=d.indexOf("mobile-app.lanshenglc.com/")>-1?"http://mobile-app.lanshenglc.com/":d.indexOf("mobile-app.lanzhishenglc.com/")>-1?"http://mobile-app.lanzhishenglc.com/":"http://mobile-app.lanshenglc.com/",this.Root=a,this.pageRoot=b,this.apiRoot=c,{root:a,pageRoot:b,apiRoot:c}},Cloud.prototype.getRoot=function(){return Cloud.prototype.setRoot()},Cloud.prototype.goTo=function(type,options){try{var opt=options||{};isAndroid()&&(opt=JSON.stringify(opt));var fun="dinglc."+type+"(opt)";eval(fun)}catch(e){gotoApp()}finally{}},Cloud.prototype.on=function(a,b){Cloud.prototype.getUrlParam("cid");try{switch(a){case"proItem":return b.id&&0!=b.id?dinglc.toProjectDetail(1*b.id):dinglc.toMain(1);case"proList":return dinglc.toMain(1);case"login":return dinglc.login();case"download":gotoApp();break;case"share":return dinglc.share(b)}}catch(c){gotoApp()}},Cloud.prototype.goTo=function(type,options){try{var opt=options||{};isAndroid()&&(opt=JSON.stringify(opt));var fun="dinglc."+type+"(opt)";eval(fun)}catch(e){gotoApp()}finally{}};var isAndroid=function(){var a=navigator.userAgent.toLowerCase();return!/iphone|ipad|ipod/.test(a)&&(!!/android/.test(a)||void 0)},gotoApp=function(){var a=navigator.userAgent.toLowerCase(),b="ipad"==a.match(/ipad/i),c="iphone os"==a.match(/iphone os/i),d="midp"==a.match(/midp/i),e="rv:1.2.3.4"==a.match(/rv:1.2.3.4/i),f="ucweb"==a.match(/ucweb/i),g="android"==a.match(/android/i),h="windows ce"==a.match(/windows ce/i),i="windows mobile"==a.match(/windows mobile/i);(b||c||d||e||f||g||h||i)&&(isAndroid()?(window.location.href="app://www.dinglc.com",window.setTimeout(function(){window.location.href="http://a.app.qq.com/o/simple.jsp?pkgname=com.dinglc.app"},1e3)):window.setTimeout(function(){window.location.href="Dinglc://",window.setTimeout(function(){window.location.href="http://a.app.qq.com/o/simple.jsp?pkgname=com.dinglc.app"},1e3)}))};Cloud.prototype.getUrlParam=function(a){var b=window.location.href,c="";if(b.indexOf("?")>-1){var d=b.split("?")[1];if(d.indexOf("&")>-1){for(var e=d.split("&"),f=0;f<e.length;f++)if(e[f].split("=")[0]==a){c=e[f].split("=")[1];break}}else d.split("=")[0]==a&&(c=d.split("=")[1])}return c},Cloud.prototype.getUrlParam2=function(a){var b=new RegExp("(^|&)"+a+"=([^&]*)(&|$)"),c=window.location.search.substr(1).match(b);return null!=c?unescape(c[2]):null},Cloud.prototype.download=function(a){var b=this.iosURL,c=this.androidURL;window.mobileUtil.isAndroid&&window.mobileUtil.isWeixin||(window.mobileUtil.isIos?window.location.href=b:window.mobileUtil.isAndroid&&(window.location=c))},Cloud.prototype.checkTel=function(a){var b=/^0?1[0-9][0-9]\d{8}$/;return b.test(a)};var goProList=function(){_czc.push(["_trackEvent","1712首尾标","立即投资"]);var a=new Cloud;a.on("proList")};