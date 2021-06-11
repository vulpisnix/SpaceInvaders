let fallbackSprite;
let backgroundToDraw;
let backgrounds = [];
let bulletSprite, enemyZeroSprite, enemyOneSprite, enemyTwoSprite;
let shipLevelZeroSprite, shipLevelOneSprite, shipLevelTwoSprite;
let selectedBackground = 'background_normal', backgroundToDrawName = 'background_normal';

let ships = [];

let explosionSprites = [];


function loadBackground(name, price) {
  loadImage('./data/backgrounds/'+name+'.png', (img) => {
    backgrounds.push({
      name: name,
      price: price,
      sprite: img
    });
  });
}
function getBackgroundByName(name) {
  if(ships.length == 0) {
    return {
      name: 'fallback',
      price: -1,
      sprite: fallbackSprite
    };
  }
  for(let i = 0; i <= backgrounds.length-1; i++) {
    if(backgrounds[i].name == name) {
      return backgrounds[i];
    }
  }
  return {
      name: 'fallback',
      price: -1,
      sprite: fallbackSprite
    };
}

function loadExplosionSprites() {
  loadImage('./data/explosion/explosion.png', (img) => {
    explosionSprites.push({index: 0, sprite: img});
  });
  
  for(let i = 1; i <= 6; i++) {
    loadImage('./data/explosion/explosion'+i+'.png', (img) => {
      explosionSprites.push({index: i, sprite: img});
    });
  }
}
function getExplosionSpriteByIndex(index) {
  if(explosionSprites.length == 0) {
    return fallbackSprite;
  }
  
  for(let i = 0; i <= explosionSprites.length-1; i++) {
    if(explosionSprites[i].index == index) {
      return explosionSprites[i].sprite;
    }
  }
  return explosionSprites[0].sprite;
}

function loadShip(name, level, price) {
  loadImage('./data/ships/ship'+name+".png", (img) => {
    ships.push({
      name: name,
      level: level,
      price: price,
      sprite: img
    });
  });
}
function getShipByName(name) {
  if(ships.length == 0) {
    return {
      name: 'fallback',
      level: -1,
      price: -1,
      sprite: fallbackSprite
    };
  }  
  for(let i = 0; i <= ships.length-1; i++) {
    if(ships[i].name == name) {
      return ships[i];
    }
  }
  return {
      name: 'fallback',
      level: -1,
      price: -1,
      sprite: fallbackSprite
    };
}