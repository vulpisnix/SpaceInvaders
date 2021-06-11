function Button(x,y,w,h,fS,txt = '') {
  this.pos = createVector(x,y);
  this.size = createVector(w,h);
  this.text = txt;
  this.fontSize = fS;
  this.isHovering = false;
  this.action = function() {}
  
  this.update = function() {
    textSize(this.fontSize);
    this.size.x = textWidth(this.text)+10;
    this.isHovering = AABB(mouseX, mouseY, 1,1,this.pos.x - this.size.x/2,this.pos.y - this.size.y/2, this.size.x,this.size.y);

    // if(is_touch_enabled()) {
    //   if(AABB(touches[0].x, touches[0].y, 5, 5, this.pos.x - this.size.x/2,this.pos.y - this.size.y/2, this.size.x,this.size.y)) {
    //     this.isHovering = true;
    //     this.action();
    //   } else this.isHovering = false;
    // }
  }
  
  this.render = function() {
    noStroke();
    fill(this.isHovering ? color(255, 0, 0) : 255);
    textAlign(CENTER, CENTER);
    textSize(this.fontSize);
    text(this.text,this.pos.x, this.pos.y);
  }
  
  this.mousePressed = function() {
    if(this.isHovering) {
      this.action();
    }
  }
}