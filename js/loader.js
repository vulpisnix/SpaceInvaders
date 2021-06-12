let fallbackSprite;
let backgroundToDraw;
let backgrounds = [];
let bulletSprite, enemyZeroSprite, enemyOneSprite, enemyTwoSprite;
let selectedBackground = 'background_normal', backgroundToDrawName = 'background_normal';

let ships = [];
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

function loadMusic(name) {
  loadSound('./data/sounds/music/'+name+'.wav', (sound) => {
    music.push({
      name: name,
      sound: sound
    });
  });
}
function getMusicByName(name) {
  if(music.length == 0) {
    return null;
  }
  for(let i = 0; i <= music.length-1; i++) {
    if(music[i].name == name) {
      const m = music[i];
      m.sound.setVolume(settings.sound.musicVolume);
      return m;
    }
  }
  return null;
}
function loadSFXSound(name) {
  loadSound('./data/sounds/sfx/'+name+'.wav', (sound) => {
    sounds.push({
      name: name,
      sound: sound
    });
  });
}
function getSoundByName(name) {
  if(sounds.length == 0) {
    return null;
  }
  for(let i = 0; i <= sounds.length-1; i++) {
    if(sounds[i].name == name) {
      const m = sounds[i];
      m.sound.setVolume(settings.sound.musicVolume);
      return m;
    }
  }
  return null;
}
function UpdateMusicVolume() {
  for(let i = 0; i <= music.length-1; i++) {
    music[i].sound.setVolume(settings.sound.musicVolume);
  }
}
function UpdateSoundVolume() {
  for(let i = 0; i <= sounds.length-1; i++) {
    sounds[i].sound.setVolume(settings.sound.musicVolume);
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
    if(scores) {
      highscore = scores.highscore;
      bestStage = scores.bestStage;
      currentcredits = scores.credits;
    }
  }

  const rawSettings = getCookie('settings');
  if(rawSettings != '') {
    const settings_ = JSON.parse(rawSettings);
    if(settings_.sound.musicVolume)
      settings.sound.musicVolume = settings_.sound.musicVolume;
    if(settings_.sound.musicFullVolume)
      settings.sound.musicFullVolume = settings_.sound.musicFullVolume;
    if(settings_.sound.soundsVolume)
      settings.sound.soundsVolume = settings_.sound.soundsVolume;
    if(settings_.sound.soundsFullVolume)
      settings.sound.soundsFullVolume = settings_.sound.soundsFullVolume;

    if(settings_.visuell.screenshake)
      settings.visuell.screenshake = settings_.visuell.screenshake;

    if(settings_.controls.useTouch)
      settings.controls.useTouch = settings_.controls.useTouch;
    if(settings_.controls.fire)
      settings.controls.fire = settings_.controls.fire;
    if(settings_.controls.movement.up)
      settings.controls.movement.up = settings_.controls.movement.up;
    if(settings_.controls.movement.down)
      settings.controls.movement.down = settings_.controls.movement.down;
    if(settings_.controls.movement.left)
      settings.controls.movement.left = settings_.controls.movement.left;
    if(settings_.controls.movement.right)
      settings.controls.movement.right = settings_.controls.movement.right;
  }

}
function SaveGame() {
  SaveScores();
  SaveSettings();
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

LoadGame();