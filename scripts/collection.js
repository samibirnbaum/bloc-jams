/*global $*/

// function to return template as a jQuery object
var buildCollectionItemTemplate = function () {
    var template = 
        '<div  class="collection-album-container column fourth">'
        + '  <img src="assets/images/album_covers/01.png"></img>'
        + '  <div class="collection-album-info caption">'
        + '      <p>'
        + '          <a class="album-name" href="album.html">The Colors</a>'
        + '          <br/>'
        + '          <a href="album.html">Pablo Picasso</a>'
        + '          <br/>'
        + '          X songs'
        + '          <br/>'
        + '      </p>' 
        + '  </div>'
        + '</div>'
    ;
    
     return $(template);
};


$(window).load(function() {
    // getting hold of <section> </section>
    var $collectionContainer = $(".album-covers");
    // make sure its empty in there
    $collectionContainer.empty();
    // add the template as the inner html (add 12 of them)
    for(var i=0; i<12; i++){
        var $newThumbnail = buildCollectionItemTemplate();
        $collectionContainer.append($newThumbnail);
    }
});