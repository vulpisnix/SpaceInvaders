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
    if(IS_TOUCH_SUPPORTED && settings.controls.useTouch) return;

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
    if(IS_TOUCH_SUPPORTED && settings.controls.useTouch) return;
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


    if(IS_TOUCH_SUPPORTED && settings.controls.useTouch && touches.length > 0) {
      let sprite = getTouchIconByName('directionControl').sprite;
      let spriteHighlighted = getTouchIconByName('directionControlHighlighted').sprite;

      const x = touches[0].x, y = touches[0].y;
      const right = AABB(x, y, 1, 1, width-75, height-100, 50, 50);
      const left =  AABB(x, y, 1, 1, width-150, height-100, 50, 50);
      const up =    AABB(x, y, 1, 1, width-75 - 75/2, height-100 - 75/2, 50, 50);
      const down =  AABB(x, y, 1, 1, width-75 - 75/2, height-100 + 75/2, 50, 50);
      const fire =  AABB(x, y, 1, 1, 75 + 75/2, height-100 - 75/2, 50, 50);


      if(left) {
        this.dirX = -1;
      }
      else
      if(right) {
        this.dirX = 1;
      }
      else this.dirX = 0;

      if(fire) {
        this.fire = !this.fire;
      }



      // RIGHT
      push();
      translate(width-50, height-75);
      rotate(radians(90));
      image(right ? spriteHighlighted : sprite, -25,-25,50,50);
      pop();

      // LEFT
      push();
      translate(width-125, height-75);
      rotate(radians(-90));
      image(left ? spriteHighlighted : sprite, -25,-25,50,50);
      pop();


      // UP
      push();
      translate(width-50 - 75/2, height-75 - 75/2);
      image(up ? spriteHighlighted : sprite, -25,-25,50,50);
      pop();

      // DOWN
      push();
      translate(width-50 - 75/2, height-75 + 75/2);
      rotate(radians(180));
      image(down ? spriteHighlighted : sprite, -25,-25,50,50);
      pop();


      sprite = getTouchIconByName("shot").sprite;
      spriteHighlighted = getTouchIconByName("shotHighlighted").sprite;

      // FIRE
      push();
      translate(50 + 75/2, height-75 - 75/2);
      image((fire || this.fire) ? spriteHighlighted : sprite, -25,-25,50,50);
      pop();
    }
  }
}