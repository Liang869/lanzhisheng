/**
 * Created by zhangsan on 16/9/6.
 */
var Cloud=function(){
    this.isLogin=false;
    this.token=false;
    this.Root="";
    this.Place=false;
    this.pageRoot="";
    this.apiRoot="";
    this.iosURL="";
    this.androidURL="";
    this.iphoneSchema = '';
    this.androidSchema = 'app://www.lanzhishenglc.com';
    this.init();
};
var is_weixin = (function() {
        return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1
    })();
Cloud.prototype.init=function () {
    this.setRoot();
    this.setPlace();
    this.token=this.getUrlParam("data");
    // this.iosURL="http://a.app.qq.com/o/simple.jsp?pkgname=com.dinglc.app";
    this.iosURL="https://itunes.apple.com/cn/app/id1294532131?mt=8";
    this.androidURL = "https://mobile.baidu.com/item?docid=23679288&source=pc&from=singlemessage&isappinstalled=0";

};

Cloud.prototype.setPlace=function () {
    var place=-1;
    if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)){
        if (navigator.userAgent.indexOf("MicroMessenger") > -1 || navigator.userAgent.indexOf("QQ") > -1 || navigator.userAgent.indexOf("Safari") > -1) {
            place=0;
        }else{
            place=1;
        }
    }else if(/(Android)/i.test(navigator.userAgent)){
        // 产品详情页面
        if(navigator.userAgent.indexOf("MicroMessenger") > -1 || navigator.userAgent.indexOf("QQ") > -1) {
            place="0";
        }else{
            if(window.stlc){
                if(window.stlc.toMain){
                        place=2;
                }
            }else {
                place=0;
            }
        }
    }else{
        //wap
        // top.location.href =WAP_ROOT+"/invitation";
        place=0;
    }
    this.Place=place;
};
Cloud.prototype.getPlace=function () { 
    return setPlace();
}
Cloud.prototype.setRoot=function () {
    var root="",pageRoot="",shareRoot="",apiRoot="",hrefStr=window.location.href;
    if(hrefStr.indexOf("wap.test.lanshenglc.com/")>-1){
        root="http://wap.test.lanshenglc.com/";
    }else if(hrefStr.indexOf("mobile-app.lanzhishenglc.com/")>-1){
        root="https://mobile-app.lanzhishenglc.com/";
    }else{
        root="http://wap.test.lanshenglc.com/";
    }
    this.Root=root;
    this.pageRoot=pageRoot; 
    this.apiRoot=apiRoot;
    return {root:root,pageRoot:pageRoot,apiRoot:apiRoot};
};
Cloud.prototype.getRoot=function () {
    return Cloud.prototype.setRoot();
}
//3.0跳转客户端
/**
 跳转首页:dinglc.home()
 立即购买支付:dinglc.buy()
 分享:dinglc.share(data)
 data={
    title:分享标题
    imageUrl:分享图片url
    url:分享链接
    content:分享内容
 }
 到理财	dinglc.fiance()
 到我的	dinglc.mine()
 到发现	dinglc.find()
 到理财详情	dinglc.productDetail(data)	data={project_id:标的id}
 到账户中心	dinglc.toAccountCenter()
 到分享APP	dinglc.toShareAPP()
 到劵包	dinglc.toAllTickets()
 到我的账户	dinglc.toWallet()
 到投资记录	dinglc.toInvestment()
 到累计收益	dinglc.toAccumulateEarn()
 到提现	dinglc.toFundsTunOut()
 到总资产	dinglc.toTotalAsset()
 到登录	dinglc.toLogin()
 */
