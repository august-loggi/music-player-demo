$(function() {

var $toggleBtn = $('.btn-toggle');
var $songItem = $('.song-item');
var audioPlayer = document.querySelector('.audio-player');

// ========= //
// = EVENT = //
// ========= //

// => Choose the song to play
$songItem.on('click', function(index) {
  var songIndex = $(this).index();
  UpdateSong(songIndex);
})

// => Play and Pause the song
$toggleBtn.on('click', function() {
  let isPaused = audioPlayer.paused;
  ToggleButton(isPaused);
  TogglePlayer(isPaused);
})

// => Loop current song
$('.btn-repeat').on('click', function() {
  if ($(this).attr('data-state') === 'off') {
    $(this).addClass('active');
    audioPlayer.loop = true;
    $(this).attr('data-state', 'on');
  }
  else {
    $(this).removeClass('active');
    audioPlayer.loop = false;
    $(this).attr('data-state', 'off');
  }
})

// => Move the next song automatically
audioPlayer.addEventListener('ended', function () {
  var curSong = $('.song-item.active').index();
  curSong = curSong == songs.length - 1 ? 0 : curSong + 1;
  UpdateSong(curSong);
})

// => Step forward 
$('.btn-next').on('click', function() {
  var curSong = $('.song-item.active').index();
  curSong = curSong == songs.length - 1? 0: curSong + 1;
  UpdateSong(curSong);
})

// => Step backward
$('.btn-pre').on('click', function () {
  var curSong = $('.song-item.active').index();
  curSong = curSong == 0 ? songs.length - 1 : curSong - 1;
  UpdateSong(curSong);
})

// => Shuffle
$('.btn-shuffle').on('click', function() {
  if ($(this).attr('data-state') === 'off') {
    $(this).addClass('active');
    audioPlayer.addEventListener('ended', Shuffle)
    $(this).attr('data-state', 'on');
  }
  else {
    $(this).removeClass('active');
    $(this).attr('data-state', 'off');
    audioPlayer.removeEventListener('ended', Shuffle)
  }
})

// ============ //
// = FUNCTION = //
// ============ //
function UpdateSong(songIndex) {
  $('.song-item.active').removeClass('active');
  $(`.song-item:eq(${songIndex})`).addClass('active');

  $('.header-name').text(songs[songIndex].name);
  AddSongLink(songIndex);
  ChangeThumb(songIndex);
  ToggleButton(true);
  TogglePlayer(true);
}

function ChangeThumb(index) {
  $('.cd-thumb').css({
    'background-image': `url(${songs[index].image})`
  })
}

function AddSongLink(index) {
  $('.audio-player').attr('src', `${songs[index].audio}`);
}

function TogglePlayer(state) {
  if (state) {
    audioPlayer.play()
  }
  else {
    audioPlayer.pause();
  }
}

function ToggleButton(state) {
  var $playBtn = $('.btn-toggle-play');
  var $pauseBtn = $('.btn-toggle-pause');

  if (state) {
    $playBtn.css('display', 'none');
    $pauseBtn.css('display', 'block');
  }
  else {
    $playBtn.css('display', 'block');
    $pauseBtn.css('display', 'none');
  }
}

function Shuffle() {
  var randNum;
  randNum = Math.floor(Math.random() * songs.length);
  UpdateSong(randNum);
}

/*
THINGS TO DO:
1. Tạo chức năng Play and pause nhạc -> OK
2. Tạo chức năng chuyển bài khi click vào item -> OK
3. Tạo chức năng step backward and step forward
4. Tạo chức năng loop bài hát hiện tại -> Ok
5. Tạo chức năng chuyển bài tự động
6. Tạo chức năng phát ngẫu nhiên

*/
})