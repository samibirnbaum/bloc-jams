/* global $ */

var animatePoints = function (){
    
    var revealPoint = function() {
        $(this).css({
            opacity: 1,
            transform: "scaleX(1) translateY(0)"
        });
    };
    
    $.each($(".point"), revealPoint);
};

$(window).load (function () {
    // if window is big enough to display top of selling points container = NO SCROLL EVENT REQUIRED    
    if ($(window).height > 950) {
        animatePoints();
    }
    
    //  if window doesn't display top of selling points container = YES SCROLL EVENT REQUIRED
    var scrollDistance = $(".selling-points").offset().top - $(window).height + 200;
    $(window).scroll(function(event){
         if($(window).scrollTop() >= scrollDistance){
             animatePoints();
         }
    });
});

