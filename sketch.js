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

  shakeEffect = createVector(0,0);
  player = new Player();
  let sWidth = 1300, sHeight = 900;
  IS_DEVICE_SIZE_OK = (windowWidth >= 1300 && windowHeight >= 900);
  IS_TOUCH_SUPPORTED = is_touch_supported();
  IS_MOBILE_DEVICE = navigator.userAgent.toLowerCase().match(/mobile/i) != null;

  let cWidth = sWidth, cHeight = sHeight;
  if(!IS_DEVICE_SIZE_OK) {
    let maxSteps = 10;
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

  createCanvas(cWidth, cHeight);
  frameRate(60);

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


  /*loadMusic('normal_music', (audio) => {
    audio.play(true);
  });
  loadSFXSound('Explosion');*/

  UpdateSoundVolume();
  UpdateMusicVolume();


  new MenuScene();
  new SettingsScene();
  new CreditsScene();
  new AchievementsScene();
  new StoreScene();
  new StoreBackgroundsScene();
  new StoreShipUpgradesScene();
  new YourShipScene();
  new GameScene();

  ShowScene('MenuScene');
}

function draw() {
  background(0);
  textFont(font);
  textAlign(LEFT, CENTER);
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

  if(shakeScreen && settings.visuell.screenshake) {
    translate(shakeEffect.x, shakeEffect.y);
    shakeEffect.x += random(-1, 1)*3;
    shakeEffect.y += random(-1, 1)*3;
  }

  if (settings.visuell.selectedBackground != null) {
    image(getStoreSpriteByName(settings.visuell.selectedBackground).sprite, 0, 0, width, height);
  }
  else {
    image(getStoreSpriteByName('Background_0').sprite, 0, 0, width, height);
  }

  if(IS_MOBILE_DEVICE) {
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(40*GAME_SCALE);
    text("Sorry but mobile devices aren't supported.", width/2, height/2);
    return;
  }

  if(currentScene != null) {
    currentScene.dataUpdate();
    currentScene.update();
    currentScene.render();
    currentScene.renderUI();
  }
  else {
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(60 * GAME_SCALE);
    text('Scene not found', width/2, height/2);
  }
}

function keyPressed() {
  if(currentScene != null) {
    currentScene.keyPressed();
  }
}
function keyReleased() {
  if(currentScene != null) {
    currentScene.keyReleased();
  }
}
function mousePressed() {
  if(currentScene != null) {
    currentScene.mousePressed();
  }
}
function mouseReleased() {
  if(currentScene != null) {
    currentScene.mouseReleased();
  }
}
function mouseWheel(e) {
  if(currentScene != null) {
    currentScene.mouseWheel(e);
  }
}

function screenShake() {
  if(shakeScreen)
    return;
  shakeScreen = true;
  setTimeout(() => {
    shakeScreen = false;
    shakeEffect.x = 0;
    shakeEffect.y = 0;
  }, 500);
}

function createBackButton(sceneName = 'MenuScene') {
  const backButton = new Button(60 * GAME_SCALE, height-(25 * GAME_SCALE), 50 * GAME_SCALE, 40 * GAME_SCALE, 'back');
  backButton.action = function() {
    ShowScene(sceneName);
  }
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
  textSize(tS - (40*GAME_SCALE));
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
function collideRectCircle(rx, ry, rw, rh, cx, cy, diameter) {
  //2d
  // temporary variables to set edges for testing
  var testX = cx;
  var testY = cy;

  // which edge is closest?
  if (cx < rx){         testX = rx       // left edge
  }else if (cx > rx+rw){ testX = rx+rw  }   // right edge

  if (cy < ry){         testY = ry       // top edge
  }else if (cy > ry+rh){ testY = ry+rh }   // bottom edge

  // // get distance from closest edges
  var distance = this.dist(cx,cy,testX,testY)

  // if the distance is less than the radius, collision!
  if (distance <= diameter/2) {
    return true;
  }
  return false;
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

      for(let i = 0; i < res.shipUpgrades.length; i++) {
        const storeItem = res.shipUpgrades[i];
        loadStoreSprite(storeItem.imagePath);
        new ShopProduct(storeItem.name, storeItem.price, storeItem.type, 'shipUpgrades', storeItem.imagePath);
        new ShipUpgrade(storeItem.name, storeItem.imagePath);
      }

      shopProducts.sort((a, b) => a.price - b.price)
      shopProducts.reverse();
    })
    .catch(err => {
      console.error('Something went wrong while loading the store data:');
      console.error(err)
    })
}