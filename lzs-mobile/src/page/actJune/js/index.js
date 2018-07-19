
$(function(){
    var item = {id:0};
    var c = new Cloud();
    try{
        $.ajax({
            url: c.Root+"ProjectInfo/ProjectInfo?project_duration=6",
            type: "get",
            dataType:'json',
            success:function(res){
                if(res.code == 200){
                    if(res.data && res.data.length>0){
                        item = res.data[0];
                    }
                }
            },
            error:function(er){

            }
        });
    }catch (e){

    }
    $(".bar-floor").click(function(){
        _czc.push(["_trackEvent", "180117六月期活动", "立即投资"]);

        c.on("proItem",item);
    })
})