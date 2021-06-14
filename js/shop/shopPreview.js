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
        if(displayFullInformation)
            this.isHovering = AABB(mouseX, mouseY, 1, 1, this.pos.x,this.pos.y,this.size.x,this.size.y+(10*GAME_SCALE));
        else
            this.isHovering = AABB(mouseX, mouseY, 1, 1, this.pos.x,this.pos.y,this.size.x,this.size.y);

        if(mouseIsPressed && this.isHovering) {
            if(!this.pressed) {
                this.pressed = true;
                this.onClick();
            }
        } else this.pressed = false;

        if(this.timer >= 50)
            this.timer = 0;

        if(this.product != null)
            this.product.update();
    }

    this.render = function() {
        fill(this.isHovering ? color(75, 100) : color(100, 100));
        rect(this.pos.x, this.pos.y, this.size.x, this.size.x);

        if(this.product != null)
            this.product.render(this.pos.x + (5*GAME_SCALE), this.pos.y + (5*GAME_SCALE), this.size.x - (10*GAME_SCALE), this.size.x - (10*GAME_SCALE));


        let boxHeight = this.size.y-this.size.x;
        let boxY = this.pos.y+this.size.y-boxHeight + (5*GAME_SCALE);

        if(!displayFullInformation) {
            fill(this.isHovering ? color(100, 50) : color(100, 100));
            rect(this.pos.x, boxY, this.size.x, boxHeight);

            fill(255);
            textAlign(CENTER, CENTER);
            textSize((this.size.x / 10) * GAME_SCALE);
            text(this.text, this.pos.x + this.size.x / 2, this.pos.y + this.size.y - (20 * GAME_SCALE));
        }
        else {
            if(this.product.type == 'legendary')
                fill(this.isHovering ? color(120, 54, 222, 50) : color(120, 54, 222, 100));
            else if(this.product.type == 'normal')
                fill(this.isHovering ? color(0, 100, 0, 50) : color(0, 100, 0, 100));
            else
                fill(this.isHovering ? color(100, 50) : color(100, 100));

            rect(this.pos.x, boxY, this.size.x, boxHeight);

            fill(255);
            textAlign(CENTER, CENTER);
            textSize((this.size.x / 12) * GAME_SCALE);
            text(this.text, this.pos.x + this.size.x / 2, boxY + (10*GAME_SCALE));

            fill(255);
            textAlign(LEFT, CENTER);
            textSize((this.size.x / 16) * GAME_SCALE);
            if(this.product.spritePath == settings.visuell.selectedBackground) {
                text('Selected', this.pos.x + (5 * GAME_SCALE), this.pos.y + this.size.y - (20 * GAME_SCALE));
            } else {
                if (this.product.isBought) {
                    text('Click to select', this.pos.x + (5 * GAME_SCALE), this.pos.y + this.size.y - (20 * GAME_SCALE));
                } else {
                    if (!this.isHovering)
                        text('Price: ' + this.product.price, this.pos.x + (5 * GAME_SCALE), this.pos.y + this.size.y - (20 * GAME_SCALE));
                    else
                        text((credits - this.product.price >= 0) ? 'Click to buy' : 'Not enough credits', this.pos.x + (5 * GAME_SCALE), this.pos.y + this.size.y - (20 * GAME_SCALE));
                }
            }
        }
    }
}