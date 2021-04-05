// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
SketchRNN
=== */

// The SketchRNN model
let model;
// Start by drawing
let previous_pen = 'down';
// Current location of drawing
let x, y;
// The current "stroke" of the drawing
let strokePath;

// For when SketchRNN is fixed
function preload() {
  // See a list of all supported models: https://github.com/ml5js/ml5-library/blob/master/src/SketchRNN/models.js
  model = ml5.sketchRNN('cat');
}

function setup() {
  
  let button2 = createButton('Draw!');
  button2.mousePressed(newDraw); 
  
  createCanvas(640, 480);
  background(220);

  // Button to reset drawing
  //let button = createButton('clear');
  //button.mousePressed(startDrawing);
  
  // run sketchRNN
  startDrawing();
}

function modelReady() {
  console.log('model loaded');
  startDrawing();
}

function getDrawValue(){
  var subject = document.querySelector("#drawingsub");
}

// Reset the drawing
function startDrawing() {
  getDrawValue();
  background(220);
  // Start in the middle
  x = width / 2;
  y = height / 2;
 // model = ml5.sketchRNN(subject.value);
  model.reset();
  // Generate the first stroke path
  model.generate(gotStroke);
}

function newDraw(){
  var subject = document.querySelector("#drawingsub");
  model = ml5.sketchRNN(subject.value);
  startDrawing();
}

function draw() {
  // If something new to draw
  if (strokePath) {
    // If the pen is down, draw a line
    if (previous_pen == 'down') {
      stroke(0);
      strokeWeight(3.0);
      line(x, y, x + strokePath.dx, y + strokePath.dy);
    }
    // Move the pen
    x += strokePath.dx;
    y += strokePath.dy;
    // The pen state actually refers to the next stroke
    previous_pen = strokePath.pen;

    // If the drawing is complete
    if (strokePath.pen !== 'end') {
      strokePath = null;
      model.generate(gotStroke);
    }
  }
}

// A new stroke path
function gotStroke(err, s) {
  strokePath = s;
}
