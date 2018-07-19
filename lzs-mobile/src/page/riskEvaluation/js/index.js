var app = new Vue({
    el:'#activity',
    data:{
        token:0,
        isLogin:false,
        topics:[],
        cursor:0,
        type:0,
        resData:{},
        levelText:{},
        status:2,
        c:{}
    },
    created: function () {
        $("#activity").show();
        this.c=new Cloud();
        this.token=this.c.getUrlParam('data');
        this.init();
    },
    methods: {
        //页面初始化
        init:function(){
            var _this = this;
            layer.open({
                type: 2
                ,content: '加载中'
            });
            $.ajax({
                url: _this.c.Root+"Evaluate/EvaluateStatus?token="+_this.token,
                type: "get",
                dataType:'json',
                success:function(res){
                    layer.closeAll();
                    if(res.code == 200){
                        _this.type = res.data.status;
                        _this.status = res.data.status;
                        _this.resData = res.data;

                    }else{
                        _this.type = 2;
                    }

                }
            });
            _this.getLogin();
            _this.initTopics();
        },
        getLogin:function(){
            var _this = this;
            $.ajax({
                url: _this.c.Root+"PublicApi/loginByToken?token="+_this.token,
                type: "get",
                dataType:'json',
                success:function(res){
                    if(res.code == 200){
                        _this.isLogin = true;
                    }

                }
            });
        },
        //重置题目
        initTopics:function(){
            var _this = this;
            _this.topics = [
                {ask:"您的年龄介于？",active:'',answer:[
                    {key:'a',value:'18-30岁'},
                    {key:'b',value:'31-45岁'},
                    {key:'c',value:'46-60岁'},
                    {key:'d',value:'高于60岁'}]},
                {ask:"您的年收入为？",active:'',answer:[
                    {key:'a',value:'10万元以内'},
                    {key:'b',value:'10万元至20万元'},
                    {key:'c',value:'20万元至50万元'},
                    {key:'d',value:'50万元以上'}]},
                {ask:"在您每年可支配收入中，用于金融投资（储蓄存款除外）的比例为？",active:'',answer:[
                    {key:'a',value:'不超过2万元'},
                    {key:'b',value:'2万元-10万元'},
                    {key:'c',value:'10万元-50万元'},
                    {key:'d',value:'50万元以上'}]},
                {ask:"您的最高学历为？",active:'',answer:[
                    {key:'a',value:'高中及以下'},
                    {key:'b',value:'中专或大专'},
                    {key:'c',value:'本科'},
                    {key:'d',value:'硕士及以上'}]},
                {ask:"您的投资知识是？",active:'',answer:[
                    {key:'a',value:'有限：基本没有金融产品方面的知识'},
                    {key:'b',value:'一般：对金融产品及其相关风险具有基本的知识和理解'},
                    {key:'c',value:'丰富：对金融产品及其相关风险具有丰富的知识和理解'},
                    {key:'d',value:'专家：金融领域专家，投资经验丰富'}]},
                {ask:"您的投资经验可描述为？",active:'',answer:[
                    {key:'a',value:'除银行储蓄外，基本没有其他投资经验'},
                    {key:'b',value:'购买过银行理财，但基金、股票等产品没有购买过'},
                    {key:'c',value:'基金、股票都买过，但不是特别了解'},
                    {key:'d',value:'投资经验丰富，外汇、期货也有过交易'}]},
                {ask:"您有多少年投资银行理财、P2P、基金、股票、信托等金融产品的经验？",active:'',answer:[
                    {key:'a',value:'少于2年'},
                    {key:'b',value:'2至5年'},
                    {key:'c',value:'5至10年'},
                    {key:'d',value:'10年以上'}]},
                {ask:"您倾向的投资期限是多久？",active:'',active:'',answer:[
                    {key:'a',value:'1个月以内的天标'},
                    {key:'b',value:'1-3个月'},
                    {key:'c',value:'4-12个月'},
                    {key:'d',value:'12个月以上'}]},
                {ask:"以下哪项描述最符合您的投资态度：",active:'',answer:[
                    {key:'a',value:'厌恶风险，不愿意承担任何投资风险'},
                    {key:'b',value:'保守投资，尽可能保证本金安全，不在乎收益率较低'},
                    {key:'c',value:'寻求资金的较高收益和成长性，愿承担一定的投资风险'},
                    {key:'d',value:'实现资产大幅增长，愿承担较大的投资风险'}]},
                {ask:"假设有两种投资：投资A预期获得10%的收益，可能承担的损失非常小；投资B预期获得30%的收益，但可能承担较大亏损。您会怎么支配您的资金？",active:'',answer:[
                    {key:'a',value:'全部投资于收益较小且风险较小的A'},
                    {key:'b',value:'同时投资于A和B，但大部分资金投资于收益较小且风险较小的A'},
                    {key:'c',value:'同时投资于A和B，但大部分资金投资于收益较大且风险较大的B'},
                    {key:'d',value:'全部投资于收益较大且风险较大的B'}]}

            ];
            _this.levelText = {
                A:"您对风险比较敏感，投资时谨慎小心，更注重资产的安全性，确保本金绝对安全。",
                B:"您对风险有一定认识，愿意承受轻度的投资风险，可以接受收益小幅波动，投资时选择安全稳健的产品",
                C:"您是稳健的投资人，风险承受度适中，偏向于资产均衡配置，也追求一定的资产收益。",
                D:"您偏向于积极的资产配置，对风险有较高的承受能力，投资收益预期相对较高。",
                E:"您的风险承受能力较高。投资时您大胆进取，勇于尝试，资产配置以高风险投资品种为主，追求收益最大化，是资深的投资者。",
            };
        },
        //保存当前题目答案并跳到下一题
        setTopics:function(item){
            var index = this.cursor;
            var _this = this;
            this.topics[index]['active'] = item.key;
            if(this.cursor!=9){
                this.cursor ++;
            }


        },
        //提交测评结果
        submit:function(){
            var _this = this;
            _czc.push(["_trackEvent", "180116风险测评", "提交"]);
            if(_this.isLogin == false){
                this.c.goTo("login");
                return false;
            }
            var answer="";

            for(var i=0;i<_this.topics.length;i++){
                answer += _this.topics[i].active;
            }
            if(answer.length<10){
                layer.open({
                    content: '请完成问题'
                    ,skin: 'msg'
                    ,time: 2 //2秒后自动关闭
                });
                return false;
            }
            layer.open({
                type: 2
                ,content: '提交中'
            });
            $.ajax({
                url: _this.c.Root+"Evaluate/getScore?token="+_this.token,
                type: "post",
                data:{answer:JSON.stringify(_this.topics)},
                dataType:'json',
                success:function(res){
                   layer.closeAll();
                    if(res.code == 200){
                        _this.type = 1;
                        _this.resData = res.data;
                        _this.cursor = 0;
                    }else{
                        layer.open({
                            content: res.msg
                            ,skin: 'msg'
                            ,time: 2 //2秒后自动关闭
                        });
                    }

                }
            });
        },
        //返回上一题
        back:function(){
            this.cursor--;
        },
        //返回上一页
        goBack:function(){
            _czc.push(["_trackEvent", "180116风险测评", "完成"]);
            dinglc.goBack();
        },
        //重新测评
        restart:function(){
            _czc.push(["_trackEvent", "180116风险测评", "重新测评"]);
            this.cursor = 0;
            this.initTopics();
            this.type = 2;
            this.status = 1;

        }

    }
});

