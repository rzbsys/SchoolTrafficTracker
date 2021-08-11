

$('.box').bind({
    mouseenter: function (e) {
        $('.num').text($($($(this).children()[0]).children()[0]).text());
        $('.sc').text($(this).data('cnt'));

        $('.box').css('filter', 'opacity(0.6)');
        $('.box').css('transform', 'scale(0.9)');
        //$('.box').css('background-color', 'rgb(240, 240, 240)');
        //$(this).css('color', 'white');
        //$(this).css('background-color', '#8B00FF');
        //$($($(this).children()[0]).children()[0]).css('color', 'white');
        $(this).css('transform', 'scale(1.1)');
        $(this).css('filter', '');

    },
    mouseleave: function (e) {
        $('.box').css('transform', '');
        $('.box').css('filter', '');

        //$('.box').css('background-color', '');
        //$(this).css('color', '');
        //$(this).css('background-color', '');      
        //$($($(this).children()[0]).children()[0]).css('color', '');
    }
});

function resolution() {
    if (window.innerWidth < 1450) {
        $('#Warn').show();
    } else {
        $('#Warn').hide();
    }
    console.log(window.innerWidth);
}


$(window).resize(resolution);
resolution();
