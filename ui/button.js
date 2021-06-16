function Button(x,y,h,fS,txt = '') {
  currentScene.buttons.push(this);
  this.pos = createVector(x,y);
  this.size = createVector(0,h);
  this.text = txt;
  this.fontSize = fS * (GAME_SCALE + 0.25);
  this.isHovering = false;
  this.textAlign = 'CENTER'

  this.active = true;

  this.action = function() {}
  
  this.update = function() {
    if(!this.active) return;
    textSize(this.fontSize);
    this.size.x = textWidth(this.text)+10;

    if(this.textAlign == 'CENTER')
      this.isHovering = AABB(mouseX, mouseY, 1,1,this.pos.x - this.size.x/2,this.pos.y - this.size.y/2,this.size.x,this.size.y);
    else if(this.textAlign == 'LEFT')
      this.isHovering = AABB(mouseX, mouseY, 1,1,this.pos.x,this.pos.y,this.size.x,this.size.y);
  }
  
  this.render = function() {
    if(!this.active) return;
    noStroke();
    fill(this.isHovering ? color(255, 0, 0) : 255);
    if(this.textAlign == 'CENTER') {
      textAlign(CENTER, CENTER);
      textSize(this.fontSize);
      text(this.text, this.pos.x, this.pos.y);
    } else if(this.textAlign == 'LEFT') {
      textAlign(LEFT, CENTER);
      textSize(this.fontSize);
      text(this.text, this.pos.x + (5*GAME_SCALE), this.pos.y + (this.size.y/2) - (5*GAME_SCALE));
    }
  }
  
  this.mousePressed = function() {
    if(!this.active) return;
    if(this.isHovering) {
      this.action();
    }
  }
}