function polygon(x, y, n, r, a, s) {
  this.o = createVector(x, y);
  this.v = [];

  if (s == true) {
    this.vS = []
    for (let i = 0; i < n; i++) {
      this.vS[i] = p5.Vector.fromAngle(((i + 0.5) * 2 * PI / n) + a, r/2);
      this.vS[i] = p5.Vector.add(this.o, this.vS[i]);
    }
  }

  for (let i = 0; i < n; i++) {
    this.v[i] = p5.Vector.fromAngle((i * 2 * PI / n) + a, r);
    this.v[i] = p5.Vector.add(this.o, this.v[i]);
  }

  // if (p == CENTER){
  // line(this.o.x, this.o.y, this.v[i].x, this.v[i].y);
  // }
  beginShape();
  for (let i = 0; i < this.v.length; i++) {
    vertex(this.v[i].x, this.v[i].y);
    if (s == true) {
      vertex(this.vS[i].x, this.vS[i].y);
    }
  }
  endShape(CLOSE);
}
