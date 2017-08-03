// ALBUM DETAILS REPRESENTED AS AN OBJECT
var albumPicasso = {
    title: 'The Colors',
    artist: 'Pablo Picasso',
    label: 'Cubism',
    year: '1881',
    albumArtUrl: 'assets/images/album_covers/01.png',
    // songs stored in an array where each one is its own object
    songs: [
        { title: 'Blue', duration: '4:26' },
        { title: 'Green', duration: '3:14' },
        { title: 'Red', duration: '5:01' },
        { title: 'Pink', duration: '3:21'},
        { title: 'Magenta', duration: '2:15'}
    ]
};

var albumMarconi = {
    title: 'The Telephone',
    artist: 'Guglielmo Marconi',
    label: 'EM',
    year: '1909',
    albumArtUrl: 'assets/images/album_covers/20.png',
    songs: [
        { title: 'Hello, Operator?', duration: '1:01' },
        { title: 'Ring, ring, ring', duration: '5:01' },
        { title: 'Fits in your pocket', duration: '3:21'},
        { title: 'Can you hear me now?', duration: '3:14' },
        { title: 'Wrong phone number', duration: '2:15'}
    ]
};

// one purpose function to create the html for the song row and insert its info
var createSongRow = function (songNumber, songName, songLength) {
    var template = 
         '<tr class="album-view-song-item">'
        +    '<td class="song-item-number" data-song-number="'+songNumber+'">'+songNumber+'</td>'
        +    '<td class="song-item-title">'+songName+'</td>'
        +    '<td class="song-item-duration">'+songLength+'</td'
        +'</tr>'
        ;
    
    return template;
};

// take in all the info from an album object and inject it into the html - including createing the song row html and injecting its info
var setCurrentAlbum = function (album) {
    // select all the html elements we will want to change
    var albumTitle = document.getElementsByClassName("album-view-title")[0];
    var albumArtist = document.getElementsByClassName("album-view-artist")[0];
    var albumReleaseInfo = document.getElementsByClassName("album-view-release-info")[0];
    var albumImage = document.getElementsByClassName("album-cover-art")[0]; 
    var albumSongList = document.getElementsByClassName("album-view-song-list")[0];
    
    // make the changes to those html elements
    albumTitle.firstChild.nodeValue = album.title;
    albumArtist.firstChild.nodeValue = album.artist;
    albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
    albumImage.setAttribute('src', album.albumArtUrl);
    
    // make sure the table which holds the songs and their info is empty
    albumSongList.innerHTML = "";
    
    // create the song row html and insert its info
    for (var i=0; i<album.songs.length; i++) {
    albumSongList.innerHTML = albumSongList.innerHTML + createSongRow(i+1, album.songs[i].title, album.songs[i].duration);
    }
};

// CREATE THE PLAY BUTTON ON THE SONG ROW WHEN HOVER AND REMOVE WHEN LEAVE
// access to parent element for event delegation
var songListContainer = document.getElementsByClassName("album-view-song-list")[0];
// access to the row element for mouseleave event
var songRows = document.getElementsByClassName("album-view-song-item"); //returns nodelist

// html to show play button in first table cell (as the plain play button that it is )
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';

window.onload = function() {
    // on load set the album
    setCurrentAlbum(albumPicasso);
    
    // on load enable play button feature
    songListContainer.addEventListener("mouseover", function(event) {
        // if the cell i'm targeting has a song row parent element
        if (event.target.parentElement.className === "album-view-song-item") {
            // change that rows 1st cell to play button
            event.target.parentElement.querySelector(".song-item-number").innerHTML = playButtonTemplate;
        }
    });
    
    // enable play button removal feature
    //add EL to every row in nodelist
    for (var i=0; i<songRows.length; i++){
        songRows[i].addEventListener("mouseleave", function (event) {
            //when mouseleaves the row change html abck to data-song-number string
            this.children[0].innerHTML = this.children[0].getAttribute('data-song-number');
        });
    }
};

