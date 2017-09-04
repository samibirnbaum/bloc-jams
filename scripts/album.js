/*global $*/




//*****FUNCTIONS TO CREATE WHOLE ALBUM ON THE PAGE********//

// The songrows and their event listeners
var createSongRow = function (songNumber, songName, songLength) {
    //row creation
    var template = 
         '<tr class="album-view-song-item">'
        +    '<td class="song-item-number" data-song-number="'+songNumber+'">'+songNumber+'</td>'
        +    '<td class="song-item-title">'+songName+'</td>'
        +    '<td class="song-item-duration">'+songLength+'</td'
        +'</tr>'
        ;
    var $row = $(template);
    
    //create event handlers
    var clickHandler = function (event) {
        var $songNumberCell = $(this);
        var songNumber = parseInt($(this).attr("data-song-number"));  // this actually returns a string - so use parseInt
        
        // 3 SCENARIOS//
        //if song is not playing
        if(currentPlayingSongNumber === null){
            //change play to pause
            $songNumberCell.html(pauseButtonTemplate);
            setSong(songNumber);
            updatePlayerBarSong();
        }    
        
        //if song is playing
        else if(songNumber === currentPlayingSongNumber){
            //change pause to play
            $songNumberCell.html(playButtonTemplate); //turning song off       //when song turned off (this second play), click/hover off not being heard 
            currentPlayingSongNumber = null;
            currentSongFromAlbum = null;
            $(".main-controls .play-pause").html(playerBarPlayButton);
        }    
        
        //if another song is playing
        else if (songNumber !== currentPlayingSongNumber){
            //change that song back to its number
            getSongNumberCell(currentPlayingSongNumber).html(currentPlayingSongNumber);
            //and change mine to pause
            $songNumberCell.html(pauseButtonTemplate);                                  
            setSong(songNumber);
            updatePlayerBarSong();
        }
    };
    
    var onHover = function (event) {
        //when you hover on this row and its not playing, play sign appears
        var $songNumberCell = $(this).find(".song-item-number");
        var songNumber = parseInt($songNumberCell.attr("data-song-number"));
         
        if(songNumber !== currentPlayingSongNumber){
            $songNumberCell.html(playButtonTemplate);
        }
    };
    
    var offHover = function (event) {
        //when i leave the row and its not playing, go back to number
        var $songNumberCell = $(this).find(".song-item-number");
        var songNumber = parseInt($songNumberCell.attr("data-song-number"));
        
        if(songNumber !== currentPlayingSongNumber){  
            $songNumberCell.html(songNumber);
        }
    };
    
    //add event listeners
    $row.find(".song-item-number").click(clickHandler);
    $row.hover(onHover, offHover);
    
    return $row;
};


// The whole album and songrows
var setCurrentAlbum = function (album) {
    currentAlbum = album;
    // select all the html elements we will want to change
    var $albumTitle = $(".album-view-title");
    var $albumArtist = $(".album-view-artist");
    var $albumReleaseInfo = $(".album-view-release-info");
    var $albumImage = $(".album-cover-art"); 
    var $albumSongList = $(".album-view-song-list");
    
    // make the changes to those html elements
    $albumTitle.text(album.title);
    $albumArtist.text(album.artist);
    $albumReleaseInfo.text(album.year + ' ' + album.label);
    $albumImage.attr('src', album.albumArtUrl);
    
    // make sure the table which holds the songs and their info is empty
    $albumSongList.empty();
    
    // create the song row html and insert its info
    for (var i=0; i<album.songs.length; i++) {
        var $newRow = createSongRow(i+1, album.songs[i].title, album.songs[i].duration);
        $albumSongList.append($newRow);
    }
};





// ******************************************************************************
// ******************************************************************************




//*********PLAYER BAR FUNCTIONS********//


var updatePlayerBarSong = function() {
        $(".currently-playing .song-name").html(currentSongFromAlbum.title);
        $(".currently-playing .artist-name").html(currentAlbum.artist);
        $(".currently-playing .artist-song-mobile").html(currentSongFromAlbum.title + " - " + currentAlbum.artist);
        $(".main-controls .play-pause").html(playerBarPauseButton);
};

var skipSong = function() {
    var previousSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    var previousSongNumber = currentPlayingSongNumber;
    
    if (event.target.className === "ion-skip-backward"){
        var currentSongIndex = previousSongIndex-1; //song index playing now
        //reset song index back to top of array
        if (currentSongIndex === -1){
            currentSongIndex = currentAlbum.songs.length -1;
        }
    }else{
        var currentSongIndex = previousSongIndex+1; //song index playing now
        //reset song index back to bottom of array
        if (currentSongIndex === currentAlbum.songs.length){
            currentSongIndex = 0;
        }
    }
    
    currentSongFromAlbum = currentAlbum.songs[currentSongIndex];
    currentPlayingSongNumber = currentSongIndex+1;

    updatePlayerBarSong();
    getSongNumberCell(previousSongNumber).html(previousSongNumber);
    getSongNumberCell(currentPlayingSongNumber).html(pauseButtonTemplate);
    
};






// ********************************************************
// ********************************************************

//More Generic Functions
var setSong = function (songNumber) {
  currentPlayingSongNumber = parseInt(songNumber);
  currentSongFromAlbum = currentAlbum.songs[songNumber-1];
};

var getSongNumberCell = function (number) {
    return $('.song-item-number[data-song-number="'+number+'"]')
};

var trackIndex = function(album, song) {
    return album.songs.indexOf(song);   
};



//Global Templates
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';
var $nextButton = $(".main-controls .next");
var $previousButton =$(".main-controls .previous");

//Global Variables
var currentAlbum = null; //holds album object
var currentPlayingSongNumber = null; //holds song number from html5 data attr
var currentSongFromAlbum = null; //holds song object from songs array in album object



//****CALLING THE FUNCTION EXPRESSIONS WHICH CREATE OUR WHOLE ALBUM ON THE PAGE*****//
$(document).ready(function() {
    setCurrentAlbum(albumPicasso);
    $nextButton.click(skipSong);
    $previousButton.click(skipSong);
});


