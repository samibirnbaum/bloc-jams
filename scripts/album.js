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

var albumGreenDay = {
    title: 'Dookie',
    artist: 'Green Day',
    label: 'MonkeyFuss',
    year: '1994',
    albumArtUrl: 'https://upload.wikimedia.org/wikipedia/en/4/4b/Green_Day_-_Dookie_cover.jpg',
    songs: [
        { title: 'Burnout', duration: '2:07' },
        { title: 'Having a Blast', duration: '2:44' },
        { title: 'Chump', duration: '2:54'},
        { title: 'Longview', duration: '3:59' },
        { title: 'Welcome to Paradise', duration: '3:44'},
        { title: 'Pulling Teeth', duration: '2:31'},
        { title: 'Basket Case', duration: '3:01'},
        { title: 'Sassafras Roots', duration: '2:37'},
        { title: 'When I Come Around', duration: '2:58'}
    ]
};

// one purpose function to create the html for the song row and insert its info
var createSongRow = function (songNumber, songName, songLength) {
    var template = 
         '<tr class="album-view-song-item">'
        +    '<td class="song-item-number">'+songNumber+'</td>'
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

window.onload = function() {
    setCurrentAlbum(albumPicasso);
};

// album cover when clicked switches between 3 albums
//My Attempt
var albumPic = document.getElementsByClassName("album-cover-art")[0]
albumPic.addEventListener("click", function(event) {
    if (albumPic.getAttribute("src") == albumGreenDay.albumArtUrl || albumPic.getAttribute("src") == albumPicasso.albumArtUrl ) {
        setCurrentAlbum(albumMarconi);
    }
    else if (albumPic.getAttribute("src") == albumMarconi.albumArtUrl || albumPic.getAttribute("src") == albumGreenDay.albumArtUrl ) {
        setCurrentAlbum(albumPicasso);
    }
    // my code never reaches this statment
    else if (albumPic.getAttribute("src") == albumMarconi.albumArtUrl || albumPic.getAttribute("src") == albumPicasso.albumArtUrl ) {
        setCurrentAlbum(albumGreenDay);
    }
});

// Blocs Solution
// var albumsArray = [albumMarconi,albumGreenDay,albumPicasso];
// var index = 0;
// document.getElementsByClassName("album-cover-art")[0].addEventListener("click", function(event) {
//   setCurrentAlbum(albumsArray[index]);
//   index++; //this changes the var in the global scope where it is retained for the next click
//   if (index === albumsArray.length){
//       index=0;//also retained in the global scope for next click
//   }
// });