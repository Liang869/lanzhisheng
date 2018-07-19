
var app = new Vue({
    el:'#activity',
    data:{
        c:{},
        token:"",
        hours:0,
        day:0,
        tab:0,
        sDay:14,
        initTab:0,
        proList1:[
            {id:0,title:"一月期",l1:"8.5",l2:"4",isA:0},
            {id:0,title:"二月期",l1:"9.5",l2:"4",isA:0},
            {id:0,title:"三月期",l1:"10.5",l2:"4",isA:0},
            {id:0,title:"六月期",l1:"11.5",l2:"2.68",isA:0}],
        proList3:[
            {id:0,title:"一月期",l1:"8.5",l2:"2.68",isA:0},
            {id:0,title:"二月期",l1:"9.5",l2:"2.68",isA:0},
            {id:0,title:"三月期",l1:"10.5",l2:"2.68",isA:0},
            {id:0,title:"六月期",l1:"11.5",l2:"2.68",isA:0}
        ]

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
            _this.getTime();
        },
        getTime:function(){
            var _this = this;
            try{
                $.ajax({
                    url: _this.c.Root+"PublicApi/getNowTime",
                    type: "get",
                    dataType:'json',
                    success:function(res){
                        if(res.code == 200){
                            _this.getTab(res.data);
                        }else{
                            _this.getTab(0);
                        }

                    },
                    error:function(er){
                        _this.getTab(0);
                    }
                });
            }catch (e){
                _this.setTab(0);
            }
        },
        getTab:function(time){

            var _this = this;
            var newDate = new Date();
            var eDate = new Date("2018-02-"+(_this.sDay+1));

            if(time != 0){
                time = time*1000;
                newDate.setTime(time);
            }
            _this.hours = newDate.getHours();
            _this.day = newDate.getDate();
            if(eDate.getTime()>time){
                //获取活动标
                _this.getProList();
                //获取精选标列表
                _this.getProList2();
            }
           if(_this.sDay >= _this.day){
               if(_this.hours<15 && _this.day == _this.sDay){
                   _this.initTab = "1";
               }else if(_this.hours>=15 && _this.day == _this.sDay){
                   _this.initTab = "2";
               }else{
                   _this.initTab = "3";
               }

           }else{
               _this.initTab = "1";
               _this.tab = _this.initTab;
           }

        },
        getProList:function(){
            var _this = this;
            try{
                $.ajax({
                    url: _this.c.Root+"ProjectInfo/ProjectInfo?projectType=global_top&new_preferential=2",
                    type: "get",
                    dataType:'json',
                    success:function(res){
                        if(res.code == 200){
                            if(res.data && res.data.length>0){
                                _this.tab = _this.initTab;
                                for(var i = 0 ; i<res.data.length;i++){

                                    switch (res.data[i].project_duration ) {
                                        case "1":
                                            _this.proList1[0].id=res.data[i].id;
                                            _this.proList1[0].isA=1;
                                            break;
                                        case "2":
                                            _this.proList1[1].id=res.data[i].id;
                                            _this.proList1[1].isA=1;
                                            break;
                                        case "3":
                                            _this.proList1[2].id=res.data[i].id;
                                            _this.proList1[2].isA=1;
                                            break;
                                        case "6":
                                            _this.proList1[3].id=res.data[i].id;
                                            _this.proList1[3].isA=1;
                                            break;
                                    }
                                }
                            }else{
                                setTab(_this.initTab);
                            }

                        }else{
                            setTab(_this.initTab);
                        }

                    },
                    error:function(er){
                        setTab(_this.initTab);
                    }
                });

            }catch (e){
                setTab(_this.initTab);
            }
            function setTab(initTab){
                switch (initTab) {
                    case "1":
                        if(_this.hours >=10){
                            initTab = "2"
                        }
                        break;
                    case "2":
                        if(_this.hours >=15){
                            initTab = "3"
                        }
                        break;
                }
                _this.tab = initTab;
            }
        },
        getProList2:function(){
            var _this = this;
            try{
                $.ajax({
                    url: _this.c.Root+"ProjectInfo/ProjectInfo?projectType=local_top",
                    type: "get",
                    dataType:'json',
                    success:function(res){
                        if(res.code == 200){

                            if(res.data && res.data.length>0){
                                for(var i = 0 ; i<res.data.length;i++){
                                    switch (res.data[i].project_duration ) {
                                        case "1":
                                            _this.proList3[0].id=res.data[i].id;
                                            _this.proList3[0].isA=1;
                                            break;
                                        case "2":
                                            _this.proList3[1].id=res.data[i].id;
                                            _this.proList3[1].isA=1;
                                            break;
                                        case "3":
                                            _this.proList3[2].id=res.data[i].id;
                                            _this.proList3[2].isA=1;
                                            break;
                                        case "6":
                                            _this.proList3[3].id=res.data[i].id;
                                            _this.proList3[3].isA=1;
                                            break;
                                    }
                                }
                            }

                        }

                    },
                    error:function(er){

                    }
                });
            }catch (e){}
        },
        goPro:function(type,id){
            var _this = this;
            _czc.push(["_trackEvent", "180214岁末活动", "标的详情"]);
            if(type == "1"){
                _this.c.on("proItem",_this.proList1[id]);
            }else{
                _this.c.on("proItem",_this.proList3[id]);
            }



        },
        goList:function(){
            _czc.push(["_trackEvent", "180214岁末活动", "标的列表"]);
            this.c.on("proList");
        },
        goAct:function(url){
            var c = new Cloud();
            var version=c.getUrlParam("version");
            var token = c.getUrlParam("data");
            _czc.push(["_trackEvent", "180214岁末活动", "去"+url]);
            window.location.href = c.Root + "dist/page/"+url+"/index.html?data="+token+"&version="+version;
        }
    }
});

