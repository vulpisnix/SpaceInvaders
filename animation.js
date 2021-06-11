function Animation(x,y,w,h,interval_,images_ = []) {
  this.pos = createVector(x,y);
  this.size = createVector(w,h);
  this.interval = interval_;
  this.images = images_;
  this.finished = false;
  this.frame = null;
  this.counter = interval_;
  
  
  this.update = function() {
    this.counter++;
    
    if(this.counter >= this.interval) {
      this.counter = 0;
      let index = 0;
      if(this.frame != null) {
        index = this.frame.index;
        index++;
      }
            
      if(index >= this.images.length) {
        this.finished = true;
        this.frame = null;
        return;
      }
      
      this.frame = {
        index: index,
        image: this.images[index]
      };
    }
  }
  this.render = function() {
    if(this.frame != null && !this.finished) {
      image(this.frame.image, this.pos.x, this.pos.y, this.size.x, this.size.y);
    }
  }
}