function Checkbox(text_, x,y) {
  checkboxes.push(this);
  this.pos = createVector(x,y);
  this.size = createVector(300,60);
  this.text = text_;
  this.textSize = 22;
  this.value = true;

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
    text(this.text, this.pos.x+5, this.pos.y+20);

    //Checkbox
    fill(50);
    rect(this.pos.x+5, this.pos.y+this.size.y-25, 20, 20);

    fill(255);
    textSize(this.textSize-5);
    text(this.value ? 'Activated' : 'Deactivated', this.pos.x+30, this.pos.y+this.size.y-17);
  }

  this.mousePressed = function() {
    if(AABB(mouseX,mouseY,1,1,20,this.pos.y+this.size.y-25, 20, 20)) {
      this.value = !this.value;
      this.onChange(this.value);
      this.pressed = true;
    }
  }
}