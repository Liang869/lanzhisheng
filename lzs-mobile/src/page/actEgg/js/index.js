
var app = new Vue({
    el:'#activity',
    data:{
        c:{},
        token:"",
        hours:0,
        day:0,
        tab:0,
        sDay:28,
        initTab:0,
        proList1:[
            {id:0,title:"一月期",l1:"8.5",l2:"5",isA:0},
            {id:0,title:"二月期",l1:"9.5",l2:"5",isA:0},
            {id:0,title:"三月期",l1:"10.5",l2:"5",isA:0}
            ],
        proList2:[
            {id:0,title:"一月期",l1:"8.5",l2:"4",isA:0},
            {id:0,title:"二月期",l1:"9.5",l2:"4",isA:0},
            {id:0,title:"三月期",l1:"10.5",l2:"4",isA:0}],
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
            if(time != 0){
                newDate.setTime(time * 1000);
            }
            _this.hours = newDate.getHours();
            _this.day = newDate.getDate();
            if(_this.hours<15){
                _this.initTab = "1";
            }else{
                _this.initTab = "2";
            }
           if(_this.day == _this.sDay){
               _this.getProList();
               //获取精选标列表
               _this.getProList2();
           }else{
               _this.initTab = "1";
               _this.tab = _this.initTab;
           }

        },
        getProList:function(){
            var _this = this;
            try{
                $.ajax({
                    url: _this.c.Root+"ProjectInfo/ProjectInfo?new_preferential=2",
                    type: "get",
                    dataType:'json',
                    success:function(res){
                        if(res.code == 200){
                            var proList=[];
                            if(_this.initTab == "1"){
                                proList = _this.proList1;
                            }else{
                                proList = _this.proList2;
                            }
                            if(res.data && res.data.length>0){
                                _this.tab = _this.initTab;
                                for(var i = 0 ; i<res.data.length;i++){

                                    switch (res.data[i].project_duration ) {
                                        case "1":
                                            proList[0].id=res.data[i].id;
                                            proList[0].isA=1;
                                            break;
                                        case "2":
                                            proList[1].id=res.data[i].id;
                                            proList[1].isA=1;
                                            break;
                                        case "3":
                                            proList[2].id=res.data[i].id;
                                            proList[2].isA=1;
                                            break;
                                    }
                                }
                                if(_this.initTab == "1"){
                                    _this.proList1 = proList;
                                }else{
                                    _this.proList2 = proList;
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
        goItem:function(item){
            var _this = this;
            _czc.push(["_trackEvent", "180129彩蛋活动", "去购买+"+item.l1+"+"+item.l2]);
            _this.c.on("proItem",item);

        }
    }
});

