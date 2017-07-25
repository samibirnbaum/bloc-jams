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
        // if window is big enough to display all content animate immediatley    
         if (window.innerHeight > 950) {
         animatePoints();
     }
    //  if window doesn't display all content immediatley, wait for my scroll
    var sellingPoints = document.getElementsByClassName("selling-points")[0];
    // this sets the scroll distance for the animation to trigger
    var scrollDistance = sellingPoints.getBoundingClientRect().top - window.innerHeight + 200;
    window.addEventListener("scroll",function(event){
         if(document.documentElement.scrollTop || document.body.scrollTop >= scrollDistance){
             animatePoints();
         }
    });
};

