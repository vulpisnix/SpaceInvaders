function createMenu() {
  keyChangerChange.name = '';
  backgroundToDrawName = selectedBackground;
  buttons = [];
  enemys = [];
  playerBullets = [];
  enemyBullets = [];
  animations = [];
  sliders = [];
  checkboxes = [];
  keychangers = [];
  shopPreviews = [];

  MENU = true;
  GAME = false;
  SHOP = false;
  SETTINGS = false;
  CREDITS = false;
  ACHIEVEMENTS = false;
  GAME_DEAD = false;

  let bHeight = 50 * GAME_SCALE;
  let bFS = 50 * GAME_SCALE;

  const playButton = new Button(width/2, height/2-(75 * GAME_SCALE), bHeight, bFS, 'play');
  const storeButton = new Button(width/2, height/2, bHeight, bFS, 'store');
  const settingsButton = new Button(width/2, height/2+(75 * GAME_SCALE), bHeight, bFS, 'settings');
  const achievementsButton = new Button(width/2, height/2+(150 * GAME_SCALE), bHeight, bFS, 'achievements');
  const creditsButton = new Button(width/2, height/2+(225 * GAME_SCALE), bHeight, bFS, 'credits');

  playButton.action = function() {
    MENU = false;
    SHOP = false;
    SETTINGS = false;
    CREDITS = true;
    GAME = true;
    ACHIEVEMENTS = false;
    
    createGame();
    print('GAME');
  }
  storeButton.action = function() {
    MENU = false;
    GAME = false;
    SETTINGS = false;
    CREDITS = true;
    SHOP = true;
    ACHIEVEMENTS = false;
    
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
    ACHIEVEMENTS = false;
    
    createSettings();
    print('SETTINGS');
  }
  creditsButton.action = function() {
    MENU = false;
    GAME = false;
    SHOP = false;
    SETTINGS = false;
    CREDITS = true;
    ACHIEVEMENTS = false;
    
    createCredits();
    print('CREDITS');
  }
  achievementsButton.action = function() {
    MENU = false;
    GAME = false;
    SHOP = false;
    SETTINGS = false;
    CREDITS = false;
    ACHIEVEMENTS = true;

    createAchievements();
    print('ACHIEVEMENTS');
  }
}

function createStore() {
  storeMainSlideXOffset = 0;
  buttons = [];
  enemys = [];
  sliders = [];
  checkboxes = [];
  keychangers = [];
  shopPreviews = [];

  MENU = false;
  GAME = false;
  SHOP = true;
  SETTINGS = false;
  CREDITS = false;

  SHOP_BACKGROUNDS = false;
  
  createBackButton();

  let shipProducts = getShopProductsByCategory('ships');
  let backgroundProducts = getShopProductsByCategory('backgrounds');

  const shopShipUpgrades = new ShopPreview('Ship Upgrades', shipProducts[floor(random(0,shipProducts.length))]);
  const shopBackgrounds = new ShopPreview('Backgrounds', backgroundProducts[floor(random(0,backgroundProducts.length))]);

  shopBackgrounds.onClick = function() {
    createStore_Backgrounds();
  }

}

