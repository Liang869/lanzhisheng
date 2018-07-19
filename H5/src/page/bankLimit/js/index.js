$(function() {
    var c = new Cloud();
    $.ajax({
        url:c.Root+"Bank/index?pay_way=5",
        type: "get",
        dataType:'json',
        success:function(res){

            if(res.code == 200){
              var table = $("<table>");
              $("<tr>").html("<th>银行</th><th>单笔</th><th>单日</th><th>单月</th>").appendTo(table);

              if(res.data && res.data.length>0){
                  for(i=0;i<res.data.length;i++){
                      var item = res.data[i];
                      try{
                          item['limit_times'] = item['limit_times']/10000 + "万";
                          item['limit_day'] = item['limit_day']/10000 + "万";
                          item['limit_month'] = item['limit_month']/10000 + "万";
                          $("<tr>").html("<td>"+item.bank_name+"</td><td>"+item.limit_times+"</td><td>"+item.limit_day+"</td><td>"+item.limit_month+"</td>").appendTo(table);
                      }catch (e){

                      }
                  }

              }
              table.appendTo($(".table"));
            }

        }
    });
});

