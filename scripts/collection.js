var collectionItemTemplate = 
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
    
window.onload = function() {
    // getting hold of <section> </section>
    var collectionContainer = document.getElementsByClassName("album-covers")[0];
    // make sure its empty in there
    collectionContainer.innerHTML = "";
    // add the template as the inner html (add 12 of them)
    for(var i=0; i<12; i++){
        collectionContainer.innerHTML = collectionContainer.innerHTML + collectionItemTemplate;
    }
    
};