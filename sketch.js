var song
var img
var fft
var particles = []

///////////////////////////////////////////////////////////
///// FUNCTION PRELOAD CARGA DE LA MUSICA Y LA IMAGEN /////
///////////////////////////////////////////////////////////
function preload() {
  song = loadSound('flowers.mp3');
  img = loadImage('flores.jpg')
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  imageMode(CENTER);
  fft = new p5.FFT();

  img.filter(BLUR, 12);

  noLoop();
}
/////////////////////////////////////////////////////////////
////////// FUNCION DE CLICK PARA REPRODUCIR//////////////////
/////////////////////////////////////////////////////////////

function mouseClicked() {
  if (song.isPlaying()) {
    song.pause();
    noLoop();
  } else {
    song.play();
    loop();
  }
}

///////////////////////////////////
////////// FUNCTION DRAW //////////
///////////////////////////////////
function draw() {
  background(0);
  stroke(255, 204, 0);
  strokeWeight(3);
  fill('#222222');
  translate(width / 2, height / 2);

  fft.analyze()
  amp = fft.getEnergy(20, 200);

  push()
  if (amp > 250) {
    rotate(random(-0.5, 0.5))
  }

  ///////////Imagen////////////////
  image(img, 0, 0, width.height)
  pop()
  /////////////////////////////////

  var wave = fft.waveform();

  ////////////// VARIABLE DE DUPICADO DE CIRCULO /////////////
  for (var t = -1; t <= 1; t += 2) {
    /////////////////////////////////////////////////////////////

    beginShape();

    for (var i = 0; i <= 180; i += 1) {
      var index = floor(map(i, 0, 180, 0, wave.length + - 1));

      //var r = (70 * abs(sin(i * 5)) + 225)
      var r = map(wave[index], -1, 1, 150, 350);

      var x = r * sin(i) * t
      var y = r * cos(i);
      vertex(x, y);

    }
    endShape();
  }

  /////////////////////////////////////////////
  ////// VARIABLE DE LAS PARTICULAS //////////
  ////////////////////////////////////////////

  var p = new Particle()
  particles.push(p)

  for (var i = 0; i < particles.length; i++) {
    if (!particles[i].edges()) {
      particles[i].update()
      particles[i].show()
    } else {
      particles.splice(i, 1);
    }
  }

}

/////////////////////////////////////////////////
////// CLASE PARA LAS PARTICULAS DEL FONDO //////
/////////////////////////////////////////////////

class Particle {
  constructor() {
    this.pos = p5.Vector.random2D().mult(250);
    this.vel = createVector(0, 0);
    this.acc = this.pos.copy().mult(random(0.0001, 0.00001));

    this.w = random(3, 5);

  }
  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
  }

  edges() {
    if (this.pos.x < -width / 2 || this.pos.x > width / 2 ||
      this.pos.y < -height / 2 || this.pos.y > height / 2) {
      return true
    } else {
      return false
    }
  }
  show() {
    stroke(255, 204, 0);
    fill(255)
    ellipse(this.pos.x, this.pos.y, 4);
  }
}


