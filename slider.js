function Slider(text_, x,y) {
  sliders.push(this);
  this.pos = createVector(x,y);
  this.size = createVector(300,60);
  this.text = text_;
  this.textSize = 22;
  this.sliderPos = 0;

  this.drag = false;
  
  this.onChange = function(p) {}
  
  this.update = function() {
    if(mouseIsPressed) {
      if(AABB(mouseX,mouseY,1,1,this.sliderPos,this.pos.y+this.size.y-25, 10, 20)) {
        this.drag = true;
      }
    }
    else this.drag = false;

    if(mouseIsPressed && this.drag) {
      this.sliderPos = constrain(mouseX, 20, this.size.x);
      this.onChange(this.getPercentage());
    }
    this.sliderPos = constrain(this.sliderPos, 20, this.size.x);
  }
  this.render = function() {
    //Background
    fill(100);
    rect(this.pos.x, this.pos.y, this.size.x, this.size.y);
    
    //Text
    fill(255);
    textAlign(LEFT, CENTER);
    textSize(this.textSize);
    text(this.text + ' ('+floor(this.getPercentage()*100)+'%)', this.pos.x+5, this.pos.y+20);
    
    //Slider bar
    fill(50);
    rect(this.pos.x+5, this.pos.y+this.size.y-20, this.size.x-10, 10);

    //Drag knob
    fill(255);
    rect((this.getPercentage() * (this.size.x-20))+20, this.pos.y+this.size.y-25, 10, 20);
  }
  
  this.getPercentage = function() {
    return map(this.sliderPos, 20, this.size.x, 0, 1);
  }
}