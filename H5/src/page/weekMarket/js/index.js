// 活动规则弹层
$('.active-pop').bind("touchmove", function(e) {
    e.preventDefault();
});
$('.active-btn').click(function() {
    $('.active-pop').show().animate({
        width: 100 + '%',
    }, 200);
});
$('.pop-close').click(function() {
    $('.active-pop').animate({
        width: 0,
    }, 200, function() {
        $(this).hide();
    });
});

function show() {
    var font = document.documentElement.clientWidth;
    console.log(font)
    if (font >= 480) {
        return document.documentElement.style.fontSize = 480 / 37.5 + 'px'
    } else {
        document.documentElement.style.fontSize = font / 37.5 + 'px'
    }
}
window.onload = function() {
    show();
}
window.onresize = function() {
    show()
}