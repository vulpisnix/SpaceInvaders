function Checkbox(text_, x,y) {
  checkboxes.push(this);
  this.pos = createVector(x,y);
  this.size = createVector(300 * GAME_SCALE,60 * GAME_SCALE);
  this.text = text_;
  this.textSize = 22 * GAME_SCALE;
  this.value = true;

  this.disabled = false;
  this.disabledText = '';

  this.pressed = false;
  
  this.onChange = function(p) {}

  this.render = function() {
    //Background
    fill(100);
    rect(this.pos.x, this.pos.y, this.size.x, this.size.y);
    
    //Text
    fill(255);
    textAlign(LEFT, CENTER);
    textSize(this.textSize);
    text(this.text, this.pos.x+(5 * GAME_SCALE), this.pos.y+(20 * GAME_SCALE));

    //Checkbox
    fill(50);
    rect(this.pos.x+(5 * GAME_SCALE), this.pos.y+this.size.y-(25 * GAME_SCALE), 20 * GAME_SCALE, 20 * GAME_SCALE);

    if(this.value) {
      fill(255);
      textSize(this.textSize-(5 * GAME_SCALE));
      text('x', this.pos.x+(3.5 * GAME_SCALE) + textWidth('x')/2, this.pos.y+this.size.y-(17 * GAME_SCALE));
    }

    fill(255);
    textSize(this.textSize-(5*GAME_SCALE));
    if(!this.disabled) {
      text(this.value ? 'Activated' : 'Deactivated', this.pos.x + (30 * GAME_SCALE), this.pos.y + this.size.y - (17 * GAME_SCALE));
    }
    else {
      text(this.disabledText, this.pos.x + (30 * GAME_SCALE), this.pos.y + this.size.y - (17 * GAME_SCALE));
    }
  }

  this.mousePressed = function() {
    if(this.disabled) return;
    if(AABB(mouseX,mouseY,1,1,this.pos.x+(5 * GAME_SCALE),this.pos.y+this.size.y-(25 * GAME_SCALE), 20 * GAME_SCALE, 20 * GAME_SCALE)) {
      this.value = !this.value;
      this.onChange(this.value);
      this.pressed = true;
    }
  }
}