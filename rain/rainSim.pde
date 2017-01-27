// Colours
// Rain drop - (76, 131, 220)
// Background - (198, 218, 215)

// Initialising the drop array
Drop[] drops = new Drop[300];

void setup() {
  size(860, 500);
  // Drop declaration loop
  for (int i = 0; i < drops.length; i++) {
    drops[i] = new Drop();
  }

}

void draw() {
  // Background colour
  background(198, 218, 215);
  // Drop draw loop
  for (int i = 0; i < drops.length; i++){
    drops[i].fall();
    drops[i].show();
  }
}

class Drop {
  float x = random(width);
  float y = random(-300, -100);
  // Random variable used for parallaxing
  float z = random(0, 20);
  float len = map(z, 0, 20, 10, 20);
  float ySpeed = map(z, 0, 20, 1, 8);


  void fall() {
    y = y + ySpeed;
    float grav = map (z, 0, 20, 0, 0.2);
    ySpeed = ySpeed + grav;

    if (y > height) {
      y = random(-250, -50);
      x = random(width);
      ySpeed = map(z, 0, 20, 1, 8);
    }

  }

  void show() {
    // Thickness of the drops is mapped to z value
    float thickness = map(z, 0, 20, 1, 3);
    strokeWeight(thickness);
    // Rain colour
    stroke(76, 131, 220);
    line(x, y, x, y + len);

  }

}
