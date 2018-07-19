$(function() {
    $("img.lazy").lazyload({
        skip_invisible : false,
        threshold: 1300,
        effect: "fadeIn"
    });
    var height = $(document.body).height();
    var width = $(window).width();
    $(".front-cover").width(750);
    $(".front-cover").height(height/width*750);
    // $(".small").click(function(){
    //     var url = $(this).attr("src");
    //     layer.open({
    //         type: 1,
    //         shadeClose:true,
    //         shade:0.3,
    //         anim: 1,
    //         content: '<div class="big"><img src="'+url+'"></div>'
    //     });
    // })
    var swiper = new Swiper('.swiper1 .swiper-container', {
        slidesPerView: 'auto',
        spaceBetween: 16,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });

    var swiper2 = new Swiper('.swiper2 .swiper-container', {
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 30,
        initialSlide: 1,
        loop : true,
        pagination: '.swiper-pagination',
    });
});

