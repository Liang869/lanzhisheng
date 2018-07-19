var c = new Cloud();
var app = new Vue({
    el:'#activity',
    data:{
        c:{},
        token:"",
        isLogin: false,
    },
    created: function () {
        this.c=new Cloud();
        this.c.token = this.c.getUrlParam("data");
        $("#activity").show();
        this.isLoad();
        this.init();
    },
    methods: {
        init:function(){
            var _this = this;
            _this.getIndex();
        },
        // 初始化
        getIndex:function(){
            var _this = this;
            $.ajax({ 
                url: _this.c.Root+"/PublicApi/loginByToken?token="+_this.c.token,
                type: "get",
                dataType:'json',
                success:function(res){
                    res.code = res.code*1;
                    try{
                        if(res.code == 200){
                            _this.isLogin = true;
                        }else{
                            return _this.isLogin = false;
                        }
                    }
                    catch(e){
                        _this.c.on("download");
                    };
                }
            });
        },
        isLoad:function(){
            var is_loading = layer.open({ type: 2 });
            document.getElementById("gif").onload = function() {
                layer.close(is_loading);
            };
            if (document.getElementById("gif").complete) {
                layer.close(is_loading);
            }
        },
        isWeixin:function(){
            var _this = this;
            var isAndroid = function () {
                var ua = navigator.userAgent.toLowerCase();
                if (/iphone|ipad|ipod/.test(ua)) {
                    return false;
                } else if (/android/.test(ua)) {
                    return true;
                }
            };
            var is_weixin = (function() {
                return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1
            })();
            if(isAndroid()){
                if(is_weixin){
                    $('.outside_pop').show();
                }else{
                    $('.outside_pop').hide();
                    if(_this.isLogin == false){
                        _this.c.goTo('toLogin');
                        return false;
                    };
                    _this.goProd();
                }
            }else{
                if(_this.isLogin == false){
                    _this.c.goTo('toLogin');
                    return false;
                };
                _this.goProd();
            }
        },
        goProd:function(){
            var _this = this;
            this.c.addCSC("1806-周赢宝", "标的详情");
            $.ajax({ 
                url: _this.c.Root+"weekly_project/onsale",
                type: "get",
                dataType:'json',
                success:function(res){
                    if(res.code == 200){
                        _this.c.on('proItem',res.data);
                    }else{
                        _this.c.on("proList");
                    }
                }
            });
        },
    }
});
function goTo(type){
    var c = new Cloud();
    this.c.addCSC("1806-周赢宝","去"+type);
    c.goTo(type,{});
}
