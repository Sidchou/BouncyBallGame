class Collects {
  constructor() {
    this.x = random(5, width - 5);
    this.y = random(5, height / 2);
    this.c = color(random(70,300), random(50, 70), 60);
  }

  collide(obj) {
    let m = obj.pos;
    return dist(m.x, m.y, this.x, this.y) < 25
  }

  update() {
    this.x = random(5, width - 5);
    this.y = random(5, height / 2);
    this.c = color(random(70,300), random(50, 70), 60);
  }

  render() {
    push();
    fill(this.c);
    ellipse(this.x, this.y, 20);
    pop();
  }
  renderBonus(a) {
    push();
    fill(random(50, 60), random(65, 70), 95);
    polygon(this.x, this.y, 15, 10, a, true);
    pop();
  }
}
