function Bomb(x,y,w,h, diry) {
    this.pos = createVector(x, y);
    this.size = createVector(w,h);
    this.dirY = diry;
    this.damage = 1;
    this.bombSpeed = 10;

    this.update = function() {
        const mov = createVector(0, this.dirY);
        mov.mult(this.bombSpeed);
        this.pos.add(mov);
    }
    this.render = function() {
        image(bombSprite, this.pos.x, this.pos.y, this.size.x, this.size.y);
    }
}