
$(function(){
    var proList = [{title:"一月期产品",id:0},{title:"二月期产品",id:0},{title:"三月期产品",id:0}];
    var c = new Cloud();
    var version=c.getUrlParam("version");
    var token = c.getUrlParam("data");
    if(version==="1.0.1"||version==='1.1.0'||version==='1.1.1'){
        document.getElementsByClassName("tel")[0].innerHTML="客服热线：400-656-9856";
    }else{
        document.getElementsByClassName("tel")[0].innerHTML="<a href='tel:400-656-9856'>客服热线：400-656-9856</a>"
    }
    try{
        $.ajax({
            url: c.Root+"ProjectInfo/ProjectInfo?projectType=local_top",
            type: "get",
            dataType:'json',
            success:function(res){
                if(res.code == 200){

                    if(res.data && res.data.length>0){
                        for(var i = 0 ; i<res.data.length;i++){

                            switch (res.data[i].project_duration ) {
                                case "1":
                                    proList[0]=res.data[i];
                                    break;
                                case "2":
                                    proList[1]=res.data[i];
                                    break;
                                case "3":
                                    proList[2]=res.data[i];
                                    break;
                            }
                        }
                    }

                }

            },
            error:function(er){

            }
        });
    }catch (e){}

    $(".goAct").click(function(){
        var url = $(this).attr("url");
        var version=c.getUrlParam("version");
        _czc.push(["_trackEvent", "180102元旦活动", "去"+url]);
        window.location.href = c.Root + "dist/page/"+url+"/index.html?data="+token+"&version="+version;
    });
    $(".proItem").click(function(){
        _czc.push(["_trackEvent", "180102元旦活动", "去标的详情"]);
        var index = $(this).attr("id");
        var id = proList[index].id*1 || 0;
        if(id && id !=0){
            c.on("proItem",{id:id});
        }else{
            c.on("proList");
        }

    });
})
