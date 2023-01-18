var song;
var button;
// var slider;


function setup() {
  createCanvas(200, 200);
  song = loadSound('flowers.mp3');
  button = createButton("play");
  button.mousePressed(togglePlaying);
  background(51);
  // slider = createSlider(0, 1, 0.5, 0.01);
}

function loaded() {
  console.log("loaded");
}

function togglePlaying() {
  if (!song.isPlaying()) {
    song.play();
    song.setVolume(0.3);
    button.html('pause');
  } else {
    song.pause();
    button.html("play");
  }


}

//FUNCION DE SLIDER//
// function draw() {
//   background(random(255));
  // song.setVolume(slider.value());
//}