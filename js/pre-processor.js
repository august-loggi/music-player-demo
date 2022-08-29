$(function () {
  // VARIABLE DECLARATION
  var $playList = $('.playlist');
  var $thumb = $('.cd-thumb');
  var $audioPlayer = $('.audio-player');
  var $slider = $('#slider');
  var $playBtn = $('.btn-toggle-play');
  var $pauseBtn = $('.btn-toggle-pause');

  // 1. Load the songs into the playlistc
  var htmlCode = '';
  songs.forEach(function(song, index) {
    htmlCode += `<div class="song-item">
              <div class="song-item-thumb" style="background-image: url('${song.image}')"></div>
              <div class="song-content">
                <div class="song-item-des">
                  <h3 class="song-name">${song.name}</h3>
                  <p class="song-singer">${song.singer}</p>
                </div>
                <div class="song-item-details-icon">
                  <i class="fa-solid fa-ellipsis"></i>
                </div>
              </div>
            </div>`;
  })
  $playList.html(htmlCode);
  
  // 2. Choose the first song for default song
  var $defaultSong = $('.song-item:first');
  $defaultSong.addClass('active');
  var defaultThumb = songs[$('.song-item.active').index()].image;
  var defaultSongLink = songs[$('.song-item.active').index()].audio;
  $thumb.css('background-image', `url(${defaultThumb})`);
  $audioPlayer.attr('src', defaultSongLink);
  
  // 3. Bind events for progress bar
  var audio = document.querySelector('.audio-player');
  audio.addEventListener('canplay', function() {
    $slider.attr('max', Math.floor(audio.duration));
  })

  audio.addEventListener('timeupdate', function() {
    $slider.val(Math.floor(audio.currentTime));
    $thumb.css('transform', `rotate(${$slider.val()*2}deg)`)
  })
  
  $slider.on('input', function() {
    audio.currentTime = $slider.val();
  })
})
