var app = new Vue({
    el:'#activity',
    data:{
        token:0,
        isLogin:false,
        number:'<img src="../../lab/img/07.gif" class="load-img">',
        resData:{},
        isOpen:false,
        isBuy:true,
        c:{}
    },
    created: function () {
        this.c=new Cloud();
        this.token=this.c.getUrlParam('data');
        this.init();
        var version=this.c.getUrlParam("version");
        if(version==="1.0.1"||version==='1.1.0'||version==='1.1.1'){
            document.getElementsByClassName("tel")[0].innerHTML="客服热线：400-656-9856";
        }else{
            document.getElementsByClassName("tel")[0].innerHTML="<a href='tel:400-656-9856'>客服热线：400-656-9856</a>"
        }
    },
    methods: {
        //页面初始化
        init:function(){
            var _this = this;
            //判断是否登录
            _this.getLogin();
            //判断是否到营业时间
            _this.toTime();
            //查询标的信息
            _this.getProductInfo();
        },
        //弹出活动规则
        openRule:function(){
            _czc.push(["_trackEvent", "1718每日夜市", "活动规则"]);
            layer.open({
                type: 1,
                shadeClose:true,
                shade:0.8,
                anim: 1,
                content: '<div class="model-rule"><div class="close" onclick="layer.closeAll()"></div><div class="title">活动规则</div><div class="text">'+
                '<p>1.每晚20:00-22:00推出14%“每日夜市”产品</p>'+
                '<p>2.“每日夜市”产品不可用券；</p>'+
                '<p>3.“每日夜市”产品购买额度，在活动结束后统一清零。</p>'+
                '</div></div>'
            });
        },
        getLogin:function(){
            var _this = this;
            $.ajax({
                url: _this.c.Root+"PublicApi/loginByToken?token="+_this.token,
                type: "get",
                dataType:'json',
                success:function(res){
                    if(res.code == 200){
                        _this.isLogin = true;
                        _this.getProductInfo();
                    }else{
                        _this.number = 0;
                    }

                }
            });
        },
        //查询标的详情
        getProductInfo:function(){
            var _this = this;
            $.ajax({
                url: _this.c.Root+"mrys/index?token="+_this.token,
                type: "get",
                dataType:'json',
                success:function(res){
                    if(res.code == 200){
                        _this.resData=res.data;
                        _this.number = _this.resData.user_night_quota;
                        //判断是否营业
                        if(_this.resData.status == 1){
                            _this.isOpen = true;
                        }else{
                            _this.isOpen = false;
                        }
                        //判断标的是否售完
                        if(_this.resData.project_id && _this.resData.project_id != 0){
                            _this.isBuy = true;
                        }else{
                            _this.isBuy = false;
                        }

                    }

                },
                error:function(er){


                }
            });

        },
        //本地时间判断
        toTime:function(){
            var _this = this;
            var date = new Date();
            var hours = date.getHours();
            if(hours>=20 && hours<=22){
                _this.isOpen=true;
            }
        },
        goProItem:function(){
            if(this.isOpen == false){
                return false;
            }
            if(this.isBuy == false){
                return false;
            }
            _czc.push(["_trackEvent", "1718每日夜市", "去标的详情"]);
            if(this.isLogin != true){
                this.c.on("login");
            }
            this.resData.project_id = this.resData.project_id*1;
            if(this.resData.project_id && this.resData.project_id !=0){
                this.c.on("proItem",{id:this.resData.project_id});
            }else{
                this.c.on("proList");
            }

        },
        //跳转到客户端
        goPro:function(){
            var _this = this;
            _czc.push(["_trackEvent", "1718每日夜市", "去理财页"]);
            _this.c.on("proList");
            return false;
        }

    }
});

