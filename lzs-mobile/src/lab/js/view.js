(function(win, doc){
  //移动端配置meta
  var phoneScale = parseInt(window.screen.width)/750;
  var oMeta = document.createElement('meta');
  oMeta.charset = 'utf-8';
  oMeta.name ="viewport";
  oMeta.content = 'user-scalable=no,width=750, minimum-scale = '+ phoneScale +', maximum-scale = '+ phoneScale +', 　　target-densitydpi=device-dpi';
  document.getElementsByTagName('head')[0].appendChild(oMeta);
 //友盟站点统计
 var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");
 var mta = document.createElement("script");
 mta.src = cnzz_protocol+"s19.cnzz.com/z_stat.php?id=1267319880&web_id=1267319880";
 mta.language = "JavaScript";
 var s = document.getElementsByTagName("script")[0];
 s.parentNode.insertBefore(mta, s);
 var span = document.createElement("span");
 span.id =  "cnzz_stat_icon_1267319880";
 span.style.display="none";
 document.getElementsByTagName('body')[0].appendChild(span);
})(window, document);