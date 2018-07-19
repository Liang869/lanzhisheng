var c= new Cloud();
var app = new Vue({
    el:'#activity',
    data:{
        c:{},
    },
    created: function () {
        this.c=new Cloud();
        $("#activity").show();

    },
    methods: {
        goList:function(){
            var _this = this;
            var isAndroid = function () {
                var ua = navigator.userAgent.toLowerCase();
                if (/iphone|ipad|ipod/.test(ua)) {
                    return false;
                } else if (/android/.test(ua)) {
                    return true;
                }
            };

            this.c.addCSC("1805-争抢首尾标", "立即投资");
            var ch = new Cloud();
            if(isAndroid()){
                if(ch.getUrlParam("channel") !==""){
                    window.location.href = "https://cdn-h5.lanzhishenglc.com/android/lanzslc.apk";
                    return true;
                }else{
                    this.c.on("proList");
                }
            }else{
                this.c.on("proList");
            }
        },
    }
});
function goTo(type){
    
        var c = new Cloud();
        this.c.addCSC("1805-争抢首尾标","去"+type);
        c.goTo(type,{});
    }

