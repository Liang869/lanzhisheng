window.onload = function(){

  var userName;
  var address;
  var phone;
  var email;
  var icp;
  function getIndex(res){
    var lists = res.rows; 
    for(var i = 0; i < lists.length; i++){
      switch(lists[i].id){
        case 123: 
          userName = lists[i].description + ':' + lists[i].value;
          $('.username').append(userName);
          break;
        case 124:
          address = lists[i].description + ':' + lists[i].value;
          $('.address').append(address);
          break;
        case 125:
          phone = lists[i].description + ':' + lists[i].value;
          $('.phone').append(phone);
          $('.mobile').append(lists[i].value);
          break;
        case 126:
          email = lists[i].description + ':' + lists[i].value;
          $('.email').append(email);
          break;
        case 127:
          icp = lists[i].value;
          $('.icp').append(icp);
          break;
        case 128:
          appname = lists[i].value;
          $('.appname').append(appname);
          break;
        case 129:
          eng = lists[i].value;
          $('.eng').append(eng);
          break;
      }
    }
  }
  if(sessionStorage.getItem('index')){
    var res = sessionStorage.getItem('index');
    res = JSON.parse(res);
    getIndex(res);
  }else{
    $.ajax({
      url: "http://39.106.211.177:8089/web/config",
      type: "get",
      dataType:'json',
      success:function(res){
        sessionStorage.setItem('index',JSON.stringify(res));
        var res = sessionStorage.getItem('index');
        res = JSON.parse(res)
        getIndex(res);
      }
    });
  }
};
$(window).scroll(function(){
	//document.body.scrollTop兼容谷歌
var scr = document.documentElement.scrollTop || document.body.scrollTop;
	if (scr > 600) {
		$('.back-top').show();
	}else{
		$('.back-top').hide();
	}
});
$('.back-top').click(function(){
  $('html').animate({"scrollTop":0},500);
  $("body").animate({"scrollTop":0},500);
  $(this).fadeOut(500);
})


function IsPC() {
  var userAgentInfo = navigator.userAgent;
  var Agents = ["Android", "iPhone",
      "SymbianOS", "Windows Phone",
      "iPad", "iPod"
  ];
  var flag = true;
  for (var v = 0; v < Agents.length; v++) {
      if (userAgentInfo.indexOf(Agents[v]) > 0) {
          flag = false;
          break;
      }
  }
  return flag;
}
if (!IsPC()) {
  window.location.href = 'http://kcfz-wap.dinglc.com.cn/';
}