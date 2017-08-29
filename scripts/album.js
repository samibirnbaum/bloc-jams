/*global $*/
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
        var $songNumber = $(this).attr("data-song-number");
        
        // 3 SCENARIOS//
        //if song is not playing
        if(currentPlayingSong === null){
            //change play to pause
            $songNumberCell.html(pauseButtonTemplate);
            currentPlayingSong = $songNumber;
        }    
        
        //if song is playing
        else if($songNumber === currentPlayingSong){
            //change pause to play
            $songNumberCell.html(playButtonTemplate); //turning song off       //when song turned off (this second play), click/hover off not being heard 
            currentPlayingSong = null;
        }    
        
        //if another song is playing
        else if ($songNumber !== currentPlayingSong){
            //change that song back to its number
            $('[data-song-number="'+currentPlayingSong+'"]').html(currentPlayingSong);
            //and change mine to pause
            $songNumberCell.html(pauseButtonTemplate);                                  
            currentPlayingSong = $songNumber;
        }
    };
    
    var onHover = function (event) {
        //when you hover on this row and its not playing, play sign appears
        var $songNumberCell = $(this).find(".song-item-number");
        var $songNumber = $songNumberCell.attr("data-song-number");
         
        if($songNumber !== currentPlayingSong){
            $songNumberCell.html(playButtonTemplate);
        }
    };
    
    var offHover = function (event) {
        //when i leave the row and its not playing, go back to number
        var $songNumberCell = $(this).find(".song-item-number");
        var $songNumber = $songNumberCell.attr("data-song-number");
        
        if($songNumber !== currentPlayingSong){  
            $songNumberCell.html($songNumber);
        }    
    };
    
    //add event listeners
    $row.find(".song-item-number").click(clickHandler);
    $row.hover(onHover, offHover);
    
    return $row;
};


// The whole album and songrows
var setCurrentAlbum = function (album) {
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


//variables used in album creation functions
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var currentPlayingSong = null;


//****CALLING THE FUNCTION EXPRESSIONS WHICH CREATE OUT WHOLE ALBUM ON THE PAGE*****//
$(document).ready(function() {
    setCurrentAlbum(albumPicasso);
});

