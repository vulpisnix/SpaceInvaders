let fallbackSprite;
let backgroundToDraw, spriteDeathBackground;
let backgrounds = [];
let bombSprite, bulletSprite, enemyWalkerSprite, enemyShooterSprite, enemyBomberSprite;
let selectedBackground = 'background_normal', backgroundToDrawName = 'background_normal';

let ships = [];
let shipUpgrades = [];
let storeSprites = [];
let explosionSprites = [];
let touchIcons = [];

let music = [];
let sounds = [];


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

function loadTouchIcon(name) {
  loadImage('./data/touchcontrolicons/'+name+'.png', (img) => {
    touchIcons.push({
      name: name,
      sprite: img
    });
  });
}
function getTouchIconByName(name) {
  if(touchIcons.length == 0) {
    return {
      name: 'fallback',
      sprite: fallbackSprite
    };
  }
  for(let i = 0; i <= touchIcons.length-1; i++) {
    if(touchIcons[i].name == name) {
      return touchIcons[i];
    }
  }
  return {
    name: 'fallback',
    sprite: fallbackSprite
  };
}

function loadStoreSprite(name) {
  loadImage('./data/store/'+name+'.png', (img) => {
    storeSprites.push({
      name: name,
      sprite: img
    });
  });
}
function getStoreSpriteByName(name) {
  if(storeSprites.length == 0) {
    return {
      name: 'fallback',
      sprite: fallbackSprite
    };
  }
  for(let i = 0; i <= storeSprites.length-1; i++) {
    if(storeSprites[i].name == name) {
      return storeSprites[i];
    }
  }
  return {
    name: 'fallback',
    sprite: fallbackSprite
  };
}

function getShipUpgradeBySpitePath(spritePath) {
  if(shipUpgrades.length == 0) {
    return new ShipUpgrade('fallback', 'fallback');
  }
  for(let i = 0; i <= shipUpgrades.length-1; i++) {
    if(shipUpgrades[i].spritePath == spritePath) {
      return shipUpgrades[i];
    }
  }
  return new ShipUpgrade('fallback', 'fallback');
}

function loadMusic(name) {
  loadSound('./data/sounds/music/'+name+'.wav', (sound) => {
    let vol = settings.sound.musicVolume;
    if(vol <= 0.02)
      vol = 0;
    sound.setVolume(vol);
    music.push(new Audio(name, sound));
  });
}
function loadMusic(name, callback) {
  loadSound('./data/sounds/music/'+name+'.wav', (sound) => {
    let vol = settings.sound.musicVolume;
    if(vol <= 0.02)
      vol = 0;
    sound.setVolume(vol);
    const audio = new Audio(name, sound);
    music.push(audio);
    callback(audio);
  });
}
function getMusicByName(name) {
  if(music.length == 0) {
    return new Audio('fallback', null);
  }
  for(let i = 0; i <= music.length-1; i++) {
    if(music[i].name == name) {
      const m = music[i];
      m.sound.setVolume(settings.sound.musicVolume);
      return m;
    }
  }
  return new Audio('fallback', null);
}
function loadSFXSound(name) {
  loadSound('./data/sounds/sfx/'+name+'.wav', (sound) => {
    let vol = settings.sound.soundsVolume;
    if(vol <= 0.02)
      vol = 0;
    sound.setVolume(vol);
    sounds.push(new Audio(name, sound));
  });
}
function getSoundByName(name) {
  if(sounds.length == 0) {
    return new Audio('fallback', null);
  }
  for(let i = 0; i <= sounds.length-1; i++) {
    if(sounds[i].name == name) {
      const m = sounds[i];
      m.sound.setVolume(settings.sound.soundsVolume);
      return m;
    }
  }
  return new Audio('fallback', null);
}
function UpdateMusicVolume() {
  for(let i = 0; i <= music.length-1; i++) {
    let vol = settings.sound.musicVolume;
    if(vol <= 0.02)
      vol = 0;
    music[i].sound.setVolume(vol);
  }
}
function UpdateSoundVolume() {
  for(let i = 0; i <= sounds.length-1; i++) {
    let vol = settings.sound.soundsVolume;
    if(vol <= 0.02)
      vol = 0;
    sounds[i].sound.setVolume(vol);
  }
}


function setCookie(cname, cvalue) {
  var d = new Date();
  d.setTime(d.getTime() + (24 * 60 * 60 * 1000 * 300));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(name) {
  name = name+"=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function LoadGame() {
  const rawScores = getCookie('scores');
  if(rawScores != '') {
    const scores = JSON.parse(rawScores);
    if(scores.highscore !== undefined)
      highscore = scores.highscore;
    if(scores.bestStage !== undefined)
      bestStage = scores.bestStage;
    if(scores.credits !== undefined)
      credits = scores.credits;
  }

  const rawSettings = getCookie('settings');
  if(rawSettings != '') {
    const settings_ = JSON.parse(rawSettings);
    if(settings_.sound.musicVolume !== undefined)
      settings.sound.musicVolume = settings_.sound.musicVolume;
    if(settings_.sound.musicFullVolume !== undefined)
      settings.sound.musicFullVolume = settings_.sound.musicFullVolume;
    if(settings_.sound.soundsVolume !== undefined)
      settings.sound.soundsVolume = settings_.sound.soundsVolume;
    if(settings_.sound.soundsFullVolume !== undefined)
      settings.sound.soundsFullVolume = settings_.sound.soundsFullVolume;

    if(settings_.visuell.screenshake !== undefined)
      settings.visuell.screenshake = settings_.visuell.screenshake;
    if(settings_.visuell.selectedBackground !== undefined && settings_.visuell.selectedBackground != '')
      settings.visuell.selectedBackground = settings_.visuell.selectedBackground;

    if(settings_.controls.useTouch !== undefined)
      settings.controls.useTouch = settings_.controls.useTouch;
    if(settings_.controls.fire !== undefined)
      settings.controls.fire = settings_.controls.fire;
    if(settings_.controls.movement.up !== undefined)
      settings.controls.movement.up = settings_.controls.movement.up;
    if(settings_.controls.movement.down !== undefined)
      settings.controls.movement.down = settings_.controls.movement.down;
    if(settings_.controls.movement.left !== undefined)
      settings.controls.movement.left = settings_.controls.movement.left;
    if(settings_.controls.movement.right !== undefined)
      settings.controls.movement.right = settings_.controls.movement.right;
  }

  const rawStoreBought = getCookie('store');
  if(rawStoreBought != '') {
    const store = JSON.parse(rawStoreBought);
    if(store != undefined) {
      storeBought = store;
    }
  }

  const rawShip = getCookie('ship');
  if(rawShip != '') {
    const ship = JSON.parse(rawShip);
    if(ship != undefined) {
      shipData = ship;
    }
  }
}
function SaveShip() {
  setCookie('ship', JSON.stringify(shipData));
}
function SaveGame() {
  SaveScores();
  SaveSettings();
  SaveStore();
  SaveShip();
}
function SaveScores() {
  setCookie('scores', JSON.stringify({
    highscore: highscore,
    bestStage: bestStage,
    credits: credits
  }));
}
function SaveSettings() {
  setCookie('settings', JSON.stringify(settings));
}
function ResetSettings() {
  settings = JSON.parse(JSON.stringify(settingsOrig));
}
function SaveStore() {
  setCookie('store', JSON.stringify(storeBought));
}