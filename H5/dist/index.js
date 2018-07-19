
var pageRoot="";
var hrefStr=window.location.href;
if(hrefStr.indexOf("mobile-app.lanshenglc.com/")>-1){
    pageRoot="http://mobile-app.lanshenglc.com";
    

}else if(hrefStr.indexOf("mobile-app.lanzhishenglc.com/")>-1){
   
    pageRoot="https://mobile-app.lanzhishenglc.com";
   
}else{
    
    pageRoot="http://mobile-app.lanshenglc.com";
    
}
var data=[
    {title:"活动-首尾标",url:pageRoot+"/page/actFistAndLastPro/index.html"},

]
for(var i=0;i<data.length;i++){
    var num=i+1;
    var div=document.createElement("div");
    div.innerHTML=num+"."+data[i].title+":<br><a href='"+data[i].url+"'>"+data[i].url+"</a>";
    document.getElementById("main").appendChild(div);
}