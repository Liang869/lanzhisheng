
var app = new Vue({
    el:'#activity',
    data:{

    },
    created: function () {
        this.c=new Cloud();
        this.token = this.c.getUrlParam("data");
        $("#activity").show();
        this.init();

    },
    methods: {
        //页面初始化
        init:function(){
            var _this = this;
            //获取爆款标列表
            // _this.getTime();
            var c = new Cloud();
            if(c.getUrlParam("version") !== ""){
                _this.version = c.getUrlParam("version");
            }else{
                _this.version = 'version'
            }
        },
    }
});

