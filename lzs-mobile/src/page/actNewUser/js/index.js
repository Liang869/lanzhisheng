var app = new Vue({
    el:'#activity',
    data:{
        token:0,
        isLogin:false,
        pageData:{bottom_btn_value:'',date_value:false},
        load:'<img src="../../lab/img/07.gif" class="load-img">',
        proInfo: {half: '', one: '', two: '', three: ''},
        userInfo:{},
        c:{}
    },
    created: function () {
        this.c=new Cloud();
        this.token=this.c.getUrlParam('data');
        this.proInfo= {half: this.load, one: this.load, two: this.load, three: this.load};
        this.init();
        var index;
        var notive_close = function(){
            layer.closeAll();
        }
        index = layer.open({
            shadeClose:true,
            shade:0.3,
            anim: 1,
            skin: 'notice',
            content: '<div class="notive"><div class="title">公告<img onclick="layer.closeAll()" src="img/x.png"></div><div class="content">' +
            '尊敬的用户：因业务调整，平台计划于1月30日对新手标福利进行升级调整。升级后的新手标额度将重新计算，老用户可再次购买，重享14%超高福利，感谢您对本活动的支持！'+
            '</div><div class="btn" onclick="layer.closeAll()">好的，知道了</div></div>'

        })
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

                        _this.getUserInfo();
                    }else{
                        _this.pageData['bottom_btn_value']="立即领取福利";
                        _this.proInfo= {half: 50000, one: 50000, two: 50000, three: 50000};
                    }

                }
            });
        },
        //获取用户信息
        getUserInfo:function(){
            var _this = this;
            $.ajax({
                url: _this.c.Root+"/tiro/userInfo?token="+_this.token,
                type: "get",
                dataType:'json',
                success:function(res){
                    if(res.code == 200){
                        _this.userInfo=res.data;
                        if(_this.userInfo.expire == 0){
                            _this.pageData.date_value="您的新人专享福利已到期";
                            _this.proInfo= {half: 0, one: 0, two: 0, three: 0};
                        }else if(_this.userInfo.expire == 1){
                            _this.pageData.date_value="您的新人专享福利将于<span>今日</span>到期";
                            _this.getProductInfo();
                        }else if(_this.userInfo.expire > 1){
                            _this.getProductInfo();

                        }
                    }else{
                        _this.proInfo= {half: 50000, one: 50000, two: 50000, three: 50000};
                    }

                }
            });
        },
        //查询标的详情
        getProductInfo:function(){
            var _this = this;
            $.ajax({
                url: _this.c.Root+"XinShouBiao/index?token="+_this.token,
                type: "get",
                dataType:'json',
                success:function(res){
                    if(res.code == 200){
                        _this.proInfo.half = res.data.half||0;
                        _this.proInfo.one = res.data.one||0;
                        _this.proInfo.two = res.data.two||0;
                        _this.proInfo.three = res.data.three||0;
                        if( _this.proInfo.half+ _this.proInfo.one+ _this.proInfo.two+_this.proInfo.three == 0){
                            _this.pageData.date_value="您已全部购买，快去赚取更多收益吧";
                        }else{
                            var datetime=_this.getDateStr(_this.userInfo.expire);
                            _this.pageData.date_value="您可在<span>"+datetime+"前</span>购买新人专享产品";
                        }

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
