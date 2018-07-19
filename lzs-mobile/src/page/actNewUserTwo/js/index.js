var app = new Vue({
    el:'#activity',
    data:{
        token:0,
        isLogin:false,
        pageData:{bottom_btn_value:'',date_value:false},
        load:'<img src="../../lab/img/07.gif" class="load-img">',
        proInfo: {half: '', one: '', two: '', three: ''},
        userInfo:{expire:65},
        c:{}
    },
    created: function () {
        this.c=new Cloud();
        this.token=this.c.getUrlParam('data');
        this.proInfo= {half: this.load, one: this.load, two: this.load, three: this.load,noviceTime:this.load};
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
            try{
                //判断是否登录
                _this.getLogin();
            }catch (e){
                _this.pageData['bottom_btn_value']="立即领取福利";
            }
        },
        getLogin:function(){
            var _this = this;
            $.ajax({
                url: _this.c.Root+"PublicApi/loginByToken?token="+_this.token,
                type: "get",
                dataType:'json',
                success:function(res){

                    if(res.code == 200){
                        _this.pageData['bottom_btn_value']="立即投资";
                        _this.isLogin = true;
                        _this.getProductInfo();
                    }else{
                        _this.pageData['bottom_btn_value']="立即领取福利";
                        _this.proInfo= {half: 70000, one: 60000, two: 50000, three: 40000,noviceTime:65};
                    }

                }
            });
        },
        //查询标的详情
        getProductInfo:function(){
            var _this = this;
            $.ajax({
                url: _this.c.Root+"XinShouBiao/indexNew?token="+_this.token,
                type: "get",
                dataType:'json',
                success:function(res){
                    if(res.code == 200){
                        _this.proInfo.half = res.data.half||0;
                        _this.proInfo.one = res.data.one||0;
                        _this.proInfo.two = res.data.two||0;
                        _this.proInfo.three = res.data.three||0;
                        _this.proInfo.noviceTime = res.data.noviceTime||0;

                    }

                }
            });
        },
        //日期转化
        getDateStr:function (AddDayCount) {
            var dd = new Date();
            dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期
            var y = dd.getFullYear();
            var m = (dd.getMonth() + 1) < 10 ? "0" + (dd.getMonth() + 1) : (dd.getMonth() + 1);//获取当前月份的日期，不足10补0
            var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();//获取当前几号，不足10补0
            return y + "年" + m + "月" + d + "日";
        },
        //跳转到客户端
        goPro:function(){
            var _this = this;
            _czc.push(["_trackEvent", "1711新人福利", "立即投资"]);
            if(_this.isLogin){
                _this.c.on("proList");
            }else{
                var version=this.c.getUrlParam("version");
                if(version == "2.1.1"){
                    _this.c.goTo("login");
                }else{
                    _this.c.on("login");
                }

            }

            return false;
        }

    }
});
