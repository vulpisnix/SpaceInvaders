function preload() {
  font = loadFont('./data/SpaceInvaders.ttf');
  
  fallbackSprite = loadImage('./data/fallbackSprite.png');
  
  
  bulletSprite = loadImage('./data/bullet.png');
  enemyZeroSprite = loadImage('./data/enemyZero.png');
  enemyOneSprite = loadImage('./data/enemyOne.png');
  enemyTwoSprite = loadImage('./data/enemyTwo.png');
}

function setup() {
  let sHeight = windowHeight;
  let sWidth = 1300;
  
  if(sHeight < 600)
    sHeight = 600;
  else
    sHeight -= 1;
  
  createCanvas(sWidth, sHeight);
  frameRate(60);
  
  createMenu();
  
  loadBackground('background_normal', 0);
  loadBackground('background_dead', 0);
  
  loadExplosionSprites();
  
  loadShip('Level0', 0, 0);
  loadShip('Level1', 1, 75);
  loadShip('Level2', 2, 150);
}

function draw() {
  background(0);
  if(backgroundToDraw != null)
    image(backgroundToDraw.sprite, 0,0,width,height);
  if(backgroundToDraw == null || backgroundToDraw.name != backgroundToDrawName) {
    backgroundToDraw = getBackgroundByName(backgroundToDrawName);
  }
  textFont(font);
  textAlign(LEFT, CENTER);
  
  for(let i = buttons.length-1; i >= 0; i--) {
    const button = buttons[i];
    button.update();
    button.render();
  }
  
  
  if(MENU) {   
    renderMenu_Main();
  }
  
  if(SHOP) {   
    renderMenu_Store();
  }
  
  if(SETTINGS) {   
    renderMenu_Settings();
  }
  
  if(CREDITS) {   
    renderMenu_Credits();
  }
  
  if(GAME) {
    renderGame();
  }
  
  
  for(let i = animations.length-1; i >= 0; i--) {
    const anim = animations[i];
    if(!GAME_PAUSE) {
      anim.update();
    }
    anim.render();
    
    if(anim.isFinished) {
      animations.splice(i,1);
    }
  }

  for(let i = sliders.length-1; i >= 0; i--) {
    const slider = sliders[i];
    slider.update();
    slider.render();
  }

  for(let i = checkboxes.length-1; i >= 0; i--) {
    checkboxes[i].render();
  }
}

function drawTitle() {
  stroke(255);
  strokeWeight(2);
  fill(255,255,0);
  textSize(75);
  textAlign(LEFT, CENTER);
  textAlign(CENTER, CENTER);
  text('space invaders', width/2, 50);
  textAlign(LEFT, CENTER);
  noStroke();
}

function AABB(x1, y1, w1, h1, x2, y2, w2, h2) {
  return (x1 < x2 + w2 &&
    x1 + w1 > x2 &&
    y1 < y2 + h2 &&
    y1 + h1 > y2);
}