function Player() {
  this.pos = createVector(width/2, height-50);
  this.size = createVector(18*2, 26*2);
  this.dirX = 0;
  
  this.shipName = 'Level0';
  this.shipData = null;
  this.shipSpeed = 3;
  
  this.fire = false;
  this.bulletCooldown = 10;
  this.bulletCooldownCounter = 0;
  
  this.shoot = function() {
    createPlayerBullet(this.pos.x, this.pos.y, -1);
    createPlayerBullet(this.pos.x+this.size-5, this.pos.y, -1);
  }
  
  this.dataUpdate = function() {
    if(this.shipData == null || this.shipData.name == 'fallback') {
      this.shipData = getShipByName(this.shipName);
    }
  }
  
  this.update = function() {
    this.pos.x += (this.dirX * this.shipSpeed);
    this.pos.x = constrain(this.pos.x, 5, width-this.size.x-5);
    
    this.bulletCooldownCounter--;
    if(this.fire && this.bulletCooldownCounter <= 0) {
      this.bulletCooldownCounter = this.bulletCooldown;
      this.shoot();
    }
  }
  
  this.render = function() {
    if(this.shipData != null) {
      image(this.shipData.sprite, this.pos.x, this.pos.y, this.size.x, this.size.y);
    }
    else {
      image(fallbackSprite, this.pos.x, this.pos.y, this.size.x, this.size.y);
    }
  }
  
  this.keyPressed = function(key) {
    if(key == 'a' || key == 'ArrowLeft') {
      this.dirX = -1;
    }
    if(key == 'd' || key == 'ArrowRight') {
      this.dirX = 1;
    }
    if(key == ' ') {
      this.fire = !this.fire;
    }
  }
  this.keyReleased = function(key) {
    if(key == 'a' || key == 'd' || key == 'ArrowLeft' || key == 'ArrowRight') {
        this.dirX = 0;
    }
  }
  
  this.renderHUD = function() {
    noStroke();
    fill(255);
    
    textAlign(LEFT,CENTER);
    textSize(15);
    text('credits: '+currentcredits, 5, 15);
    text('score: '+currentscore, 5, 30);
    text('stage: '+stage, 5, 45);
    
    stroke(color(255,0,0,100));
    strokeWeight(3);
    fill(255,0,0);
    line(0,height-150, width, height-150);
    noStroke();
  }
}