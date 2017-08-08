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




// PLAY AND PAUSE BUTTON FEATURE
// *****************************

// *SELECTORS + UTILITIES*
// selectors for pause button feature

//making sure you find the parent in that branch
var findParentByClassName = function (element, targetClass) {
    if (element){
        var currentParentElement = element.parentElement;
        
        //if my element doesnt have a parent - tell me and stop here
        if(currentParentElement === null){
            return console.log("No parent found");
        
        //if it does have a parent    
        }else{
            //search for matching class name
            while(currentParentElement.className !== targetClass) {
                currentParentElement = currentParentElement.parentElement;
                //if dont find matching target class    
                if (currentParentElement === null){
                return console.log("No parent found with that class name");
                }
            }
        }
        return currentParentElement;
    }
};

//getting the song item in that branch whose HTML you will change
var getSongItem = function (element) {
    switch(element.className){
        case"album-song-button":
        case"ion-play":
        case"ion-pause":
            return findParentByClassName(element, "song-item-number");
        case"album-view-song-item":
            return element.querySelector(".song-item-number");
        case"song-item-title":
        case"song-item-duration":
            return findParentByClassName(element, "album-view-song-item").querySelector(".song-item-number");
        case"song-item-number":
            return element;
        default:
            return;
    }
};

// function for the pause feature - takes in clicked element
var clickHandler = function (targetElement) {
    
    //wherever i click get me the song-number html i need to change
    var songItem = getSongItem(targetElement);
    
    // 3 possible scenarios
    if(currentPlayingSong === null) {
        songItem.innerHTML = pauseButtonTemplate;
        currentPlayingSong = songItem.getAttribute("data-song-number");
    }
    else if (songItem.getAttribute("data-song-number") === currentPlayingSong) {
        songItem.innerHTML = playButtonTemplate;
        currentPlayingSong = null; //because you have paused the song, so nothing is playing
    }
    else if(songItem.getAttribute("data-song-number") !== currentPlayingSong) {
        //get access to current playing songs element - change back to its number
        var currentPlayingSongElement = document.querySelector('[data-song-number="'+currentPlayingSong+'"]');
        currentPlayingSongElement.innerHTML = currentPlayingSongElement.getAttribute("data-song-number");
        //change clicked on song to pause button
        songItem.innerHTML = pauseButtonTemplate;
        currentPlayingSong = songItem.getAttribute("data-song-number");
    }
};


// selectors for play button feature
var songListContainer = document.getElementsByClassName("album-view-song-list")[0];
var songRows = document.getElementsByClassName("album-view-song-item"); //returns nodelist

// html inserts to display buttons
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

var currentPlayingSong = null;




// *ACTIONS*
window.onload = function() {
    // on load set the album
    setCurrentAlbum(albumPicasso);
    
    //enable play/pause button feature
    songListContainer.addEventListener("mouseover", function(event) {
        var songItem = getSongItem(event.target);
        // if song not already playing
        if (event.target.parentElement.className === "album-view-song-item" && songItem.innerHTML !== pauseButtonTemplate) {
            // change that rows 1st cell to play button
            songItem.innerHTML = playButtonTemplate;
        }
    });
    
    // remove play/pause button feature
    for (var i=0; i<songRows.length; i++){
        songRows[i].addEventListener("mouseleave", function (event) {
            var songItem = getSongItem(event.target);
            var songItemNumber = songItem.getAttribute('data-song-number');
            //as long as the song is not currently playing
            if(songItem.innerHTML !== pauseButtonTemplate){
                // change back to its number
                songItem.innerHTML = songItemNumber;
            }
        });
        
        
        // deal with clicks for pause feature
        songRows[i].addEventListener("click", function (event) {
            clickHandler(event.target);
        });
    }
};

