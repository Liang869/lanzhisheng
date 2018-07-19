
var app = new Vue({
    el:'#activity',
    data:{
        c:{},
        token:"",
        tab:1

    },
    created: function () {
        this.c=new Cloud();
        this.token = this.c.getUrlParam("data");

        this.init();

    },
    methods: {
        //页面初始化
        init:function(){



        },

        goList:function(){
            _czc.push(["_trackEvent", "180222新年旺活动", "标的列表"]);
            this.c.on("proList");
        },
        goAct:function(url){
            var c = new Cloud();
            var version=c.getUrlParam("version");
            var token = c.getUrlParam("data");
            _czc.push(["_trackEvent", "180222新年旺活动", "去"+url]);
            window.location.href = c.Root + "dist/page/"+url+"/index.html?data="+token+"&version="+version;
        }
    }
});

