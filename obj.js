class OBJ {
  constructor(x, y, c) {
    this.pos = createVector(x, y);
    this.v = createVector(0, 0);
    this.a = createVector(0, 0);
    this.m = 10
    this.c = c
  }

  applyForce(force) {
    //f = ma
    let f = p5.Vector.div(force, this.m);
    this.a.add(f);
  }
  walker() {
    let _x = random(1000);
    let _y = random(1000);

    this.n = createVector(_x, _y);
  }
  walk(v) {
    let _xscale = v.x - this.pos.x
    _xscale *= 0.02
    let _yscale = v.y - this.pos.y
    _yscale *= 0.02
    this.v.x = map(noise(this.n.x), 0, 1, _xscale - 5, _xscale + 5);
    this.v.y = map(noise(this.n.y), 0, 1, _yscale - 5, _yscale + 5);
    this.n.add(0.01, 0.01);
    this.pos = this.pos.add(this.v);
  }

  update() {
    this.v = this.v.add(this.a);
    this.pos = this.pos.add(this.v);
    this.a.mult(0);
  }

  render() {
    push();
    fill(this.c);
    ellipse(this.pos.x, this.pos.y, 30, 30);
    pop();
  }

  edge(s) {
    if (this.pos.x > width - 10) {
      this.pos.x = width - 10;
      this.v.x *= -0.95;
    } else if (this.pos.x < 10) {
      this.v.x *= -0.95;
      this.pos.x = 10;
    }
    if (this.pos.y < 10) {
      this.v.y *= -0.85;
      this.pos.y = 10;
    } else if (this.pos.y > height + 10) {
      this.gameOver(s);
    }
  }

  gameOver(s) {
    push();
    fill(255);
    textSize(40);
    textAlign(CENTER);
    text("score: " + s, width / 2, height * 2 / 3 - 40);
    text("GAME OVER", width / 2, height * 2 / 3);
    fill("#f00000");
    text("restart?", width / 2, height * 2 / 3 + 40);
    pop();
    noLoop();
    document.querySelector("canvas").addEventListener("click", reset);
  }

  reset(x, y, c) {
    this.pos.x = x;
    this.pos.y = y;
    this.c = c;
    this.v.mult(0);
  }
}