function createSettings() {
  buttons = [];
  enemys = [];
  sliders = [];
  checkboxes = [];
  keychangers = [];
  shopPreviews = [];
  MENU = false;
  GAME = false;
  SHOP = false;
  CREDITS = false;
  SETTINGS = true;
  createBackButton();


  const musicVolumeSlider = new Slider('Music Volume', 15 * GAME_SCALE, 175 * GAME_SCALE);
  musicVolumeSlider.sliderPos = (settings.sound.musicFullVolume * (musicVolumeSlider.size.x-(20*GAME_SCALE)))+(20*GAME_SCALE);
  musicVolumeSlider.onChange = function(percentage) {
    settings.sound.musicVolume = map(floor(percentage*100), 0, 100, 0, 1);
    settings.sound.musicFullVolume = percentage;
    UpdateMusicVolume();
    SaveSettings();
  }

  const soundsVolumeSlider = new Slider('Effects Volume', 15 * GAME_SCALE, 250 * GAME_SCALE);
  soundsVolumeSlider.sliderPos = (settings.sound.soundsFullVolume * (soundsVolumeSlider.size.x-(20*GAME_SCALE)))+(20*GAME_SCALE);
  soundsVolumeSlider.onChange = function(percentage) {
    settings.sound.soundsVolume = map(floor(percentage*100), 0, 100, 0, 1);
    settings.sound.soundsFullVolume = percentage;
    UpdateSoundVolume();
    SaveSettings();
  }

  const screenshakeCheckbox = new Checkbox('Screenshake', 15 * GAME_SCALE, 325 * GAME_SCALE);
  screenshakeCheckbox.value = settings.visuell.screenshake;
  screenshakeCheckbox.onChange = function(value) {
    settings.visuell.screenshake = value;
    SaveSettings();
  }

  const useTouchControlsCheckbox = new Checkbox('Touch Controls', 15 * GAME_SCALE, 400 * GAME_SCALE);
  useTouchControlsCheckbox.value = settings.controls.useTouch;
  if(!IS_TOUCH_SUPPORTED) {
    useTouchControlsCheckbox.value = false;
    useTouchControlsCheckbox.disabled = true;
    useTouchControlsCheckbox.disabledText = 'Touch not supported';
  }
  useTouchControlsCheckbox.onChange = function(value) {
    settings.controls.useTouch = value;
    SaveSettings();
  }

  const resetSettingsButton = new Button(width-80, height-25, 50 * GAME_SCALE, 40 * GAME_SCALE,'Reset');
  resetSettingsButton.action = function () {
    ResetSettings();

    musicVolumeSlider.sliderPos = (settings.sound.musicFullVolume * (musicVolumeSlider.size.x-20))+20;
    soundsVolumeSlider.sliderPos = (settings.sound.soundsFullVolume * (soundsVolumeSlider.size.x-20))+20;
    screenshakeCheckbox.value = settings.visuell.screenshake;

    UpdateSoundVolume();
    UpdateMusicVolume();
    SaveSettings();
  }


  const keyChangerMovementUp = new KeyChanger(width-(300*GAME_SCALE)-(15 * GAME_SCALE), (175 * GAME_SCALE),'Movement: up', 'Key: '+getKeyName(settings.controls.movement.up));
  const keyChangerMovementDown = new KeyChanger(width-(300*GAME_SCALE)-(15 * GAME_SCALE), (175 * GAME_SCALE)+(75*GAME_SCALE),'Movement: down', 'Key: '+getKeyName(settings.controls.movement.down));
  const keyChangerMovementLeft = new KeyChanger(width-(300*GAME_SCALE)-(15 * GAME_SCALE), (175 * GAME_SCALE)+(150*GAME_SCALE),'Movement: left', 'Key: '+getKeyName(settings.controls.movement.left));
  const keyChangerMovementRight = new KeyChanger(width-(300*GAME_SCALE)-(15 * GAME_SCALE), (175 * GAME_SCALE)+(225*GAME_SCALE),'Movement: right', 'Key: '+getKeyName(settings.controls.movement.right));
  const keyChangerControlsFire = new KeyChanger(width-(300*GAME_SCALE)-(15 * GAME_SCALE), (175 * GAME_SCALE)+(300*GAME_SCALE),'Controls: fire', 'Key: '+getKeyName(settings.controls.fire));

  keyChangerMovementUp.onClick = function() {
    keyChangerChange.target = keyChangerMovementUp;
    keyChangerChange.name = 'movementUP';
    setTimeout(() => {
      keyChangerChange.target = null;
      keyChangerChange.name = '';
    }, 3000);
  }
  keyChangerMovementDown.onClick = function() {
    keyChangerChange.target = keyChangerMovementDown;
    keyChangerChange.name = 'movementDOWN';
    setTimeout(() => {
      keyChangerChange.target = null;
      keyChangerChange.name = '';
    }, 3000);
  }
  keyChangerMovementLeft.onClick = function() {
    keyChangerChange.target = keyChangerMovementLeft;
    keyChangerChange.name = 'movementLEFT';
    setTimeout(() => {
      keyChangerChange.target = null;
      keyChangerChange.name = '';
    }, 3000);
  }
  keyChangerMovementRight.onClick = function() {
    keyChangerChange.target = keyChangerMovementRight;
    keyChangerChange.name = 'movementRIGHT';
    setTimeout(() => {
      keyChangerChange.target = null;
      keyChangerChange.name = '';
    }, 3000);
  }
  keyChangerControlsFire.onClick = function() {
    keyChangerChange.target = keyChangerControlsFire;
    keyChangerChange.name = 'controlsFIRE';
    setTimeout(() => {
      keyChangerChange.target = null;
      keyChangerChange.name = '';
    }, 3000);
  }
}

function createGame() {
  // getMusicByName('normal_music').stop();
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
  checkboxes = [];
  keychangers = [];
  shopPreviews = [];
  
  currentscore = 0;
  currentcredits = 0;
  stage = 0;
  
  player = new Player();
  player.bulletCooldown = 20;
  player.shipName = 'Level0';
  player.shoot = function() {
    createPlayerBullet(player.pos.x+player.size.x/2- (6 * GAME_SCALE), player.pos.y, -1);
  }
  
  createEnemysStageZero();
}

function createCredits() {
  buttons = [];
  enemys = [];
  sliders = [];
  checkboxes = [];
  keychangers = [];
  MENU = false;
  GAME = false;
  SHOP = false;
  SETTINGS = false;
  CREDITS = true;
  
  createBackButton();
}

function createAchievements() {
  enemys = [];
  buttons = [];
  sliders = [];
  checkboxes = [];
  keychangers = [];
  shopPreviews = [];
  MENU = false;
  GAME = false;
  SHOP = false;
  SETTINGS = false;
  CREDITS = false;
  ACHIEVEMENTS = true;

  createBackButton();
}

function createBackButton() {
  const backButton = new Button(60 * GAME_SCALE, height-(25 * GAME_SCALE), 50 * GAME_SCALE, 40 * GAME_SCALE, 'back');
  backButton.action = function() {
    createMenu();
  }
}
function createBackToStoreButton() {
  const backButton = new Button(60 * GAME_SCALE, height-(25 * GAME_SCALE), 50 * GAME_SCALE, 40 * GAME_SCALE, 'back');
  backButton.action = function() {
    createStore();
  }
}



function createStore_Backgrounds() {
  storeMainSlideXOffset = 0;
  buttons = [];
  sliders = [];
  checkboxes = [];
  shopPreviews = [];

  MENU = false;
  GAME = false;
  SHOP = false;
  SETTINGS = false;
  CREDITS = false;
  SHOP_BACKGROUNDS = true;

  createBackToStoreButton();


  let backgroundProducts = getShopProductsByCategory('backgrounds');
  for(let i = backgroundProducts.length-1; i >= 0; i--) {
    const bgP = backgroundProducts[i];
    const background = new ShopPreview(bgP.text, bgP, true);
    background.onClick = function () {
      background.product.buyClickOrSelect();
    }
  }

}