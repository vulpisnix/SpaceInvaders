function createMenu() {
  backgroundToDrawName = selectedBackground;
  buttons = [];
  enemys = [];
  playerBullets = [];
  enemyBullets = [];
  animations = [];
  sliders = [];
  MENU = true;
  GAME = false;
  SHOP = false;
  SETTINGS = false;
  CREDITS = false;
  
  const playButton = new Button(width/2, height/2-75, 200, 50, 50, 'play');
  const storeButton = new Button(width/2, height/2, 250, 50, 50, 'store');
  const settingsButton = new Button(width/2, height/2+75, 360, 50, 50, 'settings');
  const creditsButton = new Button(width/2, height/2+150, 330, 50, 50, 'credits');
  
  playButton.action = function() {
    MENU = false;
    SHOP = false;
    SETTINGS = false;
    CREDITS = true;
    GAME = true;
    
    createGame();
    print('GAME');
  }
  storeButton.action = function() {
    MENU = false;
    GAME = false;
    SETTINGS = false;
    CREDITS = true;
    SHOP = true;
    
    createStore();
    print('STORE');
  }
  settingsButton.action = function() {
    MENU = false;
    GAME = false;
    SHOP = false;
    CREDITS = true;
    CREDITS = true;
    SETTINGS = true;
    
    createSettings();
    print('SETTINGS');
  }
  creditsButton.action = function() {
    MENU = false;
    GAME = false;
    SHOP = false;
    SETTINGS = false;
    CREDITS = true;
    
    createCredits();
    print('CREDITS');
  }
  
  buttons.push(playButton, storeButton, settingsButton, creditsButton);
}

function createStore() {
  buttons = [];
  enemys = [];
  sliders = [];
  MENU = false;
  GAME = false;
  SHOP = true;
  SETTINGS = false;
  CREDITS = false;
  
  createBackButton();
}

function createSettings() {
  buttons = [];
  enemys = [];
  sliders = [];
  MENU = false;
  GAME = false;
  SHOP = false;
  CREDITS = false;
  SETTINGS = true;
  
  createBackButton();
  
  const volumeSlider = new Slider('Volume', 15, 175);
  volumeSlider.onChange = function(volume) {
    settings.sound.volume = volume;
  }
}

function createGame() {
  backgroundToDrawName = selectedBackground;
  MENU = false;
  GAME = true;
  SHOP = false;
  SETTINGS = false;
  CREDITS = false;
  GAME_PAUSE = false;
  GAME_DEAD = false;
  GAME_STARTED = false;
  GAME_COUNTDOWN = 4;
  
  buttons = [];
  enemys = [];
  sliders = [];
  playerBullets = [];
  enemyBullets = [];
  
  currentscore = 0;
  currentcredits = 0;
  stage = 0;
  
  player = new Player();
  player.bulletCooldown = 20;
  player.shipName = 'Level0';
  player.shoot = function() {
    createPlayerBullet(player.pos.x+player.size.x/2-6, player.pos.y, -1);
  }
  
  let enemyCols = floor(width / 75)-1;
  let enemyX = 0;
  let enemyY = 25;
  let right = false;
  for(let j = 0; j < 5; j++) {
    for(let i = 0; i <= enemyCols; i++) {
      const enemy = new Enemy(enemyX+(75/2), enemyY, 50);
      enemy.moveDir = right ? 1 : -1;
      enemy.sprite = enemyZeroSprite;
      
      if(random(0,3) > 1.8) {
        enemy.sprite = enemyOneSprite;
        enemy.credits = 3;
        enemy.score = 12;

        enemy.bulletCooldown = floor(random(80, 140));
        enemy.bulletCooldownCounter = floor(random(0, enemy.bulletCooldown-1));
        enemy.shoot = function() {
          createEnemyBullet(enemy.pos.x, enemy.pos.y, 1);
        }
      }
      
      enemys.push(enemy);
      enemyX += 75;
      if(enemyX >= width-50) {
        right = !right;
        enemyX = 0;
        enemyY += 50;
      }
    }
  }
}

function createCredits() {
  buttons = [];
  enemys = [];
  sliders = [];
  MENU = false;
  GAME = false;
  SHOP = false;
  SETTINGS = false;
  CREDITS = true;
  
  createBackButton();
}

function createBackButton() {
  const backButton = new Button(60, height-25, 150, 50, 40, 'back');
  backButton.action = function() {
    createMenu();
  }
  buttons.push(backButton);
}