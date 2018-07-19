
        $('.safe-nav li').click(function() {
            $(this).addClass('change-color').siblings().removeClass('change-color');
            var ins = $(this).index();
            $('.safe-box__text').eq(ins).show().siblings().hide();
        })