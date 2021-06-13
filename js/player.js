function Player() {
  this.pos = createVector(width/2, height-(50 * GAME_SCALE));
  this.size = createVector(18*2 * GAME_SCALE, 26*2 * GAME_SCALE);
  this.dirX = 0;
  
  this.shipName = 'Level0';
  this.shipData = null;
  this.shipSpeed = 3;
  
  this.fire = false;
  this.bulletCooldown = 10;
  this.bulletCooldownCounter = 0;
  
  this.shoot = function() {}
  
  this.dataUpdate = function() {
    if(this.shipData == null || this.shipData.name == 'fallback') {
      this.shipData = getShipByName(this.shipName);
    }
  }
  
  this.update = function() {
    this.pos.x += (this.dirX * (this.shipSpeed * GAME_SCALE));
    this.pos.x = constrain(this.pos.x, 5 * GAME_SCALE, width-this.size.x-(5 * GAME_SCALE));
    
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

  this.renderHUD = function() {
    noStroke();
    fill(255);

    textAlign(LEFT,CENTER);
    textSize(18 * GAME_SCALE);
    text('credits: '+currentcredits, 5 * GAME_SCALE, 15 * GAME_SCALE);
    text('score: '+currentscore, 5 * GAME_SCALE, 35 * GAME_SCALE);
    text('stage: '+(stage == 3 ? 'BOSS' : stage), 5 * GAME_SCALE, 55 * GAME_SCALE);

    stroke(color(255,0,0,100));
    strokeWeight(3);
    fill(255,0,0);
    line(0,height-(150 * GAME_SCALE), width, height-(150 * GAME_SCALE));
    noStroke();


    if(IS_TOUCH_SUPPORTED && settings.controls.useTouch) {
      let sprite = getTouchIconByName('directionControl').sprite;
      let spriteHighlighted = getTouchIconByName('directionControlHighlighted').sprite;

      const x = mouseX, y = mouseY;
      const right = AABB(x, y, 1, 1, width-(75 * GAME_SCALE),                         height-(100 * GAME_SCALE),                          50 * GAME_SCALE, 50 * GAME_SCALE);
      const left =  AABB(x, y, 1, 1, width-(150 * GAME_SCALE),                        height-(100 * GAME_SCALE),                          50 * GAME_SCALE, 50 * GAME_SCALE);
      const up =    AABB(x, y, 1, 1, width-(75 * GAME_SCALE) - ((75 * GAME_SCALE)/2), height-(100 * GAME_SCALE) - ((75 * GAME_SCALE)/2),  50 * GAME_SCALE, 50 * GAME_SCALE);
      const down =  AABB(x, y, 1, 1, width-(75 * GAME_SCALE) - 75/2,                  height-(100 * GAME_SCALE) + ((75 * GAME_SCALE)/2),  50 * GAME_SCALE, 50 * GAME_SCALE);
      const fire =  AABB(x, y, 1, 1, (75 * GAME_SCALE) + ((75 * GAME_SCALE)/2),       height-(100 * GAME_SCALE) - ((75 * GAME_SCALE)/2),  50 * GAME_SCALE, 50 * GAME_SCALE);


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
      translate(width-(50 * GAME_SCALE), height-(75 * GAME_SCALE));
      rotate(radians(90));
      image(right ? spriteHighlighted : sprite, -25 * GAME_SCALE,-25 * GAME_SCALE,50 * GAME_SCALE,50 * GAME_SCALE);
      pop();

      // LEFT
      push();
      translate(width-(125 * GAME_SCALE), height-(75 * GAME_SCALE));
      rotate(radians(-90));
      image(left ? spriteHighlighted : sprite, -25 * GAME_SCALE,-25 * GAME_SCALE,50 * GAME_SCALE,50 * GAME_SCALE);
      pop();


      // UP
      push();
      translate(width-(50 * GAME_SCALE) - ((75 * GAME_SCALE)/2), height-(75 * GAME_SCALE) - ((75 * GAME_SCALE)/2));
      image(up ? spriteHighlighted : sprite, -25 * GAME_SCALE,-25 * GAME_SCALE,50 * GAME_SCALE,50 * GAME_SCALE);
      pop();

      // DOWN
      push();
      translate(width-(50 * GAME_SCALE) - ((75 * GAME_SCALE)/2), height-(75 * GAME_SCALE) + ((75 * GAME_SCALE)/2));
      rotate(radians(180));
      image(down ? spriteHighlighted : sprite, -25 * GAME_SCALE,-25 * GAME_SCALE,50 * GAME_SCALE,50 * GAME_SCALE);
      pop();


      sprite = getTouchIconByName("shot").sprite;
      spriteHighlighted = getTouchIconByName("shotHighlighted").sprite;

      // FIRE
      push();
      translate((50 * GAME_SCALE) + ((75 * GAME_SCALE)/2), height-(75 * GAME_SCALE) - ((75 * GAME_SCALE)/2));
      image((fire || this.fire) ? spriteHighlighted : sprite, -25 * GAME_SCALE,-25 * GAME_SCALE,50 * GAME_SCALE,50 * GAME_SCALE);
      pop();
    }
  }
  
  this.keyPressed = function(key) {
    if(IS_TOUCH_SUPPORTED && settings.controls.useTouch) return;

    if(key == settings.controls.movement.left) {
      this.dirX = -1;
    }
    if(key == settings.controls.movement.right) {
      this.dirX = 1;
    }
    if(key == settings.controls.fire) {
      this.fire = !this.fire;
    }
  }
  this.keyReleased = function(key) {
    if(IS_TOUCH_SUPPORTED && settings.controls.useTouch) return;
    if(key == settings.controls.movement.left || key == settings.controls.movement.right) {
        this.dirX = 0;
    }
  }
}