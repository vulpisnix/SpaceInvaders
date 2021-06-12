function Button(x,y,h,fS,txt = '') {
  buttons.push(this);
  this.pos = createVector(x,y);
  this.size = createVector(0,h);
  this.text = txt;
  this.fontSize = fS * (GAME_SCALE + 0.25);
  this.isHovering = false;

  this.active = true;

  this.action = function() {}
  
  this.update = function() {
    if(!this.active) return;
    textSize(this.fontSize);
    this.size.x = textWidth(this.text)+10;

    let x = this.pos.x - this.size.x/2;
    let y = this.pos.y - this.size.y/2;
    let sX = this.size.x;
    let sY = this.size.y;

    this.isHovering = AABB(mouseX, mouseY, 1,1,x,y,sX,sY);
  }
  
  this.render = function() {
    if(!this.active) return;

    noStroke();
    fill(this.isHovering ? color(255, 0, 0) : 255);
    textAlign(CENTER, CENTER);
    textSize(this.fontSize);
    text(this.text,this.pos.x, this.pos.y);
  }
  
  this.mousePressed = function() {
    if(!this.active) return;
    if(this.isHovering) {
      this.action();
    }
  }
}