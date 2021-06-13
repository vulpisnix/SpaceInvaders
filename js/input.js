let inputMouseX = 0; inputMouseY = 0, inputLastMouseX = 0; inputLastMouseY = 0;
let inputMouseDX = 0; inputMouseDY = 0;

function updateInput() {
  if(!mouseIsPressed) {
    inputLastMouseX = inputMouseX;
    inputLastMouseY = inputMouseY;
  }
  inputMouseX = mouseX;
  inputMouseY = mouseY;

  if(mouseIsPressed) {
    inputMouseDX = constrain(inputMouseX - inputLastMouseX, -1, 1);
    inputMouseDY = constrain(inputMouseX - inputLastMouseY, -1, 1);
  } else {
    inputMouseDX = 0;
    inputMouseDY = 0;
  }
}

function keyPressed() {
  if(GAME) {
    if(!GAME_PAUSE && !GAME_DEAD) {
      player.keyPressed(key);
    }
    
    if(key == 'Escape' && !GAME_DEAD) {
      GAME_PAUSE = !GAME_PAUSE;
      
      if(!GAME_PAUSE) {
        GAME_STARTED = false;
        GAME_COUNTDOWN = 4;
      }
    }
    if(key == 'm' || (key == 'Escape' && GAME_DEAD)) {
      createMenu();
      GAME_PAUSE = false;
      GAME_DEAD = false;
    }
    if(key == ' ' && GAME_DEAD) {
      createGame();
    }
  }
  if((SHOP || SETTINGS || CREDITS || ACHIEVEMENTS) && (key == 'Escape' || key == 'Backspace')) {
    createMenu();
  }
  if((SHOP_BACKGROUNDS) && (key == 'Escape' || key == 'Backspace')) {
    createStore();
  }

  if(SETTINGS && keyChangerChange.name != '' && key != 'Escape') {
    if(keyChangerChange.name == 'movementUP') {
      keyChangerChange.target.subtext = 'Key: '+getKeyName(settings.controls.movement.up);
      settings.controls.movement.up = key;
    }
    if(keyChangerChange.name == 'movementDOWN') {
      keyChangerChange.target.subtext = 'Key: '+getKeyName(settings.controls.movement.down);
      settings.controls.movement.down = key;
    }
    if(keyChangerChange.name == 'movementLEFT') {
      keyChangerChange.target.subtext = 'Key: '+getKeyName(settings.controls.movement.left);
      settings.controls.movement.left = key;
    }
    if(keyChangerChange.name == 'movementRIGHT') {
      keyChangerChange.target.subtext = 'Key: '+getKeyName(settings.controls.movement.right);
      settings.controls.movement.right = key;
    }
    if(keyChangerChange.name == 'controlsFIRE') {
      keyChangerChange.target.subtext = 'Controls: '+getKeyName(settings.controls.fire);
      settings.controls.fire = key;
    }
    keyChangerChange.target = null;
    keyChangerChange.name = '';
    SaveSettings();
  }
  pressedKey = key;
}

function keyReleased() {
  if(GAME) {
    if(!GAME_PAUSE) {
      player.keyReleased(key);
    }
  }
  pressedKey = '';
}

function mousePressed() {
  if(buttons.length > 0) {
    for(let i = buttons.length-1; i >= 0; i--) {
      if(buttons[i] != null)
        buttons[i].mousePressed();
    }
  }
  if(checkboxes.length > 0) {
    for (let i = checkboxes.length - 1; i >= 0; i--) {
      if(checkboxes[i] != null)
        checkboxes[i].mousePressed();
    }
  }
}

function getKeyName(key) {
  switch(key) {
    case ' ':
      return 'space';
      break;
    case 'ArrowUp':
      return 'Arrow Up';
      break;
    case 'ArrowDown':
      return 'Arrow Down';
      break;
    case 'ArrowLeft':
      return 'Arrow Left';
      break;
    case 'ArrowRight':
      return 'Arrow Right';
      break;

    default:
      return key;
      break;
  }
}