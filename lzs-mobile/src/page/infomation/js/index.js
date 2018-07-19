$(function(){
    var c =  new Cloud();
    $(".goPage").click(function(){
        var id = $(this).attr("id");

        if(id == "bank"){
            window.location.href=c.Root + "dist/page/bankNotice/index.html";
        }else if(id == "limit"){
            window.location.href=c.Root + "dist/page/riskEvaluation/safe_index2.html";
        }
        else {
            window.location.href=id +".html";
        }
    });
    $(".small").click(function(){
        var url = $(this).attr("src");
        layer.open({
            type: 1,
            shadeClose:true,
            shade:0.3,
            anim: 1,
            content: '<div class="big"><img src="'+url+'"></div>'
        });
    })
    if($("body").attr("id")=="monthly"){
       var list =  $("<div class='list'>");
       for(var i=0;i<database.monthly.length;i++){
           $("<div class='item'>").html("<a href='"+c.Root+"dist/page/monthly/"+database.monthly[i].key+".html'><img src='../../lab/img/monthly/"+database.monthly[i].key+".png'></a>" +
               "<p>"+database.monthly[i].year+"年"+database.monthly[i].month+"月运营报告</p>").appendTo(list);
       }
         list.appendTo($(".page-content"));
    }
    if($("body").attr("id")=="business"){

        $.ajax({
            url:c.Root+"Statistics/data_show",
            type: "get",
            dataType:'json',
            success:function(res){
                if(res.code == 200){

                     if(res.data){
                         for(var key in res.data){
                             $("#"+key).html(res.data[key]);
                         }
                     }
                }

            }
        });
    }
})

