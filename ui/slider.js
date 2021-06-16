function Slider(text_, x,y) {
  currentScene.uiSliders.push(this);
  this.pos = createVector(x,y);
  this.size = createVector(300 * GAME_SCALE,60 * GAME_SCALE);
  this.text = text_;
  this.textSize = 22 * GAME_SCALE;
  this.sliderPos = 0;

  this.drag = false;
  
  this.onChange = function(p) {}
  
  this.update = function() {
    if(mouseIsPressed) {
      if(AABB(mouseX,mouseY,1,1,this.sliderPos,this.pos.y+this.size.y-(25 * GAME_SCALE), 10 * GAME_SCALE, 20 * GAME_SCALE)) {
        this.drag = true;
      }
    }
    else this.drag = false;

    if(mouseIsPressed && this.drag) {
      this.sliderPos = constrain(mouseX, (20*GAME_SCALE), this.size.x);
      this.onChange(this.getPercentage());
    }
    this.sliderPos = constrain(this.sliderPos, (20*GAME_SCALE), this.size.x);
  }
  this.render = function() {
    //Background
    fill(100);
    rect(this.pos.x, this.pos.y, this.size.x, this.size.y);
    
    //Text
    fill(255);
    textAlign(LEFT, CENTER);
    textSize(this.textSize);
    text(this.text + ' ('+floor(this.getPercentage()*100)+'%)', this.pos.x+(5 * GAME_SCALE), this.pos.y+(20 * GAME_SCALE));
    
    //Slider bar
    fill(50);
    rect(this.pos.x+(5 * GAME_SCALE), this.pos.y+this.size.y-(20 * GAME_SCALE), this.size.x-(10 * GAME_SCALE), 10 * GAME_SCALE);

    //Drag knob
    fill(255);
    rect((this.getPercentage() * (this.size.x-(20 * GAME_SCALE)))+(20 * GAME_SCALE), this.pos.y+this.size.y-(25 * GAME_SCALE), 10 * GAME_SCALE, 20 * GAME_SCALE);
  }
  
  this.getPercentage = function() {
    return map(this.sliderPos, 20, this.size.x, 0, 1);
  }
}