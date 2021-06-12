function renderMenu_Main() {
  drawTitle();
}

function renderMenu_Store() {
  drawTitle();
  fill(255);
  textAlign(CENTER,CENTER);
  textSize(50 * GAME_SCALE);
  text('store', width/2, 120 * GAME_SCALE);
}

function renderMenu_Settings() {
  drawTitle();
  fill(255);
  textAlign(CENTER,CENTER);
  textSize(50 * GAME_SCALE);
  text('settings', width/2, 120 * GAME_SCALE);
}

function renderMenu_Credits() {
  drawTitle();
  fill(255);
  textAlign(CENTER,CENTER);
  textSize(50 * GAME_SCALE);
  text('credits', width/2, 120 * GAME_SCALE);
  
  let highlightColour = color(200, 200, 0);
  let textColour = color(255);
  
  let xPos = 250 * GAME_SCALE;
  let yPos = height/2- (45 * GAME_SCALE);
  
  textAlign(CENTER,CENTER);
  textSize(40 * GAME_SCALE);
  fill(highlightColour);
  text('visuell & graphics', xPos, yPos);
  textSize(27 * GAME_SCALE);
  fill(textColour);
  text('felix sandhop', xPos, yPos+ (30 * GAME_SCALE));
  text('and', xPos, yPos+ (60 * GAME_SCALE));
  text('conner bangel', xPos, yPos+ (90 * GAME_SCALE));
  
  
  xPos = width/2;
  
  textAlign(CENTER,CENTER);
  textSize(40 * GAME_SCALE);
  fill(highlightColour);
  text('programming', xPos, yPos);
  textSize(27 * GAME_SCALE);
  fill(textColour);
  text('philipp schott', xPos, yPos+ (30 * GAME_SCALE));
  
  
  xPos = width-250 * GAME_SCALE;
  
  textAlign(CENTER,CENTER);
  textSize(40 * GAME_SCALE);
  fill(highlightColour);
  text('sounds & audio', xPos, yPos);
  textSize(27 * GAME_SCALE);
  fill(textColour);
  text('conner bangel', xPos, yPos+ (30 * GAME_SCALE));
  text('and', xPos, yPos+ (60 * GAME_SCALE));
  text('philipp schott', xPos, yPos+ (90 * GAME_SCALE));
  
}


