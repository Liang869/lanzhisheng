(function(win, doc){
  //移动端配置meta
  var phoneScale = parseInt(window.screen.width)/750;
  var oMeta = document.createElement('meta');
  oMeta.charset = 'utf-8';
  oMeta.name ="viewport";
  oMeta.content = 'user-scalable=no,width=750, minimum-scale = '+ phoneScale +', maximum-scale = '+ phoneScale +', 　　target-densitydpi=device-dpi';
  document.getElementsByTagName('head')[0].appendChild(oMeta);
})(window, document);
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
if (IsPC()) {
  window.location.href = 'http://kcfz-web.dinglc.com.cn/';
}
