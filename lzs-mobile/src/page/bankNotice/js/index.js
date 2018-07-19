$(function() {
    var swiper2 = new Swiper('.card3 .swiper-container', {
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 30,
        initialSlide: 1,
        loop : true,
        pagination: '.swiper-pagination'
    });
    $(".small").click(function(){
        var url = $(this).attr("src");
        layer.open({
            type: 1,
            shadeClose:true,
            shade:0.3,
            anim: 1,
            content: '<div class="big"><img src="'+url+'"></div>'
        });
    })
    $(".bar-floor").click(function(){
        _czc.push(["_trackEvent", "180109银行存管披露", "立即投资"]);
        var c = new Cloud();
        c.on("proList");
    });
});

