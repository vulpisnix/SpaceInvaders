function KeyChanger(x,y,text_, subtext_) {
    keychangers.push(this);
    this.pos = createVector(x,y);
    this.size = createVector(300 * GAME_SCALE,60 * GAME_SCALE);
    this.text = text_;
    this.subtext = subtext_;
    this.textSize = 22 * GAME_SCALE;

    this.isHovering = false;
    this.pressed = false;

    this.onClick = function() {}

    this.update = function() {
        if(keyChangerChange.name != '') return;

        this.isHovering = AABB(mouseX, mouseY, 1, 1, this.pos.x,this.pos.y,this.size.x,this.size.y);

        if(mouseIsPressed && this.isHovering) {
            if(!this.pressed) {
                this.pressed = true;
                this.onClick();
            }
        }
        else this.pressed = false;
    }

    this.render = function() {
        fill(100);
        rect(this.pos.x,this.pos.y,this.size.x,this.size.y);
        fill(255);
        textAlign(LEFT, CENTER);
        textSize(this.textSize);
        text(this.text, this.pos.x+(5*GAME_SCALE), this.pos.y+(20*GAME_SCALE));
        textSize(this.textSize-(5*GAME_SCALE));
        text(!this.isHovering ? this.subtext : 'Click to change', this.pos.x + (5 * GAME_SCALE), (this.pos.y+this.size.y) - (17 * GAME_SCALE));
    }

}