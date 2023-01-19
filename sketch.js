var song;
var button;
var amp;


function setup() {
  createCanvas(200, 200);
  song = loadSound('flowers.mp3', loaded);
  amp = new p5.Amplitude();
  background(51);
}

function loaded() {
  button = createButton("play");
  button.mousePressed(togglePlaying);
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

function draw() {
  background(255, 0, 255);

  var vol = amp.getLevel();
  var diam = map(vol, 0, 3, 10, 200);

  fill(255, 0, 255);
  ellipse(width / 2, height / 2, diam, vol);
}


