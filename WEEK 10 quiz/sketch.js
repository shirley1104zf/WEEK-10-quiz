let song;

function preload() {
// Fill in the url for your audio asset
song = loadSound("audio/sample-visualisation.mp3");
}

function setup() {
cnv = createCanvas(1000, 400);
// Create a new FFT analysis object
fft = new p5.FFT(0.8, 128);
// Add the song (sample) into the FFT's input
song.connect(fft);
}

function draw() {
// Give the user a hint on how to interact with the sketch
if (getAudioContext().state !== 'running') {
background(220);
text('tap here to play some sound!', 10, 20, width - 20);
// Early exit of the draw loop
return;
}

background(0);
stroke(0, 0, 0);

// Request fresh data from the FFT analysis
let spectrum = fft.analyze();
colorMode(HSB);
//fill(0, 255, 0); // spectrum is green
  // Draw the spectrum in a circular format
translate(width / 2, height / 2);
  for (let i = 0; i < spectrum.length; i++) {
    let angle = map(i, 0, spectrum.length, 0, TWO_PI);
    let radius = map(spectrum[i], 0, 255, 50, 200);
    
    // Calculate the hue based on frequency
    let hue = map(i, 0, spectrum.length, 0, 255);
    
    fill(hue, 255, 255);
    let x = cos(angle) * radius;
    let y = sin(angle) * radius;
    rect(x, y, 10, 10);
  }
  colorMode(RGB);
  }
 


// Toggle playback on or off with a mouse click
function mousePressed() {
if (song.isPlaying()) {
// .isPlaying() returns a boolean
song.stop();
background(255, 0, 0);
} else {
song.play();
background(0, 255, 0);
}
}