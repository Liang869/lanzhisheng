var c = new Cloud();
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
        c:{},
        href1:"",
        href2:"",
    },
    created: function () {

        this.c=new Cloud();
        this.form.channel = this.c.getUrlParam("channel");
        var _this = this;
        //获取图形验证码
        _this.getCheckCode();
        //获取平台运营数据
        // try {
        //     _this.getNum();
        // }catch (e){}
        //动态修改渠道页UI
        _this.setUI();
        _this.isload();
    },
    methods: {
        setUI:function(){
            var _this = this;

            switch (_this.form.channel){
                case '598':case '597':case '596':case '595': // 变现猫
                var mta = document.createElement("script");
                    mta.src = "//m.cudaojia.com/dist/effectListen/effectListen.js";
                    mta.setAttribute("type","text/javascript");
                    mta.language = "JavaScript";
                    document.body.appendChild(mta);
                    // _this.type = '/tx';
                    break;
                case '588':case '587':case '579':case '578':case '552':case '551'://推啊的渠道
                var tu = document.createElement("script");
                    tu.src = "//yun.tuisnake.com/h5-mami/log_copy.js";
                    tu.setAttribute("type","text/javascript");
                    tu.setAttribute("id","send_log");
                    tu.language = "JavaScript";
                    document.head.appendChild(tu);
                    _this.type = '/fh';
                    break;
                   try{
                      
                       setTimeout(function(){
                           _this.c['_sql'] = new Squirrel();
                       }, 1000);
                      
                   }catch(e){

                   }      
            }
        },
        //获取图形验证码
        getCheckCode:function(){
            var _this = this;
            _this.imgsrc = _this.c.Root + "PromotionCenter/vertifyCode?v=" + new Date().getTime().toString();
        },
        getCheckMsg:function(){
            var _this = this;
            _this.c.addCSC("1806渠道注册页", "发送验证码");
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
                                _this.c.addCSC("1806渠道注册页", "验证码发送成功");
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
            var _this = this;
            _this.c.addCSC("1806渠道注册页", "点击注册");
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
                        _this.c.addCSC("1806渠道注册页", "注册成功");
                            layer.open({
                                content: '注册成功'
                                , skin: 'msg'
                                , time: 2 //2秒后自动关闭
                            });
                            _this.openPop();
                            break;
                        case 400:
                        _this.c.addCSC("1806渠道注册页", "注册失败");
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
        // goAct:function(type,url){
        //     __this.c.addCSC(["_trackEvent", "1806渠道注册", "去"+type]);
        //     window.location.href = url;
        // },
        openPop:function(){
            var _this = this;

            switch (_this.form.channel){
                //推啊
                case '587':case '588':case '579':case '578':case '552':case '551':
                    if(!!window.countLog){
                        countLog.init(function(){
                            _this.c.on("download");
                        },{"location": "register"})
                    }else{
                        _this.c.on("download");
                    }
                    break;
                 //变现猫
                case '598': case '597': case '596': case '595':
                    // console.log("开始调用渠道方法");
                    // console.log(_this.form.channel)
                    try{
                        _bxmPlatformFn();
                        _this.c.on("download");
                    }catch(e){
                        _this.c.on("download");
                    }
                    break;
                    
                default:
                    _this.c.on("download");
                    break;

            }
        },
        isWeixin:function(){
            var isAndroid = function () {
                var ua = navigator.userAgent.toLowerCase();
                if (/iphone|ipad|ipod/.test(ua)) {
                    return false;
                } else if (/android/.test(ua)) {
                    return true;
                }
            };
            var _this = this;
            var is_weixin = (function() {
                return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1
            })();
            if(isAndroid()){
                if (is_weixin) {
                    $('.outside_pop').show();
                }
            }else{
                $('.outside_pop').hide();
            }
        },
        isload:function(){
            var closeLay = layer.open({type: 2});
            document.getElementById("isload").onload = function() {
                layer.close(closeLay);
            };
            if (document.getElementById("isload").complete) {
                layer.close(closeLay);
            }
        }
    },
    mounted: function(){
        var _this = this;
        _this.isWeixin();
    }
});	
var ba = $('.join_list3 img');
for(var i = 0; i < ba.length; i++){
	ba[i].addEventListener('click',function(){
            $('.form-phone input').focus().addClass('input_shadow');
		    $('html').animate({"scrollTop":300},10);
		    $("body").animate({"scrollTop":300},10);
	})
}
function goTo(type){
    var c = new Cloud();
    this.c.addCSC("1806渠道注册页","去"+type);
    c.goTo(type,{});
}

