
var app = new Vue({
  el: '#mobile',
  data:{
    isProd: false,
    prodList: [],
    infoPart:[],
    isShow:true,
    newsList: [],
    newsPart: [],
    newShow: false,
    commonList: '',
    userName:'',
    info:{
      appname: '江浙沪库存服装回收出售',mobile:'15906622409'
    },
    limit: 10,
    offset: 0,
    nums: 0,
    isLoading: false,
    loadText: '<p>加载更多</p>',
    loadLast: false,
  },
  created: function (){
    var _this = this; 
  },
  methods:{
    // 初始化
    getIndex:function(){
      var _this = this;
      $.ajax({
        url: "http://39.106.211.177:8089/web/config",
        type: "get",
        dataType:'json',
        success:function(res){
          var lists = res.rows; 
          for(var i = 0; i < lists.length; i++){
            switch(lists[i].id){
              case 123: 
                _this.info.userName = lists[i].description + ':' + lists[i].value;
                break;
              case 124:
                _this.info.address = lists[i].description + ':' + lists[i].value;
                break;
              case 125:
                _this.info.phone = lists[i].description + ':' + lists[i].value;
                _this.info.mobile = lists[i].value;
                break;
              case 126:
                _this.info.email = lists[i].description + ':' + lists[i].value;
                break;
              case 127:
                _this.info.icp = lists[i].value;
                break;
              case 128:
                _this.info.appname = lists[i].value;
                break;
              case 129:
                _this.info.eng = lists[i].value;
                break;
            }
          }
              
          sessionStorage.setItem('index',JSON.stringify(res));
          var res = sessionStorage.getItem('index');
          res = JSON.parse(res)
        }
      });
    },
    // 产品中心
    prodInit:function(){
      var _this = this;
      $.ajax({
        url: "http://39.106.211.177:8089/web/products",
        type: "get",
        dataType:'json',
        success:function(res){
          _this.prodList = res.rows;
          _this.isProd = true;
        }
      });
    },
    // 产品详情
    listInfo:function(item){
      var _this = this;
      _this.infoPart = item;
      $('.tab1-list__hide').fadeIn(500);
      $('.tab1-list__show').fadeOut(500);
      $('html').animate({"scrollTop":301},50);
      $("body").animate({"scrollTop":301},50);
    },
    infoBack:function(){
      $('.tab1-list__hide').fadeOut(500);
      $('.tab1-list__show').fadeIn(500);
    },
    // 新闻中心
    getNews:function(){
      var _this = this;
      if(_this.isLoading){
        return;
      }
      _this.isLoading = true;
      $.ajax({
        url: "http://39.106.211.177:8089/web/news?limit="+_this.limit+"&offset="+_this.offset,
        type: "get",
        dataType:'json',
        success:function(res){
          // 是否显示加载更多
          _this.loadLast = false;
          _this.newsList = _this.newsList.concat(res.rows);
          // 数据未渲染时显示加载loading
          _this.newShow = true;
          _this.nums = res.total; // 总条数
          var len = _this.newsList.length; // 当前数组长度
          _this.offset = len;
          if(_this.nums-len >= 10){
            _this.limit = 10;
          }else{
            _this.limit = _this.nums-len;
          }
          if(_this.nums == len){
            _this.loadText = '到底了';
          }
          _this.isLoading = false;
        }
      });
    },
    // 新闻详情
    newsInfo:function(lis){
      var _this = this;
      _this.newsPart = lis;
      $('.mobile-news__hide').fadeIn(500);
      $('.mobile-news__box').fadeOut(500);
    },
    newBack:function(){
      $('.mobile-news__hide').fadeOut(500);
      $('.mobile-news__box').fadeIn(500);
    }
  },
  mounted (){
    var _this = this; 
    _this.getIndex();
    _this.prodInit();
    _this.getNews();
    // 监听滚动加载更多
    window.addEventListener('scroll', function(){
      var scr = document.documentElement.scrollTop || document.body.scrollTop;
      var clientHeight = document.documentElement.clientHeight;
      var scrHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      if(scr + clientHeight + 20 >= scrHeight){
        _this.loadLast = true;
        _this.getNews();
      }
    });
  }
});
$('.mobile-tab__list li').click(function(){
  var ins = $(this).index();
  $(this).addClass('mobile-this').siblings().removeClass('mobile-this');
  $('.mobile-tab1__box').eq(ins).fadeIn(50).siblings('.mobile-tab1__box').fadeOut(50);
  $('html').animate({"scrollTop":301},100);
  $("body").animate({"scrollTop":301},100);
});
$(window).scroll(function(){
	//document.body.scrollTop兼容谷歌
var scr = document.documentElement.scrollTop || document.body.scrollTop;
  // 固定tab
	if (scr > 300){
    $('.mobile-tab__list').addClass('mobile-pos');
    $('.mobile-tab').css({'padding-top':'100px'});
	}else{
		$('.mobile-tab__list').removeClass('mobile-pos');
    $('.mobile-tab').css({'padding-top':'0'});
  };
  // 返回顶部
  if(scr > 600){
    $('.back-top').show();
  }else{
    $('.back-top').hide();
  };
});
// 点击回到顶部
$('.back-top').click(function(){
  $('html').animate({"scrollTop":0},500);
  $("body").animate({"scrollTop":0},500);
  $(this).fadeOut(500);
});
window.onload = function(){
var mySwiper = new Swiper('.swiper-container',{
    autoplay: 6000,
    pagination : '.pagination',
    loop: true,
    autoplayDisableOnInteraction: false
  });  
}
