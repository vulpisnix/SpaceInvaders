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
  
  if((SHOP || SETTINGS || CREDITS) && (key == 'Escape' || key == 'Backspace')) {
    createMenu();
  }

  if(key == 'l') {
    enemys = [];
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