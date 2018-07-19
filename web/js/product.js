  var prodLists;  // 列表
  var prodItem; // 详情
  var nowPage = [];
  var nowList = [{id:'',title:'',list:[]},{id:'',title:'',list:[]},{id:'',title:'',list:[]}];
if(sessionStorage.getItem('prod')){
  var res = sessionStorage.getItem('prod');
  res = JSON.parse(res);
    getProd(res)
}else{
  layui.use('layer', function(){
    var layer = layui.layer;
    layer.open({
      type: 3,
      content: '<img class="load-img" src="img/07.gif" alt="">'
    })
  });
  $.ajax({
    url: "http://39.106.211.177:8089/web/products",
    type: "get",
    dataType:'json',
    success:function(res){
      sessionStorage.setItem('prod',JSON.stringify(res));
      var res = sessionStorage.getItem('prod');
      res = JSON.parse(res);
      layer.closeAll(); 
      getProd(res);
    }
  });
}
function getProd(res){
  var prodLists;  // 列表
  var prodItem; // 详情
  var nowPage = [];
  var nowList = [{id:'',title:'',list:[]},{id:'',title:'',list:[]},{id:'',title:'',list:[]}];
  prodLists = res.rows; 
  layui.use(['laytpl','laypage','layer'], function(){
    var laytpl = layui.laytpl;
    var data = prodLists;
    var getTpl = demo.innerHTML
  view = document.getElementById('view');
  laytpl(getTpl).render(data, function(html){
    view.innerHTML = html;
  });
  var nowPage = prodLists.slice(0,3);
  for(var j = 0; j < nowPage.length; j++){
    nowList[j].id = nowPage[j].id;
    nowList[j].title = nowPage[j].title;
    nowList[j].list = nowPage[j].list.slice(0,5);
  }
  var data = nowList;
  var getTpl = demo2.innerHTML
  view = document.getElementById('view2');
  laytpl(getTpl).render(data, function(html){
    view.innerHTML = html;
  });
  // 跳转详情列表
  function pagess(ins){
    $('.product-list__hide').show();
    $('.product-list__show').hide();
      for(var i = 0; i < prodLists.length; i++){
        prodLists[i].id = prodLists[i].id*1;
        if(prodLists[i].id == ins){
          prodItem = prodLists[i];
        }
      }
    var laypage = layui.laypage;
    laypage.render({
      elem: 'page1'
      ,count: prodItem.list.length //数据总数，从服务端得到
      ,limit: 20
      ,groups: 5 // 连续出现的页码个数
      ,prev: '上一页' 
      ,next: '下一页'
      ,first: 1
      ,page: true
      ,jump:function(obj,first){
        var data = {
          "title": prodItem.title,
          "list": prodItem.list.concat().splice(obj.curr*obj.limit - obj.limit, obj.limit)
        }
        var getTpl = demo1.innerHTML;
        view = document.getElementById('view1');
        laytpl(getTpl).render(data, function(html){
          view.innerHTML = html;
        });
        $('.pop-img2 img').click(function(){
          // layer.closeAll(); 
          var popImg = $(this).attr("src");
          layer.open({
            type: 3,
            shadeClose: true,
            content: '<img class="pop-img" src="'+ popImg + '" alt="">'
          })
        });
        $('.prod-back').click(function(){
          $('.product-list__hide').hide();
          $('.product-list__show').show();
        });
      }
    });
  }
  $('.pro-main__more').click(function(){
    var ins = $(this).attr('id');
    pagess(ins)
  });
  $('.product-ban__le li').click(function(){
    var ins = $(this).attr('id');
    pagess(ins)
  });
  // 图片放大
  $('.pop-img1 img').click(function(){
    // layer.closeAll(); 
    var popImg = $(this).attr("src");
    layer.open({
      type: 3,
      shadeClose: true,
      content: '<img class="pop-img" src="'+ popImg + '" alt="">'
    })
  });
})
}