Cloud.prototype.goTo = function (type,options) {

    try{
        var opt = options || {};
        if(isAndroid()){
            opt = JSON.stringify(opt);
        }
        var fun = "dinglc."+type + '(opt)';
        eval(fun);
    }catch (e){
        gotoApp();
    }finally {

    }

};
Cloud.prototype.on=function (type,options) {
    var cid=Cloud.prototype.getUrlParam("cid");
    try{
        switch (type) {
            case "proItem":
                if(options.id && options.id !=0){
                    return dinglc.toProjectDetail(options.id*1);
                }else{
                    return dinglc.toMain(1);
                }

                break;
            case "proList":
                return dinglc.toMain(1);
                break;
            case "login":
                return dinglc.login();
                break;
            case "download":
                gotoApp();
                break;
            case "share":
                return dinglc.share(options);
                break;
        }
    }catch (e){
        gotoApp();
    }

};
//3.0跳转客户端
/**
 跳转首页:dinglc.home()
 立即购买支付:dinglc.buy()
 分享:dinglc.share(data)
 data={
    title:分享标题
    imageUrl:分享图片url
    url:分享链接
    content:分享内容
 }
 到理财	dinglc.fiance()
 到我的	dinglc.mine()
 到发现	dinglc.find()
 到理财详情	dinglc.productDetail(data)	data={project_id:标的id}
 到账户中心	dinglc.toAccountCenter()
 到分享APP	dinglc.toShareAPP()
 到劵包	dinglc.toAllTickets()
 到我的账户	dinglc.toWallet()
 到投资记录	dinglc.toInvestment()
 到累计收益	dinglc.toAccumulateEarn()
 到提现	dinglc.toFundsTunOut()
 到总资产	dinglc.toTotalAsset()
 到登录	dinglc.toLogin()
 */
Cloud.prototype.goTo = function (type,options) {

    try{
        var opt = options || {};
        if(isAndroid()){
            opt = JSON.stringify(opt);
        }
        var fun = "dinglc."+type + '(opt)';
        eval(fun);
    }catch (e){
        gotoApp();
    }finally {

    }

};
var isAndroid = function () {
    var ua = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(ua)) {
        return false;
    } else if (/android/.test(ua)) {
        return true;
    }
};
var gotoApp = function () {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
        if (isAndroid()) {
            // L add
            var _this = new Cloud();
            var newChannel = _this.getUrlParam('channel')
            if(newChannel){
                window.location.href = "app://www.lanzhishenglc.com";
                window.setTimeout(function () {
                    window.location.href = "https://cdn-h5.lanzhishenglc.com/android/lanzslc.apk";
                    return true;
                }, 1000);
            }else{
                window.location.href = "app://www.lanzhishenglc.com";
                window.setTimeout(function () {
                    window.location.href = "https://mobile.baidu.com/item?docid=23679288&source=pc&from=singlemessage&isappinstalled=0";
                }, 1000);
            }
        }
        else {
            window.setTimeout(function () {
//                    唤醒app
                // window.location.href = "https://itunes.apple.com/cn/app/id1294532131?mt=8";
                window.setTimeout(function () {
                    window.location.href = "https://itunes.apple.com/cn/app/id1294532131?mt=8";
                }, 1000);
            })
        }
    }
};
Cloud.prototype.getUrlParam=function (param) {
        var myUrl=window.location.href,
            tId="";
        if(myUrl.indexOf("?")>-1){
            var myUrlParam=myUrl.split("?")[1];
            if(myUrlParam.indexOf("&")>-1){
                var tIdArr=myUrlParam.split("&");
                for(var i=0;i<tIdArr.length;i++){
                    if(tIdArr[i].split("=")[0]==param){
                        tId=tIdArr[i].split("=")[1];
                        break;
                    }
                }
            }else {
                if(myUrlParam.split("=")[0]==param){
                    tId=myUrlParam.split("=")[1];
                }
            }
        }
        return tId;
}
//获取url中的参数
Cloud.prototype.getUrlParam2=function(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}
Cloud.prototype.download =  function(type){
    var iosurl=this.iosURL;
    var aurl = this.androidURL;
    //微信
    if(window.mobileUtil.isAndroid && window.mobileUtil.isWeixin){
        // alert('weixin')
    }else{//非微信浏览器
        if (window.mobileUtil.isIos) {
                window.location.href = iosurl;
        }else if (window.mobileUtil.isAndroid) {
                window.location=aurl;
        }
    }
}

//手机号验证
Cloud.prototype.checkTel = function (param){
    var reg = /^0?1[0-9][0-9]\d{8}$/;
    return reg.test(param);

}
Cloud.prototype.addCSC=function(key,value){
    try {
        _czc.push(["_trackEvent", key,value]);
    }catch (e){}
};


