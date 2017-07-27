var points = document.getElementsByClassName("point");

var animatePoints = function (){
    
    var revealPoint = function(index) {
        points[index].style.opacity=1;
        points[index].style.transform="ScaleX(1) translateY(0)";
        points[index].style.msTransform = "scaleX(1) translateY(0)";
        points[index].style.WebkitTransform = "scaleX(1) translateY(0)";
    };
    for(var i=0; i<points.length; i++){
        revealPoint(i);
    }
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

