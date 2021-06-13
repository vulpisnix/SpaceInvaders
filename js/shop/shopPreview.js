function ShopPreview(name,product, displayFullInformation = false) {
    shopPreviews.push(this);
    this.pos = createVector(0,0);
    this.size = createVector(300*GAME_SCALE,!displayFullInformation ? 350*GAME_SCALE : 360*GAME_SCALE);
    this.text = name;
    this.product = product;

    this.isHovering = false;
    this.pressed = false;

    this.onClick = function() {}

    this.update = function(x,y) {
        this.pos.x = x;
        this.pos.y = y;
        this.isHovering = AABB(mouseX, mouseY, 1, 1, this.pos.x,this.pos.y,this.size.x,this.size.y);

        if(mouseIsPressed && this.isHovering) {
            if(!this.pressed) {
                this.pressed = true;
                this.onClick();
            }
        } else this.pressed = false;
    }

    this.render = function() {
        fill(this.isHovering ? 75 : 100);
        rect(this.pos.x, this.pos.y, this.size.x, this.size.y);

        if(this.product != null)
            this.product.render(this.pos.x + (5*GAME_SCALE), this.pos.y + (5*GAME_SCALE), this.size.x - (10*GAME_SCALE), this.size.x - (10*GAME_SCALE));

        if(!displayFullInformation) {
            fill(255);
            textAlign(CENTER, CENTER);
            textSize(this.size.x / (10 * GAME_SCALE));
            text(this.text, this.pos.x + this.size.x / 2, this.pos.y + this.size.y - (27 * GAME_SCALE));
        }
        else {
            fill(255);
            textAlign(CENTER, CENTER);
            textSize(this.size.x / (12 * GAME_SCALE));
            text(this.text, this.pos.x + this.size.x / 2, this.pos.y + this.size.y - (this.size.y-this.size.x) + (10*GAME_SCALE));

            fill(255);
            textAlign(LEFT, CENTER);
            textSize(this.size.x / (16 * GAME_SCALE));
            text('Price: '+this.product.price, this.pos.x+(5*GAME_SCALE), this.pos.y + this.size.y - (20*GAME_SCALE));
        }
    }
}