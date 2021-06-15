function preload() {
  font = loadFont('./data/SpaceInvaders.ttf');
  
  fallbackSprite = loadImage('./data/fallbackSprite.png');
  spriteDeathBackground = loadImage('./data/store/backgrounds/death.png');
  
  bulletSprite = loadImage('./data/bullet.png');
  bombSprite = loadImage('./data/bomb.png');
  enemyWalkerSprite = loadImage('./data/enemies/enemyZero.png');
  enemyShooterSprite = loadImage('./data/enemies/enemyOne.png');
  enemyBomberSprite = loadImage('./data/enemies/enemyTwo.png');
}

function setup() {
  InitStoreItems();
  LoadGame();
  SaveGame();
  player = new Player();

  shakeEffect = createVector(0,0);
  let sWidth = 1300, sHeight = 900;
  IS_DEVICE_SIZE_OK = (windowWidth >= 1300 && windowHeight >= 900);
  IS_TOUCH_SUPPORTED = is_touch_supported();

  let cWidth = sWidth, cHeight = sHeight;
  if(!IS_DEVICE_SIZE_OK) {
    let maxSteps = 20;
    let steps = 0;
    while(steps < maxSteps) {
      GAME_SCALE -= 0.05;
      let w = sWidth * GAME_SCALE;
      let h = sHeight * GAME_SCALE;

      if(h <= windowHeight && w <= windowWidth) {
        cWidth = w;
        cHeight = h;
        IS_DEVICE_SIZE_OK = true;
        break;
      }
    }
  }
  else {
    cWidth *= GAME_SCALE;
    cHeight *= GAME_SCALE;
  }

  if(IS_DEVICE_SIZE_OK) {
    createCanvas(cWidth, cHeight);
    frameRate(60);
    let hash = document.location.hash;
    if(hash == '#store') {
      createStore();
    }
    else if(hash == '#settings') {
      createSettings();
    }
    else if(hash == '#achievements') {
      createAchievements();
    }
    else if(hash == '#credits') {
      createCredits();
    }
    else createMenu();

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
  }

  loadMusic('normal_music', (audio) => {
    audio.play(true);
  });
  loadSFXSound('Explosion');

  UpdateSoundVolume();
  UpdateMusicVolume();
}

function draw() {
  background(0);
  textFont(font);
  textAlign(LEFT, CENTER);

  if(shakeScreen && settings.visuell.screenshake) {
    translate(shakeEffect.x, shakeEffect.y);
    shakeEffect.x += random(-1, 1)*3;
    shakeEffect.y += random(-1, 1)*3;
  }

  if(!IS_DEVICE_SIZE_OK) {
    let tS = 90;
    if(width < 600)
      tS = 60;
    if(width < 400)
      tS = 40;
    drawTitle(tS);

    noStroke();
    textAlign(CENTER, CENTER);
    fill(200,0,0);
    textSize((tS/3) * GAME_SCALE);
    text("Sorry but your device isn't big enough.", width/2, height/2-(15 * GAME_SCALE));
    text("Your screen resolution must be atleast 1300x900", width/2, height/2+(15 * GAME_SCALE));
    text("Your screen resolution is "+windowWidth+"x"+windowHeight, width/2, height/2+(45 * GAME_SCALE));

    return;
  }

  if (settings.visuell.selectedBackground != null) {
    image(getStoreSpriteByName(settings.visuell.selectedBackground).sprite, 0, 0, width, height);
  }
  if(GAME_DEAD) {
    image(spriteDeathBackground, 0, 0, width, height);
  }


  for (let i = buttons.length - 1; i >= 0; i--) {
    const button = buttons[i];
    button.update();
    button.render();
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
  for (let i = keychangers.length - 1; i >= 0; i--) {
    keychangers[i].update();
    keychangers[i].render();
  }


  if (MENU) {
    renderMenu_Main();
  }
  if(MENU_SHIP) {
    renderMenu_Ship();
  }
  if (SHOP) {
    renderMenu_Store();
  }
  if(SHOP_BACKGROUNDS) {
    renderMenu_Store_Backgrounds();
  }
  if (SETTINGS) {
    renderMenu_Settings();
  }
  if (CREDITS) {
    renderMenu_Credits();
  }
  if(ACHIEVEMENTS) {
    renderMenu_Achievements();
  }
  if (GAME) {
    renderGame();
  }

  updateInput();
}

function drawTitle(tS = 90, subTitle = '') {
  if(tS == -1)
    tS = 90;
  tS *= GAME_SCALE;
  noStroke();
  fill(255,255,0);
  textSize(tS);
  textAlign(CENTER, CENTER);
  text('space invaders', width/2, 50 * GAME_SCALE);
  textSize(tS - (30*GAME_SCALE));
  fill(255);
  text(subTitle, width/2, 120 * GAME_SCALE);
  textAlign(LEFT, CENTER);
}

function AABB(x1, y1, w1, h1, x2, y2, w2, h2) {
  return (x1 < x2 + w2 &&
    x1 + w1 > x2 &&
    y1 < y2 + h2 &&
    y1 + h1 > y2);
}

function InitStoreItems() {
  fetch('./data/store/store.json')
    .then(res => res.json())
    .then(res => {
      for(let i = 0; i < res.backgrounds.length; i++) {
        const storeItem = res.backgrounds[i];
        loadStoreSprite(storeItem.imagePath);
        new ShopProduct(storeItem.name, storeItem.price, storeItem.type, 'backgrounds', storeItem.imagePath);
      }

      shopProducts.sort((a, b) => a.price - b.price)
      shopProducts.reverse();
    })
    .catch(err => {
      console.error('Something went wrong while loading the store data:');
      console.error(err)
    })
}