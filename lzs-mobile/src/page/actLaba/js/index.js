
$(function(){

    var c = new Cloud();
    var version=c.getUrlParam("version");
    var token = c.getUrlParam("data");
    $(".goAct").click(function(){
        var url = $(this).attr("url");
        var version=c.getUrlParam("version");
        _czc.push(["_trackEvent", "180122腊八活动", "去"+url]);
        window.location.href = c.Root + "dist/page/"+url+"/index.html?data="+token+"&version="+version;
    });
    $(".bar-floor").click(function(){
        _czc.push(["_trackEvent", "180122腊八活动", "立即投资"]);
        c.on("proList");
    })
})