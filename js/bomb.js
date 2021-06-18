function Bomb(x,y,w,h, diry, images_ = []) {
    this.pos = createVector(x, y);
    this.size = createVector(w,h);
    this.dirY = diry;
    this.damage = 1;
    this.bombSpeed = 10;

    this.interval = 3;
    this.images = images_;
    this.frame = null;
    this.counter = this.interval;

    this.update = function() {
        const mov = createVector(0, this.dirY);
        mov.mult(this.bombSpeed);
        this.pos.add(mov);

        this.counter++;

        if(this.counter >= this.interval) {
            this.counter = 0;
            let index = 0;
            if(this.frame != null) {
                index = this.frame.index;
                index++;
            }

            if(index >= this.images.length) {
                index = 0;
            }

            this.frame = {
                index: index,
                image: this.images[index]
            };
        }
    }
    this.render = function() {
        if(this.frame != null) {
            image(this.frame.image, this.pos.x, this.pos.y, this.size.x, this.size.y);
        }
    }
}