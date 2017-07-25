var points = document.getElementsByClassName("point");

var animatePoints = function (){
              
    var revealPoint = function() {
        for(var i=0; i<points.length; i++) {
            points[i].style.opacity=1;
            points[i].style.transform="ScaleX(1) translateY(0)";
            points[i].style.msTransform = "scaleX(1) translateY(0)";
            points[i].style.WebkitTransform = "scaleX(1) translateY(0)";
        }
    };
    revealPoint();
};

window.onload = function () {
    // if window is big enough to display top of selling points container = NO SCROLL EVENT REQUIRED    
    if (window.innerHeight > 950) {
        animatePoints();
     }
    //  if window doesn't display top of selling points container = YES SCROLL EVENT REQUIRED
    var sellingPoints = document.getElementsByClassName("selling-points")[0];
    var scrollDistance = sellingPoints.getBoundingClientRect().top - window.innerHeight + 200;
    window.addEventListener("scroll",function(event){
         if(document.documentElement.scrollTop || document.body.scrollTop >= scrollDistance){
             animatePoints();
         }
    });
};

