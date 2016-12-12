var slider;

function setup() {
  createCanvas(800, 640);
  angleSlider = createSlider(0, PI / 2, PI / 4, 0.02);
  baseSlider = createSlider(50, 250, 200, 10);
  decaySlider = createSlider(0.3, 0.7, 0.6, 0.1);
}

function draw() {
  background(61);
  angle = angleSlider.value();
  branchLen = baseSlider.value();
  lenDecay = decaySlider.value();
  stroke(255);
  translate(width / 2, height);
  branch(branchLen);

}

function branch(len) {
    line(0, 0, 0, -len);
    translate(0, -len);
  if (len > 4) {
    // First branch stack
    push();
    rotate(angle);
    branch(len*lenDecay);
    pop();
    // Second branch stack
    push();
    rotate(-angle);
    branch(len*lenDecay);
    pop();
  }
}
