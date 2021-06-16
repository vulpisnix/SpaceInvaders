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
  MENU_SHIP = false;
  SHOP_SHIPS = false;

  let bHeight = 50 * GAME_SCALE;
  let bFS = 50 * GAME_SCALE;
  let bX = 10*GAME_SCALE;
  let bY = height - bHeight - 10*GAME_SCALE;
  let bSpacing = 20 * GAME_SCALE;

  const achievementsButton = new Button(bX, bY, bHeight, bFS, 'achievements');
  const settingsButton = new Button(bX, bY -= (bHeight + bSpacing), bHeight, bFS, 'settings');
  const creditsButton = new Button(bX, bY -= (bHeight + bSpacing), bHeight, bFS, 'credits');
  const storeButton = new Button(bX, bY -= (bHeight + bSpacing), bHeight, bFS, 'store');
  const playButton = new Button(bX, bY - (bHeight + bSpacing), bHeight, bFS, 'play');

  playButton.textAlign = 'LEFT';
  storeButton.textAlign = 'LEFT';
  creditsButton.textAlign = 'LEFT';
  settingsButton.textAlign = 'LEFT';
  achievementsButton.textAlign = 'LEFT';

  playButton.action = function() {
    MENU = false;
    GAME = true;
    SHOP = false;
    SETTINGS = false;
    CREDITS = false;
    ACHIEVEMENTS = false;
    GAME_DEAD = false;

    setTimeout(createGame, 10);
    print('GAME');
  }
  storeButton.action = function() {
    MENU = false;
    GAME = false;
    SHOP = true;
    SETTINGS = false;
    CREDITS = false;
    ACHIEVEMENTS = false;
    GAME_DEAD = false;

    setTimeout(createStore, 10);
    print('STORE');
  }
  settingsButton.action = function() {
    MENU = false;
    GAME = false;
    SHOP = false;
    SETTINGS = true;
    CREDITS = false;
    ACHIEVEMENTS = false;
    GAME_DEAD = false;

    setTimeout(createSettings, 10);
    print('SETTINGS');
  }
  creditsButton.action = function() {
    MENU = false;
    GAME = false;
    SHOP = false;
    SETTINGS = false;
    CREDITS = true;
    ACHIEVEMENTS = false;
    GAME_DEAD = false;

    setTimeout(createCredits, 10);
    print('CREDITS');
  }
  achievementsButton.action = function() {
    MENU = false;
    GAME = false;
    SHOP = false;
    SETTINGS = false;
    CREDITS = false;
    ACHIEVEMENTS = true;
    GAME_DEAD = false;

    setTimeout(createAchievements, 10);
    print('ACHIEVEMENTS');
  }


  player.pos.x = width-(350*GAME_SCALE)-(100*GAME_SCALE)+(350*GAME_SCALE/2)-player.size.x/2;
  player.pos.y = (250 * GAME_SCALE) + (250 * GAME_SCALE/2);
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
  MENU_SHIP = false;
  SHOP_SHIPS = false;

  SHOP_BACKGROUNDS = false;

  createBackButton();

  let shipProducts = getShopProductsByCategory('shipUpgrades');
  let backgroundProducts = getShopProductsByCategory('backgrounds');

  const shopShipUpgrades = new ShopPreview('Ship Upgrades', shipProducts[floor(random(0,shipProducts.length))]);
  const shopBackgrounds = new ShopPreview('Backgrounds', backgroundProducts[floor(random(0,backgroundProducts.length))]);

  shopShipUpgrades.onClick = function() {
    setTimeout(createStore_ShipUpgrades, 10);
  }
  shopBackgrounds.onClick = function() {
    setTimeout(createStore_Backgrounds, 10);
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
  MENU_SHIP = false;
  SHOP_SHIPS = false;
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
  MENU_SHIP = false;
  SHOP_SHIPS = false;
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

  player.pos.x = width/2;
  player.pos.y =  height-player.size.y-(10 * GAME_SCALE);
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
  MENU_SHIP = false;
  SHOP_SHIPS = false;

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
  MENU_SHIP = false;
  SHOP_SHIPS = false;
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


function createMenu_Ship() {
  buttons = [];
  enemys = [];
  playerBullets = [];
  enemyBullets = [];
  animations = [];
  sliders = [];
  checkboxes = [];
  keychangers = [];
  shopPreviews = [];

  MENU = false;
  GAME = false;
  SHOP = false;
  SETTINGS = false;
  CREDITS = false;
  ACHIEVEMENTS = false;
  GAME_DEAD = false;
  MENU_SHIP = true;
  SHOP_SHIPS = false;

  createBackButton();


  player.pos.x = width/2 - player.size.x/2;
  player.pos.y = height/2 - player.size.y/2;
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
  MENU_SHIP = false;
  SHOP_SHIPS = false;

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
function createStore_ShipUpgrades() {
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
  SHOP_BACKGROUNDS = false;
  SHOP_SHIPS = true;
  MENU_SHIP = false;

  createBackToStoreButton();

  let shipUpgradeProducts = getShopProductsByCategory('shipUpgrades');
  for(let i = shipUpgradeProducts.length-1; i >= 0; i--) {
    const bgP = shipUpgradeProducts[i];
    const shipUpgrade = new ShopPreview(bgP.text, bgP, true);
    shipUpgrade.onClick = function () {
      shipUpgrade.product.buyClickOrSelect();
    }
  }
}