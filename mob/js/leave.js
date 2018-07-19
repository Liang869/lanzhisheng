var patrn;
var code;
function createCode(){
    code = '';
    var codeLength = 4;
    var codeV = document.getElementById('code');
    var random = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R', 'S','T','U','V','W','X','Y','Z');
    //循环codeLength 我设置的4就是循环4次
    for(var i = 0; i < codeLength; i++){
          var index = Math.floor(Math.random()*36);
          code += random[index]; 
    }
    codeV.innerHTML = code;
}
function validate(){
    var oValue = document.getElementById('input').value.toUpperCase();
    
    if($('#back-name').val() == ''){
      layer.open({
        content:'请输入姓名',
        skin: 'msg',
        time: 2
      });
      return;
    }else if($('#back-phone').val() == ''){
      layer.open({
        content:'请输入手机号',
        skin: 'msg',
        time: 2
      });
      return;
    }else if($('#back-info').val() == ''){
      layer.open({
        content:'请输入留言内容',
        skin: 'msg',
        time: 2
      });
      return;
    }else if(oValue ==0){
      layer.open({
        content:'请输入验证码',
        skin: 'msg',
        time: 2
      });
        return;
    }else if(oValue != code){
      layer.open({
        content:'验证码不正确，请重新输入',
        skin: 'msg',
        time: 2
      });
        oValue = ' ';
        createCode();
        return;
    }else{
      var uname = $('#back-phone').val();
      var patrn = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
      if (!patrn.exec(uname)){
        layer.open({
          content:'请输入正确的手机号',
          skin: 'msg',
          time: 2
        });
        return;
      }
      var backData = {};
      backData.author = $('#back-name').val();
      backData.mobile = $('#back-phone').val();
      backData.content = $('#back-info').val();
      $.ajax({
        url: "http://39.106.211.177:8089/web/messageSave",
        type: "post",
        data: backData,
        dataType:'json',
        success:function(res){
          layer.open({
            content:'留言成功',
            skin: 'msg',
            time: 2
          });
        }
      })
    }
}
    createCode();