function renderGame() {
  const GAME_WON = enemys.length == 0 && stage == 3;
  
  if(GAME_COUNTDOWN >= 0 && !GAME_STARTED && !GAME_DEAD && !GAME_PAUSE) {
      fill(255);
      textAlign(CENTER,CENTER);
      textSize(150);
      if(floor(GAME_COUNTDOWN) < 4) {
        if(floor(GAME_COUNTDOWN) > 0) {
          text(floor(GAME_COUNTDOWN),width/2, height/2);
        }
        else {
          text('go',width/2, height/2);
        }
      }
      
      GAME_COUNTDOWN -= deltaTime/1000;
      
      if(GAME_COUNTDOWN <= 0) {
        GAME_STARTED = true;
      }
    }

  if(!GAME_PAUSE && !GAME_DEAD && GAME_STARTED) {
    enemyStepDown++;
    if(enemyStepDown >= 300) {
      enemyStepDown = 0;
      for(let i = enemys.length-1; i >= 0; i--) {
        enemys[i].pos.y += 50;
      }
    }
  }

  for(let i = enemys.length-1; i >= 0; i--) {
    const enemy = enemys[i];
    if(!GAME_PAUSE && !GAME_DEAD && GAME_STARTED) {
      enemy.update();
    }
    enemy.render();

    if((enemy.pos.y+enemy.size) >= height-150) {
      GAME_DEAD = true;
    }

    if(enemy.life <= 0) {
      enemys.splice(i,1);
    } else {    
      for(let j = playerBullets.length-1; j >= 0; j--) {
        const playerBullet = playerBullets[j];

        if(AABB(playerBullet.pos.x, playerBullet.pos.y, playerBullet.size.x, playerBullet.size.y, enemy.pos.x, enemy.pos.y, enemy.size, enemy.size)) {
          enemy.life -= playerBullet.damage;
          playerBullets.splice(j,1);

          createExplosion(playerBullet.pos.x, playerBullet.pos.y);

          if(!GAME_DEAD) {
            currentscore += enemy.score;
            currentcredits += enemy.credits;
            credits += enemy.credits;

            if(currentscore > highscore) {
              highscore = currentscore;
            }
          }
        }
      }
    }
  }

  for(let i = playerBullets.length-1; i >= 0; i--) {
    const bullet = playerBullets[i];
    if(!GAME_PAUSE && GAME_STARTED) {
      bullet.update();
    }
    bullet.render();

    if(bullet.pos.x <= 0 || bullet.pos.x >= width
       || bullet.pos.y <= 0 || bullet.pos.y >= height) {
      playerBullets.splice(i,1);
    }
  }

  for(let i = enemyBullets.length-1; i >= 0; i--) {
    const bullet = enemyBullets[i];
    if(!GAME_PAUSE && GAME_STARTED) {
      bullet.update();
    }
    bullet.render();

    if(bullet.pos.x <= 0 || bullet.pos.x >= width
       || bullet.pos.y <= 0 || bullet.pos.y >= height) {
      enemyBullets.splice(i,1);
    }

    if(AABB(player.pos.x, player.pos.y, player.size.x, player.size.y,
            bullet.pos.x, bullet.pos.y, bullet.size.x, bullet.size.y)) {
        enemyBullets.splice(i,1);

      createExplosion(player.pos.x + player.size/2,
                      player.pos.y + player.size/2);
      if(!GAME_DEAD) {
        backgroundToDrawName = 'background_dead';
      }
      SaveScores();
      GAME_DEAD = true;
    }
  }

  player.render();
  player.dataUpdate();
  if(!GAME_PAUSE && GAME_STARTED && !GAME_DEAD && !GAME_WON) {
    player.update();
    player.renderHUD();
  }

  if(GAME_PAUSE && !GAME_DEAD) {
    fill(color(0,0,0,150));
    rect(0,0,width,height);
    drawTitle();
    fill(255);
    textAlign(CENTER,CENTER);
    textSize(50);
    text('game paused', width/2, 120);

    textSize(28);
    textAlign(CENTER,CENTER);
    text('press m to return to the menu', width/2, height-130);
    text('press escape to return to the game', width/2, height-100);
    

    textSize(28);
    textAlign(LEFT,CENTER);
    text('highscore: '+highscore, width/2-400, height/2-60);
    text('score: '+currentscore, width/2-400, height/2-30);
    text('total credits: '+credits, width/2-400, height/2);
    text('credits: '+currentcredits, width/2-400, height/2+30);
  }

  if(GAME_DEAD) {
    fill(color(0,0,0,150));
    rect(0,0,width,height);
    drawTitle();
    fill(255, 0, 0);
    textAlign(CENTER,CENTER);
    textSize(50);
    text('you died!', width/2, 120);

    fill(255);
    textSize(18);
    text('press m to return to the menu', width/2, height-120);
    text('press space to try again', width/2, height-100);


    textSize(18);
    textAlign(LEFT,CENTER);
    text('highscore: '+highscore, width/2-200, height/2-60);
    text('score: '+currentscore, width/2-200, height/2-30);
    text('total credits: '+credits, width/2-200, height/2);
    text('credits: '+currentcredits, width/2-200, height/2+30);

  }
  
  if(enemys.length == 0 && stage < 3) {
    stage++;
    print('NEXT STAGE ('+stage+')');
  }
  
  if(GAME_WON) {
    drawTitle();
    fill(255);
    textAlign(CENTER,CENTER);
    textSize(50);
    text("You've won!", width/2, 120);
    
    fill(255);
    textSize(18);
    text('press m to return to the menu', width/2, height-120);
    text('press space to play again', width/2, height-100);
    
    
    textSize(18);
    textAlign(LEFT,CENTER);
    text('highscore: '+highscore, width/2-200, height/2-60);
    text('score: '+currentscore, width/2-200, height/2-30);
    text('total credits: '+credits, width/2-200, height/2);
    text('credits: '+currentcredits, width/2-200, height/2+30);
  }
}