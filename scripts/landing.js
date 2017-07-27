var pointsArray = document.getElementsByClassName("point");

// this sits as a global revealpoint function ready to change the style
// of an element (a cell in a NodeList)
var revealPoint = function(point) {
    point.style.opacity=1;
    point.style.transform="ScaleX(1) translateY(0)";
    point.style.msTransform = "scaleX(1) translateY(0)";
    point.style.WebkitTransform = "scaleX(1) translateY(0)";
};

// this isolates each cell in a NodeList applying a specified function to each    
var animatePoints = function (points){
    forEach(points, revealPoint);
};

window.onload = function () {
    // if window is big enough to display top of selling points container = NO SCROLL EVENT REQUIRED    
    if (window.innerHeight > 950) {
        animatePoints(pointsArray);
     }
    //  if window doesn't display top of selling points container = YES SCROLL EVENT REQUIRED
    var sellingPoints = document.getElementsByClassName("selling-points")[0];
    var scrollDistance = sellingPoints.getBoundingClientRect().top - window.innerHeight + 200;
    window.addEventListener("scroll",function(event){
         if(document.documentElement.scrollTop || document.body.scrollTop >= scrollDistance){
             animatePoints(pointsArray);
         }
    });
};

