var obj;
var obst = [];
var ghosts = [0, 20, 50, 80];
var g;
var k;
var collect;
let bonusCounter;
let bonusTime = false;
let score = 0;
let start = false;
let mouseClick=[];
let mouseClickColor=[];
// let moves = 10;

function setup() {
  fill(255)
  colorMode(HSB)
  createCanvas(600, 900);
  obj = new OBJ(width / 2, height / 3, 255);
  obst[0] = new OBJ(width / 5, height / 13, 0);
  obst[0].walker();
  g = 0.2;
  k = 0.01;
  collect = new Collects();
  bonus = new Collects();
  bonusCounter = 0;
  score = 0;
  noStroke();
  document.querySelector("canvas").addEventListener("click", startGame);
}

function startGame() {
  start = true;
  loop();
  document.querySelector("canvas").removeEventListener("click", startGame);
}

function reset() {
  loop();
  background(80);
  obj.reset(width / 2, height / 5, 255);
  obst = [];
  obst.push(new OBJ(width / 5, height / 13, 0));
  obst[0].walker();
  obst[0].render();
  collect.update();
  bonusCounter = 0;
  bonus.update();
  bonusTime = false;
  // bonus.renderBonus(bonusCounter / 100);
  score = 0;
  start = false;
  collect.render();
  obj.render();
  obj.edge();
  mouseClick = []
  mouseClickColor = []
  document.querySelector("canvas").removeEventListener("click", reset);
  text("score:" + score, 10, 20);
    push();
    textSize(50);
    textAlign(CENTER);
    text("start", width / 2, height / 3);
    pop();
    noLoop();

  document.querySelector("canvas").addEventListener("click", startGame);
}

function draw() {

  background(80);
  gravity = createVector(0, g * obj.m)
  obj.applyForce(gravity);
  let resistance = obj.v.copy().mult(obj.v.mag()).mult(-k);
  obj.applyForce(resistance);
  obj.update();

  // point scoring
  if (collect.collide(obj)) {
    collect.update();
    score++;
    // moves++;
    if (score % 5 == 0 && score > 0) {
      bonusTime = true;
      bonusCounter = 0;
    }
    newGhost(ghosts);
  }

  //bonus score
  if (bonusTime == true) {
    if (bonusCounter == 0) {
      bonus.update();
      bonusCounter++;
    }
    if (bonusCounter < 300 && bonusCounter > 0) {
      bonus.renderBonus(bonusCounter / 100);
      bonusCounter++;
      if (bonus.collide(obj)) {
        score += 5;
        bonusTime = false
        newGhost(ghosts);
      }
    } else {
      bonusTime = false
    }
  }

  //ghosts
  obst.forEach((e) => {
    e.walk(obj.pos);
    e.render();
    e.edge();
  });

  //ghost catching
  for (let o of obst) {
    catcha(o);
  }

  //render
  collect.render();
  obj.render();
  obj.edge(score);

  // score keeping
  text("score:" + score, 10, 20);

  // start button
  if (start != true) {
    push();
    textSize(50);
    textAlign(CENTER);
    text("start", width / 2, height * 2 / 3);
    pop();
    noLoop();
  }

  clicking();

}

function mousePressed() {
  // if (moves>0){
  let cur = createVector(mouseX, mouseY);
  mouseClick.push(cur.copy());

  cur.sub(obj.pos).normalize().mult(-25);
  obj.applyForce(cur);
  // moves--}
  mouseClickColor.push(60);
  // mouseClick.push(cur);


}

function clicking() {
  for (let i = 0; i < mouseClickColor.length; i++) {
    push();
    fill(0, 80, 95, mouseClickColor[i]/200);
    ellipse(mouseClick[i].x, mouseClick[i].y, 2 * mouseClickColor[i]);
    pop();
    mouseClickColor[i] -= 3;
    if (mouseClickColor[i] < 40) {
      mouseClickColor.splice(i, 1);
      mouseClick.splice(i, 1);
    }
  }
}


function catcha(_obst) {
  if (dist(obj.pos.x, obj.pos.y, _obst.pos.x, _obst.pos.y) < 20) {
    obj.gameOver(score);
  }
}

function newGhost(ghosts) {
  for (let [i, g] of ghosts.entries()) {
    if (score > g && score < g + 5) {
      if (obst.length < i + 1) {
        obst[i] = new OBJ(10, 10, 0);
        obst[i].walker();
        // console.log("new walker")
      }
      // console.log("point reach")
    }
  }
}
