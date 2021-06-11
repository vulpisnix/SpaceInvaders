let MENU = true, GAME = false, SHOP = false, SETTINGS = false, CREDITS = false;
let GAME_STARTED = false, GAME_PAUSE = false, GAME_DEAD = false;
let font;
let GAME_COUNTDOWN = 3;

let playerBullets = [];
let player;

let enemyBullets = [];
let enemys = [];
let enemyStepDown = 0;

let buttons = [];
let animations = [];
let sliders = [];

let highscore = 0, currentscore = 0;
let bestStage = 0, stage = 0;
let credits = 0, currentcredits = 0;

let settings = {
  sound: {
    volume: 1,
    active: true
  },
  screenshake: true
}


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
  
  
  LoadGame();
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
    settings = settings_;
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