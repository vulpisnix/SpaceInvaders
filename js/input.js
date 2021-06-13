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

  if(SETTINGS && keyChangerChange != '' && key != 'Escape') {
    if(keyChangerChange == 'movementUP') {
      settings.controls.movement.up = key;
    }
    if(keyChangerChange == 'movementDOWN') {
      settings.controls.movement.down = key;
    }
    if(keyChangerChange == 'movementLEFT') {
      settings.controls.movement.left = key;
    }
    if(keyChangerChange == 'movementRIGHT') {
      settings.controls.movement.right = key;
    }
    if(keyChangerChange == 'controlsFIRE') {
      settings.controls.fire = key;
    }
    keyChangerChange = '';
    SaveSettings();
  }
}

function keyReleased() {
  if(GAME) {
    if(!GAME_PAUSE) {
      player.keyReleased(key);
    }
  }
}

function mousePressed() {
  if(buttons.length > 0) {
    for(let i = buttons.length-1; i >= 0; i--) {
      buttons[i].mousePressed();
    }
  }
  if(checkboxes.length > 0) {
    for (let i = checkboxes.length - 1; i >= 0; i--) {
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