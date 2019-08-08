// things you can configure

// set of points where no three points are collinear
let points = [
  [-80, -30],
  [-40, 0],
  [0, 60],
  [70, 40],
  [-150, 50],
  [130, 100],
  [50, -75]
]

const framerate = 60;
const angleSpeed = 0.005;
// a small margin can result in ignoring pints
const margin = 0.01;

// ---------------------------------

let pivot = 4;
let last_pivot = pivot;
let angle = -0.3;

function setup() {
  createCanvas(400, 400);
  frameRate(framerate)
}

function draw() {
  translate(width / 2, height / 2);
  background(51);

  stroke(255, 0, 0, 128)
  strokeWeight(2)
  drawLine(points[pivot])

  stroke(255)
  strokeWeight(4)
  drawPoints()

  stroke(255, 215, 0)
  strokeWeight(8)
  point(points[pivot][0], points[pivot][1])

  stroke(255, 0, 0)
  strokeWeight(5)
  point(points[last_pivot][0], points[last_pivot][1])

  let r = checkCollissions()
  if (r != null) {
    last_pivot = pivot;
    pivot = r;
  }

  angle += angleSpeed
  angle %= TWO_PI
}

function checkCollissions() {
  let [x, y] = points[pivot];
  const angleSlope = Math.tan(angle % PI)
  for (let i = 0; i < points.length; ++i) {
    if (i != pivot && i != last_pivot) {
      let [x1, y1] = points[i];
      let slope = (y1 - y) / (x1 - x)

      if (abs(slope - angleSlope) <= (margin + margin * abs(angleSlope))) {
        return i
      }
    }
  }
  return null
}

function drawPoints() {
  for (let i = 0; i < points.length; ++i) {
    let [x, y] = points[i];
    point(x, y)
  }
}

function drawLine(pivot) {
  let [x, y] = pivot
  let slope = Math.tan(angle)
  let x1 = x + width;
  let y1 = y + slope * (x1 - x);
  let x2 = x - width;
  let y2 = y + slope * (x2 - x);
  line(x1, y1, x2, y2)
}