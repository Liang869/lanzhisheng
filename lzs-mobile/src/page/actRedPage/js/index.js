var c={},isLogin=false,isOpen=true,token="",version="";
$(function(){
    $("#activity").show();

    c = new Cloud();
    version=c.getUrlParam("version");
    token = c.getUrlParam("data");
    //登录判断
    $.ajax({
        url: c.Root+"PublicApi/loginByToken?token="+token,
        type: "get",
        dataType:'json',
        success:function(res){

            if(res.code == 200){

                isLogin = true;
                getOpen();
            }

        }
    });
    function getOpen(){
        $.ajax({
            url: c.Root+"SendQuan/NewYearStatus?token="+token,
            type: "get",
            dataType:'json',
            success:function(res){
                if(res.data.status && res.data.status ==1){

                    $("#openPage").hide();
                    $("#noOpen").show();

                }

            }
        });
    }
    $("#openPage").click(function(){
            _czc.push(["_trackEvent", "180215新年领红包", "领取红包"]);
            if(isLogin){
                layer.open({
                    type: 2
                    ,content: '领取中'
                });
                $.ajax({
                    type:"POST",
                    url:c.Root+"SendQuan/NewYear?token="+token,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    success:function(response){
                        layer.closeAll();
                        if(response.code == 200){
                            _czc.push(["_trackEvent", "180214新年领红包", "领取成功"]);
                            $("#openPage").hide();
                            $("#noOpen").show();
                            layer.open({
                                type: 1,
                                shadeClose:true,
                                shade:0.3,
                                anim: 2,
                                content: '<div class="open"><div class="cont"><button class="btn1" onClick="goTicket()">查看红包</button><button class="btn2" onclick="goList()">马上使用</button> </div><div class="close" onclick="layer.closeAll()"></div></div>'
                            });
                        }else{
                            _czc.push(["_trackEvent", "180214新年领红包", "领取失败"]);
                            layer.open({
                                content:response.msg
                                , skin: 'msg'
                                , time: 2 //2秒后自动关闭
                            })
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
            }else{
                if(version == "2.1.1"){
                    c.goTo("login");
                }else{
                    c.on("login");
                }

            }
    })
    $(".goAct").click(function(){
        var url = $(this).attr("url");
        var version=c.getUrlParam("version");
        _czc.push(["_trackEvent", "180215新年领红包", "去"+url]);
        window.location.href = c.Root + "dist/page/"+url+"/index.html?data="+token+"&version="+version;
    });
    $(".bar-floor").click(function(){
        goList();
    })
})
//去标的列表
var goList = function(){
    _czc.push(["_trackEvent", "180214新年领红包", "标的列表"]);
    c.on("proList");
}
var goTicket = function(){
    _czc.push(["_trackEvent", "180214新年领红包", "我的券包"]);
    if(isLogin){
        c.goTo("toAllTickets");

    }else {
        if (version == "2.1.1") {
            c.goTo("login");
        } else {
            c.on("login");
        }
    }
}