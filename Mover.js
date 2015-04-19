$(function() {
    $('body').on('mousedown', 'div', function() {
        $(this).addClass('draggable').parents().on('mousemove', function(e) {
            $('.draggable').offset({
                top: e.pageY - $('.draggable').outerHeight() / 2,
                left: e.pageX - $('.draggable').outerWidth() / 2
            }).on('mouseup', function() {
                $(this).removeClass('draggable');
            });
        });
    }).on('mouseup', function() {
        $('.draggable').removeClass('draggable');
    });
});
