
var createSongRow = function(songNumber, songName, songLength) {
     var template =
        '<tr class="album-view-song-item">'
      + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + songLength + '</td>'
      + '</tr>'
      ;
 
    var $row = $(template);
    
 var clickHandler = function() {
    var songNumber = $(this).attr('data-song-number');
    if (currentlyPlayingSongNumber === null) {
        $(this).html(pauseButtonTemplate);              //works
        currentlyPlayingSongNumber = songNumber;
        
    } else if (songNumber === currentlyPlayingSongNumber) {
        $(this).html(playButtonTemplate); 
        currentlyPlayingSongNumber = null;
        currentSongFromAlbum = null;        //currentlyPlayingCell.html(playButtonTemplate);              //playButtonTemplate
    } else if (songNumber !== currentlyPlayingSongNumber) {
        $(this).html(pauseButtonTemplate);
        var currentlyPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
        currentlyPlayingCell.html(currentlyPlayingSongNumber);
        currentlyPlayingSongNumber = songNumber;
        currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
    }
 };
    var onHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = songNumberCell.attr('data-song-number');
        
        if(songNumber !== currentlyPlayingSongNumber) {
            songNumberCell.html(playButtonTemplate);
        
    }
    };
    
    var offHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = songNumberCell.attr('data-song-number');
        
        if(songNumber !== currentlyPlayingSongNumber) {
            songNumberCell.html(songNumber);
    }
    };
    
     $row.find('.song-item-number').click(clickHandler);
     $row.hover(onHover, offHover);
     return $row;
};





var setCurrentAlbum = function(album) {
     currentAlbum = album;
     var $albumTitle = $('.album-view-title');
     var $albumArtist = $('.album-view-artist');
     var $albumReleaseInfo = $('album-view-release-info');
     var $albumImage = $('.album-cover-art');
     var $albumSongList = $('.album-view-song-list');
 
     // #2
     $albumTitle.text(album.title);
     $albumArtist.text(album.artist);
     $albumReleaseInfo.text(album.year + ' ' + album.label);
     $albumImage.attr('src', album.albumArtUrl);
 
     // #3
     $albumSongList.empty();
 
     // #4
     for (var i = 0; i < album.songs.length; i++) {
         var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
         $albumSongList.append($newRow);

     }

 };   

var updatePlayerBarSong = function() {

    $('.song-name').text("Hey");
    $('.artist-name').text(currentAlbum.artist);
    $('.artist-song-mobile').text("Hey" + " - " + currentAlbum.artist);


};

  
  





//Album button templates
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';


// state of playing songs
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;
var currentAlbum = null;



$(document).ready(function() {
     setCurrentAlbum(albumPicasso);
     updatePlayerBarSong();
     
});
     
     
     


