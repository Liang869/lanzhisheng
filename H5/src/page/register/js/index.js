var app = new Vue({
    el:'#activity',
    data:{
        resData:{},
        imgsrc:"",
        form:{phone:"",vertify_code:"",checkMsgCode:"",channel:"",sms_code:""},
        btn_text:"获取验证码",
        checkTimer:0,
        num1:"",
        num2:"",
        c:{}
    },
    created: function () {
        this.c=new Cloud();
        this.form.channel = this.c.getUrlParam("channel");

        this.init();

    },
    methods: {
        //页面初始化
        init:function(){
            var _this = this;
            //获取图形验证码
            _this.getCheckCode();
            //获取平台运营数据
            _this.getNum();

        },
        getNum:function(){
            var _this = this;
            $.ajax({
                url: _this.c.Root +"Statistics/official",
                type: "get",
                dataType:'json',
                success:function(res){
                    if(res.code == 200){
                        for(var key in res.data){
                            $("#"+key).text(res.data[key]);
                        }
                        var n1 = parseInt(res.data.investment_total) + "";
                        var html = "";
                        for(var i=0;i<n1.length;i++){
                            if(i == n1.length -1){
                                html += "<span class='counter'>"+n1.charAt(i)+"</span>元";
                                _this.num1 = html;
                            }else{
                                html += "<span class='counter'>"+n1.charAt(i)+"</span>";
                            }
                        }
                        n1 = res.data.user_money + "";
                        html = "";
                        for(var i=0;i<n1.length;i++){
                            if(i == n1.length -1){
                                html += "<span class='counter'>"+n1.charAt(i)+"</span>元";
                                _this.num2 = html;
                            }else{
                                html += "<span class='counter'>"+n1.charAt(i)+"</span>";
                            }
                        }
                    }

                }
            });
        },
        //获取图形验证码
        getCheckCode:function(){
            var _this = this;
            _this.imgsrc = _this.c.Root + "PromotionCenter/vertifyCode?v=" + new Date().getTime().toString();
        },
        getCheckMsg:function(){
            _czc.push(["_trackEvent", "1801渠道注册页", "发送验证码"]);
            var _this = this;
                if(_this.form.phone == ""||_this.form.phone == null){
                    layer.open({
                        content: '请输入手机号'
                        ,skin: 'msg'
                        ,time: 2 //2秒后自动关闭
                    });
                    return false;
                }
                if(!_this.c.checkTel(_this.form.phone)){
                   layer.open({
                        content: '请输入正确格式的手机号'
                        ,skin: 'msg'
                        ,time: 2 //2秒后自动关闭
                    });
                    return false;
                }
                if(_this.form.vertify_code == ""||_this.form.vertify_code == null){
                    layer.open({
                        content: '请输入图形验证码'
                        ,skin: 'msg'
                        ,time: 2 //2秒后自动关闭
                    });
                    return false;
                }
                if(_this.checkTimer == 0){
                    layer.open({
                        type: 2
                        ,content: '加载中'
                    });
                    $.ajax({
                        type:"POST",
                        url:_this.c.Root+"PromotionCenter/smsCode",
                        data:{
                            'phone': _this.form.phone,
                            'vertify_code': _this.form.vertify_code
                        },
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                        success:function(response){
                            layer.closeAll();
                            switch (response.code) {
                                case 200:
                                    _czc.push(["_trackEvent", "1801渠道注册页", "验证码发送成功"]);
                                    var t=60;
                                    _this.checkTimer=setInterval(function(){
                                        if(t==0){
                                            clearInterval(_this.checkTimer);
                                            _this.checkTimer = 0;
                                            _this.btn_text="获取验证码";

                                        }else{
                                            t--;
                                            _this.btn_text=t+"s";

                                        }
                                    },1000);
                                    break;
                                case 401:
                                    layer.open({
                                        content: '手机号码格式不对'
                                        , skin: 'msg'
                                        , time: 2 //2秒后自动关闭
                                    });
                                    _this.getCheckCode();
                                    break;
                                case 402:
                                    layer.open({
                                        content: '图形验证码不对'
                                        , skin: 'msg'
                                        , time: 2 //2秒后自动关闭
                                    });
                                    _this.getCheckCode();
                                    break;
                                case 403:
                                    layer.open({
                                        content: '该用户已经注册'
                                        , skin: 'msg'
                                        , time: 2 //2秒后自动关闭
                                    });
                                    setTimeout(function(){
                                        _this.c.on("download");
                                    },2000)
                                    _this.getCheckCode();
                                    break;
                                case 400:
                                    layer.open({
                                        content: '短信发送失败'
                                        , skin: 'msg'
                                        , time: 2 //2秒后自动关闭
                                    });
                                    _this.getCheckCode();
                                    break;
                            }


                        },
                        error:function(e){
                            layer.open({
                                content: '网络异常'
                                ,skin: 'msg'
                                ,time: 2 //2秒后自动关闭
                            });
                        }
                    });
                }

        },
        submit:function(){
            _czc.push(["_trackEvent", "1801渠道注册页", "点击注册"]);
            var _this = this;
            if(_this.form.phone == ""||_this.form.phone == null){
                layer.open({
                    content: '请输入手机号'
                    ,skin: 'msg'
                    ,time: 2 //2秒后自动关闭
                });
                return false;
            }
            if(!_this.c.checkTel(_this.form.phone)){
                layer.open({
                    content: '请输入正确格式的手机号'
                    ,skin: 'msg'
                    ,time: 2 //2秒后自动关闭
                });
                return false;
            }
            if(_this.form.vertify_code == ""||_this.form.vertify_code == null){
                layer.open({
                    content: '请输入图形验证码'
                    ,skin: 'msg'
                    ,time: 2 //2秒后自动关闭
                });
                return false;
            }
            if(_this.form.sms_code == ""||_this.form.sms_code == null){
                layer.open({
                    content: '请输入短信验证码'
                    ,skin: 'msg'
                    ,time: 2 //2秒后自动关闭
                });
                return false;
            }
            layer.open({
                type: 2
                ,content: '加载中'
            });
            $.ajax({
                type:"POST",
                url:_this.c.Root+"PromotionCenter/register",
                data:_this.form,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                success:function(response){
                    layer.closeAll();
                    switch (response.code) {
                        case 200:
                            _czc.push(["_trackEvent", "1801渠道注册页", "注册成功"]);
                            layer.open({
                                content: '注册成功'
                                , skin: 'msg'
                                , time: 2 //2秒后自动关闭
                            })
                            _this.c.on("download");
                            break;
                        case 400:
                            _czc.push(["_trackEvent", "1801渠道注册页", "注册失败"]);
                            layer.open({
                                content: '注册失败'
                                , skin: 'msg'
                                , time: 2 //2秒后自动关闭
                            })
                            _this.getCheckCode();
                            break;
                        case 401:
                            layer.open({
                                content: '手机验证码错误'
                                , skin: 'msg'
                                , time: 2 //2秒后自动关闭
                            });
                            break;
                    }


                },
                error:function(e){
                    layer.open({
                        content: '网络异常'
                        ,skin: 'msg'
                        ,time: 2 //2秒后自动关闭
                    });
                }
            });
        },
        goAct:function(type,url){
            _czc.push(["_trackEvent", "1801渠道注册", "去"+type]);
            window.location.href = url;
        },
        goMonth:function(){
            _czc.push(["_trackEvent", "1801渠道注册", "去运营月报"]);
            var url =this.c.Root + "dist/page/monthly/"+database.monthly[0].key+".html";
            window.location.href = url;
        }
    }
});

