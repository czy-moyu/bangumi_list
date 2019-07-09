export function slide(right2left, left2right) {

    var startX, startY;
    var endX, endY;

    document.addEventListener('touchstart', function(ev) {

        startX = ev.touches[0].pageX;

        startY = ev.touches[0].pageY;

    }, false);

    document.addEventListener('touchend', function(ev) {



        endX = ev.changedTouches[0].pageX;

        endY = ev.changedTouches[0].pageY;

        var X = endX - startX

        if (X > 100) {
            left2right()
        } else if (X < -100) {
            right2left()
        }


    }, false);

}
