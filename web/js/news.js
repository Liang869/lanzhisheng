if(!sessionStorage.getItem('res')){
  layui.use('layer', function(){
    var layer = layui.layer;
    layer.open({
      type: 3,
      content: '<img class="load-img" src="img/07.gif" alt="">'
    })
  });
}
function getList (limit,offset){
  $.ajax({
    url: "http://39.106.211.177:8089/web/news?limit="+ limit +"&offset="+ offset,
    type: "get",
    dataType:'json',
    success:function(res){
      if(res.rows){
        layer.closeAll();
      }
      var laytpl = layui.laytpl;
      var data = {
        'list':res.rows,
      }
      var getTpl = demo5.innerHTML;
      view = document.getElementById('view5');
      laytpl(getTpl).render(data, function(html){
        view.innerHTML = html;
      });
      $('.news-main__list li').click(function(){
        $('.news-list__hide').show();
        $('.new-list__show').hide();
        var ins = $(this).attr('id');
        var infoList;
        var nowInfo = res.rows;
        for(var i = 0; i < nowInfo.length; i++){
          if(nowInfo[i].cid == ins){
            infoList = nowInfo[i];
          }
        };
        var data = infoList
        var getTpl = demo6.innerHTML;
        view = document.getElementById('view6');
        laytpl(getTpl).render(data, function(html){
          view.innerHTML = html;
        });
      })
    }
  })
}
if(sessionStorage.getItem('res')){
  var res = sessionStorage.getItem('res');
  res = JSON.parse(res);
  if(res.rows){
    layer.closeAll();
  }
  var laytpl = layui.laytpl;
  var data = {
    'list':res.rows,
  }
  var getTpl = demo5.innerHTML;
  view = document.getElementById('view5');
  laytpl(getTpl).render(data, function(html){
    view.innerHTML = html;
  });
  $('.news-main__list li').click(function(){
    $('.news-list__hide').show();
    $('.new-list__show').hide();
    var ins = $(this).attr('id');
    var infoList;
    var nowInfo = res.rows;
    for(var i = 0; i < nowInfo.length; i++){
      if(nowInfo[i].cid == ins){
        infoList = nowInfo[i];
      }
    };
    var data = infoList
    var getTpl = demo6.innerHTML;
    view = document.getElementById('view6');
    laytpl(getTpl).render(data, function(html){
      view.innerHTML = html;
    });
  });
  $('.new-info__back').click(function(){
    $('.news-list__hide').hide();
    $('.new-list__show').show();
  });
  var laypage = layui.laypage;
  laypage.render({
    elem: 'page2'
    ,count: res.total //数据总数，从服务端得到
    ,limit: 10
    ,groups: 5 // 连续出现的页码个数
    ,prev: '上一页' 
    ,next: '下一页'
    ,first: 1
    ,page: true
    ,jump:function(obj,first){
      if(obj.curr !== 1){
        getList(res.total,(obj.curr-1)*10);
      }else{
        getList(10,obj.curr-1);
      }
    }
  });
}else{
  $.ajax({
    url: "http://39.106.211.177:8089/web/news?limit=10&offset=0",
    type: "get",
    dataType:'json',
    success:function(res){
      sessionStorage.setItem('res',JSON.stringify(res));
      var res = sessionStorage.getItem('res');
      res = JSON.parse(res);
      var laypage = layui.laypage;
      laypage.render({
        elem: 'page2'
        ,count: res.total //数据总数，从服务端得到
        ,limit: 10
        ,groups: 5 // 连续出现的页码个数
        ,prev: '上一页' 
        ,next: '下一页'
        ,first: 1
        ,page: true
        ,jump:function(obj,first){
          if(obj.curr !== 1){
            getList(res.total,(obj.curr-1)*10);
          }else{
            getList(10,obj.curr-1);
          }
        }
      });
    }
  });
}