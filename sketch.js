function setup() {
  createCanvas(700, 700);
  background(30);

  mountainCount = floor(random(3, 20));
  let mountainSpace = height / mountainCount;
  for (let i = -2; i < mountainCount; i++) {
    let mountainY = i * 100;
    drawMountain(mountainY, mountainSpace * 2.5);
  }
}

function drawMountain(_startY, _mountainHeight) {
  let noiseY = _startY * 0.005;
  for (let i = 0; i < innerWidth; i++) {
    let ratio = i / width; // 0.0 ~ 1.0
    let animatedRatio = easeInOutSine(ratio);
    let noiseRatio = noise(i * 0.01, noiseY);

    let xPos = i;
    let yPos_ratio = lerp(300, 100, ratio);
    let yPos_animatedRatio = lerp(400, 200, animatedRatio);
    // let yPos_noise = lerp(700, 300, noiseRatio); // start, end, interpolation (插值)
    let yPos_noise = _startY + _mountainHeight * noiseRatio;
    let pointColorNoise = noise(i * 0.002 + 10, noiseY);
    let pointStrokeNoise = noise(i * 0.05 + 1000, noiseY);

    let drawColor = lerp(100, 255, pointColorNoise);
    let pointSize = lerp(1, 10, pointStrokeNoise);
    stroke(drawColor);
    strokeWeight(pointSize);
    // point(xPos, yPos_ratio);
    // point(xPos, yPos_animatedRatio);
    // point(xPos, yPos_noise);

    let mountainHeight = _mountainHeight;
    let x1 = i;
    let y1 = yPos_noise;
    let x2 = i;
    let y2 = yPos_noise + mountainHeight;

    stroke(30, 200, 150);
    strokeWeight(1);

    if (i % 4 == 0) {
      JoeLine(x1, y1, x2, y2); // draw body
    }

    stroke(drawColor);
    strokeWeight(pointSize);
    point(xPos, y1);
    // point(xPos, y1 + mountainHeight); // draw mountain line
  }
}

function JoeLine(_x1, _y1, _x2, _y2) {
  let pointCount = dist(_x1, _y1, _x2, _y2);
  for (let i = 0; i < pointCount; i++) {
    let ratio = i / pointCount;
    let drawX = lerp(_x1, _x2, ratio);
    let drawY = lerp(_y1, _y2, ratio);
    if (random(0, 1) > ratio) {
      color1 = color(223, 184, 255);
      color2 = color(252, 247, 199);
      stroke(lerpColor(color1, color2, ratio));
      // stroke(223, 184, 255);
      point(drawX, drawY);
    }
  }
}

function easeOutElastic(x) {
  const c4 = (2 * Math.PI) / 3;

  return x === 0
    ? 0
    : x === 1
    ? 1
    : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
}

function easeInOutSine(x) {
  return -(Math.cos(Math.PI * x) - 1) / 2;
}

function draw() {}
