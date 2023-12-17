// 캔버스 생성
function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  //캔버스를 가운데로
  centerCanvas;
  angleMode(DEGREES);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  centerCanvas();
}

function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  canvas.position(x, y);
}

function draw() {
  background(20); // 배경색 밝기 30

  // 첫 번째 도형 세트
  drawShapeSet(500, 0, 0, 5, random(15));

  // 두 번째 도형 세트
  drawShapeSet(100, 150, 50, 8, random(7));

  // 세 번째 도형 세트
  drawShapeSet(-150, 100, 50, 3, random(2));
}

// 도형 세트 그리기 함수
function drawShapeSet(xOffset, yOffset, zOffset, sizeMultiplier, randomOffset) {
  rotateX(60);

  noFill();
  stroke(255);

  for (var i = 0; i < 20; i++) {
    var r = map(sin(frameCount / 2 + randomOffset), -1, 1, 0, 255);
    var g = map(i, 0, 20, 100, 200);
    var b = map(cos(frameCount + randomOffset), -1, 1, 200, 100);

    stroke(r, g, b);

    beginShape();
    for (var j = 0; j < 360; j += 10) {
      var rad = i * sizeMultiplier;
      var x = rad * cos(j);
      var y = rad * sin(j);
      var z = sin(frameCount * 2 + i * 10 + randomOffset) * 50;

      // 위치 오프셋 적용
      x += xOffset;
      y += yOffset;
      z += zOffset;

      vertex(x, y, z);
    }
    endShape(CLOSE);
  }
}
