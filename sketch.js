function preload() {
  font = loadFont('./data/SpaceInvaders.ttf');
  
  fallbackSprite = loadImage('./data/fallbackSprite.png');
  
  
  bulletSprite = loadImage('./data/bullet.png');
  enemyZeroSprite = loadImage('./data/enemyZero.png');
  enemyOneSprite = loadImage('./data/enemyOne.png');
  enemyTwoSprite = loadImage('./data/enemyTwo.png');
}

function setup() {
  let sWidth = windowWidth, sHeight = windowHeight;
  if(sHeight < 600)
    sHeight = 600;
  else if(sHeight > 900)
    sHeight = 900;
  IS_DEVICE_SIZE_OK = (sHeight <= 900 && sWidth >= 1300);
  IS_TOUCH_SUPPORTED = is_touch_enabled();
  sWidth = 1300;

  if(IS_DEVICE_SIZE_OK) {
    createCanvas(sWidth, sHeight);
    frameRate(60);
    createMenu();

    loadBackground('background_normal', 0);
    loadBackground('background_dead', 0);

    loadExplosionSprites();

    loadShip('Level0', 0, 0);
    loadShip('Level1', 1, 75);
    loadShip('Level2', 2, 150);

    if(IS_TOUCH_SUPPORTED) {
      loadTouchIcon('directionControl');
      loadTouchIcon('directionControlHighlighted');
      loadTouchIcon('shot');
      loadTouchIcon('shotHighlighted');
    }

  }
  else {
    createCanvas(windowWidth, windowHeight-1);
    frameRate(60);

    const btn = new Button(width/2, height-200, 0, 40, 30, 'Debug');
    btn.action = function () {
      document.location.reload();
    }
    buttons.push(btn);
  }
}

function draw() {
  background(0);
  textFont(font);
  textAlign(LEFT, CENTER);

  scale(GAME_SCALE);
  let nWidth = width - width * GAME_SCALE;
  let nHeight = height - height * GAME_SCALE;
  translate(nWidth - nWidth/2, nHeight - nHeight/2);

  if(!IS_DEVICE_SIZE_OK) {
    let tS = 75;
    if(width < 600)
      tS = 40;
    if(width < 400)
      tS = 20;
    drawTitle(tS);

    noStroke();
    textAlign(CENTER, CENTER);
    fill(200,0,0);
    textSize(tS/3);
    text("Sorry but your device isn't big enough.", width/2, height/2-15);
    text("Your screen resolution must be atleast 1300x600", width/2, height/2+15);
    return;
  }

  if (backgroundToDraw != null)
    image(backgroundToDraw.sprite, 0, 0, width, height);
  if (backgroundToDraw == null || backgroundToDraw.name != backgroundToDrawName) {
    backgroundToDraw = getBackgroundByName(backgroundToDrawName);
  }

  for (let i = buttons.length - 1; i >= 0; i--) {
    const button = buttons[i];
    button.update();
    button.render();
  }


  if (MENU) {
    renderMenu_Main();
  }

  if (SHOP) {
    renderMenu_Store();
  }

  if (SETTINGS) {
    renderMenu_Settings();
  }

  if (CREDITS) {
    renderMenu_Credits();
  }

  if (GAME) {
    renderGame();
  }


  for (let i = animations.length - 1; i >= 0; i--) {
    const anim = animations[i];
    if (!GAME_PAUSE) {
      anim.update();
    }
    anim.render();

    if (anim.isFinished) {
      animations.splice(i, 1);
    }
  }

  for (let i = sliders.length - 1; i >= 0; i--) {
    const slider = sliders[i];
    slider.update();
    slider.render();
  }

  for (let i = checkboxes.length - 1; i >= 0; i--) {
    checkboxes[i].render();
  }
}

function drawTitle(tS = 75) {
  noStroke();
  fill(255,255,0);
  textSize(tS);
  textAlign(CENTER, CENTER);
  text('space invaders', width/2, 50);
  textAlign(LEFT, CENTER);

}

function AABB(x1, y1, w1, h1, x2, y2, w2, h2) {
  return (x1 < x2 + w2 &&
    x1 + w1 > x2 &&
    y1 < y2 + h2 &&
    y1 + h1 > y2);
}