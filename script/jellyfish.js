// Original Code from: https://www.youtube.com/watch?v=vmhRlDyPHMQ&list=PLwUlLzAS3RYow0T9ZXB0IomwB-DyBRTfm
// Colorful Coding
// Sine wave structure in p5.js
// Coding Project #1

// Modified by MIN-JI KIM

let shapes = []; //해파리 배열
let draggedShape = null; // 드래그할 때
let offsetX, offsetY; // 도형~마우스 위치

//캔버스
function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);

  // 해파리 각각
  // 해파리1(아래)
  shapes.push(createShape(300, 200, -120, 34, random(15), 80));
  // 해파리2
  shapes.push(createShape(490, 40, 80, 8, random(7), 60));
  // 해파리3
  shapes.push(createShape(-300, 100, 90, 10, random(2), -30));
  // 해파리4
  shapes.push(createShape(-500, -150, 50, 16, random(2), 40));
  // 해파리5
  shapes.push(createShape(30, -150, 80, 12, random(2), 100));
}

//화면 크기 조절
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);

  for (let shape of shapes) {
    shape.display();
  }
}

function createShape(x, y, z, sizeMultiplier, randomOffset, rotationAngle) {
  // 해파리 초기 위치
  return {
    x,
    y,
    z,
    sizeMultiplier,
    randomOffset,
    rotationAngle,

    //해파리
    display: function () {
      // 각도
      push();
      translate(this.x, this.y, this.z);
      rotateX(this.rotationAngle);

      // 색상
      noFill();
      stroke(255);

      for (let i = 0; i < 20; i++) {
        let r = map(sin(frameCount / 2 + this.randomOffset), -1, 1, 0, 255);
        let g = map(i, 0, 20, 100, 200);
        let b = map(cos(frameCount + this.randomOffset), -1, 1, 200, 100);

        stroke(r, g, b);

        //해파리 모양
        beginShape();
        for (let j = 0; j < 360; j += 10) {
          let rad = i * this.sizeMultiplier;
          let shapeX = rad * cos(j);
          let shapeY = rad * sin(j);
          let shapeZ = sin(frameCount * 2 + i * 10 + this.randomOffset) * 30; // 속도조절

          vertex(shapeX, shapeY, shapeZ);
        }
        endShape(CLOSE);
      }
      pop();
    },

    //인터렉 코딩 부분
    checkClick: function () {
      // 마우스 거리
      let d = dist(mouseX - width / 2, mouseY - height / 2, this.x, this.y);

      // 클릭하면 draggedShape로 저장
      if (d < 100) {
        draggedShape = this;
        offsetX = this.x - mouseX;
        offsetY = this.y - mouseY;
      }
    },

    // 마우스 드래그 하면 도형 이동
    drag: function () {
      this.x = mouseX + offsetX;
      this.y = mouseY + offsetY;
    },
  };
}

//mousePressed
function mousePressed() {
  for (let shape of shapes) {
    shape.checkClick();
  }
}

//mouseDragged
function mouseDragged() {
  if (draggedShape) {
    draggedShape.drag();
  }
}

//mouseReleased -> draggedShape 초기화
function mouseReleased() {
  draggedShape = null;
}
