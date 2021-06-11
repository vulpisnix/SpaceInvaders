function Enemy(x,y,s) {
  this.pos = createVector(x,y);
  this.size = s;
  this.sprite = null;
  this.moveDir = 0;
  this.moveCounter = 0;
  this.life = 1;
  
  this.credits = 1;
  this.score = 5;
  
  this.bulletCooldown = 10;
  this.bulletCooldownCounter = 0;
  
  this.shoot = function() {}
  
  this.update = function() {
    this.moveCounter++;
    if(this.moveCounter >= 20) {
      this.moveDir *= -1;
      this.moveCounter = 0;
    }    
    this.pos.x += this.moveDir;
    
    this.bulletCooldownCounter++;
    if(this.bulletCooldownCounter >= this.bulletCooldown) {
      this.bulletCooldownCounter = 0;
      this.shoot();
    }
  }
  
  this.render = function() {
    if(this.sprite == null) {
      noStroke();
      fill(255,0,0);
      rect(this.pos.x, this.pos.y, this.size, this.size);
    }
    else {
      image(this.sprite, this.pos.x, this.pos.y, this.size, this.size);
    }
  }  
}